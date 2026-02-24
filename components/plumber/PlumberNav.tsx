"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface PlumberNavProps {
  name: string;
  offerCount?: number;
}

const links = [
  { href: "/plumber/requests", label: "Requests" },
  { href: "/plumber/jobs",     label: "My Jobs" },
  { href: "/plumber/profile",  label: "Profile" },
];

export function PlumberNav({ name, offerCount = 0 }: PlumberNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/plumber/logout", { method: "POST" });
    router.push("/plumber/login");
  }

  return (
    <header className="sticky top-0 z-40 bg-pp-navy shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/plumber/requests" className="flex items-center gap-2">
          <span className="rounded-lg bg-pp-teal px-2 py-0.5 text-xs font-bold text-white tracking-wide">PP</span>
          <span className="text-sm font-semibold text-white">Plumber Portal</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname.startsWith(l.href)
                  ? "bg-pp-teal text-white"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {l.label}
              {l.href === "/plumber/requests" && offerCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {offerCount}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right: greeting + logout */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-gray-400 truncate max-w-[120px]">{name}</span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-red-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="sm:hidden flex border-t border-white/10">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`relative flex-1 py-2.5 text-center text-xs font-medium transition-colors ${
              pathname.startsWith(l.href)
                ? "text-pp-teal"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {l.label}
            {l.href === "/plumber/requests" && offerCount > 0 && (
              <span className="absolute top-1 right-1/4 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {offerCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
