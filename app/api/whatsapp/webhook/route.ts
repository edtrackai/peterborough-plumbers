import { NextRequest, NextResponse } from "next/server";
import { hasProcessed, markProcessed } from "@/lib/kv";
import { sendText } from "@/lib/whatsapp";
import { getReply } from "@/lib/whatsappBot";
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

// ── Types for Meta webhook payload ──────────────────────────────────

interface WhatsAppMessage {
  id: string;
  from: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppChange {
  value: {
    messaging_product?: string;
    metadata?: { phone_number_id: string };
    messages?: WhatsAppMessage[];
    statuses?: unknown[];
  };
}

interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

interface WhatsAppWebhookBody {
  object?: string;
  entry?: WhatsAppEntry[];
}

// ── Allowed numbers check ───────────────────────────────────────────

function isAllowed(waId: string): boolean {
  const csv = process.env.WHATSAPP_ALLOWED_NUMBERS;
  if (!csv) return true; // no allowlist → allow all
  const allowed = csv.split(",").map((n) => n.trim());
  return allowed.includes(waId);
}

/**
 * POST — Inbound webhook events from Meta.
 * Always returns 200 quickly to prevent Meta retries.
 */
export async function POST(request: NextRequest) {
  let body: WhatsAppWebhookBody;
  let rawBody: string;

  try {
    rawBody = await request.text();
    body = JSON.parse(rawBody) as WhatsAppWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const signatureValid = await verifySignature(request, rawBody);
  if (!signatureValid) {
    console.warn("[WhatsApp] Invalid webhook signature");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Must be a WhatsApp webhook
  if (body.object !== "whatsapp_business_account") {
    return NextResponse.json({ status: "ignored" }, { status: 200 });
  }

  const entry = body.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;

  // Ignore status updates
  if (!value?.messages || value.messages.length === 0) {
    return NextResponse.json({ status: "no_messages" }, { status: 200 });
  }

  const message = value.messages[0];

  // Only handle text messages
  if (message.type !== "text" || !message.text?.body) {
    return NextResponse.json({ status: "non_text" }, { status: 200 });
  }

  // Idempotency: skip if already processed
  if (hasProcessed(message.id)) {
    if (process.env.WHATSAPP_DEBUG === "true") {
      console.log(`[WhatsApp] Duplicate message ${message.id}, skipping`);
    }
    return NextResponse.json({ status: "duplicate" }, { status: 200 });
  }

  // Allowed numbers check
  if (!isAllowed(message.from)) {
    if (process.env.WHATSAPP_DEBUG === "true") {
      console.log(`[WhatsApp] Number ${message.from} not in allowlist, ignoring`);
    }
    return NextResponse.json({ status: "not_allowed" }, { status: 200 });
  }

  // Mark as processed before async work
  markProcessed(message.id);

  // Generate and send reply
  const replyText = getReply(message.text.body);

  if (process.env.WHATSAPP_DEBUG === "true") {
    console.log(`[WhatsApp] From: ${message.from} | Text: "${message.text.body}"`);
  }

  // Fire-and-forget: don't block the 200 response
  sendText(message.from, replyText).catch((err) => {
    console.error("[WhatsApp] Reply failed:", err instanceof Error ? err.message : err);
  });

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
