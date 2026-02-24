import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const { bookingId } = await params;
  const { stars, comment } = await req.json();

  if (!stars || typeof stars !== "number" || stars < 1 || stars > 5) {
    return NextResponse.json({ error: "Stars must be a number 1–5" }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { rating: true },
  });

  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.status !== "completed") {
    return NextResponse.json({ error: "Booking is not completed yet" }, { status: 422 });
  }
  if (booking.rating) {
    return NextResponse.json({ error: "Rating already submitted" }, { status: 409 });
  }

  await prisma.bookingRating.create({
    data: { bookingId, stars, comment: comment?.trim() || null },
  });

  return NextResponse.json({ ok: true });
}
