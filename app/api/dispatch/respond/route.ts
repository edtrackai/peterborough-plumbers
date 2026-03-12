import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/lib/whatsappAuth";
import { normaliseWaId } from "@/lib/dispatch";
import { z } from "zod";

const schema = z.object({
  plumberWaId: z.string().min(1),
  text: z.string().min(1).max(2000),
});

/** Parse plumber's free-text reply into yes / no / unclear */
function parseIntent(text: string): "yes" | "no" | "unclear" {
  const t = text.trim().toLowerCase();
  // Yes patterns — English + Urdu transliteration
  if (
    /^(yes|y|yep|sure|ok|okay|accept|accepted|confirm|confirmed|agree|i accept|take it|assign me|i'll take|haan|ha|haa|ji haan|ji|bilkul|theek hai|thik hai|lelo|le lo)/.test(
      t
    )
  ) {
    return "yes";
  }
  // No patterns
  if (
    /^(no|n|nope|nah|decline|declined|reject|rejected|pass|busy|not available|can't|cannot|sorry|nahi|nae|na|nahin|available nahi)/.test(
      t
    )
  ) {
    return "no";
  }
  return "unclear";
}

function buildConfirmMessage(lead: {
  name: string;
  phone: string;
  postcode: string;
  serviceType: string | null;
  notes: string | null;
  preferredTime: string | null;
}): string {
  const lines = [
    "✅ *Job Assigned to You!*",
    "",
    `Customer: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Postcode: ${lead.postcode}`,
  ];
  if (lead.serviceType) lines.push(`Service: ${lead.serviceType}`);
  if (lead.notes) lines.push(`Issue: ${lead.notes}`);
  if (lead.preferredTime) lines.push(`Preferred Time: ${lead.preferredTime}`);
  lines.push("", "Please contact the customer directly to confirm your arrival time.");
  return lines.join("\n");
}

/**
 * POST /api/dispatch/respond
 * Called by n8n when a plumber sends a WhatsApp reply to a job offer.
 *
 * Body: { plumberWaId: string, text: string }
 *
 * Response:
 *   reply        — message to send back to this plumber
 *   accepted     — true only when this plumber just claimed the job
 *   otherPlumbers — [{waId, rejectionMessage}] to notify when accepted
 */
export async function POST(req: NextRequest) {
  const authErr = checkApiKey(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { text } = parsed.data;
    const incomingWaId = normaliseWaId(parsed.data.plumberWaId);

    // ── 1. Find plumber by normalised phone ───────────────────────────────────
    const allPlumbers = await prisma.plumber.findMany({
      where: { isActive: true, phone: { not: null } },
    });
    const plumber = allPlumbers.find(
      (p) => p.phone && normaliseWaId(p.phone) === incomingWaId
    ) ?? null;
    if (!plumber) {
      return NextResponse.json({
        reply: "You are not registered as a plumber in our system. Please contact the office.",
        accepted: false,
        otherPlumbers: [],
      });
    }

    const intent = parseIntent(text);

    // ── 2. Find latest pending dispatch for this plumber ──────────────────────
    const dispatch = await prisma.leadDispatch.findFirst({
      where: { plumberId: plumber.id, status: "offered" },
      orderBy: { offeredAt: "desc" },
      include: { lead: true },
    });

    if (!dispatch) {
      return NextResponse.json({
        reply: "There are no pending jobs for you right now. We'll notify you as soon as something comes in!",
        accepted: false,
        otherPlumbers: [],
      });
    }

    // ── 3. Handle unclear intent ───────────────────────────────────────────────
    if (intent === "unclear") {
      return NextResponse.json({
        reply: "Please reply *YES* to accept the job or *NO* to decline.",
        accepted: false,
        otherPlumbers: [],
      });
    }

    // ── 4. Handle NO ──────────────────────────────────────────────────────────
    if (intent === "no") {
      await prisma.leadDispatch.update({
        where: { id: dispatch.id },
        data: { status: "rejected", respondedAt: new Date(), plumberReply: text },
      });
      return NextResponse.json({
        reply: "No problem, noted! We'll keep you in mind for future jobs.",
        accepted: false,
        otherPlumbers: [],
      });
    }

    // ── 5. Handle YES ─────────────────────────────────────────────────────────
    // Re-fetch lead with fresh assignedPlumberId (race condition protection)
    const freshLead = await prisma.lead.findUnique({
      where: { id: dispatch.lead.id },
      select: {
        id: true,
        name: true,
        phone: true,
        postcode: true,
        serviceType: true,
        notes: true,
        preferredTime: true,
        assignedPlumberId: true,
      },
    });

    if (!freshLead) {
      return NextResponse.json({
        reply: "There was an issue processing this job. Please contact the office.",
        accepted: false,
        otherPlumbers: [],
      });
    }

    // Already assigned to THIS plumber (duplicate YES reply)
    if (freshLead.assignedPlumberId === plumber.id) {
      return NextResponse.json({
        reply:
          "You're already assigned to this job!\n\n" +
          `Customer: ${freshLead.name}\n` +
          `Phone: ${freshLead.phone}\n` +
          `Postcode: ${freshLead.postcode}` +
          (freshLead.serviceType ? `\nService: ${freshLead.serviceType}` : "") +
          (freshLead.notes ? `\nIssue: ${freshLead.notes}` : "") +
          (freshLead.preferredTime ? `\nPreferred Time: ${freshLead.preferredTime}` : ""),
        accepted: false,
        otherPlumbers: [],
      });
    }

    // Already assigned to a DIFFERENT plumber — too late
    if (freshLead.assignedPlumberId && freshLead.assignedPlumberId !== plumber.id) {
      await prisma.leadDispatch.update({
        where: { id: dispatch.id },
        data: { status: "rejected", respondedAt: new Date() },
      });
      return NextResponse.json({
        reply: "Sorry, this job has already been taken by another plumber — you were a bit late! We'll send you the next available job.",
        accepted: false,
        otherPlumbers: [],
      });
    }

    // ── 6. Assign to this plumber (atomic transaction) ────────────────────────
    await prisma.$transaction([
      prisma.lead.update({
        where: { id: freshLead.id },
        data: { assignedPlumberId: plumber.id, status: "contacted" },
      }),
      prisma.leadDispatch.update({
        where: { id: dispatch.id },
        data: { status: "accepted", respondedAt: new Date(), plumberReply: text },
      }),
      prisma.leadDispatch.updateMany({
        where: {
          leadId: freshLead.id,
          status: "offered",
          id: { not: dispatch.id },
        },
        data: { status: "rejected", respondedAt: new Date() },
      }),
    ]);

    // Fetch other plumbers (all dispatches for this lead except this plumber)
    const otherDispatches = await prisma.leadDispatch.findMany({
      where: { leadId: freshLead.id, plumberId: { not: plumber.id } },
      include: { plumber: { select: { phone: true } } },
    });

    const otherPlumbers = otherDispatches
      .filter((d): d is typeof d & { plumber: { phone: string } } => d.plumber.phone !== null)
      .map((d) => ({
        waId: normaliseWaId(d.plumber.phone),
        rejectionMessage:
          "This job has been assigned to another plumber. Thanks for responding — we'll send you the next available job!",
      }));

    return NextResponse.json({
      reply: buildConfirmMessage(freshLead),
      accepted: true,
      otherPlumbers,
    });
  } catch (err) {
    console.error("[dispatch/respond POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
