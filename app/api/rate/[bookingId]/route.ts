import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

// 5 rating attempts per hour per IP — prevents spam ratings
const RATE_LIMIT = { name: "rate", max: 5, windowMs: 60 * 60 * 1000 };

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many rating submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  const { bookingId } = await params;

  let stars: unknown, comment: unknown;
  try {
    ({ stars, comment } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Must be a whole-number integer 1–5 — rejects 3.7, NaN, etc.
  if (typeof stars !== "number" || !Number.isInteger(stars) || stars < 1 || stars > 5) {
    return NextResponse.json({ error: "Stars must be a whole number 1–5" }, { status: 400 });
  }

  if (comment !== undefined && comment !== null) {
    if (typeof comment !== "string") {
      return NextResponse.json({ error: "Comment must be a string." }, { status: 400 });
    }
    if (comment.length > 500) {
      return NextResponse.json({ error: "Comment must be 500 characters or fewer." }, { status: 400 });
    }
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
    data: {
      bookingId,
      stars,
      comment: typeof comment === "string" ? comment.trim() || null : null,
    },
  });

  return NextResponse.json({ ok: true });
}
