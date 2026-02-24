"use client";

/**
 * GA4 script loader — only activates after the user accepts cookies.
 * Listens for the 'pp:cookie-consent' custom event dispatched by CookieBanner.tsx.
 *
 * On subsequent page loads, checks localStorage for existing consent.
 * Never loads GA4 if the user has rejected cookies.
 */

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsentState } from "@/components/ui/CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check persisted consent on mount
    if (getConsentState() === "accepted") {
      setEnabled(true);
      return;
    }

    // Listen for consent event from CookieBanner
    function handleConsent(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "accepted") setEnabled(true);
    }

    window.addEventListener("pp:cookie-consent", handleConsent);
    return () => window.removeEventListener("pp:cookie-consent", handleConsent);
  }, []);

  if (!GA_ID || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
