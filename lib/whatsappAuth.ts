import { NextRequest, NextResponse } from "next/server";

/**
 * Validates x-api-key header against WHATSAPP_N8N_API_KEY env var.
 * Returns null if valid, or a 401 response if invalid.
 */
export function checkApiKey(req: NextRequest): NextResponse | null {
  const key = req.headers.get("x-api-key");
  const expected = process.env.WHATSAPP_N8N_API_KEY;

  if (!expected) {
    console.warn("[WA Auth] WHATSAPP_N8N_API_KEY not set — rejecting all requests");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (!key || key !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // valid
}
