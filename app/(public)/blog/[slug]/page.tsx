import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { getBlogBySlug, getAllBlogSlugs, type BlogPost } from "@/content/blog";
import { services } from "@/content/services";
import { siteSettings } from "@/content/settings";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

const categoryServiceMap: Record<BlogPost["category"], string[]> = {
  "Boiler & Heating": ["boiler-service", "central-heating-services", "gas-safety-certificates"],
  "Landlord & Legal": ["landlord-services", "gas-safety-certificates", "boiler-service"],
  "Emergency & Repairs": ["emergency-plumber", "plumbing-repairs", "damp-leak-detection"],
  "Local Guides": ["plumbing-installation", "bathroom-installations", "plumbing-repairs"],
};

function getRelatedServicesByCategory(category: BlogPost["category"]) {
  const slugs = categoryServiceMap[category] ?? [];
  return services.filter((s) => slugs.includes(s.slug));
}

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
    image: "/images/homepage/hero.png",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ])
          ),
        }}
      />
      <section className="bg-pp-navy pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
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
            <Link href={siteSettings.primaryCtaHref} className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors">
              {siteSettings.primaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related services */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-pp-heading mb-4">Related Services</h3>
            <div className="flex flex-wrap gap-2">
              {getRelatedServicesByCategory(post.category).map((s) => (
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
        </div>
      </section>

      <CTASection />
    </>
  );
}
