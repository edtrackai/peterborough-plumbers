"use client";

import dynamic from "next/dynamic";

const WhatsAppFloat    = dynamic(() => import("@/components/ui/WhatsAppFloat"),             { ssr: false });
const ChatWidgetLoader = dynamic(() => import("@/components/ChatWidgetLoader"),              { ssr: false });
const CookieBanner     = dynamic(() => import("@/components/ui/CookieBanner"),              { ssr: false });
const GoogleAnalytics  = dynamic(() => import("@/components/analytics/GoogleAnalytics"),    { ssr: false });
const ExitIntentModal  = dynamic(() => import("@/components/ui/ExitIntentModal"),           { ssr: false });

export default function ClientOnlyWidgets() {
  return (
    <>
      <WhatsAppFloat />
      <ChatWidgetLoader />
      <CookieBanner />
      <GoogleAnalytics />
      <ExitIntentModal />
    </>
  );
}
