import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LeadsPipeline } from "@/components/admin/LeadsPipeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads Pipeline | Admin",
  robots: { index: false, follow: false },
};

const VALID_STATUSES = ["new", "contacted", "converted", "closed"] as const;

export default async function AdminLeadsPage() {
  // Fetch all leads for pipeline (no pagination — pipeline needs all cards)
  const [allLeads, statsByStatus] = await Promise.all([
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
    }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
  ]);

  const countMap = Object.fromEntries(statsByStatus.map((s) => [s.status, s._count.id]));
  const total = allLeads.length;
  const converted = countMap["converted"] ?? 0;
  const convRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  const serialised = allLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    postcode: l.postcode,
    serviceType: l.serviceType,
    message: l.message,
    status: l.status,
    source: l.source,
    createdAt: l.createdAt.toISOString(),
  }));

  const stageColors: Record<string, string> = {
    new: "#3B82F6",
    contacted: "#F59E0B",
    converted: "#22C55E",
    closed: "#94A3B8",
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Lead Funnel</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {total} total leads &middot; {convRate}% conversion rate
          </p>
        </div>
        <Link href="/admin" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          ← Dashboard
        </Link>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {VALID_STATUSES.map((s) => {
          const count = countMap[s] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={s} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: stageColors[s] }}
                />
                <span className="text-[0.65rem] text-slate-400 uppercase tracking-wide font-semibold">
                  {pct}%
                </span>
              </div>
              <p className="text-2xl font-black text-slate-800 leading-none">{count}</p>
              <p className="text-xs text-slate-500 mt-1 capitalize font-medium">{s}</p>
            </div>
          );
        })}
      </div>

      {/* Pipeline */}
      <LeadsPipeline initialLeads={serialised} />
    </div>
  );
}
