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
        className={`py-3 text-sm ${inverted ? "text-white/60 hero-text" : "text-pp-body/60"}`}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1">/</span>}
              {i === allItems.length - 1 ? (
                <span className={`font-medium ${inverted ? "text-white" : "text-pp-heading"}`}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 hover:text-pp-teal ${
                    inverted ? "text-white/70 hover:text-white" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
