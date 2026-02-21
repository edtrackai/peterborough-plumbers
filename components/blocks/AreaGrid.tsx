import Link from "next/link";
import Image from "next/image";
import type { Area } from "@/content/areas";

export default function AreaGrid({
  areas,
  heading = "Areas We Cover",
  backgroundImage,
}: {
  areas: Area[];
  heading?: string;
  backgroundImage?: string;
}) {
  return (
    <section
      className="relative py-16 lg:py-24"
      style={!backgroundImage ? { backgroundColor: "#F5F5F5" } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Map of areas covered by Peterborough Plumbers including Orton, Werrington, Hampton, and Bretton"
            fill
            className="object-cover"
            loading="lazy"
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-pp-navy/80" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className={`text-center mb-12 ${backgroundImage ? "" : ""}`}>
          <h2
            className={`text-3xl lg:text-4xl font-bold ${
              backgroundImage ? "text-white" : "text-pp-heading section-heading-underline"
            }`}
          >
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className={`group rounded-xl p-5 text-center shadow-sm transition-all duration-200 border ${
                backgroundImage
                  ? "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                  : "bg-white border-gray-100 hover:border-pp-teal hover:shadow-[0_4px_16px_rgba(0,168,156,0.15)]"
              }`}
            >
              <h3
                className={`text-base font-bold transition-colors duration-200 ${
                  backgroundImage
                    ? "text-white group-hover:text-pp-teal"
                    : "text-pp-heading group-hover:text-pp-teal"
                }`}
              >
                {area.name}
              </h3>
              <p
                className={`text-xs mt-1 ${
                  backgroundImage ? "text-white/60" : "text-pp-body/50"
                }`}
              >
                {area.postcodes.join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
