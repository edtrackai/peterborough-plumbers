import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { logEvent } from "@/lib/audit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const { newBookingId, notes } = await req.json();

    const revisit = await prisma.revisit.findUnique({ where: { id } });
    if (!revisit) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = await prisma.revisit.update({
      where: { id },
      data: {
        status:      "scheduled",
        notes:       notes ?? revisit.notes,
        newBookingId: newBookingId ?? null,
      },
    });

    await logEvent({
      entityType: "revisit",
      entityId:   id,
      eventType:  "revisit_scheduled",
      actorType:  "admin",
      metadata:   { revisitRef: revisit.revisitRef, newBookingId },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[admin/revisits/schedule]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
