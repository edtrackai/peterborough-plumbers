import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { confirmBookingSchema } from "@/lib/validations/booking-system";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";
import { notifyPlumbersNewOffer } from "@/lib/notifications/plumber";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, { name: "bookings-confirm", max: 5, windowMs: 10 * 60 * 1000 });
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(retryAfterSec) } });
  }
  try {
    const body = await req.json();
    const parsed = confirmBookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      bookingRef,
      serviceType,
      description,
      customerName,
      phone,
      email,
      address,
      accessNotes,
      photoUrls,
      photoPublicIds,
    } = parsed.data;

    const booking = await prisma.booking.findUnique({ where: { bookingRef } });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    if (booking.status !== "reserved") {
      return NextResponse.json(
        { error: "Booking is no longer in reserved state", status: booking.status },
        { status: 409 }
      );
    }
    if (booking.expiresAt && booking.expiresAt < new Date()) {
      return NextResponse.json({ error: "Reservation has expired" }, { status: 410 });
    }

    // Find on-duty plumbers to create offers for
    const onDutyPlumbers = await prisma.plumber.findMany({
      where: { isOnDuty: true, isActive: true },
      select: { id: true, name: true, email: true },
    });

    // Atomic: update booking + create images + create offers + create event
    const [updated] = await prisma.$transaction([
      prisma.booking.update({
        where: { bookingRef },
        data: {
          status: "pending_assignment",
          serviceType,
          description,
          customerName,
          phone,
          email,
          address,
          accessNotes,
          confirmedAt: new Date(),
        },
        include: {
          slot: { select: { date: true, startTime: true, endTime: true } },
        },
      }),
      // Images
      ...(photoUrls && photoUrls.length > 0
        ? photoUrls.map((url, i) =>
            prisma.bookingImage.create({
              data: { bookingId: booking.id, url, publicId: photoPublicIds?.[i] ?? null },
            })
          )
        : []),
      // Offers for on-duty plumbers
      ...onDutyPlumbers.map((p) =>
        prisma.bookingOffer.create({
          data: { bookingId: booking.id, plumberId: p.id, status: "offered" },
        })
      ),
      // Timeline event
      prisma.bookingEvent.create({
        data: { bookingId: booking.id, eventType: "pending_assignment" },
      }),
    ]);

    // Fire-and-forget: notify all on-duty plumbers of the new offer
    if (onDutyPlumbers.length > 0) {
      notifyPlumbersNewOffer({
        bookingId:   booking.id,
        bookingRef:  updated.bookingRef,
        serviceType: updated.serviceType,
        postcode:    updated.postcode,
        slotDate:    updated.slot.date.toISOString().split("T")[0],
        slotStart:   updated.slot.startTime,
        slotEnd:     updated.slot.endTime,
        description: updated.description,
        plumbers:    onDutyPlumbers,
      }).catch((e) => console.error("[confirm] plumber notification error:", e));
    }

    return NextResponse.json({
      bookingRef: updated.bookingRef,
      status: updated.status,
      slot: {
        date: updated.slot.date.toISOString().split("T")[0],
        startTime: updated.slot.startTime,
        endTime: updated.slot.endTime,
      },
      customerName: updated.customerName,
      email: updated.email,
      photoCount: photoUrls?.length ?? 0,
    });
  } catch (err) {
    console.error("[bookings/confirm]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
