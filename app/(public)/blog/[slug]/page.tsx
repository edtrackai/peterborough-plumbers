import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { articleSchema } from "@/lib/seo/schema";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Service } from "@/content/services";

type BlogCategory = "Boiler & Heating" | "Landlord & Legal" | "Emergency & Repairs" | "Local Guides";

const categoryServiceMap: Record<BlogCategory, string[]> = {
  "Boiler & Heating": ["boiler-service", "central-heating-services", "gas-safety-certificates"],
  "Landlord & Legal": ["landlord-services", "gas-safety-certificates", "boiler-service"],
  "Emergency & Repairs": ["emergency-plumber", "plumbing-repairs", "damp-leak-detection"],
  "Local Guides": ["plumbing-installation", "bathroom-installations", "plumbing-repairs"],
};

export const revalidate = 3600; // rebuild stale pages every hour

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

  // Fetch related services and related blog posts for this category
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

  return (
    <>
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
      <section className="bg-pp-navy pt-4 sm:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
            inverted
          />
          <span className="text-xs font-semibold text-pp-teal uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mt-2">{post.title}</h1>
          {post.publishedAt && (
            <p className="mt-4 text-white/50 text-sm">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <div className="mt-6">
            <Link href={settings.primaryCtaHref} className="bg-[var(--brand)] text-white px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors">
              {settings.primaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />

          {/* Related services */}
          {relatedServices.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-bold text-pp-heading mb-4">Related Services</h2>
              <div className="flex flex-wrap gap-2">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="bg-pp-teal/10 text-pp-heading px-4 py-2 rounded-full text-sm font-medium hover:bg-pp-teal/20 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related blog posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-lg font-bold text-pp-heading mb-4">More from {post.category}</h2>
              <div className="grid gap-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 hover:border-[var(--brand)] transition-colors duration-200 group"
                  >
                    <svg className="h-4 w-4 text-[var(--brand)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-pp-heading text-sm group-hover:text-[var(--brand)] transition-colors duration-200">{p.title}</p>
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

          {/* End-of-article CTA */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <p className="font-semibold text-pp-heading">Ready to book a plumber?</p>
              <p className="text-sm text-[var(--muted)] mt-1">Qualified engineers across Peterborough — clear upfront quotes.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Contact Peterborough Plumbers
              </Link>
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
      </section>

      <CTASection />
    </>
  );
}
