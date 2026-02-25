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
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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

function CheckCircleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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

function ChevronRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── Card guarantee items ──────────────────────────────────────────────────────

const cardGuarantees = [
  "Gas Safe Registered",
  "No call-out charge",
  "Fixed, upfront pricing",
] as const;

// ── Hero stats ────────────────────────────────────────────────────────────────

const heroStats = [
  { value: `${siteSettings.googleRating}★`, label: "Google Rating" },
  { value: `${siteSettings.reviewCount}+`, label: "5-Star Reviews" },
  { value: siteSettings.yearsExperience, label: "Years Established" },
  { value: siteSettings.engineersCount, label: "Local Engineers" },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden flex flex-col w-screen ml-[calc(50%_-_50vw)]"
      style={{ minHeight: "clamp(400px, 40vw, 660px)" }}
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
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-8 lg:pb-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

        {/* ── LEFT: headline + stats + CTAs ────────────────────────────────────── */}
        <div className="flex-1 lg:max-w-[58%]">

          {/* Live availability badge */}
          <div className="inline-flex items-center gap-2.5 mb-4">
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
            className="mt-3 text-white/65 leading-[1.65] max-w-[480px]"
            style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
          >
            Local Gas Safe engineers for boiler repairs, central heating, bathroom
            installations and emergency call-outs &mdash; honest prices, no hidden extras.
          </p>

          {/* ── Stats grid ───────────────────────────────────────────────────── */}
          <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 max-w-[380px] sm:max-w-none">
            {heroStats.map(({ value, label }, idx) => (
              <div
                key={label}
                className={[
                  "flex flex-col",
                  idx < heroStats.length - 1 ? "sm:pr-6 sm:mr-6 sm:border-r sm:border-white/[0.12]" : "",
                ].join(" ")}
              >
                <dt className="text-white font-black leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
                  {value}
                </dt>
                <dd className="text-white/45 text-[0.68rem] mt-1.5 font-semibold uppercase tracking-[0.12em]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          {/* ── CTA buttons ──────────────────────────────────────────────────── */}
          <div className="mt-5 flex flex-wrap gap-3">
            {/* Primary: Book */}
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
              className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
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
        </div>

        {/* ── RIGHT: floating action card ───────────────────────────────────── */}
        <div className="w-full sm:max-w-[380px] lg:w-[320px] xl:w-[350px] mx-auto lg:mx-0 shrink-0">
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              background: "rgba(8, 10, 18, 0.52)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 6px 20px rgba(0,0,0,0.30)",
            }}
          >
            {/* ── Card header ─────────────────────────────────────────────── */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)" }}
            >
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <PhoneIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white font-black text-[0.88rem] leading-tight">
                  Need a plumber today?
                </p>
                <p className="text-white/65 text-[0.72rem] mt-0.5">
                  Fast response &middot; No hidden fees
                </p>
              </div>
            </div>

            {/* ── Card body ───────────────────────────────────────────────── */}
            <div className="px-4 py-3 flex flex-col gap-2.5">

              {/* Review summary */}
              <div className="flex items-center gap-2 pb-2.5 border-b border-white/[0.10]">
                <div className="flex gap-0.5" aria-label={`${siteSettings.googleRating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">{siteSettings.googleRating}/5</span>
                <span className="text-xs text-white/40 mx-0.5">&middot;</span>
                <span className="text-xs text-white/55">{siteSettings.reviewCount}+ Google reviews</span>
              </div>

              {/* Phone CTA — prominent */}
              <a
                href={`tel:${siteSettings.phoneHref}`}
                className="flex items-center gap-3 w-full rounded-xl px-4 py-3 transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #C8102E 0%, #9e0d25 100%)",
                  boxShadow: "0 3px 14px rgba(200,16,46,0.32)",
                }}
              >
                <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <PhoneIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-[0.62rem] font-semibold uppercase tracking-widest">
                    Call free — no obligation
                  </p>
                  <p className="text-white font-black text-[0.95rem] leading-tight truncate">
                    {siteSettings.phone}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-3 font-semibold text-white text-[0.85rem] transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                style={{
                  background: "#25D366",
                  boxShadow: "0 3px 12px rgba(37,211,102,0.25)",
                }}
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span>WhatsApp Us</span>
                <span className="ml-auto text-white/65 text-xs font-normal">
                  Replies in minutes
                </span>
              </a>

              {/* Book online */}
              <Link
                href="/book"
                className="group flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 font-bold text-white/80 text-[0.85rem] border border-white/20 hover:border-[#C8102E] hover:text-[#C8102E] transition-all duration-150"
              >
                Book Online
                <ChevronRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Guarantee list */}
              <ul className="pt-2.5 border-t border-white/[0.10] flex flex-col gap-1.5 list-none">
                {cardGuarantees.map((g) => (
                  <li key={g} className="flex items-center gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-emerald-400" />
                    </span>
                    <span className="text-xs text-white/65 font-medium">{g}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

      </div>

      {/* ── BOTTOM TRUST PILL ────────────────────────────────────────────────── */}
      <div className="relative z-10 pb-5 sm:pb-7">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div
            className="bg-pp-navy rounded-2xl sm:rounded-full overflow-hidden border border-white/[0.10] py-4 px-5 sm:py-5 sm:px-8"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10)" }}
          >
            <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-4">

              {/* Google rating — full width on mobile */}
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
                      <StarIcon
                        key={i}
                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i <= Math.floor(Number(siteSettings.googleRating)) ? "text-amber-400" : "text-white/20"}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs">{siteSettings.reviewCount}+ reviews</span>
                </div>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Gas Safe */}
              <div className="col-span-2 order-last sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-pp-teal shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">Gas Safe Registered — No. {siteSettings.gasSafeNumber}</span>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Years */}
              <div className="order-2 sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 text-pp-teal shrink-0" />
                <span className="text-white text-xs sm:text-sm font-semibold">{siteSettings.yearsExperience} Years Established</span>
              </div>

              <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

              {/* Engineers */}
              <div className="order-3 sm:order-none flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-pp-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
