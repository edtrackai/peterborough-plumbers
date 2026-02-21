"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { services } from "@/content/services";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Areas", href: "/areas" },
  { label: "Pricing", href: "/pricing" },
  { label: "Guides", href: "/guides" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

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
        "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
        scrolled
          ? "shadow-[0_2px_16px_rgba(0,0,0,0.10)] border-b border-gray-100"
          : "border-b border-gray-100"
      )}
    >
      {/* Emergency top bar */}
      <div className="bg-[var(--pp-navy)] text-white text-xs py-1.5 text-center hidden sm:block">
        <span className="text-white/70">24/7 Emergency Plumber — </span>
        <a
          href={`tel:${siteSettings.phoneHref}`}
          className="font-semibold text-white hover:text-[var(--brand)] transition-colors duration-200"
        >
          Call {siteSettings.phone}
        </a>
        <span className="mx-3 text-white/30">|</span>
        <Link
          href="/emergency"
          className="text-[var(--brand)] font-semibold hover:underline"
        >
          Emergency Service →
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile: burger + logo */}
        <div className="flex items-center gap-2 lg:hidden min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-pp-navy -ml-1 p-1.5 flex items-center justify-center"
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
          <Link
            href="/"
            className="text-lg font-bold text-pp-navy leading-none"
            onClick={() => setMobileOpen(false)}
          >
            {siteSettings.companyName}
          </Link>
        </div>

        {/* Desktop: left logo */}
        <Link
          href="/"
          className="hidden lg:flex items-center shrink-0 text-xl font-bold text-pp-navy leading-none"
        >
          {siteSettings.companyName}
        </Link>

        {/* Desktop: centered nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link
            href="/"
            className="whitespace-nowrap text-pp-navy hover:text-pp-teal transition-colors duration-200 font-medium text-sm leading-none"
          >
            Home
          </Link>

          {/* Services dropdown */}
          <div className="relative group">
            <Link
              href="/services"
              className="whitespace-nowrap text-pp-navy hover:text-pp-teal transition-colors duration-200 font-medium text-sm leading-none inline-flex items-center gap-1"
            >
              Services
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 min-w-[260px] border border-gray-100">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-2.5 text-pp-navy hover:bg-pp-grey hover:text-pp-teal transition-colors text-sm"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency — highlighted */}
          <Link
            href="/emergency"
            className="whitespace-nowrap text-[var(--brand)] hover:text-[var(--brand-hover)] transition-colors duration-200 font-semibold text-sm leading-none"
          >
            Emergency
          </Link>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-pp-navy hover:text-pp-teal transition-colors duration-200 font-medium text-sm leading-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: right CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${siteSettings.phoneHref}`}
            className="text-pp-navy font-semibold text-sm hover:text-pp-teal transition-colors duration-200"
          >
            {siteSettings.phone}
          </a>
          <Link
            href={siteSettings.primaryCtaHref}
            className="btn-book-now bg-pp-teal text-white px-5 py-2.5 rounded-full font-semibold text-sm leading-none hover:bg-pp-teal-dark transition-colors duration-200 inline-flex items-center"
          >
            {siteSettings.primaryCtaLabel}
          </Link>
        </div>

        {/* Mobile: Book Now pill */}
        <Link
          href={siteSettings.primaryCtaHref}
          className="lg:hidden btn-book-now bg-pp-teal text-white px-4 py-2 rounded-full font-semibold text-sm leading-none hover:bg-pp-teal-dark transition-colors duration-200"
        >
          {siteSettings.primaryCtaLabel}
        </Link>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-pp-navy hover:text-pp-teal transition-colors font-medium border-b border-gray-50"
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full py-3 text-pp-navy hover:text-pp-teal transition-colors font-medium border-b border-gray-50"
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
                <div className="pl-4 space-y-1 pb-2">
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-pp-navy/70 hover:text-pp-teal transition-colors text-sm"
                  >
                    All Services
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-pp-navy/70 hover:text-pp-teal transition-colors text-sm"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency — highlighted in mobile too */}
            <Link
              href="/emergency"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-[var(--brand)] font-semibold border-b border-gray-50"
            >
              🚨 Emergency Plumber
            </Link>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-pp-navy hover:text-pp-teal transition-colors font-medium border-b border-gray-50"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/faqs"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-pp-navy hover:text-pp-teal transition-colors font-medium border-b border-gray-50"
            >
              FAQs
            </Link>

            <a
              href={`tel:${siteSettings.phoneHref}`}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-pp-teal font-semibold transition-colors"
            >
              Call {siteSettings.phone}
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-green-600 hover:text-green-700 transition-colors font-medium"
            >
              WhatsApp Chat
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
