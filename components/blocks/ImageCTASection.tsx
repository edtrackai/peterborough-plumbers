import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteSettings, getWhatsAppUrl } from "@/content/settings";

interface Props {
  heading: string;
  subheading: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

/**
 * Premium image-background CTA used at the bottom of content pages.
 *
 * Structure:
 *  wrapper div   — holds spacing/margins + drop-shadow that follows the curve
 *    <svg defs>  — defines the clip-path shape (responsive, objectBoundingBox)
 *    <section>   — clipped to curved shape; contains all three layers
 *      Layer 1   — blurred background image (absolute inset-0)
 *      Layer 2   — dark overlay           (absolute inset-0, pointer-events:none)
 *      Layer 3   — frosted glass panel    (relative z-[2])
 *
 * The clip-path path uses objectBoundingBox coordinates (0–1).
 * Top edge:    gentle arc peaking slightly above centre → convex outward curve
 * Bottom edge: gentle arc dipping slightly below centre → convex outward curve
 * Sides stay straight; effective corner rounding is baked into the path.
 */
export default function ImageCTASection({ heading, subheading, imageSrc, imageAlt }: Props) {
  return (
    <div
      className="mb-8 md:mb-14"
      style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.22))" }}
    >
      {/* SVG clip-path definition (hidden; must precede the element that uses it) */}
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          {/*
            objectBoundingBox: all coords are 0–1 relative to the clipped element.

            Shape description (reading clockwise):
              M 0.03, 0.05          — start: left edge, 5% from top
              Q 0.50,-0.03  0.97,0.05  — top arc: control point sits 3% ABOVE the element
                                          → section top bows gently upward at centre
              L 0.97, 0.95          — right edge down to 95%
              Q 0.50, 1.03  0.03,0.95  — bottom arc: control point sits 3% BELOW the element
                                          → section bottom bows gently downward at centre
              Z                     — close path (back to start)

            The 3% overshoot on control points creates a smooth, natural curve.
            The 3% inset on the sides (0.03/0.97) softly rounds the corners.
          */}
          <clipPath id="ctaSectionCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0.03,0.05 Q 0.50,-0.03 0.97,0.05 L 0.97,0.95 Q 0.50,1.03 0.03,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Section — clipped to the curved shape defined above */}
      <section
        className="relative overflow-hidden py-12 lg:py-16 isolate"
        style={{ clipPath: "url(#ctaSectionCurve)" }}
      >

        {/* ── Layer 1: blurred background image ──────────────────────────── */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{
              objectPosition: "right center",
              filter: "blur(6px)",
              transform: "scale(1.06)",
            }}
            loading="lazy"
            sizes="100vw"
          />
        </div>

        {/* ── Layer 2: dark overlay (pointer-events:none keeps buttons clickable) */}
        <div
          className="absolute inset-0 z-[1] bg-black/50"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
        />

        {/* ── Layer 3: frosted glass content panel ───────────────────────── */}
        <div className="relative z-[2] mx-auto w-full max-w-[860px] px-4 sm:px-6">
          <div
            className="rounded-3xl px-6 py-8 sm:px-12 sm:py-12 text-center"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "none",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
            }}
          >
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              {heading}
            </h2>

            {/* Subtext */}
            <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed max-w-[60ch] mx-auto">
              {subheading}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href={siteSettings.primaryCtaHref}
                className="btn-book-now inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--brand)] text-white font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-black"
              >
                {siteSettings.primaryCtaLabel}
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-bold text-sm border border-white/30 bg-transparent hover:bg-green-600 hover:border-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                {siteSettings.secondaryCtaLabel}
              </a>
            </div>

            {/* Phone line */}
            <p className="mt-6 text-white/50 text-xs">
              Or call us directly:{" "}
              <a
                href={`tel:${siteSettings.phoneHref}`}
                className="text-white/80 font-semibold hover:text-white hover:underline transition-colors"
              >
                {siteSettings.phone}
              </a>
            </p>
          </div>
        </div>

      </section>
    </div>
  );
}
