import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import PageHeroShell from "@/components/hero/PageHeroShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BookingFormWrapper from "./BookingFormWrapper";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Book a Plumber in Peterborough | Same-Day",
  description:
    "Book a plumber in Peterborough online. Fill in our simple form and we'll confirm your appointment quickly. Same-week availability in most cases.",
  path: "/book",
  absoluteTitle: true,
  noIndex: true,
  image: "/images/homepage/boiler-service.webp",
});

const trustPoints = [
  "Same-week availability in most cases",
  "Qualified Gas Safe engineers",
  "Clear upfront quotes — no hidden charges",
];

const steps = [
  { num: "1", label: "Enter your postcode", desc: "We check availability in your area instantly." },
  { num: "2", label: "Choose a time slot", desc: "Pick a date and time that suits you." },
  { num: "3", label: "Fill in your details", desc: "Tell us about the job and confirm your booking." },
];

export default function BookPage() {
  return (
    <>
      {/* Hero — identical shell to all other inner pages */}
      <PageHeroShell
        imageSrc="/images/homepage/boiler-service.webp"
        imageAlt="Book a plumber in Peterborough — fast, reliable service"
        priority
        focalPoint="50% 40%"
      >
        <Breadcrumbs items={[{ name: "Book Now", href: "/book" }]} inverted />

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">
            Available Now &mdash; Peterborough &amp; Surrounding Areas
          </span>
        </div>

        {/* H1 */}
        <h1
          className="text-white font-black leading-[1.05] tracking-[-0.025em] max-w-3xl"
          style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}
        >
          Book a Plumber in{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Peterborough
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="mt-5 text-white/70 leading-[1.65] max-w-2xl"
          style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}
        >
          Fill in our simple booking form below — we&apos;ll confirm your appointment as soon as possible.
          Same-week slots available across all Peterborough postcodes.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#booking-form"
            className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
              boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)",
            }}
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 2a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H8zm4 14a1 1 0 110 2 1 1 0 010-2zm-1-2V7h2v7h-2z" />
            </svg>
            Book Online Now
          </a>
          <a
            href={`tel:${siteSettings.phoneHref}`}
            aria-label={`Call us on ${siteSettings.phone}`}
            className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            {siteSettings.phone}
          </a>
        </div>

        {/* Trust chips */}
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
          {trustPoints.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
              <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </PageHeroShell>

      {/* How it works strip */}
      <div className="bg-[#111111] sm:bg-pp-navy border-b border-white/[0.08]">
        <div className="mx-auto max-w-4xl px-2 py-4 sm:px-4 sm:py-8">
          {/* Mobile: 3-up centred columns | Desktop: unchanged left-aligned grid */}
          <div className="grid grid-cols-3 divide-x divide-white/[0.09] sm:divide-x-0 sm:gap-4">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center text-center gap-1.5 px-2 sm:flex-row sm:items-start sm:text-left sm:px-0 sm:gap-4">
                <div
                  className="shrink-0 h-6 w-6 sm:h-9 sm:w-9 rounded-full flex items-center justify-center font-bold text-white text-[10px] sm:text-sm"
                  style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)" }}
                >
                  {s.num}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-[11px] leading-snug sm:text-sm">{s.label}</p>
                  <p className="hidden sm:block text-white/50 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking form */}
      <section id="booking-form" className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-pp-heading">Check Availability &amp; Book</h2>
            <p className="mt-2 text-[var(--muted)] text-sm max-w-md mx-auto">
              Enter your postcode to see available slots in your area.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-16 text-[var(--muted)]">
                <svg className="animate-spin h-5 w-5 mr-3 text-brand" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </div>
            }
          >
            <BookingFormWrapper />
          </Suspense>

          {/* Prefer to call? */}
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            Prefer to book by phone?{" "}
            <a href={`tel:${siteSettings.phoneHref}`} className="text-brand font-semibold hover:underline">
              Call {siteSettings.phone}
            </a>{" "}
            and we&apos;ll sort it straight away.
          </p>
        </div>
      </section>

      {/* Bottom trust bar */}
      <section className="bg-[var(--surface-alt)] border-t border-[var(--border)] py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: (
                  <svg className="h-6 w-6 text-brand mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                heading: "Qualified Engineers",
                body: "Gas Safe registered. Fully insured on every job.",
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-brand mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                heading: "Upfront Pricing",
                body: "Written quote before any work starts. No surprises.",
              },
              {
                icon: (
                  <svg className="h-6 w-6 text-brand mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                heading: "Serving Peterborough",
                body: "All PE postcodes plus Stamford, Market Deeping & more.",
              },
            ].map((item) => (
              <div key={item.heading} className="flex flex-col items-center gap-3">
                {item.icon}
                <p className="font-semibold text-pp-heading text-sm">{item.heading}</p>
                <p className="text-[var(--muted)] text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-[var(--muted)]">
            Have an emergency?{" "}
            <Link href="/emergency" className="text-brand font-semibold hover:underline">
              See our emergency plumber service →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
