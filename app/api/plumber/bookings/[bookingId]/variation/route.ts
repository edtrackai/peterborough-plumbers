import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateVariationRef } from "@/lib/quotes/generateRef";
import { getConfigNumber, getConfigBool } from "@/lib/quotes/config";
import { renderNamedTemplate } from "@/lib/quotes/templates";
import { sendText } from "@/lib/whatsapp";
import { logEvent } from "@/lib/audit";
import { getSiteSettings } from "@/lib/db/content";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const cookieStore = await cookies();
  const session = await getIronSession<{ plumberId?: string }>(cookieStore, {
    password: process.env.SESSION_SECRET ?? "default-session-secret-32-chars!!",
    cookieName: "pp_plumber",
  });
  if (!session.plumberId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { bookingId } = await params;

  try {
    const body = await req.json();
    const { reasonIds, extraLabourCost, extraMaterialCost, notes, imageUrls } = body as {
      reasonIds:         string[];
      extraLabourCost:   number;
      extraMaterialCost: number;
      notes:             string;
      imageUrls?:        string[];
    };

    // Validate
    if (!reasonIds?.length) {
      return NextResponse.json({ error: "At least one reason is required" }, { status: 400 });
    }

    // Verify plumber is assigned to this booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { quotes: { where: { status: { in: ["approved", "sent"] } }, orderBy: { createdAt: "desc" }, take: 1 } },
    });

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    if (booking.assignedPlumberId !== session.plumberId) {
      return NextResponse.json({ error: "Not assigned to this booking" }, { status: 403 });
    }

    const originalQuote = booking.quotes[0];
    if (!originalQuote) {
      return NextResponse.json({ error: "No approved quote found for this booking" }, { status: 400 });
    }

    // Load reasons from DB
    const reasons = await prisma.variationReason.findMany({
      where: { id: { in: reasonIds }, isActive: true },
    });

    if (reasons.length !== reasonIds.length) {
      return NextResponse.json({ error: "One or more reason IDs are invalid" }, { status: 400 });
    }

    // Photo required check
    const photoRequired = await getConfigBool("plumber.variation_photo_required");
    if (photoRequired && (!imageUrls || imageUrls.length === 0)) {
      return NextResponse.json({ error: "Photo evidence is required for variations" }, { status: 400 });
    }

    const extraTotal = (Number(extraLabourCost) || 0) + (Number(extraMaterialCost) || 0);
    const officeThreshold = await getConfigNumber("variation.office_approval_above");

    // Determine if office approval required
    const needsManagerFromReason = reasons.some(r => r.requiresManagerReview);
    const needsManagerFromAmount = extraTotal > officeThreshold;
    const officeApprovalRequired = needsManagerFromReason || needsManagerFromAmount;

    // Create variation
    const variation = await prisma.variation.create({
      data: {
        variationRef:          generateVariationRef(),
        bookingId,
        originalQuoteId:       originalQuote.id,
        raisedByPlumberId:     session.plumberId,
        extraLabourCost:       Number(extraLabourCost) || 0,
        extraMaterialCost:     Number(extraMaterialCost) || 0,
        extraTotal,
        notes:                 notes ?? null,
        status:                officeApprovalRequired ? "pending_office" : "draft",
        officeApprovalRequired,
        reasons:               { connect: reasonIds.map(id => ({ id })) },
        images:                imageUrls?.length
          ? { create: imageUrls.map(url => ({ url })) }
          : undefined,
      },
    });

    await logEvent({
      entityType: "variation",
      entityId:   variation.id,
      eventType:  "variation_raised",
      actorType:  "plumber",
      actorId:    session.plumberId,
      metadata:   { variationRef: variation.variationRef, extraTotal, officeApprovalRequired },
    });

    // If office approval not required, auto-send to customer
    if (!officeApprovalRequired) {
      await sendVariationToCustomer(variation.id, booking, originalQuote, extraTotal, reasons);
    }

    return NextResponse.json({
      variationId: variation.id,
      variationRef: variation.variationRef,
      status: variation.status,
      officeApprovalRequired,
    }, { status: 201 });

  } catch (err) {
    console.error("[plumber/bookings/variation]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function sendVariationToCustomer(
  variationId: string,
  booking: { id: string; phone: string | null; customerName: string | null },
  originalQuote: { id: string; quoteRef: string; total: unknown },
  extraTotal: number,
  reasons: { label: string }[],
) {
  if (!booking.phone) return;

  const settings = await getSiteSettings();
  const reasonDescription = reasons.map(r => r.label).join(", ");
  const newTotal = Number(originalQuote.total) + extraTotal;

  const body = await renderNamedTemplate("revised_quote", {
    customer_name:     booking.customerName ?? "there",
    plumber_name:      "Your engineer",
    quote_reference:   originalQuote.quoteRef,
    reason_description: reasonDescription,
    original_total:    Number(originalQuote.total).toFixed(2),
    new_total:         newTotal.toFixed(2),
    extra_total:       extraTotal.toFixed(2),
    line_items_summary: `• Extra labour: £${extraTotal.toFixed(2)}`,
    phone:             settings.phone,
  });

  let waId = booking.phone.replace(/\D/g, "");
  if (waId.startsWith("0")) waId = "44" + waId.slice(1);

  await sendText(waId, body);

  await prisma.variation.update({
    where: { id: variationId },
    data:  { status: "sent" },
  });

  await logEvent({
    entityType: "variation",
    entityId:   variationId,
    eventType:  "variation_sent",
    actorType:  "system",
    metadata:   { recipient: waId, extraTotal },
  });
}
