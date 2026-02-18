import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/content/settings";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/hero.png"
          alt="Professional Gas Safe registered plumber carrying out plumbing work in a Peterborough home"
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pp-dark/85 via-pp-dark/60 to-pp-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 lg:py-40 text-left">
        <div className="max-w-2xl">
          <div className="mb-6">
            <GoogleReviewBadge />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Peterborough&apos;s Leading Plumbers —{" "}
            <span className="text-pp-yellow">30+ Years Established</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-10">
            Gas Safe registered engineers providing expert plumbing, heating, and bathroom services
            across Peterborough and surrounding areas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href={siteSettings.primaryCtaHref}
              className="btn-book-now bg-[#2563EB] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1D4ED8] transition-colors shadow-lg"
            >
              {siteSettings.primaryCtaLabel}
            </Link>
            <a
              href={`tel:${siteSettings.phone}`}
              className="bg-pp-yellow text-pp-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-pp-yellow/90 transition-colors shadow-lg"
            >
              Call {siteSettings.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
