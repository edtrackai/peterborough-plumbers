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
import { getRelatedServiceSlugs } from "@/lib/seo/internalLinks";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";

// Helpful guides per service slug
const helpfulGuidesMap: Record<string, { slug: string; title: string }[]> = {
  "boiler-service": [
    { slug: "how-much-does-a-boiler-service-cost", title: "How Much Does a Boiler Service Cost?" },
    { slug: "how-to-repressurise-your-boiler",      title: "How to Repressurise Your Boiler" },
    { slug: "how-long-does-boiler-service-take",    title: "How Long Does a Boiler Service Take?" },
  ],
  "central-heating-services": [
    { slug: "central-heating-not-working",          title: "Central Heating Not Working?" },
    { slug: "what-is-a-power-flush",                title: "What Is a Power Flush?" },
    { slug: "radiators-not-heating-up",             title: "Radiators Not Heating Up?" },
  ],
};

// Fixed 6 area links shown on every service page
const servicePageAreas = [
  { slug: "city-centre", name: "City Centre" },
  { slug: "werrington",  name: "Werrington" },
  { slug: "hampton",     name: "Hampton" },
  { slug: "bretton",     name: "Bretton" },
  { slug: "orton",       name: "Orton" },
  { slug: "yaxley",      name: "Yaxley" },
] as const;

export const revalidate = 3600; // rebuild stale pages every hour

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
    absoluteTitle: true,
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

  // Fetch related services — only the fields ServiceGrid actually renders
  const relatedSelect = {
    slug: true,
    name: true,
    image: true,
    shortDescription: true,
  } as const;
  const relatedSlugs = getRelatedServiceSlugs(slug);
  const related = relatedSlugs.length
    ? await prisma.service.findMany({ where: { slug: { in: relatedSlugs } }, select: relatedSelect })
    : await prisma.service.findMany({ where: { slug: { not: slug } }, take: 4, select: relatedSelect });

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
                  description: "Annual boiler service by qualified engineers — clear upfront quote provided before work begins.",
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
                  "Step-by-step guide to booking a professional annual boiler service with Peterborough Plumbers — qualified engineers, clear upfront quotes.",
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
                    text: "Our qualified engineer arrives within the agreed window carrying all necessary test equipment and photo ID.",
                  },
                  {
                    name: "Comprehensive boiler inspection",
                    text: "The engineer carries out a thorough service covering every critical component, including gas pressure, burner, heat exchanger, flue, combustion analysis, and safety devices.",
                  },
                  {
                    name: "Combustion analysis",
                    text: "Flue gas emissions are tested with a calibrated analyser to confirm safe combustion and identify any efficiency issues.",
                  },
                  {
                    name: "Receive written service record",
                    text: "On completion you receive a written service record signed by the engineer — valid for warranty and insurance purposes.",
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
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">

        {/* Background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {heroImage && (
            <Image
              src={heroImage}
              alt={`${service.name} in Peterborough — qualified plumbing & heating engineers`}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
          )}
          {/* Deep directional overlay — heaviest on left for text legibility */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-44"
            style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }}
          />
          {/* Brand red glow — top-right */}
          <div
            className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-16 sm:pb-24">
          <Breadcrumbs
            items={[
              { name: "Services", href: "/services" },
              { name: service.name, href: `/services/${service.slug}` },
            ]}
            inverted
          />

          {/* Live availability badge */}
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">
              Available Today &mdash; Peterborough &amp; Surrounding Areas
            </span>
          </div>

          {/* H1 with gradient "Peterborough" */}
          <h1
            className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl"
            style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}
          >
            {service.heroHeading.includes("Peterborough") ? (
              <>
                {service.heroHeading.slice(0, service.heroHeading.indexOf("Peterborough"))}
                <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Peterborough
                </span>
                {service.heroHeading.slice(service.heroHeading.indexOf("Peterborough") + 12)}
              </>
            ) : (
              <>
                {service.heroHeading}
                {" in "}
                <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Peterborough
                </span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p
            className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text"
            style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}
          >
            {service.heroSubheading}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
                boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)",
              }}
            >
              Book {service.name}
            </Link>
            <a
              href={`tel:${settings.phoneHref}`}
              className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2"
            >
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
              {settings.phone}
            </a>
          </div>

          {/* Trust chips */}
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Qualified engineers", "Transparent call-out fees", "Clear upfront quotes"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Stats row */}
        </div>

        {/* Curved bottom wave — smooth transition to white content */}
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}
          >
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.content) }}
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
        <ServiceGrid services={related as unknown as Service[]} heading="Related Services" />
      )}

      {/* Areas we cover */}
      <section className="py-12 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-6">Areas We Cover in Peterborough</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {servicePageAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                <svg className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {area.name}
              </Link>
            ))}
          </div>
          <p className="mt-5">
            <Link href="/areas" className="text-sm font-semibold text-[var(--brand)] hover:underline">
              View all areas we cover →
            </Link>
          </p>
        </div>
      </section>

      {/* Helpful guides */}
      {helpfulGuidesMap[slug] && (
        <section className="py-12 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading mb-6">Helpful Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {helpfulGuidesMap[slug].map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                >
                  <svg className="h-4 w-4 text-[var(--brand)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {guide.title}
                </Link>
              ))}
            </div>
            <p className="mt-5">
              <Link href="/guides" className="text-sm font-semibold text-[var(--brand)] hover:underline">
                View all guides →
              </Link>
            </p>
          </div>
        </section>
      )}

      <CTASection
        heading={`Book ${service.name}`}
        subheading="Get a free, no-obligation quote today."
      />
    </>
  );
}
