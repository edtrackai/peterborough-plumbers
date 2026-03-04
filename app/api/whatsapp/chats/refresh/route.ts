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
    const chats = await prisma.waChat.findMany({
      orderBy: { lastMessageAt: "desc" },
      take: 50,
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
    });

    const serialized = chats.map((c) => ({
      ...c,
      lastMessageAt: c.lastMessageAt.toISOString(),
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
      messages: c.messages.map((m) => ({
        ...m,
        createdAt: m.createdAt.toISOString(),
      })),
    }));

    return NextResponse.json({ chats: serialized });
  } catch (err) {
    console.error("[WA refresh GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
