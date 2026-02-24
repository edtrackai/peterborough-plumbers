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
    <div className="flex min-h-screen items-center justify-center px-4 bg-pp-navy">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="inline-block rounded-xl bg-pp-teal px-4 py-1.5 text-sm font-bold text-white tracking-wider mb-3">PP</span>
          <h1 className="text-2xl font-bold text-white">Plumber Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to manage your jobs</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="plumber1@local.test"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-pp-teal py-3.5 font-bold text-white hover:bg-pp-teal-dark transition-colors disabled:opacity-60 mt-1"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            Test: <span className="font-mono">plumber1@local.test</span> / <span className="font-mono">Plumber123!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
