import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing FAQs Peterborough | Gas Safe Engineers Answer",
  description:
    "Common plumbing questions answered by Gas Safe engineers in Peterborough. Boilers, heating, emergency call-outs, pricing and landlord FAQs covered.",
  path: "/faqs",
  image: "/images/homepage/hero.png",
});

const faqGroups = [
  {
    heading: "General Questions",
    id: "general",
    faqs: [
      {
        q: "Are you Gas Safe registered?",
        a: `Yes. All our engineers who carry out gas work are registered with the Gas Safe Register — the official body appointed by the Health and Safety Executive. Our registration number is ${siteSettings.gasSafeNumber}. You can verify this at gassaferegister.co.uk. We're happy to show our ID cards before starting any job.`,
      },
      {
        q: "What areas do you cover?",
        a: "We cover the whole Peterborough area including the city centre, Orton, Werrington, Hampton, Bretton, Stanground, and surrounding areas including Market Deeping, Yaxley, Whittlesey, and Stamford. Visit our areas page for the full list.",
      },
      {
        q: "How do I book an appointment?",
        a: `You can book online using our booking form, call us on ${siteSettings.phone}, or send a message via WhatsApp. For non-urgent jobs we typically have availability within 2–5 working days.`,
      },
      {
        q: "Do you provide written quotes?",
        a: "Yes, always. We never start work without your written or verbal agreement on the total cost. For complex jobs, we provide a full written quote before any work begins. No surprises on the invoice.",
      },
    ],
  },
  {
    heading: "Boiler Questions",
    id: "boilers",
    faqs: [
      {
        q: "How often should I service my boiler?",
        a: "Once per year — ideally in September or October before the heating season starts. Annual servicing maintains your manufacturer's warranty, keeps your boiler running safely and efficiently, and can identify minor issues before they become expensive breakdowns.",
      },
      {
        q: "Why has my boiler lost pressure?",
        a: "Boiler pressure drops naturally over time, especially after bleeding radiators. If pressure drops below 1 bar, the boiler will usually lock out. You can re-pressurise it yourself using the filling loop — see our guide on how to repressurise your boiler. If pressure drops repeatedly without you bleeding radiators, there's likely a small leak somewhere in the system — call us for a check.",
      },
      {
        q: "My boiler is showing an error code — what should I do?",
        a: "Note the error code and consult your boiler manual, or search the code online with your boiler model. Common causes include low pressure (re-pressurise and reset), a frozen condensate pipe (thaw with warm water), or ignition failure. If you can't resolve it, call us — we carry a wide range of common parts and can usually fix most faults in a single visit.",
      },
      {
        q: "How long does a new boiler installation take?",
        a: "A straightforward like-for-like combi boiler replacement typically takes one full working day. More complex installations — changing from a system to a combi, or relocating the boiler — may take one to two days. We'll advise on exact timings when we survey the job.",
      },
      {
        q: "Do I need a new boiler, or can mine be repaired?",
        a: "If your boiler is under 8 years old, repair is almost always more economical. For boilers over 10 years old, repeated breakdowns, or where parts are discontinued, replacement may make more financial sense. We'll give you an honest assessment — we won't recommend a new boiler if a repair will serve you just as well.",
      },
    ],
  },
  {
    heading: "Emergency & Urgent",
    id: "emergency",
    faqs: [
      {
        q: "How quickly can you respond to an emergency?",
        a: "We aim to respond within 1–2 hours for genuine emergencies across the Peterborough area. During periods of very high demand (such as widespread freezing weather) response times may be longer. Call us directly for an accurate estimated arrival time.",
      },
      {
        q: "What should I do if I smell gas?",
        a: "Do not use any switches, naked flames, or electrical devices. Open windows and doors to ventilate. Leave the property immediately and call the National Gas Emergency Service on 0800 111 999 (free, 24/7). Only call us once you are safely outside and the gas has been isolated.",
      },
      {
        q: "What should I do if a pipe bursts?",
        a: "Turn off the mains water stopcock immediately (usually under the kitchen sink). Turn off the boiler and heating. Open taps to drain residual pressure. Contain water with towels and buckets, move valuables, and photograph the damage for insurance. Then call us.",
      },
      {
        q: "Do you offer 24/7 emergency cover?",
        a: "Yes. We provide emergency call-out cover 24 hours a day, 7 days a week including bank holidays. Out-of-hours rates are higher than standard daytime rates — we'll confirm the cost before attending.",
      },
    ],
  },
  {
    heading: "Pricing & Payment",
    id: "pricing",
    faqs: [
      {
        q: "Do your prices include VAT?",
        a: "Yes, all prices include VAT at the standard rate. What you're quoted is what you pay — no hidden extras.",
      },
      {
        q: "Do you charge a call-out fee?",
        a: "Yes — there is a call-out / assessment fee for most visits. Daytime call-outs start from £99 (including the first 30 minutes of assessment). Emergency and out-of-hours call-outs start from £149. We confirm all costs before attending.",
      },
      {
        q: "Do you offer finance for larger jobs?",
        a: "Yes. We offer 0% interest finance on qualifying new boiler installations, allowing you to spread the cost over 12 to 48 months. Ask us for details when requesting a quote.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer, debit and credit card, and cash. Payment is due on completion of the job unless otherwise agreed in advance.",
      },
    ],
  },
  {
    heading: "Landlords & Lettings",
    id: "landlords",
    faqs: [
      {
        q: "Are Gas Safety Certificates a legal requirement for landlords?",
        a: "Yes. Under the Gas Safety (Installation and Use) Regulations 1998, all private landlords in England, Scotland, and Wales must obtain a Gas Safety Certificate (CP12) annually for every property they let. A copy must be given to existing tenants within 28 days of the check, and to new tenants before they move in.",
      },
      {
        q: "Can you service boilers in multiple rental properties?",
        a: "Yes — we work with many landlords and letting agents across Peterborough. We can schedule multiple property visits on the same day and provide consolidated invoicing on request.",
      },
    ],
  },
];

// Flat list for JSON-LD schema
const allFaqs = faqGroups.flatMap((g) => g.faqs);

export default function FaqsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "FAQs", href: "/faqs" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(allFaqs)) }}
      />

      {/* Hero */}
      <section className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--brand)] mb-3">
            Expert Answers
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-pp-heading mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[var(--muted)]">
            Honest answers to the questions our customers ask most often — from our Gas Safe
            registered engineers.
          </p>
        </div>
      </section>

      {/* Category nav */}
      <nav className="bg-white border-b border-[var(--border)] sticky top-32 lg:top-44 z-40">
        <div className="mx-auto max-w-3xl px-4 py-3 flex gap-3 overflow-x-auto">
          {faqGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="whitespace-nowrap shrink-0 text-sm font-medium px-4 py-1.5 rounded-full border border-[var(--border)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
            >
              {g.heading}
            </a>
          ))}
        </div>
      </nav>

      {/* FAQ groups */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 space-y-14">
          {faqGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-pp-heading mb-6 pb-4 border-b border-[var(--border)]">
                {group.heading}
              </h2>
              <div className="space-y-3">
                {group.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-xl border border-[var(--border)] overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-pp-heading text-sm leading-snug select-none bg-[var(--surface-alt)] hover:bg-[rgba(200,16,46,0.05)] transition-colors duration-200">
                      <span className="pr-4">{faq.q}</span>
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
                    <p className="px-5 pb-5 pt-4 text-sm text-[var(--muted)] leading-relaxed bg-white">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {/* Still have questions */}
          <div className="rounded-xl border border-[var(--brand)] bg-[rgba(200,16,46,0.06)] p-8 text-center">
            <h2 className="text-xl font-bold text-pp-heading mb-3">Still Have a Question?</h2>
            <p className="text-[var(--muted)] mb-6 text-sm">
              If your question isn&apos;t answered above, call us or use our online booking form and
              we&apos;ll get back to you the same working day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${siteSettings.phoneHref}`}
                className="btn-book-now bg-[var(--brand)] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Call {siteSettings.phone}
              </a>
              <Link
                href="/contact"
                className="text-sm font-semibold text-pp-heading hover:text-[var(--brand)] transition-colors duration-200"
              >
                Send a Message →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTASection
        heading="Ready to Book?"
        subheading="Gas Safe registered engineers across Peterborough. Get a free, no-obligation quote today."
      />
    </>
  );
}
