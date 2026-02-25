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
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close drawer when resizing to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="flex w-full" style={{ minHeight: "calc(100vh - 80px)" }}>

      {/* ── Desktop sidebar (always visible ≥ lg) ── */}
      <div className="hidden lg:block shrink-0" style={{ width: 260 }}>
        <AdminSidebar />
      </div>

      {/* ── Mobile: backdrop overlay ── */}
      <div
        className={[
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        style={{ background: "rgba(0,0,0,0.6)" }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Mobile: slide-in drawer ── */}
      <div
        className={[
          "fixed top-0 left-0 bottom-0 z-50 lg:hidden transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <AdminSidebar isMobile onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: "#F1F5F9" }}>

        {/* Mobile top bar */}
        <header
          className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3"
          style={{ background: "#0F172A", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/60 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors -ml-1.5"
            aria-label="Open navigation"
          >
            <MenuIcon />
          </button>

          <div className="flex items-center gap-2">
            <span
              className="h-6 w-6 rounded-lg flex items-center justify-center text-white font-black text-[0.6rem] shrink-0"
              style={{ background: "#C8102E" }}
            >
              PP
            </span>
            <span className="text-white text-sm font-bold tracking-wide">Admin Panel</span>
          </div>

          <button
            className="text-white/60 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors relative -mr-1.5"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full" style={{ background: "#C8102E" }} />
          </button>
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
