/**
 * PATCH /api/admin/plumbers/[id]/approval
 *
 * Admin-only. Approve, reject, or request more info on a pending plumber signup.
 *
 * Body:
 *   action: "approve" | "reject" | "needs_more_info"
 *   adminNote?: string    — shown to plumber
 *   boilerGasApproved?: boolean  — only relevant when action=approve
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { assignPlumberId } from "@/lib/plumber/generateId";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email/plumberApproval";

const approvalSchema = z.object({
  action: z.enum(["approve", "reject", "needs_more_info"]),
  adminNote: z.string().max(1000).optional().transform((v) => v?.trim() || undefined),
  boilerGasApproved: z.boolean().optional().default(false),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = approvalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { action, adminNote, boilerGasApproved } = parsed.data;

  try {
    const plumber = await prisma.plumber.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, approvalStatus: true, plumberId: true },
    });

    if (!plumber) {
      return NextResponse.json({ error: "Plumber not found." }, { status: 404 });
    }

    if (plumber.approvalStatus === "approved" && action === "approve") {
      return NextResponse.json({ error: "Plumber is already approved." }, { status: 409 });
    }

    let newPlumberId = plumber.plumberId;

    if (action === "approve") {
      // Assign PLM ID if not already set, then activate
      if (!plumber.plumberId) {
        newPlumberId = await assignPlumberId(plumber.id);
      }

      await prisma.plumber.update({
        where: { id },
        data: {
          approvalStatus: "approved",
          isActive: true,
          verifiedGeneral: true,
          boilerGasApproved: boilerGasApproved ?? false,
          adminNote: adminNote ?? null,
        },
      });

      // Fire-and-forget approval email
      sendApprovalEmail({
        name: plumber.name,
        email: plumber.email,
        plumberId: newPlumberId!,
        boilerGasApproved: boilerGasApproved ?? false,
      }).catch((e) => console.error("[approval email]", e));

    } else if (action === "reject") {
      await prisma.plumber.update({
        where: { id },
        data: {
          approvalStatus: "rejected",
          isActive: false,
          adminNote: adminNote ?? null,
        },
      });

      sendRejectionEmail({
        name: plumber.name,
        email: plumber.email,
        adminNote: adminNote,
      }).catch((e) => console.error("[rejection email]", e));

    } else {
      // needs_more_info
      await prisma.plumber.update({
        where: { id },
        data: {
          approvalStatus: "needs_more_info",
          isActive: false,
          adminNote: adminNote ?? null,
        },
      });
    }

    return NextResponse.json({ ok: true, action, plumberId: newPlumberId ?? null });
  } catch (err) {
    console.error("[admin/plumbers/approval]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
