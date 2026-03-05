import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo/schema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({
  items,
  inverted = false,
}: {
  items: BreadcrumbItem[];
  /** Set true when breadcrumbs sit on a dark hero background or image overlay */
  inverted?: boolean;
}) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(allItems)) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`py-3 text-sm ${inverted ? "hero-label hero-text" : "text-pp-body/60"}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1">/</span>}
              {i === allItems.length - 1 ? (
                <span className={`font-medium flex items-center gap-1 ${inverted ? "text-white" : "text-pp-heading"}`}>
                  {item.href === "/" ? (
                    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                  ) : null}
                  {item.href === "/" ? <span className="sr-only">{item.name}</span> : item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 transition-colors duration-200 ${
                    inverted ? "hover:text-white" : "hover:text-pp-teal"
                  }`}
                >
                  {item.href === "/" ? (
                    <>
                      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                      <span className="sr-only">{item.name}</span>
                    </>
                  ) : item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
