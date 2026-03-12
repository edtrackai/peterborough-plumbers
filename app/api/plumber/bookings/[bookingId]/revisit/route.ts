import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateRevisitRef } from "@/lib/quotes/generateRef";
import { getConfigNumber } from "@/lib/quotes/config";
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
    const { reasonId, notes, imageUrls, partsNeeded } = body as {
      reasonId:    string;
      notes?:      string;
      imageUrls?:  string[];
      partsNeeded?: string;
    };

    if (!reasonId) {
      return NextResponse.json({ error: "reasonId is required" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    if (booking.assignedPlumberId !== session.plumberId) {
      return NextResponse.json({ error: "Not assigned to this booking" }, { status: 403 });
    }

    const reason = await prisma.revisitReason.findUnique({ where: { id: reasonId } });
    if (!reason) return NextResponse.json({ error: "Invalid reason" }, { status: 400 });

    const defaultCallout = await getConfigNumber("revisit.default_callout_fee");
    const chargeAmount = reason.chargeAmount ? Number(reason.chargeAmount) : (reason.isChargeable ? defaultCallout : 0);

    const revisit = await prisma.revisit.create({
      data: {
        revisitRef:        generateRevisitRef(),
        originalBookingId: bookingId,
        reasonId,
        isChargeable:      reason.isChargeable,
        chargeAmount:      reason.isChargeable ? chargeAmount : null,
        notes:             notes ?? null,
        partsNeeded:       partsNeeded ?? null,
        status:            reason.requiresManager ? "pending_manager" : "pending",
        requiresManager:   reason.requiresManager,
        images:            imageUrls?.length
          ? { create: imageUrls.map(url => ({ url })) }
          : undefined,
      },
    });

    // Mark booking as revisit_required
    await prisma.booking.update({
      where: { id: bookingId },
      data:  { status: "revisit_required" },
    });

    await logEvent({
      entityType: "revisit",
      entityId:   revisit.id,
      eventType:  "revisit_created",
      actorType:  "plumber",
      actorId:    session.plumberId,
      metadata:   { revisitRef: revisit.revisitRef, reasonKey: reason.key, isChargeable: reason.isChargeable },
    });

    // Send WhatsApp to customer (unless requires manager review)
    if (!reason.requiresManager && booking.phone) {
      const settings = await getSiteSettings();

      const body = await renderNamedTemplate("second_visit_needed", {
        customer_name: booking.customerName ?? "there",
        plumber_name:  "Your engineer",
        reason:        reason.label,
        is_chargeable: reason.isChargeable ? "true" : "",
        callout_fee:   chargeAmount.toFixed(2),
        phone:         settings.phone,
      });

      let waId = booking.phone.replace(/\D/g, "");
      if (waId.startsWith("0")) waId = "44" + waId.slice(1);

      await sendText(waId, body).catch(e => console.error("[revisit] WhatsApp send failed:", e));
    }

    return NextResponse.json({
      revisitId:   revisit.id,
      revisitRef:  revisit.revisitRef,
      isChargeable: revisit.isChargeable,
      status:      revisit.status,
    }, { status: 201 });

  } catch (err) {
    console.error("[plumber/bookings/revisit]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
