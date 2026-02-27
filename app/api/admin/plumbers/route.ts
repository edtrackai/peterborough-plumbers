import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
  try {
    const plumbers = await prisma.plumber.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        isOnDuty: true,
        lastSeenAt: true,
        createdAt: true,
        _count: { select: { bookings: true } },
      },
    });
    return NextResponse.json({ plumbers });
  } catch (err) {
    console.error("[admin/plumbers GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body as {
      name: string;
      email: string;
      phone?: string;
      password: string;
    };

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existing = await prisma.plumber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "A plumber with that email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 10);
    const plumber = await prisma.plumber.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        passwordHash,
        isActive: true,
        isOnDuty: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        isOnDuty: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ plumber }, { status: 201 });
  } catch (err) {
    console.error("[admin/plumbers POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
