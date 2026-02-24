import { NextResponse } from "next/server";
import { getPlumberSession } from "@/lib/plumber-session";

export async function POST() {
  const session = await getPlumberSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
