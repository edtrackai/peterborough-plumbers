import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Peterborough Plumbers",
  description:
    "Get in touch with Peterborough Plumbers. Call, email, WhatsApp, or book online. Fast response guaranteed.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-pp-dark pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Contact <span className="text-pp-yellow">Us</span>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-pp-dark/5">
                <h2 className="text-xl font-bold text-pp-dark mb-3">Call Us</h2>
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="text-2xl font-bold text-pp-accent hover:text-pp-accent/80 transition-colors"
                >
                  {siteSettings.phone}
                </a>
                <p className="text-pp-dark/60 text-sm mt-2">Available 24/7 for emergencies</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-pp-dark/5">
                <h2 className="text-xl font-bold text-pp-dark mb-3">Email Us</h2>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-lg text-pp-accent hover:text-pp-accent/80 transition-colors break-all"
                >
                  {siteSettings.email}
                </a>
                <p className="text-pp-dark/60 text-sm mt-2">We aim to reply within 2 hours</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-pp-dark/5">
                <h2 className="text-xl font-bold text-pp-dark mb-3">WhatsApp</h2>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-pp-dark/60 text-sm mt-2">Quick responses during business hours</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-pp-dark/5">
                <h2 className="text-xl font-bold text-pp-dark mb-3">Our Address</h2>
                <p className="text-pp-dark/80">{siteSettings.address}</p>
                <p className="text-pp-dark/60 text-sm mt-2">
                  Gas Safe Reg: {siteSettings.gasSafeNumber}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-pp-dark/5 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-pp-dark mb-4">Book Online</h2>
              <p className="text-pp-dark/70 mb-6">
                Use our online booking form to schedule a service at a time that suits you.
              </p>
              <Link
                href="/book"
                className="bg-[#2563EB] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection heading="Prefer to Talk?" subheading="We're always happy to discuss your plumbing needs over the phone." />
    </>
  );
}
