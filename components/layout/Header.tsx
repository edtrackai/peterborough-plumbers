"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { services } from "@/content/services";
import { cn } from "@/lib/utils/cn";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── ROW 1: White top bar ─────────────────────────────────────────── */}
      <div className="bg-[#EDEDED] lg:bg-white overflow-visible border-b border-black/[0.06] lg:border-0">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between gap-4 overflow-visible">

          {/* Mobile: burger + logo */}
          <div className="flex items-center gap-3 lg:hidden min-w-0">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="shrink-0 text-[#242424] p-1"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
              <Image
                src="/logos/logo-mark.png"
                alt=""
                width={56}
                height={56}
                className="h-[56px] w-[56px] object-contain shrink-0"
                priority
                aria-hidden
              />
              <Image
                src="/logos/logo-text.png"
                alt="Peterborough Plumbers"
                width={140}
                height={56}
                className="h-[56px] w-auto object-contain shrink-0 -ml-[14px]"
                priority
              />
            </Link>
          </div>

          {/* Desktop: logo — shield mark + text side by side */}
          <Link href="/" className="hidden lg:flex items-center shrink-0 relative z-10">
            <Image
              src="/logos/logo-mark.png"
              alt=""
              width={116}
              height={116}
              className="h-[116px] w-[116px] object-contain shrink-0"
              priority
              aria-hidden
            />
            <Image
              src="/logos/logo-text.png"
              alt="Peterborough Plumbers"
              width={290}
              height={116}
              className="h-[116px] w-auto object-contain shrink-0 -ml-[28px]"
              priority
            />
          </Link>

          {/* Desktop: right CTAs */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="text-[#242424] font-semibold text-sm hover:text-[#C8102E] transition-colors duration-200 whitespace-nowrap"
            >
              {siteSettings.phone}
            </a>
            <Link
              href="/emergency"
              className="inline-flex items-center bg-[#C8102E] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#a50d26] transition-colors duration-200 whitespace-nowrap"
            >
              Emergency Call-Out
            </Link>
            <Link
              href={siteSettings.primaryCtaHref}
              className="inline-flex items-center border-2 border-[#C8102E] text-[#C8102E] px-5 py-[9px] rounded-full font-bold text-sm hover:bg-[#C8102E] hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              {siteSettings.primaryCtaLabel}
            </Link>
          </div>

          {/* Mobile: Book Now pill */}
          <Link
            href={siteSettings.primaryCtaHref}
            className="lg:hidden shrink-0 bg-[#C8102E] text-white px-4 py-2 rounded-full font-bold text-sm"
          >
            Book Now
          </Link>

        </div>
      </div>

      {/* ── ROW 2: Red nav bar (desktop only) ───────────────────────────── */}
      <div className="hidden lg:block bg-white">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 flex items-stretch justify-between bg-[#C8102E]">

          {/* Nav links */}
          <nav className="flex items-stretch" aria-label="Main navigation">

            {/* Home icon link */}
            <Link
              href="/"
              className="flex items-center justify-center px-4 h-10 text-white hover:bg-white/10 transition-colors duration-150 border-r border-white/20"
              aria-label="Home"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>

            {/* Services dropdown */}
            <div className="relative group">
              <Link
                href="/services"
                className="flex items-center gap-1 px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap"
              >
                Services
                <svg className="h-3 w-3 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {/* Dropdown panel */}
              <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pt-0">
                <div className="bg-white rounded-b-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] py-2 min-w-[260px] border-x border-b border-gray-100">
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
                </div>
              </div>
            </div>

            <Link href="/emergency" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              Emergency
            </Link>
            <Link href="/areas" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              Areas
            </Link>
            <Link href="/pricing" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              Pricing
            </Link>
            <Link href="/guides" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              Guides
            </Link>
            <Link href="/faqs" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              FAQs
            </Link>
            <Link href="/contact" className="flex items-center px-4 h-10 text-white text-[12px] font-bold uppercase tracking-wide hover:bg-white/10 transition-colors duration-150 whitespace-nowrap">
              Contact Us
            </Link>
          </nav>

          {/* Right: search bar */}
          <form role="search" action="/guides" method="get" className="flex items-center">
            <div className="flex items-center bg-white rounded overflow-hidden h-8">
              <input
                type="search"
                name="q"
                placeholder="Search"
                aria-label="Search site"
                className="h-full px-3 text-[13px] text-[#242424] placeholder-[#9ca3af] bg-transparent outline-none w-36 lg:w-44"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="h-full px-2.5 bg-white text-[#6b7280] hover:text-[#C8102E] transition-colors duration-150 border-l border-gray-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-y-auto max-h-[calc(100dvh-64px)]">
          <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">

            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              Home
            </Link>

            {/* Services accordion */}
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
                </div>
              )}
            </div>

            <Link href="/emergency" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-3 text-[#C8102E] font-bold border-b border-gray-100 text-sm">
              <span className="h-2 w-2 rounded-full bg-[#C8102E] animate-pulse shrink-0" aria-hidden />
              Emergency Plumber
            </Link>
            <Link href="/areas" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              Areas
            </Link>
            <Link href="/pricing" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              Pricing
            </Link>
            <Link href="/guides" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              Guides
            </Link>
            <Link href="/faqs" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              FAQs
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 text-[#242424] hover:text-[#C8102E] font-medium border-b border-gray-100 text-sm">
              Contact Us
            </Link>

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={`tel:${siteSettings.phoneHref}`}
                className="flex items-center justify-center gap-2 bg-[#C8102E] text-white py-3 rounded-full font-bold text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                Call {siteSettings.phone}
              </a>
              <a
                href={getWhatsAppUrl()}
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
