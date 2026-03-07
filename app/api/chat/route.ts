import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detectRestrictedTopic } from "@/lib/chatbot/safety";
import { classifyMessage } from "@/lib/chatbot/classify";
import { knowledgeBase } from "@/lib/chatbot/kb";
import { getVideoForCategory } from "@/lib/chatbot/videos";
import { siteSettings } from "@/content/settings";

// ── Rate limiting ─────────────────────────────────────────────────────────────
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

async function isRateLimited(sessionId: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const count = await prisma.chatMessage.count({
    where: {
      sessionId,
      role: "user",
      createdAt: { gte: since },
    },
  });
  return count >= RATE_LIMIT_MAX;
}

// ── POST /api/chat ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, pageUrl } = body as {
      sessionId?: string;
      message?: string;
      pageUrl?: string;
    };

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    const trimmedMessage = message.trim();

    // ── 1. Create or reuse session ────────────────────────────────────────────
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    }

    if (!session) {
      session = await prisma.chatSession.create({
        data: { sourcePage: pageUrl ?? null },
      });
    } else {
      session = await prisma.chatSession.update({
        where: { id: session.id },
        data: { lastSeenAt: new Date() },
      });
    }

    // ── 2. Rate limit check ───────────────────────────────────────────────────
    if (await isRateLimited(session.id)) {
      return NextResponse.json(
        {
          sessionId: session.id,
          reply:
            `You've sent a lot of messages. Please call us directly on **${siteSettings.phone}** or [book online](/book) for immediate help.`,
          category: "general",
          suggestedActions: [`Call ${siteSettings.phone}`, "Book online"],
        },
        { status: 429 }
      );
    }

    // ── 3. Log user message ───────────────────────────────────────────────────
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: "user",
        content: trimmedMessage,
      },
    });

    // ── 4. Safety check ───────────────────────────────────────────────────────
    const safety = detectRestrictedTopic(trimmedMessage);

    if (safety.isRestricted) {
      await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: "assistant",
          content: safety.reply,
          category: "boiler_gas",
          isBlocked: true,
        },
      });

      const suggestedActions = safety.isGasSmell
        ? ["Call 0800 111 999 (Gas Emergency)", "I'm safe — book a follow-up visit"]
        : ["Book a qualified engineer", `Call ${siteSettings.phone}`, "Request a callback"];

      return NextResponse.json({
        sessionId: session.id,
        reply: safety.reply,
        category: "boiler_gas",
        suggestedActions,
      });
    }

    // ── 5. Classify + build response ──────────────────────────────────────────
    const category = classifyMessage(trimmedMessage);
    const kb = knowledgeBase[category as Exclude<typeof category, "boiler_gas">];

    let reply = kb.intro;

    if (kb.tips.length > 0) {
      reply += "\n\n" + kb.tips.map((t) => `• ${t}`).join("\n");
    }

    if (kb.callToAction) {
      reply += "\n\n" + kb.callToAction;
    }

    // ── 6. Video lookup ───────────────────────────────────────────────────────
    const video = kb.videoCategory ? getVideoForCategory(kb.videoCategory) : undefined;

    // ── 7. Log assistant message ──────────────────────────────────────────────
    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: "assistant",
        content: reply,
        category,
        isBlocked: false,
      },
    });

    // ── 8. Return response ────────────────────────────────────────────────────
    return NextResponse.json({
      sessionId: session.id,
      reply,
      category,
      ...(video ? { videoUrl: video.url, videoTitle: video.title } : {}),
      suggestedActions: kb.suggestedActions,
    });
  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return NextResponse.json(
      { error: `Something went wrong. Please call us on ${siteSettings.phone}.` },
      { status: 500 }
    );
  }
}
