/**
 * Lightweight analytics event helper.
 * Pushes events to window.dataLayer for GTM consumption.
 * Safe to call from client components — does nothing if dataLayer is unavailable.
 */

type AnalyticsEvent =
  | { event: "booking_form_submit"; service: string }
  | { event: "whatsapp_click"; source: string }
  | { event: "call_click"; source: string }
  | { event: "book_click"; source: string };

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export function trackEvent(data: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(data);
}
