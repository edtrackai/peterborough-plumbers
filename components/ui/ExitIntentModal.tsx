"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSettings } from "@/components/providers/SettingsProvider";

const STORAGE_KEY = "pp_exit_intent_seen";

export default function ExitIntentModal() {
  const s = useSettings();
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    // Show only once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    // Desktop: mouse leaves top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered.current || e.clientY > 10) return;
      triggered.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    // Mobile fallback: show after 45s of page load
    const timer = setTimeout(() => {
      if (triggered.current || sessionStorage.getItem(STORAGE_KEY)) return;
      triggered.current = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }, 45_000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-[fadeInUp_0.25s_ease]">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 mb-4">
          <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>

        <h2 id="exit-modal-title" className="text-xl font-black text-pp-navy mb-1">
          Before you go — get a free quote
        </h2>
        <p className="text-gray-500 text-sm mb-5 leading-relaxed">
          Local Peterborough plumbers. Same-day call-outs available. No call-out fee.
        </p>

        {/* Star rating */}
        <div className="flex items-center gap-1.5 mb-5">
          {[1,2,3,4,5].map((i) => (
            <svg key={i} className={`h-4 w-4 ${i <= Math.round(Number(s.googleRating)) ? "text-yellow-400" : "text-gray-200"}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500 font-medium">{s.googleRating}/5 · {s.reviewCount} Google reviews</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center h-12 rounded-full bg-brand text-white font-bold text-sm hover:bg-brand-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Book a Plumber — Free Quote
          </Link>
          <a
            href={`tel:${s.phoneHref}`}
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full border-2 border-pp-navy text-pp-navy font-bold text-sm hover:bg-pp-navy hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pp-navy focus-visible:ring-offset-2"
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            Call {s.phone}
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          No obligation · Local Peterborough engineers
        </p>
      </div>
    </div>
  );
}
