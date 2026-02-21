import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getFeaturedReviews } from "@/content/reviews";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";
import { guides } from "@/content/guides";
import { areas } from "@/content/areas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Peterborough Plumbers | Local Gas Safe Plumbing & Heating",
  description:
    "Peterborough's trusted plumbers with 30+ years experience. Gas Safe registered engineers for boiler service, heating, bathrooms, and emergency plumbing.",
  path: "/",
  absoluteTitle: true,
  image: "/images/homepage/hero.png",
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ rating, className = "h-4 w-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${className} ${i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ── Service card data ─────────────────────────────────────────────────────────

const helpCards = [
  {
    href: "/emergency",
    cta: "Get Emergency Help",
    title: "Emergency Plumber",
    desc: "24/7 rapid response for burst pipes, flooding, and heating failures. We aim to arrive within 1–2 hours.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  {
    href: "/services/boiler-service",
    cta: "Book a Service",
    title: "Boiler Service & Repair",
    desc: "Annual boiler servicing from £79. All major brands, Gas Safe registered engineers, written certificate included.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    href: "/pricing",
    cta: "View Pricing",
    title: "Gas Safety Certificates",
    desc: "CP12 gas safety checks from £65. Fast turnaround, legally compliant certificates for landlords and homeowners.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/services",
    cta: "View All Services",
    title: "Plumbing & Drain Repairs",
    desc: "Blocked drains, leaking pipes, bathroom installations, and all general plumbing across Peterborough.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const onlineFeatures = [
  "Request a quote in minutes — no waiting on hold",
  "Choose your preferred appointment date and time",
  "Send photos or a short video of the issue",
  "Receive confirmation and engineer updates by text",
];

const bookingSteps = [
  { label: "Describe your issue", detail: "Tell us what's happened in a few words" },
  { label: "Choose a time", detail: "Pick a slot that works for you" },
  { label: "We confirm", detail: "You'll get a text with your engineer's details" },
  { label: "Job done", detail: "We arrive on time and clean up after ourselves" },
];

const featuredGuideSlugs = [
  "how-much-does-a-boiler-service-cost",
  "what-to-do-burst-pipe",
  "how-to-bleed-a-radiator",
  "signs-boiler-needs-replacing",
];

export default function HomePage() {
  const featuredReviews = getFeaturedReviews().slice(0, 3);
  const featuredGuides = guides.filter((g) => featuredGuideSlugs.includes(g.slug));

  return (
    <>
      {/* ── A) HERO — Split layout ─────────────────────────────────────────── */}
      <section className="bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[560px] lg:min-h-[640px]">
            {/* Left: text */}
            <div className="flex flex-col justify-center py-14 lg:py-20 pr-0 lg:pr-12">
              {/* Emergency badge */}
              <div className="mb-6">
                <Link
                  href="/emergency"
                  className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-[var(--brand)] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-red-100 transition-colors duration-200"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--brand)] animate-pulse" />
                  24/7 Emergency Call-Out Available
                </Link>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-pp-heading leading-tight mb-5">
                Peterborough&apos;s Trusted Plumber &amp; Heating Engineers
              </h1>

              <p className="text-lg text-[var(--muted)] leading-relaxed mb-8 max-w-lg">
                Gas Safe registered engineers delivering expert plumbing, boiler servicing, and
                heating solutions across Peterborough and surrounding areas for over 30 years.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/book"
                  className="btn-book-now inline-flex items-center gap-2 bg-pp-teal text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-pp-teal-dark transition-colors duration-200 shadow-md"
                >
                  Book Online
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={`tel:${siteSettings.phoneHref}`}
                  className="inline-flex items-center gap-2 bg-white border-2 border-pp-heading text-pp-heading px-7 py-3.5 rounded-full font-bold text-base hover:bg-pp-heading hover:text-white transition-colors duration-200"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteSettings.phone}
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-pp-teal shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-pp-heading">Gas Safe Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stars rating={Math.floor(Number(siteSettings.googleRating))} className="h-4 w-4" />
                  <span className="text-sm font-semibold text-pp-heading">
                    {siteSettings.googleRating} Google Rating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-pp-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-pp-heading">{siteSettings.yearsExperience} Years Experience</span>
                </div>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="relative min-h-[320px] lg:min-h-0 lg:-mr-8 order-first lg:order-last">
              <Image
                src="/images/homepage/hero.png"
                alt="Professional Gas Safe registered plumber at work in a Peterborough home"
                fill
                className="object-cover object-[70%_center] lg:object-center"
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Price badge overlay */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-5 py-3.5 border border-gray-100">
                <p className="text-xs text-[var(--muted)] font-medium mb-0.5">Boiler Service</p>
                <p className="text-2xl font-bold text-[var(--brand)]">From £79</p>
                <p className="text-xs text-[var(--muted)]">Gas Safe certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── B) TRUST STRIP ───────────────────────────────────────────────────── */}
      <section className="bg-pp-navy py-5">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {/* Google rating */}
            <div className="flex items-center gap-2.5">
              <svg className="h-5 w-auto" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4" />
                <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335" />
                <path d="M38.17 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05" />
                <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3-2.9 0-5.56 2.55-5.56 5.83 0 3.26 2.66 5.79 5.56 5.79 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.54 3.1-3.54 1.74 0 3.1 1.5 3.1 3.54 0 2.03-1.36 3.52-3.1 3.52z" fill="#4285F4" />
                <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
                <path d="M66.89 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335" />
              </svg>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold text-lg leading-none">{siteSettings.googleRating}</span>
                <Stars rating={Math.floor(Number(siteSettings.googleRating))} className="h-3.5 w-3.5" />
                <span className="text-white/60 text-xs">{siteSettings.reviewCount}+ reviews</span>
              </div>
            </div>

            <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-pp-teal shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-semibold">Gas Safe Registered — No. {siteSettings.gasSafeNumber}</span>
            </div>

            <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-pp-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-semibold">{siteSettings.yearsExperience} Years Established</span>
            </div>

            <div className="h-5 w-px bg-white/20 hidden sm:block" aria-hidden />

            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-pp-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white text-sm font-semibold">{siteSettings.engineersCount} Engineers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── C) HOW CAN WE HELP YOU? — 4 service cards ───────────────────────── */}
      <section className="bg-[var(--surface-alt)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading mb-3">
              How can we help you today?
            </h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              From emergency call-outs to planned installations — Gas Safe registered engineers ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {helpCards.map((card) => (
              <div
                key={card.href}
                className="group bg-white rounded-xl border border-[var(--border)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
              >
                <div className="text-pp-teal mb-4">{card.icon}</div>
                <h3 className="text-lg font-bold text-pp-heading mb-2 group-hover:text-pp-teal transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 flex-1">{card.desc}</p>
                <Link
                  href={card.href}
                  className="inline-flex items-center justify-center gap-2 border-2 border-pp-teal text-pp-teal px-4 py-2.5 rounded-full text-sm font-bold hover:bg-pp-teal hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pp-teal focus:ring-offset-2"
                >
                  {card.cta}
                  <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── D) MANAGE ONLINE 24/7 ────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-y border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pp-teal mb-3">
                Quick &amp; Easy
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading mb-5">
                Book &amp; manage your visit online
              </h2>
              <p className="text-[var(--muted)] mb-8 leading-relaxed">
                No waiting on hold. Use our online booking to request a visit, pick your
                preferred time slot, and track your engineer — all from your phone or laptop.
              </p>
              <ul className="space-y-4 mb-10">
                {onlineFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-pp-teal text-white flex items-center justify-center">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[var(--text)] text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="btn-book-now inline-flex items-center gap-2 bg-pp-teal text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-pp-teal-dark transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-pp-teal focus:ring-offset-2"
                >
                  Book Online Now
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 px-7 py-3.5 rounded-full font-bold text-sm hover:bg-green-600 hover:text-white transition-all duration-200"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right: booking steps visual */}
            <div className="bg-[var(--surface-alt)] rounded-2xl p-8 border border-[var(--border)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-6">
                How it works
              </p>
              <div className="space-y-1">
                {bookingSteps.map((step, i) => (
                  <div key={step.label} className="relative">
                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[var(--border)] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                      <span className="shrink-0 h-8 w-8 rounded-full bg-pp-teal text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-pp-heading text-sm">{step.label}</p>
                        <p className="text-xs text-[var(--muted)] mt-0.5">{step.detail}</p>
                      </div>
                    </div>
                    {i < bookingSteps.length - 1 && (
                      <div className="ml-8 w-px h-2 bg-[var(--border)]" aria-hidden />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-pp-teal/10 rounded-xl border border-pp-teal/20">
                <p className="text-sm text-pp-heading font-semibold mb-0.5">Need someone today?</p>
                <a
                  href={`tel:${siteSettings.phoneHref}`}
                  className="text-pp-teal font-bold text-lg hover:text-pp-teal-dark transition-colors"
                >
                  {siteSettings.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── E) REVIEWS ───────────────────────────────────────────────────────── */}
      <section className="bg-[var(--surface-alt)] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading mb-2">
                What our customers say
              </h2>
              <div className="flex items-center gap-3">
                <Stars rating={Math.floor(Number(siteSettings.googleRating))} className="h-5 w-5" />
                <span className="text-pp-heading font-bold">{siteSettings.googleRating}</span>
                <span className="text-[var(--muted)] text-sm">based on {siteSettings.reviewCount}+ customer reviews</span>
              </div>
            </div>
            <Link
              href="/reviews"
              className="shrink-0 text-sm font-semibold text-pp-teal hover:text-pp-teal-dark transition-colors duration-200"
            >
              Read all reviews →
            </Link>
          </div>

          {/* Review cards (static 3-grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[var(--border)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex flex-col"
              >
                {/* Google G icon */}
                <div className="flex items-start justify-between mb-4">
                  <Stars rating={review.rating} className="h-4 w-4" />
                  <svg className="h-5 w-5 text-gray-300 shrink-0" viewBox="0 0 74 24" aria-hidden>
                    <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-[var(--text)] text-sm leading-relaxed flex-1">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--border)]">
                  <p className="font-semibold text-pp-heading text-sm">{review.customerName}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{review.areaName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── F) DIY ADVICE & GUIDES ────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-pp-teal mb-2">
                Free Expert Advice
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading">
                Plumbing guides &amp; advice
              </h2>
            </div>
            <Link
              href="/guides"
              className="shrink-0 text-sm font-semibold text-pp-teal hover:text-pp-teal-dark transition-colors duration-200"
            >
              View all guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block bg-[var(--surface-alt)] rounded-xl border border-[var(--border)] p-5 hover:border-pp-teal hover:shadow-[0_4px_16px_rgba(230,36,25,0.08)] transition-all duration-200"
              >
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-[var(--brand)] mb-4">
                  {guide.category === "costs" ? "Cost Guide" :
                   guide.category === "diy" ? "DIY" :
                   guide.category === "boilers" ? "Boilers" :
                   guide.category === "heating" ? "Heating" : "Emergency"}
                </span>
                <h3 className="text-sm font-bold text-pp-heading leading-snug group-hover:text-pp-teal transition-colors duration-200 mb-2">
                  {guide.name}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2 mb-4">
                  {guide.excerpt}
                </p>
                <span className="text-xs font-semibold text-pp-teal flex items-center gap-1">
                  Read guide
                  <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── G) AREAS WE COVER ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--surface-alt)] py-14 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-pp-heading mb-2">Areas We Cover</h2>
            <p className="text-[var(--muted)] text-sm">
              Covering Peterborough and surrounding areas across Cambridgeshire.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-white text-pp-heading text-sm font-medium px-4 py-2 rounded-full hover:border-pp-teal hover:text-pp-teal transition-colors duration-200"
              >
                <svg className="h-3 w-3 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {area.name}
              </Link>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href="/areas" className="text-sm font-semibold text-pp-teal hover:text-pp-teal-dark transition-colors duration-200">
              View all areas we cover →
            </Link>
          </p>
        </div>
      </section>

      {/* ── H) BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-pp-teal py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to book your plumber?
          </h2>
          <p className="text-white/85 text-lg leading-relaxed mb-10">
            Get in touch today for a free, no-obligation quote from our Gas Safe registered
            engineers. We cover the whole Peterborough area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="btn-book-now bg-white text-pp-navy px-9 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pp-teal"
            >
              Book Online
            </Link>
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="bg-transparent text-white px-9 py-4 rounded-full font-bold text-lg border-2 border-white/70 hover:bg-white hover:text-pp-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pp-teal"
            >
              Call {siteSettings.phone}
            </a>
          </div>
          <p className="mt-8 text-white/70 text-sm">
            30+ years established · Gas Safe Reg. {siteSettings.gasSafeNumber} · {siteSettings.engineersCount} qualified engineers
          </p>
        </div>
      </section>
    </>
  );
}
