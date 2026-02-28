import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/blocks/CTASection";
import { siteSettings } from "@/content/settings";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "About Peterborough Plumbers | Local Plumbing & Heating Engineers",
  description:
    "Peterborough Plumbers — qualified, fully insured plumbing & heating engineers. Family-run, locally based, and trusted by homeowners and landlords across Peterborough. Clear upfront quotes.",
  path: "/about",
  absoluteTitle: true,
  image: "/images/homepage/hero.webp",
});

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.companyName,
    url: siteSettings.siteUrl,
    telephone: siteSettings.phoneHref,
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Peterborough",
      addressRegion: "Cambridgeshire",
      addressCountry: "GB",
    },
    description: `Qualified plumbing and heating engineers serving Peterborough and surrounding areas.`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {/* Hero */}
      <section className="relative bg-pp-navy overflow-hidden flex flex-col hero-white-text min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src="/images/homepage/hero.webp" alt="Expert plumbers in Peterborough — qualified plumbing & heating engineers" fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-44" style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }} />
          <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 pt-4 sm:pt-28 pb-16 sm:pb-24">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} inverted />
          <div className="inline-flex items-center gap-2.5 mt-4 mb-5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-[0.72rem] font-bold tracking-[0.18em] uppercase">Available Today &mdash; Peterborough &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-white font-black leading-[1.05] tracking-[-0.025em] hero-text max-w-3xl" style={{ fontSize: "clamp(30px, 4.2vw, 56px)" }}>
            About{" "}
            <span style={{ background: "linear-gradient(135deg, #f05060 0%, #C8102E 55%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Peterborough Plumbers
            </span>
          </h1>
          <p className="mt-5 text-white/70 leading-[1.65] max-w-2xl hero-text" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
            Qualified plumbing and heating engineers, locally based in Peterborough — honest service, clear upfront quotes, no hidden extras.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={siteSettings.primaryCtaHref} className="inline-flex items-center justify-center h-[52px] px-8 rounded-full text-white font-bold text-[0.9rem] transition-all duration-200 hover:brightness-110 active:scale-[0.97]" style={{ background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)", boxShadow: "0 4px 24px rgba(200,16,46,0.45), 0 1px 3px rgba(0,0,0,0.30)" }}>
              Get a Free Quote
            </Link>
            <a href={`tel:${siteSettings.phoneHref}`} className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 rounded-full text-white font-bold text-[0.9rem] border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200 backdrop-blur-sm">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" /></svg>
              {siteSettings.phone}
            </a>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
            {["Qualified engineers", "Transparent call-out fees", "Clear upfront quotes"].map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-white/55 text-sm">
                <svg className="h-3.5 w-3.5 text-emerald-400/80 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "clamp(48px, 5.5vw, 80px)" }}>
            <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 space-y-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-pp-heading">Our Story</h2>
            <p className="text-pp-body leading-relaxed">
              {siteSettings.companyName} started as a small family operation and has grown into
              one of Peterborough&apos;s most trusted plumbing and heating companies. Our
              qualified engineers serve homes, rental properties, and businesses across
              Peterborough and surrounding areas — delivering honest workmanship and clear
              upfront quotes on every job, from a simple washer replacement to a full
              central heating installation.
            </p>
            <p className="text-pp-body leading-relaxed">
              We were founded on a simple principle: treat every customer the way we would
              want a tradesperson to treat our own home. That means turning up on time,
              explaining the work before we start, and never adding charges that weren&apos;t
              agreed upfront. It sounds straightforward, but you&apos;d be surprised how rare
              it is — and it&apos;s why so many of our customers come back to us and recommend
              us to their neighbours.
            </p>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">What Sets Us Apart</h2>
            <p className="text-pp-body leading-relaxed">
              We believe in doing things properly. Every job, whether it&apos;s a simple tap
              repair or a full central heating installation, receives the same level of care
              and professionalism. Our {siteSettings.googleRating}-star Google rating reflects
              our commitment to quality workmanship and customer service — and with over{" "}
              {siteSettings.reviewCount} genuine reviews from homeowners and landlords across
              Peterborough, that&apos;s not something we take lightly.
            </p>
            <p className="text-pp-body leading-relaxed">
              Unlike some larger companies, you&apos;ll always speak to a real person when you
              call us. We provide a written quote before any work begins, and we won&apos;t
              start until you&apos;re happy with the price. If unexpected complications arise
              during a job, we&apos;ll tell you immediately — never after the fact.
            </p>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">Qualified &amp; Fully Insured</h2>
            <p className="text-pp-body leading-relaxed">
              Safety is our top priority. Our engineers are qualified and fully insured,
              and undergo regular training to stay current with the latest regulations
              and best practices. We carry full public liability insurance on every job,
              giving you complete peace of mind.
            </p>
            <p className="text-pp-body leading-relaxed">
              All gas work is carried out by Gas Safe registered engineers — you can verify
              our registration on the Gas Safe Register. For boiler installations and
              servicing, we follow manufacturer guidelines and current Building Regulations,
              ensuring your warranty remains valid. We also issue Gas Safety Certificates
              (CP12) for landlords, which are a legal requirement for all rental properties
              with gas appliances.
            </p>
            <ul className="mt-4 space-y-2 list-none p-0">
              {[
                "Gas Safe registered engineers",
                "Full public liability insurance",
                "CP12 Gas Safety Certificates for landlords",
                "Regular CPD training on current regulations",
                "Manufacturer-approved boiler installation & servicing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-pp-body">
                  <svg className="h-5 w-5 text-brand shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">Our Services</h2>
            <p className="text-pp-body leading-relaxed">
              We cover the full range of domestic plumbing and heating services, including:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-6">
              {[
                "Emergency plumber call-outs — available for urgent leaks, burst pipes, and no hot water",
                "Boiler servicing, repairs, and replacements",
                "Central heating system installation, power flushing, and maintenance",
                "Gas Safety Certificates (CP12) for landlords and homeowners",
                "Bathroom installations and refurbishments",
                "General plumbing repairs — taps, toilets, radiators, and more",
                "Damp and leak detection",
              ].map((item) => (
                <li key={item} className="text-pp-body">{item}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-pp-heading mt-10">Local &amp; Reliable</h2>
            <p className="text-pp-body leading-relaxed">
              Based in Peterborough, we serve the city and surrounding areas including Orton,
              Werrington, Hampton, Bretton, Market Deeping, Yaxley, Whittlesey, and Stamford.
              Being local means faster response times, no excessive call-out charges for nearby
              areas, and a genuine understanding of the community we serve.
            </p>
            <p className="text-pp-body leading-relaxed">
              When you book with us, you know exactly who is coming to your property. We don&apos;t
              subcontract work to unknown third parties — every job is handled by our own
              vetted, qualified engineers. That consistency is something our customers value,
              and it&apos;s something we&apos;re proud to offer.
            </p>
          </div>
        </div>
      </section>

      <CTASection heading="Need a Plumber?" subheading="Get in touch for a free, no-obligation quote." />
    </>
  );
}
