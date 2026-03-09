/**
 * POST /api/calls/start
 *
 * Creates a new call session.
 * Called by n8n or future Meta Calling API webhook when a call begins.
 *
 * Body: { waId?, phone?, direction?, source? }
 * Returns: { callId, status, startedAt }
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkApiKey } from "@/lib/whatsappAuth";
import { startCallSession } from "@/lib/calling/session";

const schema = z.object({
  waId: z.string().min(7).max(20).optional(),
  phone: z.string().min(7).max(20).optional(),
  direction: z.enum(["inbound", "outbound"]).default("inbound"),
  source: z.enum(["whatsapp_call", "phone", "test"]).default("whatsapp_call"),
});

export async function POST(req: NextRequest) {
  const authError = checkApiKey(req);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const call = await startCallSession(parsed.data);
    return NextResponse.json(
      { callId: call.id, status: call.status, startedAt: call.startedAt },
      { status: 201 }
    );
  } catch (err) {
    console.error("[calls/start]", err);
    return NextResponse.json({ error: "Failed to start call" }, { status: 500 });
  }
}
