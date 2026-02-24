import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

const PLUMBER_TRANSITIONS: Record<string, string[]> = {
  accepted:    ["en_route", "cancelled"],
  en_route:    ["arrived", "cancelled"],
  arrived:     ["in_progress", "cancelled"],
  in_progress: ["completed"],
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { bookingId } = await params;
  const { status: newStatus, notes } = await req.json();

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  if (booking.assignedPlumberId !== session.plumberId) {
    return NextResponse.json({ error: "This job is not assigned to you" }, { status: 403 });
  }

  const allowed = PLUMBER_TRANSITIONS[booking.status] ?? [];
  if (!allowed.includes(newStatus)) {
    return NextResponse.json(
      { error: `Cannot move from "${booking.status}" to "${newStatus}"` },
      { status: 422 }
    );
  }

  const data: Record<string, unknown> = { status: newStatus };
  if (newStatus === "completed") data.completedAt = new Date();

  await prisma.$transaction([
    prisma.booking.update({ where: { id: bookingId }, data }),
    prisma.bookingEvent.create({
      data: {
        bookingId,
        plumberId: session.plumberId,
        eventType: newStatus,
        notes: notes ?? null,
      },
    }),
  ]);

  return NextResponse.json({ ok: true, status: newStatus });
}
