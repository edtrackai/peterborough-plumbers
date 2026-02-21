import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { getRelatedServices } from "@/lib/seo/internalLinks";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FaqAccordion from "@/components/blocks/FaqAccordion";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import { services, getServiceBySlug, getAllServiceSlugs } from "@/content/services";
import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/content/settings";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug, 3);
  const heroImage = service.heroImage || service.image;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: service.name,
              description: service.shortDescription,
              slug: service.slug,
            })
          ),
        }}
      />
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(service.faqs)),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-pp-navy pt-28 pb-16">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${service.name} in Peterborough — professional Gas Safe registered engineers`}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
            {/* hero-overlay: left-to-right dark gradient; uniform on mobile */}
            <div className="absolute inset-0 hero-overlay" />
          </div>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ]}
            inverted
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-white hero-text">{service.heroHeading}</h1>
          <p className="mt-4 text-lg max-w-2xl hero-body hero-text">{service.heroSubheading}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`/book?service=${service.slug}`}
              className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors shadow-[0_4px_14px_rgba(201,168,76,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-pp-navy"
            >
              Book {service.name}
            </Link>
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white/70 hover:bg-white hover:text-pp-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pp-navy"
            >
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <div className="bg-pp-grey">
          <FaqAccordion faqs={service.faqs} />
        </div>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <ServiceGrid services={related} heading="Related Services" />
      )}

      <CTASection
        heading={`Book ${service.name}`}
        subheading="Get a free, no-obligation quote today."
      />
    </>
  );
}
