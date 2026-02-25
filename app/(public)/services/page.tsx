import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/content/services";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Plumbing & Heating Services Peterborough | Gas Safe",
  description:
    "Gas Safe plumbing and heating services in Peterborough — boilers, bathrooms, emergency repairs, drain clearance. 30+ years experience. Book online today.",
  path: "/services",
  image: "/images/homepage/hero.png",
});

export default async function ServicesPage() {
  const services = (await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  })) as unknown as Service[];

  return (
    <>
      {/* Services hero */}
      <section className="relative bg-[var(--pp-navy)] text-white py-16 lg:py-24 hero-white-text">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero.png"
            alt="Professional plumbing and heating services in Peterborough"
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
            Gas Safe Registered · {siteSettings.yearsExperience} Years Experience
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Plumbing &amp; Heating Services in Peterborough
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-4 hero-body">
            From annual boiler servicing to full bathroom installations and 24/7 emergency repairs — our Gas Safe registered engineers cover everything your home needs.
          </p>
          <p className="text-base max-w-xl mx-auto mb-10 hero-body opacity-90">
            Covering all Peterborough postcodes (PE1–PE7), Stamford, Market Deeping, Yaxley, and Whittlesey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="btn-book-now bg-[var(--brand)] text-[var(--pp-navy)] px-10 py-5 rounded-full font-bold text-xl hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-lg w-full sm:w-auto text-center"
            >
              Call {siteSettings.phone}
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
              "Gas Safe Registered",
              "Fixed-Price Quotes",
              "Same-Week Appointments",
              `${siteSettings.yearsExperience} Years Experience`,
              "All Major Brands",
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

      <ServiceGrid services={services} heading="All Services" />

      <CTASection />
    </>
  );
}
