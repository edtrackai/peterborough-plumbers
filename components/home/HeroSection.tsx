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
    <section className="bg-[#F0F2F5] overflow-hidden">
      {/*
       * Hidden SVG defs — house silhouette clip-path.
       * width/height 0 keeps it invisible and out of layout flow.
       * clipPathUnits="objectBoundingBox" means all coords are 0–1 fractions
       * of the clipped element's bounding box, making it fully responsive.
       *
       * Shape: apex at top-centre, angled eaves at 28%, vertical walls,
       * quadratic-bezier rounded bottom corners (~6% radius).
       */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="house-silhouette" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0 L 1,0.28 L 1,0.94 Q 1,1 0.94,1 L 0.06,1 Q 0,1 0,0.94 L 0,0.28 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">

        {/*
         * Two-column grid — card left, masked image right.
         * Mobile:  62 / 38  — card dominant, image peeks right
         * Tablet:  46 / 54  — more balanced
         * Desktop: 42 / 58  — image gets more room
         * items-stretch so the image column matches the card height.
         */}
        <div className="grid grid-cols-[62%_38%] sm:grid-cols-[46%_54%] lg:grid-cols-[42%_58%] items-stretch">

          {/* ── LEFT: dark charcoal headline card ──────────────────────── */}
          {/*
           * relative + z-10 ensures card text sits ABOVE the image
           * where the negative-margin overlap occurs.
           */}
          <div className="relative z-10">
            <div className="bg-[#3A3A3A] rounded-[22px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.22)]">

              <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-9 sm:pb-6 lg:px-10 lg:pt-11 lg:pb-7">
                {/*
                 * !text-white overrides the global h1 { color: var(--pp-heading) } rule.
                 * "from just £79" wrapped in <span> for gold highlight — text unchanged.
                 */}
                <h1 className="text-[1rem] sm:text-[2rem] lg:text-[2.8rem] font-black !text-white leading-[1.12] tracking-tight">
                  Peterborough&apos;s plumbing{" "}
                  <span className="text-[#F2D39A]">
                    from just £79
                  </span>
                  , we&apos;ve got your back
                </h1>
                <p className="mt-2.5 sm:mt-4 text-white/90 text-[0.75rem] sm:text-[0.94rem] leading-relaxed">
                  Gas Safe registered engineers. Claim 24/7, as many times as you need.
                </p>

                {/* Teal pill CTA — existing label + href, now styled as pill inside card */}
                <div className="mt-4 sm:mt-5">
                  <Link
                    href={siteSettings.primaryCtaHref}
                    className="inline-flex items-center bg-[#0F6E6E] text-white px-4 py-1.5 sm:px-7 sm:py-3.5 rounded-full font-bold text-[0.73rem] sm:text-[0.9rem] hover:bg-[#0d5f5f] transition-colors duration-200"
                  >
                    Book a Plumber
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: house-masked hero image ─────────────────────────── */}
          {/*
           * The outer div is a grid cell that stretches to the card's height.
           * Negative left margin shifts it left so the image visually overlaps
           * the card edge — matching the reference's overlap feel.
           * The inner absolute div fills the cell and receives the clip-path.
           */}
          <div className="relative -ml-4 sm:-ml-8 lg:-ml-12">
            <div
              className="absolute inset-0"
              style={{
                clipPath: "url(#house-silhouette)",
                WebkitClipPath: "url(#house-silhouette)",
              }}
            >
              <Image
                src="/images/homepage/hero.png"
                alt="Professional Gas Safe registered plumber at work in a Peterborough home"
                fill
                className="object-cover object-center"
                priority
                quality={85}
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 56vw, 60vw"
              />
            </div>
          </div>

        </div>

        {/* ── Trust row + primary CTA — below the hero grid ───────────── */}
        <div className="mt-4 sm:mt-6 flex flex-col items-start gap-3 sm:gap-4 w-[400px] max-w-full mx-auto sm:w-full">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-bold text-[#1a1a1a] text-[0.88rem]">Excellent</span>
            <StarRating />
            <span className="text-[0.83rem] text-[#6b7280]">
              {siteSettings.googleRating} · {siteSettings.reviewCount}+ reviews on Google
            </span>
          </div>

          {/* w-full on mobile → near-full-width pill; sm:w-auto → natural width */}
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start bg-[#C8102E] text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] hover:bg-[#a50d26] transition-colors duration-200 shadow-[0_4px_18px_rgba(200,16,46,0.28)]"
          >
            View our services
          </Link>
        </div>

      </div>
    </section>
  );
}
