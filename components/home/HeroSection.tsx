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
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pt-4 sm:pt-8 lg:pt-10 pb-4 sm:pb-8 lg:pb-10 flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 lg:gap-10">

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
