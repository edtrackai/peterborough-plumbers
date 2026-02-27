import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Peterborough Plumbers Admin",
  robots: { index: false, follow: false },
};

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  reserved:           { label: "Reserved",    color: "#F59E0B", bg: "#FEF3C7" },
  pending_assignment: { label: "Pending",      color: "#F59E0B", bg: "#FEF3C7" },
  new:                { label: "New",          color: "#3B82F6", bg: "#DBEAFE" },
  accepted:           { label: "Accepted",     color: "#8B5CF6", bg: "#EDE9FE" },
  en_route:           { label: "En Route",     color: "#F97316", bg: "#FFEDD5" },
  arrived:            { label: "Arrived",      color: "#F97316", bg: "#FFEDD5" },
  in_progress:        { label: "In Progress",  color: "#A855F7", bg: "#F3E8FF" },
  completed:          { label: "Completed",    color: "#22C55E", bg: "#DCFCE7" },
  cancelled:          { label: "Cancelled",    color: "#9CA3AF", bg: "#F3F4F6" },
  expired:            { label: "Expired",      color: "#9CA3AF", bg: "#F3F4F6" },
};

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? { label: status, color: "#9CA3AF", bg: "#F3F4F6" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold whitespace-nowrap capitalize"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ── Mini bar chart ────────────────────────────────────────────────────────────
function BarChart({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date().getDay();
  const labels = values.map((_, i) =>
    days[(today - (values.length - 1 - i) + 7) % 7]
  );
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex items-end gap-1.5 h-20">
        {values.map((v, i) => {
          const pct = Math.max(4, (v / max) * 100);
          const isToday = i === values.length - 1;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              {v > 0 && (
                <span className="text-[0.6rem] font-bold text-slate-400 group-last:text-[#C8102E] transition-opacity opacity-0 group-hover:opacity-100">
                  {v}
                </span>
              )}
              <div className="w-full rounded-t-md transition-all" style={{
                height: `${pct}%`,
                background: isToday
                  ? "linear-gradient(180deg, #E31530 0%, #C8102E 100%)"
                  : "rgba(200,16,46,0.18)",
                minHeight: "4px",
              }} />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2">
        {labels.map((l, i) => (
          <div key={i} className="flex-1 text-center">
            <span className={`text-[0.6rem] font-medium ${i === values.length - 1 ? "text-[#C8102E] font-bold" : "text-slate-400"}`}>
              {l}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">7-day total</span>
        <span className="text-sm font-bold text-slate-800">{total} bookings</span>
      </div>
    </div>
  );
}

// ── Funnel bar ────────────────────────────────────────────────────────────────
function FunnelBars({ data }: { data: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => {
        const pct = Math.max(4, (d.value / max) * 100);
        return (
          <div key={d.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-600">{d.label}</span>
              <span className="text-xs font-bold text-slate-800">{d.value}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: d.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
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
    totalPlumbers,
    activePlumbers,
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
        serviceType: true, status: true, postcode: true, createdAt: true,
        slot: { select: { date: true, startTime: true } },
      },
    }),
    prisma.lead.findMany({
      take: 6,
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
    prisma.plumber.count(),
    prisma.plumber.count({ where: { isActive: true } }),
  ]);

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const leadStatusOrder = ["new", "contacted", "converted", "closed"];
  const leadCountMap = Object.fromEntries(leadsByStatus.map((l) => [l.status, l._count.id]));
  const funnelData = leadStatusOrder.map((s, i) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    value: leadCountMap[s] ?? 0,
    color: ["#3B82F6", "#F59E0B", "#22C55E", "#94A3B8"][i],
  }));

  function timeAgo(date: Date) {
    const mins = Math.round((Date.now() - date.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
    return `${Math.round(mins / 1440)}d ago`;
  }

  const kpis = [
    {
      label: "Active Jobs",
      value: activeJobs,
      sub: "en route & in progress",
      color: "#8B5CF6",
      bg: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
      border: "#DDD6FE",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: "/admin/bookings",
    },
    {
      label: "Awaiting Engineer",
      value: pendingAssignment,
      sub: "needs assignment",
      color: "#F59E0B",
      bg: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
      border: "#FDE68A",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" />
        </svg>
      ),
      href: "/admin/bookings",
    },
    {
      label: "New Leads (7d)",
      value: newLeadsThisWeek,
      sub: `${conversionRate}% conversion rate`,
      color: "#3B82F6",
      bg: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
      border: "#BFDBFE",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path strokeLinecap="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      href: "/admin/leads",
    },
    {
      label: "Completed Today",
      value: completedToday,
      sub: `${totalBookings} all-time`,
      color: "#22C55E",
      bg: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
      border: "#BBF7D0",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/admin/bookings?tab=history",
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1400px] mx-auto">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"} — here&apos;s your overview.
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0 transition-all hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 2px 8px rgba(200,16,46,0.3)" }}
        >
          View Pipeline →
        </Link>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className="group rounded-2xl p-4 lg:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: k.bg,
              border: `1px solid ${k.border}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                style={{ background: "rgba(255,255,255,0.7)", color: k.color, backdropFilter: "blur(4px)" }}
              >
                {k.icon}
              </span>
              <svg className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-[2rem] font-black leading-none tracking-tight" style={{ color: k.color }}>{k.value}</p>
            <p className="text-[0.72rem] font-bold text-slate-700 mt-1.5 leading-snug">{k.label}</p>
            <p className="text-[0.65rem] text-slate-500 mt-0.5">{k.sub}</p>
          </Link>
        ))}
      </div>

      {/* ── Middle row: chart + funnel + team ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Booking trend */}
        <div
          className="lg:col-span-2 rounded-2xl p-5 lg:p-6"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-bold text-slate-800">Booking Trend</p>
              <p className="text-xs text-slate-400 mt-0.5">New bookings created — last 7 days</p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
              Pipeline →
            </Link>
          </div>
          <BarChart values={weeklyData} />
        </div>

        {/* Lead funnel + Team mini */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-bold text-slate-800">Lead Funnel</p>
                <p className="text-xs text-slate-400 mt-0.5">{totalLeads} leads · {conversionRate}% converted</p>
              </div>
              <Link href="/admin/leads" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
                Funnel →
              </Link>
            </div>
            <FunnelBars data={funnelData} />
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-slate-800">Team</p>
              <Link href="/admin/plumbers" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
                Manage →
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800">{totalPlumbers}</p>
                <p className="text-[0.65rem] text-slate-500 mt-0.5">Registered</p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color: "#22C55E" }}>{activePlumbers}</p>
                <p className="text-[0.65rem] text-slate-500 mt-0.5">Active</p>
              </div>
              <div className="h-8 w-px bg-slate-100" />
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800">{totalPlumbers - activePlumbers}</p>
                <p className="text-[0.65rem] text-slate-500 mt-0.5">Suspended</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom row: bookings status + recent ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Status breakdown */}
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-800">By Status</p>
            <Link href="/admin/bookings" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
              All →
            </Link>
          </div>
          <div className="space-y-2.5">
            {bookingsByStatus.slice(0, 6).map((b) => {
              const pct = totalBookings > 0 ? Math.round((b._count.id / totalBookings) * 100) : 0;
              const cfg = STATUS_CFG[b.status] ?? { color: "#9CA3AF", bg: "#F3F4F6", label: b.status };
              return (
                <div key={b.status} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-slate-600 font-medium truncate capitalize">
                    {cfg.label}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#F1F5F9" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.max(pct, 2)}%`, background: cfg.color }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-bold text-slate-700">{b._count.id}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent bookings */}
        <div
          className="lg:col-span-3 rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <p className="text-sm font-bold text-slate-800">Recent Bookings</p>
            <Link href="/admin/bookings" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
              View all →
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                <div
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-[0.62rem] font-black text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, #1E293B, #0F172A)" }}
                >
                  {(b.customerName ?? "??").slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{b.customerName ?? "—"}</p>
                  <p className="text-[0.65rem] text-slate-400 truncate">{b.serviceType ?? "General"} · {b.postcode}</p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={b.status} />
                  <p className="text-[0.6rem] text-slate-400 mt-1">{timeAgo(b.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent leads ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <p className="text-sm font-bold text-slate-800">Recent Leads</p>
          <Link href="/admin/leads" className="text-xs font-semibold hover:underline" style={{ color: "#C8102E" }}>
            Open funnel →
          </Link>
        </div>

        {/* Mobile */}
        <div className="block lg:hidden divide-y" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
          {recentLeads.map((l) => (
            <div key={l.id} className="flex items-center gap-3 px-4 py-3">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center text-[0.62rem] font-black text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #1E293B, #0F172A)" }}
              >
                {l.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{l.name}</p>
                <p className="text-[0.65rem] text-slate-400 truncate">{l.phone} · {timeAgo(l.createdAt)}</p>
              </div>
              <StatusBadge status={l.status} />
            </div>
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                {["Name", "Phone", "Service", "Status", "Received"].map((h) => (
                  <th key={h} className="px-5 py-2.5 text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-700">{l.name}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{l.phone}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{l.serviceType ?? "—"}</td>
                  <td className="px-5 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-5 py-3 text-xs text-slate-400">{timeAgo(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
