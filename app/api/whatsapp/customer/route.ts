import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";

/**
 * GET /api/whatsapp/customer?waId=xxx
 * n8n calls this to load existing customer profile before routing.
 * Returns WaChat record or empty profile if not found.
 */
export async function GET(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  const waId = req.nextUrl.searchParams.get("waId");
  if (!waId) {
    return NextResponse.json({ error: "waId required" }, { status: 400 });
  }

  try {
    const chat = await prisma.waChat.findUnique({
      where: { waId },
      select: {
        waId: true,
        customerName: true,
        customerPhone: true,
        postcode: true,
        serviceType: true,
        isEmergency: true,
        botActive: true,
        leadCaptured: true,
        lastMessageAt: true,
        createdAt: true,
      },
    });

    if (!chat) {
      return NextResponse.json({
        found: false,
        waId,
        customerName: null,
        customerPhone: null,
        postcode: null,
        serviceType: null,
        isEmergency: false,
        botActive: true,
        leadCaptured: false,
      });
    }

    return NextResponse.json({ found: true, ...chat });
  } catch (err) {
    console.error("[WA customer GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
