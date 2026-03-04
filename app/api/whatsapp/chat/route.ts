import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { z } from "zod";

const schema = z.object({
  waId: z.string().min(1),
  messageText: z.string().min(1),
  waMessageId: z.string().optional(),
  senderName: z.string().optional(),
});

/**
 * POST /api/whatsapp/chat
 * n8n calls this on EVERY incoming WhatsApp message.
 * - Dedup check via waMessageId
 * - Upsert WaChat
 * - Store WaMessage (role: "user")
 * - Return { botActive, chatId, isNewChat, isDuplicate }
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

    const { waId, messageText, waMessageId, senderName } = parsed.data;

    // Dedup check
    if (waMessageId) {
      const existing = await prisma.waMessage.findUnique({
        where: { waMessageId },
      });
      if (existing) {
        return NextResponse.json({
          isDuplicate: true,
          botActive: false,
          chatId: existing.chatId,
          isNewChat: false,
        });
      }
    }

    // Upsert chat
    const existingChat = await prisma.waChat.findUnique({ where: { waId } });
    const isNewChat = !existingChat;

    const chat = await prisma.waChat.upsert({
      where: { waId },
      create: {
        waId,
        customerName: senderName ?? null,
        customerPhone: waId,
        lastMessageAt: new Date(),
      },
      update: {
        lastMessageAt: new Date(),
        ...(senderName && !existingChat?.customerName ? { customerName: senderName } : {}),
      },
    });

    // Store user message
    await prisma.waMessage.create({
      data: {
        chatId: chat.id,
        role: "user",
        content: messageText,
        waMessageId: waMessageId ?? null,
      },
    });

    return NextResponse.json({
      isDuplicate: false,
      botActive: chat.botActive,
      chatId: chat.id,
      isNewChat,
    });
  } catch (err) {
    console.error("[WA chat POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
