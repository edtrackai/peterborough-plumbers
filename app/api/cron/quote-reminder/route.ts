/**
 * Cron: send quote reminders N hours before expiry.
 * Schedule: every 30 minutes in vercel.json
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getConfigNumber } from "@/lib/quotes/config";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { logEvent } from "@/lib/audit";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (process.env.CRON_SECRET && secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const reminderHours = await getConfigNumber("quote.reminder_after_hours");
  const windowMs = reminderHours * 60 * 60 * 1000;

  const now = new Date();
  const windowStart = new Date(now.getTime() + windowMs - 30 * 60 * 1000); // 30min window
  const windowEnd   = new Date(now.getTime() + windowMs);

  // Quotes expiring within the reminder window that haven't had a reminder yet
  const quotes = await prisma.quote.findMany({
    where: {
      status:     "sent",
      validUntil: { gte: windowStart, lt: windowEnd },
      // No reminder sent yet — check via messages
      messages:   { none: { direction: "outbound", body: { contains: "reminder" } } },
    },
    include: {
      booking: { select: { phone: true, customerName: true } },
      lead:    { select: { phone: true, name: true } },
    },
  });

  let sent = 0;

  for (const quote of quotes) {
    const phone = quote.booking?.phone ?? quote.lead?.phone;
    if (!phone) continue;

    const customerName = quote.booking?.customerName ?? quote.lead?.name ?? "there";

    const body = await renderNamedTemplate("quote_reminder", {
      customer_name:   customerName,
      quote_reference: quote.quoteRef,
      job_summary:     quote.jobSummary ?? "your plumbing job",
      valid_until:     quote.validUntil
        ? new Date(quote.validUntil).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" })
        : "soon",
      phone: "",
    });

    let waId = phone.replace(/\D/g, "");
    if (waId.startsWith("0")) waId = "44" + waId.slice(1);

    try {
      await sendText(waId, body);

      await prisma.quoteMessage.create({
        data: {
          quoteId:   quote.id,
          direction: "outbound",
          channel:   "whatsapp",
          recipient: waId,
          body,
          status:    "sent",
        },
      });

      await logEvent({
        entityType: "quote",
        entityId:   quote.id,
        eventType:  "quote_reminder_sent",
        actorType:  "system",
        metadata:   { quoteRef: quote.quoteRef, recipient: waId },
      });

      sent++;
    } catch (e) {
      console.error("[cron/quote-reminder] send failed:", e);
    }
  }

  return NextResponse.json({ reminders_sent: sent });
}
