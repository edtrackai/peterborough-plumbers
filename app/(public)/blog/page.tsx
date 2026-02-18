import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { getPublishedPosts } from "@/content/blog";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing Tips & Advice | Our Blog",
  description:
    "Expert plumbing tips, advice, and local guides from Peterborough Plumbers. Boiler care, landlord guides, emergency tips, and more.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <section className="bg-pp-dark pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Our <span className="text-pp-yellow">Blog</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl">
            Expert advice, tips, and local guides from our experienced plumbing team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/book" className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1D4ED8] transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-pp-dark/5"
              >
                <div className="p-6">
                  <span className="text-xs font-semibold text-pp-accent uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold text-pp-dark mt-2 mb-3 group-hover:text-pp-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-pp-dark/70 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-pp-accent font-semibold text-sm">Read More</span>
                    {post.publishedAt && (
                      <span className="text-xs text-pp-dark/40">
                        {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
