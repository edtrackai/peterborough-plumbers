"use client";

/**
 * GA4 script loader — only activates after the user accepts analytics cookies.
 *
 * On mount: checks localStorage via getAnalyticsConsent().
 * While mounted: listens for pp:cookie-consent events from CookieBanner.
 * Never loads GA4 scripts if analytics consent is absent.
 *
 * To connect Google Analytics:
 *   1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX to .env.local
 *   2. That's it — this component handles the rest.
 */

import Script from "next/script";
import { useEffect, useState } from "react";
import { getAnalyticsConsent, type ConsentPrefs } from "@/components/ui/CookieBanner";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check persisted consent on mount
    if (getAnalyticsConsent()) {
      setEnabled(true);
      return;
    }

    // Listen for live consent changes from CookieBanner
    function handleConsent(e: Event) {
      const prefs = (e as CustomEvent<ConsentPrefs>).detail;
      if (prefs?.analytics === true) setEnabled(true);
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
