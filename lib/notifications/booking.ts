/**
 * Customer notification helpers for booking lifecycle events.
 * All functions are fire-and-forget safe — they never throw.
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { plumberAssignedHtml } from "@/lib/email/templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = "Peterborough Plumbers <website@peterboroughplumbers.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peterboroughplumbers.com";

// ── Notify customer their booking has been accepted + plumber assigned ────────

export async function notifyCustomerAccepted(params: {
  bookingId: string;
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  plumberName: string;
  slotDate: string;   // "YYYY-MM-DD"
  slotStart: string;
  slotEnd: string;
}): Promise<void> {
  const trackingUrl = `${SITE_URL}/track/${params.bookingRef}`;

  const html = plumberAssignedHtml({
    customerName: params.customerName,
    plumberName:  params.plumberName,
    bookingRef:   params.bookingRef,
    slotDate:     params.slotDate,
    slotStart:    params.slotStart,
    slotEnd:      params.slotEnd,
    trackingUrl,
  });

  let success = false;
  let errorMsg: string | undefined;

  if (resend) {
    try {
      await resend.emails.send({
        from:    FROM,
        to:      params.customerEmail,
        subject: `Your plumber is confirmed — Ref ${params.bookingRef}`,
        html,
      });
      success = true;
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[notify/customerAccepted] email failed:", errorMsg);
    }
  } else {
    console.warn("[notify/customerAccepted] RESEND_API_KEY not set — email skipped");
  }

  // Always log the attempt so admin can see notification history
  try {
    await prisma.bookingNotification.create({
      data: {
        bookingId: params.bookingId,
        type:      "accepted",
        channel:   "email",
        recipient: params.customerEmail,
        message:   `Plumber assigned: ${params.plumberName}. Tracking: ${trackingUrl}`,
        success,
        errorMsg:  errorMsg ?? null,
      },
    });
  } catch (logErr) {
    console.error("[notify/customerAccepted] failed to log notification:", logErr);
  }
}
