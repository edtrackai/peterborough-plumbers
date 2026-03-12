import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { calculateQuote, type QuoteInput } from "@/lib/quotes/engine";
import { generateQuoteRef } from "@/lib/quotes/generateRef";
import { getConfigNumber } from "@/lib/quotes/config";
import { logEvent } from "@/lib/audit";

export async function POST(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  try {
    const body = await req.json();
    const { bookingId, leadId, serviceItemId, jobInput } = body as {
      bookingId?:    string;
      leadId?:       string;
      serviceItemId: string;
      jobInput:      QuoteInput;
    };

    if (!serviceItemId) {
      return NextResponse.json({ error: "serviceItemId is required" }, { status: 400 });
    }
    if (!bookingId && !leadId) {
      return NextResponse.json({ error: "bookingId or leadId is required" }, { status: 400 });
    }

    // Load service item + its pricing rules + global rules
    const [serviceItem, rules] = await Promise.all([
      prisma.serviceItem.findUnique({ where: { id: serviceItemId } }),
      prisma.pricingRule.findMany({
        where: {
          isActive: true,
          OR: [
            { serviceItemId },
            { serviceItemId: null }, // global rules
          ],
        },
        orderBy: { sortOrder: "asc" },
      }),
    ]);

    if (!serviceItem) {
      return NextResponse.json({ error: "Service item not found" }, { status: 404 });
    }

    const [validHours, vatRate] = await Promise.all([
      getConfigNumber("quote.valid_hours"),
      getConfigNumber("quote.vat_rate"),
    ]);

    const result = calculateQuote(
      { ...jobInput, serviceItemId, serviceItemName: serviceItem.name },
      rules,
      validHours || 48,
      vatRate,
    );

    const validUntil = new Date(Date.now() + (result.validUntilHours * 60 * 60 * 1000));

    // Determine job summary
    const jobSummary = jobInput.serviceItemName || serviceItem.name;

    const quote = await prisma.quote.create({
      data: {
        quoteRef:         generateQuoteRef(),
        bookingId:        bookingId ?? null,
        leadId:           leadId ?? null,
        serviceItemId,
        quoteType:        jobInput.quoteType,
        status:           "draft",
        subtotal:         result.subtotal,
        calloutFee:       result.calloutFee,
        urgencySurcharge: result.urgencySurcharge,
        vatAmount:        result.vatAmount,
        total:            result.total,
        validUntil,
        jobSummary,
        createdBy:        "admin",
        lineItems: {
          create: result.lineItems.map(li => ({
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
    });

    await logEvent({
      entityType: "quote",
      entityId:   quote.id,
      eventType:  "quote_created",
      actorType:  "admin",
      metadata:   { quoteRef: quote.quoteRef, total: String(quote.total), bookingId, leadId },
    });

    return NextResponse.json({
      quoteId:   quote.id,
      quoteRef:  quote.quoteRef,
      lineItems: quote.lineItems,
      total:     Number(quote.total),
      status:    quote.status,
    }, { status: 201 });

  } catch (err) {
    console.error("[quotes/generate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
