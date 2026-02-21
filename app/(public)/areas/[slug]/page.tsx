import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import { getAreaBySlug, getAllAreaSlugs } from "@/content/areas";
import { services } from "@/content/services";
import { reviews } from "@/content/reviews";
import { siteSettings } from "@/content/settings";

export function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/areas/${area.slug}`,
    image: "/images/homepage/hero.png",
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const areaReviews = reviews.filter(
    (r) => r.areaName.toLowerCase() === area.name.toLowerCase()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Areas", href: "/areas" },
            { name: area.name, href: `/areas/${area.slug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Plumber",
            name: siteSettings.companyName,
            telephone: siteSettings.phone,
            areaServed: {
              "@type": "City",
              name: area.name,
              containedInPlace: {
                "@type": "City",
                name: "Peterborough",
              },
            },
            url: `${siteSettings.siteUrl}/areas/${area.slug}`,
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-pp-navy pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: "Areas", href: "/areas" },
              { name: area.name, href: `/areas/${area.slug}` },
            ]}
            inverted
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Plumber in <span className="text-pp-teal">{area.name}</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">{area.intro}</p>
          <div className="mt-8">
            <Link
              href="/book"
              className="bg-pp-teal text-white px-6 py-3 rounded-lg font-bold hover:bg-pp-teal-dark transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Area details */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 space-y-10">
          {/* Landmarks */}
          <div>
            <h2 className="text-2xl font-bold text-pp-heading mb-4">Local Landmarks</h2>
            <div className="flex flex-wrap gap-2">
              {area.landmarks.map((l) => (
                <span
                  key={l}
                  className="bg-pp-teal/10 text-pp-heading px-4 py-2 rounded-full text-sm font-medium"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Postcodes */}
          <div>
            <h2 className="text-2xl font-bold text-pp-heading mb-4">Postcodes Covered</h2>
            <div className="flex flex-wrap gap-2">
              {area.postcodes.map((p) => (
                <span
                  key={p}
                  className="bg-pp-navy text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews for this area */}
          {areaReviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-pp-heading mb-4">
                Reviews from {area.name}
              </h2>
              <div className="space-y-4">
                {areaReviews.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                    <p className="text-pp-body mb-3">&ldquo;{r.body}&rdquo;</p>
                    <p className="text-sm font-semibold text-pp-heading">{r.customerName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ServiceGrid
        services={services.slice(0, 6)}
        heading={`Services in ${area.name}`}
      />

      <CTASection
        heading={`Need a Plumber in ${area.name}?`}
        subheading={`Call ${siteSettings.phone} or book online for fast, reliable service.`}
      />
    </>
  );
}
