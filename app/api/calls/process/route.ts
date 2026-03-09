/**
 * POST /api/calls/process
 *
 * Receives the completed call payload from n8n after a call ends.
 * Runs the full post-call processing flow:
 *   - Save CallSummary
 *   - Update Call outcome
 *   - Upsert WaChat customer profile
 *   - Create or update Lead
 *   - Log escalation if needed
 *
 * This is the single endpoint n8n calls at the end of every call session.
 * Protected by x-api-key (same key as WhatsApp agent).
 *
 * Future: Meta Calling API will trigger this via n8n webhook after call ends.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkApiKey } from "@/lib/whatsappAuth";
import { processCompletedCall } from "@/lib/calling/postCall";

const schema = z.object({
  callId: z.string().min(1),
  waId: z.string().min(7).max(20).optional(),
  phone: z.string().min(7).max(20).optional(),
  name: z.string().min(1).max(100).optional(),
  postcode: z.string().min(2).max(10).optional(),
  serviceType: z.string().max(200).optional(),
  issueSummary: z.string().max(1000).optional(),
  urgency: z.enum(["low", "medium", "high"]).optional(),
  preferredTime: z.string().max(200).optional(),
  propertyType: z.enum(["house", "flat", "commercial", "unknown"]).optional(),
  customerType: z.enum(["homeowner", "landlord", "tenant", "unknown"]).optional(),
  emergencyType: z
    .enum([
      "gas_smell",
      "flooding",
      "active_leak",
      "no_heating_hot_water",
      "drain_overflow",
      "ceiling_leak",
      "none",
    ])
    .optional(),
  needsHuman: z.boolean().optional(),
  outcome: z
    .enum([
      "emergency_escalated",
      "human_handoff",
      "qualified_lead_captured",
      "general_advice_given",
      "follow_up_requested",
      "no_action",
    ])
    .optional(),
  summary: z.string().max(2000).optional(),
  transcriptText: z.string().max(50000).optional(),
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
    const result = await processCompletedCall(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("[calls/process]", err);
    return NextResponse.json(
      { error: "Post-call processing failed" },
      { status: 500 }
    );
  }
}
