/**
 * lib/calling/postCall.ts
 *
 * Post-call processing service.
 * Orchestrates all steps that happen after a voice call ends:
 *
 *   1. Normalise call payload
 *   2. Save structured extracted data to CallSummary
 *   3. Update Call record with outcome
 *   4. Upsert WaChat customer profile (if waId present)
 *   5. Create or update Lead (if enough data present)
 *   6. Link lead to call
 *   7. Log escalation event if human handoff needed
 *
 * This module is intentionally decoupled from the transport layer.
 * It does not know or care whether the call came from Meta Calling API,
 * OpenAI Realtime, or a test payload — it only processes the result.
 */

import { prisma } from "@/lib/prisma";
import { updateCallStatus, linkLeadToCall } from "./session";
import { logCallEvent } from "./events";
import type { CallOutcome } from "./session";

// ── Types ─────────────────────────────────────────────────────────────────────

export type EmergencyType =
  | "gas_smell"
  | "flooding"
  | "active_leak"
  | "no_heating_hot_water"
  | "drain_overflow"
  | "ceiling_leak"
  | "none";

export type CustomerType = "homeowner" | "landlord" | "tenant" | "unknown";
export type PropertyType = "house" | "flat" | "commercial" | "unknown";
export type Urgency = "low" | "medium" | "high";

/**
 * The structured payload produced by the AI extractor prompt (Step 5).
 * n8n sends this to POST /api/calls/process after the call ends.
 */
export interface PostCallPayload {
  callId: string;
  // Caller identity
  waId?: string;
  phone?: string;
  // Extracted fields from transcript
  name?: string;
  postcode?: string;
  serviceType?: string;
  issueSummary?: string;
  urgency?: Urgency;
  preferredTime?: string;
  propertyType?: PropertyType;
  customerType?: CustomerType;
  emergencyType?: EmergencyType;
  // Flags
  needsHuman?: boolean;
  outcome?: CallOutcome;
  // Internal team summary (from Step 5A prompt)
  summary?: string;
  // Raw transcript as plain text (optional — for audit storage)
  transcriptText?: string;
}

/**
 * Result returned to the caller after processing.
 */
export interface PostCallResult {
  callId: string;
  summaryId: string | null;
  leadId: string | null;
  leadCreated: boolean;
  escalated: boolean;
  customerUpdated: boolean;
}

// ── Main processor ─────────────────────────────────────────────────────────────

export async function processCompletedCall(
  payload: PostCallPayload
): Promise<PostCallResult> {
  const {
    callId,
    waId,
    phone,
    name,
    postcode,
    serviceType,
    issueSummary,
    urgency,
    preferredTime,
    propertyType,
    customerType,
    emergencyType,
    needsHuman,
    outcome,
    summary,
  } = payload;

  let summaryId: string | null = null;
  let leadId: string | null = null;
  let leadCreated = false;
  let customerUpdated = false;
  let escalated = false;

  // ── 1. Update call status & outcome ────────────────────────────────────────
  await updateCallStatus(callId, "ended", outcome);

  // ── 2. Save CallSummary ────────────────────────────────────────────────────
  try {
    const saved = await prisma.callSummary.upsert({
      where: { callId },
      update: {
        summary: summary ?? issueSummary ?? "",
        urgency: urgency ?? null,
        serviceType: serviceType ?? null,
        issueSummary: issueSummary ?? null,
        preferredTime: preferredTime ?? null,
        needsHuman: needsHuman ?? false,
        endState: outcome ?? null,
      },
      create: {
        callId,
        summary: summary ?? issueSummary ?? "",
        urgency: urgency ?? null,
        serviceType: serviceType ?? null,
        issueSummary: issueSummary ?? null,
        preferredTime: preferredTime ?? null,
        needsHuman: needsHuman ?? false,
        endState: outcome ?? null,
      },
    });
    summaryId = saved.id;
  } catch (err) {
    // Summary save failure should not stop lead/customer processing
    console.error("[postCall] CallSummary save failed", err);
  }

  // ── 3. Upsert WaChat customer profile (if WhatsApp call) ───────────────────
  if (waId) {
    try {
      await prisma.waChat.upsert({
        where: { waId },
        create: {
          waId,
          customerName: name ?? null,
          customerPhone: phone ?? waId,
          postcode: postcode ? postcode.toUpperCase().trim() : null,
          serviceType: serviceType ?? null,
          isEmergency: isEmergencyOutcome(emergencyType),
          lastMessageAt: new Date(),
        },
        update: {
          ...(name ? { customerName: name } : {}),
          ...(postcode ? { postcode: postcode.toUpperCase().trim() } : {}),
          ...(serviceType ? { serviceType } : {}),
          ...(isEmergencyOutcome(emergencyType) ? { isEmergency: true } : {}),
          lastMessageAt: new Date(),
        },
      });
      customerUpdated = true;
    } catch (err) {
      console.error("[postCall] WaChat upsert failed", err);
    }
  }

  // ── 4. Create or update Lead ───────────────────────────────────────────────
  const canCreateLead = !!(name && (phone ?? waId) && postcode);

  if (canCreateLead) {
    try {
      const callerPhone = phone ?? waId ?? "";

      // Check for existing lead with same phone to avoid duplicates
      const existing = await prisma.lead.findFirst({
        where: { phone: callerPhone },
        orderBy: { createdAt: "desc" },
      });

      if (existing) {
        // Update existing lead with richer data from the call
        await prisma.lead.update({
          where: { id: existing.id },
          data: {
            ...(name && name !== existing.name ? { name } : {}),
            ...(postcode ? { postcode: postcode.toUpperCase().trim() } : {}),
            ...(serviceType && !existing.serviceType ? { serviceType } : {}),
          },
        });
        leadId = existing.id;
        leadCreated = false;
      } else {
        const lead = await prisma.lead.create({
          data: {
            name: name!,
            phone: callerPhone,
            postcode: postcode!.toUpperCase().trim(),
            serviceType: serviceType ?? null,
            source: "whatsapp_call",
            status: "new",
          },
        });
        leadId = lead.id;
        leadCreated = true;
      }

      // Link lead to call record
      if (leadId) {
        await linkLeadToCall(callId, leadId);
      }
    } catch (err) {
      console.error("[postCall] Lead upsert failed", err);
    }
  }

  // ── 5. Log escalation event if human handoff needed ───────────────────────
  if (needsHuman || outcome === "human_handoff" || outcome === "emergency_escalated") {
    try {
      await logCallEvent({
        callId,
        eventType: outcome === "emergency_escalated" ? "escalated" : "human_handoff",
        notes: buildEscalationNote({ emergencyType, issueSummary, urgency, customerType }),
        meta: {
          urgency: urgency ?? "unknown",
          emergencyType: emergencyType ?? "none",
          needsHuman: needsHuman ? "true" : "false",
        },
      });
      escalated = true;
    } catch (err) {
      console.error("[postCall] Escalation event log failed", err);
    }
  }

  // ── 6. Log completion event ────────────────────────────────────────────────
  await logCallEvent({
    callId,
    eventType: "ended",
    notes: `Post-call processing complete. Outcome: ${outcome ?? "no_action"}`,
    meta: {
      leadCreated: leadCreated ? "true" : "false",
      summaryId: summaryId ?? "",
    },
  });

  return { callId, summaryId, leadId, leadCreated, escalated, customerUpdated };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isEmergencyOutcome(emergencyType?: EmergencyType): boolean {
  return !!emergencyType && emergencyType !== "none";
}

function buildEscalationNote(ctx: {
  emergencyType?: EmergencyType;
  issueSummary?: string;
  urgency?: Urgency;
  customerType?: CustomerType;
}): string {
  const parts: string[] = [];
  if (ctx.emergencyType && ctx.emergencyType !== "none") {
    parts.push(`Emergency type: ${ctx.emergencyType.replace(/_/g, " ")}`);
  }
  if (ctx.issueSummary) parts.push(ctx.issueSummary);
  if (ctx.urgency) parts.push(`Urgency: ${ctx.urgency}`);
  if (ctx.customerType && ctx.customerType !== "unknown") {
    parts.push(`Customer type: ${ctx.customerType}`);
  }
  return parts.join(". ") || "Human follow-up required";
}
