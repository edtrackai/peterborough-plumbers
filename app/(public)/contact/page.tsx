import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

export const metadata: Metadata = buildMetadata({
  title: "Contact Peterborough Plumbers | Call or Book Online",
  description:
    "Get in touch with Peterborough Plumbers — Gas Safe registered engineers available 24/7. Call, WhatsApp, email or book online for a guaranteed fast response.",
  path: "/contact",
  absoluteTitle: true,
  image: "/images/homepage/hero.png",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <section className="relative bg-pp-navy pt-28 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero.png"
            alt="Contact Peterborough Plumbers — call, email or book online"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Contact <span className="text-pp-teal">Us</span>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-pp-heading mb-3">Call Us</h2>
                <a
                  href={`tel:${siteSettings.phoneHref}`}
                  className="text-2xl font-bold text-pp-teal hover:text-pp-teal/80 transition-colors"
                >
                  {siteSettings.phone}
                </a>
                <p className="text-pp-body/70 text-sm mt-2">Available 24/7 for emergencies</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-pp-heading mb-3">Email Us</h2>
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="text-lg text-pp-teal hover:text-pp-teal/80 transition-colors break-all"
                >
                  {siteSettings.email}
                </a>
                <p className="text-pp-body/70 text-sm mt-2">We aim to reply within 2 hours</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-pp-heading mb-3">WhatsApp</h2>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-pp-body/70 text-sm mt-2">Quick responses during business hours</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-pp-heading mb-3">Our Address</h2>
                <p className="text-pp-body">{siteSettings.address}</p>
                <p className="text-pp-body/70 text-sm mt-2">
                  Gas Safe Reg: {siteSettings.gasSafeNumber}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold text-pp-heading mb-4">Book Online</h2>
              <p className="text-pp-body/80 mb-6">
                Use our online booking form to schedule a service at a time that suits you.
              </p>
              <Link
                href="/book"
                className="bg-pp-teal text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-pp-teal-dark transition-colors"
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
