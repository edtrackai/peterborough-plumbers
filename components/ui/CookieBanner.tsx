"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COOKIE_KEY = "pp_cookie_consent";

export type ConsentState = "accepted" | "rejected" | null;

export function getConsentState(): ConsentState {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(COOKIE_KEY) as ConsentState) ?? null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no decision has been made yet
    if (!getConsentState()) {
      // Short delay so it doesn't fight with page render
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    // Signal to analytics scripts that consent is given
    window.dispatchEvent(new CustomEvent("pp:cookie-consent", { detail: "accepted" }));
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(COOKIE_KEY, "rejected");
    window.dispatchEvent(new CustomEvent("pp:cookie-consent", { detail: "rejected" }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md bg-white border border-gray-200 shadow-2xl rounded-t-2xl lg:rounded-2xl p-5"
    >
      <p className="text-sm text-pp-body leading-relaxed mb-4">
        We use cookies to improve your experience and track how people use our site.
        See our{" "}
        <Link href="/cookies" className="text-pp-teal underline hover:text-pp-teal-dark">
          Cookie Policy
        </Link>{" "}
        for details.
      </p>
      <div className="flex gap-3">
        <button
          onClick={accept}
          className="flex-1 bg-pp-teal text-white py-2.5 rounded-full text-sm font-bold hover:bg-pp-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-pp-teal focus:ring-offset-2"
        >
          Accept all
        </button>
        <button
          onClick={reject}
          className="flex-1 border-2 border-gray-300 text-pp-body py-2.5 rounded-full text-sm font-semibold hover:border-pp-navy hover:text-pp-navy transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
