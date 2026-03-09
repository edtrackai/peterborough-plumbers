import Link from "next/link";
import PageHeroShell from "@/components/hero/PageHeroShell";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Landlord Plumbing Peterborough | CP12 & Gas Safety",
  description:
    "Peterborough landlord plumbers — CP12 gas safety certificates, annual boiler servicing, compliance checks and emergency call-outs. Portfolio management for multi-property landlords. Book today.",
  path: "/landlords",
  image: "/images/services/landlord-services/hero.webp",
  absoluteTitle: true,
});

const services = [
  {
    icon: "📋",
    title: "CP12 Gas Safety Certificate",
    body: "Legally required every 12 months for all rental properties with gas appliances. We inspect every appliance, test pipework tightness, check flues and ventilation, and issue your certificate on the day.",
    href: "/services/gas-safety-certificates",
  },
  {
    icon: "🔥",
    title: "Annual Boiler Service",
    body: "Keeps your boiler running efficiently and safely, satisfies most manufacturer warranty requirements, and catches problems before they become expensive emergency call-outs for your tenants.",
    href: "/services/boiler-service",
  },
  {
    icon: "⚡",
    title: "Emergency Tenant Call-Outs",
    body: "Burst pipes, no heating, blocked drains — we attend your property the same day. Priority response available for landlord account holders. We liaise directly with tenants to minimise your involvement.",
    href: "/services/emergency-plumber",
  },
  {
    icon: "🔧",
    title: "Plumbing Repairs & Maintenance",
    body: "Dripping taps, leaking joints, faulty valves, running toilets — we handle all routine maintenance efficiently, minimising void costs and keeping tenants happy.",
    href: "/services/plumbing-repairs",
  },
  {
    icon: "🚿",
    title: "Bathroom Installations & Refurbs",
    body: "Between tenancies is the ideal time for a bathroom upgrade. We complete most bathroom installations within 5–8 days, including strip-out, new suite, tiling, and final plumbing connection.",
    href: "/services/bathroom-installations",
  },
  {
    icon: "🔍",
    title: "Pre-Tenancy Plumbing Inspection",
    body: "A documented inspection before a new tenant moves in provides a clear condition record, identifies any defects, and reduces dispute risk at the end of the tenancy.",
    href: "/services/pre-purchase-plumbing-survey",
  },
];

const legalRequirements = [
  {
    title: "Annual Gas Safety Check (CP12)",
    law: "Gas Safety (Installation & Use) Regulations 1998",
    detail: "Must be carried out every 12 months by a Gas Safe registered engineer. A copy of the certificate must be given to the tenant within 28 days of each check, and to new tenants before they move in. Records must be kept for 2 years.",
  },
  {
    title: "Boiler & Heating Maintenance",
    law: "Landlord and Tenant Act 1985, Section 11",
    detail: "Landlords are legally responsible for maintaining gas pipes, boilers, radiators, and all heating installations in good working order. A documented annual boiler service provides evidence of compliance.",
  },
  {
    title: "Water Supply & Drainage",
    law: "Landlord and Tenant Act 1985, Section 11",
    detail: "Landlords must keep water pipes, taps, baths, basins, sinks, toilets, and drainage in proper working order. Failure to repair within a reasonable time after notification can expose landlords to compensation claims.",
  },
  {
    title: "HMO Licensing — Additional Duties",
    law: "Housing Act 2004",
    detail: "HMO landlords face more stringent requirements including minimum room sizes, mandatory fire safety measures, and in some cases stricter boiler servicing documentation requirements imposed by the local council.",
  },
];

const faqs = [
  {
    q: "How much does a CP12 gas safety certificate cost in Peterborough?",
    a: "Our CP12 inspections start from a competitive fixed price for a single appliance, with reduced rates per property for portfolio landlords. All costs are confirmed before we attend. Contact us for a portfolio quote.",
  },
  {
    q: "Can you manage annual certificate renewals for my whole portfolio?",
    a: "Yes. We offer a reminder service that tracks renewal dates across your portfolio and contacts you (or your letting agent) 6–8 weeks before each certificate expires. We then coordinate visits at times that suit your tenants.",
  },
  {
    q: "Do you work with letting agents directly?",
    a: "Yes. We regularly work alongside letting agents in Peterborough. We can receive job instructions from your agent, attend the property independently, and invoice directly to the agent or to you — your preference.",
  },
  {
    q: "What happens if a tenant reports a plumbing fault out of hours?",
    a: "We offer priority response for landlord account holders. In a genuine emergency (burst pipe, no heating in winter), our engineers attend the same day. For non-emergency faults, we aim to attend within 24–48 hours.",
  },
  {
    q: "Do you cover HMO properties?",
    a: "Yes. We are experienced with HMO compliance requirements in Peterborough. We carry out multi-appliance CP12 inspections, document all findings, and provide the detailed records councils require for HMO licence applications.",
  },
];

const areas = [
  { name: "Peterborough City Centre", postcode: "PE1" },
  { name: "Bretton",                  postcode: "PE3" },
  { name: "Werrington",               postcode: "PE4" },
  { name: "Hampton",                  postcode: "PE7" },
  { name: "Orton",                    postcode: "PE2" },
  { name: "Yaxley",                   postcode: "PE7" },
  { name: "Whittlesey",               postcode: "PE7" },
  { name: "Market Deeping",           postcode: "PE6" },
  { name: "Stamford",                 postcode: "PE9" },
];

const faqSchema_ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LandlordsPage() {
  return (
    <>
      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home",      href: "/" },
            { name: "Landlords", href: "/landlords" },
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
                name: siteSettings.companyName,
                telephone: siteSettings.phoneHref,
                url: `${siteSettings.siteUrl}/landlords`,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "3 Saville Road",
                  addressLocality: "Peterborough",
                  postalCode: "PE3 7PR",
                  addressCountry: "GB",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: parseFloat(siteSettings.googleRating),
                  reviewCount: parseInt(siteSettings.reviewCount, 10),
                  bestRating: 5,
                  worstRating: 1,
                },
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Landlord Plumbing Services Peterborough",
                  itemListElement: services.map((s) => ({
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: s.title,
                      url: `${siteSettings.siteUrl}${s.href}`,
                    },
                  })),
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema_) }}
      />

      {/* ── Hero ── */}
      <PageHeroShell
        imageSrc="/images/services/landlord-services/hero.webp"
        imageAlt="Peterborough Plumbers engineer carrying out a CP12 gas safety inspection in a rental property"
        priority
      >
        <Breadcrumbs items={[{ name: "Landlords", href: "/landlords" }]} inverted />
        <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">
            Gas Safe Registered &mdash; Peterborough &amp; Surrounding Areas
          </span>
        </div>
        <h1
          className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Landlord Plumbing Services{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Peterborough
          </span>
        </h1>
        <p
          className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text"
          style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
        >
          CP12 gas safety certificates, annual boiler servicing, and emergency call-outs for landlords
          across Peterborough and Cambridgeshire. Portfolio management available. All compliance
          paperwork handled on the day.
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
            Get a Landlord Quote
          </Link>
          <a
            href={`tel:${siteSettings.phoneHref}`}
            className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            {siteSettings.phone}
          </a>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
          {["CP12 issued same day", "Portfolio reminders", "Direct tenant liaison"].map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
              <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </PageHeroShell>

      {/* ── Why choose us ── */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-4">Why Peterborough Landlords Choose Us</h2>
          <p className="text-pp-body leading-relaxed mb-8 max-w-3xl">
            Managing rental properties in Peterborough means dealing with a wide range of property
            types — from Victorian terraces in the city centre and 1970s new-town estates in Bretton
            and Werrington, to modern new-builds in Hampton and Cardea. Our engineers know the local
            stock and carry the parts most likely to be needed on site.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "📅", title: "Renewal Reminders",  body: "We track your CP12 renewal dates and contact you 6–8 weeks before expiry — nothing slips through the gaps." },
              { icon: "🤝", title: "Tenant Liaison",      body: "We book directly with your tenants, attend independently, and send you the paperwork — no chasing required on your part." },
              { icon: "📄", title: "Same-Day Certs",      body: "CP12 certificates are issued on the day of inspection, not days later. Digital copies available for your records immediately." },
              { icon: "📦", title: "Portfolio Pricing",   body: "Discounted rates for landlords with multiple properties. One invoice, one point of contact, one less thing to manage." },
              { icon: "⚡", title: "Priority Call-Outs", body: "Tenant reports a burst pipe at 7am? We treat landlord account holders as priority. Same-day attendance where possible." },
              { icon: "🏘️", title: "HMO Experience",     body: "We are familiar with the additional compliance requirements for HMOs under the Housing Act 2004 and Peterborough City Council licensing conditions." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
                <span className="text-2xl leading-none shrink-0" aria-hidden="true">{icon}</span>
                <div>
                  <h3 className="font-bold text-pp-heading mb-1">{title}</h3>
                  <p className="text-sm text-pp-body leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-2">Landlord Plumbing Services</h2>
          <p className="text-pp-body mb-8">Everything a Peterborough landlord needs — from legal compliance to reactive maintenance.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map(({ icon, title, body, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex gap-4 p-6 rounded-xl border border-[var(--border)] bg-white hover:border-[var(--brand)] hover:shadow-[0_4px_16px_rgba(200,16,46,0.10)] transition-all duration-200"
              >
                <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                <div>
                  <h3 className="font-bold text-pp-heading group-hover:text-[var(--brand)] transition-colors mb-1">{title}</h3>
                  <p className="text-sm text-pp-body leading-relaxed">{body}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand)]">
                    Learn more
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal requirements ── */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-2">Your Legal Obligations as a Landlord</h2>
          <p className="text-pp-body mb-8 max-w-3xl">
            UK landlord law places clear duties on property owners when it comes to gas safety and
            plumbing. Non-compliance can result in fines, licence revocation, and in the case of gas
            safety failures, criminal prosecution. Here are the key requirements.
          </p>
          <div className="space-y-4">
            {legalRequirements.map(({ title, law, detail }) => (
              <div key={title} className="rounded-xl border border-[var(--border)] p-6">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <h3 className="font-bold text-pp-heading">{title}</h3>
                  <span className="shrink-0 text-xs font-semibold text-[var(--brand)] bg-red-50 border border-red-100 px-2.5 py-1 rounded-full">
                    {law}
                  </span>
                </div>
                <p className="text-sm text-pp-body leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            This information is a summary only and does not constitute legal advice. For definitive guidance see{" "}
            <Link href="/guides/landlord-gas-safety-guide" className="text-[var(--brand)] font-medium hover:underline">
              our landlord gas safety guide
            </Link>
            {" "}or consult a solicitor.
          </p>
        </div>
      </section>

      {/* ── Areas covered ── */}
      <section className="py-14 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading mb-2">Areas We Cover for Landlords</h2>
          <p className="text-pp-body mb-6">
            We serve landlords across Peterborough and surrounding Cambridgeshire and Lincolnshire towns.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {areas.map(({ name, postcode }) => (
              <div key={name} className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-white px-4 py-3">
                <svg className="h-3.5 w-3.5 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-pp-heading">{name}</span>
                <span className="ml-auto text-xs text-[var(--muted)] font-mono">{postcode}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)]">
            Not listed?{" "}
            <Link href="/areas" className="text-[var(--brand)] font-medium hover:underline">
              View all areas we cover →
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-16 bg-white border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-pp-heading text-center mb-8">
            Landlord Plumbing FAQs
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[var(--border)] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-pp-heading text-sm select-none bg-[var(--surface-alt)]">
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
                <p className="px-6 pb-5 pt-3 text-sm text-[var(--muted)] leading-relaxed bg-white">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            More questions?{" "}
            <Link href="/guides/landlord-gas-safety-guide" className="text-[var(--brand)] font-medium hover:underline">
              Read our landlord gas safety guide
            </Link>
            {" "}or{" "}
            <Link href="/contact" className="text-[var(--brand)] font-medium hover:underline">
              get in touch
            </Link>.
          </p>
        </div>
      </section>

      {/* ── Pricing note ── */}
      <section className="py-12 bg-[var(--surface-alt)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-pp-heading mb-2">Transparent Landlord Pricing</h2>
            <p className="text-pp-body text-sm leading-relaxed">
              All costs are confirmed before we attend. No call-out surprises. Portfolio discounts available
              for landlords with 3 or more properties. See our{" "}
              <Link href="/pricing" className="text-[var(--brand)] font-medium hover:underline">
                pricing guide
              </Link>{" "}
              for typical costs, or call us for a tailored portfolio quote.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[var(--brand)] text-white font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
            >
              Get Portfolio Quote
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-pp-navy text-pp-navy font-bold text-sm hover:bg-pp-navy hover:text-white transition-colors duration-200"
            >
              View Pricing Guide
            </Link>
          </div>
        </div>
      </section>

      <ImageCTASection
        heading="Ready to Sort Your Landlord Compliance?"
        subheading={`Call ${siteSettings.phone} or book online. CP12 certificates issued same day, portfolio reminders included, direct tenant liaison available.`}
        imageSrc="/images/services/landlord-services/hero.webp"
        imageAlt="Gas Safe engineer conducting a CP12 landlord inspection in Peterborough"
      />
    </>
  );
}
