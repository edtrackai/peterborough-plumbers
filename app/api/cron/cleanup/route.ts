import { NextRequest, NextResponse } from "next/server";
import { cleanupExpired } from "@/lib/booking/cleanupExpired";

/**
 * Cron job: expire stale "reserved" bookings and free their time-slot counts.
 *
 * Invoked by Vercel Cron on the schedule in vercel.json.
 * Vercel sends `Authorization: Bearer {CRON_SECRET}` automatically.
 * Set CRON_SECRET in your Vercel project environment variables.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await cleanupExpired();

  return NextResponse.json({ ok: true });
}
