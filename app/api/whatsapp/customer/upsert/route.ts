import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { z } from "zod";

const schema = z.object({
  waId: z.string().min(1),
  senderName: z.string().optional(),
  fields: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    postcode: z.string().optional(),
    serviceType: z.string().optional(),
    issueSummary: z.string().optional(),
    urgency: z.string().optional(),
    preferredTime: z.string().optional(),
    propertyType: z.string().optional(),
    customerType: z.string().optional(),
    needsLeadUpdate: z.boolean().optional(),
  }).optional(),
});

/**
 * POST /api/whatsapp/customer/upsert
 * n8n calls this after AI extracts structured data from conversation.
 * Updates WaChat with latest extracted fields.
 */
export async function POST(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { waId, senderName, fields } = parsed.data;

    const updateData: Record<string, string | boolean | null> = {};

    if (senderName) updateData.customerName = senderName;
    if (fields?.name) updateData.customerName = fields.name;
    if (fields?.phone) updateData.customerPhone = fields.phone;
    if (fields?.postcode) updateData.postcode = fields.postcode.toUpperCase().trim();
    if (fields?.serviceType) updateData.serviceType = fields.serviceType;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, updated: false });
    }

    await prisma.waChat.update({
      where: { waId },
      data: updateData,
    });

    return NextResponse.json({ success: true, updated: true });
  } catch (err) {
    console.error("[WA customer upsert POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
