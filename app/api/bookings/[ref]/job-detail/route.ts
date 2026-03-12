/**
 * POST /api/bookings/[ref]/job-detail
 * Saves job details, auto-generates a quote, and sends it to the customer via WhatsApp.
 * Called from the public booking flow — no auth required (ref is the secret).
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateQuote } from "@/lib/quotes/engine";
import { generateQuoteRef } from "@/lib/quotes/generateRef";
import { getConfigNumber } from "@/lib/quotes/config";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { logEvent } from "@/lib/audit";
import { getSiteSettings } from "@/lib/db/content";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;

  try {
    const body = await req.json();
    const {
      serviceItemSlug,
      repairOrReplace,
      description,
      urgency,
      customerSupplied,
      suppliedPartNote,
      quoteTypePreference,
      accessDifficulty,
    } = body as {
      serviceItemSlug:      string;
      repairOrReplace:      string;
      description:          string;
      urgency:              string;
      customerSupplied:     boolean;
      suppliedPartNote?:    string;
      quoteTypePreference:  "fixed" | "estimate" | "inspection_first";
      accessDifficulty:     "easy" | "moderate" | "difficult";
    };

    if (!serviceItemSlug || !description || !urgency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Load booking (must be confirmed — not reserved or expired)
    const booking = await prisma.booking.findUnique({
      where: { bookingRef: ref },
      include: {
        slot: { select: { date: true, startTime: true, endTime: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    if (!booking.phone) {
      return NextResponse.json({ error: "Booking has no phone number" }, { status: 400 });
    }
    if (["expired", "cancelled"].includes(booking.status)) {
      return NextResponse.json({ error: "Booking is no longer active" }, { status: 409 });
    }

    // Load service item
    const serviceItem = await prisma.serviceItem.findUnique({
      where: { slug: serviceItemSlug },
    });
    if (!serviceItem) {
      return NextResponse.json({ error: "Service item not found" }, { status: 404 });
    }

    // Load pricing rules (item-specific + global)
    const rules = await prisma.pricingRule.findMany({
      where: {
        isActive: true,
        OR: [
          { serviceItemId: serviceItem.id },
          { serviceItemId: null },
        ],
      },
      orderBy: { sortOrder: "asc" },
    });

    const [validHours, vatRate] = await Promise.all([
      getConfigNumber("quote.valid_hours"),
      getConfigNumber("quote.vat_rate"),
    ]);

    const quoteType = quoteTypePreference ?? "fixed";

    const result = calculateQuote(
      {
        serviceItemId:    serviceItem.id,
        serviceItemName:  serviceItem.name,
        quantity:         1,
        urgencyKey:       urgency,
        requestedAt:      new Date(),
        customerSupplied: customerSupplied ?? false,
        quoteType,
        accessDifficulty: accessDifficulty ?? "easy",
      },
      rules,
      validHours || 48,
      vatRate,
    );

    const validUntil = new Date(Date.now() + result.validUntilHours * 60 * 60 * 1000);

    const jobSummary = [
      serviceItem.name,
      repairOrReplace !== "unsure" ? `(${repairOrReplace})` : null,
    ].filter(Boolean).join(" ");

    const fullDescription = [
      description,
      suppliedPartNote ? `Customer has parts: ${suppliedPartNote}` : null,
    ].filter(Boolean).join("\n");

    // Update booking + create quote in one transaction
    const [, quote] = await prisma.$transaction([
      prisma.booking.update({
        where: { id: booking.id },
        data: {
          serviceType: serviceItem.name,
          description: fullDescription,
          status:      "quote_sent",
        },
      }),
      prisma.quote.create({
        data: {
          quoteRef:         generateQuoteRef(),
          bookingId:        booking.id,
          serviceItemId:    serviceItem.id,
          quoteType,
          status:           "draft",
          subtotal:         result.subtotal,
          calloutFee:       result.calloutFee,
          urgencySurcharge: result.urgencySurcharge,
          vatAmount:        result.vatAmount,
          total:            result.total,
          validUntil,
          jobSummary,
          createdBy:        "system",
          lineItems: {
            create: result.lineItems.map((li) => ({
              description: li.description,
              quantity:    li.quantity,
              unitPrice:   li.unitPrice,
              lineTotal:   li.lineTotal,
              lineType:    li.lineType,
              isOptional:  li.isOptional,
              sortOrder:   li.sortOrder,
            })),
          },
        },
        include: { lineItems: true },
      }),
    ]);

    // Build and send WhatsApp message
    const settings = await getSiteSettings();

    let appointmentTime = "TBC";
    if (booking.slot) {
      const d = new Date(booking.slot.date);
      appointmentTime = `${d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })} ${booking.slot.startTime}–${booking.slot.endTime}`;
    }

    const lineItemsSummary = quote.lineItems
      .map((li) => `• ${li.description}: £${Number(li.lineTotal).toFixed(2)}`)
      .join("\n");

    const quoteTypeLabel =
      quoteType === "estimate"
        ? "Estimated total"
        : quoteType === "inspection_first"
        ? "Inspection (fixed quote to follow)"
        : "Fixed price";

    const messageBody = await renderNamedTemplate("initial_quote", {
      customer_name:    booking.customerName ?? "there",
      job_summary:      jobSummary,
      quote_reference:  quote.quoteRef,
      quote_type_label: quoteTypeLabel,
      total:            Number(quote.total).toFixed(2),
      valid_until:      new Date(validUntil).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      }),
      appointment_time: appointmentTime,
      line_items:       lineItemsSummary,
      phone:            settings.phone,
    });

    let waId = booking.phone.replace(/\D/g, "");
    if (waId.startsWith("0")) waId = "44" + waId.slice(1);

    await sendText(waId, messageBody);

    // Mark quote as sent
    await prisma.quote.update({
      where: { id: quote.id },
      data:  { status: "sent", sentAt: new Date() },
    });

    // Log outbound message
    await prisma.quoteMessage.create({
      data: {
        quoteId:   quote.id,
        direction: "outbound",
        channel:   "whatsapp",
        recipient: waId,
        body:      messageBody,
        status:    "sent",
      },
    });

    await logEvent({
      entityType: "quote",
      entityId:   quote.id,
      eventType:  "quote_sent",
      actorType:  "system",
      metadata:   {
        quoteRef:   quote.quoteRef,
        recipient:  waId,
        total:      String(quote.total),
        bookingRef: ref,
      },
    });

    return NextResponse.json({ ok: true, quoteRef: quote.quoteRef });

  } catch (err) {
    console.error("[bookings/job-detail]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
