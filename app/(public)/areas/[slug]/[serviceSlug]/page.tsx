import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import PageHeroShell from "@/components/hero/PageHeroShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";

export const revalidate = 3600;

// ── Geographic coords (shared with parent area page) ─────────────────────────
const areaGeo: Record<string, { lat: number; lng: number }> = {
  "city-centre":    { lat: 52.5735, lng: -0.2404 },
  "werrington":     { lat: 52.6044, lng: -0.2344 },
  "bretton":        { lat: 52.5903, lng: -0.2778 },
  "hampton":        { lat: 52.5476, lng: -0.2404 },
  "orton":          { lat: 52.5531, lng: -0.2844 },
  "yaxley":         { lat: 52.5086, lng: -0.2417 },
  "whittlesey":     { lat: 52.5583, lng: -0.1267 },
  "market-deeping": { lat: 52.6774, lng: -0.3171 },
  "stamford":       { lat: 52.6536, lng: -0.4769 },
  "longthorpe":     { lat: 52.5742, lng: -0.2776 },
  "eye":            { lat: 52.6022, lng: -0.1666 },
  "glinton":        { lat: 52.6273, lng: -0.2614 },
  "thorney":        { lat: 52.6165, lng: -0.1158 },
  "crowland":       { lat: 52.6768, lng: -0.1679 },
};

// ── Service-specific content snippets ────────────────────────────────────────
const serviceContent: Record<string, {
  whatIncluded: string[];
  localWhy: string;
  faq3q: string;
  faq3a: string;
}> = {
  "boiler-service": {
    whatIncluded: [
      "Full inspection of the heat exchanger and burner",
      "Flue gas analysis and combustion efficiency check",
      "Safety devices tested — overheat thermostat, pressure relief valve",
      "Gas pressure and flow rate verified",
      "Boiler service record updated — certificate issued",
    ],
    localWhy: "Peterborough's hard water (300 mg/L calcium) accelerates limescale build-up inside boilers. Annual servicing catches limescale and sludge before they cut efficiency or trigger a breakdown.",
    faq3q: "Does my boiler warranty require an annual service?",
    faq3a: "Most manufacturers require annual servicing by a Gas Safe registered engineer to keep the warranty valid. We issue a service record you can present if a warranty claim arises.",
  },
  "gas-safety-certificates": {
    whatIncluded: [
      "Inspection of all gas appliances in the property",
      "Flue and ventilation checks",
      "Gas tightness test on all pipework",
      "Operating pressure and burner performance verified",
      "CP12 certificate issued — legally required record for landlords",
    ],
    localWhy: "Landlords in Peterborough must provide tenants with a valid CP12 certificate within 28 days of each annual check. With a large student and rental population across PE1–PE7, we handle portfolio inspections efficiently.",
    faq3q: "How long does a gas safety certificate take?",
    faq3a: "A standard CP12 inspection takes 30–60 minutes depending on the number of appliances. We issue your certificate on the day and can provide digital copies for your records.",
  },
  "central-heating-services": {
    whatIncluded: [
      "Boiler pressure check and top-up if required",
      "All radiators balanced for even heat distribution",
      "Thermostatic radiator valves (TRVs) inspected and replaced if faulty",
      "Power flush available to remove sludge and scale",
      "Smart thermostat installation and setup",
    ],
    localWhy: "Hard water throughout the Peterborough area leads to magnetite sludge in heating circuits faster than soft-water regions. A power flush every 5–8 years keeps your system performing at full efficiency.",
    faq3q: "How do I know if I need a power flush?",
    faq3a: "Cold spots on radiators, noisy pipework (kettling), and slow heating are all signs of sludge build-up. We can assess your system and advise whether a power flush is cost-effective versus a chemical inhibitor treatment.",
  },
  "bathroom-installations": {
    whatIncluded: [
      "Full strip-out and disposal of existing bathroom",
      "New pipework run to suit layout changes",
      "Supply and fit of bath, shower, basin, WC, and accessories",
      "Tiling, flooring, and waterproofing",
      "Final sign-off and customer walkthrough",
    ],
    localWhy: "Many Peterborough homes — particularly the 1970s estates in Bretton, Werrington, and Orton — still have original bathrooms. We regularly modernise these properties and are familiar with the pipework layouts common to that era.",
    faq3q: "How long does a full bathroom installation take?",
    faq3a: "A standard bathroom replacement takes 5–8 working days. More complex jobs involving layout changes or structural work can take up to two weeks. We always agree a timeline before starting.",
  },
  "landlord-services": {
    whatIncluded: [
      "Annual CP12 gas safety certificate",
      "Boiler service and efficiency check",
      "Plumbing inspection — all visible pipework and fittings",
      "Drainage check — no slow-drain or blockage issues",
      "Priority response for tenant call-outs",
    ],
    localWhy: "With thousands of rental properties across Peterborough — from student lets near the city centre to family homes in Hampton and Yaxley — we provide reliable landlord compliance services that keep your portfolio legal and your tenants comfortable.",
    faq3q: "Can you manage annual certificates for multiple properties?",
    faq3a: "Yes. We offer portfolio management for landlords with multiple properties. We track renewal dates, send reminders, and coordinate visits to minimise disruption to tenants.",
  },
  "emergency-plumber": {
    whatIncluded: [
      "Same-day response for burst pipes and flooding",
      "Emergency drain unblocking",
      "No hot water or heating — rapid diagnosis and fix",
      "Isolation of leak source to prevent damage",
      "Temporary or permanent repair — your choice",
    ],
    localWhy: "Older Victorian and Edwardian pipework in Peterborough city centre, combined with frost-prone fenland winters, means burst pipes are a genuine seasonal risk. Our engineers know the local pipe infrastructure and respond fast.",
    faq3q: "Do you charge a call-out fee for emergencies?",
    faq3a: "We charge a standard call-out fee which is confirmed before we attend — never a surprise. The fee covers diagnosis and the first 30 minutes of labour. All further costs are quoted before work begins.",
  },
  "plumbing-repairs": {
    whatIncluded: [
      "Dripping tap — cartridge or ceramic disc replacement",
      "Leaking pipe joints — re-seal or replace",
      "Faulty stop valve or isolation valve replacement",
      "Leaking radiator valve — repacking or new valve",
      "Running toilet — ballcock, fill valve, or flush valve repair",
    ],
    localWhy: "Peterborough's hard water causes mineral deposits in tap cartridges and valve seatings, leading to drips sooner than in softer-water areas. Our engineers stock common cartridges and valves for same-visit repairs in most cases.",
    faq3q: "Is it worth repairing an old tap or replacing it?",
    faq3a: "For taps under 15 years old, a cartridge replacement is usually the most cost-effective option. For older taps with corroded bodies or incompatible parts, replacement is often more economical long-term — we'll advise honestly.",
  },
  "plumbing-installation": {
    whatIncluded: [
      "New radiator supply and installation",
      "Outside tap installation — frost-protected",
      "Washing machine or dishwasher connection",
      "New toilet or basin installation",
      "Expansion of hot/cold pipework for extensions or conversions",
    ],
    localWhy: "New-build properties in Hampton, Cardea, and Stanground are fitted with plastic push-fit pipework. Older properties in Bretton and Werrington often need copper upgrades when extending. Our engineers work across both systems.",
    faq3q: "Do you need to drain the system to fit a new radiator?",
    faq3a: "In most cases we use a freeze-and-drain method to avoid fully emptying the system, minimising disruption. For major pipework changes we plan the drain and refill efficiently, usually completing in a single visit.",
  },
  "damp-leak-detection": {
    whatIncluded: [
      "Thermal imaging camera survey — pinpoints hidden leaks",
      "Moisture meter readings across suspect areas",
      "Trace and access — locate the source before any cutting",
      "Written report with photos for insurance purposes",
      "Repair recommendation or direct repair if agreed",
    ],
    localWhy: "Peterborough's fenland water table and clay-heavy soils increase ground moisture pressure on older properties. Rising damp is common in pre-1950s housing in the city centre and surrounding villages.",
    faq3q: "Will you need to cut walls or floors to find the leak?",
    faq3a: "We always use non-invasive detection methods first — thermal imaging, moisture meters, and acoustic tools. We only recommend access works when non-invasive methods have confirmed the location, minimising unnecessary damage.",
  },
  "drain-blockages": {
    whatIncluded: [
      "CCTV drain survey to locate blockage or damage",
      "High-pressure water jetting to clear the blockage",
      "Root cutting for root-invaded drains",
      "Drain rod clearance for minor blockages",
      "Post-clearance flush and camera check",
    ],
    localWhy: "Older clay drainage systems in pre-1980s Peterborough properties are prone to root intrusion from mature trees. In the fenland villages, tree-root ingress into drainage runs is one of the most common causes of repeat blockages.",
    faq3q: "How do I know if it's a shared drain or my responsibility?",
    faq3a: "Private drains within your property boundary are your responsibility. Shared sewers — which serve more than one property — are the responsibility of Anglian Water. We can advise after a CCTV survey and liaise with Anglian Water on your behalf if required.",
  },
  "pre-purchase-plumbing-survey": {
    whatIncluded: [
      "Visual inspection of all accessible pipework",
      "Boiler age, condition, and pressure check",
      "Radiator and heating circuit assessment",
      "Drainage flow test on all outlets",
      "Written survey report within 24 hours",
    ],
    localWhy: "Peterborough's housing mix — from 1930s semis to 1970s new-town estates and modern new-builds — means plumbing condition varies enormously. A pre-purchase survey identifies issues before exchange, saving potentially thousands in unexpected repair costs.",
    faq3q: "How long does a pre-purchase survey take?",
    faq3a: "A standard survey of a 3–4 bedroom property takes 1.5–2 hours. We provide a written report with photographs within 24 hours, which you can use in purchase negotiations or to plan post-move works.",
  },
};

// ── Other services shown as related links ─────────────────────────────────────
const allServiceLinks = [
  { slug: "emergency-plumber",        name: "Emergency Plumber" },
  { slug: "plumbing-repairs",         name: "Plumbing Repairs" },
  { slug: "boiler-service",           name: "Boiler Service" },
  { slug: "central-heating-services", name: "Central Heating" },
  { slug: "drain-blockages",          name: "Drain Blockages" },
  { slug: "gas-safety-certificates",  name: "Gas Safety Certificates" },
  { slug: "bathroom-installations",   name: "Bathroom Installations" },
  { slug: "landlord-services",        name: "Landlord Services" },
  { slug: "plumbing-installation",    name: "Plumbing Installation" },
  { slug: "damp-leak-detection",      name: "Damp & Leak Detection" },
  { slug: "pre-purchase-plumbing-survey", name: "Pre-Purchase Survey" },
] as const;

// ── generateStaticParams ──────────────────────────────────────────────────────
export async function generateStaticParams() {
  const [areas, services] = await Promise.all([
    prisma.area.findMany({ select: { slug: true } }),
    prisma.service.findMany({ select: { slug: true } }),
  ]);
  const params: { slug: string; serviceSlug: string }[] = [];
  for (const area of areas) {
    for (const service of services) {
      params.push({ slug: area.slug, serviceSlug: service.slug });
    }
  }
  return params;
}

// ── generateMetadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const [area, service] = await Promise.all([
    prisma.area.findUnique({ where: { slug } }),
    prisma.service.findUnique({ where: { slug: serviceSlug } }),
  ]);
  if (!area || !service) return {};

  const title = `${service.name} in ${area.name}`;
  const description = `Need ${service.name.toLowerCase()} in ${area.name}? Local Gas Safe engineers, same-day availability, transparent pricing. Call or book online — no call-out fee surprises.`;

  return buildMetadata({
    title,
    description: description.slice(0, 160),
    path: `/areas/${slug}/${serviceSlug}`,
    image: `/images/services/${serviceSlug}/hero.webp`,
    geo: areaGeo[slug] ? { ...areaGeo[slug], placename: area.name } : undefined,
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function AreaServicePage({
  params,
}: {
  params: Promise<{ slug: string; serviceSlug: string }>;
}) {
  const { slug, serviceSlug } = await params;

  const [area, service, settings] = await Promise.all([
    prisma.area.findUnique({ where: { slug } }),
    prisma.service.findUnique({ where: { slug: serviceSlug } }),
    getSiteSettings(),
  ]);

  if (!area || !service) notFound();

  const postcodes = area.postcodes as string[];
  const landmarks = area.landmarks as string[];
  const svcContent = serviceContent[serviceSlug];

  // Generate 3 FAQs for this combo
  const faqs = [
    {
      q: `How quickly can you respond to ${service.name.toLowerCase()} calls in ${area.name}?`,
      a: `We aim to attend ${area.name} call-outs the same day for urgent jobs, or within 24–48 hours for non-emergency work. ${area.name} is within our standard service zone covering ${postcodes.join(", ")} postcodes.`,
    },
    {
      q: `Do you charge a call-out fee for ${service.name.toLowerCase()} in ${area.name}?`,
      a: `Our call-out fee is always confirmed before we attend — you are never charged without agreeing the cost upfront. There are no hidden extras. All work is quoted before it starts.`,
    },
    ...(svcContent ? [{
      q: svcContent.faq3q,
      a: svcContent.faq3a,
    }] : []),
  ];

  // Related services (exclude current)
  const relatedServices = allServiceLinks.filter((s) => s.slug !== serviceSlug).slice(0, 6);

  return (
    <>
      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home",       href: "/" },
            { name: "Areas",      href: "/areas" },
            { name: area.name,    href: `/areas/${slug}` },
            { name: service.name, href: `/areas/${slug}/${serviceSlug}` },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Plumber",
                name: settings.companyName,
                telephone: settings.phoneHref,
                url: `${settings.siteUrl}/areas/${slug}/${serviceSlug}`,
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
                areaServed: {
                  "@type": "City",
                  name: area.name,
                  containedInPlace: { "@type": "City", name: "Peterborough" },
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: `${service.name} in ${area.name}`,
                  itemListElement: [{
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: `${service.name} in ${area.name}`,
                      description: service.shortDescription,
                      url: `${settings.siteUrl}/areas/${slug}/${serviceSlug}`,
                    },
                  }],
                },
              },
            ],
          }),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
        />
      )}

      {/* ── Hero ── */}
      <PageHeroShell
        imageSrc={`/images/services/${serviceSlug}/hero.webp`}
        imageAlt={`${service.name} in ${area.name} — Peterborough Plumbers engineer at work`}
        priority
      >
        <Breadcrumbs
          items={[
            { name: "Areas",      href: "/areas" },
            { name: area.name,    href: `/areas/${slug}` },
            { name: service.name, href: `/areas/${slug}/${serviceSlug}` },
          ]}
          inverted
        />
        <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">
            Available Today &mdash; {area.name} &amp; Surrounding Areas
          </span>
        </div>
        <h1
          className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          {service.name} in{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {area.name}
          </span>
        </h1>
        <p
          className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text"
          style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}
        >
          {service.shortDescription} Serving {area.name} ({postcodes.join(", ")}) and nearby areas.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
              boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)",
            }}
          >
            Book Now
          </Link>
          <a
            href={`tel:${settings.phoneHref}`}
            className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            {settings.phone}
          </a>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
          {["Same-day availability", "Upfront pricing", "Gas Safe registered"].map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
              <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </PageHeroShell>

      {/* ── Service overview ── */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-4">
            {service.name} in {area.name} — What&apos;s Included
          </h2>
          <p className="text-pp-body leading-relaxed mb-6">{service.shortDescription}</p>

          {svcContent && (
            <>
              <ul className="space-y-3 mb-8">
                {svcContent.whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-pp-body">
                    <svg className="h-5 w-5 text-[var(--brand)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Local context */}
              <div className="bg-[var(--surface-alt)] rounded-xl p-5 border border-[var(--border)]">
                <h3 className="text-base font-semibold text-pp-heading mb-2">
                  Why it matters in {area.name}
                </h3>
                <p className="text-sm text-pp-body leading-relaxed">{svcContent.localWhy}</p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Area intro ── */}
      <section className="py-14 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-4">
            Serving {area.name} — {postcodes.join(", ")}
          </h2>
          <p className="text-pp-body leading-relaxed mb-6">{area.intro}</p>

          {landmarks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {landmarks.map((l) => (
                <span
                  key={l}
                  className="bg-white border border-[var(--border)] text-pp-heading px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  📍 {l}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Our process ── */}
      <section className="py-14 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Book or Call", body: `Contact us by phone on ${settings.phone} or book online. We confirm availability for ${area.name} same day.` },
              { step: "2", title: "We Attend",    body: `Our engineer arrives at your ${area.name} property, diagnoses the issue, and provides a fixed quote before starting work.` },
              { step: "3", title: "Job Done",     body: "Work is carried out to industry standards. We leave the property clean and tidy, and issue any required documentation." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-black text-lg">
                  {step}
                </div>
                <h3 className="font-bold text-pp-heading">{title}</h3>
                <p className="text-sm text-pp-body leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading text-center mb-8">
            FAQs — {service.name} in {area.name}
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
                    aria-hidden="true"
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

      {/* ── Trust strip ── */}
      <section className="py-10 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "⚡", title: "Same-Day Response",   body: `Fast attendance across ${area.name} and all ${postcodes[0]} postcodes.` },
              { icon: "✅", title: "Gas Safe Registered", body: "All gas work carried out by registered engineers. Registration checked on request." },
              { icon: "£",  title: "Upfront Pricing",     body: "Fixed quote agreed before any work begins. No hidden call-out extras." },
              { icon: "🛡️", title: "Fully Insured",       body: "Public liability and employer's liability insurance. Fully covered on every job." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-1.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
                <span className="text-xl leading-none" aria-hidden="true">{item.icon}</span>
                <p className="text-sm font-semibold text-pp-heading">{item.title}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related services in this area ── */}
      <section className="py-12 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-6">
            More Plumbing Services in {area.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {relatedServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/areas/${slug}/${svc.slug}`}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                <svg className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {svc.name} in {area.name}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex gap-6">
            <Link href={`/areas/${slug}`} className="text-sm font-semibold text-[var(--brand)] hover:underline">
              ← All services in {area.name}
            </Link>
            <Link href={`/services/${serviceSlug}`} className="text-sm font-semibold text-[var(--brand)] hover:underline">
              {service.name} across all areas →
            </Link>
          </div>
        </div>
      </section>

      <ImageCTASection
        heading={`Book ${service.name} in ${area.name}`}
        subheading={`Call ${settings.phone} or book online. Same-day availability across ${postcodes.join(", ")} — upfront pricing, no surprises.`}
        imageSrc={`/images/services/${serviceSlug}/hero.webp`}
        imageAlt={`${service.name} engineer serving ${area.name}, Peterborough`}
      />
    </>
  );
}
