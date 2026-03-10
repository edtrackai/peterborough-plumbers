"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlumberLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/plumber/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      router.push("/plumber/requests");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background: "#080808",
        backgroundImage: [
          "radial-gradient(ellipse 80% 45% at 50% -5%, rgba(200,16,46,0.22) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 30% at 80% 80%, rgba(200,16,46,0.05) 0%, transparent 60%)",
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)",
        ].join(", "),
        backgroundSize: "100% 100%, 100% 100%, 28px 28px",
      }}
    >
      <div className="w-full max-w-[360px]">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-8 text-center">
          {/* Icon */}
          <div className="relative inline-flex mb-5">
            <div
              className="h-[60px] w-[60px] rounded-[18px] flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, #E31530 0%, #C8102E 55%, #7f0b1e 100%)",
                boxShadow: "0 0 0 1px rgba(200,16,46,0.4), 0 8px 28px rgba(200,16,46,0.35), 0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                  stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Online dot */}
            <span
              className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#080808]"
              style={{ background: "#22c55e" }}
              aria-hidden="true"
            />
          </div>

          <h1 className="text-[22px] font-bold text-white tracking-tight leading-tight">
            Plumber Portal
          </h1>
          <p className="text-[13px] text-zinc-500 mt-1.5 tracking-wide">
            Peterborough Plumbers &nbsp;·&nbsp; Field Operations
          </p>
        </div>

        {/* ── Card ───────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-7"
          style={{
            background: "linear-gradient(160deg, #161616 0%, #111111 100%)",
            border: "1px solid transparent",
            backgroundClip: "padding-box",
            boxShadow: [
              "0 0 0 1px rgba(255,255,255,0.06)",
              "0 1px 0 0 rgba(255,255,255,0.07) inset",
              "0 24px 48px rgba(0,0,0,0.55)",
              "0 8px 16px rgba(0,0,0,0.35)",
            ].join(", "),
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                Email address
              </label>
              <div className="relative">
                {/* Envelope icon */}
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,16,46,0.7)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                Password
              </label>
              <div className="relative">
                {/* Lock icon */}
                <svg
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl py-3 pl-10 pr-11 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,16,46,0.7)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {/* Show / hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div
                    className="h-4 w-4 rounded-[4px] border transition-all peer-checked:border-[#C8102E]"
                    style={{
                      background: rememberMe ? "rgba(200,16,46,0.85)" : "rgba(255,255,255,0.04)",
                      border: rememberMe ? "1px solid #C8102E" : "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {rememberMe && (
                      <svg className="h-4 w-4 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[12px] text-zinc-500">Remember me</span>
              </label>

              <button
                type="button"
                className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors"
                onClick={() => setError("Password reset is managed by your administrator.")}
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[13px] text-red-400 leading-snug">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-1 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
              style={{
                background: loading
                  ? "#9e0b24"
                  : "linear-gradient(135deg, #E31530 0%, #C8102E 55%, #8B0C1E 100%)",
                boxShadow: loading
                  ? "none"
                  : "0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 20px rgba(200,16,46,0.35), 0 2px 6px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 24px rgba(200,16,46,0.45), 0 2px 8px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 20px rgba(200,16,46,0.35), 0 2px 6px rgba(0,0,0,0.4)";
              }}
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

          </form>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <svg className="h-3 w-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[11px] text-zinc-700">
            Secure &nbsp;·&nbsp; Encrypted &nbsp;·&nbsp; Peterborough Plumbers &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  );
}
