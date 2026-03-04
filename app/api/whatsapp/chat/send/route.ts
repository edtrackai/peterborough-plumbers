import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendText } from "@/lib/whatsapp";
import { z } from "zod";

const schema = z.object({
  waId: z.string().min(1),
  message: z.string().min(1).max(4096),
});

/**
 * POST /api/whatsapp/chat/send
 * Admin sends a manual message to a customer via WhatsApp.
 * Stores message in DB with role "assistant" and sends via Meta API.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { waId, message } = parsed.data;

    // Find chat
    const chat = await prisma.waChat.findUnique({ where: { waId } });
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Send via WhatsApp API
    const sent = await sendText(waId, message);
    if (!sent) {
      return NextResponse.json({ error: "Failed to send WhatsApp message" }, { status: 502 });
    }

    // Store in DB
    const msg = await prisma.waMessage.create({
      data: {
        chatId: chat.id,
        role: "assistant",
        content: message,
        category: "admin_manual",
      },
    });

    // Update last message time
    await prisma.waChat.update({
      where: { waId },
      data: { lastMessageAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      messageId: msg.id,
      createdAt: msg.createdAt.toISOString(),
    });
  } catch (err) {
    console.error("[WA send POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
