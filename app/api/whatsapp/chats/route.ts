import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";

/**
 * GET /api/whatsapp/chats
 * Admin: paginated list of all chats with last message preview.
 * Query params: ?page=1&limit=20&botActive=true
 */
export async function GET(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  try {
    const params = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(params.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(params.get("limit") ?? "20", 10)));
    const botActiveFilter = params.get("botActive");

    const where = botActiveFilter !== null
      ? { botActive: botActiveFilter === "true" }
      : {};

    const [chats, total] = await Promise.all([
      prisma.waChat.findMany({
        where,
        orderBy: { lastMessageAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { content: true, role: true, createdAt: true },
          },
        },
      }),
      prisma.waChat.count({ where }),
    ]);

    const items = chats.map((c) => ({
      id: c.id,
      waId: c.waId,
      customerName: c.customerName,
      customerPhone: c.customerPhone,
      botActive: c.botActive,
      isEmergency: c.isEmergency,
      lastMessageAt: c.lastMessageAt,
      lastMessage: c.messages[0] ?? null,
    }));

    return NextResponse.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("[WA chats GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
