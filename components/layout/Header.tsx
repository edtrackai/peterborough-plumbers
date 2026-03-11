"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";
import { services } from "@/content/services";
import { cn } from "@/lib/utils/cn";

// ── Desktop nav link ───────────────────────────────────────────────────────────
const NAV_LINK =
  "relative flex items-center px-4 h-full " +
  "text-white text-[12.5px] font-bold uppercase tracking-wide whitespace-nowrap " +
  "after:content-[''] after:absolute after:bottom-[6px] after:left-4 after:right-4 " +
  "after:h-[2px] after:bg-white after:rounded-full " +
  "after:origin-center after:scale-x-0 " +
  "after:transition-transform after:duration-200 after:ease-out " +
  "hover:after:scale-x-100 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset";

export default function Header() {
  const pathname = usePathname();
  const s = useSettings();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape key + focus trap
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const getFocusable = () =>
      Array.from(drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ));

    // Move focus into drawer on open
    getFocusable()[0]?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ═══════════════════════════════════════════════════════════════════
          ROW 1 — Logo LEFT · Phone + CTAs RIGHT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#EDEDED] lg:bg-white overflow-visible border-b border-black/[0.06] lg:border-0">
        <div className="mx-auto max-w-[1280px] px-1 sm:px-6 lg:px-10 flex items-center justify-between gap-2 lg:gap-6 overflow-visible h-20 lg:h-28">

          {/* ── Mobile: burger + logo ── */}
          <div className="flex items-center gap-0 lg:hidden min-w-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="shrink-0 text-[#242424] p-2.5 -ml-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-1"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href="/" onClick={() => setMobileOpen(false)} className="shrink-0 flex items-center">
              <Image src="/logos/logo-mark.webp" alt="" width={70} height={70}
                className="h-[70px] w-[70px] object-contain shrink-0" priority aria-hidden />
              <Image src="/logos/logo-text.webp" alt="Peterborough Plumbers" width={100} height={100}
                className="h-[100px] w-[100px] object-contain shrink-0 -ml-[14px]" priority />
            </Link>
          </div>

          {/* ── Desktop: logo — LEFT (same size on all pages) ── */}
          <Link href="/" className="hidden lg:flex items-center shrink-0 relative z-10">
            <Image src="/logos/logo-mark.webp" alt="" width={104} height={104}
              className="h-[104px] w-[104px] object-contain shrink-0" priority aria-hidden />
            <Image src="/logos/logo-text.webp" alt="Peterborough Plumbers" width={260} height={104}
              className="h-[104px] w-auto object-contain shrink-0 -ml-[24px]" priority />
          </Link>

          {/* ── Desktop: CTAs — RIGHT ── */}
          {isHome ? (
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Phone with icon */}
              <a href={`tel:${s.phoneHref}`} className="flex items-center gap-2.5 group">
                <span className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200" style={{ background: "#FEE2E2" }}>
                  <svg className="h-5 w-5" style={{ color: "#C8102E" }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.65rem] font-semibold text-[#9CA3AF] uppercase tracking-wider leading-none mb-0.5">Call Us Now</p>
                  <p className="font-black text-[1.1rem] leading-none whitespace-nowrap transition-colors duration-200 group-hover:text-[#C8102E]" style={{ color: "#242424" }}>
                    {s.phone}
                  </p>
                </div>
              </a>
              <div className="h-10 w-px bg-gray-200 shrink-0" />
              <Link href="/emergency" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#C8102E] to-[#9a0c22] text-white px-6 h-[50px] rounded-full font-bold text-[0.88rem] hover:from-[#a50d26] hover:to-[#7d0919] hover:-translate-y-px active:translate-y-0 transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2"
                style={{ boxShadow: "0 4px 14px rgba(200,16,46,0.35), 0 1px 3px rgba(0,0,0,0.14)", border: "1px solid #8a0b1e" }}>
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Emergency Call-Out
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-[#C8102E] px-6 h-[50px] rounded-full font-bold text-[0.88rem] hover:bg-[#C8102E] hover:text-white hover:-translate-y-px active:translate-y-0 transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "2px solid #C8102E" }}>
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Contact Us
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a href={`tel:${s.phoneHref}`}
                className="font-bold text-[0.95rem] text-[#242424] hover:text-[#C8102E] transition-colors duration-150 whitespace-nowrap">
                {s.phone}
              </a>
              <div className="h-6 w-px bg-gray-200 shrink-0" />
              <Link href="/emergency" className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-br from-[#C8102E] to-[#9a0c22] text-white px-5 h-[42px] rounded-full font-bold text-[0.85rem] hover:from-[#a50d26] hover:to-[#7d0919] transition-all duration-150 whitespace-nowrap"
                style={{ boxShadow: "0 3px 10px rgba(200,16,46,0.30)", border: "1px solid #8a0b1e" }}>
                Emergency
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center bg-white text-[#C8102E] px-5 h-[42px] rounded-full font-bold text-[0.85rem] hover:bg-[#C8102E] hover:text-white transition-all duration-150 whitespace-nowrap"
                style={{ border: "2px solid #C8102E" }}>
                Contact Us
              </Link>
            </div>
          )}

          {/* ── Mobile: Contact Us pill ── */}
          <Link
            href="/contact"
            className="lg:hidden shrink-0 bg-[#C8102E] text-white px-3 py-2 rounded-full font-bold text-xs"
          >
            Contact Us
          </Link>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ROW 2 — full-width red nav bar (desktop only)
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block">
        <div
          className="h-12 flex items-stretch"
          style={{
            background: "linear-gradient(160deg, #C8102E 0%, #a50d26 100%)",
            boxShadow: "0 4px 20px rgba(200,16,46,0.28), 0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-10 flex items-stretch">

            {/* Nav links */}
            <nav className="flex items-stretch" aria-label="Main navigation">

              {/* Home icon */}
              <Link
                href="/"
                aria-label="Home"
                className={
                  "relative flex items-center justify-center pl-5 pr-4 h-full text-white " +
                  "after:content-[''] after:absolute after:bottom-[6px] after:left-4 after:right-3 " +
                  "after:h-[2px] after:bg-white after:rounded-full " +
                  "after:origin-center after:scale-x-0 " +
                  "after:transition-transform after:duration-200 after:ease-out " +
                  "hover:after:scale-x-100 " +
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-inset"
                }
              >
                <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </Link>

              {/* Services dropdown */}
              <div className="relative group">
                <Link href="/services" className={cn(NAV_LINK, "gap-1")}>
                  Services
                  <svg className="h-3 w-3 mt-px shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 pt-2">
                  <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] py-2 min-w-[260px] border border-gray-100">
                    <Link
                      href="/services"
                      className="block px-4 py-2.5 text-[#6b7280] hover:bg-[#F5F7FA] hover:text-[#C8102E] transition-colors text-[13px] font-semibold border-b border-gray-100 mb-1"
                    >
                      All Services →
                    </Link>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-4 py-2.5 text-[#242424] hover:bg-[#F5F7FA] hover:text-[#C8102E] transition-colors text-[13px]"
                      >
                        {s.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/landlords"
                        className="block px-4 py-2.5 text-[#C8102E] hover:bg-red-50 transition-colors text-[13px] font-semibold"
                      >
                        🏠 Landlord Services Hub
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/emergency" className={NAV_LINK}>Emergency</Link>
              <Link href="/areas"     className={NAV_LINK}>Areas</Link>
              <Link href="/pricing"   className={NAV_LINK}>Pricing</Link>
              <Link href="/guides"    className={NAV_LINK}>Guides</Link>
              <Link href="/faqs"      className={NAV_LINK}>FAQs</Link>
              <Link href="/contact"   className={NAV_LINK}>Contact Us</Link>

            </nav>

            {/* Search */}
            <form role="search" action="/guides" method="get" className="flex items-center ml-auto pr-3">
              <div
                className={[
                  "flex items-center h-[30px] rounded-full",
                  "bg-white/[0.12] border border-white/30",
                  "hover:bg-white/[0.20]",
                  "focus-within:bg-white/[0.22] focus-within:border-white/55",
                  "transition-all duration-200",
                ].join(" ")}
              >
                <input
                  type="search"
                  name="q"
                  placeholder="Search"
                  aria-label="Search site"
                  className="h-full pl-3 pr-1 text-[12.5px] text-white placeholder-white/60 bg-transparent outline-none w-28 lg:w-36"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="h-full px-2.5 text-white/70 hover:text-white transition-colors duration-150 border-l border-white/25 rounded-r-full focus-visible:outline-none"
                >
                  <svg className="h-[13px] w-[13px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div id="mobile-nav" ref={drawerRef} className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-y-auto max-h-[calc(100dvh-80px)]">
          <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">

            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Home
            </Link>

            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm"
              >
                Services
                <svg className={cn("h-4 w-4 transition-transform duration-200", servicesOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 pb-2 border-b border-gray-100 space-y-0.5">
                  <Link href="/services" onClick={() => setMobileOpen(false)} className="block py-2 text-[#242424]/60 hover:text-[#C8102E] text-sm font-semibold">
                    All Services →
                  </Link>
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="block py-2 text-[#242424]/70 hover:text-[#C8102E] text-sm">
                      {s.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link href="/landlords" onClick={() => setMobileOpen(false)} className="block py-2 text-[#C8102E] hover:text-[#a50d26] text-sm font-semibold">
                      🏠 Landlord Services Hub
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/emergency" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-3 text-[#C8102E] font-bold border-b border-gray-100 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#C8102E] animate-pulse shrink-0" aria-hidden />
              Emergency Plumber
            </Link>
            <Link href="/areas"    onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">Areas</Link>
            <Link href="/pricing"  onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">Pricing</Link>
            <Link href="/guides"   onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">Guides</Link>
            <Link href="/faqs"     onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">FAQs</Link>
            <Link href="/contact"  onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">Contact Us</Link>

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={`tel:${s.phoneHref}`}
                className="flex items-center justify-center gap-2 bg-[#C8102E] text-white py-3 rounded-full font-bold text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                Call {s.phone}
              </a>
              <a
                href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappPrefillMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 py-3 rounded-full font-bold text-sm hover:bg-green-600 hover:text-white transition-colors duration-200"
              >
                WhatsApp Chat
              </a>
            </div>

          </nav>
        </div>
      )}

    </header>
  );
}
