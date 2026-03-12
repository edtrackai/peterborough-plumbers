import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { logEvent } from "@/lib/audit";
import { getSiteSettings } from "@/lib/db/content";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const quote = await prisma.quote.findUnique({
      where: { id },
      include: {
        lineItems: { orderBy: { sortOrder: "asc" } },
        booking:   { select: { phone: true, customerName: true, slot: { select: { date: true, startTime: true, endTime: true } } } },
        lead:      { select: { phone: true, name: true } },
      },
    });

    if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    if (!["draft", "declined"].includes(quote.status)) {
      return NextResponse.json({ error: `Quote is already ${quote.status}` }, { status: 409 });
    }

    const phone = quote.booking?.phone ?? quote.lead?.phone;
    const customerName = quote.booking?.customerName ?? quote.lead?.name ?? "there";

    if (!phone) {
      return NextResponse.json({ error: "No phone number found for this quote" }, { status: 400 });
    }

    const settings = await getSiteSettings();

    // Format slot date/time
    let appointmentTime = "TBC";
    if (quote.booking?.slot) {
      const d = new Date(quote.booking.slot.date);
      appointmentTime = `${d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} ${quote.booking.slot.startTime}–${quote.booking.slot.endTime}`;
    }

    // Build line items summary for template
    const lineItemsSummary = quote.lineItems
      .map(li => `• ${li.description}: £${Number(li.lineTotal).toFixed(2)}`)
      .join("\n");

    const quoteTypeLabel = quote.quoteType === "estimate"
      ? "Estimated total"
      : quote.quoteType === "inspection_first"
      ? "Inspection (fixed quote to follow)"
      : "Fixed price";

    const body = await renderNamedTemplate("initial_quote", {
      customer_name:    customerName,
      job_summary:      quote.jobSummary ?? "plumbing job",
      quote_reference:  quote.quoteRef,
      quote_type_label: quoteTypeLabel,
      total:            Number(quote.total).toFixed(2),
      valid_until:      quote.validUntil
        ? new Date(quote.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
        : "48 hours",
      appointment_time: appointmentTime,
      line_items:       lineItemsSummary,
      phone:            settings.phone,
    });

    // Normalise phone to WhatsApp format
    let waId = phone.replace(/\D/g, "");
    if (waId.startsWith("0")) waId = "44" + waId.slice(1);

    await sendText(waId, body);

    // Update quote status
    await prisma.quote.update({
      where: { id },
      data:  { status: "sent", sentAt: new Date() },
    });

    // Update booking status if applicable
    if (quote.bookingId) {
      await prisma.booking.updateMany({
        where: { id: quote.bookingId, status: { in: ["quote_requested", "quote_draft"] } },
        data:  { status: "quote_sent" },
      });
    }

    // Log outbound message
    await prisma.quoteMessage.create({
      data: {
        quoteId:   id,
        direction: "outbound",
        channel:   "whatsapp",
        recipient: waId,
        body,
        status:    "sent",
      },
    });

    await logEvent({
      entityType: "quote",
      entityId:   id,
      eventType:  "quote_sent",
      actorType:  "admin",
      metadata:   { quoteRef: quote.quoteRef, recipient: waId, total: String(quote.total) },
    });

    return NextResponse.json({ ok: true, sentAt: new Date().toISOString() });

  } catch (err) {
    console.error("[quotes/[id]/send]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
