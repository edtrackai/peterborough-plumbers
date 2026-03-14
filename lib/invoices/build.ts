import { prisma } from "@/lib/prisma";
import { generateInvoiceNumber } from "./generateInvoiceNumber";
import { getConfigNumber } from "@/lib/quotes/config";

/**
 * Builds an Invoice from a completed booking.
 * Pulls in the latest approved Quote's line items plus all approved Variations.
 * Guard: returns the existing invoice (created: false) if one already exists.
 */
export async function buildInvoiceFromBooking(
  bookingId: string,
  createdBy: "system" | "admin" = "system",
) {
  // Guard: only one invoice per booking
  const existing = await prisma.invoice.findFirst({ where: { bookingId } });
  if (existing) return { invoice: existing, created: false };

  // Load booking with latest approved quote + approved variations
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      quotes: {
        where:   { status: "approved" },
        orderBy: { createdAt: "desc" },
        take:    1,
        include: { lineItems: { orderBy: { sortOrder: "asc" } } },
      },
      variations: {
        where: { status: "approved" },
      },
    },
  });

  if (!booking) throw new Error("Booking not found");

  const quote   = booking.quotes[0] ?? null;
  const vatRate = await getConfigNumber("quote.vat_rate");
  const payDays = (await getConfigNumber("invoice.payment_days")) || 7;

  const invoiceLines: {
    description: string;
    quantity:    number;
    unitPrice:   number;
    lineTotal:   number;
    lineType:    string;
    sourceType:  string;
    sourceId:    string | null;
    sortOrder:   number;
  }[] = [];

  let sort = 0;

  // Quote lines
  if (quote) {
    for (const li of quote.lineItems) {
      invoiceLines.push({
        description: li.description,
        quantity:    Number(li.quantity),
        unitPrice:   Number(li.unitPrice),
        lineTotal:   Number(li.lineTotal),
        lineType:    li.lineType,
        sourceType:  "quote_line",
        sourceId:    li.id,
        sortOrder:   sort++,
      });
    }
  }

  // Approved variation lines
  for (const v of booking.variations) {
    if (Number(v.extraLabourCost) > 0) {
      invoiceLines.push({
        description: `Additional labour${v.notes ? ` — ${v.notes.slice(0, 60)}` : ""}`,
        quantity:    1,
        unitPrice:   Number(v.extraLabourCost),
        lineTotal:   Number(v.extraLabourCost),
        lineType:    "variation",
        sourceType:  "variation",
        sourceId:    v.id,
        sortOrder:   sort++,
      });
    }
    if (Number(v.extraMaterialCost) > 0) {
      invoiceLines.push({
        description: "Additional parts & materials",
        quantity:    1,
        unitPrice:   Number(v.extraMaterialCost),
        lineTotal:   Number(v.extraMaterialCost),
        lineType:    "variation",
        sourceType:  "variation",
        sourceId:    v.id,
        sortOrder:   sort++,
      });
    }
  }

  const subtotal  = invoiceLines.reduce((s, l) => s + l.lineTotal, 0);
  const vatAmount = parseFloat((subtotal * (vatRate / 100)).toFixed(2));
  const total     = parseFloat((subtotal + vatAmount).toFixed(2));
  const dueDate   = new Date(Date.now() + payDays * 24 * 60 * 60 * 1000);
  const invoiceNumber = await generateInvoiceNumber();

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      bookingId,
      quoteId:   quote?.id ?? null,
      leadId:    null,
      status:    "draft",
      subtotal,
      vatRate,
      vatAmount,
      total,
      dueDate,
      createdBy,
      lineItems: { create: invoiceLines },
    },
    include: { lineItems: true },
  });

  return { invoice, created: true };
}
