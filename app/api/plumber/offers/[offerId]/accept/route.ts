import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { notifyCustomerAccepted } from "@/lib/notifications/booking";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { offerId } = await params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Find the offer and verify it belongs to this plumber
      const offer = await tx.bookingOffer.findUnique({
        where: { id: offerId },
        include: { booking: true },
      });

      if (!offer || offer.plumberId !== session.plumberId) {
        throw new Error("OFFER_NOT_FOUND");
      }
      if (offer.status !== "offered") {
        throw new Error("OFFER_ALREADY_RESPONDED");
      }
      if (offer.booking.status !== "pending_assignment") {
        throw new Error("BOOKING_ALREADY_ASSIGNED");
      }

      // Accept this offer
      await tx.bookingOffer.update({
        where: { id: offerId },
        data: { status: "accepted", respondedAt: new Date() },
      });

      // Assign booking to plumber
      const booking = await tx.booking.update({
        where: { id: offer.bookingId },
        data: { status: "accepted", assignedPlumberId: session.plumberId },
      });

      // Expire all other offers for this booking
      await tx.bookingOffer.updateMany({
        where: { bookingId: offer.bookingId, status: "offered", id: { not: offerId } },
        data: { status: "expired" },
      });

      // Record event
      await tx.bookingEvent.create({
        data: {
          bookingId: offer.bookingId,
          plumberId: session.plumberId,
          eventType: "accepted",
          notes: `Accepted by ${session.name}`,
        },
      });

      return booking;
    });

    // Fire-and-forget: fetch full details and notify customer
    prisma.booking.findUnique({
      where: { id: result.id },
      select: {
        bookingRef:    true,
        customerName:  true,
        email:         true,
        slot:          { select: { date: true, startTime: true, endTime: true } },
        assignedPlumber: { select: { name: true } },
      },
    }).then((full) => {
      if (full?.email && full.assignedPlumber) {
        return notifyCustomerAccepted({
          bookingId:     result.id,
          bookingRef:    full.bookingRef,
          customerName:  full.customerName ?? "Customer",
          customerEmail: full.email,
          plumberName:   full.assignedPlumber.name,
          slotDate:      full.slot.date.toISOString().split("T")[0],
          slotStart:     full.slot.startTime,
          slotEnd:       full.slot.endTime,
        });
      }
    }).catch((e) => console.error("[offers/accept] notification error:", e));

    return NextResponse.json({ ok: true, bookingId: result.id, bookingRef: result.bookingRef });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "UNKNOWN";
    if (msg === "OFFER_NOT_FOUND")        return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    if (msg === "OFFER_ALREADY_RESPONDED") return NextResponse.json({ error: "Already responded to this offer" }, { status: 409 });
    if (msg === "BOOKING_ALREADY_ASSIGNED") return NextResponse.json({ error: "Booking already taken by another plumber" }, { status: 409 });
    console.error("[offers/accept]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
