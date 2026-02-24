import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ServiceGrid from "@/components/blocks/ServiceGrid";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import type { Service } from "@/content/services";

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
      <section className="relative bg-pp-navy pt-28 pb-16 hero-white-text">
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
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Our <span className="text-pp-teal">Services</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            From boiler servicing to emergency repairs, we provide comprehensive plumbing and heating services across Peterborough.
          </p>
        </div>
      </section>

      <ServiceGrid services={services} heading="All Services" />

      <CTASection />
    </>
  );
}
