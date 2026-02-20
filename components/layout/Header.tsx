"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { services } from "@/content/services";
import { cn } from "@/lib/utils/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/95 backdrop-blur-lg shadow-[0_1px_8px_rgba(0,0,0,0.25)] border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Mobile: burger + logo */}
        <div className="flex items-center gap-2 lg:hidden min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white -ml-1 p-1.5 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <Link href="/" className="text-lg font-bold text-pp-yellow leading-none" onClick={() => setMobileOpen(false)}>
            {siteSettings.companyName}
          </Link>
        </div>

        {/* Desktop: left logo — equal-width column */}
        <Link href="/" className="hidden lg:flex items-center flex-1 text-xl font-bold text-pp-yellow leading-none">
          {siteSettings.companyName}
        </Link>

        {/* Desktop: centered nav */}
        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          <Link href="/" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            Home
          </Link>
          <div className="relative group">
            <Link
              href="/services"
              className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none inline-flex items-center gap-1"
            >
              Services
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-lg shadow-xl py-2 min-w-[260px]">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-2 text-pp-dark hover:bg-pp-yellow/10 hover:text-pp-accent transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            About
          </Link>
          <Link href="/areas" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            Areas
          </Link>
          <Link href="/reviews" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            Reviews
          </Link>
          <Link href="/blog" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            Blog
          </Link>
          <Link href="/contact" className="whitespace-nowrap text-white hover:text-pp-yellow transition-colors font-medium text-sm leading-none">
            Contact
          </Link>
        </nav>

        {/* CTAs — equal-width column, right-aligned */}
        <div className="flex items-center justify-end gap-2 lg:flex-1">
          <Link
            href={siteSettings.primaryCtaHref}
            className="btn-book-now bg-[#2563EB] text-white px-4 py-2 rounded-lg font-semibold text-sm leading-none hover:bg-[#1D4ED8] transition-colors inline-flex items-center h-9"
          >
            {siteSettings.primaryCtaLabel}
          </Link>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm leading-none hover:bg-green-700 transition-colors hidden sm:inline-flex items-center h-9"
          >
            {siteSettings.secondaryCtaLabel}
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md border-t border-white/10">
          <nav className="px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white hover:text-pp-yellow transition-colors font-medium"
            >
              Home
            </Link>
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full py-3 text-white hover:text-pp-yellow transition-colors font-medium"
              >
                Services
                <svg
                  className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-white/70 hover:text-pp-yellow transition-colors text-sm"
                  >
                    All Services
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-white/70 hover:text-pp-yellow transition-colors text-sm"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white hover:text-pp-yellow transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/reviews"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white hover:text-pp-yellow transition-colors font-medium"
            >
              Reviews
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white hover:text-pp-yellow transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-white hover:text-pp-yellow transition-colors font-medium"
            >
              Contact
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              WhatsApp Chat
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
