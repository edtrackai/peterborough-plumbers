"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Icons ─────────────────────────────────────────────────────────────────────
function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  );
}
function PipelineIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 6h4v12H3zM10 4h4v16h-4zM17 8h4v8h-4z" strokeLinejoin="round" />
    </svg>
  );
}
function FunnelIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18l-7 8.5V19l-4-2v-4.5L3 4z" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_MAIN = [
  { href: "/admin",          label: "Dashboard", Icon: GridIcon },
  { href: "/admin/bookings", label: "Bookings",  Icon: CalIcon },
  { href: "/admin/leads",    label: "Leads",     Icon: UsersIcon },
] as const;

const NAV_PIPELINES = [
  { href: "/admin/bookings", label: "Job Pipeline", Icon: PipelineIcon },
  { href: "/admin/leads",    label: "Lead Funnel",  Icon: FunnelIcon },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminSidebar({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <aside
      className="w-[260px] flex flex-col h-full select-none"
      style={{ background: "#0F172A" }}
    >
      {/* ── Brand ── */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0"
          style={{ background: "#C8102E" }}
        >
          PP
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-[0.88rem] leading-none">Peterborough</p>
          <p className="text-white/35 text-[0.6rem] mt-0.5 uppercase tracking-widest font-semibold">
            Plumbers Admin
          </p>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="text-white/35 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close menu"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-0.5">
        <p className="px-3.5 mb-2.5 text-white/20 text-[0.58rem] uppercase tracking-[0.18em] font-bold">
          Overview
        </p>
        {NAV_MAIN.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={isMobile ? onClose : undefined}
            className={[
              "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all duration-150",
              isActive(href)
                ? "text-white shadow-sm"
                : "text-white/45 hover:text-white/80 hover:bg-white/[0.06]",
            ].join(" ")}
            style={isActive(href) ? { background: "#C8102E" } : {}}
          >
            <Icon />
            {label}
          </Link>
        ))}

        <div className="pt-5">
          <p className="px-3.5 mb-2.5 text-white/20 text-[0.58rem] uppercase tracking-[0.18em] font-bold">
            Pipelines
          </p>
          {NAV_PIPELINES.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              onClick={isMobile ? onClose : undefined}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[0.82rem] text-white/45 hover:text-white/80 hover:bg-white/[0.06] transition-all"
            >
              <Icon />
              {label}
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div
          className="mx-0.5 mt-6 rounded-xl p-4 space-y-3"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-[0.58rem] uppercase tracking-[0.18em] font-bold">Quick Access</p>
          <a
            href="tel:01733000000"
            className="flex items-center gap-2.5 text-white/50 text-xs hover:text-white/80 transition-colors"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency Line
          </a>
          <Link
            href="/book"
            onClick={isMobile ? onClose : undefined}
            className="flex items-center gap-2.5 text-white/50 text-xs hover:text-white/80 transition-colors"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Booking
          </Link>
        </div>
      </nav>

      {/* ── User / footer ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="px-4 pt-4 pb-5">
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-3"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[0.65rem] font-black shrink-0"
            style={{ background: "#C8102E" }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-semibold leading-none">Admin User</p>
            <p className="text-white/30 text-[0.62rem] mt-0.5 truncate">Peterborough Plumbers</p>
          </div>
        </div>
        <Link
          href="/"
          onClick={isMobile ? onClose : undefined}
          className="flex items-center gap-2 text-white/30 text-xs hover:text-white/60 transition-colors px-3 py-1"
        >
          <ArrowLeftIcon />
          Back to website
        </Link>
      </div>
    </aside>
  );
}
