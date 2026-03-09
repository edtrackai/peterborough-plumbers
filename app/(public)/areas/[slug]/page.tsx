import type { Metadata } from "next";
import PageHeroShell from "@/components/hero/PageHeroShell";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import NextStepsLinks from "@/components/NextStepsLinks";
import { areaGuideMap } from "@/lib/seo/internalLinks";

// ── Per-area geographic coordinates ──────────────────────────────────────────
// region: GB-PTE = Peterborough (Cambridgeshire); GB-LIN = Lincolnshire
const areaGeo: Record<string, { lat: number; lng: number; placename: string; region?: string }> = {
  "city-centre":    { lat: 52.5735, lng: -0.2404, placename: "Peterborough City Centre" },
  "werrington":     { lat: 52.6044, lng: -0.2344, placename: "Werrington, Peterborough" },
  "bretton":        { lat: 52.5903, lng: -0.2778, placename: "Bretton, Peterborough" },
  "hampton":        { lat: 52.5476, lng: -0.2404, placename: "Hampton, Peterborough" },
  "orton":          { lat: 52.5531, lng: -0.2844, placename: "Orton, Peterborough" },
  "yaxley":         { lat: 52.5086, lng: -0.2417, placename: "Yaxley, Peterborough" },
  "whittlesey":     { lat: 52.5583, lng: -0.1267, placename: "Whittlesey, Peterborough" },
  "market-deeping": { lat: 52.6774, lng: -0.3171, placename: "Market Deeping, Lincolnshire", region: "GB-LIN" },
  "stamford":       { lat: 52.6536, lng: -0.4769, placename: "Stamford, Lincolnshire",        region: "GB-LIN" },
  // ── Village areas ────────────────────────────────────────────────────────────
  "longthorpe":     { lat: 52.5742, lng: -0.2776, placename: "Longthorpe, Peterborough" },
  "eye":            { lat: 52.6022, lng: -0.1666, placename: "Eye, Peterborough" },
  "glinton":        { lat: 52.6273, lng: -0.2614, placename: "Glinton, Peterborough" },
  "thorney":        { lat: 52.6165, lng: -0.1158, placename: "Thorney, Cambridgeshire" },
  "crowland":       { lat: 52.6768, lng: -0.1679, placename: "Crowland, Lincolnshire",         region: "GB-LIN" },
};

// ── Exact nearby-area mapping (ordered by proximity) ─────────────────────────
const nearbyAreaMap: Record<string, string[]> = {
  "city-centre":    ["werrington", "bretton", "hampton", "orton", "longthorpe", "yaxley"],
  "werrington":     ["bretton", "city-centre", "glinton", "hampton", "orton", "eye"],
  "bretton":        ["longthorpe", "werrington", "city-centre", "hampton", "orton", "yaxley"],
  "hampton":        ["orton", "city-centre", "werrington", "bretton", "yaxley", "whittlesey"],
  "orton":          ["hampton", "city-centre", "werrington", "bretton", "yaxley", "longthorpe"],
  "yaxley":         ["city-centre", "hampton", "orton", "werrington", "bretton", "stamford"],
  "whittlesey":     ["city-centre", "yaxley", "thorney", "hampton", "orton", "market-deeping"],
  "market-deeping": ["stamford", "glinton", "yaxley", "whittlesey", "city-centre", "crowland"],
  "stamford":       ["market-deeping", "crowland", "yaxley", "whittlesey", "city-centre", "hampton"],
  // ── Village areas ────────────────────────────────────────────────────────────
  "longthorpe":     ["bretton", "city-centre", "orton", "hampton", "werrington"],
  "eye":            ["werrington", "city-centre", "glinton", "bretton", "whittlesey"],
  "glinton":        ["werrington", "city-centre", "eye", "market-deeping", "bretton"],
  "thorney":        ["whittlesey", "city-centre", "market-deeping", "eye", "yaxley"],
  "crowland":       ["market-deeping", "whittlesey", "stamford", "thorney", "yaxley"],
};

// ── Areas that are sub-districts of Peterborough (get ", Peterborough" in H1) ─
// Stamford (PE9) and Market Deeping (PE6) are separate Lincolnshire towns — excluded.
// "city-centre" slug resolves to "Peterborough City Centre" which already contains the city name.
const peterboroughDistricts = new Set([
  "werrington", "bretton", "hampton", "orton", "yaxley", "whittlesey", "longthorpe",
]);

// ── Service links shown on every area page ───────────────────────────────────
const areaServiceLinks = [
  { slug: "emergency-plumber",        name: "Emergency Plumber" },
  { slug: "plumbing-repairs",         name: "Plumbing Repairs" },
  { slug: "boiler-service",           name: "Boiler Service" },
  { slug: "central-heating-services", name: "Central Heating" },
  { slug: "drain-blockages",          name: "Drain Blockages" },
  { slug: "gas-safety-certificates",  name: "Gas Safety Certificates" },
  { slug: "bathroom-installations",   name: "Bathroom Installations" },
  { slug: "landlord-services",        name: "Landlord Services" },
] as const;

export const revalidate = 3600; // rebuild stale pages every hour

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
    absoluteTitle: true,
    image: "/images/homepage/hero.webp",
    geo: areaGeo[slug],
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
            url: `${settings.siteUrl}/areas/${area.slug}`,
            image: `${settings.siteUrl}/images/homepage/hero.webp`,
            priceRange: "££",
            address: {
              "@type": "PostalAddress",
              streetAddress: "3 Saville Road",
              addressLocality: "Peterborough",
              postalCode: "PE3 7PR",
              addressCountry: "GB",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: parseFloat(settings.googleRating),
              reviewCount: parseInt(settings.reviewCount, 10),
              bestRating: 5,
              worstRating: 1,
            },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "17:00" },
            ],
            areaServed: {
              "@type": "City",
              name: area.name,
              containedInPlace: { "@type": "City", name: "Peterborough" },
            },
            ...(areaGeo[area.slug] && {
              geo: {
                "@type": "GeoCoordinates",
                latitude: areaGeo[area.slug].lat,
                longitude: areaGeo[area.slug].lng,
              },
            }),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `Plumbing & Heating Services in ${area.name}`,
              itemListElement: areaServiceLinks.map((svc) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: `${svc.name} in ${area.name}`,
                  url: `${settings.siteUrl}/services/${svc.slug}`,
                },
              })),
            },
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
      <PageHeroShell imageSrc="/images/homepage/hero.webp" imageAlt={`Plumber in ${area.name}, Peterborough — qualified plumbing & heating engineers`} priority>
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
            {peterboroughDistricts.has(slug) && ", Peterborough"}
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
      </PageHeroShell>

      {/* Rich content section */}
      {area.content && (
        <section className="py-16 lg:py-20 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-4xl px-4">
            <div
              className="prose prose-lg max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-pp-heading [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-pp-heading [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-pp-body [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-pp-body [&_li]:mb-1 [&_strong]:text-pp-heading"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(area.content) }}
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
          <h2 className="text-2xl font-bold text-pp-heading mb-6">Plumbing Services in {area.name}</h2>
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
                {svc.name} in {area.name}
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

      {/* Helpful guides for this area */}
      {areaGuideMap[slug] && (
        <section className="py-12 bg-white border-b border-[var(--border)]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl font-bold text-pp-heading mb-6">Helpful Plumbing Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {areaGuideMap[slug].map((guide) => (
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

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <section className="bg-white py-10 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "⚡", title: "Emergency Call-Outs", body: "Same-day emergency response available across all PE postcodes." },
              { icon: "✅", title: "Gas Safe Registered",  body: "All engineers hold Gas Safe Registration for safe, legal gas work." },
              { icon: "£",  title: "Upfront Pricing",      body: "Clear quotes before any work starts — no hidden extras, ever." },
              { icon: "🚐", title: "No Travel Surcharge",  body: "No travel fees within our standard service zone." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
                <span className="text-xl leading-none" aria-hidden="true">{item.icon}</span>
                <p className="text-sm font-semibold text-pp-heading">{item.title}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-[var(--muted)]">
            Questions?{" "}
            <Link href="/pricing" className="text-[var(--brand)] font-medium hover:underline">View our pricing guide</Link>
            {" "}or{" "}
            <Link href="/faqs" className="text-[var(--brand)] font-medium hover:underline">read our FAQs</Link>.
          </p>
        </div>
      </section>

      <NextStepsLinks variant="area" />

      <ImageCTASection
        heading={`Need a Plumber in ${area.name}?`}
        subheading={`Call ${settings.phone} or book online for plumbing & heating support in ${area.name} and surrounding areas.`}
        imageSrc="/images/areas/ready-to-book-your-plumber.webp"
        imageAlt={`Peterborough Plumbers engineer serving ${area.name}`}
      />
    </>
  );
}
