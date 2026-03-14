import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { sendText } from "@/lib/whatsapp";
import { buildInvoiceWhatsApp } from "@/lib/invoices/whatsapp";
import { logEvent } from "@/lib/audit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        lineItems: { orderBy: { sortOrder: "asc" } },
        booking: {
          select: {
            phone:           true,
            customerName:    true,
            completedAt:     true,
            assignedPlumber: { select: { name: true } },
            quotes: {
              where:  { status: "approved" },
              select: { quoteRef: true, jobSummary: true },
              take:   1,
            },
          },
        },
        lead: { select: { phone: true, name: true } },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    if (!["draft", "overdue"].includes(invoice.status)) {
      return NextResponse.json(
        { error: `Invoice already ${invoice.status}` },
        { status: 409 },
      );
    }

    const phone = invoice.booking?.phone ?? invoice.lead?.phone;
    if (!phone) {
      return NextResponse.json(
        { error: "No phone number for this invoice" },
        { status: 400 },
      );
    }

    let waId = phone.replace(/\D/g, "");
    if (waId.startsWith("0")) waId = "44" + waId.slice(1);

    // Look up estimateRef from the linked quote if present
    let estimateRef: string | null = null;
    if (invoice.quoteId) {
      const linkedQuote = await prisma.quote.findUnique({
        where:  { id: invoice.quoteId },
        select: { estimateRef: true },
      });
      estimateRef = linkedQuote?.estimateRef ?? null;
    }

    const body = await buildInvoiceWhatsApp({
      invoiceNumber: invoice.invoiceNumber,
      estimateRef,
      jobSummary:    invoice.booking?.quotes[0]?.jobSummary ?? "Plumbing job",
      plumberName:   invoice.booking?.assignedPlumber?.name ?? null,
      completedDate: invoice.booking?.completedAt ?? invoice.createdAt,
      lineItems: invoice.lineItems.map(l => ({
        description: l.description,
        lineTotal:   Number(l.lineTotal),
        lineType:    l.lineType,
      })),
      subtotal:  Number(invoice.subtotal),
      vatRate:   Number(invoice.vatRate),
      vatAmount: Number(invoice.vatAmount),
      total:     Number(invoice.total),
      dueDate:   invoice.dueDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await sendText(waId, body);

    await prisma.$transaction([
      prisma.invoice.update({
        where: { id },
        data:  { status: "sent", sentAt: new Date() },
      }),
      prisma.invoiceMessage.create({
        data: {
          invoiceId: id,
          direction: "outbound",
          channel:   "whatsapp",
          recipient: waId,
          body,
          status:    "sent",
        },
      }),
    ]);

    await logEvent({
      entityType: "invoice",
      entityId:   id,
      eventType:  "invoice_sent",
      actorType:  "admin",
      metadata: {
        invoiceNumber: invoice.invoiceNumber,
        recipient:     waId,
        total:         String(invoice.total),
      },
    });

    return NextResponse.json({ ok: true, sentAt: new Date().toISOString() });

  } catch (err) {
    console.error("[invoices/[id]/send]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
