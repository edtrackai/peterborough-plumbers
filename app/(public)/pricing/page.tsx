import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing & Heating Prices Peterborough 2026 | From £65 | No Hidden Fees",
  description:
    "Transparent plumbing and heating prices in Peterborough 2026. Boiler service from £79, gas safety certificate from £65, emergency call-out from £99, new boiler from £1,800. No hidden fees — written quote before every job.",
  path: "/pricing",
  image: "/images/homepage/hero.png",
});

const priceGroups = [
  {
    heading: "Boiler Services",
    icon: "🔧",
    slug: "boiler-service",
    description: "All boiler service and repair work is carried out by Gas Safe registered engineers. Prices confirmed before work starts.",
    items: [
      { service: "Annual Boiler Service", price: "From £79", note: "Includes written service certificate, Gas Safe ID provided" },
      { service: "Boiler Repair (diagnosis + repair)", price: "From £95", note: "Parts quoted separately, approved before fitting" },
      { service: "Boiler Repair (complex fault)", price: "From £150", note: "Heat exchanger, PCB, gas valve — parts extra" },
      { service: "New Combi Boiler (supply & fit)", price: "From £1,800", note: "Worcester Bosch, Vaillant, Baxi — 10-year warranty available" },
      { service: "New System Boiler (supply & fit)", price: "From £2,400", note: "Includes hot water cylinder, unvented available" },
      { service: "New Regular/Heat-Only Boiler", price: "From £2,200", note: "Retain existing hot water tank" },
      { service: "Boiler Replacement (like-for-like)", price: "From £1,800", note: "Same position, same type — typically same-day" },
      { service: "Boiler Flue Extension", price: "From £120", note: "Per metre, includes fittings" },
    ],
  },
  {
    heading: "Heating & Radiators",
    icon: "🌡️",
    slug: "central-heating-services",
    description: "Full central heating installation, upgrades, and maintenance across Peterborough.",
    items: [
      { service: "Power Flush (up to 5 radiators)", price: "From £299", note: "Includes inhibitor treatment, clears sludge & scale" },
      { service: "Power Flush (6–10 radiators)", price: "From £399", note: "Includes inhibitor, filter clean, and report" },
      { service: "Power Flush (11+ radiators)", price: "From £499", note: "Full system with magnetic filter refit" },
      { service: "Radiator Replacement (supply & fit)", price: "From £150", note: "Per standard single or double panel radiator" },
      { service: "Radiator Added to Existing System", price: "From £220", note: "Includes all pipework to nearest flow/return" },
      { service: "TRV Replacement", price: "From £60", note: "Per thermostatic radiator valve" },
      { service: "Magnetic System Filter (supply & fit)", price: "From £120", note: "Adey MagnaClean or equivalent" },
      { service: "Underfloor Heating (electric, per room)", price: "From £500", note: "Mat system, suitable for tiles and LVT" },
      { service: "Zone Valve Replacement", price: "From £110", note: "Mid-position or 2-port" },
    ],
  },
  {
    heading: "Plumbing Repairs & Installations",
    icon: "🔩",
    slug: "plumbing-repairs",
    description: "From a dripping tap to full plumbing installation — fixed prices where possible, written quotes always.",
    items: [
      { service: "Dripping Tap Repair", price: "From £65", note: "Washer, cartridge, or ceramic disc replacement" },
      { service: "Blocked Drain (internal)", price: "From £75", note: "Rodding or jetting, internal pipework" },
      { service: "Leak Detection & Repair", price: "From £95", note: "Acoustic or thermal trace included" },
      { service: "Stopcock Replacement", price: "From £90", note: "Supply and fit standard or quarter-turn" },
      { service: "Overflow / Cistern Repair", price: "From £70", note: "Ballcock, float valve, or fill valve" },
      { service: "Pipe Repair (single joint / section)", price: "From £85", note: "Soldered, push-fit, or compression" },
      { service: "Outside Tap Installation", price: "From £150", note: "Supply, fit, and insulate — includes isolation valve" },
      { service: "Water Softener Installation", price: "From £350", note: "Labour only — unit supplied separately or by us" },
      { service: "Hot Water Cylinder Replacement", price: "From £600", note: "Vented or unvented, includes commissioning" },
    ],
  },
  {
    heading: "Bathroom Installations",
    icon: "🛁",
    slug: "bathroom-installations",
    description: "Full bathroom design, installation and renovation — all plumbing work included. Free design consultation available.",
    items: [
      { service: "Basic Bathroom Refit (suite swap)", price: "From £2,500", note: "Existing layout retained, new suite fitted" },
      { service: "Full Bathroom Renovation", price: "From £4,000", note: "New layout, new suite, tiling labour included" },
      { service: "En-Suite Installation", price: "From £2,000", note: "Shower, close-coupled WC, basin — all plumbing" },
      { service: "Wet Room Conversion", price: "From £3,500", note: "Tanking, tray, waste, screen, plumbing" },
      { service: "Electric Shower Installation", price: "From £350", note: "Supply and fit, includes new circuit if needed" },
      { service: "Mixer Shower Installation", price: "From £400", note: "Thermostatic mixer, riser rail, and tray" },
      { service: "Toilet Installation (close-coupled)", price: "From £150", note: "Supply and fit, wax seal, isolation valve" },
      { service: "Basin and Pedestal (supply & fit)", price: "From £180", note: "Includes waste, taps, and bottle trap" },
      { service: "Bath Installation (standard)", price: "From £250", note: "Panel bath, includes waste and taps" },
    ],
  },
  {
    heading: "Gas Safety & Certification",
    icon: "✅",
    slug: "gas-safety-certificates",
    description: "All gas safety work carries a Gas Safe registered engineer's signature. Landlord CP12 certificates issued same-day.",
    items: [
      { service: "Gas Safety Certificate (CP12) — 1 appliance", price: "From £65", note: "Mandatory annual requirement for landlords" },
      { service: "Gas Safety Certificate — each extra appliance", price: "+£15", note: "Boiler, hob, fire, warm air unit" },
      { service: "Carbon Monoxide Alarm (supply & fit)", price: "From £45", note: "BS EN 50291 approved detector" },
      { service: "Gas Pressure Test", price: "From £75", note: "Full pipework test to BS 6891" },
      { service: "Gas Appliance Service (standalone)", price: "From £79", note: "Hob, gas fire, or warm air heater" },
    ],
  },
  {
    heading: "Drain Blockages & CCTV",
    icon: "🚿",
    slug: "drain-blockages",
    description: "Professional drain clearance using jetting equipment and CCTV camera survey. No call-out fee for drain bookings.",
    items: [
      { service: "Internal Drain Clearance (jetting)", price: "From £75", note: "Kitchen, bathroom, or soil stack" },
      { service: "External Drain Clearance (jetting)", price: "From £120", note: "Manhole to manhole, includes CCTV scan" },
      { service: "CCTV Drain Survey", price: "From £150", note: "Full recorded inspection with written report" },
      { service: "Drain Repair (patch lining)", price: "From £250", note: "No-dig repair for cracks and root ingress" },
      { service: "Drain Unblocking (emergency, 24hr)", price: "From £149", note: "Out-of-hours response" },
    ],
  },
  {
    heading: "Emergency Call-Out",
    icon: "🚨",
    slug: "emergency-plumber",
    description: "24/7 emergency response across Peterborough. All costs confirmed by phone before we attend.",
    items: [
      { service: "Daytime Emergency (Mon–Fri 8am–6pm)", price: "From £99", note: "Includes call-out + first 30 min labour" },
      { service: "Evening Emergency (Mon–Fri after 6pm)", price: "From £149", note: "Includes call-out + first 30 min labour" },
      { service: "Weekend & Bank Holiday Emergency", price: "From £149", note: "Includes call-out + first 30 min labour" },
      { service: "Additional labour (per hour)", price: "£60–£90", note: "After first included period" },
      { service: "Parts & materials", price: "Cost + fitting", note: "Quoted separately, your approval required" },
    ],
  },
  {
    heading: "Landlord Services",
    icon: "🏠",
    slug: "landlord-services",
    description: "Comprehensive landlord compliance and maintenance packages. Certification, repairs, and boiler servicing.",
    items: [
      { service: "Annual Gas Safety + Boiler Service (combined)", price: "From £120", note: "CP12 + service certificate, best value" },
      { service: "Annual Gas Safety Certificate only", price: "From £65", note: "CP12, up to 2 appliances" },
      { service: "Landlord Annual Maintenance Package", price: "POA", note: "CP12, boiler service, plumbing check — call for quote" },
      { service: "Emergency Tenanted Property Call-Out", price: "From £99", note: "Priority response, invoice to landlord" },
    ],
  },
];

const faqs = [
  {
    q: "Do your prices include VAT?",
    a: "Yes — all prices listed on this page include VAT at the standard rate (20%). No additional charges will appear on your invoice beyond what was agreed before work commenced.",
  },
  {
    q: "Are your prices fixed or time-and-materials?",
    a: "For most standard jobs — boiler service, gas safety certificate, radiator replacement, new toilet — we offer fixed prices. For diagnostic work, complex repairs, or anything requiring investigation first, we charge a fixed call-out/assessment fee and provide a firm written quote before proceeding.",
  },
  {
    q: "Will I get a written quote before you start?",
    a: "Always. We never start work without your written or verbal agreement on the price. For emergency call-outs, we confirm costs by phone before attending, then provide a written breakdown on arrival before touching anything.",
  },
  {
    q: "Can I get 0% finance for a new boiler?",
    a: "Yes — we offer 0% interest finance on qualifying boiler installations, allowing you to spread the cost over 12, 24, or 48 months. Subject to status. Ask us for details when you call for a quote.",
  },
  {
    q: "Are parts included in the prices shown?",
    a: "Boiler service fees, call-out fees, and diagnostic fees include labour only. Any parts required are quoted separately at trade prices and fitted only with your approval. We do not apply large mark-ups on parts — we aim to pass on trade pricing fairly.",
  },
  {
    q: "Why are some prices 'from' rather than fixed?",
    a: "Prices listed as 'from' reflect the minimum cost for a straightforward job of that type. The actual cost depends on factors such as system complexity, access, parts required, and time taken. We always give you a firm price before starting, so there are no end-of-job surprises.",
  },
  {
    q: "Do you charge for providing a quote?",
    a: "No — quotes are free, with no obligation to proceed. For work that requires a site visit to assess (e.g. new bathroom design, full system installation), there is no charge for the survey visit.",
  },
  {
    q: "How do your prices compare to national companies?",
    a: "As an independent local business we do not carry the overhead of national franchise networks or the marketing costs of comparison sites. This typically means our prices are 15–25% lower than national brands for equivalent work quality. We are also transparent about what is included — no upselling on annual care plans.",
  },
  {
    q: "Do you offer discounts for multiple jobs?",
    a: "Yes — if you need several jobs done at the same visit (e.g. boiler service, gas safety certificate, and a TRV replacement), we apply a combined labour rate that is more cost-effective than booking three separate appointments.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfer, credit and debit card (via card reader on-site), and cash. Payment is typically due on completion for standard jobs. For large installations (new bathroom, boiler replacement), we take a deposit on order with the balance on completion.",
  },
];

export default function PricingPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text" style={{ minHeight: "clamp(580px, 72vw, 920px)" }}>
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/boiler-service.png" alt="Gas Safe engineer conducting a boiler service in Peterborough" fill className="object-cover object-center" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-28 pb-8">
          <Breadcrumbs items={[{ name: "Pricing", href: "/pricing" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Transparent Plumbing Prices in{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            No hidden fees. Written quote before every job. All prices include VAT — boiler service from <strong className="text-white font-bold">£79</strong>, gas safety from <strong className="text-white font-bold">£65</strong>, emergency from <strong className="text-white font-bold">£99</strong>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Get a Free Quote
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {siteSettings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Gas Safe Registered", "Written Quote Always", "0% Finance Available"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-y-0 max-w-xl">
            {[
              { value: `${siteSettings.googleRating}★`, label: "Google Rating" },
              { value: `${siteSettings.reviewCount}+`, label: "5-Star Reviews" },
              { value: siteSettings.yearsExperience, label: "Years Established" },
              { value: siteSettings.engineersCount, label: "Local Engineers" },
            ].map(({ value, label }, idx, arr) => (
              <div key={label} className={["flex flex-col", idx < arr.length - 1 ? "sm:pr-8 sm:mr-8 sm:border-r sm:border-white/[0.12]" : ""].join(" ")}>
                <dt className="text-white font-black leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>{value}</dt>
                <dd className="text-white/40 text-[0.67rem] mt-1.5 font-semibold uppercase tracking-[0.12em]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[var(--brand)] py-4">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-[var(--pp-navy)]">
            {[
              "Written Quote Always",
              "All Prices Include VAT",
              "Fixed Prices Where Possible",
              "0% Finance Available",
              "No Call-Out Fee on Standard Jobs",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Intro content */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose prose-sm max-w-none text-[var(--muted)] leading-relaxed">
            <p>
              Peterborough Plumbers is an independent Gas Safe registered company serving all
              Peterborough postcodes (PE1–PE7) and the surrounding areas including Stamford, Market
              Deeping, Yaxley, and Whittlesey. Unlike national companies that charge premium rates
              to cover franchise fees and marketing, we offer directly-employed engineers and
              straightforward pricing.
            </p>
            <p className="mt-3">
              The prices below are our standard 2026 rates. Every job begins with a written
              confirmation of cost — we never start work until you have agreed to the price.
              Parts needed during a repair are quoted and approved separately before fitting.
            </p>
          </div>
        </div>
      </section>

      {/* Price groups */}
      <section className="bg-white py-8 pb-16">
        <div className="mx-auto max-w-7xl px-4 space-y-14">
          {priceGroups.map((group) => (
            <div key={group.heading} id={group.slug}>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-pp-heading flex items-center gap-3">
                  <span>{group.icon}</span>
                  {group.heading}
                </h2>
                <p className="text-sm text-[var(--muted)] mt-1">{group.description}</p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface-alt)] text-left">
                      <th className="px-6 py-3 font-semibold text-pp-heading">Service</th>
                      <th className="px-6 py-3 font-semibold text-pp-heading whitespace-nowrap">Price (inc. VAT)</th>
                      <th className="px-6 py-3 font-semibold text-pp-heading hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {group.items.map((item, i) => (
                      <tr key={i} className="bg-white hover:bg-[var(--surface-alt)] transition-colors">
                        <td className="px-6 py-4 text-pp-heading font-medium">{item.service}</td>
                        <td className="px-6 py-4 text-[var(--brand)] font-bold whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="px-6 py-4 text-[var(--muted)] hidden sm:table-cell">{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-right">
                <Link
                  href={`/services/${group.slug}`}
                  className="text-xs text-[var(--brand)] hover:underline font-medium"
                >
                  More about {group.heading} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why our prices are fair */}
      <section className="bg-[var(--surface-alt)] py-16 border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading text-center mb-10">
            Why Our Prices Are Fair
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "No Franchise Fees",
                body: "We are an independent local business — no franchise fees, no national call centre costs, no comparison-site commissions. Savings passed directly to you.",
              },
              {
                title: "Written Quote Before Every Job",
                body: "We confirm the price in writing before any work starts. Your invoice will match the quote exactly — no surprise charges, no hidden extras.",
              },
              {
                title: "Trade-Price Parts",
                body: "We source parts at trade prices through established merchant accounts and do not inflate the mark-up. Genuine manufacturer parts used on boiler repairs.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-xl border border-[var(--border)] text-center">
                <h3 className="font-bold text-pp-heading mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-pp-heading mb-3">
            0% Finance on New Boiler Installations
          </h2>
          <p className="text-[var(--muted)] mb-4 max-w-2xl mx-auto">
            A new boiler is a significant investment. We offer{" "}
            <strong className="text-pp-heading">0% interest finance</strong> on qualifying
            installations, letting you spread the cost over 12, 24, or 48 months with no interest
            charges. Subject to status and approval.
          </p>
          <p className="text-sm text-[var(--muted)] mb-6">
            Example: Worcester Bosch Greenstar 4000 combi boiler, supply and fit — from{" "}
            <strong className="text-pp-heading">£1,999</strong> total ={" "}
            <strong className="text-pp-heading">£42/month over 48 months</strong> at 0% APR.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors"
          >
            Ask About Finance →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading text-center mb-10">
            Customers Who Trusted Our Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "David H.",
                location: "Hampton, PE7",
                stars: 5,
                text: "Got three quotes for a new boiler. Peterborough Plumbers were the most transparent — they gave me a full itemised breakdown before I committed, and the final invoice matched exactly. Not always the cheapest quote but definitely the clearest — and a proper Worcester Bosch, not a cheap alternative.",
              },
              {
                name: "Louise M.",
                location: "Werrington, PE4",
                stars: 5,
                text: "I was dreading being overcharged after a bad experience with a national company. The engineer came, checked the system, told me the stopcock needed replacing and gave me a price on the spot. No pressure, no upsell, and the invoice was exactly what he quoted. I'll use them for everything going forward.",
              },
            ].map((review) => (
              <div key={review.name} className="bg-white p-6 rounded-xl border border-[var(--border)]">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-sm text-[var(--muted)] leading-relaxed mb-4 italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <p className="text-sm font-semibold text-pp-heading">{review.name}</p>
                <p className="text-xs text-[var(--muted)]">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">Pricing FAQs</h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            Common questions about our pricing, quotes, and payment options.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[var(--border)] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-pp-heading text-sm select-none bg-[var(--surface-alt)]">
                  {faq.q}
                  <svg
                    className="h-5 w-5 text-[var(--brand)] shrink-0 group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 pt-4 text-sm text-[var(--muted)] leading-relaxed bg-white">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cost guides */}
      <section className="bg-[var(--surface-alt)] py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            Free Cost Guides — What Affects the Price?
          </h2>
          <p className="text-[var(--muted)] mb-6 text-sm">
            Our independent cost guides explain every factor that affects pricing so you can make
            an informed decision and compare quotes effectively.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Boiler Service Cost Guide", href: "/guides/how-much-does-a-boiler-service-cost" },
              { label: "New Boiler Cost Guide", href: "/guides/how-much-does-a-new-boiler-cost" },
              { label: "Emergency Call-Out Cost", href: "/guides/emergency-plumber-call-out-cost" },
              { label: "Power Flush Cost Guide", href: "/guides/central-heating-power-flush-cost" },
              { label: "Gas Safety Certificate Cost", href: "/guides/how-much-does-a-gas-safety-certificate-cost" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-white px-4 py-2 rounded-full hover:border-[var(--brand)] transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Get Your Free Written Quote Today"
        subheading="Call or book online. We confirm the price before any work begins — guaranteed."
      />
    </>
  );
}
