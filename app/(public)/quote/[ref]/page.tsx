import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ ref: string }>;
}

export const metadata: Metadata = {
  title: "Your Quote",
  robots: "noindex",
};

export default async function QuotePage({ params }: Props) {
  const { ref } = await params;

  const quote = await prisma.quote.findUnique({
    where: { quoteRef: ref },
    include: {
      lineItems: { orderBy: { sortOrder: "asc" } },
      booking: {
        select: {
          customerName: true,
          slot: { select: { date: true, startTime: true, endTime: true } },
        },
      },
      serviceItem: { select: { name: true } },
    },
  });

  if (!quote) notFound();

  const isExpired  = quote.validUntil && quote.validUntil < new Date();
  const isTerminal = ["approved", "declined", "expired", "superseded"].includes(quote.status);

  const statusLabel: Record<string, string> = {
    draft:      "Draft",
    sent:       "Awaiting your response",
    approved:   "✅ Approved",
    declined:   "❌ Declined",
    expired:    "Expired",
    superseded: "Revised",
  };

  const statusColour: Record<string, string> = {
    draft:      "bg-gray-100 text-gray-600",
    sent:       "bg-amber-100 text-amber-800",
    approved:   "bg-green-100 text-green-800",
    declined:   "bg-red-100 text-red-700",
    expired:    "bg-gray-100 text-gray-400",
    superseded: "bg-blue-100 text-blue-700",
  };

  const slotDate = quote.booking?.slot?.date
    ? new Date(quote.booking.slot.date).toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Peterborough Plumbers</p>
          <h1 className="text-2xl font-bold text-pp-navy">Your Quote</h1>
          <p className="font-mono text-sm text-gray-500 mt-1">{quote.quoteRef}</p>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-6">
          <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${statusColour[quote.status] ?? "bg-gray-100 text-gray-600"}`}>
            {statusLabel[quote.status] ?? quote.status}
          </span>
        </div>

        {/* Quote card */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden mb-6">

          {/* Job summary */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Job</h2>
            <p className="text-pp-navy font-medium">{quote.jobSummary ?? quote.serviceItem?.name ?? "Plumbing job"}</p>
            {slotDate && (
              <p className="text-sm text-gray-500 mt-1">
                📅 {slotDate} · {quote.booking?.slot?.startTime}–{quote.booking?.slot?.endTime}
              </p>
            )}
          </div>

          {/* Line items */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Breakdown</h2>
            <div className="flex flex-col gap-2">
              {quote.lineItems.map(li => (
                <div key={li.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{li.description}</span>
                  <span className="font-medium text-pp-navy">
                    {Number(li.lineTotal) < 0 ? "−" : ""}£{Math.abs(Number(li.lineTotal)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
              <span className="font-semibold text-pp-navy">
                {quote.quoteType === "estimate" ? "Estimated total" : "Total"}
              </span>
              <span className="text-lg font-bold text-pp-navy">£{Number(quote.total).toFixed(2)}</span>
            </div>
          </div>

          {/* Validity */}
          {quote.validUntil && !isTerminal && (
            <div className="px-6 py-4 bg-amber-50 text-sm text-amber-800">
              {isExpired
                ? "This quote has expired. Please contact us for a new quote."
                : `Valid until ${new Date(quote.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long" })} · ${new Date(quote.validUntil).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`}
            </div>
          )}
        </div>

        {/* WhatsApp CTA (only for sent/active quotes) */}
        {quote.status === "sent" && !isExpired && (
          <div className="rounded-2xl bg-pp-navy p-6 text-center">
            <p className="text-white font-medium mb-1">Ready to approve?</p>
            <p className="text-gray-400 text-sm mb-4">Reply to the WhatsApp message with <strong className="text-white">YES</strong> to confirm, or <strong className="text-white">NO</strong> to decline.</p>
            <p className="text-gray-500 text-xs">Or call us: <a href="tel:+441733000000" className="text-white underline">01733 000000</a></p>
          </div>
        )}

        {/* Approved message */}
        {quote.status === "approved" && (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
            <p className="text-green-800 font-semibold text-lg mb-1">Quote approved ✅</p>
            <p className="text-green-700 text-sm">
              Approved on {quote.approvedAt ? new Date(quote.approvedAt).toLocaleDateString("en-GB") : "—"}.
              We&apos;ll be in touch to confirm your engineer.
            </p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          Peterborough Plumbers · Gas Safe Registered
        </p>
      </div>
    </main>
  );
}
