import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { notifyPlumbersNewOffer } from "@/lib/notifications/plumber";
import { getEligiblePlumbersForRequest } from "@/lib/plumber/eligibility";

// ── POST /api/admin/bookings/[id]/renotify ────────────────────────────────────
// Re-sends the job offer email to all currently eligible plumbers.
// Unlike the offers endpoint, this sends to plumbers who already have an offer
// so it works as a "they didn't get the email" recovery action.

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      bookingRef: true,
      serviceType: true,
      postcode: true,
      description: true,
      slot: { select: { date: true, startTime: true, endTime: true } },
    },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (!["pending_assignment", "reserved", "new"].includes(booking.status)) {
    return NextResponse.json(
      { error: `Cannot re-notify for a booking with status "${booking.status}".` },
      { status: 422 }
    );
  }

  const eligiblePlumbers = await getEligiblePlumbersForRequest({
    serviceType: booking.serviceType,
  });

  if (eligiblePlumbers.length === 0) {
    return NextResponse.json(
      { error: "No eligible plumbers are currently on duty." },
      { status: 404 }
    );
  }

  // Create offers for plumbers who don't already have one
  const existingOffers = await prisma.bookingOffer.findMany({
    where: { bookingId: id, plumberId: { in: eligiblePlumbers.map((p) => p.id) } },
    select: { plumberId: true },
  });
  const alreadyHasOffer = new Set(existingOffers.map((o) => o.plumberId));
  const newOfferIds = eligiblePlumbers.filter((p) => !alreadyHasOffer.has(p.id));

  if (newOfferIds.length > 0) {
    await prisma.$transaction(
      newOfferIds.map((p) =>
        prisma.bookingOffer.create({
          data: { bookingId: id, plumberId: p.id, status: "offered" },
        })
      )
    );
  }

  // Send emails (fire-and-forget)
  notifyPlumbersNewOffer({
    bookingId:   booking.id,
    bookingRef:  booking.bookingRef,
    serviceType: booking.serviceType,
    postcode:    booking.postcode,
    slotDate:    booking.slot.date.toISOString().split("T")[0],
    slotStart:   booking.slot.startTime,
    slotEnd:     booking.slot.endTime,
    description: booking.description,
    plumbers:    eligiblePlumbers,
  }).catch((e) => console.error("[admin/renotify] notification error:", e));

  return NextResponse.json({ ok: true, notified: eligiblePlumbers.length });
}
