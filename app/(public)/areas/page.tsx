import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import AreaGrid from "@/components/blocks/AreaGrid";
import CTASection from "@/components/blocks/CTASection";
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

      {/* Areas hero */}
      <section className="relative bg-[var(--pp-navy)] text-white py-16 lg:py-24 hero-white-text">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero.png"
            alt="Plumbing and heating services across Peterborough and surrounding areas"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="inline-block bg-[var(--brand)] text-[var(--pp-navy)] text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            PE1–PE7 · Stamford · Market Deeping · Yaxley · Whittlesey
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Areas We Cover in Peterborough
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-4 hero-body">
            Gas Safe registered plumbers covering all Peterborough postcodes and the surrounding towns and
            villages — same-day appointments and 24/7 emergency response available.
          </p>
          <p className="text-base max-w-xl mx-auto mb-10 hero-body opacity-90">
            No travel surcharges across our entire service zone. Call us with your postcode — we confirm availability in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${settings.phoneHref}`}
              className="btn-book-now bg-[var(--brand)] text-[var(--pp-navy)] px-10 py-5 rounded-full font-bold text-xl hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Call {settings.phone}
            </a>
            <Link
              href="/contact"
              className="bg-transparent text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/60 hover:bg-white hover:text-pp-navy transition-colors duration-200 w-full sm:w-auto text-center"
            >
              Book Online
            </Link>
          </div>
          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm hero-label">
            {[
              "All PE Postcodes",
              "Same-Day Available",
              "No Travel Surcharge",
              "Gas Safe Registered",
              "Emergency Cover 24/7",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[var(--brand)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t}
              </span>
            ))}
          </div>
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
