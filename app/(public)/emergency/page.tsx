import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Emergency Plumber Peterborough — 24/7 Fast Response",
  description:
    "24/7 emergency plumber in Peterborough. Burst pipes, no heating, blocked drains, boiler breakdowns. Gas Safe registered engineers. Call now for fast response.",
  path: "/emergency",
  image: "/images/homepage/hero.png",
});

const emergencies = [
  {
    icon: "💧",
    title: "Burst or Leaking Pipe",
    description:
      "Shut off the mains stopcock immediately and call us. We'll arrive, locate the split, and make a permanent repair.",
  },
  {
    icon: "🔥",
    title: "No Heating or Hot Water",
    description:
      "Boiler breakdown in winter is a genuine emergency, especially for families with young children or elderly residents. We carry common parts on the van.",
  },
  {
    icon: "🚽",
    title: "Blocked or Overflowing Drains",
    description:
      "Sewage backing up into the property is a health hazard. We clear blockages using professional jetting equipment.",
  },
  {
    icon: "🌊",
    title: "Flooding from Appliance",
    description:
      "Washing machine, dishwasher, or tank overflow causing flooding. We isolate the source and carry out emergency repairs.",
  },
  {
    icon: "❄️",
    title: "Frozen Pipes",
    description:
      "Frozen pipes can burst as they thaw. We locate and thaw frozen sections safely and inspect for splits.",
  },
  {
    icon: "⚠️",
    title: "Boiler Lockout or Error",
    description:
      "If your boiler has locked out and you can't reset it, we diagnose and repair the underlying fault — same day in most cases.",
  },
];

const faqs = [
  {
    q: "How quickly can you respond to an emergency in Peterborough?",
    a: "We aim to respond within 1–2 hours for genuine emergencies across the Peterborough area. Response times may be longer during periods of very high demand (e.g. widespread freezing weather). Call us directly for an accurate ETA.",
  },
  {
    q: "Do you charge extra for emergency call-outs?",
    a: "Yes — out-of-hours and emergency call-outs attract a call-out fee from £99. We'll confirm the total cost (call-out plus hourly rate) before attending so there are no surprises.",
  },
  {
    q: "What should I do while waiting for the emergency plumber?",
    a: "Turn off the mains water stopcock (usually under the kitchen sink). Turn off the heating. Open taps to drain residual pressure. Move valuables away from water and take photos of any damage for insurance purposes.",
  },
  {
    q: "Do you cover out-of-hours and weekend emergencies?",
    a: "Yes. We provide 24/7 emergency cover across Peterborough and surrounding areas, including evenings, weekends, and bank holidays.",
  },
  {
    q: "Is there anything I can fix myself before you arrive?",
    a: "The most important thing is to turn off the water stopcock. Beyond that, contain any water with towels and buckets. Do not attempt to repair gas appliances or gas pipework yourself — always wait for a Gas Safe registered engineer.",
  },
];

export default function EmergencyPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Emergency Plumber", href: "/emergency" },
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

      {/* Emergency hero */}
      <section className="bg-[var(--pp-navy)] text-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="inline-block bg-[var(--brand)] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            24/7 Emergency Cover
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Emergency Plumber in Peterborough
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 hero-body">
            Burst pipes, no heating, flooding, boiler breakdowns. Our Gas Safe registered engineers
            are on call around the clock — call us now for a fast response.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="btn-book-now bg-[var(--brand)] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Call {siteSettings.phone}
            </a>
            <Link
              href="/book"
              className="bg-transparent text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/60 hover:bg-white hover:text-pp-navy transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Book Online
            </Link>
          </div>
          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm hero-label">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Gas Safe Registered
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              1–2 Hour Response
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Transparent Pricing
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {siteSettings.yearsExperience} Years Experience
            </span>
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            Emergency Situations We Cover
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-xl mx-auto">
            We respond to all genuine plumbing and heating emergencies across Peterborough —
            day, night, weekends, and bank holidays.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencies.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-pp-heading mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to do while waiting */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-10">
            What to Do Before We Arrive
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                heading: "Turn Off the Mains Water",
                body: "The stopcock is usually under the kitchen sink or in a downstairs toilet. Turn it clockwise until it stops. This prevents further flooding while you wait for us.",
              },
              {
                step: "2",
                heading: "Turn Off the Heating",
                body: "Switch off your boiler and central heating at the programmer or thermostat to prevent hot water circulating near any burst pipework.",
              },
              {
                step: "3",
                heading: "Open Taps to Drain Pressure",
                body: "Open all cold taps to drain remaining water from the pipes quickly. Flush toilets to empty cisterns.",
              },
              {
                step: "4",
                heading: "Contain the Water",
                body: "Use towels, buckets, and bowls to limit spread. Move valuables and electronics. If water reaches electrical fittings, turn off your mains electricity at the consumer unit.",
              },
              {
                step: "5",
                heading: "Photograph the Damage",
                body: "Take photos before cleaning up — this is important evidence for your home insurance claim.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 p-5 bg-white rounded-xl border border-[var(--border)]">
                <div className="shrink-0 h-10 w-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-pp-heading mb-1">{item.heading}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-pp-heading mb-4">Transparent Emergency Pricing</h2>
          <p className="text-[var(--muted)] mb-10">
            We confirm all costs before starting work. No surprises on the invoice.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { label: "Call-out fee (daytime)", price: "From £99" },
              { label: "Call-out fee (out of hours)", price: "From £149" },
              { label: "Labour (first hour included)", price: "Included" },
              { label: "Additional labour", price: "£60–£90/hr" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center p-4 rounded-lg border border-[var(--border)]"
              >
                <span className="text-sm text-pp-heading font-medium">{row.label}</span>
                <span className="text-sm font-bold text-[var(--brand)]">{row.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            All prices include VAT. Parts are quoted separately.{" "}
            <Link href="/pricing" className="text-[var(--brand)] hover:underline font-medium">
              View full pricing guide →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-10">
            Emergency Plumber FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[var(--border)] bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-pp-heading text-sm select-none">
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
                <p className="px-6 pb-5 text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Call Our Emergency Line Now"
        subheading="Gas Safe registered engineers available 24/7 across Peterborough and surrounding areas."
      />
    </>
  );
}
