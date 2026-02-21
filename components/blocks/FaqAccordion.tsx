"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({
  faqs,
  heading = "Frequently Asked Questions",
}: {
  faqs: FaqItem[];
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading text-center mb-12">
          {heading}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="font-semibold text-pp-heading pr-4">{faq.q}</span>
                <svg
                  className={cn(
                    "h-5 w-5 text-pp-teal shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === i ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p className="px-5 text-pp-body/80 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
