/**
 * lib/calling/events.ts
 *
 * Call lifecycle event logging.
 * Logs named events throughout a call session for audit and debugging.
 *
 * Event types:
 *   started | agent_greeted | intent_classified | lead_updated |
 *   escalated | human_handoff | ended | error
 */

import { prisma } from "@/lib/prisma";

export type CallEventType =
  | "started"
  | "agent_greeted"
  | "intent_classified"
  | "lead_updated"
  | "escalated"
  | "human_handoff"
  | "ended"
  | "error";

export interface LogCallEventInput {
  callId: string;
  eventType: CallEventType;
  notes?: string;
  meta?: Record<string, string | number | boolean | null>;
}

export async function logCallEvent(input: LogCallEventInput) {
  return prisma.callEvent.create({
    data: {
      callId: input.callId,
      eventType: input.eventType,
      notes: input.notes ?? null,
      meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined,
    },
  });
}
