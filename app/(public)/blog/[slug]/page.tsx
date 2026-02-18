import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { getBlogBySlug, getAllBlogSlugs } from "@/content/blog";
import { services } from "@/content/services";
import { siteSettings } from "@/content/settings";
import { articleSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post || post.status !== "Published") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(post)),
        }}
      />
      <section className="bg-pp-dark pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <span className="text-xs font-semibold text-pp-accent uppercase tracking-wider">
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
            <Link href={siteSettings.primaryCtaHref} className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1D4ED8] transition-colors">
              {siteSettings.primaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-dark [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-dark [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-dark/80 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-dark/80 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related services */}
          <div className="mt-12 pt-8 border-t border-pp-dark/10">
            <h3 className="text-lg font-bold text-pp-dark mb-4">Related Services</h3>
            <div className="flex flex-wrap gap-2">
              {services.slice(0, 4).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-pp-yellow/10 text-pp-dark px-4 py-2 rounded-full text-sm font-medium hover:bg-pp-yellow/20 transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
