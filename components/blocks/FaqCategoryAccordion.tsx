"use client";

import { useState } from "react";
import Link from "next/link";

export interface FaqCategory {
  id: string;
  heading: string;
  icon: string;
  serviceSlug: string;
  faqs: { q: string; a: string }[];
}

export default function FaqCategoryAccordion({
  categories,
}: {
  categories: FaqCategory[];
}) {
  // First FAQ in first category open by default
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    () => new Set([`${categories[0]?.id ?? ""}-0`])
  );

  const toggle = (key: string) =>
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 space-y-16">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-28">

            {/* ── Category heading ─────────────────────────────── */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl" aria-hidden="true">{cat.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-pp-heading">{cat.heading}</h2>
                <Link
                  href={`/services/${cat.serviceSlug}`}
                  className="text-xs text-[var(--brand)] hover:underline"
                >
                  View {cat.heading} service →
                </Link>
              </div>
            </div>

            {/* ── FAQ items ────────────────────────────────────── */}
            <div className="space-y-3">
              {cat.faqs.map((faq, i) => {
                const key = `${cat.id}-${i}`;
                const isOpen = openKeys.has(key);

                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-black/[0.09] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    {/* Question row */}
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                      aria-controls={`answer-${key}`}
                      id={`question-${key}`}
                      className={[
                        "w-full flex items-start justify-between gap-4 px-6 py-5 text-left",
                        "transition-colors duration-150",
                        isOpen ? "border-b border-black/[0.07]" : "hover:bg-gray-50",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-[var(--brand)] focus-visible:ring-inset",
                      ].join(" ")}
                    >
                      <span className="font-semibold text-pp-heading text-[0.9375rem] leading-snug">
                        {faq.q}
                      </span>

                      {/* + rotates to × when open */}
                      <span
                        aria-hidden="true"
                        className={[
                          "shrink-0 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center",
                          "border text-base leading-none font-light",
                          "transition-all duration-200",
                          isOpen
                            ? "rotate-45 border-[var(--brand)] text-[var(--brand)]"
                            : "border-[var(--border)] text-[var(--muted)]",
                        ].join(" ")}
                      >
                        +
                      </span>
                    </button>

                    {/* Answer panel — smooth via grid-rows trick */}
                    <div
                      id={`answer-${key}`}
                      role="region"
                      aria-labelledby={`question-${key}`}
                      className={[
                        "grid transition-[grid-template-rows] duration-200 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-6 pb-5 pt-4 text-sm text-[var(--muted)] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
