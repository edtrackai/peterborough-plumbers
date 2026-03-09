/**
 * lib/calling/session.ts
 *
 * Call session management service.
 * Handles creating, updating, and closing call sessions in the database.
 *
 * Future integration point: Meta Calling API will call /api/calls/start
 * when an inbound call is received. OpenAI Realtime will stream audio
 * and push transcripts via /api/calls/transcript.
 */

import { prisma } from "@/lib/prisma";

export type CallDirection = "inbound" | "outbound";
export type CallSource = "whatsapp_call" | "phone" | "test";
export type CallStatus =
  | "initiated"
  | "active"
  | "on_hold"
  | "ended"
  | "failed"
  | "missed";

export type CallOutcome =
  | "emergency_escalated"
  | "human_handoff"
  | "qualified_lead_captured"
  | "general_advice_given"
  | "follow_up_requested"
  | "no_action";

export interface StartCallInput {
  waId?: string;
  phone?: string;
  direction?: CallDirection;
  source?: CallSource;
}

/**
 * Creates a new call session record.
 * Called at the start of every inbound or outbound call.
 */
export async function startCallSession(input: StartCallInput) {
  const call = await prisma.call.create({
    data: {
      waId: input.waId ?? null,
      phone: input.phone ?? input.waId ?? null,
      direction: input.direction ?? "inbound",
      source: input.source ?? "whatsapp_call",
      status: "initiated",
      startedAt: new Date(),
    },
  });

  await prisma.callEvent.create({
    data: {
      callId: call.id,
      eventType: "started",
      notes: `Call initiated from ${input.source ?? "whatsapp_call"}`,
    },
  });

  return call;
}

/**
 * Updates call status.
 * e.g. initiated → active → ended
 */
export async function updateCallStatus(
  callId: string,
  status: CallStatus,
  outcome?: CallOutcome
) {
  return prisma.call.upsert({
    where: { id: callId },
    update: {
      status,
      outcome: outcome ?? undefined,
      endedAt: status === "ended" || status === "failed" ? new Date() : undefined,
    },
    create: {
      id: callId,
      status,
      outcome: outcome ?? undefined,
      direction: "inbound",
      source: "whatsapp_call",
      startedAt: new Date(),
      endedAt: status === "ended" || status === "failed" ? new Date() : undefined,
    },
  });
}

/**
 * Marks a call as ended and calculates duration.
 */
export async function endCallSession(callId: string, outcome: CallOutcome) {
  const call = await prisma.call.findUnique({ where: { id: callId } });
  if (!call) throw new Error(`Call ${callId} not found`);

  const durationSeconds = Math.round(
    (Date.now() - call.startedAt.getTime()) / 1000
  );

  return prisma.call.update({
    where: { id: callId },
    data: {
      status: "ended",
      outcome,
      endedAt: new Date(),
      durationSeconds,
    },
  });
}

/**
 * Links a lead to a call session once lead is captured.
 */
export async function linkLeadToCall(callId: string, leadId: string) {
  return prisma.call.update({
    where: { id: callId },
    data: { leadId },
  });
}
