/**
 * POST /api/calls/transcript
 *
 * Appends a single transcript turn to a call session.
 * Called per spoken turn by n8n or future OpenAI Realtime stream handler.
 *
 * Body: { callId, speaker, text, intent?, turnIndex?, spokenAt? }
 * Returns: { transcriptId }
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkApiKey } from "@/lib/whatsappAuth";
import { appendTranscriptTurn } from "@/lib/calling/transcript";

const schema = z.object({
  callId: z.string().min(1),
  speaker: z.enum(["user", "agent", "system"]),
  text: z.string().min(1).max(5000),
  intent: z.string().max(100).optional(),
  turnIndex: z.number().int().min(0).optional(),
  spokenAt: z.string().datetime().optional(),
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

  const { spokenAt, ...rest } = parsed.data;

  try {
    const turn = await appendTranscriptTurn({
      ...rest,
      spokenAt: spokenAt ? new Date(spokenAt) : undefined,
    });
    return NextResponse.json({ transcriptId: turn.id }, { status: 201 });
  } catch (err) {
    console.error("[calls/transcript]", err);
    return NextResponse.json(
      { error: "Failed to save transcript turn" },
      { status: 500 }
    );
  }
}
