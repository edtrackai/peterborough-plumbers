/**
 * Called by n8n after each inbound WhatsApp message.
 * Detects if message is a quote approval/decline and processes it.
 * Auth: INTERNAL_API_KEY (x-api-key header)
 */
import { NextRequest, NextResponse } from "next/server";
import { processInboundQuoteReply } from "@/lib/quotes/approval";

function checkApiKey(req: NextRequest): boolean {
  const key = req.headers.get("x-api-key");
  return !!process.env.INTERNAL_API_KEY && key === process.env.INTERNAL_API_KEY;
}

export async function POST(req: NextRequest) {
  if (!checkApiKey(req)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const { waId, messageText, waMessageId } = await req.json();

    if (!waId || !messageText) {
      return NextResponse.json({ error: "waId and messageText are required" }, { status: 400 });
    }

    const result = await processInboundQuoteReply(
      String(waId),
      String(messageText),
      String(waMessageId ?? `manual-${Date.now()}`),
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("[whatsapp/quote/respond]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
