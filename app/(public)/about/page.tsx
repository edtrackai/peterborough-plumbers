import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings } from "@/content/settings";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "About Us | Peterborough Plumbers",
  description:
    "Learn about Peterborough Plumbers — over 30 years of trusted plumbing and heating service. Gas Safe registered, family-run, and locally based.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero section */}
      <section className="bg-pp-navy pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} inverted />
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            About <span className="text-pp-teal">{siteSettings.companyName}</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl hero-body">
            Over {siteSettings.yearsExperience} years of trusted plumbing and heating service in Peterborough.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
            <Link href={siteSettings.primaryCtaHref} className="bg-pp-teal text-white px-6 py-3 rounded-lg font-bold hover:bg-pp-teal-dark transition-colors">
              {siteSettings.primaryCtaLabel}
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="bg-transparent text-white px-6 py-3 rounded-lg font-bold border-2 border-white hover:bg-white hover:text-pp-navy transition-colors duration-200">
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-pp-heading">Our Story</h2>
            <p className="text-pp-body leading-relaxed">
              With over {siteSettings.yearsExperience} years of experience,{" "}
              {siteSettings.companyName} has grown from a small family operation into one of
              Peterborough&apos;s most trusted plumbing and heating companies. Our team of{" "}
              {siteSettings.engineersCount} Gas Safe registered engineers serve thousands of
              homes and businesses across Peterborough and surrounding areas each year.
            </p>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">What Sets Us Apart</h2>
            <p className="text-pp-body leading-relaxed">
              We believe in doing things properly. Every job, whether it&apos;s a simple tap
              repair or a full central heating installation, receives the same level of care
              and professionalism. Our {siteSettings.googleRating}-star Google rating reflects
              our commitment to quality workmanship and customer service.
            </p>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">Gas Safe Registered</h2>
            <p className="text-pp-body leading-relaxed">
              Safety is our top priority. All our engineers are Gas Safe registered
              (Reg: {siteSettings.gasSafeNumber}) and undergo regular training to stay current
              with the latest regulations and best practices. You can verify our registration
              on the Gas Safe Register website.
            </p>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">Local &amp; Reliable</h2>
            <p className="text-pp-body leading-relaxed">
              Based in Peterborough, we serve the city and surrounding areas including Orton,
              Werrington, Hampton, Bretton, Market Deeping, Yaxley, Whittlesey, and Stamford.
              Being local means faster response times and a genuine understanding of the
              community we serve.
            </p>
          </div>
        </div>
      </section>

      <CTASection heading="Need a Plumber?" subheading="Get in touch for a free, no-obligation quote." />
    </>
  );
}
