import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions | Peterborough Plumbers Services",
  description: "Terms and conditions for Peterborough Plumbers. Gas Safe registered engineers, 12-month workmanship guarantee and transparent pricing across Peterborough.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <>
      <section className="bg-pp-navy pt-4 sm:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Terms & Conditions", href: "/terms" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Terms &amp; Conditions</h1>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 space-y-6 text-pp-body leading-relaxed">
          <p>Last updated: January 2025</p>
          <h2 className="text-2xl font-bold text-pp-heading">1. Services</h2>
          <p>{siteSettings.companyName} provides plumbing, heating, and related services across Peterborough and surrounding areas. All work is carried out by qualified, Gas Safe registered engineers.</p>
          <h2 className="text-2xl font-bold text-pp-heading">2. Quotes &amp; Pricing</h2>
          <p>All quotes are provided free of charge and without obligation. Final pricing will be confirmed before any work commences. Additional work discovered during a job will be quoted separately and only carried out with your approval.</p>
          <h2 className="text-2xl font-bold text-pp-heading">3. Payment</h2>
          <p>Payment is due upon completion of work unless otherwise agreed. We accept bank transfer, cash, and major cards.</p>
          <h2 className="text-2xl font-bold text-pp-heading">4. Guarantees</h2>
          <p>All workmanship carries a 12-month guarantee. Manufacturer warranties on parts and appliances are separate and will be provided where applicable.</p>
          <h2 className="text-2xl font-bold text-pp-heading">5. Cancellations</h2>
          <p>We ask for at least 24 hours notice if you need to cancel or reschedule an appointment. Late cancellations may incur a call-out charge.</p>
          <h2 className="text-2xl font-bold text-pp-heading">6. Liability</h2>
          <p>We carry full public liability insurance. Our liability is limited to the cost of remedying any defect in our workmanship.</p>
        </div>
      </section>
    </>
  );
}
