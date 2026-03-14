import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/security/adminAuth";
import { buildInvoiceFromBooking } from "@/lib/invoices/build";
import { logEvent } from "@/lib/audit";
import { z } from "zod";

const schema = z.object({ bookingId: z.string().min(1) });

export async function POST(req: NextRequest) {
  const denied = requireAdminAuth(req);
  if (denied) return denied;

  try {
    const body   = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "bookingId is required" }, { status: 400 });
    }

    const { invoice, created } = await buildInvoiceFromBooking(
      parsed.data.bookingId,
      "admin",
    );

    if (created) {
      await logEvent({
        entityType: "invoice",
        entityId:   invoice.id,
        eventType:  "invoice_generated",
        actorType:  "admin",
        metadata: {
          invoiceNumber: invoice.invoiceNumber,
          total:         String(invoice.total),
          bookingId:     parsed.data.bookingId,
        },
      });
    }

    return NextResponse.json(
      {
        invoiceId:     invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        total:         Number(invoice.total),
        status:        invoice.status,
        created,
      },
      { status: created ? 201 : 200 },
    );
  } catch (err) {
    console.error("[invoices/generate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
