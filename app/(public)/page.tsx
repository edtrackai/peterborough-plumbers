import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import HeroSection from "@/components/home/HeroSection";
import HelpTodaySection from "@/components/home/HelpTodaySection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";

export const revalidate = 3600; // rebuild stale pages every hour

export const metadata: Metadata = buildMetadata({
  title: "Peterborough Plumbing & Heating | Emergency Call-Outs",
  description:
    "Emergency plumbers in Peterborough — boiler servicing, repairs & heating. Qualified engineers, clear upfront quotes, fast response across Peterborough.",
  path: "/",
  absoluteTitle: true,
  image: "/images/homepage/hero.webp",
});

// ── Helpers ──────────────────────────────────────────────────────────────────

const onlineFeatures = [
  "Request a quote in minutes — no waiting on hold",
  "Choose your preferred appointment date and time",
  "Send photos or a short video of the issue",
  "Receive confirmation and engineer updates by text",
];

// Exact ordered slugs for homepage linking blocks
const popularServiceSlugs = [
  "emergency-plumber", "plumbing-repairs", "drain-blockages", "bathroom-installations",
  "plumbing-installation", "damp-leak-detection", "landlord-services", "gas-safety-certificates",
] as const;
const coverAreaSlugs = [
  "city-centre", "werrington", "bretton", "hampton", "orton", "yaxley", "whittlesey", "stamford",
] as const;

export default async function HomePage() {
  const [featuredReviewsRaw, siteSettings, popularServicesRaw, coverAreasRaw] = await Promise.all([
    prisma.review.findMany({ where: { featured: true }, take: 4 }),
    getSiteSettings(),
    prisma.service.findMany({
      where: { slug: { in: [...popularServiceSlugs] } },
      select: { slug: true, name: true },
    }),
    prisma.area.findMany({
      where: { slug: { in: [...coverAreaSlugs] } },
      select: { slug: true, name: true },
    }),
  ]);
  const featuredReviews = featuredReviewsRaw;
  // Preserve spec-defined order
  const popularServices = popularServiceSlugs
    .map((s) => popularServicesRaw.find((r) => r.slug === s))
    .filter((r): r is { slug: string; name: string } => !!r);
  const areas = coverAreaSlugs
    .map((s) => coverAreasRaw.find((r) => r.slug === s))
    .filter((r): r is { slug: string; name: string } => !!r);

  return (
    <>
      {/* ── A) HERO ──────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── C) HOW CAN WE HELP YOU? — HomeServe-style 2×2 grid ──────────────── */}
      <HelpTodaySection />

      {/* ── D) BOOK & MANAGE ONLINE — HomeServe-style two-column ──────── */}
      <section className="bg-white py-10 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#0F6E6E] mb-3">
                Quick &amp; Easy
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1A2744] leading-tight mb-5">
                Book &amp; manage your visit online
              </h2>
              <p className="text-[#6b7280] mb-8 leading-relaxed">
                No waiting on hold. Request a visit, choose your preferred time slot, and track
                your engineer — all from your phone or laptop, any time of day.
              </p>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
                {onlineFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="shrink-0 h-6 w-6 rounded-full bg-[#0F6E6E] text-white flex items-center justify-center">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[#1A2744] text-sm font-medium leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="btn-book-now inline-flex items-center bg-[#C8102E] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#a50d26] transition-colors duration-200"
                >
                  Book Online Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center border-2 border-[#1A2744] text-[#1A2744] px-7 py-[13px] rounded-full font-bold text-sm hover:bg-[#1A2744] hover:text-white transition-colors duration-200"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Right: photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/homepage/book-manage-your-visit-online.webp"
                  alt="Book and manage your plumbing visit online"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── E) REVIEWS — Trustpilot-style carousel ───────────────────────────── */}
      <section className="bg-white pt-10 sm:pt-16 lg:pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4">

          {/* Heading */}
          <h2 className="text-center text-2xl lg:text-[1.9rem] font-bold text-[#1A2744] mb-6">
            What our customers are saying...
          </h2>

          {/* Rating summary row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="font-semibold text-[#1A2744] text-base">Excellent</span>
            {/* Trustpilot-style green star squares */}
            <div className="flex gap-0.5" aria-label={`${siteSettings.googleRating} out of 5`}>
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="h-9 w-9 bg-[#00B67A] flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.84L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
              ))}
              {/* Half star */}
              <span className="h-9 w-9 relative overflow-hidden" aria-hidden>
                <span className="absolute inset-0 bg-[#DCDCE6]" />
                <span className="absolute inset-0 w-1/2 bg-[#00B67A]" />
                <svg className="absolute inset-0 m-2 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.84L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
            </div>
            <span className="text-sm text-[#1A2744]">
              <span className="font-semibold underline underline-offset-2 cursor-default">{siteSettings.reviewCount}+ reviews on</span>
            </span>
            {/* Google wordmark */}
            <svg className="h-5 w-auto" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
              <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4" />
              <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335" />
              <path d="M38.17 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05" />
              <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3-2.9 0-5.56 2.55-5.56 5.83 0 3.26 2.66 5.79 5.56 5.79 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.54 3.1-3.54 1.74 0 3.1 1.5 3.1 3.54 0 2.03-1.36 3.52-3.1 3.52z" fill="#4285F4" />
              <path d="M58 .24h2.51v17.57H58z" fill="#34A853" />
              <path d="M66.89 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335" />
            </svg>
          </div>

          {/* Review cards with prev/next arrows */}
          <div className="relative px-0 lg:px-10">
            {/* Prev arrow */}
            <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-gray-300 bg-white shadow-sm items-center justify-center text-[#1A2744]" aria-hidden>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredReviews.map((review) => {
                const words = review.body.split(" ");
                const title = words.slice(0, 4).join(" ") + (words.length > 4 ? "..." : "");
                return (
                  <div
                    key={review.customerName}
                    className="bg-white rounded-lg border border-gray-200 p-5 flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                  >
                    {/* Stars + Verified badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-px" aria-label={`${review.rating} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <span
                            key={i}
                            className={`h-5 w-5 flex items-center justify-center ${i <= review.rating ? "bg-[#00B67A]" : "bg-[#DCDCE6]"}`}
                          >
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.84L12 17.77l-6.18 3.24L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-[#6b7280] font-medium">
                        <svg className="h-3.5 w-3.5 text-[#6b7280]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    </div>
                    {/* Title */}
                    <p className="font-bold text-[#1A2744] text-sm mb-2 leading-snug">{title}</p>
                    {/* Excerpt */}
                    <p className="text-[#6b7280] text-xs leading-relaxed flex-1 line-clamp-3">
                      {review.body}
                    </p>
                    {/* Customer */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-[#1A2744]">{review.customerName}</p>
                      <p className="text-xs text-[#9ca3af]">{review.areaName}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next arrow */}
            <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full border border-gray-300 bg-white shadow-sm items-center justify-center text-[#1A2744]" aria-hidden>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Footer rating line */}
          <p className="text-center text-sm text-[#6b7280] mt-8">
            Rated{" "}
            <span className="font-semibold text-[#1A2744]">{siteSettings.googleRating} / 5</span>{" "}
            based on{" "}
            <Link href="/reviews" className="underline underline-offset-2 hover:text-[#1A2744] transition-colors">
              {siteSettings.reviewCount}+ reviews
            </Link>
            . Showing our 4 &amp; 5 star reviews.
          </p>

        </div>
      </section>

      {/* ── F) DIY GUIDES — HomeServe-style card + wave + circular thumbnails ── */}
      <section className="pt-8 sm:pt-10 pb-0 overflow-hidden">

        {/* White rounded card centred on grey background */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[560px] bg-white rounded-[24px] shadow-sm px-8 py-10 text-center">
            <h2 className="text-2xl lg:text-[1.7rem] font-bold text-[#242424] mb-4">
              DIY advice and hacks
            </h2>
            <p className="text-[#6b7280] leading-relaxed text-sm">
              With our{" "}
              <Link
                href="/guides"
                className="text-[#0F6E6E] underline underline-offset-2 font-semibold hover:text-[#0d5f5f] transition-colors"
              >
                Guides Hub
              </Link>
              , whether it&apos;s boiler troubleshooting, heating advice, or plumbing tips — we&apos;ve
              got everything you need to handle those smaller issues at home.
            </p>
          </div>
        </div>

        {/* Grey → white wave transition */}
        <div className="relative h-12 sm:h-16 mt-4 sm:mt-6">
          <svg
            viewBox="0 0 1280 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0,0 Q640,64 1280,0 L1280,64 L0,64 Z" fill="white" />
          </svg>
        </div>

        {/* Circular guide thumbnails on white */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">

              <Link href="/guides/how-to-bleed-a-radiator" className="group flex flex-col items-center gap-4">
                <div className="h-[140px] w-[140px] rounded-full overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-[#0F6E6E] transition-all duration-200">
                  <Image
                    src="/images/homepage/how-to-bleed-a-radiator.webp"
                    alt="How to bleed a radiator"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-[#0F6E6E] font-semibold text-sm leading-snug group-hover:underline">
                  How to bleed a radiator
                </span>
              </Link>

              <Link href="/guides/how-to-fix-a-dripping-tap" className="group flex flex-col items-center gap-4">
                <div className="h-[140px] w-[140px] rounded-full overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-[#0F6E6E] transition-all duration-200">
                  <Image
                    src="/images/homepage/how-to-fix-a-dripping-tap.webp"
                    alt="How to fix a dripping tap"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-[#0F6E6E] font-semibold text-sm leading-snug group-hover:underline">
                  How to fix a dripping tap
                </span>
              </Link>

              <Link href="/guides/how-to-repressurise-your-boiler" className="group flex flex-col items-center gap-4">
                <div className="h-[140px] w-[140px] rounded-full overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-[#0F6E6E] transition-all duration-200">
                  <Image
                    src="/images/homepage/how-to-repressurise-your-boiler.webp"
                    alt="How to repressurise your boiler"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-[#0F6E6E] font-semibold text-sm leading-snug group-hover:underline">
                  How to repressurise your boiler
                </span>
              </Link>

              <Link href="/guides/what-to-do-burst-pipe" className="group flex flex-col items-center gap-4">
                <div className="h-[140px] w-[140px] rounded-full overflow-hidden shrink-0 ring-2 ring-transparent group-hover:ring-[#0F6E6E] transition-all duration-200">
                  <Image
                    src="/images/homepage/what-to-do-with-a-burst-pipe.webp"
                    alt="What to do with a burst pipe"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-[#0F6E6E] font-semibold text-sm leading-snug group-hover:underline">
                  What to do with a burst pipe
                </span>
              </Link>

            </div>
          </div>
        </div>

      </section>

      {/* ── G1) POPULAR SERVICES ─────────────────────────────────────────────── */}
      <section className="bg-white py-8 sm:py-14 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-pp-heading mb-2">Popular Services in Peterborough</h2>
            <p className="text-[var(--muted)] text-sm">
              Qualified engineers for all your plumbing and heating needs.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {popularServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="inline-flex items-center gap-1.5 border border-[var(--border)] bg-white text-pp-heading text-sm font-medium px-4 py-2 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
              >
                <svg className="h-3 w-3 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {svc.name}
              </Link>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href="/services" className="text-sm font-semibold text-pp-teal hover:text-pp-teal-dark transition-colors duration-200">
              View all services →
            </Link>
          </p>
        </div>
      </section>

      {/* ── G) AREAS WE COVER ─────────────────────────────────────────────────── */}
      <section className="bg-white py-8 sm:py-14 border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-pp-heading mb-2">Areas We Cover</h2>
            <p className="text-[var(--muted)] text-sm">
              Covering Peterborough and surrounding areas across Cambridgeshire.
            </p>
          </div>
          {/* Banner image */}
          <div className="relative w-full rounded-xl overflow-hidden mb-8" style={{ aspectRatio: "21/9" }}>
            <Image
              src="/images/homepage/areas-we-cover.webp"
              alt="Areas we cover across Peterborough and Cambridgeshire"
              fill
              className="object-cover"
              loading="lazy"
            />
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
      <section className="bg-white py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: text + CTAs */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#242424] mb-4">
                Ready to book your plumber?
              </h2>
              <p className="text-[#6b7280] text-lg leading-relaxed mb-10">
                Get in touch today for plumbing repairs, boiler servicing and heating support
                across Peterborough and surrounding areas.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link
                  href="/contact"
                  className="btn-book-now inline-flex items-center gap-2 bg-[var(--brand)] text-white px-9 py-4 rounded-full font-bold text-lg hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg"
                >
                  Book Online
                </Link>
                <a
                  href={`tel:${siteSettings.phoneHref}`}
                  className="inline-flex items-center gap-2 bg-transparent text-[#242424] px-9 py-4 rounded-full font-bold text-lg border-2 border-[#242424]/30 hover:bg-[#242424] hover:text-white transition-colors duration-200"
                >
                  Call {siteSettings.phone}
                </a>
              </div>
              <p className="mt-8 text-[#9ca3af] text-sm">
                Peterborough plumbing &amp; heating · Fully insured · Clear upfront quotes
              </p>
            </div>
            {/* Right: side image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/homepage/ready-to-book-your-plumber.webp"
                alt="Ready to book your plumber in Peterborough"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
