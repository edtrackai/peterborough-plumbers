"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface PlumberNavProps {
  name: string;
  offerCount?: number;
}

/* ── SVG icons ─────────────────────────────────────────────────────────────── */
function IconRequests({ active }: { active: boolean }) {
  const c = active ? "var(--brand)" : "currentColor";
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="15" height="2.2" rx="1.1" fill={c} />
      <rect x="2" y="8.4" width="10" height="2.2" rx="1.1" fill={c} />
      <rect x="2" y="13.8" width="7" height="2.2" rx="1.1" fill={c} />
      <circle cx="15" cy="14.5" r="2.8" stroke={c} strokeWidth="1.7" />
      <path d="M14.1 14.5h1.8M15 13.6v1.8" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconJobs({ active }: { active: boolean }) {
  const c = active ? "var(--brand)" : "currentColor";
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="15" height="10" rx="2" stroke={c} strokeWidth="1.7" />
      <path d="M7 7V5a1 1 0 011-1h3a1 1 0 011 1v2" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6.5 12h6M9.5 10v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconProfile({ active }: { active: boolean }) {
  const c = active ? "var(--brand)" : "currentColor";
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="6" r="3" stroke={c} strokeWidth="1.7" />
      <path d="M3 17c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

const links = [
  { href: "/plumber/requests", label: "Requests", Icon: IconRequests },
  { href: "/plumber/jobs",     label: "My Jobs",  Icon: IconJobs     },
  { href: "/plumber/profile",  label: "Profile",  Icon: IconProfile  },
];

export function PlumberNav({ name, offerCount = 0 }: PlumberNavProps) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    await fetch("/api/plumber/logout", { method: "POST" });
    router.push("/plumber/login");
  }

  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      {/* ── Top header ── */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 h-14">

          {/* Brand */}
          <Link href="/plumber/requests" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--brand)] shadow-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M2 6.5a5.5 5.5 0 015.5-5.5H8a5.5 5.5 0 015.5 5.5c0 1.6-.68 3.04-1.77 4.07L10 13H4L2.27 10.57A5.46 5.46 0 012 6.5z"
                  stroke="white" strokeWidth="1.5" strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold text-white">Plumber Portal</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {links.map(({ href, label, Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "text-white bg-white/[0.07]"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon active={active} />
                  <span>{label}</span>
                  {href === "/plumber/requests" && offerCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand)] text-[10px] font-bold text-white">
                      {offerCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: avatar + sign out */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[var(--brand)]/15 border border-[var(--brand)]/25 flex items-center justify-center">
                <span className="text-[11px] font-bold text-[var(--brand)]">{initials}</span>
              </div>
              <span className="text-xs text-zinc-500 truncate max-w-[90px]">{name.split(" ")[0]}</span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-zinc-500 hover:border-red-500/40 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm border-t border-white/[0.06] flex">
        {links.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-medium transition-colors ${
                active ? "text-white" : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <Icon active={active} />
              <span>{label}</span>
              {href === "/plumber/requests" && offerCount > 0 && (
                <span className="absolute top-2 right-[calc(50%-18px)] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--brand)] text-[9px] font-bold text-white">
                  {offerCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
