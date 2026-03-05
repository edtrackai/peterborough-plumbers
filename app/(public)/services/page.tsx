import type { Metadata } from "next";
import PageHeroShell from "@/components/hero/PageHeroShell";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import ImageCTASection from "@/components/blocks/ImageCTASection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/content/services";
import { siteSettings } from "@/content/settings";

export const revalidate = 3600; // rebuild stale pages every hour

export const metadata: Metadata = buildMetadata({
  title: "Plumbing & Heating Services | Peterborough",
  description:
    "Plumbing & heating services in Peterborough — boiler repairs, bathroom installs, drain clearance & emergency call-outs. Qualified engineers.",
  path: "/services",
  absoluteTitle: true,
  image: "/images/services/hero.webp",
});

export default async function ServicesPage() {
  const services = (await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  })) as unknown as Service[];

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* Hero */}
      <PageHeroShell imageSrc="/images/services/hero.webp" imageAlt="Professional plumbing and heating services in Peterborough" priority>
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            Plumbing &amp; Heating Services in{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            From annual boiler servicing to full bathroom installations and emergency repairs — qualified engineers covering all PE postcodes and surrounding areas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Book Online
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {siteSettings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Qualified engineers", "Transparent call-out fees", "Clear upfront quotes"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
      </PageHeroShell>

      <ServiceGrid services={services} heading="All Services" />

      <ImageCTASection
        heading="Ready to Book Your Plumber?"
        subheading="Qualified engineers across Peterborough and surrounding areas — clear upfront quotes, no hidden fees."
        imageSrc="/images/services/cta.webp"
        imageAlt="Ready to book a plumber in Peterborough"
      />
    </>
  );
}
