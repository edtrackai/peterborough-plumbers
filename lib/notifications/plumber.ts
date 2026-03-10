/**
 * Plumber-facing notification helpers.
 * All functions are fire-and-forget safe — they never throw.
 */

import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { newOfferHtml } from "@/lib/email/templates";

const resend   = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM     = "Peterborough Plumbers <website@peterboroughplumbers.com>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peterboroughplumbers.com";

// ── Notify plumbers that a new job offer has been dispatched to them ──────────

export interface OfferNotificationParams {
  bookingId:   string;
  bookingRef:  string;
  serviceType: string | null;
  postcode:    string;
  slotDate:    string;   // "YYYY-MM-DD"
  slotStart:   string;
  slotEnd:     string;
  description: string | null;
  /** Array of plumbers to notify — must include id, name, email */
  plumbers: Array<{ id: string; name: string; email: string }>;
}

export async function notifyPlumbersNewOffer(params: OfferNotificationParams): Promise<void> {
  const portalUrl = `${SITE_URL}/plumber/requests`;

  await Promise.allSettled(
    params.plumbers.map(async (plumber) => {
      const html = newOfferHtml({
        plumberName: plumber.name,
        bookingRef:  params.bookingRef,
        serviceType: params.serviceType,
        postcode:    params.postcode,
        slotDate:    params.slotDate,
        slotStart:   params.slotStart,
        slotEnd:     params.slotEnd,
        description: params.description,
        portalUrl,
      });

      let success  = false;
      let errorMsg: string | undefined;

      if (resend) {
        try {
          await resend.emails.send({
            from:    FROM,
            to:      plumber.email,
            subject: `New job offer — ${params.serviceType ?? "General"} in ${params.postcode} · ${params.bookingRef}`,
            html,
          });
          success = true;
        } catch (err) {
          errorMsg = err instanceof Error ? err.message : String(err);
          console.error(`[notify/plumberOffer] email to ${plumber.email} failed:`, errorMsg);
        }
      } else {
        console.warn("[notify/plumberOffer] RESEND_API_KEY not set — email skipped");
      }

      // Log the attempt
      try {
        await prisma.bookingNotification.create({
          data: {
            bookingId: params.bookingId,
            type:      "offered",
            channel:   "email",
            recipient: plumber.email,
            message:   `Offer sent to plumber ${plumber.name} — ${portalUrl}`,
            success,
            errorMsg:  errorMsg ?? null,
          },
        });
      } catch (logErr) {
        console.error("[notify/plumberOffer] failed to log notification:", logErr);
      }
    })
  );
}
