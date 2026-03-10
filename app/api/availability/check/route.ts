import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAvailabilitySchema } from "@/lib/validations/booking-system";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

// Extract outward code prefix from a UK postcode: "PE1 1AA" → "PE1"
function normalisePostcode(raw: string): string | null {
  const clean = raw.replace(/\s+/g, "").toUpperCase();
  // Match standard UK postcode patterns (PE1, PE10, CB1, etc.)
  const match = clean.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\d[A-Z]{2}$|^([A-Z]{1,2}\d{1,2}[A-Z]?)$/);
  if (!match) return null;
  return (match[1] ?? match[2]) ?? null;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, { name: "availability-check", max: 20, windowMs: 10 * 60 * 1000 });
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(retryAfterSec) } });
  }
  try {
    const body = await req.json();
    const parsed = checkAvailabilitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { postcode } = parsed.data;
    const prefix = normalisePostcode(postcode);

    if (!prefix) {
      return NextResponse.json(
        { error: "Validation failed", fields: { postcode: ["Enter a valid UK postcode"] } },
        { status: 400 }
      );
    }

    // Check if the zone is served
    const zone = await prisma.serviceZone.findFirst({
      where: { prefix, isActive: true },
    });

    if (!zone) {
      return NextResponse.json(
        { available: false, reason: "outside_zone", prefix },
        { status: 200 }
      );
    }

    // Fetch available slots for the next 14 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoff = new Date(today);
    cutoff.setDate(today.getDate() + 14);

    const slots = await prisma.timeSlot.findMany({
      where: {
        date: { gt: today, lte: cutoff },
        isActive: true,
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    // Prisma doesn't support column-to-column comparisons, filter in JS
    const available = slots.filter((s) => s.bookedCount < s.capacity);

    return NextResponse.json({
      available: available.length > 0,
      zone: { prefix: zone.prefix, zoneName: zone.zoneName },
      slots: available.map((s) => ({
        id: s.id,
        date: s.date.toISOString().split("T")[0],
        startTime: s.startTime,
        endTime: s.endTime,
        spotsLeft: s.capacity - s.bookedCount,
      })),
    });
  } catch (err) {
    console.error("[availability/check]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
