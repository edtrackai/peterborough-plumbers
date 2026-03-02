"use client";

/**
 * Thin client button that opens the CookieBanner preferences modal.
 * Dispatches a custom event that CookieBanner listens for — no shared state needed.
 */
export default function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("pp:open-cookie-prefs"))}
      className="text-[#ffffffb3] hover:text-white text-sm transition-colors duration-200"
    >
      Manage Cookies
    </button>
  );
}
