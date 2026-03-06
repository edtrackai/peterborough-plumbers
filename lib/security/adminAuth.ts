/**
 * Server-side admin authentication helper for API routes.
 *
 * Checks the pp_admin_session cookie set by middleware after successful
 * Basic Auth on the /admin pages. The cookie value is an HMAC-SHA256 digest
 * of the admin credentials + SESSION_SECRET, so it cannot be forged without
 * knowing all three values.
 *
 * Usage in any /api/admin/* route:
 *   const denied = requireAdminAuth(req);
 *   if (denied) return denied;
 */

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_COOKIE = "pp_admin_session";

/**
 * Computes the expected session token for the current admin credentials.
 * Deterministic — changing ADMIN_USER, ADMIN_PASSWORD, or SESSION_SECRET
 * automatically invalidates all existing sessions.
 */
export function computeAdminToken(): string {
  const user = process.env.ADMIN_USER ?? "";
  const pass = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.SESSION_SECRET ?? "default-session-secret";
  return crypto
    .createHash("sha256")
    .update(`pp-admin:${user}:${pass}:${secret}`)
    .digest("hex");
}

/**
 * Validates admin access for API routes.
 * Returns null when authenticated, or a 401 NextResponse when not.
 */
export function requireAdminAuth(req: NextRequest): NextResponse | null {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 }
    );
  }

  const cookie = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
  const expected = computeAdminToken();

  // Constant-time comparison — both must be the same length (hex digest)
  const cookieBuf = Buffer.from(cookie.padEnd(expected.length, "\0"));
  const expectedBuf = Buffer.from(expected);

  const isValid =
    cookie.length === expected.length &&
    crypto.timingSafeEqual(cookieBuf, expectedBuf);

  if (!isValid) {
    return NextResponse.json(
      { error: "Admin authentication required." },
      { status: 401 }
    );
  }

  return null; // Authenticated
}
