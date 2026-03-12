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
    const { reason } = await req.json();

    const variation = await prisma.variation.findUnique({ where: { id } });
    if (!variation) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.variation.update({
      where: { id },
      data:  { status: "cancelled" },
    });

    await logEvent({
      entityType: "variation",
      entityId:   id,
      eventType:  "variation_office_rejected",
      actorType:  "admin",
      metadata:   { variationRef: variation.variationRef, reason },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/variations/reject]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
