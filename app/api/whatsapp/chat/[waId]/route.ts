import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { z } from "zod";

type RouteContext = { params: Promise<{ waId: string }> };

/**
 * GET /api/whatsapp/chat/[waId]
 * Admin: returns full chat with messages.
 */
export async function GET(req: NextRequest, ctx: RouteContext) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  const { waId } = await ctx.params;

  try {
    const chat = await prisma.waChat.findUnique({
      where: { waId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (err) {
    console.error("[WA chat GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

const patchSchema = z.object({
  botActive: z.boolean().optional(),
  customerName: z.string().optional(),
  isEmergency: z.boolean().optional(),
});

/**
 * PATCH /api/whatsapp/chat/[waId]
 * Admin: update botActive, customerName, isEmergency.
 */
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  const { waId } = await ctx.params;

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const chat = await prisma.waChat.update({
      where: { waId },
      data: parsed.data,
    });

    return NextResponse.json(chat);
  } catch (err) {
    console.error("[WA chat PATCH]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
