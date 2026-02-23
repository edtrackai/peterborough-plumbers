import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/content/settings";

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 star rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className="h-[18px] w-[18px] text-[#00B67A]"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    /*
     * Section bg: #F0F2F5 — matches HomeServe's light grey canvas
     * overflow-visible so the card bottom "notch" colour bleeds correctly
     */
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* flex-col-reverse → image first on mobile, text first on desktop */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-start gap-8 lg:gap-10">

          {/* ── LEFT ~42% ──────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[42%] flex flex-col gap-5 lg:gap-6">

            {/*
             * Dark headline card
             * bg-[#2d3535]: dark teal-grey matching HomeServe's card tone
             * overflow-hidden: clips the bottom-row "notch" to the card's radius
             */}
            <div className="bg-[#2d3535] rounded-[20px] overflow-hidden">

              {/* ── Text area ── */}
              <div className="px-7 pt-8 pb-6 lg:px-9 lg:pt-10 lg:pb-7">
                <h1 className="text-4xl sm:text-[2.8rem] lg:text-[3rem] font-black text-white leading-[1.12] tracking-tight">
                  Peterborough&apos;s plumbing{" "}
                  <span className="text-[#D4A84B]">
                    from just £79
                  </span>
                  , we&apos;ve got your back
                </h1>
                <p className="mt-4 text-white/75 text-[0.94rem] leading-relaxed">
                  Gas Safe registered engineers. Claim 24/7, as many times as you need.
                </p>
              </div>

              {/*
               * Bottom strip: teal button LEFT + page-bg notch RIGHT
               * The page-bg colour (#F0F2F5) fills the right side and the card's
               * overflow-hidden clips it to the rounded corner — matching the
               * white "notch" pocket visible in Image #13
               */}
              <div className="flex items-stretch">
                <Link
                  href={siteSettings.primaryCtaHref}
                  className="bg-[#0F6E6E] text-white px-8 py-[15px] font-bold text-[0.9rem] hover:bg-[#0d5f5f] transition-colors duration-200 whitespace-nowrap"
                >
                  Book a Service
                </Link>
                {/* Right notch — page bg bleeds through, clipped to card radius */}
                <div className="flex-1 bg-white" aria-hidden />
              </div>
            </div>

            {/* ── Trustpilot-style trust row ── */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-bold text-[#1a1a1a] text-[0.88rem]">Excellent</span>
              <StarRating />
              <span className="text-[0.83rem] text-[#6b7280]">
                {siteSettings.googleRating} · {siteSettings.reviewCount}+ reviews on Google
              </span>
            </div>

            {/* ── Red filled pill CTA ── */}
            <div>
              <Link
                href="/services"
                className="inline-flex items-center bg-[#C8102E] text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] hover:bg-[#a50d26] transition-colors duration-200 shadow-[0_4px_18px_rgba(200,16,46,0.28)]"
              >
                View our services
              </Link>
            </div>

          </div>

          {/* ── RIGHT ~58% ─────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[58%] relative h-[300px] sm:h-[440px] lg:min-h-[520px]">

            {/*
             * Diagonal wedge background shape
             * Matches the grey polygon in Image #13 — cuts from ~20% top-left
             * diagonally down the left edge
             */}
            <div
              className="absolute inset-0 rounded-[4px]"
              style={{
                background: "#E4E8EC",
                clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30%)",
              }}
              aria-hidden
            />

            {/*
             * Hero image — fills the full area, no visible rounded container.
             * Floats directly over the polygon shape like in Image #13.
             * Slight inset keeps it inside the clipped shape.
             */}
            <div className="absolute inset-2 sm:inset-3 lg:inset-4 z-10 overflow-hidden rounded-2xl">
              <Image
                src="/images/homepage/hero.png"
                alt="Professional Gas Safe registered plumber at work in a Peterborough home"
                fill
                className="object-cover object-center"
                priority
                quality={85}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
