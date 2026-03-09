/**
 * lib/calling/transcript.ts
 *
 * Transcript storage service for call sessions.
 * Each spoken turn (user or agent) is saved as a CallTranscript row.
 *
 * Future integration point: OpenAI Realtime will stream audio → text.
 * Each streamed turn will be POSTed to /api/calls/transcript which calls
 * appendTranscriptTurn() here.
 */

import { prisma } from "@/lib/prisma";

export type Speaker = "user" | "agent" | "system";

export interface TranscriptTurnInput {
  callId: string;
  speaker: Speaker;
  text: string;
  intent?: string;
  turnIndex?: number;
  spokenAt?: Date;
}

/**
 * Appends a single transcript turn to the call.
 */
export async function appendTranscriptTurn(input: TranscriptTurnInput) {
  return prisma.callTranscript.create({
    data: {
      callId: input.callId,
      speaker: input.speaker,
      text: input.text.trim(),
      intent: input.intent ?? null,
      turnIndex: input.turnIndex ?? 0,
      spokenAt: input.spokenAt ?? new Date(),
    },
  });
}

/**
 * Returns all transcript turns for a call in order.
 */
export async function getCallTranscript(callId: string) {
  return prisma.callTranscript.findMany({
    where: { callId },
    orderBy: { turnIndex: "asc" },
  });
}

/**
 * Returns full transcript as a plain text string.
 * Useful for summarisation prompts.
 */
export async function getTranscriptAsText(callId: string): Promise<string> {
  const turns = await getCallTranscript(callId);
  return turns
    .map((t: { speaker: string; text: string }) => `${t.speaker.toUpperCase()}: ${t.text}`)
    .join("\n");
}
