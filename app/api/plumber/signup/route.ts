import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100).transform((v) => v.trim()),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254)
    .transform((v) => v.trim().toLowerCase()),
  phone: z
    .string()
    .min(9, "Enter a valid UK phone number")
    .max(20)
    .transform((v) => v.trim())
    .refine((v) => /^[\d\s+()-]+$/.test(v), "Invalid phone number"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password too long"),
  // Optional: doc uploads provided as Cloudinary URLs after upload
  docs: z
    .array(
      z.object({
        docType: z.enum([
          "photo_id",
          "selfie",
          "proof_of_address",
          "public_liability_insurance",
          "dbs_certificate",
          "gas_safe_certificate",
        ]),
        url: z.string().url(),
        publicId: z.string().optional(),
      })
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, {
    name: "plumber-signup",
    max: 5,
    windowMs: 60 * 60 * 1000, // 5 signups per IP per hour
  });
  if (limited) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, password, docs } = parsed.data;

  try {
    const existing = await prisma.plumber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const plumber = await prisma.plumber.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        isActive: false,              // cannot login until approved
        isOnDuty: false,
        approvalStatus: "pending_verification",
        verifiedGeneral: false,
        boilerGasApproved: false,
        ...(docs && docs.length > 0
          ? {
              docs: {
                create: docs.map((d) => ({
                  docType: d.docType,
                  url: d.url,
                  publicId: d.publicId ?? null,
                })),
              },
            }
          : {}),
      },
      select: { id: true, name: true, email: true, approvalStatus: true },
    });

    return NextResponse.json({ ok: true, plumber }, { status: 201 });
  } catch (err) {
    console.error("[plumber/signup]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
