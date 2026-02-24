import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getPlumberSession } from "@/lib/plumber-session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const plumber = await prisma.plumber.findUnique({ where: { email: email.trim().toLowerCase() } });

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

    // Update lastSeenAt
    await prisma.plumber.update({
      where: { id: plumber.id },
      data: { lastSeenAt: new Date() },
    });

    return NextResponse.json({ ok: true, name: plumber.name });
  } catch (err) {
    console.error("[plumber/login]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
