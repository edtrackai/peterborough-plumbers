import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { z } from "zod";

const schema = z.object({
  waId: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  postcode: z.string().min(2).transform((v) => v.trim().toUpperCase()),
  serviceType: z.string().optional(),
});

/**
 * POST /api/whatsapp/lead
 * n8n calls when AI captures name + phone + postcode.
 * Creates Lead with source: "whatsapp" and links to WaChat.
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

    const { waId, name, phone, postcode, serviceType } = parsed.data;

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        postcode,
        serviceType: serviceType ?? null,
        source: "whatsapp",
      },
    });

    // Mark lead as captured and reset chat fields so next message starts fresh
    await prisma.waChat.update({
      where: { waId },
      data: {
        customerName: name,
        customerPhone: phone,
        postcode,
        serviceType: serviceType ?? null,
        leadCaptured: true,
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[WA lead POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
