import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { bookingId } = await params;
  const { lat, lng, accuracy } = await req.json();

  if (typeof lat !== "number" || typeof lng !== "number") {
    return NextResponse.json({ error: "lat and lng are required numbers" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.assignedPlumberId !== session.plumberId) {
    return NextResponse.json({ error: "Booking not found or not assigned to you" }, { status: 404 });
  }

  await prisma.bookingLocation.create({
    data: {
      bookingId,
      plumberId: session.plumberId,
      lat,
      lng,
      accuracy: accuracy ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
