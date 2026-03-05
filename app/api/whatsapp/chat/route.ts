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

// Extract UK postcodes (PE area + general UK format)
const POSTCODE_RE = /\b([A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2})\b/i;

// Map keywords → service types
const SERVICE_KEYWORDS: Record<string, string[]> = {
  "Emergency Plumbing": ["emergency", "burst", "flood", "flooding", "leak", "leaking", "no water", "water everywhere"],
  "Boiler Repair": ["boiler", "boiler repair", "boiler broken", "no heating", "no hot water", "error code"],
  "Boiler Service": ["boiler service", "annual service", "service boiler"],
  "Gas Safety Certificate": ["gas safety", "cp12", "gas certificate", "landlord certificate", "gas check"],
  "Central Heating": ["heating", "radiator", "radiators", "cold radiator", "heating not working"],
  "Bathroom Installation": ["bathroom", "bathroom install", "bathroom fitting", "new bathroom", "shower install"],
  "Drain Blockage": ["drain", "blocked drain", "drainage", "sewage", "blocked toilet", "toilet blocked"],
  "Leak Detection": ["leak detection", "damp", "water damage", "wet wall", "wet ceiling"],
  "Plumbing Repair": ["tap", "toilet", "cistern", "pipe", "plumbing repair", "dripping", "running toilet"],
  "Landlord Services": ["landlord", "tenant", "rental property", "hmo"],
};

function extractPostcode(text: string): string | null {
  const match = text.match(POSTCODE_RE);
  return match ? match[1].toUpperCase().replace(/\s+/g, " ") : null;
}

function detectServiceType(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) return service;
  }
  return null;
}

/**
 * POST /api/whatsapp/chat
 * n8n calls this on EVERY incoming WhatsApp message.
 * - Dedup check via waMessageId
 * - Upsert WaChat
 * - Store WaMessage (role: "user")
 * - Auto-extract postcode & serviceType from messages
 * - Auto-create Lead when enough info collected
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

    // Stale session detection — if last message was >1 hour ago, treat as new conversation
    const STALE_MINUTES = 60;
    const minutesSinceLastMsg = existingChat
      ? (Date.now() - new Date(existingChat.lastMessageAt).getTime()) / 60000
      : Infinity;
    const isStaleSession = minutesSinceLastMsg > STALE_MINUTES;

    // Lead captured = conversation complete, reset for new lead
    const isLeadCaptured = existingChat?.leadCaptured === true;
    const shouldReset = isStaleSession || isLeadCaptured;

    // On stale session or lead captured: reset chat fields so it acts like a fresh conversation
    if (shouldReset && existingChat) {
      await prisma.waChat.update({
        where: { waId },
        data: {
          postcode: null,
          serviceType: null,
          isEmergency: false,
          leadCaptured: false,
          botActive: true,
        },
      });
    }

    // Auto-extract postcode & service type from current message
    const extractedPostcode = extractPostcode(messageText);
    const extractedService = detectServiceType(messageText);

    const chat = await prisma.waChat.upsert({
      where: { waId },
      create: {
        waId,
        customerName: null,
        customerPhone: waId,
        postcode: extractedPostcode,
        serviceType: extractedService,
        lastMessageAt: new Date(),
      },
      update: {
        lastMessageAt: new Date(),
        // customerName is set only via Create Lead tool (using the name customer provides in chat)
        // Only set if not already present (and not stale-reset)
        ...((extractedPostcode && (!existingChat?.postcode || shouldReset)) ? { postcode: extractedPostcode } : {}),
        ...((extractedService && (!existingChat?.serviceType || shouldReset)) ? { serviceType: extractedService } : {}),
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

    // If postcode/serviceType still missing, scan ALL previous user messages in this chat
    let finalPostcode = extractedPostcode ?? (shouldReset ? null : existingChat?.postcode);
    let finalService = extractedService ?? (shouldReset ? null : existingChat?.serviceType);

    if (!finalPostcode || !finalService) {
      const allUserMsgs = await prisma.waMessage.findMany({
        where: { chatId: chat.id, role: "user" },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      for (const msg of allUserMsgs) {
        if (!finalPostcode) finalPostcode = extractPostcode(msg.content);
        if (!finalService) finalService = detectServiceType(msg.content);
        if (finalPostcode && finalService) break;
      }

      // Update WaChat with extracted data from history
      if (finalPostcode || finalService) {
        await prisma.waChat.update({
          where: { waId },
          data: {
            ...(finalPostcode && !chat.postcode ? { postcode: finalPostcode } : {}),
            ...(finalService && !chat.serviceType ? { serviceType: finalService } : {}),
          },
        });
      }
    }

    // Lead creation is handled entirely by the AI Agent via the Create Lead tool.
    // The bot asks for the customer's name during conversation and passes it to the tool.
    // No auto-lead creation here — this prevents using the WhatsApp profile name instead
    // of the name the customer actually provides.

    return NextResponse.json({
      isDuplicate: false,
      botActive: chat.botActive,
      chatId: chat.id,
      isNewChat,
      resetMemory: isNewChat || shouldReset,
    });
  } catch (err) {
    console.error("[WA chat POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
