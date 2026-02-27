"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Plumber = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  isOnDuty: boolean;
  lastSeenAt: string | null;
  createdAt: string;
  _count: { bookings: number };
};

type Props = {
  initial: Plumber[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
      style={{ background: "#0F172A" }}
    >
      {initials(name)}
    </div>
  );
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold ${
        active ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: active ? "#22C55E" : "#9CA3AF" }}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function DutyPill({ onDuty }: { onDuty: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold cursor-pointer select-none ${
        onDuty ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: onDuty ? "#F59E0B" : "#D1D5DB" }}
      />
      {onDuty ? "On duty" : "Off duty"}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PlumbersPanel({ initial }: Props) {
  const [plumbers, setPlumbers] = useState<Plumber[]>(initial);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // ── Create plumber ──────────────────────────────────────────────────────────
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (form.password !== form.confirm) {
      setFormError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/plumbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error ?? "Failed to create plumber.");
      } else {
        setFormSuccess(
          `✓  Created "${data.plumber.name}" — ID: ${data.plumber.id}`
        );
        setForm({ name: "", email: "", phone: "", password: "", confirm: "" });
        setPlumbers((prev) => [
          {
            ...data.plumber,
            createdAt:
              data.plumber.createdAt ?? new Date().toISOString(),
            lastSeenAt: null,
            _count: { bookings: 0 },
          },
          ...prev,
        ]);
      }
    } catch {
      setFormError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Toggle field ────────────────────────────────────────────────────────────
  async function toggle(
    id: string,
    field: "isActive" | "isOnDuty",
    current: boolean
  ) {
    const res = await fetch(`/api/admin/plumbers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    if (res.ok) {
      const { plumber } = await res.json();
      setPlumbers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...plumber } : p))
      );
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  const active = plumbers.filter((p) => p.isActive).length;
  const onDuty = plumbers.filter((p) => p.isOnDuty).length;

  return (
    <div className="p-4 lg:p-6 space-y-5 lg:space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg lg:text-xl font-bold text-slate-800">Team</h1>
          <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
            {plumbers.length} registered · {active} active · {onDuty} on duty
          </p>
        </div>
      </div>

      {/* ── Create form ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <span
            className="h-6 w-6 rounded-md flex items-center justify-center shrink-0"
            style={{ background: "#FEF2F2" }}
          >
            <svg className="h-3.5 w-3.5" style={{ color: "#C8102E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          <p className="text-sm font-bold text-slate-700">Add New Plumber</p>
        </div>

        <form onSubmit={handleCreate} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="John Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Phone{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="07700 900001"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="Min. 8 characters"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {/* Strength hint */}
              {form.password && (
                <p className={`mt-1 text-[0.68rem] ${form.password.length >= 8 ? "text-green-600" : "text-amber-600"}`}>
                  {form.password.length >= 8 ? "✓ Strong enough" : `${8 - form.password.length} more character${8 - form.password.length !== 1 ? "s" : ""} needed`}
                </p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.confirm}
                onChange={(e) =>
                  setForm((f) => ({ ...f, confirm: e.target.value }))
                }
                placeholder="Repeat password"
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-colors ${
                  form.confirm && form.confirm !== form.password
                    ? "border-red-300 focus:ring-red-200 focus:border-red-400"
                    : "border-slate-200 focus:ring-[#C8102E]/25 focus:border-[#C8102E]"
                }`}
              />
              {form.confirm && form.confirm !== form.password && (
                <p className="mt-1 text-[0.68rem] text-red-500">Passwords do not match</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-[42px] rounded-lg text-sm font-bold text-white transition-opacity disabled:opacity-60"
                style={{ background: "#C8102E" }}
              >
                {submitting ? "Creating…" : "Create Plumber"}
              </button>
            </div>
          </div>

          {/* Feedback */}
          {(formError || formSuccess) && (
            <div className="mt-4">
              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 font-mono">
                  {formSuccess}
                </p>
              )}
            </div>
          )}
        </form>
      </div>

      {/* ── Plumbers table ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-bold text-slate-700">Registered Plumbers</p>
        </div>

        {plumbers.length === 0 ? (
          <p className="px-5 py-10 text-sm text-slate-400 text-center">
            No plumbers yet — add one above.
          </p>
        ) : (
          <>
            {/* Mobile card list */}
            <div className="block lg:hidden divide-y divide-slate-50">
              {plumbers.map((p) => (
                <div key={p.id} className="px-4 py-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar name={p.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400 truncate">{p.email}</p>
                      {p.phone && (
                        <p className="text-xs text-slate-400">{p.phone}</p>
                      )}
                    </div>
                    <StatusPill active={p.isActive} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pl-11">
                    <span className="text-[0.68rem] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded">
                      …{p.id.slice(-8)}
                    </span>
                    <span className="text-[0.68rem] text-slate-500">
                      {p._count.bookings} job{p._count.bookings !== 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(p.id, "isActive", p.isActive)}
                      className="text-[0.68rem] text-slate-500 underline hover:text-slate-700"
                    >
                      {p.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(p.id, "isOnDuty", p.isOnDuty)}
                    >
                      <DutyPill onDuty={p.isOnDuty} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Plumber", "Email", "Phone", "Plumber ID", "Jobs", "Status", "On Duty"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-2.5 text-[0.65rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {plumbers.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={p.name} />
                          <span className="text-sm font-semibold text-slate-700">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-500">{p.email}</td>
                      <td className="px-5 py-3 text-sm text-slate-500">
                        {p.phone ?? <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded">
                          {p.id}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-medium text-slate-600">
                        {p._count.bookings}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          onClick={() => toggle(p.id, "isActive", p.isActive)}
                          title={p.isActive ? "Click to deactivate" : "Click to activate"}
                        >
                          <StatusPill active={p.isActive} />
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          type="button"
                          onClick={() => toggle(p.id, "isOnDuty", p.isOnDuty)}
                        >
                          <DutyPill onDuty={p.isOnDuty} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
