import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Peterborough Plumbers",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-pp-navy flex flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-brand text-[6rem] font-black leading-none tracking-tight select-none">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-white/60 max-w-sm leading-relaxed">
        Sorry, we couldn&apos;t find that page. It may have moved or the link might be wrong.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-6 rounded-full text-white font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
            boxShadow: "0 4px 20px rgba(200,16,46,0.40)",
          }}
        >
          Go to homepage
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center h-12 px-6 rounded-full text-white font-bold text-sm border border-white/20 bg-white/[0.07] hover:bg-white/[0.14] hover:border-white/35 transition-all duration-200"
        >
          Contact us
        </Link>
      </div>
      <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {[
          { label: "Services", href: "/services" },
          { label: "Emergency", href: "/emergency" },
          { label: "Pricing", href: "/pricing" },
          { label: "Reviews", href: "/reviews" },
          { label: "Blog", href: "/blog" },
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-white/50 text-sm hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
