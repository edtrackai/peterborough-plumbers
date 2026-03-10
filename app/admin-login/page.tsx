"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push("/admin");
      router.refresh();
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

        {/* Logo / wordmark */}
        <div className="mb-8 text-center">
          <div
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E31530 0%, #C8102E 60%, #8B0C1E 100%)",
              boxShadow: "0 8px 24px rgba(200,16,46,0.35)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                stroke="white" strokeWidth="1.8" strokeLinejoin="round"
              />
              <circle cx="12" cy="9" r="2.5" stroke="white" strokeWidth="1.8" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-sm text-zinc-500 mt-1">Peterborough Plumbers</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-700 transition-colors focus:outline-none focus:ring-1"
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#C8102E")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-700 transition-colors focus:outline-none focus:ring-1"
                  style={{
                    background: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C8102E")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2.5 rounded-xl px-4 py-3"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <svg className="h-4 w-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: loading
                  ? "#a50d26"
                  : "linear-gradient(135deg, #E31530 0%, #C8102E 60%, #8B0C1E 100%)",
                boxShadow: "0 4px 14px rgba(200,16,46,0.3)",
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
                "Sign In"
              )}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-700">
          Peterborough Plumbers &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
