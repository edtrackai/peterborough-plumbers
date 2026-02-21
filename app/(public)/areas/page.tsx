import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AreaGrid from "@/components/blocks/AreaGrid";
import CTASection from "@/components/blocks/CTASection";
import { areas } from "@/content/areas";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Plumbers Across Peterborough & Surrounding Areas",
  description:
    "Plumbing and heating services across Peterborough — Orton, Werrington, Hampton, Bretton, Stamford, Yaxley and Whittlesey. Gas Safe registered. Book today.",
  path: "/areas",
  image: "/images/homepage/hero.png",
});

export default function AreasPage() {
  return (
    <>
      <section className="relative bg-pp-navy pt-28 pb-16">
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
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Areas", href: "/areas" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Areas We <span className="text-pp-teal">Cover</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            We provide plumbing and heating services across Peterborough and the surrounding areas.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/book" className="bg-[var(--brand)] text-[var(--pp-navy)] px-6 py-3 rounded-lg font-bold hover:bg-[var(--brand-hover)] transition-colors">
              Book Now
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-pp-navy transition-colors duration-200">
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      <AreaGrid areas={areas} />

      <CTASection />
    </>
  );
}
