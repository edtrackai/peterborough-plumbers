import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings } from "@/content/settings";
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
      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text" style={{ minHeight: "clamp(580px, 72vw, 920px)" }}>
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/plumbing-repairs.png" alt="Plumbing tips and advice from Peterborough Plumbers" fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-28 pb-8">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Plumbing Blog &amp; Tips —{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Expert advice, tips, and local guides from our Gas Safe registered plumbing team. Honest, jargon-free, and always up to date.
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
            {["Gas Safe Registered", "No call-out charge", "Fixed, upfront pricing"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-0 max-w-xl">
            {[
              { value: `${siteSettings.googleRating}★`, label: "Google Rating" },
              { value: `${siteSettings.reviewCount}+`, label: "5-Star Reviews" },
              { value: siteSettings.yearsExperience, label: "Years Established" },
              { value: siteSettings.engineersCount, label: "Local Engineers" },
            ].map(({ value, label }, idx, arr) => (
              <div key={label} className={["flex flex-col", idx < arr.length - 1 ? "sm:pr-8 sm:mr-8 sm:border-r sm:border-white/[0.12]" : ""].join(" ")}>
                <dt className="text-white font-black leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>{value}</dt>
                <dd className="text-white/40 text-[0.67rem] mt-1.5 font-semibold uppercase tracking-[0.12em]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
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
