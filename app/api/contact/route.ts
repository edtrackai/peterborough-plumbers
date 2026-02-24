import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/db/leads";
import { leadNotificationHtml } from "@/lib/email/templates";
import { Resend } from "resend";

const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(100),
  email:   z.string().email("Please enter a valid email address").max(254),
  phone:   z.string().max(20).optional(),
  message: z.string().min(10, "Please write at least 10 characters").max(2000),
});

// In-memory rate limiter: 5 per IP per 10 minutes
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in 10 minutes." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (field) fieldErrors[field] = issue.message;
    }
    return NextResponse.json(
      { error: "Please check the form and try again.", fields: fieldErrors },
      { status: 422 }
    );
  }

  const data = result.data;
  const pageSource = request.headers.get("referer") ?? "unknown";
  let leadId: string;

  try {
    leadId = await createLead({
      name:       data.name,
      email:      data.email,
      phone:      data.phone,
      message:    data.message,
      pageSource,
      ipAddress:  ip,
    });
  } catch (err) {
    console.error("[Contact] DB insert failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "We couldn't save your message. Please call us directly." },
      { status: 500 }
    );
  }

  console.log("[Contact] Lead saved:", { leadId, receivedAt: new Date().toISOString() });

  if (resend && process.env.OWNER_EMAIL) {
    resend.emails.send({
      from: "Peterborough Plumbers <website@peterboroughplumbers.com>",
      to: process.env.OWNER_EMAIL,
      subject: `New Enquiry — ${data.name}`,
      html: leadNotificationHtml({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        pageSource,
        leadId,
      }),
    }).catch((err: Error) => console.error("[Contact] Email failed:", err.message));
  }

  return NextResponse.json(
    { success: true, leadId: leadId.slice(0, 8).toUpperCase() },
    { status: 201 }
  );
}
