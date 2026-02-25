"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlumberLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(200,16,46,0.18) 0%, transparent 65%), #0A0A0A",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand)] mb-5 shadow-lg shadow-[var(--brand)]/20">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <path
                d="M5 11C5 7.13 8.13 4 12 4h2c3.87 0 7 3.13 7 7 0 2.1-.92 3.98-2.38 5.28L16 22H10L7.38 16.28A6.96 6.96 0 015 11z"
                stroke="white" strokeWidth="1.8" strokeLinejoin="round"
              />
              <path d="M10 22v2.5M16 22v2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Plumber Portal</h1>
          <p className="text-sm text-zinc-500 mt-1">Peterborough Plumbers</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[#111111] border border-white/[0.07] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                required
                className="w-full rounded-xl bg-[#1A1A1A] border border-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-zinc-700 transition-colors focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]/50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-xl bg-[#1A1A1A] border border-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-zinc-700 transition-colors focus:outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]/50"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                <svg className="h-4 w-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-xl bg-[var(--brand)] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--brand-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[var(--brand)]/15"
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
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-zinc-700">
            Test:{" "}
            <span className="font-mono text-zinc-600">plumber1@local.test</span>
            {" / "}
            <span className="font-mono text-zinc-600">Plumber123!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
