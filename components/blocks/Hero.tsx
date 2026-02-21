import Link from "next/link";
import Image from "next/image";
import { siteSettings } from "@/content/settings";

export default function Hero() {
  return (
    <section className="relative min-h-[620px] lg:min-h-[720px] flex items-center">
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
        {/* hero-overlay: spec-compliant gradient; uniform on mobile */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 lg:py-44 text-left">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-5 hero-text">
            Peterborough&apos;s Trusted Plumbers &mdash; 30+ Years Established
          </h1>

          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 max-w-xl hero-text">
            Gas Safe registered engineers delivering expert plumbing, heating, and bathroom
            services across Peterborough and surrounding areas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <Link
              href={siteSettings.primaryCtaHref}
              className="btn-book-now inline-flex items-center bg-pp-teal text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-pp-teal-dark transition-colors duration-200 shadow-lg"
            >
              {siteSettings.primaryCtaLabel}
            </Link>
            <a
              href={`tel:${siteSettings.phoneHref}`}
              className="inline-flex items-center bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-pp-navy transition-colors duration-200"
            >
              Call {siteSettings.phone}
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Gas Safe */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/20">
              <svg className="h-5 w-5 text-pp-teal shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-semibold">Gas Safe Registered</span>
            </div>

            {/* Google rating */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/20">
              <div className="flex gap-0.5" aria-label="4.6 out of 5 stars">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className={`h-4 w-4 ${i <= 4 ? "text-yellow-400" : "text-yellow-400/60"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white text-sm font-semibold">{siteSettings.googleRating} Google Rating</span>
            </div>

            {/* 30+ Years */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-white/20">
              <svg className="h-5 w-5 text-pp-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white text-sm font-semibold">30+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
