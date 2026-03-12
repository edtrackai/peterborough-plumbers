import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimiter";
import { triggerLeadDispatch } from "@/lib/dispatch";

const RATE_LIMIT = { name: "leads", max: 5, windowMs: 10 * 60 * 1000 }; // 5 per 10 min

const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .transform((v) => v.trim()),
  phone: z
    .string()
    .min(10, "Enter a valid UK phone number")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Invalid phone number")
    .transform((v) => v.trim()),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254)
    .transform((v) => v.trim().toLowerCase()),
  postcode: z
    .string()
    .min(3, "Enter a valid postcode")
    .max(10)
    .transform((v) => v.trim().toUpperCase()),
  serviceType: z.string().max(100).optional().transform((v) => v?.trim() || undefined),
  message: z.string().max(1000).optional().transform((v) => v?.trim() || undefined),
  // Honeypot field — must be absent or empty; bots typically fill this in
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = checkRateLimit(ip, RATE_LIMIT);
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
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    // Honeypot triggered — silently accept to confuse bots
    if (fieldErrors.website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    return NextResponse.json(
      { error: "Validation failed", fields: fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot: if the hidden field was filled, silently discard
  if (parsed.data.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { website: _honeypot, ...leadData } = parsed.data;

  try {
    const lead = await prisma.lead.create({ data: leadData });
    triggerLeadDispatch(lead.id).catch(() => {});
    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("[leads POST]", err instanceof Error ? err.message : "DB error");
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}
