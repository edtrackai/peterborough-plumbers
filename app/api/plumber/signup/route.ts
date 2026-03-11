import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";
import { sendNewSignupNotification } from "@/lib/email/plumberApproval";

const DOC_TYPES = [
  "photo_id",
  "selfie",
  "proof_of_address",
  "public_liability_insurance",
  "dbs_certificate",
  "gas_safe_certificate",
] as const;

const signupSchema = z
  .object({
    plumberType: z.enum(["general", "gas_safe"]),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100)
      .transform((v) => v.trim()),
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
    gasSafeNumber: z
      .string()
      .max(20)
      .optional()
      .transform((v) => v?.trim() || undefined),
    gasSafeCertExpiry: z.string().optional(),
    docs: z
      .array(
        z.object({
          docType: z.enum(DOC_TYPES),
          url: z.string().url(),
          publicId: z.string().optional(),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.plumberType === "gas_safe") {
      if (!data.gasSafeNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Gas Safe registration number is required",
          path: ["gasSafeNumber"],
        });
      }
      if (!data.gasSafeCertExpiry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Gas Safe certificate expiry date is required",
          path: ["gasSafeCertExpiry"],
        });
      } else {
        const expiry = new Date(data.gasSafeCertExpiry);
        if (isNaN(expiry.getTime())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid expiry date",
            path: ["gasSafeCertExpiry"],
          });
        } else if (expiry < new Date()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Gas Safe certificate has expired — please renew before applying",
            path: ["gasSafeCertExpiry"],
          });
        }
      }
    }
  });

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, {
    name: "plumber-signup",
    max: 5,
    windowMs: 60 * 60 * 1000,
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

  const {
    plumberType,
    name,
    email,
    phone,
    password,
    gasSafeNumber,
    gasSafeCertExpiry,
    docs,
  } = parsed.data;

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
        plumberType,
        name,
        email,
        phone,
        passwordHash,
        isActive: false,
        isOnDuty: false,
        approvalStatus: "pending_verification",
        gasSafeNumber: gasSafeNumber ?? null,
        gasSafeCertExpiry: gasSafeCertExpiry ? new Date(gasSafeCertExpiry) : null,
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

    // Fire-and-forget admin notification
    sendNewSignupNotification({
      name,
      email,
      phone: phone ?? undefined,
      gasSafeNumber: gasSafeNumber ?? undefined,
      plumberType,
    }).catch((e) => console.error("[signup notification]", e));

    return NextResponse.json({ ok: true, plumber }, { status: 201 });
  } catch (err) {
    console.error("[plumber/signup]", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
