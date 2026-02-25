import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing Tips & Guides for Peterborough Homeowners",
  description:
    "Expert plumbing tips, guides and local advice from Peterborough Plumbers. Boiler care, landlord guides, emergency tips and more. Book a plumber today.",
  path: "/blog",
  image: "/images/homepage/plumbing-repairs.png",
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "Published" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="relative bg-pp-navy pt-28 pb-16" style={{ minHeight: "clamp(600px, 75vw, 1000px)" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/plumbing-repairs.png"
            alt="Plumbing tips and advice from Peterborough Plumbers"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Our <span className="text-pp-teal">Blog</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            Expert advice, tips, and local guides from our experienced plumbing team.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/contact" className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <span className="text-xs font-semibold text-pp-teal uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold text-pp-heading mt-2 mb-3 group-hover:text-pp-teal transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-pp-body/80 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-pp-teal font-semibold text-sm">Read More</span>
                    {post.publishedAt && (
                      <span className="text-xs text-pp-body/50">
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
