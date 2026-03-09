/**
 * lib/calling/summary.ts
 *
 * Post-call summarisation service.
 * Saves a structured summary after a call ends.
 * Optionally updates the linked Lead record with captured data.
 *
 * Future integration point: after OpenAI Realtime session ends, the
 * orchestration layer (n8n or direct API) POSTs to /api/calls/summary.
 * This service saves the summary and syncs lead data.
 */

import { prisma } from "@/lib/prisma";
import type { CallOutcome } from "./session";

export type Urgency = "low" | "medium" | "high";

export interface CallSummaryInput {
  callId: string;
  summary: string;
  urgency?: Urgency;
  serviceType?: string;
  issueSummary?: string;
  preferredTime?: string;
  needsHuman?: boolean;
  endState?: CallOutcome;
  // lead fields — if provided, upserts a Lead record
  leadName?: string;
  leadPhone?: string;
  leadPostcode?: string;
}

/**
 * Saves a post-call summary and optionally creates/updates the related Lead.
 */
export async function saveCallSummary(input: CallSummaryInput) {
  const summary = await prisma.callSummary.create({
    data: {
      callId: input.callId,
      summary: input.summary,
      urgency: input.urgency ?? null,
      serviceType: input.serviceType ?? null,
      issueSummary: input.issueSummary ?? null,
      preferredTime: input.preferredTime ?? null,
      needsHuman: input.needsHuman ?? false,
      endState: input.endState ?? null,
    },
  });

  // If enough lead data is present, upsert a Lead record
  if (input.leadName && input.leadPhone && input.leadPostcode) {
    const lead = await prisma.lead.create({
      data: {
        name: input.leadName,
        phone: input.leadPhone,
        postcode: input.leadPostcode.toUpperCase().trim(),
        serviceType: input.serviceType ?? null,
        source: "whatsapp_call",
        status: "new",
      },
    });

    // Link lead to the call
    await prisma.call.update({
      where: { id: input.callId },
      data: { leadId: lead.id },
    });
  }

  return summary;
}

/**
 * Retrieves the summary for a given call.
 */
export async function getCallSummary(callId: string) {
  return prisma.callSummary.findUnique({ where: { callId } });
}
