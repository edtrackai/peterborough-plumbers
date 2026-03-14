import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendText } from "@/lib/whatsapp";
import { buildOverdueWhatsApp } from "@/lib/invoices/whatsapp";
import { logEvent } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const cronSecret = req.headers.get("x-cron-secret");
  if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const overdueInvoices = await prisma.invoice.findMany({
      where: {
        status:  "sent",
        dueDate: { lt: new Date() },
      },
      include: {
        booking: { select: { phone: true } },
        lead:    { select: { phone: true } },
      },
    });

    let processed = 0;

    for (const invoice of overdueInvoices) {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data:  { status: "overdue" },
      });

      const phone = invoice.booking?.phone ?? invoice.lead?.phone;
      if (phone) {
        let waId = phone.replace(/\D/g, "");
        if (waId.startsWith("0")) waId = "44" + waId.slice(1);

        const body = await buildOverdueWhatsApp({
          invoiceNumber: invoice.invoiceNumber,
          total:         Number(invoice.total),
          dueDate:       invoice.dueDate!,
        });

        await sendText(waId, body);

        await prisma.invoiceMessage.create({
          data: {
            invoiceId: invoice.id,
            direction: "outbound",
            channel:   "whatsapp",
            recipient: waId,
            body,
            status:    "sent",
          },
        });
      }

      await logEvent({
        entityType: "invoice",
        entityId:   invoice.id,
        eventType:  "invoice_overdue",
        actorType:  "system",
        metadata: {
          invoiceNumber: invoice.invoiceNumber,
          dueDate:       String(invoice.dueDate),
        },
      });

      processed++;
    }

    return NextResponse.json({ processed });
  } catch (err) {
    console.error("[cron/invoice-overdue]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
