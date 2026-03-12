/**
 * Lead dispatch — sends new lead alerts to all active plumbers via WhatsApp.
 * Called after a new lead is created (fire-and-forget).
 *
 * WhatsApp waId format: no leading +, e.g. "447700900000" or "923001234567"
 */

import { prisma } from "@/lib/prisma";
import { sendText } from "@/lib/whatsapp";

/** Strip + and whitespace from a phone number for WhatsApp waId comparison */
export function normaliseWaId(raw: string): string {
  return raw.replace(/[\s+\-()]/g, "");
}

function buildDispatchMessage(lead: {
  name: string;
  phone: string;
  postcode: string;
  serviceType: string | null;
  notes: string | null;
  preferredTime: string | null;
}): string {
  const lines: string[] = [
    "🔔 *New Job Alert!*",
    "",
    `Customer: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Postcode: ${lead.postcode}`,
  ];
  if (lead.serviceType) lines.push(`Service: ${lead.serviceType}`);
  if (lead.notes) lines.push(`Issue: ${lead.notes}`);
  if (lead.preferredTime) lines.push(`Preferred Time: ${lead.preferredTime}`);
  lines.push("", "Reply *YES* to accept this job", "Reply *NO* to decline");
  return lines.join("\n");
}

export async function triggerLeadDispatch(leadId: string): Promise<void> {
  try {
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) return;

    const plumbers = await prisma.plumber.findMany({
      where: {
        isActive: true,
        approvalStatus: "approved",
        phone: { not: null },
      },
      select: { id: true, name: true, phone: true },
    });

    if (plumbers.length === 0) return;

    const message = buildDispatchMessage(lead);

    // Create dispatch records (skip if already exists for this lead+plumber)
    await prisma.leadDispatch.createMany({
      data: plumbers.map((p) => ({
        leadId: lead.id,
        plumberId: p.id,
        status: "offered",
        dispatchMessage: message,
      })),
      skipDuplicates: true,
    });

    // Send WhatsApp to all plumbers concurrently — failures are silent
    // Note: message already stored in createMany above
    await Promise.allSettled(
      plumbers
        .filter((p): p is typeof p & { phone: string } => p.phone !== null)
        .map((p) => sendText(normaliseWaId(p.phone), message))
    );
  } catch (err) {
    console.error("[dispatch] triggerLeadDispatch error:", err);
  }
}
