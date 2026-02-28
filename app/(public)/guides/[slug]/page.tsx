import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import { guideCategories } from "@/content/guides";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // rebuild stale pages every hour

export async function generateStaticParams() {
  const guides = await prisma.guide.findMany({ select: { slug: true } });
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await prisma.guide.findUnique({ where: { slug } });
  if (!guide) return {};
  return buildMetadata({
    title: guide.name,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    ogType: "article",
  });
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;

  const [guide, settings] = await Promise.all([
    prisma.guide.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!guide) notFound();

  const relatedGuides = await prisma.guide.findMany({
    where: { category: guide.category, slug: { not: guide.slug } },
    take: 3,
  });

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.name, href: `/guides/${guide.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.name,
    description: guide.excerpt,
    author: {
      "@type": "Organization",
      name: settings.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: settings.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${settings.siteUrl}/logos/logo-mark.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    mainEntityOfPage: `${settings.siteUrl}/guides/${guide.slug}`,
    articleSection: guideCategories[guide.category as keyof typeof guideCategories],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-3"
      >
        <div className="mx-auto max-w-3xl px-4 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--brand)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[var(--brand)] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-pp-heading font-medium truncate">{guide.name}</span>
        </div>
      </nav>

      {/* Article */}
      <div className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4">
          {/* Meta */}
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] bg-[rgba(200,16,46,0.08)] px-3 py-1 rounded-full">
              {guideCategories[guide.category as keyof typeof guideCategories]}
            </span>
            <span className="text-sm text-[var(--muted)]">{guide.readTime} min read</span>
            <span className="text-sm text-[var(--muted)]">
              Updated:{" "}
              {new Date(guide.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-pp-heading leading-tight mb-4">
            {guide.name}
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 border-b border-[var(--border)] pb-10">
            {guide.excerpt}
          </p>

          {/* Inline CTA box */}
          <div className="my-10 rounded-xl border border-[var(--brand)] bg-[rgba(200,16,46,0.06)] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-pp-heading">Need a plumber in Peterborough?</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Qualified plumbing &amp; heating engineers — Peterborough and surrounding areas.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/contact"
                className="btn-book-now bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Contact Peterborough Plumbers
              </Link>
              {["what-to-do-burst-pipe", "emergency-plumber-call-out-cost", "boiler-not-working-guide"].includes(slug) && (
                <Link
                  href="/emergency"
                  className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
                >
                  Emergency plumber in Peterborough
                </Link>
              )}
              <a
                href={`tel:${settings.phoneHref}`}
                className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] transition-colors duration-200"
              >
                {settings.phone}
              </a>
            </div>
          </div>

          {/* Guide content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-pp-heading prose-headings:font-bold prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline prose-ul:my-4 prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(guide.content) }}
          />

          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-xl font-bold text-pp-heading mb-6">Related Guides</h2>
              <div className="grid gap-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guides/${related.slug}`}
                    className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] transition-colors duration-200 group"
                  >
                    <svg
                      className="h-5 w-5 text-[var(--brand)] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-pp-heading text-sm group-hover:text-[var(--brand)] transition-colors duration-200">
                        {related.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{related.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/guides"
                className="mt-6 inline-block text-sm text-[var(--brand)] font-semibold hover:underline"
              >
                ← View all guides
              </Link>
            </div>
          )}

          {/* End-of-article CTA */}
          <div className="mt-12 pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <p className="font-semibold text-pp-heading">Need a plumber in Peterborough?</p>
              <p className="text-sm text-[var(--muted)] mt-1">Qualified engineers — clear upfront quotes, no hidden extras.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Contact Peterborough Plumbers
              </Link>
              {["what-to-do-burst-pipe", "emergency-plumber-call-out-cost", "boiler-not-working-guide"].includes(slug) && (
                <Link
                  href="/emergency"
                  className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
                >
                  Emergency plumber in Peterborough
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
