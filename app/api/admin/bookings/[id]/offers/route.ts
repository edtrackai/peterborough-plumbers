import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";

// ── GET /api/admin/bookings/[id]/offers ──────────────────────────────────────
// Returns all active plumbers + their offer status for this booking

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  const [booking, plumbers] = await Promise.all([
    prisma.booking.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        bookingRef: true,
        offers: {
          select: {
            id: true,
            plumberId: true,
            status: true,
            offeredAt: true,
            respondedAt: true,
          },
        },
      },
    }),
    prisma.plumber.findMany({
      where: { isActive: true },
      select: { id: true, name: true, phone: true, isOnDuty: true, lastSeenAt: true },
      orderBy: [{ isOnDuty: "desc" }, { name: "asc" }],
    }),
  ]);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Map offer status onto each plumber
  const offersByPlumber = Object.fromEntries(
    booking.offers.map((o) => [o.plumberId, o])
  );

  const plumbersWithStatus = plumbers.map((p) => ({
    id:         p.id,
    name:       p.name,
    phone:      p.phone,
    isOnDuty:   p.isOnDuty,
    lastSeenAt: p.lastSeenAt?.toISOString() ?? null,
    offer: offersByPlumber[p.id]
      ? {
          id:          offersByPlumber[p.id].id,
          status:      offersByPlumber[p.id].status,
          offeredAt:   offersByPlumber[p.id].offeredAt.toISOString(),
          respondedAt: offersByPlumber[p.id].respondedAt?.toISOString() ?? null,
        }
      : null,
  }));

  return NextResponse.json({
    bookingId:  booking.id,
    bookingRef: booking.bookingRef,
    status:     booking.status,
    plumbers:   plumbersWithStatus,
  });
}

// ── POST /api/admin/bookings/[id]/offers ─────────────────────────────────────
// Dispatch an offer to one or all plumbers

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  let plumberIds: unknown;
  try {
    ({ plumberIds } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Accept a single ID or array
  const ids: string[] = Array.isArray(plumberIds)
    ? plumberIds
    : typeof plumberIds === "string"
    ? [plumberIds]
    : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "At least one plumberId is required." }, { status: 400 });
  }
  if (ids.some((pid) => typeof pid !== "string" || pid.length === 0)) {
    return NextResponse.json({ error: "Invalid plumberId values." }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    select: { id: true, status: true, bookingRef: true },
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  if (!["pending_assignment", "reserved", "new"].includes(booking.status)) {
    return NextResponse.json(
      { error: `Cannot dispatch offers for a booking with status "${booking.status}".` },
      { status: 422 }
    );
  }

  // Verify all plumber IDs exist and are active
  const plumbers = await prisma.plumber.findMany({
    where: { id: { in: ids }, isActive: true },
    select: { id: true },
  });

  if (plumbers.length !== ids.length) {
    return NextResponse.json(
      { error: "One or more plumber IDs are invalid or inactive." },
      { status: 400 }
    );
  }

  // Get existing offers to avoid duplicating pending ones
  const existingOffers = await prisma.bookingOffer.findMany({
    where: { bookingId: id, plumberId: { in: ids }, status: "offered" },
    select: { plumberId: true },
  });
  const alreadyOffered = new Set(existingOffers.map((o) => o.plumberId));

  const newIds = ids.filter((pid) => !alreadyOffered.has(pid));
  if (newIds.length === 0) {
    return NextResponse.json({ error: "All selected plumbers already have a pending offer." }, { status: 409 });
  }

  // Create offers + ensure booking is pending_assignment in one transaction
  await prisma.$transaction([
    prisma.booking.update({
      where: { id },
      data: { status: "pending_assignment" },
    }),
    ...newIds.map((plumberId) =>
      prisma.bookingOffer.create({
        data: { bookingId: id, plumberId, status: "offered" },
      })
    ),
  ]);

  return NextResponse.json({ ok: true, dispatched: newIds.length });
}
