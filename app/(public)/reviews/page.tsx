import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ReviewsGrid from "@/components/blocks/ReviewsGrid";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Review } from "@/content/reviews";

export const metadata: Metadata = buildMetadata({
  title: "Peterborough Plumber Reviews | 4.6★ | 120+ Customers",
  description:
    "Read genuine reviews from 120+ customers across Peterborough. Gas Safe plumbers — 4.6★ rated. Trusted by homeowners and landlords across the city. Book today.",
  path: "/reviews",
  image: "/images/homepage/hero.png",
});

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([
    prisma.review.findMany({ orderBy: { createdAt: "asc" } }),
    getSiteSettings(),
  ]);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Reviews", href: "/reviews" },
  ]);

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.companyName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: settings.googleRating,
      reviewCount: settings.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.customerName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.body,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <section className="relative bg-pp-navy pt-28 pb-16" style={{ minHeight: "clamp(560px, 56vw, 900px)" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero.png"
            alt="Peterborough plumbing and heating — trusted local service"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Reviews", href: "/reviews" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Customer <span className="text-pp-teal">Reviews</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/contact" className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors">
              Book Now
            </Link>
            <a href={`tel:${settings.phoneHref}`} className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-pp-navy transition-colors duration-200">
              Call {settings.phone}
            </a>
          </div>
        </div>
      </section>

      <ReviewsGrid reviews={reviews as unknown as Review[]} heading="All Reviews" />

      <CTASection />
    </>
  );
}
