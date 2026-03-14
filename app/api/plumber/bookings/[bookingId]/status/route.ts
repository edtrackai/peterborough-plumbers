import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { buildInvoiceFromBooking } from "@/lib/invoices/build";

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

  let newStatus: unknown, notes: unknown, estimatedArrival: unknown;
  try {
    ({ status: newStatus, notes, estimatedArrival } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof newStatus !== "string") {
    return NextResponse.json({ error: "Status is required." }, { status: 400 });
  }

  if (notes !== undefined && notes !== null) {
    if (typeof notes !== "string") {
      return NextResponse.json({ error: "Notes must be a string." }, { status: 400 });
    }
    if (notes.length > 500) {
      return NextResponse.json({ error: "Notes must be 500 characters or fewer." }, { status: 400 });
    }
  }

  const validNotes: string | null = typeof notes === "string" ? notes.trim() || null : null;

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
  // Store ETA when plumber starts journey — used by customer tracker
  if (newStatus === "en_route" && typeof estimatedArrival === "string") {
    const eta = new Date(estimatedArrival);
    if (!isNaN(eta.getTime())) data.estimatedArrival = eta;
  }

  await prisma.$transaction([
    prisma.booking.update({ where: { id: bookingId }, data }),
    prisma.bookingEvent.create({
      data: {
        bookingId,
        plumberId: session.plumberId,
        eventType: newStatus,
        notes: validNotes,
      },
    }),
  ]);

  // Fire-and-forget: auto-generate invoice when job is marked complete
  if (newStatus === "completed") {
    buildInvoiceFromBooking(bookingId, "system").catch((err) => {
      console.error("[auto-invoice] Failed to generate invoice for booking", bookingId, err);
    });
  }

  return NextResponse.json({ ok: true, status: newStatus });
}
