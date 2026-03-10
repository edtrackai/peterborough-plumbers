"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteSettings } from "@/content/settings";

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
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  );
}
function PipelineIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 6h4v12H3zM10 4h4v16h-4zM17 8h4v8h-4z" strokeLinejoin="round" />
    </svg>
  );
}
function FunnelIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18l-7 8.5V19l-4-2v-4.5L3 4z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg className="h-[13px] w-[13px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg className="h-[13px] w-[13px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function ArrowLeftIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}
function PricingIcon() {
  return (
    <svg className="h-[15px] w-[15px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/admin",          label: "Dashboard", Icon: GridIcon,    exact: true },
      { href: "/admin/bookings", label: "Bookings",  Icon: CalIcon,     exact: false },
      { href: "/admin/leads",    label: "Leads",     Icon: UsersIcon,   exact: false },
      { href: "/admin/whatsapp", label: "WhatsApp",  Icon: WhatsAppIcon, exact: false },
      { href: "/admin/calls",    label: "Calls",     Icon: PhoneIcon,    exact: false },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/bookings", label: "Job Pipeline", Icon: PipelineIcon, exact: false },
      { href: "/admin/leads",    label: "Lead Funnel",  Icon: FunnelIcon,   exact: false },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/pricing",  label: "Pricing",  Icon: PricingIcon,  exact: false },
      { href: "/admin/settings", label: "Settings", Icon: WrenchIcon,   exact: false },
    ],
  },
  {
    label: "Team",
    items: [
      { href: "/admin/plumbers", label: "Plumbers", Icon: WrenchIcon, exact: false },
    ],
  },
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

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside
      className="w-[260px] flex flex-col h-full select-none"
      style={{
        background: "linear-gradient(180deg, #0D1117 0%, #0B0F1A 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* ── Brand ────────────────────────────────────────────────────────── */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-black text-[0.72rem] shrink-0"
          style={{
            background: "linear-gradient(135deg, #E31530 0%, #C8102E 60%, #8B0C1E 100%)",
            boxShadow: "0 4px 12px rgba(200,16,46,0.4)",
          }}
        >
          PP
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-[0.88rem] leading-none tracking-tight">Peterborough</p>
          <p className="text-white/30 text-[0.58rem] mt-0.5 uppercase tracking-[0.2em] font-semibold">Plumbers · Admin</p>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all shrink-0"
            aria-label="Close menu"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {NAV_SECTIONS.map(({ label, items }) => (
          <div key={label}>
            <p className="px-3 mb-1.5 text-[0.55rem] uppercase tracking-[0.22em] font-bold"
               style={{ color: "rgba(255,255,255,0.18)" }}>
              {label}
            </p>
            <div className="space-y-0.5">
              {items.map(({ href, label: itemLabel, Icon, exact }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={`${href}-${itemLabel}`}
                    href={href}
                    onClick={isMobile ? onClose : undefined}
                    className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all duration-150 group"
                    style={
                      active
                        ? {
                            background: "rgba(200,16,46,0.18)",
                            color: "#fff",
                          }
                        : { color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    {/* Active left bar */}
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                        style={{ background: "#C8102E" }}
                      />
                    )}
                    <span
                      className="transition-colors duration-150"
                      style={{ color: active ? "#f87171" : undefined }}
                    >
                      <Icon />
                    </span>
                    <span className={active ? "text-white" : "group-hover:text-white/70 transition-colors"}>
                      {itemLabel}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick actions */}
        <div>
          <p className="px-3 mb-1.5 text-[0.55rem] uppercase tracking-[0.22em] font-bold"
             style={{ color: "rgba(255,255,255,0.18)" }}>
            Quick Actions
          </p>
          <div className="space-y-0.5">
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <PhoneIcon />
              Emergency Line
            </a>
            <Link
              href="/book"
              onClick={isMobile ? onClose : undefined}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <PlusIcon />
              New Booking
            </Link>
          </div>
        </div>
      </nav>

      {/* ── User / footer ────────────────────────────────────────────────── */}
      <div
        className="px-3 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="relative shrink-0">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center text-white text-[0.65rem] font-black"
              style={{ background: "linear-gradient(135deg, #C8102E, #8B0C1E)" }}
            >
              A
            </div>
            {/* Online dot */}
            <span
              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#0D1117]"
              style={{ background: "#22C55E" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/80 text-xs font-semibold leading-none">Admin User</p>
            <p className="text-white/25 text-[0.6rem] mt-0.5 truncate">Peterborough Plumbers</p>
          </div>
        </div>
        <Link
          href="/"
          onClick={isMobile ? onClose : undefined}
          className="flex items-center gap-2 text-white/20 text-xs hover:text-white/50 transition-colors px-3 py-1.5"
        >
          <ArrowLeftIcon />
          Back to website
        </Link>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/admin-login";
          }}
          className="flex items-center gap-2 text-white/20 text-xs hover:text-red-400 transition-colors px-3 py-1.5 w-full"
        >
          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
