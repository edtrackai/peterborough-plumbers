import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

const VALID_REASONS = [
  "already_on_job",
  "too_far",
  "not_my_skill",
  "not_available_today",
  "vehicle_tools_issue",
  "other",
];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ offerId: string }> }
) {
  const session = await getPlumberSession();
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { offerId } = await params;
  const { rejectReason, rejectNote } = await req.json();

  if (!rejectReason || !VALID_REASONS.includes(rejectReason)) {
    return NextResponse.json({ error: "A valid reject reason is required" }, { status: 400 });
  }
  if (rejectReason === "other" && !rejectNote?.trim()) {
    return NextResponse.json({ error: "A note is required when reason is 'Other'" }, { status: 400 });
  }

  const offer = await prisma.bookingOffer.findUnique({ where: { id: offerId } });
  if (!offer || offer.plumberId !== session.plumberId) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }
  if (offer.status !== "offered") {
    return NextResponse.json({ error: "Already responded to this offer" }, { status: 409 });
  }

  await prisma.$transaction([
    prisma.bookingOffer.update({
      where: { id: offerId },
      data: { status: "rejected", rejectReason, rejectNote: rejectNote ?? null, respondedAt: new Date() },
    }),
    prisma.bookingEvent.create({
      data: {
        bookingId: offer.bookingId,
        plumberId: session.plumberId,
        eventType: "rejected",
        notes: `Rejected by ${session.name}: ${rejectReason}${rejectNote ? ` — ${rejectNote}` : ""}`,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
