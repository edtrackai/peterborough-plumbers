import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { z } from "zod";

const schema = z.object({
  waId: z.string().min(1),
  replyText: z.string().min(1),
  category: z.string().optional(),
});

/**
 * POST /api/whatsapp/chat/bot-reply
 * n8n calls this AFTER AI Agent generates a reply.
 * Stores bot message in WaMessage with role "assistant".
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

    const { waId, replyText, category } = parsed.data;

    const chat = await prisma.waChat.findUnique({ where: { waId } });
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    await prisma.waMessage.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: replyText,
        category: category ?? null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[WA bot-reply POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
