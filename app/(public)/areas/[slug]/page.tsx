import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Service } from "@/content/services";

export async function generateStaticParams() {
  const areas = await prisma.area.findMany({ select: { slug: true } });
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await prisma.area.findUnique({ where: { slug } });
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

  const [area, settings] = await Promise.all([
    prisma.area.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!area) notFound();

  const landmarks = area.landmarks as string[];
  const postcodes = area.postcodes as string[];
  const faqs = area.faqs as { q: string; a: string }[];

  const [areaReviews, servicesRaw] = await Promise.all([
    prisma.review.findMany({
      where: { areaName: { equals: area.name, mode: "insensitive" } },
    }),
    prisma.service.findMany({ take: 6, orderBy: { sortOrder: "asc" } }),
  ]);

  const services = servicesRaw as unknown as Service[];

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
            name: settings.companyName,
            telephone: settings.phoneHref,
            areaServed: {
              "@type": "City",
              name: area.name,
              containedInPlace: { "@type": "City", name: "Peterborough" },
            },
            url: `${settings.siteUrl}/areas/${area.slug}`,
          }),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
        />
      )}

      {/* Hero */}
      <section className="relative bg-pp-navy pt-28 pb-16 hero-white-text" style={{ minHeight: "clamp(560px, 56vw, 900px)" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero.png"
            alt={`Plumber in ${area.name}, Peterborough — Gas Safe registered engineers`}
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
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
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors"
            >
              Book Now
            </Link>
            <a
              href={`tel:${settings.phoneHref}`}
              className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-pp-navy transition-colors duration-200"
            >
              Call {settings.phone}
            </a>
          </div>
          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap gap-5 text-sm hero-label">
            {[
              "Gas Safe Registered",
              "No Hidden Fees",
              `${settings.yearsExperience} Years Experience`,
              "Same-Day Available",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-pp-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Rich content section */}
      {area.content && (
        <section className="py-16 lg:py-20 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-4">
            <div
              className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1 [&_strong]:text-pp-heading"
              dangerouslySetInnerHTML={{ __html: area.content }}
            />
          </div>
        </section>
      )}

      {/* Area details: landmarks + postcodes */}
      <section className="py-14 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 space-y-10">
          {/* Postcodes */}
          <div>
            <h2 className="text-2xl font-bold text-pp-heading mb-4">Postcodes We Cover in {area.name}</h2>
            <div className="flex flex-wrap gap-2">
              {postcodes.map((p) => (
                <span
                  key={p}
                  className="bg-pp-navy text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Landmarks */}
          <div>
            <h2 className="text-2xl font-bold text-pp-heading mb-4">Local Landmarks &amp; Areas</h2>
            <div className="flex flex-wrap gap-2">
              {landmarks.map((l) => (
                <span
                  key={l}
                  className="bg-white border border-[var(--border)] text-pp-heading px-4 py-2 rounded-full text-sm font-medium"
                >
                  📍 {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews for this area */}
      {areaReviews.length > 0 && (
        <section className="py-14 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading mb-8">
              Customer Reviews from {area.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {areaReviews.map((r) => (
                <div key={r.id} className="bg-white rounded-xl p-6 border border-[var(--border)]">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-pp-body mb-3 italic">&ldquo;{r.body}&rdquo;</p>
                  <p className="text-sm font-semibold text-pp-heading">{r.customerName}</p>
                  <p className="text-xs text-[var(--muted)]">{r.areaName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-14 bg-[var(--surface-alt)] border-b border-[var(--border)]">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading text-center mb-8">
              FAQs — Plumber in {area.name}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-[var(--border)] bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-pp-heading text-sm select-none">
                    {faq.q}
                    <svg
                      className="h-5 w-5 text-[var(--brand)] shrink-0 group-open:rotate-180 transition-transform duration-200 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 pt-2 text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceGrid services={services} heading={`Our Services in ${area.name}`} />

      <CTASection
        heading={`Need a Plumber in ${area.name}?`}
        subheading={`Call ${settings.phone} or book online for fast, reliable Gas Safe registered service in ${area.name}.`}
      />
    </>
  );
}
