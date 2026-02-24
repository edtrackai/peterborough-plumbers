import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { confirmBookingSchema } from "@/lib/validations/booking-system";

export async function POST(req: NextRequest) {
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
    } = parsed.data;

    const booking = await prisma.booking.findUnique({
      where: { bookingRef },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status !== "reserved") {
      return NextResponse.json(
        { error: "Booking is no longer in reserved state", status: booking.status },
        { status: 409 }
      );
    }

    // Check reservation hasn't expired
    if (booking.expiresAt && booking.expiresAt < new Date()) {
      return NextResponse.json({ error: "Reservation has expired" }, { status: 410 });
    }

    const updated = await prisma.booking.update({
      where: { bookingRef },
      data: {
        status: "new",
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
    });

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
    });
  } catch (err) {
    console.error("[bookings/confirm]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
