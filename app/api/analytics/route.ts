import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { trackDbEvent, type AnalyticsEventName } from "@/lib/db/analytics";

const analyticsSchema = z.object({
  eventName: z.union([
    z.literal("call_click"),
    z.literal("whatsapp_click"),
    z.literal("booking_submit"),
    z.literal("contact_submit"),
    z.literal("emergency_cta_click"),
    z.literal("book_click"),
  ]),
  pagePath:  z.string().max(500).optional(),
  sessionId: z.string().max(100).optional(),
  metadata:  z
    .record(
      z.string().max(50),
      z.union([z.string().max(200), z.number(), z.boolean(), z.null()])
    )
    .refine((m) => Object.keys(m).length <= 20, "Too many metadata keys")
    .optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = analyticsSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  // Fire-and-forget — never fail the client for analytics
  trackDbEvent({
    eventName: result.data.eventName as AnalyticsEventName,
    pagePath:  result.data.pagePath,
    sessionId: result.data.sessionId,
    metadata:  result.data.metadata as Record<string, unknown> | undefined,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
