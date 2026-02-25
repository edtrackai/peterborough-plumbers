import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { guideCategories } from "@/content/guides";

export const metadata: Metadata = buildMetadata({
  title: "Free Plumbing & Heating Guides | Peterborough Homeowner Advice 2026",
  description:
    "Free plumbing and heating guides for Peterborough homeowners — 2026 cost guides, boiler help, DIY tips, and emergency advice from Gas Safe registered engineers.",
  path: "/guides",
  image: "/images/homepage/hero.png",
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
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "clamp(600px, 75vw, 1000px)" }}
      >
        {/* Background image */}
        <Image
          src="/images/homepage/plumbing-repairs.png"
          alt="Plumber providing expert repairs and advice in Peterborough"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.66) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mx-auto max-w-[900px] text-center">

            {/* Eyebrow */}
            <p className="inline-block bg-[var(--brand)] text-white text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">
              Free Expert Advice
            </p>

            {/* H1 */}
            <h1
              className="text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
            >
              Plumbing &amp; Heating Guides for Peterborough Homeowners
            </h1>

            {/* Description */}
            <p
              className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
            >
              Practical, honest advice from Gas Safe registered engineers — 2026 cost guides,
              step-by-step DIY tips, boiler troubleshooting, and emergency help. No jargon,
              no upsell.
            </p>

            {/* Trust points — stats row */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {[
                { label: `${guides.length} free guides` },
                { label: `Updated ${new Date().getFullYear()}` },
                { label: "Written by Gas Safe engineers" },
                { label: "Peterborough & surrounding areas" },
              ].map(({ label }) => (
                <div key={label} className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-[var(--brand)] shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

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
                <h2 className="text-2xl font-bold text-pp-heading mb-8">
                  {guideCategories[cat]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </section>
          );
        })}
      </div>

      {/* About the guides */}
      <section className="bg-[var(--surface-alt)] py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            About Our Guides
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto mb-6">
            Every guide on this site is written or reviewed by our Gas Safe registered engineers
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

      <CTASection
        heading="Need Help From a Real Engineer?"
        subheading="Our Gas Safe registered team covers all of Peterborough and surrounding areas. Call or book online for a fast, reliable response."
      />
    </>
  );
}
