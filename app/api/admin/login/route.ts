import { NextRequest, NextResponse } from "next/server";
import { computeAdminToken } from "@/lib/security/adminAuth";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

const RATE_LIMIT = { name: "admin-login", max: 10, windowMs: 15 * 60 * 1000 };

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let username: unknown, password: unknown;
  try {
    ({ username, password } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  if (username.length > 128 || password.length > 128) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const expectedUser = process.env.ADMIN_USER ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";

  const userMatch = username.trim() === expectedUser;
  const passMatch = password === expectedPass;

  if (!userMatch || !passMatch) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  const token = computeAdminToken();

  const res = NextResponse.json({ ok: true });
  res.cookies.set("pp_admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
