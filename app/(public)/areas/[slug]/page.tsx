import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";

// ── Exact nearby-area mapping (ordered by proximity) ─────────────────────────
const nearbyAreaMap: Record<string, string[]> = {
  "city-centre":    ["werrington", "bretton", "hampton", "orton", "yaxley", "whittlesey"],
  "werrington":     ["bretton", "city-centre", "hampton", "orton", "yaxley", "whittlesey"],
  "bretton":        ["werrington", "city-centre", "hampton", "orton", "yaxley", "whittlesey"],
  "hampton":        ["orton", "city-centre", "werrington", "bretton", "yaxley", "whittlesey"],
  "orton":          ["hampton", "city-centre", "werrington", "bretton", "yaxley", "whittlesey"],
  "yaxley":         ["city-centre", "hampton", "orton", "werrington", "bretton", "stamford"],
  "whittlesey":     ["city-centre", "yaxley", "hampton", "orton", "werrington", "market-deeping"],
  "market-deeping": ["stamford", "yaxley", "whittlesey", "city-centre", "werrington", "hampton"],
  "stamford":       ["market-deeping", "yaxley", "whittlesey", "city-centre", "hampton", "orton"],
};

// ── Fixed 5 service links shown on every area page ───────────────────────────
const areaServiceLinks = [
  { slug: "emergency-plumber",        name: "Emergency Plumber" },
  { slug: "plumbing-repairs",         name: "Plumbing Repairs" },
  { slug: "boiler-service",           name: "Boiler Service" },
  { slug: "central-heating-services", name: "Central Heating" },
  { slug: "drain-blockages",          name: "Drain Blockages" },
] as const;

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

  const nearbySlugs = nearbyAreaMap[slug] ?? [];

  const [areaReviews, nearbyAreasRaw] = await Promise.all([
    prisma.review.findMany({
      where: { areaName: { equals: area.name, mode: "insensitive" } },
    }),
    prisma.area.findMany({
      where: { slug: { in: nearbySlugs } },
      select: { name: true, slug: true },
    }),
  ]);

  const nearbyAreas = nearbySlugs
    .map((s) => nearbyAreasRaw.find((a) => a.slug === s))
    .filter((a): a is { name: string; slug: string } => !!a);

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
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/hero.png" alt={`Plumber in ${area.name}, Peterborough — qualified plumbing & heating engineers`} fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ name: "Areas", href: "/areas" }, { name: area.name, href: `/areas/${area.slug}` }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Plumber in{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {area.name}
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            {area.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Book Now
            </Link>
            <a href={`tel:${settings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {settings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Qualified engineers", "Transparent call-out fees", "Clear upfront quotes"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
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

      {/* Nearby areas */}
      {nearbyAreas.length > 0 && (
        <section className="py-12 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading mb-6">Nearby Areas We Cover</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nearbyAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/areas/${a.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                >
                  <svg className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {a.name}
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
      )}

      {/* Services in this area */}
      <section className="py-12 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-6">Our Services in {area.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {areaServiceLinks.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                <svg className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {svc.name}
              </Link>
            ))}
          </div>
          <p className="mt-5">
            <Link href="/services" className="text-sm font-semibold text-[var(--brand)] hover:underline">
              View all our services →
            </Link>
          </p>
        </div>
      </section>

      <CTASection
        heading={`Need a Plumber in ${area.name}?`}
        subheading={`Call ${settings.phone} or book online for plumbing & heating support in ${area.name} and surrounding areas.`}
      />
    </>
  );
}
