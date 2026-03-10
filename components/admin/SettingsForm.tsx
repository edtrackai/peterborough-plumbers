"use client";

import { useState } from "react";

type Settings = {
  companyName: string;
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  email: string;
  address: string;
  gasSafeNumber: string;
  googleRating: string;
  reviewCount: string;
  yearsExperience: string;
};

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [form, setForm] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  function set(key: keyof Settings, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const fields: { key: keyof Settings; label: string; hint?: string }[] = [
    { key: "companyName", label: "Company Name" },
    { key: "phone", label: "Phone Number (display)", hint: "e.g. 01733797074" },
    { key: "phoneHref", label: "Phone href (tel link)", hint: "e.g. +441733797074" },
    { key: "whatsappNumber", label: "WhatsApp Number", hint: "e.g. 441733797074 (no +)" },
    { key: "email", label: "Email Address" },
    { key: "address", label: "Business Address" },
    { key: "gasSafeNumber", label: "Gas Safe Number" },
    { key: "googleRating", label: "Google Rating", hint: "e.g. 4.9" },
    { key: "reviewCount", label: "Review Count", hint: "e.g. 120" },
    { key: "yearsExperience", label: "Years Experience", hint: "e.g. 50+" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {fields.map(({ key, label, hint }) => (
        <div key={key}>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {label}
          </label>
          <input
            type="text"
            value={form[key]}
            onChange={(e) => set(key, e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/40 focus:border-[#C8102E]"
          />
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center px-6 h-10 rounded-lg bg-[#C8102E] text-white text-sm font-bold hover:bg-[#a50d26] disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {status === "saved" && (
          <span className="text-sm font-medium text-green-600">Saved successfully</span>
        )}
        {status === "error" && (
          <span className="text-sm font-medium text-red-500">Save failed — try again</span>
        )}
      </div>
    </form>
  );
}
