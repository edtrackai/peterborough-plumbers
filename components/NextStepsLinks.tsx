import Link from "next/link";

const serviceLinks = [
  { href: "/pricing",   label: "View Pricing" },
  { href: "/contact",   label: "Contact Us" },
  { href: "/emergency", label: "Emergency Help" },
  { href: "/services",  label: "All Services" },
  { href: "/areas",     label: "Areas We Cover" },
  { href: "/faqs",      label: "FAQs" },
];

const areaLinks = [
  { href: "/contact",   label: "Book a Plumber" },
  { href: "/pricing",   label: "View Pricing" },
  { href: "/emergency", label: "Emergency Plumber" },
  { href: "/services",  label: "All Services" },
  { href: "/guides",    label: "Guides Hub" },
  { href: "/faqs",      label: "FAQs" },
];

export default function NextStepsLinks({ variant }: { variant: "service" | "area" }) {
  const links = variant === "service" ? serviceLinks : areaLinks;
  const heading = variant === "service" ? "Next Steps" : "Popular Next Steps";

  return (
    <section className="py-12 bg-[var(--surface-alt)]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl font-bold text-pp-heading mb-6">{heading}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 list-none p-0 m-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium text-pp-heading hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
