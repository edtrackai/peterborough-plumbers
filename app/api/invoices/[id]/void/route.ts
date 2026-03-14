import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { logEvent } from "@/lib/audit";
import { z } from "zod";

const schema = z.object({ reason: z.string().min(3).max(500) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body   = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "reason is required" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({ where: { id } });
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (invoice.status === "paid") {
      return NextResponse.json({ error: "Cannot void a paid invoice" }, { status: 409 });
    }
    if (invoice.status === "void") {
      return NextResponse.json({ error: "Already void" }, { status: 409 });
    }

    await prisma.invoice.update({
      where: { id },
      data: {
        status:     "void",
        voidedAt:   new Date(),
        voidReason: parsed.data.reason,
      },
    });

    await logEvent({
      entityType: "invoice",
      entityId:   id,
      eventType:  "invoice_voided",
      actorType:  "admin",
      metadata: {
        invoiceNumber: invoice.invoiceNumber,
        reason:        parsed.data.reason,
      },
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[invoices/[id]/void]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
