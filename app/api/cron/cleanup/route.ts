import { NextRequest, NextResponse } from "next/server";

/**
 * Cron endpoint — decommissioned with the website booking flow.
 * Slot reservations no longer originate from the website (WhatsApp-first flow).
 * Kept as a no-op so any existing Vercel cron schedule does not 500.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, note: "booking-cleanup decommissioned" });
}
