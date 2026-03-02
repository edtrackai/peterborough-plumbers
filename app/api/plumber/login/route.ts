import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

// 10 attempts per 15 minutes per IP — prevents brute-force without blocking legitimate logins
const RATE_LIMIT = { name: "plumber-login", max: 10, windowMs: 15 * 60 * 1000 };

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
  if (limited) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let email: unknown, password: unknown;
  try {
    ({ email, password } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Hard length caps before touching bcrypt — prevents bcrypt DoS on very long passwords
  if (email.length > 254 || password.length > 128) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  try {
    const plumber = await prisma.plumber.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!plumber || !plumber.isActive) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await compare(password, plumber.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const session = await getPlumberSession();
    session.plumberId = plumber.id;
    session.name = plumber.name;
    session.email = plumber.email;
    await session.save();

    await prisma.plumber.update({
      where: { id: plumber.id },
      data: { lastSeenAt: new Date() },
    });

    return NextResponse.json({ ok: true, name: plumber.name });
  } catch (err) {
    console.error("[plumber/login]", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
