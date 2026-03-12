import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { QuotesClient } from "@/components/admin/QuotesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quotes | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminQuotesPage() {
  const rawQuotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      booking: {
        select: {
          bookingRef: true,
          customerName: true,
          phone: true,
          email: true,
          serviceType: true,
        },
      },
      lead: {
        select: {
          name: true,
          phone: true,
          email: true,
          serviceType: true,
        },
      },
      serviceItem: {
        select: {
          name: true,
        },
      },
      lineItems: {
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          description: true,
          quantity: true,
          unitPrice: true,
          lineTotal: true,
          lineType: true,
          isOptional: true,
          sortOrder: true,
        },
      },
      messages: {
        orderBy: { sentAt: "asc" },
        select: {
          id: true,
          direction: true,
          channel: true,
          recipient: true,
          body: true,
          status: true,
          sentAt: true,
        },
      },
    },
  });

  // Serialise Decimal + Date fields to plain objects for client component
  const quotes = rawQuotes.map((q) => ({
    id: q.id,
    quoteRef: q.quoteRef,
    quoteType: q.quoteType,
    status: q.status,
    subtotal: q.subtotal.toNumber(),
    calloutFee: q.calloutFee.toNumber(),
    urgencySurcharge: q.urgencySurcharge.toNumber(),
    vatAmount: q.vatAmount.toNumber(),
    total: q.total.toNumber(),
    notes: q.notes,
    internalNotes: q.internalNotes,
    jobSummary: q.jobSummary,
    validUntil: q.validUntil?.toISOString() ?? null,
    sentAt: q.sentAt?.toISOString() ?? null,
    approvedAt: q.approvedAt?.toISOString() ?? null,
    declinedAt: q.declinedAt?.toISOString() ?? null,
    approvedByText: q.approvedByText,
    createdAt: q.createdAt.toISOString(),
    // Customer info — prefer booking, fall back to lead
    customerName: q.booking?.customerName ?? q.lead?.name ?? null,
    customerPhone: q.booking?.phone ?? q.lead?.phone ?? null,
    customerEmail: q.booking?.email ?? q.lead?.email ?? null,
    serviceLabel:
      q.serviceItem?.name ?? q.booking?.serviceType ?? q.lead?.serviceType ?? null,
    bookingRef: q.booking?.bookingRef ?? null,
    lineItems: q.lineItems.map((li) => ({
      id: li.id,
      description: li.description,
      quantity: li.quantity.toNumber(),
      unitPrice: li.unitPrice.toNumber(),
      lineTotal: li.lineTotal.toNumber(),
      lineType: li.lineType,
      isOptional: li.isOptional,
      sortOrder: li.sortOrder,
    })),
    messages: q.messages.map((m) => ({
      id: m.id,
      direction: m.direction,
      channel: m.channel,
      recipient: m.recipient,
      body: m.body,
      status: m.status,
      sentAt: m.sentAt.toISOString(),
    })),
  }));

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Quote &amp; Variation
          </p>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Quotes</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage customer quotes — send, resend, and review approval status.
          </p>
        </div>
      </div>

      <QuotesClient quotes={quotes} />
    </div>
  );
}
