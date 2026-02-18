import type { Metadata } from "next";
import Hero from "@/components/blocks/Hero";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import ReviewsGrid from "@/components/blocks/ReviewsGrid";
import AreaGrid from "@/components/blocks/AreaGrid";
import CTASection from "@/components/blocks/CTASection";
import { getFeaturedServices } from "@/content/services";
import { areas } from "@/content/areas";
import { getFeaturedReviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Peterborough Plumbers | Local Gas Safe Plumbing & Heating",
  description:
    "Peterborough's trusted plumbers with 30+ years experience. Gas Safe registered engineers for boiler service, heating, bathrooms, and emergency plumbing.",
  path: "/",
});

export default function HomePage() {
  const featuredServices = getFeaturedServices();
  const featuredReviews = getFeaturedReviews();

  return (
    <>
      <Hero />

      <ServiceGrid services={featuredServices} heading="Our Most Popular Services" />

      {/* Boiler offer banner */}
      <section className="py-12 bg-pp-yellow">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-pp-dark mb-3">
            Boiler Service from Just &pound;79
          </h2>
          <p className="text-pp-dark/80 mb-6 max-w-xl mx-auto">
            Keep your boiler running safely and efficiently. Annual servicing by Gas Safe registered engineers.
          </p>
          <Link
            href="/services/boiler-service"
            className="inline-block bg-pp-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-pp-dark/90 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-pp-dark text-center mb-12">
            Why Choose {siteSettings.companyName}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: `${siteSettings.yearsExperience} Years Experience`,
                desc: "Three decades of trusted plumbing service across Peterborough.",
              },
              {
                title: "Gas Safe Registered",
                desc: "All our engineers are fully qualified and Gas Safe registered.",
              },
              {
                title: `${siteSettings.engineersCount} Engineers`,
                desc: "A full team ready to respond quickly to your plumbing needs.",
              },
              {
                title: `${siteSettings.googleRating} Star Rating`,
                desc: "Consistently rated highly by our customers across Peterborough.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl bg-pp-offwhite border border-pp-dark/5"
              >
                <h3 className="text-xl font-bold text-pp-dark mb-2">{item.title}</h3>
                <p className="text-pp-dark/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsGrid reviews={featuredReviews} />

      <AreaGrid areas={areas} backgroundImage="/images/homepage/Areas We Cover Section.png" />

      <CTASection />
    </>
  );
}
