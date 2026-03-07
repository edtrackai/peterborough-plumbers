import Image from "next/image";
import PageHeroShell from "@/components/hero/PageHeroShell";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteSettings } from "@/content/settings";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import { prisma } from "@/lib/prisma";
import { guideCategories } from "@/content/guides";

export const revalidate = 3600; // rebuild stale pages every hour

export const metadata: Metadata = buildMetadata({
  title: "Plumbing & Heating Guides | Peterborough 2026",
  description:
    "Free plumbing & heating guides for Peterborough homeowners — boiler help, DIY tips, cost guides and emergency advice from qualified engineers.",
  path: "/guides",
  absoluteTitle: true,
  image: "/images/guides/hero.webp",
});

const categoryOrder: (keyof typeof guideCategories)[] = [
  "costs",
  "diy",
  "boilers",
  "heating",
  "emergencies",
];

const categoryColors: Record<keyof typeof guideCategories, string> = {
  costs:       "bg-[rgba(200,16,46,0.08)] text-[#C8102E]",
  diy:         "bg-[rgba(15,110,110,0.1)] text-[#0F6E6E]",
  boilers:     "bg-gray-100 text-gray-700",
  heating:     "bg-[rgba(200,16,46,0.06)] text-[#a50d26]",
  emergencies: "bg-[rgba(200,16,46,0.14)] text-[#C8102E]",
};

const categoryImages: Record<keyof typeof guideCategories, { src: string; alt: string }> = {
  costs:       { src: "/images/guides/costs-pricing.webp",      alt: "Plumbing and heating costs and pricing guides" },
  diy:         { src: "/images/guides/diy-guides.webp",         alt: "DIY plumbing and heating guides for homeowners" },
  boilers:     { src: "/images/guides/boiler.webp",             alt: "Boiler advice and troubleshooting guides" },
  heating:     { src: "/images/guides/central-heating.webp",    alt: "Central heating guides and advice" },
  emergencies: { src: "/images/guides/emergencies.webp",        alt: "Plumbing emergency guides and advice" },
};

export default async function GuidesPage() {
  const guides = await prisma.guide.findMany({ orderBy: { publishedAt: "desc" } });

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ]);

  // Featured (cost) guides shown at top
  const featuredGuides = guides.filter((g) => g.category === "costs").slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <PageHeroShell imageSrc="/images/guides/hero.webp" imageAlt="Plumber providing expert repairs and advice in Peterborough" priority>
          <Breadcrumbs items={[{ name: "Guides", href: "/guides" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Plumbing &amp; Heating Guides —{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Practical, honest advice from qualified plumbing &amp; heating engineers — 2026 cost guides, step-by-step DIY tips, boiler troubleshooting, and emergency help. No jargon, no upsell.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Book Now
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {siteSettings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {[`${guides.length} Free Guides`, "Qualified engineers", "Updated 2026"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
      </PageHeroShell>

      {/* Quick-jump category pills */}
      <nav className="bg-white border-b border-[var(--border)] sticky top-16 z-40" aria-label="Guide categories">
        <div className="mx-auto max-w-7xl px-4 py-3 flex gap-3 overflow-x-auto">
          <a
            href="#featured"
            className="whitespace-nowrap shrink-0 text-sm font-medium px-4 py-1.5 rounded-full border border-[var(--brand)] text-[var(--brand)] bg-[rgba(200,16,46,0.05)] transition-colors duration-200"
          >
            ★ Popular
          </a>
          {categoryOrder.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="whitespace-nowrap shrink-0 text-sm font-medium px-4 py-1.5 rounded-full border border-[var(--border)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
            >
              {guideCategories[cat]}
            </a>
          ))}
        </div>
      </nav>

      {/* Featured guides */}
      {featuredGuides.length > 0 && (
        <section id="featured" className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-14 scroll-mt-32">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading mb-2">Most Popular Guides</h2>
            <p className="text-sm text-[var(--muted)] mb-8">
              Our most-read cost guides — everything you need to know before getting a quote.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="group block rounded-xl border border-[var(--border)] bg-white p-5 hover:border-[var(--brand)] hover:shadow-[0_4px_20px_rgba(200,16,46,0.1)] transition-all duration-200"
                >
                  <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 ${categoryColors[guide.category as keyof typeof guideCategories]}`}>
                    {guideCategories[guide.category as keyof typeof guideCategories]}
                  </span>
                  <h3 className="text-sm font-semibold text-pp-heading group-hover:text-[var(--brand)] transition-colors duration-200 leading-snug mb-2">
                    {guide.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-2 mb-3">
                    {guide.excerpt}
                  </p>
                  <p className="text-xs text-[var(--brand)] font-semibold">
                    Read guide →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guides by category */}
      <div className="bg-white">
        {categoryOrder.map((cat) => {
          const catGuides = guides.filter((g) => g.category === cat);
          if (catGuides.length === 0) return null;
          return (
            <section
              key={cat}
              id={cat}
              className="border-b border-[var(--border)] py-14 scroll-mt-32"
            >
              <div className="mx-auto max-w-7xl px-4">
                <h2 className="text-2xl font-bold text-pp-heading mb-6">
                  {guideCategories[cat]}
                </h2>
                {/* Card grid with category image as blurred background */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Background image layer */}
                  <Image
                    src={categoryImages[cat].src}
                    alt=""
                    aria-hidden="true"
                    fill
                    className="object-cover blur-sm scale-105 opacity-[0.13]"
                    loading="lazy"
                  />
                  {/* Subtle white overlay for readability */}
                  <div className="absolute inset-0 bg-white/60" />
                  {/* Cards */}
                  <div className="relative z-10 py-6 px-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="group block rounded-xl border border-[var(--border)] bg-white p-6 hover:border-[var(--brand)] hover:shadow-[0_4px_20px_rgba(200,16,46,0.1)] transition-all duration-200"
                      >
                        <span
                          className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${categoryColors[guide.category as keyof typeof guideCategories]}`}
                        >
                          {guideCategories[guide.category as keyof typeof guideCategories]}
                        </span>
                        <h3 className="text-base font-semibold text-pp-heading group-hover:text-[var(--brand)] transition-colors duration-200 leading-snug mb-3">
                          {guide.name}
                        </h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2 mb-4">
                          {guide.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[var(--muted)]">
                            {guide.readTime} min read
                          </p>
                          <span className="text-xs text-[var(--brand)] font-semibold group-hover:underline">
                            Read guide →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* About the guides */}
      <section className="bg-[var(--surface-alt)] py-12">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            About Our Guides
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto mb-6">
            Every guide on this site is written or reviewed by our qualified engineers
            based on real jobs in the Peterborough area. Prices are updated annually to reflect
            current market rates. We never recommend unnecessary work — our goal is to help you
            make informed decisions, whether you book with us or not.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/pricing" className="text-[var(--brand)] hover:underline font-medium">
              Full Pricing Guide →
            </Link>
            <Link href="/faqs" className="text-[var(--brand)] hover:underline font-medium">
              FAQs →
            </Link>
            <Link href="/services" className="text-[var(--brand)] hover:underline font-medium">
              Our Services →
            </Link>
          </div>
        </div>
      </section>

      <ImageCTASection
        heading="Need Help From a Real Engineer?"
        subheading="Need plumbing or heating help in Peterborough? Call now or request a visit online — clear upfront quotes."
        imageSrc="/images/guides/need-help-from-a-real-engineer.webp"
        imageAlt="Need help from a real plumbing and heating engineer in Peterborough"
      />
    </>
  );
}
