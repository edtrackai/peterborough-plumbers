"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

function MenuIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
    </svg>
  );
}

// ── Live clock ────────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-sm font-bold text-slate-800 tabular-nums">{time ?? "--:--"}</span>
      <span className="text-xs text-slate-400">{dateStr}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="flex w-full" style={{ minHeight: "calc(100vh - 80px)" }}>

      {/* ── Desktop sidebar ── */}
      <div className="hidden lg:block shrink-0" style={{ width: 260 }}>
        <div className="sticky top-0 h-[calc(100vh-80px)] overflow-hidden">
          <AdminSidebar />
        </div>
      </div>

      {/* ── Mobile backdrop ── */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <div
        className={[
          "fixed top-0 left-0 bottom-0 z-50 lg:hidden transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <AdminSidebar isMobile onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: "#F0F2F7" }}>

        {/* ── Desktop topbar ── */}
        <header
          className="hidden lg:flex sticky top-0 z-30 items-center justify-between px-6 py-3 shrink-0"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <LiveClock />

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </span>
              <input
                type="search"
                placeholder="Search bookings, leads…"
                className="pl-8 pr-4 py-2 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 w-52 transition-all focus:outline-none focus:w-64 focus:ring-2 focus:ring-[#C8102E]/20"
                style={{ background: "#F1F5F9", border: "1px solid rgba(0,0,0,0.07)" }}
              />
            </div>

            {/* Bell */}
            <button
              className="relative h-8 w-8 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              style={{ background: "#F1F5F9" }}
              aria-label="Notifications"
            >
              <BellIcon />
              <span
                className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
                style={{ background: "#C8102E" }}
              />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200" />

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center text-white text-[0.65rem] font-black shrink-0"
                style={{ background: "linear-gradient(135deg, #C8102E, #8B0C1E)" }}
              >
                A
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 leading-none">Admin</p>
                <p className="text-[0.6rem] text-slate-400 mt-0.5 leading-none">Peterborough Plumbers</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Mobile topbar ── */}
        <header
          className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 shrink-0"
          style={{
            background: "linear-gradient(135deg, #0D1117 0%, #0B0F1A 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/50 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors -ml-1.5"
            aria-label="Open navigation"
          >
            <MenuIcon />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-lg flex items-center justify-center text-white font-black text-[0.6rem] shrink-0"
              style={{ background: "linear-gradient(135deg, #E31530, #C8102E)" }}
            >
              PP
            </div>
            <span className="text-white text-sm font-bold tracking-tight">Admin Panel</span>
          </div>

          <button
            className="text-white/50 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors relative -mr-1.5"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "#C8102E" }} />
          </button>
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
