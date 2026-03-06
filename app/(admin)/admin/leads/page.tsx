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
    status: l.status,
    source: l.source,
    createdAt: l.createdAt.toISOString(),
  }));

  const stageConfig: Record<string, { label: string; dot: string; border: string; gradient: string }> = {
    new:       { label: "New",       dot: "#3B82F6", border: "#3B82F620", gradient: "linear-gradient(135deg,#EFF6FF,#DBEAFE)" },
    contacted: { label: "Contacted", dot: "#F59E0B", border: "#F59E0B20", gradient: "linear-gradient(135deg,#FFFBEB,#FEF3C7)" },
    converted: { label: "Converted", dot: "#22C55E", border: "#22C55E20", gradient: "linear-gradient(135deg,#F0FDF4,#DCFCE7)" },
    closed:    { label: "Closed",    dot: "#94A3B8", border: "#94A3B820", gradient: "linear-gradient(135deg,#F8FAFC,#F1F5F9)" },
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-5 max-w-[1400px] mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">CRM</p>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Lead Funnel</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600"
            style={{ background: "#F1F5F9", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            {total} total
          </span>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600"
            style={{ background: "#F1F5F9", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {convRate}% converted
          </span>
          <Link href="/admin" className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors px-2">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {VALID_STATUSES.map((s) => {
          const count = countMap[s] ?? 0;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          const cfg = stageConfig[s];
          return (
            <div
              key={s}
              className="rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: cfg.gradient,
                border: `1.5px solid ${cfg.border}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: cfg.dot, boxShadow: `0 0 6px ${cfg.dot}88` }}
                />
                <span
                  className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: `${cfg.dot}18`, color: cfg.dot }}
                >
                  {pct}%
                </span>
              </div>
              <p className="text-3xl font-black text-slate-800 leading-none tabular-nums">{count}</p>
              <p className="text-xs text-slate-500 mt-1.5 font-semibold capitalize tracking-wide">{cfg.label}</p>
              {/* Mini progress bar */}
              <div className="mt-3 h-1 rounded-full bg-slate-200/60 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, background: cfg.dot }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline */}
      <LeadsPipeline initialLeads={serialised} />
    </div>
  );
}
