import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { calculateQuote } from "@/lib/quotes/engine";
import { generateEstimateRef } from "@/lib/quotes/generateEstimateRef";
import { getConfigNumber } from "@/lib/quotes/config";
import { getSiteSettings } from "@/lib/db/content";
import { z } from "zod";

const schema = z.object({
  waId:             z.string().min(1),
  serviceItemSlug:  z.string().min(1),
  urgencyKey:       z.enum(["standard", "same_day", "emergency"]),
  customerSupplied: z.boolean().default(false),
  quantity:         z.number().int().min(1).max(10).default(1),
});

function labourMinsToLabel(mins: number | null): string {
  if (!mins) return "Varies — engineer will advise";
  if (mins <= 60)  return "Under 1 hour";
  if (mins <= 90)  return "1–2 hours";
  if (mins <= 150) return "1.5–2.5 hours";
  if (mins <= 210) return "2–3.5 hours";
  return "Half day (4+ hours)";
}

export async function POST(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  try {
    const body   = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { waId, serviceItemSlug, urgencyKey, customerSupplied, quantity } = parsed.data;

    // Look up service item
    const serviceItem = await prisma.serviceItem.findUnique({
      where: { slug: serviceItemSlug },
    });

    if (!serviceItem || !serviceItem.isActive) {
      return NextResponse.json({ canEstimate: false, reason: "service_not_found" });
    }

    // inspection_first jobs cannot be estimated
    if (serviceItem.defaultQuoteType === "inspection_first") {
      return NextResponse.json({ canEstimate: false, reason: "inspection_required" });
    }

    // Load pricing rules (service-specific + global)
    const rules = await prisma.pricingRule.findMany({
      where: {
        isActive: true,
        OR: [{ serviceItemId: serviceItem.id }, { serviceItemId: null }],
      },
      orderBy: { sortOrder: "asc" },
    });

    if (rules.length === 0) {
      return NextResponse.json({ canEstimate: false, reason: "no_pricing_rules" });
    }

    const [validHours, vatRate] = await Promise.all([
      getConfigNumber("quote.valid_hours"),
      getConfigNumber("quote.vat_rate"),
    ]);

    const result = calculateQuote(
      {
        serviceItemId:   serviceItem.id,
        serviceItemName: serviceItem.name,
        quantity,
        urgencyKey,
        requestedAt:     new Date(),
        customerSupplied,
        quoteType:       "estimate",
      },
      rules,
      validHours || 48,
      vatRate,
    );

    // Find WaChat for relation link (optional)
    const chat = await prisma.waChat.findUnique({ where: { waId } });

    const estimateRef    = await generateEstimateRef();
    const validUntil     = new Date(Date.now() + result.validUntilHours * 60 * 60 * 1000);
    const estimatedTime  = labourMinsToLabel(serviceItem.defaultLabourMins ?? null);

    // Save quote to DB
    const quote = await prisma.quote.create({
      data: {
        quoteRef:         estimateRef, // reuse quoteRef as PP-NNN
        estimateRef:      estimateRef,
        waChatId:         chat?.id ?? null,
        quoteType:        "estimate",
        status:           "bot_estimate",
        subtotal:         result.subtotal,
        calloutFee:       result.calloutFee,
        urgencySurcharge: result.urgencySurcharge,
        vatAmount:        result.vatAmount,
        total:            result.total,
        validUntil,
        jobSummary:       serviceItem.name,
        createdBy:        "bot",
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
    });

    const s = await getSiteSettings();

    const whatsappMessage = [
      `Ref: ${estimateRef}`,
      `Service: ${serviceItem.name}`,
      `Estimated Total: £${result.total.toFixed(2)}`,
      `Estimated Time: ${estimatedTime}`,
      ``,
      `Note: This is an estimate only based on the details provided. Final cost may change after inspection or once the plumber checks the full issue on site.`,
      ``,
      `To proceed, reply: YES BOOK`,
      s.phone,
    ].join("\n");

    return NextResponse.json({
      canEstimate:     true,
      estimateRef,
      quoteId:         quote.id,
      serviceName:     serviceItem.name,
      total:           result.total,
      estimatedTime,
      validUntilHours: result.validUntilHours,
      whatsappMessage,
    });

  } catch (err) {
    console.error("[whatsapp/estimate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
