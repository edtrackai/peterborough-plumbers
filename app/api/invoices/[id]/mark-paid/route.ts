import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { sendText } from "@/lib/whatsapp";
import { buildReceiptWhatsApp } from "@/lib/invoices/whatsapp";
import { logEvent } from "@/lib/audit";
import { z } from "zod";

const schema = z.object({
  paymentMethod: z.enum(["cash", "bank_transfer", "card"]),
  paymentRef:    z.string().max(100).optional(),
  paymentNote:   z.string().max(500).optional(),
  sendReceipt:   z.boolean().default(true),
});

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
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        booking: { select: { phone: true } },
        lead:    { select: { phone: true } },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (invoice.status === "paid") {
      return NextResponse.json({ error: "Already paid" }, { status: 409 });
    }
    if (invoice.status === "void") {
      return NextResponse.json({ error: "Invoice is void" }, { status: 409 });
    }

    const paidAt = new Date();

    await prisma.invoice.update({
      where: { id },
      data: {
        status:        "paid",
        paidAt,
        paymentMethod: parsed.data.paymentMethod,
        paymentRef:    parsed.data.paymentRef  ?? null,
        paymentNote:   parsed.data.paymentNote ?? null,
      },
    });

    await logEvent({
      entityType: "invoice",
      entityId:   id,
      eventType:  "invoice_paid",
      actorType:  "admin",
      metadata: {
        invoiceNumber: invoice.invoiceNumber,
        paymentMethod: parsed.data.paymentMethod,
        paymentRef:    parsed.data.paymentRef,
      },
    });

    // Send WhatsApp receipt if requested
    if (parsed.data.sendReceipt) {
      const phone = invoice.booking?.phone ?? invoice.lead?.phone;
      if (phone) {
        let waId = phone.replace(/\D/g, "");
        if (waId.startsWith("0")) waId = "44" + waId.slice(1);

        const receiptBody = await buildReceiptWhatsApp({
          invoiceNumber: invoice.invoiceNumber,
          total:         Number(invoice.total),
          paidAt,
        });

        await sendText(waId, receiptBody);

        await prisma.invoiceMessage.create({
          data: {
            invoiceId: id,
            direction: "outbound",
            channel:   "whatsapp",
            recipient: waId,
            body:      receiptBody,
            status:    "sent",
          },
        });
      }
    }

    return NextResponse.json({ ok: true, paidAt: paidAt.toISOString() });

  } catch (err) {
    console.error("[invoices/[id]/mark-paid]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
