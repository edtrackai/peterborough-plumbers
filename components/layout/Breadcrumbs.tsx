import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo/schema";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(allItems)) }}
      />
      <nav aria-label="Breadcrumb" className="py-3 text-sm text-pp-dark/60">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span className="mx-1">/</span>}
              {i === allItems.length - 1 ? (
                <span className="text-pp-dark font-medium">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-pp-accent transition-colors">
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
