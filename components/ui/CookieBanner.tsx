"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Consent types & storage ─────────────────────────────────────────────────

const CONSENT_KEY = "pp_cookie_consent";

export interface ConsentPrefs {
  necessary: true;
  analytics: boolean;
  timestamp: number;
  version: string;
}

export function getStoredConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPrefs;
  } catch {
    return null;
  }
}

/** Returns true only if the user has explicitly accepted analytics cookies. */
export function getAnalyticsConsent(): boolean {
  return getStoredConsent()?.analytics === true;
}

function persist(analytics: boolean): void {
  const prefs: ConsentPrefs = {
    necessary: true,
    analytics,
    timestamp: Date.now(),
    version: "1",
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("pp:cookie-consent", { detail: prefs }));
}

// ─── Toggle ──────────────────────────────────────────────────────────────────

function Toggle({
  id,
  checked,
  onChange,
  disabled = false,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-[26px] w-11 shrink-0 rounded-full transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        checked ? "bg-brand" : "bg-white/15",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[3px] left-[3px] h-5 w-5 rounded-full shadow-md",
          "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          checked ? "translate-x-[18px] bg-white" : "translate-x-0 bg-white/60",
        ].join(" ")}
      />
    </button>
  );
}

// ─── Shared glass styles (inline — works with any Tailwind version) ───────────

const GLASS_DARK: React.CSSProperties = {
  background: "rgba(12, 12, 12, 0.82)",
  backdropFilter: "blur(36px) saturate(180%)",
  WebkitBackdropFilter: "blur(36px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.09)",
  boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const MODAL_GLASS: React.CSSProperties = {
  background: "rgba(16, 16, 16, 0.90)",
  backdropFilter: "blur(48px) saturate(200%)",
  WebkitBackdropFilter: "blur(48px) saturate(200%)",
  border: "1px solid rgba(255, 255, 255, 0.10)",
  boxShadow: "0 48px 120px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)",
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function CookieBanner() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Show banner on first visit
  useEffect(() => {
    if (!getStoredConsent()) {
      const t = setTimeout(() => setBannerOpen(true), 800);
      return () => clearTimeout(t);
    }
    setAnalyticsOn(getStoredConsent()?.analytics ?? false);
  }, []);

  // Listen for "Manage Cookies" trigger from footer
  useEffect(() => {
    function handleOpen() {
      setAnalyticsOn(getStoredConsent()?.analytics ?? false);
      setBannerOpen(false);
      setModalOpen(true);
    }
    window.addEventListener("pp:open-cookie-prefs", handleOpen);
    return () => window.removeEventListener("pp:open-cookie-prefs", handleOpen);
  }, []);

  // Focus trap + Escape + body scroll lock
  useEffect(() => {
    if (!modalOpen) return;

    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModalOpen(false);
        if (!getStoredConsent()) setBannerOpen(true);
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;

      const focusable = Array.from(
        cardRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen]);

  // ── Actions ───────────────────────────────────────────────────────────────

  function acceptAll() {
    persist(true);
    setBannerOpen(false);
    setModalOpen(false);
  }

  function rejectAll() {
    persist(false);
    setBannerOpen(false);
    setModalOpen(false);
  }

  function savePrefs() {
    persist(analyticsOn);
    setModalOpen(false);
  }

  function handleClose() {
    setModalOpen(false);
    if (!getStoredConsent()) setBannerOpen(true);
  }

  function openModal() {
    setAnalyticsOn(getStoredConsent()?.analytics ?? false);
    setBannerOpen(false);
    setModalOpen(true);
  }

  return (
    <>
      {/* ─── Banner ───────────────────────────────────────────────────────── */}
      {bannerOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-live="polite"
          className="pp-slide-up fixed bottom-5 left-4 right-4 z-[100] sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
        >
          <div className="rounded-2xl p-5" style={GLASS_DARK}>

            {/* Lock icon + heading row */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="shrink-0 h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(200,16,46,0.18)", border: "1px solid rgba(200,16,46,0.28)" }}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand" aria-hidden>
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-white font-semibold text-[15px] leading-snug">
                Your privacy
              </h2>
            </div>

            {/* Copy */}
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.52)" }}>
              We use essential cookies to keep the site working, and optional analytics to improve
              our service.{" "}
              <Link
                href="/cookies"
                className="underline underline-offset-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Cookie policy
              </Link>
            </p>

            {/* Accept All */}
            <button
              onClick={acceptAll}
              className="w-full rounded-full py-2.5 text-sm font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 mb-2"
              style={{ background: "var(--brand)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand)")}
            >
              Accept all
            </button>

            {/* Secondary row */}
            <div className="flex gap-2">
              <button
                onClick={openModal}
                className="flex-1 rounded-full py-2.5 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
                }}
              >
                Manage
              </button>
              <button
                onClick={rejectAll}
                className="flex-1 rounded-full py-2.5 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
                }}
              >
                Reject
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── Preferences Modal ────────────────────────────────────────────── */}
      {modalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[150]"
            aria-hidden="true"
            onClick={handleClose}
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          />

          {/* Centering shell */}
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-none">
            <div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-label="Cookie preferences"
              aria-describedby="cookie-prefs-desc"
              className="pp-modal-in relative w-full max-w-[500px] rounded-2xl overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
              style={MODAL_GLASS}
            >
              {/* Red gradient top line */}
              <div style={{ height: "1px", background: "linear-gradient(90deg, #C8102E 0%, rgba(200,16,46,0.3) 60%, transparent 100%)", flexShrink: 0 }} />

              {/* Scrollable body */}
              <div className="overflow-y-auto">
                <div className="p-6 sm:p-8">

                  {/* Close button */}
                  <button
                    ref={closeButtonRef}
                    onClick={handleClose}
                    aria-label="Close cookie preferences"
                    className="absolute top-5 right-5 p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                  </button>

                  {/* Header */}
                  <h2 className="font-semibold text-white text-[20px] leading-tight mb-1 pr-10">
                    Cookie Preferences
                  </h2>
                  <p id="cookie-prefs-desc" className="text-[13px] mb-7" style={{ color: "rgba(255,255,255,0.45)" }}>
                    Choose which cookies you allow. You can change this any time via the footer.
                  </p>

                  {/* Cookie rows */}
                  <div className="flex flex-col gap-3 mb-7">

                    {/* Strictly Necessary */}
                    <div
                      className="flex items-center gap-4 px-4 py-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4.5 w-4.5" style={{ color: "rgba(255,255,255,0.45)", width: "18px", height: "18px" }} aria-hidden>
                          <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.939 11.21a.436.436 0 01-.122.017.436.436 0 01-.122-.017C5.26 16.563 2 12.162 2 7a11.95 11.95 0 01.104-1.589.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.749zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm leading-snug">
                          Strictly Necessary
                        </p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                          Booking, sessions, and security — always active.
                        </p>
                      </div>
                      <span
                        className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }}
                      >
                        Always on
                      </span>
                    </div>

                    {/* Analytics */}
                    <div
                      className="flex items-center gap-4 px-4 py-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="shrink-0 h-9 w-9 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" style={{ color: "rgba(255,255,255,0.45)", width: "18px", height: "18px" }} aria-hidden>
                          <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 003 0v-13A1.5 1.5 0 0015.5 2zM9.5 6A1.5 1.5 0 008 7.5v9a1.5 1.5 0 003 0v-9A1.5 1.5 0 009.5 6zM3.5 10A1.5 1.5 0 002 11.5v5a1.5 1.5 0 003 0v-5A1.5 1.5 0 003.5 10z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor="toggle-analytics"
                          className="block font-medium text-white text-sm leading-snug cursor-pointer"
                        >
                          Analytics
                        </label>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                          Anonymous usage data via Google Analytics.
                        </p>
                      </div>
                      <div className="shrink-0 ml-2">
                        <Toggle
                          id="toggle-analytics"
                          checked={analyticsOn}
                          onChange={setAnalyticsOn}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={savePrefs}
                      className="w-full rounded-full py-3 text-sm font-semibold text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      style={{ background: "var(--brand)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--brand-hover)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--brand)")}
                    >
                      Save preferences
                    </button>
                    <button
                      onClick={acceptAll}
                      className="w-full rounded-full py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        background: "rgba(255,255,255,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                      }}
                    >
                      Accept all
                    </button>
                    <button
                      onClick={rejectAll}
                      className="w-full py-2 text-[13px] transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                    >
                      Reject non-essential
                    </button>
                  </div>

                  {/* Policy links */}
                  <div className="flex items-center justify-center gap-4 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <Link
                      href="/cookies"
                      className="text-[12px] underline underline-offset-2 transition-colors"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                    >
                      Cookie Policy
                    </Link>
                    <span style={{ color: "rgba(255,255,255,0.15)" }} aria-hidden>·</span>
                    <Link
                      href="/privacy"
                      className="text-[12px] underline underline-offset-2 transition-colors"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                    >
                      Privacy Policy
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
