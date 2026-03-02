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

  let lat: unknown, lng: unknown, accuracy: unknown;
  try {
    ({ lat, lng, accuracy } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    typeof lat !== "number" || typeof lng !== "number" ||
    !Number.isFinite(lat) || !Number.isFinite(lng)
  ) {
    return NextResponse.json({ error: "lat and lng must be finite numbers." }, { status: 400 });
  }

  if (lat < -90 || lat > 90) {
    return NextResponse.json({ error: "lat must be between -90 and 90." }, { status: 400 });
  }

  if (lng < -180 || lng > 180) {
    return NextResponse.json({ error: "lng must be between -180 and 180." }, { status: 400 });
  }

  if (accuracy !== undefined && accuracy !== null) {
    if (typeof accuracy !== "number" || !Number.isFinite(accuracy) || accuracy < 0 || accuracy > 10000) {
      return NextResponse.json({ error: "accuracy must be a positive number up to 10000." }, { status: 400 });
    }
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
      accuracy: typeof accuracy === "number" ? accuracy : null,
    },
  });

  return NextResponse.json({ ok: true });
}
