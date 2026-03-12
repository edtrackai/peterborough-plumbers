import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { triggerLeadDispatch } from "@/lib/dispatch";

/**
 * POST /api/dispatch/trigger-pending
 * Called by Vercel Cron every 5 minutes.
 * Finds all leads with status="new" that have no dispatch records yet,
 * and fires dispatch for each one.
 *
 * Auth: CRON_SECRET header (set in Vercel env vars)
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    // Find leads with status="new" that have zero dispatch records
    const undispatched = await prisma.lead.findMany({
      where: {
        status: "new",
        dispatches: { none: {} },
      },
      select: { id: true, name: true, phone: true },
      orderBy: { createdAt: "asc" },
      take: 20, // safety cap per run
    });

    if (undispatched.length === 0) {
      return NextResponse.json({ dispatched: 0 });
    }

    // Fire dispatch for each — all concurrent, errors are isolated
    const results = await Promise.allSettled(
      undispatched.map((lead) => triggerLeadDispatch(lead.id))
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      dispatched: succeeded,
      failed,
      leadIds: undispatched.map((l) => l.id),
    });
  } catch (err) {
    console.error("[trigger-pending POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
