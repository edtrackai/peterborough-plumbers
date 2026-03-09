/**
 * POST /api/calls/summary
 *
 * Saves a structured post-call summary and optionally creates a Lead.
 * Called by n8n after the call ends and the AI has extracted structured data.
 *
 * Body: { callId, summary, urgency?, serviceType?, issueSummary?,
 *         preferredTime?, needsHuman?, endState?,
 *         leadName?, leadPhone?, leadPostcode? }
 * Returns: { summaryId, leadCreated }
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkApiKey } from "@/lib/whatsappAuth";
import { saveCallSummary } from "@/lib/calling/summary";
import { updateCallStatus } from "@/lib/calling/session";

const schema = z.object({
  callId: z.string().min(1),
  summary: z.string().min(1).max(5000),
  urgency: z.enum(["low", "medium", "high"]).optional(),
  serviceType: z.string().max(200).optional(),
  issueSummary: z.string().max(1000).optional(),
  preferredTime: z.string().max(200).optional(),
  needsHuman: z.boolean().optional(),
  endState: z
    .enum([
      "emergency_escalated",
      "human_handoff",
      "qualified_lead_captured",
      "general_advice_given",
      "follow_up_requested",
      "no_action",
    ])
    .optional(),
  // Optional lead capture fields
  leadName: z.string().min(2).max(100).optional(),
  leadPhone: z.string().min(7).max(20).optional(),
  leadPostcode: z.string().min(2).max(10).optional(),
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
    const result = await saveCallSummary(parsed.data);

    // Mark call as ended with the resolved outcome
    if (parsed.data.endState) {
      await updateCallStatus(parsed.data.callId, "ended", parsed.data.endState);
    }

    const leadCreated = !!(
      parsed.data.leadName &&
      parsed.data.leadPhone &&
      parsed.data.leadPostcode
    );

    return NextResponse.json(
      { summaryId: result.id, leadCreated },
      { status: 201 }
    );
  } catch (err) {
    console.error("[calls/summary]", err);
    return NextResponse.json(
      { error: "Failed to save call summary" },
      { status: 500 }
    );
  }
}
