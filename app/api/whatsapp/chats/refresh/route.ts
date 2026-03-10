import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/whatsapp/chats/refresh
 * Internal route for admin dashboard auto-refresh.
 * Returns all chats with messages, dates serialized as ISO strings.
 */
export async function GET() {
  try {
    const [chats, calls] = await Promise.all([
      prisma.waChat.findMany({
        orderBy: { lastMessageAt: "desc" },
        take: 50,
        include: {
          messages: { orderBy: { createdAt: "asc" } },
        },
      }),
      prisma.call.findMany({
        orderBy: { startedAt: "desc" },
        include: { summary: true },
      }),
    ]);

    // Group calls by waId (matched via customerPhone on WaChat)
    const callsByWaId: Record<string, object[]> = {};
    for (const call of calls) {
      if (!call.callerPhone) continue;
      const matchedChat = chats.find((c) => c.customerPhone === call.callerPhone);
      if (!matchedChat) continue;
      if (!callsByWaId[matchedChat.waId]) callsByWaId[matchedChat.waId] = [];
      callsByWaId[matchedChat.waId].push({
        id: call.id,
        startedAt: call.startedAt.toISOString(),
        durationSeconds: call.durationSeconds,
        outcome: call.summary?.outcome ?? null,
        needsHuman: call.summary?.needsHuman ?? false,
        issueSummary: call.summary?.issueSummary ?? null,
      });
    }

    const serialized = chats.map((c) => ({
      ...c,
      lastMessageAt: c.lastMessageAt.toISOString(),
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      messages: c.messages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
      })),
      calls: callsByWaId[c.waId] ?? [],
    }));

    return NextResponse.json({ chats: serialized });
  } catch (err) {
    console.error("[WA refresh GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
