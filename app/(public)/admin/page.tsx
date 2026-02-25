import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Peterborough Plumbers",
  robots: { index: false, follow: false },
};

// ── Status colour map ─────────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  reserved:           { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  pending_assignment: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  new:                { bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  accepted:           { bg: "#EDE9FE", text: "#5B21B6", dot: "#8B5CF6" },
  en_route:           { bg: "#FFEDD5", text: "#9A3412", dot: "#F97316" },
  arrived:            { bg: "#FFEDD5", text: "#9A3412", dot: "#F97316" },
  in_progress:        { bg: "#F3E8FF", text: "#6B21A8", dot: "#A855F7" },
  completed:          { bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  cancelled:          { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
  expired:            { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] ?? { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold capitalize whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ── SVG bar chart ─────────────────────────────────────────────────────────────
function BarChart({ values, color = "#C8102E" }: { values: number[]; color?: string }) {
  const max = Math.max(...values, 1);
  const W = 200; const H = 52; const gap = 4;
  const barW = (W - gap * (values.length - 1)) / values.length;
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const today = new Date().getDay();
  const labels = values.map((_, i) => days[(today - (values.length - 1 - i) + 7) % 7]);

  return (
    <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full" aria-hidden>
      {values.map((v, i) => {
        const h = Math.max(3, (v / max) * H);
        const x = i * (barW + gap);
        const y = H - h;
        const isToday = i === values.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={0} width={barW} height={H} rx="3" fill={isToday ? "#F1F5F9" : "transparent"} />
            <rect x={x} y={y} width={barW} height={h} rx="3" fill={color} opacity={isToday ? 1 : 0.45} />
            <text x={x + barW / 2} y={H + 13} textAnchor="middle" fontSize="8" fill={isToday ? "#475569" : "#94A3B8"} fontWeight={isToday ? "700" : "400"}>
              {labels[i]}
            </text>
            {v > 0 && (
              <text x={x + barW / 2} y={y - 3} textAnchor="middle" fontSize="7" fill={color} opacity={isToday ? 1 : 0.7}>
                {v}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ── Lead funnel ───────────────────────────────────────────────────────────────
function LeadFunnel({ counts }: { counts: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...counts.map((c) => c.value), 1);
  const H = 18; const gap = 5;
  const totalH = counts.length * H + (counts.length - 1) * gap;

  return (
    <svg viewBox={`0 0 200 ${totalH}`} className="w-full" aria-hidden>
      {counts.map((c, i) => {
        const w = Math.max(40, (c.value / max) * 200);
        const x = (200 - w) / 2;
        const y = i * (H + gap);
        return (
          <g key={c.label}>
            <rect x={x} y={y} width={w} height={H} rx="5" fill={c.color} />
            <text x={100} y={y + 12} textAnchor="middle" fontSize="8.5" fill="white" fontWeight="700">
              {c.label} · {c.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 6);

  const [
    totalBookings,
    activeJobs,
    pendingAssignment,
    completedToday,
    totalLeads,
    newLeadsThisWeek,
    convertedLeads,
    bookingsByStatus,
    leadsByStatus,
    recentBookings,
    recentLeads,
    weeklyData,
  ] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: { in: ["accepted", "en_route", "arrived", "in_progress"] } } }),
    prisma.booking.count({ where: { status: { in: ["new", "pending_assignment", "reserved"] } } }),
    prisma.booking.count({ where: { status: "completed", updatedAt: { gte: today, lt: tomorrow } } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.lead.count({ where: { status: "converted" } }),
    prisma.booking.groupBy({ by: ["status"], _count: { id: true }, orderBy: { _count: { id: "desc" } } }),
    prisma.lead.groupBy({ by: ["status"], _count: { id: true } }),
    prisma.booking.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      select: {
        id: true, bookingRef: true, customerName: true,
        serviceType: true, status: true, postcode: true,
        createdAt: true,
        slot: { select: { date: true, startTime: true } },
      },
    }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, serviceType: true, status: true, createdAt: true, phone: true },
    }),
    Promise.all(
      [...Array(7)].map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (6 - i));
        const next = new Date(d);
        next.setDate(d.getDate() + 1);
        return prisma.booking.count({ where: { createdAt: { gte: d, lt: next } } });
      })
    ),
  ]);

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const leadStatusOrder = ["new", "contacted", "converted", "closed"];
  const leadCountMap = Object.fromEntries(leadsByStatus.map((l) => [l.status, l._count.id]));
  const funnelData = leadStatusOrder.map((s, i) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: leadCountMap[s] ?? 0,
    color: ["#3B82F6", "#F59E0B", "#22C55E", "#6B7280"][i],
  }));

  const kpis = [
    {
      label: "Active Jobs",
      value: activeJobs,
      sub: "en route / in progress",
      color: "#8B5CF6",
      bg: "#F5F3FF",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pendingAssignment,
      sub: "awaiting engineer",
      color: "#F59E0B",
      bg: "#FFFBEB",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "New Leads (7d)",
      value: newLeadsThisWeek,
      sub: `${conversionRate}% conversion`,
      color: "#3B82F6",
      bg: "#EFF6FF",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "Done Today",
      value: completedToday,
      sub: `${totalBookings} all-time`,
      color: "#22C55E",
      bg: "#F0FDF4",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5 lg:space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold text-white shrink-0"
          style={{ background: "#C8102E" }}
        >
          Pipeline →
        </Link>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wide leading-snug">
                {k.label}
              </span>
              <span
                className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: k.bg, color: k.color }}
              >
                {k.icon}
              </span>
            </div>
            <p className="text-3xl font-black text-slate-800 leading-none">{k.value}</p>
            <p className="text-[0.68rem] text-slate-400 mt-1.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 lg:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-slate-700">Bookings — Last 7 Days</p>
              <p className="text-xs text-slate-400 mt-0.5">New bookings created per day</p>
            </div>
            <span className="text-2xl font-black text-slate-800">
              {weeklyData.reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <BarChart values={weeklyData} color="#C8102E" />
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-5 border border-slate-100 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-bold text-slate-700">Lead Funnel</p>
            <p className="text-xs text-slate-400 mt-0.5">{totalLeads} leads · {conversionRate}% converted</p>
          </div>
          <LeadFunnel counts={funnelData} />
          <div className="mt-3 space-y-1.5">
            {funnelData.map((f) => (
              <div key={f.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="h-2 w-2 rounded-full" style={{ background: f.color }} />
                  {f.label}
                </span>
                <span className="font-bold text-slate-700">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Status breakdown + recent bookings ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 lg:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-700">Bookings by Status</p>
            <Link href="/admin/bookings" className="text-xs font-semibold" style={{ color: "#C8102E" }}>
              Pipeline →
            </Link>
          </div>
          <div className="space-y-2.5">
            {bookingsByStatus.map((b) => {
              const pct = totalBookings > 0 ? Math.round((b._count.id / totalBookings) * 100) : 0;
              const s = STATUS_STYLE[b.status] ?? { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" };
              return (
                <div key={b.status} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-slate-600 capitalize font-medium truncate">
                    {b.status.replace(/_/g, " ")}
                  </span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: s.dot }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs font-bold text-slate-700">{b._count.id}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 lg:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-700">Recent Bookings</p>
            <Link href="/admin/bookings" className="text-xs font-semibold" style={{ color: "#C8102E" }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: "#C8102E" }}
                >
                  {(b.customerName ?? "??").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{b.customerName ?? "—"}</p>
                  <p className="text-xs text-slate-400 truncate">{b.serviceType ?? "General"} · {b.postcode}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent leads ── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 lg:px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-bold text-slate-700">Recent Leads</p>
          <Link href="/admin/leads" className="text-xs font-semibold" style={{ color: "#C8102E" }}>
            Open funnel →
          </Link>
        </div>

        {/* Mobile card list */}
        <div className="block lg:hidden divide-y divide-slate-50">
          {recentLeads.map((l) => {
            const ago = Math.round((Date.now() - new Date(l.createdAt).getTime()) / 60000);
            const agoStr = ago < 60 ? `${ago}m ago` : ago < 1440 ? `${Math.round(ago / 60)}h ago` : `${Math.round(ago / 1440)}d ago`;
            return (
              <div key={l.id} className="flex items-center gap-3 px-4 py-3">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: "#0F172A" }}
                >
                  {l.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{l.name}</p>
                  <p className="text-[0.68rem] text-slate-400 truncate">{l.phone} · {agoStr}</p>
                </div>
                <StatusBadge status={l.status} />
              </div>
            );
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Name", "Phone", "Service", "Status", "Received"].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentLeads.map((l) => {
                const ago = Math.round((Date.now() - new Date(l.createdAt).getTime()) / 60000);
                const agoStr = ago < 60 ? `${ago}m ago` : ago < 1440 ? `${Math.round(ago / 60)}h ago` : `${Math.round(ago / 1440)}d ago`;
                return (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-slate-700">{l.name}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">{l.phone}</td>
                    <td className="px-5 py-3 text-sm text-slate-500">{l.serviceType ?? "—"}</td>
                    <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                    <td className="px-5 py-3 text-xs text-slate-400">{agoStr}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
