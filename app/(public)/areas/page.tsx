import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AreaGrid from "@/components/blocks/AreaGrid";
import CTASection from "@/components/blocks/CTASection";
import { areas } from "@/content/areas";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Cover in Peterborough",
  description:
    "Plumbing and heating services across Peterborough. Covering Orton, Werrington, Hampton, Bretton, Market Deeping, Yaxley, Whittlesey, and Stamford.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <section className="bg-pp-navy pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Areas", href: "/areas" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Areas We <span className="text-pp-teal">Cover</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            We provide plumbing and heating services across Peterborough and the surrounding areas.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href="/book" className="bg-pp-teal text-white px-6 py-3 rounded-lg font-bold hover:bg-pp-teal-dark transition-colors">
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
