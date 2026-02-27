import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, serviceSchema, howToSchema } from "@/lib/seo/schema";
import { siteSettings } from "@/content/settings";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";

export const metadata: Metadata = buildMetadata({
  title: "Emergency Plumber Peterborough | Urgent Plumbing & Heating Call-Outs",
  description:
    "Emergency plumber in Peterborough. Burst pipes, no heating, flooding and drain blockages — qualified engineers available for urgent call-outs across Peterborough and surrounding areas.",
  path: "/emergency",
  image: "/images/homepage/emergency-plumbing.png",
});

const emergencies = [
  {
    icon: "💧",
    title: "Burst or Leaking Pipe",
    description:
      "A burst pipe can release hundreds of litres of water in minutes. Shut off the mains stopcock immediately and call us. We carry repair fittings for copper, plastic, and push-fit systems on every van.",
  },
  {
    icon: "🔥",
    title: "No Heating or Hot Water",
    description:
      "Boiler breakdown in winter is a genuine emergency — especially with young children, elderly residents, or vulnerable occupants. Our engineers carry the most common parts and restore heating same-visit in most cases.",
  },
  {
    icon: "🚽",
    title: "Blocked or Overflowing Drains",
    description:
      "Sewage backing up into the property is a health hazard that requires immediate professional attention. We clear blockages using high-pressure jetting and CCTV drain camera inspection.",
  },
  {
    icon: "🌊",
    title: "Flooding from Appliance",
    description:
      "Washing machine, dishwasher, tank overflow, or a failed under-sink fitting — flooding can cause serious structural damage in minutes. We isolate the source and carry out emergency repairs on-site.",
  },
  {
    icon: "❄️",
    title: "Frozen or Split Pipe",
    description:
      "Frozen pipes frequently burst as they thaw. We locate frozen sections using thermal imaging, thaw them safely, and inspect for splits before restoring your water supply.",
  },
  {
    icon: "⚠️",
    title: "Boiler Lockout or Error Code",
    description:
      "If your boiler has locked out and won't reset, there is an underlying fault that needs diagnosing. We identify the root cause and carry out a permanent repair — same day in most cases.",
  },
  {
    icon: "🔴",
    title: "Gas Leak (Suspected)",
    description:
      "If you smell gas, leave the property, do not operate switches, and call the National Gas Emergency line on 0800 111 999. Once the supply is isolated and safe, call us to locate and repair the fault.",
  },
  {
    icon: "🚿",
    title: "Water Leak Through Ceiling",
    description:
      "Water pooling or dripping through a ceiling suggests a burst pipe, cracked joint, or overflowing bath above. We locate the source — including concealed pipework — without unnecessary damage to your property.",
  },
  {
    icon: "🛑",
    title: "Failed Stopcock or Isolation Valve",
    description:
      "If you cannot turn off the water because a stopcock has seized or failed, we carry replacement stopcocks and can fit them quickly to give you control of your supply again.",
  },
];

const faqs = [
  {
    q: "How quickly can you respond to an emergency in Peterborough?",
    a: "We aim to respond within 1–2 hours for genuine emergencies across all Peterborough postcodes (PE1–PE7). For outlying areas such as Stamford, Market Deeping, and Whittlesey, response times may be slightly longer. Call us directly for an accurate ETA based on current demand.",
  },
  {
    q: "Do you charge extra for emergency call-outs?",
    a: "Yes — emergency call-outs attract a call-out fee from £99 (daytime) or from £149 (out-of-hours). We confirm the total cost — call-out fee plus any additional labour or parts — before attending, so there are no surprises on your invoice.",
  },
  {
    q: "What should I do while waiting for the emergency plumber?",
    a: "Turn off the mains water stopcock (usually under the kitchen sink or by the water meter). Switch off the boiler and heating. Open cold taps to drain residual pressure from the pipes. Contain water with towels and buckets. If water reaches electrical fittings, switch off your mains electricity at the consumer unit. Take photos of the damage for your home insurance claim.",
  },
  {
    q: "Do you cover out-of-hours and weekend emergencies?",
    a: "Yes. We respond to emergency call-outs outside normal hours, including evenings, weekends, and bank holidays, across Peterborough and the surrounding areas.",
  },
  {
    q: "Are your emergency engineers qualified?",
    a: "Yes. Every engineer we send is fully qualified and insured. They will carry their ID card on every visit and will confirm all costs before starting any work.",
  },
  {
    q: "What areas do you cover for emergency call-outs?",
    a: "We cover the whole Peterborough urban area (PE1–PE7) plus Stamford, Market Deeping, Yaxley, Whittlesey, and surrounding villages. Call us to confirm availability for your postcode.",
  },
  {
    q: "Can I prevent emergency plumbing situations?",
    a: "Annual boiler servicing, regular drain maintenance, and lagging exposed pipes before winter significantly reduce your risk of emergency call-outs. We also recommend knowing the location of your mains stopcock before an emergency happens.",
  },
  {
    q: "Will you fix the problem on the first visit?",
    a: "In the majority of cases, yes. Our engineers attend with a fully stocked van of common parts. For complex faults or specialist components, we carry out a safe temporary repair on the first visit and complete the permanent fix on a follow-up appointment.",
  },
  {
    q: "Does home insurance cover emergency plumber costs?",
    a: "Many home insurance policies and home emergency cover policies will reimburse emergency call-out fees, subject to your excess and policy terms. We provide a full invoice with a detailed description of work, which your insurer will require.",
  },
  {
    q: "What is the difference between emergency and standard call-outs?",
    a: "Standard bookings are scheduled appointments during normal working hours (Mon–Fri 8am–6pm, Sat 8am–5pm). Emergency call-outs are unplanned, same-day responses outside or within normal hours where we attend as quickly as possible. The call-out fee reflects the priority response.",
  },
];

const steps = [
  {
    name: "Call us immediately",
    text: "Phone our emergency line. Our team will ask a few quick questions about the type of emergency, confirm your postcode, and give you an honest ETA. We'll advise on any immediate safe actions while you wait.",
  },
  {
    name: "Carry out emergency actions",
    text: "While waiting: turn off the mains stopcock, switch off the boiler, open cold taps, contain water with towels, and move valuables away from the water. Photograph damage for insurance.",
  },
  {
    name: "Engineer arrives",
    text: "Our qualified engineer arrives within the confirmed timeframe carrying a fully stocked parts van. They will show their ID card and give you a written cost breakdown before starting any work.",
  },
  {
    name: "Diagnosis and repair",
    text: "The engineer diagnoses the fault, explains the findings in plain English, and carries out a permanent repair where possible — or a safe temporary repair if specialist parts are required.",
  },
  {
    name: "Completion and invoice",
    text: "On completion you receive a detailed invoice listing all parts and labour costs. This document is suitable for home insurance claims and can be provided as a PDF by email.",
  },
];

const coverageAreas = [
  { area: "Peterborough City Centre", postcodes: "PE1" },
  { area: "Orton, Hampton, Stanground", postcodes: "PE2" },
  { area: "Dogsthorpe, Paston", postcodes: "PE3" },
  { area: "Werrington, Gunthorpe", postcodes: "PE4" },
  { area: "Bretton, Longthorpe", postcodes: "PE6" },
  { area: "Market Deeping, Deeping St James", postcodes: "PE6" },
  { area: "Yaxley, Farcet", postcodes: "PE7" },
  { area: "Whittlesey", postcodes: "PE7" },
  { area: "Stamford", postcodes: "PE9" },
];

export default function EmergencyPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Emergency Plumber", href: "/emergency" },
  ]);

  const schema = serviceSchema({
    name: "Emergency Plumber Peterborough",
    description:
      "Emergency plumbing and heating service in Peterborough. Burst pipes, boiler breakdowns, flooding — qualified engineers, fast response, clear upfront quotes.",
    slug: "emergency-plumber",
    offers: {
      price: "99",
      description: "Emergency plumber call-out from £99 daytime, from £149 out-of-hours. First hour labour included.",
    },
  });

  const howTo = howToSchema({
    name: "What to Do in a Plumbing Emergency in Peterborough",
    description:
      "Step-by-step guide for managing a plumbing emergency while waiting for an emergency plumber in Peterborough.",
    steps,
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />

      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/emergency-plumbing.png" alt="Emergency plumber Peterborough — qualified engineer for urgent call-outs" fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ name: "Emergency Plumber", href: "/emergency" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Now &mdash; Emergency Call-Outs</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Emergency Plumber in{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Burst pipes, no heating, flooding, gas leaks, boiler breakdowns. Qualified engineers available for urgent call-outs — <strong className="text-white font-bold">fast response</strong> across all Peterborough postcodes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              Call {siteSettings.phone}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              Book Online
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Emergency call-outs available", "Plumbing & heating support", "Clear upfront quotes"].map((item) => (
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

      {/* Urgency strip */}
      <div className="bg-red-600 text-white text-center py-3 px-4">
        <p className="text-sm font-semibold">
          Plumbing emergency right now?{" "}
          <a href={`tel:${siteSettings.phoneHref}`} className="underline font-bold hover:no-underline">
            Call {siteSettings.phone}
          </a>{" "}
          — call us for urgent assistance.
        </p>
      </div>

      {/* What we cover */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            Emergency Situations We Cover in Peterborough
          </h2>
          <p className="text-center text-[var(--muted)] mb-12 max-w-2xl mx-auto">
            We respond to all genuine plumbing and heating emergencies across Peterborough and the
            surrounding area — day, night, weekends, and bank holidays, including Christmas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencies.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] hover:border-[var(--brand)] transition-colors"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-pp-heading mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            How Our Emergency Response Works
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            From your first call to a completed repair — here is exactly what to expect.
          </p>
          <div className="space-y-6">
            {steps.map((item, i) => (
              <div key={i} className="flex gap-5 p-5 bg-white rounded-xl border border-[var(--border)]">
                <div className="shrink-0 h-10 w-10 rounded-full bg-[var(--brand)] text-[var(--pp-navy)] flex items-center justify-center font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-pp-heading mb-1">{item.name}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to do before we arrive */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            What to Do Immediately in a Plumbing Emergency
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            Taking these steps before our engineer arrives can prevent thousands of pounds of
            additional water damage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                heading: "Turn Off the Mains Water",
                body: "The stopcock is usually under the kitchen sink or by the water meter near the front door. Turn it clockwise until it stops. This is the single most important thing you can do.",
              },
              {
                heading: "Switch Off the Boiler",
                body: "Turn off your boiler and central heating at the programmer or thermostat. This prevents hot water circulating near any burst pipework and reduces pressure on the system.",
              },
              {
                heading: "Open Cold Taps to Drain the System",
                body: "Open all cold taps and flush toilets to drain residual water from the pipes as quickly as possible. This reduces the volume of water that can escape from any burst.",
              },
              {
                heading: "Contain the Water",
                body: "Use towels, buckets, and bowls to limit the spread of water. Move valuables, documents, and electronics out of harm's way. If water reaches electrical fittings, switch off electricity at the consumer unit.",
              },
              {
                heading: "Photograph Everything",
                body: "Take photos and video of all damage before cleaning up — this is essential evidence for your home insurance claim. Note the time and date on the images.",
              },
              {
                heading: "Do NOT Touch Gas Appliances",
                body: "If you suspect a gas leak, leave the property, do not operate any switches (lights or appliances), and call the National Gas Emergency line on 0800 111 999. Do not re-enter until declared safe.",
              },
            ].map((item) => (
              <div key={item.heading} className="flex gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
                <svg className="h-5 w-5 text-[var(--brand)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-pp-heading text-sm mb-1">{item.heading}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent pricing */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            Transparent Emergency Call-Out Pricing
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            We confirm all costs in writing before starting work. No surprises on your invoice.
            All prices include VAT.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pp-navy text-white text-left">
                  <th className="px-6 py-3 font-semibold">Time of Call-Out</th>
                  <th className="px-6 py-3 font-semibold">Call-Out Fee</th>
                  <th className="px-6 py-3 font-semibold hidden sm:table-cell">Includes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-white">
                {[
                  { when: "Daytime (Mon–Fri 8am–6pm)", price: "From £99", inc: "Call-out + first 30 min labour" },
                  { when: "Evening (Mon–Fri after 6pm)", price: "From £149", inc: "Call-out + first 30 min labour" },
                  { when: "Weekend & Bank Holidays", price: "From £149", inc: "Call-out + first 30 min labour" },
                  { when: "Additional labour (per hour)", price: "£60–£90", inc: "After first hour" },
                  { when: "Parts & materials", price: "Cost + fitting", inc: "Quoted separately, approved before fitting" },
                ].map((row) => (
                  <tr key={row.when} className="hover:bg-[var(--surface-alt)] transition-colors">
                    <td className="px-6 py-4 text-pp-heading font-medium">{row.when}</td>
                    <td className="px-6 py-4 text-[var(--brand)] font-bold whitespace-nowrap">{row.price}</td>
                    <td className="px-6 py-4 text-[var(--muted)] hidden sm:table-cell">{row.inc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-center text-[var(--muted)]">
            All prices include VAT.{" "}
            <Link href="/pricing" className="text-[var(--brand)] hover:underline font-medium">
              View our full pricing guide →
            </Link>
          </p>
        </div>
      </section>

      {/* Coverage map */}
      <section className="bg-white py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            Areas We Cover for Emergency Call-Outs
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            We respond to emergency calls across all Peterborough postcodes and the surrounding
            towns and villages listed below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {coverageAreas.map((item) => (
              <div key={item.area} className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] bg-[var(--surface-alt)]">
                <svg className="h-4 w-4 text-[var(--brand)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-pp-heading">{item.area}</p>
                  <p className="text-xs text-[var(--muted)]">{item.postcodes}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--muted)]">
            Not sure if we cover your area?{" "}
            <a href={`tel:${siteSettings.phoneHref}`} className="text-[var(--brand)] hover:underline font-medium">
              Call {siteSettings.phone}
            </a>{" "}
            and we'll confirm straight away.{" "}
            <Link href="/areas" className="text-[var(--brand)] hover:underline font-medium">
              View all service areas →
            </Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-10">
            What Peterborough Residents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Sandra K.",
                location: "Orton Goldhay, PE2",
                stars: 5,
                text: "Woke up on a Sunday morning to water pouring through the kitchen ceiling. Called Peterborough Plumbers at 7am and they had an engineer at my door by 8:30am. He fixed a burst pipe joint in the floor above. Fantastic service — I was terrified of the bill but it was completely reasonable.",
              },
              {
                name: "Mark T.",
                location: "Bretton, PE3",
                stars: 5,
                text: "Our boiler gave up completely on the coldest night of the year — minus 6 degrees outside. I called and they had someone out within 90 minutes. The engineer had the part on his van and had us back up and running by midnight. Couldn't recommend them enough.",
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

      {/* Related services */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-6">Related Services</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Boiler Service", href: "/services/boiler-service" },
              { label: "Plumbing Repairs", href: "/services/plumbing-repairs" },
              { label: "Drain Blockages", href: "/services/drain-blockages" },
              { label: "Damp & Leak Detection", href: "/services/damp-leak-detection" },
              { label: "Central Heating", href: "/services/central-heating-services" },
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

      {/* FAQs */}
      <section className="bg-[var(--surface-alt)] py-16 border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-pp-heading text-center mb-3">
            Emergency Plumber FAQs
          </h2>
          <p className="text-center text-[var(--muted)] mb-10 max-w-xl mx-auto">
            Common questions about our emergency plumbing service in Peterborough.
          </p>
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
                <p className="px-6 pb-5 pt-2 text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Call Our Emergency Line Now"
        subheading={`Qualified engineers available for emergency call-outs across Peterborough and surrounding areas. Call ${siteSettings.phone} for urgent assistance.`}
      />
    </>
  );
}
