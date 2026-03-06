import Image from "next/image";

/**
 * PageHeroShell — shared shell for all inner-page heroes.
 *
 * Provides: full-bleed section sizing, background image, overlay layers,
 * content container spacing, and the curved bottom wave — identical to
 * the homepage HeroSection shell.
 *
 * Usage:
 *   <PageHeroShell imageSrc="/images/foo/hero.webp" imageAlt="..." priority>
 *     {/* breadcrumbs, badge, h1, p, CTAs, trust chips — unchanged *\/}
 *   </PageHeroShell>
 */
export default function PageHeroShell({
  imageSrc,
  imageAlt,
  priority = false,
  focalPoint = "50% 15%",
  children,
}: {
  imageSrc?: string;
  imageAlt: string;
  priority?: boolean;
  /** CSS object-position value — shift focal point to keep subject's head visible. Default: "50% 15%" */
  focalPoint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden flex flex-col w-screen ml-[calc(50%_-_50vw)] min-h-[280px] sm:min-h-[clamp(400px,40vw,660px)]">

      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            style={{ objectPosition: focalPoint }}
            priority={priority}
            quality={85}
            sizes="100vw"
          />
        )}
        {/* Primary overlay: heaviest on left for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(8,10,20,0.97) 0%, rgba(8,10,20,0.88) 42%, rgba(8,10,20,0.58) 68%, rgba(8,10,20,0.35) 100%)" }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-44"
          style={{ background: "linear-gradient(to top, rgba(4,6,14,0.80) 0%, rgba(4,6,14,0.30) 55%, transparent 100%)" }}
        />
        {/* Brand red accent glow — top-right */}
        <div
          className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #C8102E 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10 pt-4 sm:pt-8 lg:pt-14 pb-16 sm:pb-20 lg:pb-24">
        {children}
      </div>

      {/* ── Curved bottom wave ─────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-[5]" aria-hidden="true" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(36px, 5.5vw, 80px)" }}
        >
          <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>

    </section>
  );
}
