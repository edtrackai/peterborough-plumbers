"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { siteSettings } from "@/content/settings";

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
  services:  { title: "Our Services",       subtitle: "Expert plumbing & heating across Peterborough" },
  areas:     { title: "Areas We Cover",     subtitle: "Serving Peterborough & the PE postcode region" },
  blog:      { title: "News & Tips",        subtitle: "Expert advice from our Gas Safe engineers" },
  guides:    { title: "Plumbing Guides",    subtitle: "Step-by-step help from our local team" },
  emergency: { title: "Emergency Plumber",  subtitle: "24/7 rapid response — we're here when you need us" },
  pricing:   { title: "Our Pricing",        subtitle: "Transparent fixed prices, no hidden extras" },
  contact:   { title: "Contact Us",         subtitle: "Get a free quote or book online today" },
  faqs:      { title: "FAQs",              subtitle: "Answers to your most common questions" },
  reviews:   { title: "Customer Reviews",   subtitle: "Real feedback from Peterborough homeowners" },
  book:      { title: "Book a Plumber",     subtitle: "Schedule your appointment in minutes" },
  booking:   { title: "Your Booking",       subtitle: "Booking confirmation & details" },
  privacy:   { title: "Privacy Policy" },
  terms:     { title: "Terms & Conditions" },
  cookies:   { title: "Cookie Policy" },
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${filled ? "text-amber-400" : "text-white/20"}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

export default function PageHero() {
  const pathname = usePathname();
  const base = pathname.split("/").filter(Boolean)[0];

  // Skip on homepage and admin — they handle their own hero
  if (!base || base === "admin") return null;

  const meta = PAGE_META[base] ?? {
    title: "Peterborough Plumbers",
    subtitle: "Gas Safe registered engineers you can trust",
  };

  const googleRating = Number(siteSettings.googleRating);

  return (
    <section
      aria-label={meta.title}
      className="relative overflow-hidden flex flex-col w-screen ml-[calc(50%_-_50vw)]"
      style={{ minHeight: "clamp(200px, 22vw, 300px)" }}
    >

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/homepage/hero-team.png"
          alt=""
          fill
          className="object-cover object-center"
          quality={75}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 45%, rgba(8,10,20,0.65) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, transparent 100%)" }}
        />
      </div>

      {/* ── TITLE ── */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 flex items-center py-8 lg:py-12">
        <div>
          {/* Breadcrumb hint */}
          <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.18em] mb-3">
            Peterborough Plumbers
          </p>
          <h1
            className="text-white font-black leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(24px, 3.2vw, 46px)" }}
          >
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="mt-2 text-white/55 max-w-[480px]" style={{ fontSize: "clamp(13px, 1vw, 15px)" }}>
              {meta.subtitle}
            </p>
          )}
          {/* Red accent bar */}
          <div className="mt-4 h-[3px] w-14 rounded-full" style={{ background: "#C8102E" }} />
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <div className="relative z-10 pb-5 sm:pb-7">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div
            className="bg-pp-navy rounded-2xl sm:rounded-full overflow-hidden border border-white/[0.10] py-4 px-5 sm:py-5 sm:px-8"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)" }}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4">

              {/* Google rating */}
              <div className="col-span-2 flex items-center justify-center gap-2.5">
                <svg className="h-4 sm:h-5 w-auto" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                  <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4" />
                  <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335" />
                  <path d="M38.17 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05" />
                  <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3-2.9 0-5.56 2.55-5.56 5.83 0 3.26 2.66 5.79 5.56 5.79 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.54 3.1-3.54 1.74 0 3.1 1.5 3.1 3.54 0 2.03-1.36 3.52-3.1 3.52z" fill="#4285F4" />
                  <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
                  <path d="M66.89 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335" />
                </svg>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-base sm:text-lg leading-none">{siteSettings.googleRating}</span>
                  <div className="flex gap-0.5" aria-label={`${siteSettings.googleRating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} filled={i <= Math.floor(googleRating)} />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">{siteSettings.reviewCount}+ reviews</span>
                </div>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Gas Safe */}
              <div className="col-span-2 order-last sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-semibold">Gas Safe Registered — No. {siteSettings.gasSafeNumber}</span>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Years */}
              <div className="order-2 sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-[#C8102E] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-semibold">{siteSettings.yearsExperience} Years Established</span>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Engineers */}
              <div className="order-3 sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-semibold">{siteSettings.engineersCount} Engineers</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── WAVE ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(36px, 4vw, 60px)" }}
        >
          <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
