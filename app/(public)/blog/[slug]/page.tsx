import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Service } from "@/content/services";
import { blogCategoryAreaMap, blogCategoryGuideMap } from "@/lib/seo/internalLinks";
import CTASection from "@/components/blocks/CTASection";

type BlogCategory = "Boiler & Heating" | "Landlord & Legal" | "Emergency & Repairs" | "Local Guides";

const categoryServiceMap: Record<BlogCategory, string[]> = {
  "Boiler & Heating": ["boiler-service", "central-heating-services", "gas-safety-certificates"],
  "Landlord & Legal": ["landlord-services", "gas-safety-certificates", "boiler-service"],
  "Emergency & Repairs": ["emergency-plumber", "plumbing-repairs", "damp-leak-detection"],
  "Local Guides": ["plumbing-installation", "bathroom-installations", "plumbing-repairs"],
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "Published" },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    absoluteTitle: true,
    ogType: "article",
    image: post.image ?? "/images/homepage/hero.webp",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, settings] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!post || post.status !== "Published") notFound();

  const category = post.category as BlogCategory;
  const relatedSlugs = categoryServiceMap[category] ?? [];
  const [relatedServices, relatedPosts] = await Promise.all([
    relatedSlugs.length
      ? ((await prisma.service.findMany({ where: { slug: { in: relatedSlugs } } })) as unknown as Service[])
      : Promise.resolve([] as Service[]),
    prisma.blogPost.findMany({
      where: { category: post.category, status: "Published", slug: { not: post.slug } },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, publishedAt: true },
    }),
  ]);

  const guideLinks = blogCategoryGuideMap[category];
  const areaLinks = blogCategoryAreaMap[category];

  return (
    <>
      {/* ── Schema ─────────────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: post.title, href: `/blog/${post.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema({
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            publishedAt: post.publishedAt?.toISOString() ?? null,
            updatedAt: post.updatedAt?.toISOString() ?? null,
            category: post.category,
            image: post.image,
          })),
        }}
      />

      {/* ── Breadcrumb bar ──────────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-3"
      >
        <div className="mx-auto max-w-3xl px-4 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--brand)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[var(--brand)] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-pp-heading font-medium truncate">{post.title}</span>
        </div>
      </nav>

      {/* ── Article ─────────────────────────────────────────────────────────── */}
      <div className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4">

          {/* Meta row */}
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] bg-[rgba(200,16,46,0.08)] px-3 py-1 rounded-full">
              {post.category}
            </span>
            {post.publishedAt && (
              <span className="text-sm text-[var(--muted)]">
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-pp-heading leading-tight mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 border-b border-[var(--border)] pb-10">
            {post.excerpt}
          </p>

          {/* Inline CTA box */}
          <div className="my-10 rounded-xl border border-[var(--brand)] bg-[rgba(200,16,46,0.06)] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-pp-heading">Need a plumber in Peterborough?</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Qualified plumbing &amp; heating engineers — clear upfront quotes, no call-out surprises.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={settings.primaryCtaHref}
                className="bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                {settings.primaryCtaLabel}
              </Link>
              {category === "Emergency & Repairs" && (
                <Link
                  href="/emergency"
                  className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
                >
                  Emergency plumber
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

          {/* Article body */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-pp-heading prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-pp-body prose-p:leading-relaxed prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline prose-ul:my-4 prose-ul:pl-6 prose-ol:my-4 prose-ol:pl-6 prose-li:my-1.5 prose-li:text-pp-body prose-blockquote:border-l-4 prose-blockquote:border-[var(--brand)] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[var(--muted)]"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />

          {/* ── Related services ──────────────────────────────────────────────── */}
          {relatedServices.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-base font-bold text-pp-heading uppercase tracking-wide mb-4">Related Services</h2>
              <div className="flex flex-wrap gap-2">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="text-sm font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Helpful guides ────────────────────────────────────────────────── */}
          {guideLinks?.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-base font-bold text-pp-heading uppercase tracking-wide mb-4">Helpful Guides</h2>
              <div className="grid gap-2">
                {guideLinks.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] transition-colors duration-200 group"
                  >
                    <svg className="h-5 w-5 text-[var(--brand)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-semibold text-pp-heading text-sm group-hover:text-[var(--brand)] transition-colors duration-200">
                      {guide.title}
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/guides" className="mt-4 inline-block text-sm text-[var(--brand)] font-semibold hover:underline">
                View all guides →
              </Link>
            </div>
          )}

          {/* ── Areas we cover ────────────────────────────────────────────────── */}
          {areaLinks?.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-base font-bold text-pp-heading uppercase tracking-wide mb-4">Areas We Cover</h2>
              <div className="flex flex-wrap gap-2">
                {areaLinks.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                  >
                    Plumber in {area.name}
                  </Link>
                ))}
                <Link
                  href="/areas"
                  className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                >
                  View all areas →
                </Link>
              </div>
            </div>
          )}

          {/* ── More from this category ───────────────────────────────────────── */}
          {relatedPosts.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-base font-bold text-pp-heading uppercase tracking-wide mb-4">More from {post.category}</h2>
              <div className="grid gap-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] transition-colors duration-200 group"
                  >
                    <svg className="h-4 w-4 text-[var(--brand)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-pp-heading text-sm group-hover:text-[var(--brand)] transition-colors duration-200 leading-snug">
                        {p.title}
                      </p>
                      {p.publishedAt && (
                        <p className="text-xs text-[var(--muted)] mt-0.5">
                          {new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="mt-4 inline-block text-sm text-[var(--brand)] font-semibold hover:underline">
                ← View all articles
              </Link>
            </div>
          )}

          {/* ── End-of-article CTA ────────────────────────────────────────────── */}
          <div className="mt-14 pt-10 border-t border-[var(--border)]">
            <div className="rounded-xl border border-[var(--brand)] bg-[rgba(200,16,46,0.06)] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-pp-heading text-lg">Ready to book a plumber?</p>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Qualified engineers across Peterborough and surrounding areas — clear upfront quotes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
                >
                  Contact Peterborough Plumbers
                </Link>
                <a
                  href={`tel:${settings.phoneHref}`}
                  className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] transition-colors duration-200"
                >
                  {settings.phone}
                </a>
                {category === "Emergency & Repairs" && (
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
      </div>

      <CTASection />
    </>
  );
}
