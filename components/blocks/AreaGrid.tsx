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
    <section className="relative py-16 lg:py-24">
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
          <div className="absolute inset-0 bg-pp-dark/80" />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <h2 className={`text-3xl lg:text-4xl font-bold text-center mb-12 ${backgroundImage ? "text-white" : "text-pp-dark"}`}>
          {heading}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/areas/${area.slug}`}
              className={`group rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 border ${backgroundImage ? "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20" : "bg-white border-pp-dark/5"}`}
            >
              <h3 className={`text-lg font-bold transition-colors ${backgroundImage ? "text-white group-hover:text-pp-yellow" : "text-pp-dark group-hover:text-pp-accent"}`}>
                {area.name}
              </h3>
              <p className={`text-xs mt-1 ${backgroundImage ? "text-white/60" : "text-pp-dark/50"}`}>
                {area.postcodes.join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
