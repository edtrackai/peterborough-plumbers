import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { sql } from "@/lib/db";

// In-memory rate limiter: 5 submissions per IP per 10 minutes
// Resets on server restart — acceptable for a low-traffic local business site
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  // Rate limiting — check IP from header (Vercel sets x-forwarded-for)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in 10 minutes." },
      {
        status: 429,
        headers: { "Retry-After": "600" },
      }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: result.error.issues },
      { status: 422 }
    );
  }

  const data = result.data;

  try {
    await sql`
      INSERT INTO bookings (name, phone, email, postcode, service, date, time_window, details, ip_address)
      VALUES (
        ${data.name},
        ${data.phone},
        ${data.email},
        ${data.postcode},
        ${data.service},
        ${data.date},
        ${data.timeWindow},
        ${data.details},
        ${ip}
      )
    `;
  } catch (err) {
    console.error("[Booking] DB insert failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to save booking. Please call us directly." },
      { status: 500 }
    );
  }

  console.log("[Booking] Saved to DB:", {
    service: data.service,
    date: data.date,
    timeWindow: data.timeWindow,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
