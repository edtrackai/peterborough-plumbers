import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import CTASection from "@/components/blocks/CTASection";
import { prisma } from "@/lib/prisma";
import { getSiteSettings } from "@/lib/db/content";
import { guideCategories } from "@/content/guides";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";
import { guideCategoryAreaMap } from "@/lib/seo/internalLinks";

// ── HowTo schema steps — only for step-by-step procedural guides ─────────────
const howToGuideMap: Record<string, { name: string; description: string; steps: { name: string; text: string }[] }> = {
  "how-to-bleed-a-radiator": {
    name: "How to Bleed a Radiator",
    description: "Step-by-step guide to bleeding a radiator to remove trapped air and restore full heating.",
    steps: [
      { name: "Turn off the heating", text: "Switch off your central heating and wait 30 minutes for the radiators to cool completely before starting." },
      { name: "Locate the bleed valve", text: "The bleed valve is a small square or slot-headed valve at the top corner of the radiator. You will need a radiator bleed key or a flat-head screwdriver." },
      { name: "Place a cloth under the valve", text: "Hold a dry cloth or small bowl under the bleed valve to catch any water that escapes." },
      { name: "Open the valve slowly", text: "Turn the key or screwdriver anti-clockwise by a quarter turn only. You should hear a hissing sound as trapped air escapes." },
      { name: "Wait for water to flow", text: "Keep the valve open until the hissing stops and a steady trickle of water appears. This confirms all the air has been released." },
      { name: "Close the valve", text: "Turn the valve clockwise to close it firmly. Do not overtighten." },
      { name: "Check boiler pressure", text: "Go to your boiler and check the pressure gauge. If it has dropped below 1 bar, repressurise using the filling loop before restarting the heating." },
    ],
  },
  "how-to-unblock-a-drain": {
    name: "How to Unblock a Drain",
    description: "Step-by-step methods to clear a blocked sink, bath, or outdoor drain without calling a plumber.",
    steps: [
      { name: "Pour boiling water down the drain", text: "Boil a full kettle and pour it slowly down the drain in two or three stages, allowing it to work between each pour. This dissolves grease and soap build-up." },
      { name: "Use a plunger", text: "Place the rubber cup of a plunger directly over the drain opening. Push down firmly and pull up sharply several times to create suction and dislodge the blockage." },
      { name: "Try bicarbonate of soda and vinegar", text: "Pour half a cup of bicarbonate of soda down the drain, followed by half a cup of white vinegar. Cover the drain and leave for 30 minutes, then flush with hot water." },
      { name: "Use a drain snake or auger", text: "Feed a flexible drain snake into the pipe and rotate to break up or retrieve blockages deeper in the system." },
      { name: "Check the external drain cover", text: "For outdoor drains, lift the inspection cover and remove any visible debris, leaves, or silt with a gloved hand or drain rod." },
      { name: "Call a professional", text: "If the blockage persists after these steps, or if multiple drains in your home are slow, call a qualified plumber. The blockage may be in the main sewer line and will need professional drain jetting." },
    ],
  },
  "how-to-repressurise-your-boiler": {
    name: "How to Repressurise Your Boiler",
    description: "Safe step-by-step instructions for repressurising a combi or system boiler that has lost pressure.",
    steps: [
      { name: "Turn off the boiler", text: "Switch the boiler off at the controls and allow it to cool for at least 30 minutes. Never repressurise a hot boiler." },
      { name: "Find the filling loop", text: "The filling loop is a short braided hose with one or two valves, usually found underneath the boiler or in the airing cupboard. It connects the cold mains supply to the heating system." },
      { name: "Check the pressure gauge", text: "The boiler pressure gauge should read between 1 and 1.5 bar when the system is cold. If it is below 1 bar, the system needs repressurising." },
      { name: "Open the filling valves", text: "Slowly open both valves on the filling loop — either turn the screwhead or lever — to allow cold mains water into the system." },
      { name: "Watch the pressure gauge", text: "Keep an eye on the gauge as the pressure rises. Stop adding water when it reaches 1.5 bar. Do not exceed 2 bar." },
      { name: "Close both valves", text: "Close both filling loop valves securely. If the loop is a single flexi-hose type, disconnect it after closing the valves." },
      { name: "Restart the boiler and monitor", text: "Switch the boiler back on. Check the pressure again after 10 minutes of operation. If pressure drops repeatedly, there may be a leak in the system — call a Gas Safe engineer." },
    ],
  },
  "how-to-fix-a-dripping-tap": {
    name: "How to Fix a Dripping Tap",
    description: "Step-by-step guide to repairing a dripping tap by replacing the washer or cartridge.",
    steps: [
      { name: "Turn off the water supply", text: "Find the isolation valve under the sink (a flat-head screwdriver slot on the pipe) and turn it 90 degrees to close. If there is no isolation valve, turn off the main stopcock." },
      { name: "Remove the tap handle", text: "Prise off the decorative cover on top of the handle to reveal the retaining screw. Remove the screw and lift off the handle." },
      { name: "Unscrew the headgear", text: "Use an adjustable spanner to unscrew the large hexagonal headgear nut holding the valve mechanism in place. Lift the headgear out." },
      { name: "Inspect the washer or cartridge", text: "On traditional taps, look for the rubber washer held by a small nut at the base of the headgear. On ceramic disc or cartridge taps, inspect the cartridge for damage." },
      { name: "Replace the worn part", text: "Take the old washer or cartridge to a plumbers' merchant to find an exact match. Fit the new washer or cartridge and reassemble in reverse order." },
      { name: "Turn the water back on", text: "Open the isolation valve slowly and test the tap. The drip should be gone. If it persists, the tap seat may be damaged and will need a professional repair or tap replacement." },
    ],
  },
  "how-to-fix-a-leaking-radiator": {
    name: "How to Fix a Leaking Radiator Valve",
    description: "Step-by-step guide to stopping a leaking radiator valve or connection.",
    steps: [
      { name: "Identify the source of the leak", text: "Dry the area around the radiator with a towel and watch closely to see exactly where the water is coming from — the TRV head, the lockshield valve, or the union nut connecting the radiator to the pipe." },
      { name: "Turn off the central heating", text: "Switch off the heating system and allow the radiator to cool completely before working on it." },
      { name: "Close both radiator valves", text: "Turn the thermostatic head fully clockwise (closed) and the lockshield valve fully clockwise using a spanner. This isolates the radiator without draining the whole system." },
      { name: "Drain the radiator slightly", text: "Place a bowl under the leaking valve. Loosen the union nut carefully to let a small amount of water out — just enough to relieve the pressure at the joint." },
      { name: "Apply PTFE tape or replace the olive", text: "For a valve body leak: wrap 10 to 15 layers of PTFE tape clockwise around the valve threads before reassembling. For a union nut leak: the olive seal may need replacing — a plumber can do this quickly." },
      { name: "Refill and repressurise", text: "Open both valves, allow the radiator to refill, and check the boiler pressure gauge. Repressurise if needed using the filling loop." },
      { name: "Monitor and call a plumber if needed", text: "Leave a dry cloth under the joint for 24 hours to check for further drips. If the leak continues or the radiator body itself is leaking, the radiator will need replacing — call a qualified plumber." },
    ],
  },
  "how-to-prevent-frozen-pipes": {
    name: "How to Prevent Frozen Pipes",
    description: "Practical steps to protect your home's pipes from freezing during cold weather in Peterborough and the surrounding areas.",
    steps: [
      { name: "Insulate exposed pipes", text: "Wrap any pipes in unheated areas — loft, garage, under suspended floors — with foam pipe lagging. This is cheap and available at any DIY store. Pay particular attention to pipes on north-facing external walls." },
      { name: "Keep heating on a low setting", text: "During cold spells, set your thermostat to at least 7°C even when you are out. The cost of heating is far less than the cost of a burst pipe repair." },
      { name: "Know where your stopcock is", text: "Find your main stopcock (usually under the kitchen sink or where the supply pipe enters the house) and make sure it turns freely. In an emergency you need to be able to shut off water within seconds." },
      { name: "Let warm air reach under-sink pipes", text: "Open the cabinet doors under kitchen and bathroom sinks on very cold nights to allow warm room air to reach the pipes on exterior walls." },
      { name: "Let taps drip during extreme cold", text: "If temperatures drop below -5°C for a sustained period, allow a small trickle from cold taps on exterior walls overnight. Moving water is much harder to freeze." },
      { name: "Check the property if going away", text: "If leaving your home empty in winter, ask a neighbour to check it every couple of days, keep the heating on low, and consider turning off the water at the stopcock and draining the system." },
      { name: "Know what to do if a pipe freezes", text: "If a pipe does freeze, never use a blowtorch or open flame to thaw it. Use warm towels or a hairdryer on the lowest setting, starting from the tap end and working back. Call a plumber in Peterborough immediately if a pipe bursts." },
    ],
  },
  "signs-drain-blocked": {
    name: "How to Identify a Blocked Drain",
    description: "Step-by-step checks to confirm whether your drain is blocked and what to try before calling a plumber.",
    steps: [
      { name: "Run water and watch the drain", text: "Run the cold tap for 30 seconds and watch how quickly the water drains. A healthy drain empties within 3–5 seconds. Slow draining is the first indicator of a blockage." },
      { name: "Listen for gurgling", text: "After water drains, listen for a gurgling sound coming from the plughole or nearby drains. Gurgling means air is being displaced by water forcing through a restricted pipe." },
      { name: "Check for smell", text: "Smell the drain opening. A musty, rotten, or sewage smell indicates organic matter trapped in the pipe. This is a reliable early warning sign even before draining becomes slow." },
      { name: "Check all drains in the property", text: "Test sinks, bath, shower, and toilet in other rooms. If multiple drains are slow simultaneously, the blockage is in the shared main drain rather than an individual appliance pipe." },
      { name: "Do the water meter test", text: "If you suspect a drain blockage is causing water to back up, turn off all water appliances and check the external water meter. If it is moving, there may also be a leak contributing to the problem." },
      { name: "Attempt DIY clearance", text: "Try boiling water, a plunger, or a bicarbonate of soda and vinegar flush. If these do not clear the blockage after two attempts, call a professional plumber." },
    ],
  },
  "no-hot-water-emergency": {
    name: "How to Diagnose No Hot Water",
    description: "Step-by-step checks to identify why you have no hot water and whether you can fix it yourself.",
    steps: [
      { name: "Check the boiler display", text: "Look at the boiler screen. Is there a fault code, flashing light, or blank display? A fault code tells you exactly what has gone wrong — look it up in your boiler manual or online." },
      { name: "Check the boiler pressure", text: "Look at the pressure gauge. If it reads below 1 bar, repressurise using the filling loop. Many boiler lock-outs causing no hot water are caused simply by low pressure." },
      { name: "Check thermostat settings", text: "Confirm the hot water schedule on your programmer or smart thermostat is correct. Check that the hot water temperature setting has not been accidentally changed." },
      { name: "Test whether heating also works", text: "Turn the heating on and wait 10 minutes. If radiators heat up but there is still no hot water, the problem is in the hot water circuit (likely diverter valve on a combi, or motorised valve on a system boiler)." },
      { name: "Check the condensate pipe in cold weather", text: "In winter, look for a white plastic pipe exiting the boiler through an outside wall. If it is frozen, pour warm water along it to thaw, then reset the boiler." },
      { name: "Reset the boiler", text: "Press and hold the reset button for 3 seconds (location varies by model). If the boiler fires up and hot water returns, monitor for 24 hours. If it locks out again, call a Gas Safe engineer." },
    ],
  },
};

// ── Guide category → related service slugs ────────────────────────────────────
const guideServiceMap: Record<string, string[]> = {
  costs:       ["boiler-service", "central-heating-services", "plumbing-repairs"],
  diy:         ["plumbing-repairs", "plumbing-installation", "drain-blockages"],
  boilers:     ["boiler-service", "central-heating-services", "gas-safety-certificates"],
  heating:     ["central-heating-services", "boiler-service", "plumbing-repairs"],
  emergencies: ["emergency-plumber", "damp-leak-detection", "plumbing-repairs"],
};

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // rebuild stale pages every hour

export async function generateStaticParams() {
  const guides = await prisma.guide.findMany({ select: { slug: true } });
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await prisma.guide.findUnique({ where: { slug } });
  if (!guide) return {};
  return buildMetadata({
    title: guide.name,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
    ogType: "article",
    image: "/images/homepage/hero-engineer.webp",
  });
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;

  const [guide, settings] = await Promise.all([
    prisma.guide.findUnique({ where: { slug } }),
    getSiteSettings(),
  ]);

  if (!guide) notFound();

  const relatedServiceSlugs = guideServiceMap[guide.category] ?? [];
  const [relatedGuides, relatedServicesRaw] = await Promise.all([
    prisma.guide.findMany({
      where: { category: guide.category, slug: { not: guide.slug } },
      take: 3,
    }),
    relatedServiceSlugs.length
      ? prisma.service.findMany({
          where: { slug: { in: relatedServiceSlugs } },
          select: { slug: true, name: true },
        })
      : Promise.resolve([]),
  ]);
  const relatedServices = relatedServiceSlugs
    .map((s) => relatedServicesRaw.find((r) => r.slug === s))
    .filter((r): r is { slug: string; name: string } => !!r);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: guide.name, href: `/guides/${guide.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.name,
    description: guide.excerpt,
    author: {
      "@type": "Organization",
      name: settings.companyName,
    },
    publisher: {
      "@type": "Organization",
      name: settings.companyName,
      logo: {
        "@type": "ImageObject",
        url: `${settings.siteUrl}/logos/logo-mark.webp`,
        width: 512,
        height: 512,
      },
    },
    datePublished: guide.publishedAt.toISOString(),
    dateModified: guide.updatedAt.toISOString(),
    mainEntityOfPage: `${settings.siteUrl}/guides/${guide.slug}`,
    articleSection: guideCategories[guide.category as keyof typeof guideCategories],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToGuideMap[guide.slug] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: howToGuideMap[guide.slug].name,
              description: howToGuideMap[guide.slug].description,
              step: howToGuideMap[guide.slug].steps.map((s, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: s.name,
                text: s.text,
              })),
            }),
          }}
        />
      )}

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-[var(--surface-alt)] border-b border-[var(--border)] py-3"
      >
        <div className="mx-auto max-w-3xl px-4 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-[var(--brand)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-[var(--brand)] transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-pp-heading font-medium truncate">{guide.name}</span>
        </div>
      </nav>

      {/* Article */}
      <div className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4">
          {/* Meta */}
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] bg-[rgba(200,16,46,0.08)] px-3 py-1 rounded-full">
              {guideCategories[guide.category as keyof typeof guideCategories]}
            </span>
            <span className="text-sm text-[var(--muted)]">{guide.readTime} min read</span>
            <span className="text-sm text-[var(--muted)]">
              Updated:{" "}
              {new Date(guide.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-pp-heading leading-tight mb-4">
            {guide.name}
          </h1>
          <p className="text-lg text-[var(--muted)] leading-relaxed mb-10 border-b border-[var(--border)] pb-10">
            {guide.excerpt}
          </p>

          {/* Inline CTA box */}
          <div className="my-10 rounded-xl border border-[var(--brand)] bg-[rgba(200,16,46,0.06)] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-pp-heading">Need a plumber in Peterborough?</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Qualified plumbing &amp; heating engineers — Peterborough and surrounding areas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/contact"
                className="btn-book-now bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
              >
                Contact Peterborough Plumbers
              </Link>
              {guide.category === "emergencies" && (
                <Link
                  href="/emergency"
                  className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
                >
                  Emergency plumber in Peterborough
                </Link>
              )}
              <a
                href={`tel:${settings.phoneHref}`}
                className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] transition-colors duration-200"
              >
                {settings.phone}
              </a>
            </div>
          </div>

          {/* Guide content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-pp-heading prose-headings:font-bold prose-a:text-[var(--brand)] prose-a:no-underline hover:prose-a:underline prose-ul:my-4 prose-li:my-1"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(guide.content) }}
          />

          {/* Related services */}
          {relatedServices.length > 0 && (
            <div className="mt-12 pt-10 border-t border-[var(--border)]">
              <h2 className="text-xl font-bold text-pp-heading mb-4">Related Services</h2>
              <div className="flex flex-wrap gap-2">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="bg-pp-teal/10 text-pp-heading px-4 py-2 rounded-full text-sm font-medium hover:bg-pp-teal/20 transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border)]">
              <h2 className="text-xl font-bold text-pp-heading mb-6">Related Guides</h2>
              <div className="grid gap-4">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/guides/${related.slug}`}
                    className="flex items-start gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--brand)] transition-colors duration-200 group"
                  >
                    <svg
                      className="h-5 w-5 text-[var(--brand)] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <p className="font-semibold text-pp-heading text-sm group-hover:text-[var(--brand)] transition-colors duration-200">
                        {related.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{related.readTime} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/guides"
                className="mt-6 inline-block text-sm text-[var(--brand)] font-semibold hover:underline"
              >
                ← View all guides
              </Link>
            </div>
          )}

          {/* Related areas we serve */}
          <div className="mt-14 pt-10 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold text-pp-heading mb-4">Areas We Serve</h2>
            <div className="flex flex-wrap gap-2">
              {(guideCategoryAreaMap[guide.category] ?? guideCategoryAreaMap["costs"]).map((area) => (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                >
                  Plumber in {area.name}
                </Link>
              ))}
              <Link
                href="/areas"
                className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                View all areas →
              </Link>
            </div>
          </div>

          {/* End-of-article CTA */}
          <div className="mt-12 pt-10 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-5">
              <div className="flex-1">
                <p className="font-semibold text-pp-heading">Need a plumber in Peterborough?</p>
                <p className="text-sm text-[var(--muted)] mt-1">Qualified engineers — clear upfront quotes, no hidden extras.</p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="bg-[var(--brand)] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--brand-hover)] transition-colors duration-200"
                >
                  Contact Peterborough Plumbers
                </Link>
                {guide.category === "emergencies" && (
                  <Link
                    href="/emergency"
                    className="bg-white border border-[var(--border)] text-pp-heading px-5 py-2.5 rounded-full font-semibold text-sm hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-200"
                  >
                    Emergency plumber →
                  </Link>
                )}
              </div>
            </div>
            {/* Quick links: related services + pricing */}
            <div className="flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
                >
                  {s.name}
                </Link>
              ))}
              <Link
                href="/pricing"
                className="text-xs font-medium text-pp-heading border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 rounded-full hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                View pricing →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}
