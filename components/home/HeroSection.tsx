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
import { getSiteSettings } from "@/lib/db/content";
import { BookNowButton } from "@/components/booking/BookNowButton";

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
  "Qualified engineers",
  "Transparent call-out fees",
  "Clear upfront quotes",
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default async function HeroSection() {
  const s = await getSiteSettings();
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden flex flex-col w-screen ml-[calc(50%_-_50vw)] min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]"
    >

      {/* ── BACKGROUND LAYER ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/homepage/hero-team.webp"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "50% 15%" }}
          priority
          fetchPriority="high"
          quality={85}
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
            Peterborough
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Plumbing &amp; Heating
            </span>
            <br />
            Engineers
          </h1>

          {/* Subtext */}
          <p
            className="mt-3 hidden sm:block text-white/65 leading-[1.65] max-w-[480px]"
            style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
          >
            Local plumbing and heating engineers for boiler repairs, central heating, bathroom
            installations and emergency call-outs &mdash; clear upfront quotes, no hidden extras.
          </p>


          {/* ── CTA buttons ──────────────────────────────────────────────────── */}
          <div className="mt-3 sm:mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            {/* Primary: Book — opens SimpleBookingModal */}
            <BookNowButton
              className="inline-flex items-center justify-center h-[44px] sm:h-[52px] px-6 sm:px-8 rounded-full text-white font-bold text-[0.85rem] sm:text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
                boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)",
              }}
            >
              Book a Plumber
            </BookNowButton>

            {/* Secondary: Call */}
            <a
              href={`tel:${s.phoneHref}`}
              aria-label={`Call us on ${s.phone}`}
              className="inline-flex items-center justify-center gap-2.5 h-[44px] sm:h-[52px] px-5 sm:px-7 rounded-full text-white font-bold text-[0.85rem] sm:text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {s.phone}
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
            {/* Google rating */}
            <li className="flex items-center gap-1.5 text-white/55 text-sm">
              <span className="flex items-center gap-0.5" aria-label={`Rated ${s.googleRating} out of 5 on Google`}>
                {[1,2,3,4,5].map((i) => (
                  <StarIcon key={i} className={`h-3 w-3 ${i <= Math.round(Number(s.googleRating)) ? "text-yellow-400" : "text-white/20"}`} />
                ))}
              </span>
              {s.googleRating} · {s.reviewCount} Google reviews
            </li>
          </ul>

          {/* ── Mobile trust strip ── visible below sm only */}
          <div
            className="mt-4 sm:hidden flex gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: "none" }}
            aria-label="Trust signals"
          >
            {/* Qualified engineers */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Qualified engineers
            </span>

            {/* Experience */}
            {s.yearsExperience && (
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
                <svg className="h-3 w-3 text-brand shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                {s.yearsExperience} Years Experience
              </span>
            )}

            {/* Fully insured */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Fully insured
            </span>

            {/* Transparent call-out fees */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Transparent call-out fees
            </span>

            {/* Clear upfront quotes */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <svg className="h-3 w-3 text-brand shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              Clear upfront quotes
            </span>

            {/* Google rating — mobile */}
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/[0.08] backdrop-blur-md px-3 py-1.5 text-white/85 text-[0.7rem] font-semibold leading-none">
              <StarIcon className="h-3 w-3 text-yellow-400 shrink-0" />
              {s.googleRating}/5 · {s.reviewCount} reviews
            </span>
          </div>
        </div>


      </div>


      {/* ── BOTTOM TRUST STRIP + CURVED EDGE ────────────────────────────────── */}

      {/* Glassmorphism trust bar — desktop/tablet only */}
      <div className="relative z-10 hidden sm:block">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 pb-5 sm:pb-7">
          <div
            className="rounded-2xl sm:rounded-full border border-white/20 backdrop-blur-md py-4 px-5 sm:py-5 sm:px-8"
            style={{ background: "rgba(255,255,255,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.10)" }}
          >
          <div className="flex flex-wrap items-center justify-center gap-x-10">

            {/* Experience */}
            {s.yearsExperience && (
              <>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
                  <span className="text-white text-xs sm:text-sm font-semibold">{s.yearsExperience} Years Experience</span>
                </div>
                <div className="h-5 w-px bg-white/20" aria-hidden />
              </>
            )}

            {/* Qualified engineers */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
              <span className="text-white text-xs sm:text-sm font-semibold">Qualified engineers</span>
            </div>

            <div className="h-5 w-px bg-white/20" aria-hidden />

            {/* Fully insured */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" />
              <span className="text-white text-xs sm:text-sm font-semibold">Fully insured</span>
            </div>

            <div className="h-5 w-px bg-white/20" aria-hidden />

            {/* Serving Peterborough */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white text-xs sm:text-sm font-semibold">Peterborough &amp; surrounding areas</span>
            </div>

            <div className="h-5 w-px bg-white/20" aria-hidden />

            {/* Google rating */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-0.5" aria-label={`Rated ${s.googleRating} out of 5 on Google`}>
                {[1,2,3,4,5].map((i) => (
                  <StarIcon key={i} className={`h-3.5 w-3.5 ${i <= Math.round(Number(s.googleRating)) ? "text-yellow-400" : "text-white/20"}`} />
                ))}
              </span>
              <span className="text-white text-xs sm:text-sm font-semibold">{s.googleRating}/5 · {s.reviewCount} reviews</span>
            </div>

          </div>
          </div>
        </div>
      </div>

      {/* Curved bottom wave — always visible, flush at section bottom */}
      <div className="relative z-10" aria-hidden="true" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(36px, 5.5vw, 80px)" }}
        >
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
