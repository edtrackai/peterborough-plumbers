/**
 * GET /api/health
 * ---------------------------------------------------------------------------
 * Development-only endpoint to verify the database connection is working.
 * Returns 404 in production to avoid exposing infrastructure details.
 *
 * Test it locally:
 *   curl http://localhost:3000/api/health
 *   → { "status": "ok", "db": "connected" }
 */

import { NextResponse } from "next/server";

export async function GET() {
  // Only expose in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ status: "not found" }, { status: 404 });
  }

  try {
    const { sql } = await import("@/lib/db");
    await sql`SELECT 1`;
    return NextResponse.json({ status: "ok", db: "connected" });
  } catch (error) {
    console.error(
      "[/api/health] DB connection failed:",
      error instanceof Error ? error.message : "unknown error"
    );
    return NextResponse.json(
      { status: "error", db: "disconnected", hint: "Check DATABASE_URL in .env.local" },
      { status: 500 }
    );
  }
}
