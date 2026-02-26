import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import AreaGrid from "@/components/blocks/AreaGrid";
import CTASection from "@/components/blocks/CTASection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Area } from "@/content/areas";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover | Plumbers Across Peterborough & Surroundings",
  description:
    "Gas Safe registered plumbers serving all of Peterborough (PE1–PE7), Stamford, Market Deeping, Yaxley, and Whittlesey. Same-day and emergency cover across all areas. Book today.",
  path: "/areas",
  image: "/images/homepage/hero.png",
});

const coverageFeatures = [
  {
    title: "All Peterborough Postcodes",
    body: "Full coverage across PE1, PE2, PE3, PE4, PE6, PE7, and PE9 — city centre and all surrounding districts.",
  },
  {
    title: "Same-Day Appointments",
    body: "Standard same-day bookings available in most areas on most days. Emergency response within 1–2 hours.",
  },
  {
    title: "No Travel Surcharge",
    body: "We do not add travel fees for any area in our standard service zone — including outlying towns like Stamford and Market Deeping.",
  },
  {
    title: "Gas Safe Registered",
    body: "Every engineer carries a Gas Safe ID card. All gas work is carried out to BS 6891 standards.",
  },
];

export default async function AreasPage() {
  const [areas, settings] = await Promise.all([
    prisma.area.findMany({ orderBy: { name: "asc" } }),
    getSiteSettings(),
  ]);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Areas", href: "/areas" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/hero.png" alt="Plumbing and heating services across Peterborough and surrounding areas" fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ name: "Areas", href: "/areas" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Areas We Cover Across{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Gas Safe plumbers covering all PE postcodes and surrounding towns — same-day appointments and 24/7 emergency response. No travel surcharges across our service zone.
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
            {["Gas Safe Registered", "No call-out charge", "No travel surcharge"].map((item) => (
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

      {/* Coverage features */}
      <section className="bg-white py-12 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coverageFeatures.map((f) => (
              <div key={f.title} className="flex gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
                <svg className="h-5 w-5 text-[var(--brand)] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-pp-heading text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AreaGrid areas={areas as unknown as Area[]} />

      {/* Not on the list? */}
      <section className="bg-[var(--surface-alt)] py-12 border-y border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-bold text-pp-heading mb-3">
            Not Sure If We Cover Your Area?
          </h2>
          <p className="text-[var(--muted)] text-sm mb-6 max-w-xl mx-auto">
            Call us directly with your postcode — we cover a wide area around Peterborough and
            can usually confirm availability in seconds. We also cover many surrounding villages
            not listed above.
          </p>
          <a
            href={`tel:${settings.phoneHref}`}
            className="inline-block bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors"
          >
            Call {settings.phone}
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}
