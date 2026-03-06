import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/security/adminAuth";

const createPlumberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).transform((v) => v.trim()),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254)
    .transform((v) => v.trim().toLowerCase()),
  phone: z
    .string()
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Invalid phone number")
    .optional()
    .transform((v) => v?.trim() || null),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password too long"),
});

export async function GET(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

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
    console.error("[admin/plumbers GET]", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = createPlumberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, password } = parsed.data;

  try {
    const existing = await prisma.plumber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "A plumber with that email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);
    const plumber = await prisma.plumber.create({
      data: { name, email, phone, passwordHash, isActive: true, isOnDuty: false },
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
    console.error("[admin/plumbers POST]", err instanceof Error ? err.message : "error");
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
