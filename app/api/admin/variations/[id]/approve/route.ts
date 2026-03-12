import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { logEvent } from "@/lib/audit";
import { getSiteSettings } from "@/lib/db/content";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body = await req.json();
    const { editedLabour, editedMaterials, internalNote } = body as {
      editedLabour?:    number;
      editedMaterials?: number;
      internalNote?:    string;
    };

    const variation = await prisma.variation.findUnique({
      where: { id },
      include: {
        booking:        { select: { id: true, phone: true, customerName: true } },
        originalQuote:  { select: { id: true, quoteRef: true, total: true } },
        reasons:        { select: { label: true } },
      },
    });

    if (!variation) return NextResponse.json({ error: "Variation not found" }, { status: 404 });
    if (variation.status !== "pending_office") {
      return NextResponse.json({ error: `Cannot approve variation with status "${variation.status}"` }, { status: 409 });
    }

    const extraLabour    = editedLabour    !== undefined ? editedLabour    : Number(variation.extraLabourCost);
    const extraMaterials = editedMaterials !== undefined ? editedMaterials : Number(variation.extraMaterialCost);
    const extraTotal = extraLabour + extraMaterials;

    await prisma.variation.update({
      where: { id },
      data: {
        extraLabourCost:   extraLabour,
        extraMaterialCost: extraMaterials,
        extraTotal,
        status:            "approved_for_send",
        officeApprovedAt:  new Date(),
      },
    });

    await logEvent({
      entityType: "variation",
      entityId:   id,
      eventType:  "variation_office_approved",
      actorType:  "admin",
      metadata:   { variationRef: variation.variationRef, extraTotal, internalNote },
    });

    // Send to customer
    if (variation.booking.phone) {
      const settings = await getSiteSettings();
      const reasonDescription = variation.reasons.map(r => r.label).join(", ");
      const newTotal = Number(variation.originalQuote.total) + extraTotal;

      const msgBody = await renderNamedTemplate("revised_quote", {
        customer_name:      variation.booking.customerName ?? "there",
        plumber_name:       "Your engineer",
        quote_reference:    variation.originalQuote.quoteRef,
        reason_description: reasonDescription,
        original_total:     Number(variation.originalQuote.total).toFixed(2),
        new_total:          newTotal.toFixed(2),
        extra_total:        extraTotal.toFixed(2),
        line_items_summary: `• Extra labour: £${extraLabour.toFixed(2)}\n• Extra materials: £${extraMaterials.toFixed(2)}`,
        phone:              settings.phone,
      });

      let waId = variation.booking.phone.replace(/\D/g, "");
      if (waId.startsWith("0")) waId = "44" + waId.slice(1);

      await sendText(waId, msgBody);

      await prisma.variation.update({ where: { id }, data: { status: "sent" } });

      await logEvent({
        entityType: "variation",
        entityId:   id,
        eventType:  "variation_sent",
        actorType:  "admin",
        metadata:   { recipient: waId, extraTotal },
      });
    }

    return NextResponse.json({ ok: true, extraTotal });

  } catch (err) {
    console.error("[admin/variations/approve]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
