import { prisma } from "@/lib/prisma";

/**
 * Finds all bookings where status="reserved" AND expiresAt < now().
 * For each: sets status="expired", decrements TimeSlot.bookedCount.
 * Called at the start of /api/availability/check and /api/slots/reserve
 * so expired slots are freed without needing a cron job on localhost.
 */
export async function cleanupExpired(): Promise<void> {
  const now = new Date();

  const expired = await prisma.booking.findMany({
    where: { status: "reserved", expiresAt: { lt: now } },
    select: { id: true, slotId: true },
  });

  if (expired.length === 0) return;

  // Group by slotId to handle multiple expirations per slot
  const slotDecrements = new Map<string, number>();
  for (const b of expired) {
    slotDecrements.set(b.slotId, (slotDecrements.get(b.slotId) ?? 0) + 1);
  }

  await prisma.$transaction([
    // Mark bookings expired
    prisma.booking.updateMany({
      where: { id: { in: expired.map((b) => b.id) } },
      data: { status: "expired" },
    }),
    // Decrement bookedCount for affected slots
    ...Array.from(slotDecrements.entries()).map(([slotId, count]) =>
      prisma.timeSlot.update({
        where: { id: slotId },
        data: { bookedCount: { decrement: count } },
      })
    ),
  ]);
}
