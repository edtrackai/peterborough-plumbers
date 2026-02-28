import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { detectRestrictedTopic } from "@/lib/chatbot/safety";
import { getVideoForCategory } from "@/lib/chatbot/videos";
import type { VideoCategory } from "@/lib/chatbot/videos";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── System prompt ──────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a helpful assistant for Peterborough Plumbers, a local plumbing and heating business in Peterborough, UK.

Business details:
- Phone: 02039514510
- Address: 3 Saville Road, Peterborough PE3 7PR
- Hours: Mon–Fri 8am–6pm, Sat 8am–5pm. Emergency call-outs available 24/7.
- Services: plumbing repairs, central heating, bathroom installations, emergency call-outs, gas safety certificates. All Gas Safe registered.
- Areas covered: Peterborough city centre (PE1), Orton (PE2), Bretton (PE3), Werrington (PE4), Yaxley (PE7), Hampton (PE7), Whittlesey (PE7), Market Deeping (PE6), Stamford (PE9).

Your role:
- Give honest, practical plumbing advice in a warm, conversational tone.
- Help users understand their issue and what to try themselves first.
- Clearly recommend calling a professional when the job requires one.
- Route users to book or call when appropriate.

Rules:
- Always write in UK English (colour, recognised, £ symbol).
- Keep replies concise — 2–4 sentences max. Never bullet-point heavy walls of text.
- Never give boiler or gas appliance repair advice — Gas Safe engineers only. Politely decline and offer to book one.
- For gas smells or carbon monoxide: direct to 0800 111 999 immediately.
- Never fabricate prices, guarantees, or availability — if unsure, tell the user to call for confirmation.
- Never mention competitor businesses.

Response format — you MUST return valid JSON only, no other text:
{
  "reply": "your response (markdown **bold** supported for key points)",
  "suggestedActions": ["action1", "action2"],
  "videoCategory": "leak_tap | blocked_drain | toilet_running | burst_pipe | low_pressure | null"
}

suggestedActions rules:
- Include 2–3 actions relevant to the reply.
- Use these exact strings to trigger routing: "Book online", "Call 02039514510", "Request a callback", "Book a same-day visit", "Book an emergency visit", "Get a free quote".
- You may also include a short conversational follow-up as one action, e.g. "What if it's still leaking?".
- For emergencies always include "Call 02039514510" as the first action.

videoCategory rules:
- Return the single most relevant category string if a how-to video would genuinely help, otherwise return null.`;

// ── Rate limiting ──────────────────────────────────────────────────────────────
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

async function isRateLimited(sessionId: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
  const count = await prisma.chatMessage.count({
    where: { sessionId, role: "user", createdAt: { gte: since } },
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

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    const trimmedMessage = message.trim();

    // ── 1. Create or reuse session ─────────────────────────────────────────────
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    }
    if (!session) {
      session = await prisma.chatSession.create({ data: { sourcePage: pageUrl ?? null } });
    } else {
      session = await prisma.chatSession.update({
        where: { id: session.id },
        data: { lastSeenAt: new Date() },
      });
    }

    // ── 2. Rate limit ──────────────────────────────────────────────────────────
    if (await isRateLimited(session.id)) {
      return NextResponse.json(
        {
          sessionId: session.id,
          reply: "You've sent a lot of messages. Please call us directly on **02039514510** or [book online](/book) for immediate help.",
          suggestedActions: ["Call 02039514510", "Book online"],
        },
        { status: 429 }
      );
    }

    // ── 3. Log user message ────────────────────────────────────────────────────
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "user", content: trimmedMessage },
    });

    // ── 4. Safety check (gas/boiler — hard block before AI) ───────────────────
    const safety = detectRestrictedTopic(trimmedMessage);
    if (safety.isRestricted) {
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: "assistant", content: safety.reply, category: "boiler_gas", isBlocked: true },
      });
      return NextResponse.json({
        sessionId: session.id,
        reply: safety.reply,
        category: "boiler_gas",
        suggestedActions: safety.isGasSmell
          ? ["Call 0800 111 999 (Gas Emergency)", "I'm safe — book a follow-up visit"]
          : ["Book a qualified engineer", "Call 02039514510", "Request a callback"],
      });
    }

    // ── 5. Load conversation history (last 8 messages for context) ────────────
    const history = await prisma.chatMessage.findMany({
      where: { sessionId: session.id, isBlocked: false },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    const historyMessages = history.reverse().map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // ── 6. Call Claude ────────────────────────────────────────────────────────
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: historyMessages,
    });

    const raw = response.content[0].type === "text" ? response.content[0].text : "";

    // ── 7. Parse structured response ──────────────────────────────────────────
    let reply = "Sorry, I couldn't generate a response. Please call us on **02039514510**.";
    let suggestedActions: string[] = ["Call 02039514510", "Book online"];
    let videoCategory: string | null = null;

    try {
      // Strip any markdown code fences Claude might wrap around the JSON
      const jsonStr = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      const parsed = JSON.parse(jsonStr);
      if (parsed.reply) reply = parsed.reply;
      if (Array.isArray(parsed.suggestedActions)) suggestedActions = parsed.suggestedActions;
      if (parsed.videoCategory && parsed.videoCategory !== "null") videoCategory = parsed.videoCategory;
    } catch {
      // Claude returned plain text — use it as-is
      if (raw.trim()) reply = raw.trim();
    }

    // ── 8. Video lookup ────────────────────────────────────────────────────────
    const video = videoCategory ? getVideoForCategory(videoCategory as VideoCategory) : undefined;

    // ── 9. Log assistant message ───────────────────────────────────────────────
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "assistant", content: reply, isBlocked: false },
    });

    // ── 10. Return ─────────────────────────────────────────────────────────────
    return NextResponse.json({
      sessionId: session.id,
      reply,
      suggestedActions,
      ...(video ? { videoUrl: video.url, videoTitle: video.title } : {}),
    });

  } catch (err) {
    console.error("[/api/chat] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please call us on 02039514510." },
      { status: 500 }
    );
  }
}
