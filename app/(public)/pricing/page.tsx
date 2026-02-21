import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing Prices Peterborough | From £65 | No Hidden Fees",
  description:
    "Transparent plumbing prices in Peterborough. Boiler service from £79, emergency from £99, new boiler from £1,800. No hidden fees. Get a free quote today.",
  path: "/pricing",
  image: "/images/homepage/hero.png",
});

const priceGroups = [
  {
    heading: "Boiler Services",
    icon: "🔧",
    items: [
      { service: "Annual Boiler Service", price: "From £79", note: "Includes written certificate" },
      { service: "Boiler Repair (diagnostic)", price: "From £95", note: "Parts quoted separately" },
      { service: "New Combi Boiler (supply & fit)", price: "From £1,800", note: "Worcester Bosch, Vaillant, Baxi" },
      { service: "New System Boiler (supply & fit)", price: "From £2,400", note: "Includes hot water cylinder" },
      { service: "Boiler Replacement (like-for-like)", price: "From £1,800", note: "Same-day in most cases" },
    ],
  },
  {
    heading: "Heating & Radiators",
    icon: "🌡️",
    items: [
      { service: "Power Flush (up to 5 radiators)", price: "From £299", note: "Includes inhibitor treatment" },
      { service: "Power Flush (6–10 radiators)", price: "From £399", note: "Includes inhibitor & filter clean" },
      { service: "Radiator Replacement (supply & fit)", price: "From £150", note: "Per standard radiator" },
      { service: "Radiator Added to System", price: "From £220", note: "Includes pipework" },
      { service: "TRV Replacement", price: "From £60", note: "Per valve" },
      { service: "Underfloor Heating (electric, per room)", price: "From £500", note: "Mat system, tiles" },
    ],
  },
  {
    heading: "Plumbing",
    icon: "🔩",
    items: [
      { service: "Dripping Tap Repair", price: "From £65", note: "Washer / cartridge replacement" },
      { service: "Blocked Drain (internal)", price: "From £75", note: "Jetting or rodding" },
      { service: "Leak Detection & Repair", price: "From £95", note: "Pipe trace included" },
      { service: "Stopcock Replacement", price: "From £90", note: "Supply & fit" },
      { service: "Overflow / Cistern Repair", price: "From £70", note: "Including ballcock" },
      { service: "Pipe Repair (single joint)", price: "From £85", note: "Soldered or push-fit" },
    ],
  },
  {
    heading: "Bathrooms",
    icon: "🛁",
    items: [
      { service: "Basic Bathroom Refit", price: "From £2,500", note: "Suite swap, existing layout" },
      { service: "Full Bathroom Renovation", price: "From £4,000", note: "New layout, new suite" },
      { service: "En-Suite Installation", price: "From £2,000", note: "Shower, WC, basin" },
      { service: "Shower Installation", price: "From £350", note: "Electric or mixer" },
      { service: "Toilet Installation", price: "From £150", note: "Supply & fit, close-coupled" },
    ],
  },
  {
    heading: "Safety & Certification",
    icon: "✅",
    items: [
      { service: "Gas Safety Certificate (CP12)", price: "From £65", note: "Landlord annual requirement" },
      { service: "Gas Safety Check (additional appliance)", price: "+£15", note: "Per extra appliance" },
      { service: "Carbon Monoxide Alarm Supply & Fit", price: "From £45", note: "Approved detector" },
    ],
  },
  {
    heading: "Emergency Call-Out",
    icon: "🚨",
    items: [
      { service: "Daytime Emergency (Mon–Fri 8am–6pm)", price: "From £99", note: "Includes first 30 mins" },
      { service: "Out-of-Hours Emergency", price: "From £149", note: "Evenings, weekends, bank holidays" },
      { service: "Additional labour (per hour)", price: "£60–£90", note: "After first hour" },
    ],
  },
];

const faqs = [
  {
    q: "Do your prices include VAT?",
    a: "Yes, all prices listed include VAT at the standard rate. No hidden extras will be added to your invoice beyond what is agreed beforehand.",
  },
  {
    q: "Are your prices fixed, or time-and-materials?",
    a: "For most standard jobs (boiler service, radiator replacement, safety certificates), we offer fixed prices. For more complex or diagnostic work, we quote a fixed call-out/assessment fee and then provide a firm quote before proceeding.",
  },
  {
    q: "Will I get a written quote before you start?",
    a: "Always. We never start work without your agreement on the price. For emergency call-outs, we'll give you a verbal cost estimate by phone, followed by a written quote when on site.",
  },
  {
    q: "Can I get finance for a new boiler?",
    a: "Yes — we offer 0% interest finance on qualifying boiler installations, allowing you to spread the cost over 12 to 48 months. Ask us for details when you call for a quote.",
  },
  {
    q: "Do prices include parts?",
    a: "Boiler service and diagnostic call-out fees include labour only. Any parts needed are quoted separately and require your approval before fitting. We source parts at trade prices and do not mark them up significantly.",
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
      <section className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)] mb-3">
            No Hidden Fees
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-pp-heading mb-5">
            Transparent Pricing — Peterborough
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-8">
            We publish our prices because we believe you deserve to know what to expect before
            you book. All prices include VAT. We quote in writing before starting any work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="btn-book-now bg-[var(--brand)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[var(--brand-hover)] transition-colors duration-200"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="text-pp-navy font-semibold text-lg hover:text-[var(--brand)] transition-colors duration-200"
            >
              Or call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Price groups */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 space-y-14">
          {priceGroups.map((group) => (
            <div key={group.heading}>
              <h2 className="text-2xl font-bold text-pp-heading mb-6 flex items-center gap-3">
                <span>{group.icon}</span>
                {group.heading}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface-alt)] text-left">
                      <th className="px-6 py-3 font-semibold text-pp-heading">Service</th>
                      <th className="px-6 py-3 font-semibold text-pp-heading">Price</th>
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
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[var(--surface-alt)] border-y border-[var(--border)] py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: "Written Quote Always", body: "We quote before we start. No surprise charges on the invoice." },
              { title: "Fixed Prices Where Possible", body: "Boiler services, safety checks, and standard plumbing jobs are fixed-price." },
              { title: "Finance Available", body: "0% interest finance on new boiler installations. Spread the cost over up to 48 months." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-pp-heading mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-10">Pricing FAQs</h2>
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

      {/* Cost guides CTA */}
      <section className="bg-[var(--surface-alt)] py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            Want More Detail on Specific Costs?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Our free cost guides explain exactly what affects pricing and how to get the best value.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides/how-much-does-a-boiler-service-cost"
              className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-white px-4 py-2 rounded-full"
            >
              Boiler Service Cost →
            </Link>
            <Link
              href="/guides/how-much-does-a-new-boiler-cost"
              className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-white px-4 py-2 rounded-full"
            >
              New Boiler Cost →
            </Link>
            <Link
              href="/guides/emergency-plumber-call-out-cost"
              className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-white px-4 py-2 rounded-full"
            >
              Emergency Call-Out Cost →
            </Link>
            <Link
              href="/guides/central-heating-power-flush-cost"
              className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-white px-4 py-2 rounded-full"
            >
              Power Flush Cost →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        heading="Get Your Free Quote Today"
        subheading="Call or book online. We'll confirm the price before any work begins — guaranteed."
      />
    </>
  );
}
