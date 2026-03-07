import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanupExpired } from "@/lib/booking/cleanupExpired";
import { generateBookingRef } from "@/lib/booking/generateRef";
import { reserveSlotSchema } from "@/lib/validations/booking-system";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, { name: "slots-reserve", max: 10, windowMs: 10 * 60 * 1000 });
  if (limited) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(retryAfterSec) } });
  }
  try {
    const body = await req.json();
    const parsed = reserveSlotSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { slotId, postcode, zonePrefix } = parsed.data;

    // Free expired reservations first
    await cleanupExpired();

    // Use a transaction to atomically check + reserve
    const result = await prisma.$transaction(async (tx) => {
      // Lock the slot row and re-check availability
      const slot = await tx.timeSlot.findUnique({
        where: { id: slotId },
      });

      if (!slot || !slot.isActive) {
        return { ok: false, reason: "slot_not_found" } as const;
      }

      if (slot.bookedCount >= slot.capacity) {
        return { ok: false, reason: "slot_full" } as const;
      }

      // Increment bookedCount
      await tx.timeSlot.update({
        where: { id: slotId },
        data: { bookedCount: { increment: 1 } },
      });

      // Create booking in "reserved" state, expires in 15 minutes
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const booking = await tx.booking.create({
        data: {
          bookingRef: generateBookingRef(),
          status: "reserved",
          postcode,
          zonePrefix,
          slotId,
          expiresAt,
        },
      });

      return { ok: true, booking } as const;
    });

    if (!result.ok) {
      const status = result.reason === "slot_full" ? 409 : 404;
      return NextResponse.json({ error: result.reason }, { status });
    }

    return NextResponse.json(
      {
        bookingRef: result.booking.bookingRef,
        expiresAt: result.booking.expiresAt!.toISOString(),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[slots/reserve]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
