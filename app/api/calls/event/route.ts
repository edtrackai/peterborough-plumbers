/**
 * POST /api/calls/event
 *
 * Logs a lifecycle event for an active call session.
 * Called by n8n or the future calling provider at key moments.
 *
 * Body: { callId, eventType, notes?, meta? }
 * Returns: { eventId }
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkApiKey } from "@/lib/whatsappAuth";
import { logCallEvent, type LogCallEventInput } from "@/lib/calling/events";

const schema = z.object({
  callId: z.string().min(1),
  eventType: z.enum([
    "started",
    "agent_greeted",
    "intent_classified",
    "lead_updated",
    "escalated",
    "human_handoff",
    "ended",
    "error",
  ]),
  notes: z.string().max(1000).optional(),
  meta: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
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
    const event = await logCallEvent(parsed.data as LogCallEventInput);
    return NextResponse.json({ eventId: event.id }, { status: 201 });
  } catch (err) {
    console.error("[calls/event]", err);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}
