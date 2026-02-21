import Link from "next/link";
import type { Metadata } from "next";
import { guides, guideCategories } from "@/content/guides";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Free Plumbing Guides | Peterborough Homeowner Advice",
  description:
    "Free plumbing and heating guides for Peterborough homeowners — cost guides, boiler help, DIY tips and emergency advice from Gas Safe registered engineers.",
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
  costs:       "bg-blue-100 text-blue-800",
  diy:         "bg-green-100 text-green-800",
  boilers:     "bg-orange-100 text-orange-800",
  heating:     "bg-amber-100 text-amber-800",
  emergencies: "bg-rose-100 text-rose-800",
};

export default function GuidesPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)] mb-3">
            Free Expert Advice
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-pp-heading mb-5">
            Plumbing &amp; Heating Guides
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Practical advice from Peterborough&apos;s Gas Safe registered engineers — cost guides,
            DIY how-to articles, and troubleshooting help for your boiler and heating system.
          </p>
        </div>
      </section>

      {/* Quick-jump category pills */}
      <section className="bg-white border-b border-[var(--border)] sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 py-3 flex gap-3 overflow-x-auto">
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
      </section>

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
                      className="group block rounded-xl border border-[var(--border)] bg-white p-6 hover:border-[var(--brand)] hover:shadow-[0_4px_20px_rgba(201,168,76,0.15)] transition-all duration-200"
                    >
                      <span
                        className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 ${categoryColors[guide.category]}`}
                      >
                        {guideCategories[guide.category]}
                      </span>
                      <h3 className="text-base font-semibold text-pp-heading group-hover:text-[var(--brand)] transition-colors duration-200 leading-snug mb-3">
                        {guide.name}
                      </h3>
                      <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                        {guide.excerpt}
                      </p>
                      <p className="mt-4 text-xs text-[var(--muted)]">
                        {guide.readTime} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CTASection
        heading="Need Help From a Real Engineer?"
        subheading="Our Gas Safe registered team covers all of Peterborough and surrounding areas. Call or book online for a fast, reliable response."
      />
    </>
  );
}
