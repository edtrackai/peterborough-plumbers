import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import CTASection from "@/components/blocks/CTASection";
import FaqCategoryAccordion from "@/components/blocks/FaqCategoryAccordion";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing & Heating FAQs Peterborough | Common Questions Answered",
  description:
    "Answers to the most common questions about plumbing, boiler servicing, gas safety, emergency call-outs, and heating in Peterborough. Gas Safe registered company.",
  path: "/faqs",
  image: "/images/homepage/hero.png",
});

const faqCategories = [
  {
    id: "boiler",
    heading: "Boiler Service & Repairs",
    icon: "🔥",
    serviceSlug: "boiler-service",
    faqs: [
      {
        q: "How often should I have my boiler serviced in Peterborough?",
        a: "Manufacturers recommend an annual boiler service to maintain warranty validity, ensure safe operation, and keep the boiler running efficiently. Most home insurers and boiler warranty providers require a service record showing annual servicing. We recommend booking in summer or early autumn, before the heating season, when appointment availability is best.",
      },
      {
        q: "How much does a boiler service cost in Peterborough?",
        a: "Our annual boiler service starts from £79 including VAT. This covers a comprehensive 21-point inspection, combustion analysis, flue test, and a written service certificate signed by our Gas Safe registered engineer. See our full pricing guide for details.",
      },
      {
        q: "What is included in a boiler service?",
        a: "Our boiler service includes: visual inspection of all external components, checking gas pressure and flow rate, inspecting the burner and heat exchanger, testing all safety devices, flue integrity check, combustion analysis with a calibrated analyser, checking the condensate trap, verifying system pressure, and issuing a written service record.",
      },
      {
        q: "My boiler has an error code — what should I do?",
        a: "First, note the error code displayed (e.g. E1, F22, EA) and check the manufacturer's manual or website for its meaning. Some faults can be reset by pressing the reset button. If the fault returns, or if you are unsure, do not keep resetting — call us for a diagnosis. Repeated resets without addressing the underlying fault can damage expensive components.",
      },
      {
        q: "How long does a boiler replacement take?",
        a: "A straight like-for-like combi boiler replacement (same position, same type) typically takes 4–8 hours, meaning most installations are completed in a single day. More complex installations — such as converting from a regular to a combi, or relocating the boiler — may take 1–2 days. We provide a time estimate with every quote.",
      },
      {
        q: "Which boiler brands do you install?",
        a: "We install Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, and Alpha, among others. Worcester Bosch and Vaillant are our most recommended brands for Peterborough homeowners based on reliability and parts availability. We are approved installers for Worcester Bosch, which allows us to offer extended manufacturer warranties of up to 10 years.",
      },
    ],
  },
  {
    id: "gas-safety",
    heading: "Gas Safety Certificates",
    icon: "✅",
    serviceSlug: "gas-safety-certificates",
    faqs: [
      {
        q: "What is a Gas Safety Certificate (CP12)?",
        a: "A Gas Safety Certificate — also called a CP12 or Landlord Gas Safety Record — is a document issued by a Gas Safe registered engineer confirming that all gas appliances and installations at a property have been checked and are safe to use. Landlords are legally required to obtain one every 12 months for all gas appliances in rented properties.",
      },
      {
        q: "How much does a gas safety certificate cost in Peterborough?",
        a: "Our gas safety certificate starts from £65 for one appliance (typically the boiler), with an additional £15 per extra appliance (gas hob, gas fire, warm air unit). This includes VAT and a same-day certificate in PDF format.",
      },
      {
        q: "Do I need a gas safety certificate if I own my own home?",
        a: "There is no legal requirement for owner-occupiers to hold a gas safety certificate. However, having an annual gas safety check gives you peace of mind, is recommended by gas appliance manufacturers, and may be required by your home insurance policy. Some mortgage providers also require a current gas safety certificate.",
      },
      {
        q: "Can I combine a boiler service and gas safety certificate?",
        a: "Yes — we offer a combined boiler service and gas safety certificate for £120, saving compared to booking them separately. This is our most popular option for landlords, as it satisfies the annual service requirement and the legal gas safety obligation in a single engineer visit.",
      },
      {
        q: "What happens if an appliance fails the gas safety check?",
        a: "If an appliance is found to be unsafe, the engineer will explain the fault, classify it under the Gas Industry Unsafe Situations Procedure (GIUSP), and advise on the necessary repair. Immediately Dangerous appliances must be disconnected. We can carry out repairs during the same visit in many cases.",
      },
    ],
  },
  {
    id: "emergency",
    heading: "Emergency Plumbing",
    icon: "🚨",
    serviceSlug: "emergency-plumber",
    faqs: [
      {
        q: "How quickly does an emergency plumber arrive in Peterborough?",
        a: "We aim to respond to genuine plumbing emergencies within 1–2 hours across all Peterborough postcodes (PE1–PE7). For outlying areas such as Stamford and Market Deeping, response times may be slightly longer. We answer the phone 24 hours a day, 365 days a year — call us for a current ETA.",
      },
      {
        q: "What counts as a plumbing emergency?",
        a: "A plumbing emergency is any fault that poses an immediate risk of water damage, safety hazard, or loss of essential services (heating/hot water in winter). Examples: burst pipes, flooding, gas leaks, complete boiler failure in cold weather, blocked drains causing sewage backup, and failed stopcocks that prevent you from isolating the water supply.",
      },
      {
        q: "What should I do while waiting for an emergency plumber?",
        a: "Turn off the mains stopcock (usually under the kitchen sink). Switch off the boiler. Open cold taps to drain residual pressure. Contain water with towels and buckets. If water reaches electrical fittings, turn off the mains electricity at the consumer unit. Do not use naked flames near any suspected gas leak — call 0800 111 999 and leave the property.",
      },
      {
        q: "How much does an emergency plumber cost in Peterborough?",
        a: "Emergency call-out fees start from £99 for daytime (Mon–Fri 8am–6pm) and from £149 for evenings, weekends, and bank holidays. The call-out fee includes the first 30 minutes of labour. Additional labour is charged at £60–£90 per hour. All costs are confirmed before we attend — no surprises.",
      },
    ],
  },
  {
    id: "heating",
    heading: "Central Heating & Radiators",
    icon: "🌡️",
    serviceSlug: "central-heating-services",
    faqs: [
      {
        q: "My radiators are cold at the top but warm at the bottom — what does this mean?",
        a: "This is typically caused by trapped air in the radiator, which prevents hot water from filling the top section. The fix is bleeding the radiator: turn off the heating, use a radiator key to open the bleed valve at the top-end of the radiator until air escapes and water appears, then re-tighten. If multiple radiators have this issue frequently, your system may need re-pressurising or a power flush.",
      },
      {
        q: "What is a power flush and when do I need one?",
        a: "A power flush is a professional cleaning process that uses a high-velocity machine to force water and cleaning chemicals through your central heating system, removing accumulated sludge, rust, and scale. Signs you need one include: cold patches on radiators, noisy boiler or pump, slow heating, and high energy bills. We recommend a power flush every 5–10 years or before fitting a new boiler.",
      },
      {
        q: "How much does a power flush cost in Peterborough?",
        a: "A power flush starts from £299 for systems with up to 5 radiators, from £399 for 6–10 radiators, and from £499 for larger systems. This includes the flushing process, inhibitor treatment to prevent future corrosion, and a written report. A new magnetic system filter is recommended alongside a power flush — we can supply and fit for an additional £120.",
      },
      {
        q: "Can I add a new radiator to my existing central heating system?",
        a: "Yes — adding a radiator to an existing system is a standard job. We run new flow and return pipework from the nearest suitable point on the existing circuit and connect the new radiator. Costs start from £220 including pipework, the new radiator (standard double panel), thermostatic valve, and system re-balance.",
      },
    ],
  },
  {
    id: "bathroom",
    heading: "Bathroom Installations",
    icon: "🛁",
    serviceSlug: "bathroom-installations",
    faqs: [
      {
        q: "How much does a new bathroom cost in Peterborough?",
        a: "A basic bathroom refit (replacing the suite in the existing layout) starts from £2,500. A full bathroom renovation with a new layout starts from £4,000. These prices include all plumbing labour — tiling and decoration are quoted separately. We offer a free design consultation and can supply the bathroom suite or work with a suite you have already chosen.",
      },
      {
        q: "How long does a bathroom installation take?",
        a: "A straightforward suite swap in an existing layout typically takes 2–3 days. A full renovation with a new layout, wet-room conversion, or structural changes can take 5–10 days depending on complexity. We provide a detailed timeline with every quote.",
      },
      {
        q: "Do you supply the bathroom suite as well as fitting it?",
        a: "Yes — we can supply and fit, or fit only. If you supply the suite, we ask that all items are delivered and on-site before the start date. We can also advise on suite selection and order through our trade accounts, often achieving better prices than high-street retailers.",
      },
      {
        q: "Can you convert my existing bathroom into a wet room?",
        a: "Yes. Wet room conversion involves installing a tanked (waterproof) floor and walls, a linear drain or central waste, and a frameless screen. Costs start from £3,500 depending on the size of the room and the existing floor construction. We assess suitability during the free site survey.",
      },
    ],
  },
  {
    id: "drains",
    heading: "Drain Blockages",
    icon: "🚿",
    serviceSlug: "drain-blockages",
    faqs: [
      {
        q: "How do I know if I have a blocked drain?",
        a: "Common signs of a blocked drain include: water draining slowly from sinks, baths, or showers; gurgling sounds from plughole or toilet; unpleasant odours from drains; water backing up into a basin or bath when another fixture is used; and in severe cases, sewage backing up through a ground-floor toilet or inspection chamber.",
      },
      {
        q: "Can I clear a blocked drain myself?",
        a: "Minor blockages close to the plug — hair, soap, food debris — can sometimes be cleared with a plunger or a drain unblocker product. However, blockages in the main drainage stack or sewer connection require professional jetting equipment. Chemical drain cleaners can damage older pipework if overused and should not be used on total blockages.",
      },
      {
        q: "How much does drain unblocking cost in Peterborough?",
        a: "Internal drain clearance starts from £75 and external (manhole to manhole) from £120. A CCTV drain survey to locate a persistent blockage or inspect for damage costs from £150 and includes a written report with video recording. Emergency out-of-hours drain clearance starts from £149.",
      },
      {
        q: "My drain keeps blocking — is there a permanent solution?",
        a: "Recurring blockages usually indicate a structural issue — a collapsed pipe, root ingress, or displaced joint — rather than a simple debris accumulation. A CCTV drain survey will identify the root cause. Structural repairs can often be carried out by no-dig patch lining, avoiding costly excavation. We provide a written report and repair options after every survey.",
      },
    ],
  },
  {
    id: "general",
    heading: "General Plumbing Questions",
    icon: "🔧",
    serviceSlug: "plumbing-repairs",
    faqs: [
      {
        q: "Where is my mains stopcock?",
        a: "In most Peterborough properties, the mains water stopcock is located under the kitchen sink. In some older properties it may be in a downstairs toilet, utility room, or under the stairs. Your external water supply stop valve (owned by Anglian Water) is usually in the pavement outside your property. Knowing the location before an emergency is extremely important.",
      },
      {
        q: "How do I know if I have a water leak I cannot see?",
        a: "Signs of a hidden leak include: unexplained high water bills, damp patches on walls, ceilings, or floors, the sound of running water when all fixtures are off, and lower than normal water pressure. Take a meter reading, don't use any water for an hour, and check again — if the meter has moved, you likely have a leak. Call us for acoustic leak detection.",
      },
      {
        q: "Do I need a plumber to fix a dripping tap?",
        a: "A dripping tap is a simple repair that most plumbers can fix in 30–60 minutes. It typically requires replacing a washer, cartridge, or ceramic disc. Left unfixed, a dripping tap wastes thousands of litres of water per year and can cause limescale build-up and staining. Our call-out for a tap repair starts from £65.",
      },
      {
        q: "Do you work on older or unusual plumbing systems?",
        a: "Yes — we work on all types of plumbing systems including gravity-fed systems, unvented hot water cylinders, combination boilers, system boilers, vented and pressurised systems, and older lead or iron pipework. We will always advise honestly if a system has significant age-related issues that may affect the repair.",
      },
      {
        q: "How do I find a trustworthy plumber in Peterborough?",
        a: "Check for Gas Safe registration (mandatory for any gas work), public liability insurance, and verifiable reviews on Google or Checkatrade. Ask for a written quote before work begins and check that VAT is included. We carry £5 million public liability insurance, are Gas Safe registered, and all our reviews are from verified customers.",
      },
    ],
  },
];

// Flatten all FAQs for the FAQPage schema
const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

export default function FaqPage() {
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
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "clamp(580px, 67vw, 960px)" }}
      >
        {/* Background image */}
        <Image
          src="/images/homepage/hero-engineer.png"
          alt="Gas Safe registered Peterborough Plumbers engineer ready to answer your questions"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.66) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mx-auto max-w-[900px] text-center">

            {/* Eyebrow */}
            <p className="inline-block bg-[var(--brand)] text-white text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">
              Common Questions Answered
            </p>

            {/* H1 */}
            <h1
              className="text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
            >
              Plumbing &amp; Heating FAQs — Peterborough
            </h1>

            {/* Description */}
            <p
              className="text-white/80 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.35)" }}
            >
              Answers to the questions we get asked most often about boiler servicing, gas safety,
              emergency plumbing, central heating, and bathroom installations in Peterborough.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <a
                href={`tel:${siteSettings.phoneHref}`}
                className="w-full sm:w-auto bg-[var(--brand)] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Call {siteSettings.phone}
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/[0.12] text-white px-8 py-4 rounded-full font-bold text-base border border-white/25 hover:bg-white/[0.22] transition-colors duration-200"
              >
                Book Online
              </Link>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {[
                "Gas Safe Registered",
                "24/7 Emergency Line",
                "No Obligation Quotes",
                "Written Quote Before Every Job",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-[var(--brand)] shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white/80 text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Category chip nav ─────────────────────────────── */}
      <nav
        className="bg-white border-b border-[var(--border)] sticky top-16 z-30 shadow-sm"
        aria-label="Jump to FAQ category"
      >
        {/* relative wrapper so fade masks sit on top of the scroll container */}
        <div className="relative">

          {/* Left fade — hints scrollable content */}
          <div
            className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to right, white 20%, transparent)" }}
          />

          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
            aria-hidden="true"
            style={{ background: "linear-gradient(to left, white 20%, transparent)" }}
          />

          {/* Scroll container — full viewport width, no max-width cap */}
          <div
            className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
            style={
              {
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
                overscrollBehaviorX: "contain",
              } as CSSProperties
            }
          >
            {/* Chip track — w-max so browser knows true content width */}
            <div className="flex gap-2 items-center py-3 px-5 w-max">
              {faqCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={[
                    "shrink-0 flex items-center gap-1.5 whitespace-nowrap",
                    "px-4 py-2 rounded-full text-sm font-medium",
                    "bg-gray-50 border border-[var(--border)]",
                    "text-[var(--muted)]",
                    "hover:text-[var(--brand)] hover:border-[var(--brand)]",
                    "hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                    "hover:-translate-y-px",
                    "transition-all duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[var(--brand)] focus-visible:ring-offset-1",
                  ].join(" ")}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.heading}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── FAQ accordion (client component for smooth animation) ── */}
      <FaqCategoryAccordion categories={faqCategories} />

      {/* Can't find answer */}
      <section className="bg-[var(--surface-alt)] py-12 border-y border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            Can&apos;t Find the Answer You Need?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-xl mx-auto text-sm">
            Call us directly or use our online form. We answer every query honestly, with no
            pressure to book — and if we are not the right company for your job, we will tell you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors"
            >
              Call {siteSettings.phone}
            </a>
            <Link
              href="/contact"
              className="border-2 border-pp-navy text-pp-navy px-6 py-3 rounded-lg font-bold hover:bg-pp-navy hover:text-white transition-colors"
            >
              Send Us a Message
            </Link>
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="bg-white py-10 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-lg font-bold text-pp-heading mb-5">Useful Pages</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "All Services", href: "/services" },
              { label: "Pricing Guide", href: "/pricing" },
              { label: "Emergency Plumber", href: "/emergency" },
              { label: "Areas We Cover", href: "/areas" },
              { label: "Cost Guides", href: "/guides" },
              { label: "Customer Reviews", href: "/reviews" },
              { label: "Book Online", href: "/book" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--brand)] hover:underline font-medium border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-2 rounded-full hover:border-[var(--brand)] transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Peterborough's Trusted Gas Safe Plumbers"
        subheading="Book online or call for a free, no-obligation quote. Written price before every job."
      />
    </>
  );
}
