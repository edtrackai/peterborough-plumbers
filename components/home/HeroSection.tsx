/**
 * HeroSection — Immersive full-height hero
 *
 * Desktop : headline + stats (left 56%) + floating action card (right 44%)
 * Mobile  : badge → headline → CTAs → action card stacked
 *
 * Background: hero-team.png under layered dark gradient overlay
 * Bottom: frosted-glass trust strip
 */

import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/content/settings";

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}


function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}


// ── Card guarantee items ──────────────────────────────────────────────────────

const cardGuarantees = [
  "Gas Safe Registered",
  "No call-out charge",
  "Fixed, upfront pricing",
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden flex flex-col w-screen ml-[calc(50%_-_50vw)] min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]"
    >

      {/* ── BACKGROUND LAYER ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/homepage/hero-team.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={92}
          sizes="100vw"
        />

        {/* Primary overlay: deep charcoal-to-transparent, heaviest on left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)",
          }}
        />

        {/* Bottom vignette — anchors content to the trust strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-44"
          style={{
            background:
              "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)",
          }}
        />

        {/* Subtle red accent glow — top-right quadrant (brand energy) */}
        <div
          className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #C8102E 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pt-4 sm:pt-8 lg:pt-10 pb-16 sm:pb-20 lg:pb-24 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 lg:gap-10">

        {/* ── LEFT: headline + stats + CTAs ────────────────────────────────────── */}
        <div className="flex-1 lg:max-w-[58%]">

          {/* Live availability badge */}
          <div className="inline-flex items-center gap-2.5 mb-2 sm:mb-4">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.75rem] font-bold tracking-[0.18em] uppercase">
              Available Today &mdash; Peterborough &amp; Surrounding Areas
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-white font-black leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            Peterborough&apos;s
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Most Trusted
            </span>
            <br />
            Plumbers
          </h1>

          {/* Subtext */}
          <p
            className="mt-3 hidden sm:block text-white/65 leading-[1.65] max-w-[480px]"
            style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
          >
            Local Gas Safe engineers for boiler repairs, central heating, bathroom
            installations and emergency call-outs &mdash; honest prices, no hidden extras.
          </p>


          {/* ── CTA buttons ──────────────────────────────────────────────────── */}
          <div className="mt-3 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            {/* Primary: Book */}
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-[44px] sm:h-[52px] px-6 sm:px-8 rounded-full text-white font-bold text-[0.85rem] sm:text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
                boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)",
              }}
            >
              Book a Plumber
            </Link>

            {/* Secondary: Call */}
            <a
              href={`tel:${siteSettings.phoneHref}`}
              aria-label={`Call us on ${siteSettings.phone}`}
              className="inline-flex items-center justify-center gap-2.5 h-[44px] sm:h-[52px] px-5 sm:px-7 rounded-full text-white font-bold text-[0.85rem] sm:text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {siteSettings.phone}
            </a>
          </div>

          {/* Inline promise chips — desktop only */}
          <ul className="mt-3 hidden sm:flex flex-wrap gap-x-4 gap-y-1.5 list-none">
            {cardGuarantees.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-white/55 text-sm">
                <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-400/70 shrink-0" />
                {p}
              </li>
            ))}
          </ul>

          {/* ── Mobile trust strip ── visible below sm only */}
          <div
            className="mt-4 sm:hidden flex gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: "none" }}
            aria-label="Trust signals"
          >
            {/* Gas Safe */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              Gas Safe Reg.
            </span>

            {/* Google rating */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-yellow-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.84L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {siteSettings.googleRating} Google
            </span>

            {/* No call-out fee */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No call-out fee
            </span>

            {/* Fixed pricing */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Fixed pricing
            </span>

            {/* 30+ years */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-brand shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              {siteSettings.yearsExperience} yrs established
            </span>
          </div>
        </div>


      </div>


      {/* ── BOTTOM TRUST PILL ────────────────────────────────────────────────── */}
      <div className="relative z-10 pb-5 sm:pb-7 hidden sm:block">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div
            className="bg-pp-navy rounded-2xl sm:rounded-full overflow-hidden border border-white/[0.10] py-4 px-5 sm:py-5 sm:px-8"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)" }}
          >
            <div className="sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">

              {/* Google rating */}
              <div className="flex items-center justify-center gap-2.5">
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
                      <StarIcon key={i} className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i <= Math.floor(Number(siteSettings.googleRating)) ? "text-amber-400" : "text-white/20"}`} />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">{siteSettings.reviewCount}+ reviews</span>
                </div>
              </div>

              <div className="h-5 w-px bg-white/20" aria-hidden />

              {/* Gas Safe */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">Gas Safe Registered — No. {siteSettings.gasSafeNumber}</span>
              </div>

              <div className="h-5 w-px bg-white/20" aria-hidden />

              {/* Years */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">{siteSettings.yearsExperience}+ Years Established</span>
              </div>

              <div className="h-5 w-px bg-white/20" aria-hidden />

              {/* Engineers */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-xs sm:text-sm font-semibold">{siteSettings.engineersCount} Engineers</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── CURVED BOTTOM WAVE ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}
        >
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
