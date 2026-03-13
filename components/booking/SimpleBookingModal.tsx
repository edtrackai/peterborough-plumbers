"use client";

import { useState, useEffect, useRef } from "react";
import { siteSettings } from "@/content/settings";

// ── Quick option chips ─────────────────────────────────────────────────────

const QUICK_OPTIONS = [
  { label: "Boiler issue",    message: "Hi, I need help with a boiler issue." },
  { label: "No heating",      message: "Hi, my heating isn't working." },
  { label: "No hot water",    message: "Hi, I have no hot water." },
  { label: "Leak",            message: "Hi, I have a leak that needs fixing." },
  { label: "Blocked drain",   message: "Hi, I need help with a blocked drain." },
  { label: "Toilet issue",    message: "Hi, I have a toilet issue." },
  { label: "Tap issue",       message: "Hi, I have a tap that needs fixing." },
  { label: "Other",           message: "Hi, I need help with a plumbing issue." },
];

// ── SimpleBookingModal ─────────────────────────────────────────────────────
// Rendered once in root layout. Opens via custom event "open-booking-modal".

export function SimpleBookingModal() {
  const [open, setOpen]           = useState(false);
  const [selected, setSelected]   = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const textareaRef               = useRef<HTMLTextAreaElement>(null);

  // Listen for the global open event (fired by BookNowButton or any trigger).
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSelected(null);
      setCustomText("");
    };
    window.addEventListener("open-booking-modal", handler);
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setSelected(null);
    setCustomText("");
  }

  function handleContinue() {
    let message: string;
    if (customText.trim()) {
      message = `Hi, I need help with: ${customText.trim()}`;
    } else if (selected) {
      const opt = QUICK_OPTIONS.find((o) => o.label === selected);
      message = opt?.message ?? "Hi, I need help with a plumbing issue.";
    } else {
      return; // button is disabled — should not reach here
    }
    const url = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  }

  const canContinue = customText.trim().length > 0 || selected !== null;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Sheet — bottom on mobile, centred on desktop */}
      <div className="relative w-full sm:max-w-[440px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">

        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden" aria-hidden="true">
          <div className="h-1 w-10 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3 sm:pt-5">
          <div>
            <h2 id="booking-modal-title" className="text-[1.05rem] font-black text-[#242424] leading-tight">
              Book a Plumber
            </h2>
            <p className="text-[0.8rem] text-gray-500 mt-0.5">
              What do you need help with?
            </p>
          </div>
          <button
            onClick={close}
            className="shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
            aria-label="Close"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pb-6 space-y-4">

          {/* Quick option chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setSelected(opt.label);
                  setCustomText(""); // clear free text when chip selected
                }}
                className={[
                  "px-3.5 py-1.5 rounded-full text-[0.8rem] font-semibold border transition-all duration-150",
                  selected === opt.label
                    ? "bg-[#C8102E] border-[#C8102E] text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-[#C8102E] hover:text-[#C8102E]",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[0.7rem] text-gray-400 font-medium tracking-wide uppercase">
              or describe your issue
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Free-text input */}
          <textarea
            ref={textareaRef}
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              if (e.target.value) setSelected(null); // clear chip when typing
            }}
            placeholder="e.g. My boiler keeps switching off and there's a drip under the sink…"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] transition-colors"
          />

          {/* CTA — WhatsApp green when active */}
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              canContinue
                ? {
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(37,211,102,0.32)",
                    ["--tw-ring-color" as string]: "#25D366",
                  }
                : { background: "#E5E7EB", color: "#9CA3AF" }
            }
          >
            {/* WhatsApp logo */}
            <svg className="h-[18px] w-[18px] shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.857L0 24l6.341-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.374l-.36-.213-3.727.885.917-3.626-.235-.373A9.818 9.818 0 1112 21.818z" />
            </svg>
            Continue on WhatsApp
          </button>

          <p className="text-center text-[0.72rem] text-gray-400 leading-relaxed">
            We typically reply within a few minutes during business hours.
          </p>

        </div>
      </div>
    </div>
  );
}
