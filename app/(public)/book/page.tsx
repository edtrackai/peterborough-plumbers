import type { Metadata } from "next";
import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BookingFormWrapper from "./BookingFormWrapper";

export const metadata: Metadata = buildMetadata({
  title: "Book a Plumber in Peterborough | Free Quote",
  description:
    "Book a plumber in Peterborough online. Fill in our simple booking form and we'll confirm your appointment quickly.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <section className="bg-pp-dark pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Book Now", href: "/book" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Book a <span className="text-pp-yellow">Plumber</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-2xl">
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
