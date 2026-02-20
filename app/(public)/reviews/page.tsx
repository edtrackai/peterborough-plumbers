import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ReviewsGrid from "@/components/blocks/ReviewsGrid";
import CTASection from "@/components/blocks/CTASection";
import { reviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Customer Reviews | Local Plumber Ratings",
  description:
    "Read what our customers say about Peterborough Plumbers. Genuine reviews from homeowners and landlords across Peterborough.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-pp-dark pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Reviews", href: "/reviews" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Customer <span className="text-pp-yellow">Reviews</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl">
            Don&apos;t just take our word for it. Here&apos;s what our customers have to say.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/book" className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#1D4ED8] transition-colors">
              Book Now
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="bg-pp-yellow text-pp-dark px-6 py-3 rounded-lg font-bold hover:bg-pp-yellow/90 transition-colors">
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      <ReviewsGrid reviews={reviews} heading="All Reviews" />

      <CTASection />
    </>
  );
}
