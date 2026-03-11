"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";

export default function PlumberSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gasSafeNumber: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function set(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/plumber/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          gasSafeNumber: form.gasSafeNumber || undefined,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields);
        setError(data.error ?? "Sign-up failed. Please try again.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputBase =
    "w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 transition-all focus:outline-none";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "rgba(200,16,46,0.7)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,16,46,0.1)";
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
    e.currentTarget.style.boxShadow = "none";
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background: "#080808",
        backgroundImage: [
          "radial-gradient(ellipse 100% 55% at 50% -8%, rgba(200,16,46,0.28) 0%, transparent 58%)",
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.022) 1px, transparent 0)",
        ].join(", "),
        backgroundSize: "100% 100%, 28px 28px",
      }}
    >
      <div className="w-full max-w-[380px]">

        {/* Header */}
        <div className="mb-8 text-center">
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6"
                  stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-tight">Apply to Join</h1>
          <p className="text-[13px] text-zinc-500 mt-1.5">Peterborough Plumbers — Plumber Portal</p>
        </div>

        {/* Success state */}
        {success ? (
          <div
            className="rounded-2xl p-7 text-center space-y-4"
            style={{
              background: "linear-gradient(160deg, rgba(26,26,26,0.92) 0%, rgba(14,14,14,0.96) 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 24px 60px rgba(0,0,0,0.65)",
            }}
          >
            <div className="text-5xl">✅</div>
            <div>
              <p className="text-lg font-bold text-white">Application Submitted!</p>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                We've received your application and will review it shortly. You'll receive an email once a decision has been made.
              </p>
            </div>
            <Link
              href="/plumber/login"
              className="block w-full rounded-xl py-3 text-sm font-semibold text-white text-center transition-all"
              style={{
                background: "linear-gradient(135deg, #E31530 0%, #C8102E 55%, #8B0C1E 100%)",
                boxShadow: "0 6px 20px rgba(200,16,46,0.35)",
              }}
            >
              Back to Login
            </Link>
          </div>
        ) : (

          /* Form card */
          <div
            className="rounded-2xl p-7"
            style={{
              background: "linear-gradient(160deg, rgba(26,26,26,0.92) 0%, rgba(14,14,14,0.96) 100%)",
              backdropFilter: "blur(12px)",
              boxShadow: [
                "0 0 0 1px rgba(255,255,255,0.07)",
                "0 1px 0 0 rgba(255,255,255,0.08) inset",
                "0 24px 60px rgba(0,0,0,0.65)",
                "0 0 80px rgba(200,16,46,0.09)",
              ].join(", "),
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Full name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Full Name <span className="text-[#C8102E]">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="John Smith"
                    autoComplete="name"
                    className={inputBase}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                {fieldErrors.name && <p className="text-[11px] text-red-400">{fieldErrors.name[0]}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Email Address <span className="text-[#C8102E]">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={inputBase}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] text-red-400">{fieldErrors.email[0]}</p>}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Phone Number <span className="text-[#C8102E]">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="07700 900001"
                    autoComplete="tel"
                    className={inputBase}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                {fieldErrors.phone && <p className="text-[11px] text-red-400">{fieldErrors.phone[0]}</p>}
              </div>

              {/* Gas Safe Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Gas Safe Registration No. <span className="text-zinc-600 normal-case tracking-normal font-normal">(if applicable)</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <input
                    type="text"
                    value={form.gasSafeNumber}
                    onChange={set("gasSafeNumber")}
                    placeholder="e.g. 123456"
                    autoComplete="off"
                    className={inputBase}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <p className="text-[10.5px] text-zinc-600 leading-snug">
                  We'll verify this with the Gas Safe Register before approving gas &amp; boiler work.
                </p>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Password <span className="text-[#C8102E]">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={set("password")}
                    placeholder="Min. 12 characters"
                    autoComplete="new-password"
                    className={`${inputBase} pr-11`}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
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
                {form.password && (
                  <p className={`text-[11px] ${form.password.length >= 12 ? "text-green-500" : "text-amber-500"}`}>
                    {form.password.length >= 12 ? "✓ Strong enough" : `${12 - form.password.length} more characters needed`}
                  </p>
                )}
                {fieldErrors.password && <p className="text-[11px] text-red-400">{fieldErrors.password[0]}</p>}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col gap-2">
                <label className="text-[10.5px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">
                  Confirm Password <span className="text-[#C8102E]">*</span>
                </label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-[15px] w-[15px] text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.confirm}
                    onChange={set("confirm")}
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    className={inputBase}
                    style={{
                      ...inputStyle,
                      borderColor: form.confirm && form.confirm !== form.password ? "rgba(239,68,68,0.5)" : undefined,
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-[11px] text-red-400">Passwords do not match</p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
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
                className="mt-1 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #E31530 0%, #C8102E 55%, #8B0C1E 100%)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 20px rgba(200,16,46,0.35)",
                }}
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>

            </form>

            {/* Login link */}
            <p className="mt-5 text-center text-[12px] text-zinc-600">
              Already have an account?{" "}
              <Link href="/plumber/login" className="text-zinc-400 hover:text-white transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <svg className="h-3 w-3 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[11px] text-zinc-700">
            Secure &nbsp;·&nbsp; Encrypted &nbsp;·&nbsp; Peterborough Plumbers
          </p>
        </div>

      </div>
    </div>
  );
}
