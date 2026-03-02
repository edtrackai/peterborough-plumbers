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

type Props = { initial: Plumber[] };

// ── Small helpers ─────────────────────────────────────────────────────────────
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
        active ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: active ? "#22C55E" : "#F59E0B" }}
      />
      {active ? "Active" : "Suspended"}
    </span>
  );
}

function DutyPill({ onDuty }: { onDuty: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold ${
        onDuty
          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ background: onDuty ? "#3B82F6" : "#D1D5DB" }}
      />
      {onDuty ? "On duty" : "Off duty"}
    </span>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PlumbersPanel({ initial }: Props) {
  const [plumbers, setPlumbers] = useState<Plumber[]>(initial);

  // Create form
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

  // Per-row action state
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionBusy, setActionBusy] = useState<string | null>(null); // plumber id
  const [rowError, setRowError] = useState<Record<string, string>>({});

  // ── Create ──────────────────────────────────────────────────────────────────
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (form.password !== form.confirm) {
      setFormError("Passwords do not match.");
      return;
    }
    if (form.password.length < 12) {
      setFormError("Password must be at least 12 characters.");
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
        setFormSuccess(`✓  Created "${data.plumber.name}" — ID: ${data.plumber.id}`);
        setForm({ name: "", email: "", phone: "", password: "", confirm: "" });
        setPlumbers((prev) => [
          {
            ...data.plumber,
            createdAt: data.plumber.createdAt ?? new Date().toISOString(),
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

  // ── Toggle isActive / isOnDuty ──────────────────────────────────────────────
  async function toggle(id: string, field: "isActive" | "isOnDuty", current: boolean) {
    setActionBusy(id);
    setRowError((prev) => { const n = { ...prev }; delete n[id]; return n; });
    try {
      const res = await fetch(`/api/admin/plumbers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !current }),
      });
      if (res.ok) {
        const { plumber } = await res.json();
        setPlumbers((prev) => prev.map((p) => (p.id === id ? { ...p, ...plumber } : p)));
      } else {
        const d = await res.json();
        setRowError((prev) => ({ ...prev, [id]: d.error ?? "Update failed" }));
      }
    } catch {
      setRowError((prev) => ({ ...prev, [id]: "Network error" }));
    } finally {
      setActionBusy(null);
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    setActionBusy(id);
    setRowError((prev) => { const n = { ...prev }; delete n[id]; return n; });
    try {
      const res = await fetch(`/api/admin/plumbers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setPlumbers((prev) => prev.filter((p) => p.id !== id));
        setConfirmDeleteId(null);
      } else {
        setRowError((prev) => ({ ...prev, [id]: data.error ?? "Delete failed" }));
        setConfirmDeleteId(null);
        // If the error suggests suspending, auto-scroll / highlight stays visible via rowError
      }
    } catch {
      setRowError((prev) => ({ ...prev, [id]: "Network error" }));
      setConfirmDeleteId(null);
    } finally {
      setActionBusy(null);
    }
  }

  // ── Stats ───────────────────────────────────────────────────────────────────
  const activeCount = plumbers.filter((p) => p.isActive).length;
  const suspendedCount = plumbers.filter((p) => !p.isActive).length;
  const onDutyCount = plumbers.filter((p) => p.isOnDuty).length;

  return (
    <div className="p-4 lg:p-6 flex flex-col flex-1 gap-5 lg:gap-6">

      {/* Header */}
      <div>
        <h1 className="text-lg lg:text-xl font-bold text-slate-800">Team</h1>
        <p className="text-xs lg:text-sm text-slate-500 mt-0.5">
          {plumbers.length} registered · {activeCount} active · {suspendedCount} suspended · {onDutyCount} on duty
        </p>
      </div>

      {/* ── Create form ─────────────────────────────────────────────────────── */}
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
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="John Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="john@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Phone <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="07700 900001"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/25 focus:border-[#C8102E] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 12 characters"
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
              {form.password && (
                <p className={`mt-1 text-[0.68rem] ${form.password.length >= 12 ? "text-green-600" : "text-amber-600"}`}>
                  {form.password.length >= 12
                    ? "✓ Strong enough"
                    : `${12 - form.password.length} more character${12 - form.password.length !== 1 ? "s" : ""} needed`}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.confirm}
                onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
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

      {/* ── Plumbers table ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-bold text-slate-700">Registered Plumbers</p>
        </div>

        {plumbers.length === 0 ? (
          <p className="px-5 py-10 text-sm text-slate-400 text-center">
            No plumbers yet — add one above.
          </p>
        ) : (
          <>
            {/* ── Mobile cards ── */}
            <div className="block lg:hidden divide-y divide-slate-50">
              {plumbers.map((p) => {
                const busy = actionBusy === p.id;
                const confirming = confirmDeleteId === p.id;
                const err = rowError[p.id];

                return (
                  <div key={p.id} className={`px-4 py-4 space-y-3 ${!p.isActive ? "bg-amber-50/40" : ""}`}>
                    <div className="flex items-start gap-3">
                      <Avatar name={p.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                        <p className="text-xs text-slate-400 truncate">{p.email}</p>
                        {p.phone && <p className="text-xs text-slate-400">{p.phone}</p>}
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
                        disabled={busy}
                        onClick={() => toggle(p.id, "isOnDuty", p.isOnDuty)}
                      >
                        <DutyPill onDuty={p.isOnDuty} />
                      </button>
                    </div>

                    {/* Action row */}
                    {confirming ? (
                      <div className="pl-11 flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-600 font-medium">
                          Delete <strong>{p.name}</strong>? This is permanent.
                        </span>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {busy ? "Deleting…" : "Yes, delete"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="pl-11 flex flex-wrap gap-2">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => toggle(p.id, "isActive", p.isActive)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                            p.isActive
                              ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                              : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                          }`}
                        >
                          {busy ? "…" : p.isActive ? "Suspend" : "Activate"}
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => setConfirmDeleteId(p.id)}
                          className="px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {err && (
                      <p className="pl-11 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {err}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Desktop table ── */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Plumber", "Email", "Phone", "Plumber ID", "Jobs", "Status", "On Duty", "Actions"].map(
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
                  {plumbers.map((p) => {
                    const busy = actionBusy === p.id;
                    const confirming = confirmDeleteId === p.id;
                    const err = rowError[p.id];

                    return (
                      <>
                        <tr
                          key={p.id}
                          className={`transition-colors ${!p.isActive ? "bg-amber-50/30" : "hover:bg-slate-50"}`}
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar name={p.name} />
                              <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-500">{p.email}</td>
                          <td className="px-5 py-3 text-sm text-slate-500">
                            {p.phone ?? <span className="text-slate-300">—</span>}
                          </td>
                          <td className="px-5 py-3">
                            <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded select-all">
                              {p.id}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm font-medium text-slate-600">
                            {p._count.bookings}
                          </td>
                          <td className="px-5 py-3">
                            <StatusPill active={p.isActive} />
                          </td>
                          <td className="px-5 py-3">
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => toggle(p.id, "isOnDuty", p.isOnDuty)}
                            >
                              <DutyPill onDuty={p.isOnDuty} />
                            </button>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              {/* Suspend / Activate */}
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => toggle(p.id, "isActive", p.isActive)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap ${
                                  p.isActive
                                    ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                                    : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                }`}
                              >
                                {busy && confirmDeleteId !== p.id ? "…" : p.isActive ? "Suspend" : "Activate"}
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() =>
                                  setConfirmDeleteId((cur) => (cur === p.id ? null : p.id))
                                }
                                className="px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-semibold transition-colors disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Inline confirmation row */}
                        {confirming && (
                          <tr className="bg-red-50 border-b border-red-100">
                            <td colSpan={8} className="px-5 py-3">
                              <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-sm text-red-700 font-medium">
                                  Permanently delete <strong>{p.name}</strong>? This cannot be undone.
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => handleDelete(p.id)}
                                    className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
                                  >
                                    {busy ? "Deleting…" : "Yes, delete permanently"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-4 py-1.5 rounded-lg bg-white text-slate-600 text-xs font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Per-row error */}
                        {err && (
                          <tr className="bg-red-50">
                            <td colSpan={8} className="px-5 py-2.5">
                              <p className="text-xs text-red-600">{err}</p>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
