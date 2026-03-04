import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Verifies the X-Hub-Signature-256 header sent by Meta.
 * Returns true if the signature matches or if WHATSAPP_APP_SECRET is not set (dev mode).
 */
async function verifySignature(request: NextRequest, rawBody: string): Promise<boolean> {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return true; // skip verification in dev if secret not configured

  const signature = request.headers.get("x-hub-signature-256");
  if (!signature) return false;

  const expected =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * GET — Meta webhook verification.
 * Meta sends hub.mode, hub.verify_token, hub.challenge as query params.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (
    mode === "subscribe" &&
    token &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    console.log("[WhatsApp] Webhook verified");
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.warn("[WhatsApp] Verification failed");
  return new NextResponse("Forbidden", { status: 403 });
}

/**
 * POST — Inbound webhook events from Meta.
 * n8n handles all message processing now.
 * This endpoint just validates the signature and returns 200
 * to prevent Meta from retrying.
 */
export async function POST(request: NextRequest) {
  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const signatureValid = await verifySignature(request, rawBody);
  if (!signatureValid) {
    console.warn("[WhatsApp] Invalid webhook signature");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // n8n handles all message processing via its own WhatsApp trigger.
  // This endpoint only exists for Meta webhook verification (GET)
  // and to acknowledge POST events if Meta sends them here too.
  return NextResponse.json({ status: "ok" }, { status: 200 });
}
