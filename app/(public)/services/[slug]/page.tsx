import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceSchema, faqSchema, breadcrumbSchema, howToSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FaqAccordion from "@/components/blocks/FaqAccordion";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Service } from "@/content/services";

// Semantic related-service map (slug → related slugs)
const relatedServiceMap: Record<string, string[]> = {
  "boiler-service": ["central-heating-services", "gas-safety-certificates", "emergency-plumber"],
  "gas-safety-certificates": ["boiler-service", "landlord-services", "central-heating-services"],
  "central-heating-services": ["boiler-service", "plumbing-installation", "plumbing-repairs"],
  "bathroom-installations": ["plumbing-installation", "plumbing-repairs", "damp-leak-detection"],
  "landlord-services": ["gas-safety-certificates", "boiler-service", "plumbing-repairs"],
  "emergency-plumber": ["plumbing-repairs", "drain-blockages", "damp-leak-detection"],
  "plumbing-installation": ["bathroom-installations", "central-heating-services", "plumbing-repairs"],
  "plumbing-repairs": ["emergency-plumber", "damp-leak-detection", "plumbing-installation"],
  "damp-leak-detection": ["plumbing-repairs", "emergency-plumber", "drain-blockages"],
  "drain-blockages": ["emergency-plumber", "damp-leak-detection", "plumbing-repairs"],
  "pre-purchase-plumbing-survey": ["boiler-service", "damp-leak-detection", "central-heating-services"],
};

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage ?? undefined,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [service, settings] = await Promise.all([
    prisma.service.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const faqs = service.faqs as { q: string; a: string }[];
  const heroImage = service.heroImage || service.image;

  // Fetch related services from DB
  const relatedSlugs = relatedServiceMap[slug] ?? [];
  const relatedRaw = relatedSlugs.length
    ? await prisma.service.findMany({ where: { slug: { in: relatedSlugs } } })
    : await prisma.service.findMany({ where: { slug: { not: slug } }, take: 3 });
  const related = relatedRaw as unknown as Service[];

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
              ...(slug === "boiler-service" && {
                offers: {
                  price: "79",
                  description: "Annual boiler service by Gas Safe registered engineers — from £79, no hidden fees.",
                },
              }),
            })
          ),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(faqs)),
          }}
        />
      )}
      {slug === "boiler-service" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              howToSchema({
                name: "How to Book a Boiler Service in Peterborough",
                description:
                  "Step-by-step guide to booking a professional annual boiler service with Peterborough Plumbers — Gas Safe registered engineers from £79.",
                steps: [
                  {
                    name: "Book online or by phone",
                    text: "Choose a convenient date and arrival window using our online booking tool or by calling us directly. Same-week appointments are typically available across all Peterborough postcodes (PE1–PE7).",
                  },
                  {
                    name: "Receive booking confirmation",
                    text: "You will receive an email confirmation immediately after booking, plus a reminder on the morning of your appointment.",
                  },
                  {
                    name: "Engineer arrives on time",
                    text: "Our Gas Safe registered engineer arrives within the agreed window carrying all necessary test equipment and Gas Safe photo ID.",
                  },
                  {
                    name: "21-point boiler inspection",
                    text: "The engineer carries out a comprehensive 30–60 minute service covering every critical component, including gas pressure, burner, heat exchanger, flue, combustion analysis, and safety devices.",
                  },
                  {
                    name: "Combustion analysis",
                    text: "Flue gas emissions are tested with a calibrated analyser to confirm safe combustion and identify any efficiency issues.",
                  },
                  {
                    name: "Receive written service record",
                    text: "On completion you receive a written service record signed by the engineer and bearing their Gas Safe registration number — valid for warranty and insurance purposes.",
                  },
                ],
              })
            ),
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
      <section className="relative bg-pp-navy pt-28 pb-16 hero-white-text" style={{ minHeight: "clamp(600px, 75vw, 1000px)" }}>
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
          <h1 className="text-4xl lg:text-5xl font-bold text-white hero-text">
            {service.heroHeading.includes("Peterborough")
              ? service.heroHeading
              : `${service.heroHeading} in Peterborough`}
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body hero-text">{service.heroSubheading}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors shadow-[0_4px_14px_rgba(201,168,76,0.35)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-pp-navy"
            >
              Book {service.name}
            </Link>
            <a
              href={`tel:${settings.phoneHref}`}
              className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white/70 hover:bg-white hover:text-pp-navy transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pp-navy"
            >
              Call {settings.phone}
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
      {faqs.length > 0 && (
        <div className="bg-pp-grey">
          <FaqAccordion faqs={faqs} />
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
