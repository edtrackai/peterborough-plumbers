import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PricingManager from "@/components/admin/PricingManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPricingPage() {
  const pricing = await prisma.pricing.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1400px] mx-auto">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Pricing
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Edit service prices below — changes go live on the website immediately after saving.
          </p>
        </div>
        <a
          href="/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors shrink-0 bg-white"
        >
          View Live Page ↗
        </a>
      </div>

      {/* Instructions */}
      <div
        className="rounded-xl px-5 py-3.5 text-sm text-slate-600 flex items-start gap-3"
        style={{
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
        }}
      >
        <svg className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <span>
          <strong className="font-semibold text-slate-700">How to update a price:</strong> Edit the
          fields in any row, then click <strong className="font-semibold">Save</strong> on that row.
          The <strong className="font-semibold">Label</strong> field controls the prefix shown before the price
          (e.g. <em>From</em>, <em>Fixed</em>, <em>+</em> — leave blank for none).
          Toggle <strong className="font-semibold">Active</strong> off to hide a service from the pricing page.
        </span>
      </div>

      {/* Pricing groups */}
      <PricingManager pricing={pricing} />

    </div>
  );
}
