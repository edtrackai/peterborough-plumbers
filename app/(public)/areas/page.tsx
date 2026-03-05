import type { Metadata } from "next";
import Image from "next/image";
import PageHeroShell from "@/components/hero/PageHeroShell";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import AreaGrid from "@/components/blocks/AreaGrid";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import type { Area } from "@/content/areas";

export const revalidate = 3600; // rebuild stale pages every hour

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover | Peterborough Plumbers",
  description:
    "Plumbing & heating support across Peterborough (PE1–PE7), Stamford, Market Deeping, Yaxley, and Whittlesey. Emergency call-outs available. Book today.",
  path: "/areas",
  absoluteTitle: true,
  image: "/images/areas/hero.webp",
});


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
      <PageHeroShell imageSrc="/images/areas/hero.webp" imageAlt="Plumbing and heating services across Peterborough and surrounding areas" priority>
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
            Qualified engineers covering all PE postcodes and surrounding towns — emergency call-outs available. No travel surcharges across our service zone.
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
            {["Qualified engineers", "Transparent call-out fees", "No travel surcharge"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
      </PageHeroShell>

      {/* Areas We Cover — two-column: chips left, map right */}
      <section className="bg-white py-12 sm:py-20 border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: heading + chips + link */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-pp-heading mb-2">
                Areas We Cover in Peterborough
              </h2>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-7">
                Covering Peterborough and surrounding areas across Cambridgeshire.
              </p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/areas/${area.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-[var(--surface-alt)] px-[14px] py-2 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/areas"
                className="inline-flex items-center gap-1 mt-6 text-sm font-semibold text-[var(--brand)] hover:underline"
              >
                View all areas we cover →
              </Link>
            </div>

            {/* RIGHT: map image card */}
            <div
              className="relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.10)]"
              style={{ borderRadius: 20, aspectRatio: "4/3" }}
            >
              <Image
                src="/images/areas/areas-we-cover.webp"
                alt="Areas we cover across Peterborough and surrounding regions"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      <AreaGrid areas={areas as unknown as Area[]} />

      {/* Not on the list? */}
      <section className="bg-[var(--surface-alt)] py-12 border-y border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Text + CTA */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl font-bold text-pp-heading mb-3">
                Not Sure If We Cover Your Area?
              </h2>
              <p className="text-[var(--muted)] text-sm mb-6 max-w-xl mx-auto lg:mx-0">
                Call us directly with your postcode — we cover a wide area around Peterborough and
                can usually confirm availability in seconds. We also cover many surrounding villages
                not listed above.
              </p>
              <a
                href={`tel:${settings.phoneHref}`}
                className="inline-block bg-[var(--brand)] text-white px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors mb-4 sm:mb-0"
              >
                Call {settings.phone}
              </a>
            </div>
            {/* Side image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/areas/ready-to-book-your-plumber.webp"
                alt="Book your plumber in Peterborough and surrounding areas"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <ImageCTASection
        heading="Ready to Book Your Plumber?"
        subheading="Qualified engineers across all PE postcodes and surrounding areas — clear upfront quotes, no hidden fees."
        imageSrc="/images/areas/ready-to-book-your-plumber.webp"
        imageAlt="Peterborough Plumbers engineer ready to book"
      />
    </>
  );
}
