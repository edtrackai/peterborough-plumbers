import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BookingFormWrapper from "./BookingFormWrapper";

export const metadata: Metadata = buildMetadata({
  title: "Book a Plumber in Peterborough | Same-Day Available",
  description:
    "Book a Gas Safe plumber in Peterborough online. Fill in our simple form and we'll confirm your appointment quickly. Same-week availability in most cases.",
  path: "/book",
  noIndex: true,
  image: "/images/homepage/boiler-service.png",
});

export default function BookPage() {
  return (
    <>
      <section className="relative bg-pp-navy pt-28 pb-16" style={{ minHeight: "clamp(600px, 75vw, 1000px)" }}>
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/boiler-service.png"
            alt="Book a plumber in Peterborough — fast, reliable service"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Book Now", href: "/book" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Book a <span className="text-pp-teal">Plumber</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            Fill in the form below and we&apos;ll confirm your booking as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
            <BookingFormWrapper />
          </Suspense>
        </div>
      </section>
    </>
  );
}
