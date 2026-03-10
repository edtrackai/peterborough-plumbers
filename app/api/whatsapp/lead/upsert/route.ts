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
 * POST /api/whatsapp/lead/upsert
 * n8n calls when AI captures enough data to create/update a lead.
 * Creates Lead if not exists, updates if already present (same phone).
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

    // Check for existing lead with same phone
    const existing = await prisma.lead.findFirst({
      where: { phone },
      orderBy: { createdAt: "desc" },
    });

    let lead;
    let created = false;

    if (existing) {
      lead = await prisma.lead.update({
        where: { id: existing.id },
        data: {
          ...(name !== existing.name ? { name } : {}),
          postcode,
          ...(serviceType && !existing.serviceType ? { serviceType } : {}),
        },
      });
    } else {
      lead = await prisma.lead.create({
        data: {
          name,
          phone,
          postcode,
          serviceType: serviceType ?? null,
          source: "whatsapp",
          status: "new",
        },
      });
      created = true;
    }

    // Update WaChat with lead info
    await prisma.waChat.update({
      where: { waId },
      data: {
        customerName: name,
        customerPhone: phone,
        postcode,
        serviceType: serviceType ?? undefined,
        leadCaptured: true,
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id, created }, { status: created ? 201 : 200 });
  } catch (err) {
    console.error("[WA lead upsert POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
