"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ConfigSettingRow {
  id: string;
  key: string;
  value: string;
  valueType: string;
  group: string;
  label: string;
  description: string | null;
  updatedAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const GROUP_CFG: Record<string, { label: string; description: string; icon: React.ReactNode }> = {
  pricing: {
    label: "Pricing",
    description: "Default labour rates, callout fees, and surcharges.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  quotes: {
    label: "Quotes",
    description: "Quote validity periods, VAT rates, and approval settings.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  variations: {
    label: "Variations",
    description: "Thresholds for auto-approval and office review requirements.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  notifications: {
    label: "Notifications",
    description: "WhatsApp and email notification triggers and delays.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  general: {
    label: "General",
    description: "Miscellaneous settings for the platform.",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Single config row ─────────────────────────────────────────────────────────

function ConfigRow({
  setting,
  onSaved,
}: {
  setting: ConfigSettingRow;
  onSaved: (updated: ConfigSettingRow) => void;
}) {
  const [draftValue, setDraftValue] = useState(setting.value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const dirty = draftValue !== setting.value;

  async function handleSave() {
    if (!dirty) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/config/${setting.key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: draftValue }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        onSaved({ ...setting, value: draftValue });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(data.error ?? "Failed to save setting.");
        setDraftValue(setting.value);
      }
    } catch {
      setError("Network error.");
      setDraftValue(setting.value);
    } finally {
      setSaving(false);
    }
  }

  function renderInput() {
    if (setting.valueType === "boolean") {
      const checked = draftValue === "true";
      return (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => {
            const next = checked ? "false" : "true";
            setDraftValue(next);
            // Auto-save toggles immediately
            setSaving(true);
            setError(null);
            fetch(`/api/admin/config/${setting.key}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ value: next }),
            })
              .then((r) => r.json())
              .then((d) => {
                if (d.error) {
                  setError(d.error);
                  setDraftValue(checked ? "true" : "false");
                } else {
                  onSaved({ ...setting, value: next });
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }
              })
              .catch(() => {
                setError("Network error.");
                setDraftValue(checked ? "true" : "false");
              })
              .finally(() => setSaving(false));
          }}
          disabled={saving}
          className={[
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50",
            checked ? "bg-[#C8102E]" : "bg-slate-200",
          ].join(" ")}
        >
          <span
            className={[
              "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-4" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      );
    }

    if (setting.valueType === "number") {
      return (
        <input
          type="number"
          step="0.01"
          value={draftValue}
          onChange={(e) => setDraftValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
          disabled={saving}
          className="w-32 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-800 text-right tabular-nums focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] disabled:opacity-50"
        />
      );
    }

    // string / json
    return (
      <input
        type="text"
        value={draftValue}
        onChange={(e) => setDraftValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
        disabled={saving}
        className="w-64 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] disabled:opacity-50"
      />
    );
  }

  return (
    <div
      className="flex items-start gap-4 py-4"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
    >
      {/* Label + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-800">{setting.label}</p>
          <span
            className="inline-block px-1.5 py-0.5 rounded text-[0.58rem] font-mono text-slate-400"
            style={{ background: "#F1F5F9" }}
          >
            {setting.key}
          </span>
        </div>
        {setting.description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{setting.description}</p>
        )}
        {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 shrink-0">
        {renderInput()}
        {saving && (
          <span className="text-xs text-slate-400">Saving…</span>
        )}
        {saved && !saving && (
          <span className="text-xs font-semibold text-green-700">Saved</span>
        )}
        {dirty && !saving && setting.valueType !== "boolean" && (
          <button
            onClick={handleSave}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#C8102E" }}
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

// ── Config group card ──────────────────────────────────────────────────────────

function ConfigGroup({
  group,
  settings,
  onSaved,
}: {
  group: string;
  settings: ConfigSettingRow[];
  onSaved: (updated: ConfigSettingRow) => void;
}) {
  const cfg = GROUP_CFG[group] ?? { label: group, description: "", icon: null };

  return (
    <div
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      {/* Group header */}
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
      >
        {cfg.icon && (
          <span
            className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-[#C8102E]"
            style={{ background: "rgba(200,16,46,0.08)" }}
          >
            {cfg.icon}
          </span>
        )}
        <div>
          <p className="text-sm font-bold text-slate-800 capitalize">{cfg.label}</p>
          {cfg.description && (
            <p className="text-xs text-slate-500 mt-0.5">{cfg.description}</p>
          )}
        </div>
        <span className="ml-auto text-xs text-slate-400">{settings.length} setting{settings.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Rows */}
      <div className="px-6">
        {settings.map((s) => (
          <ConfigRow key={s.id} setting={s} onSaved={onSaved} />
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function ConfigClient({
  settings: initialSettings,
  groups,
}: {
  settings: ConfigSettingRow[];
  groups: string[];
}) {
  const [settings, setSettings] = useState<ConfigSettingRow[]>(initialSettings);

  function handleSaved(updated: ConfigSettingRow) {
    setSettings((prev) => prev.map((s) => (s.key === updated.key ? updated : s)));
  }

  if (settings.length === 0) {
    return (
      <div
        className="rounded-2xl flex items-center justify-center py-24 text-center"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        <div>
          <p className="text-slate-400 font-medium">No configuration settings found</p>
          <p className="text-slate-300 text-sm mt-1">
            Run the seed script to populate default config values.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group) => {
        const groupSettings = settings.filter((s) => s.group === group);
        if (groupSettings.length === 0) return null;
        return (
          <ConfigGroup
            key={group}
            group={group}
            settings={groupSettings}
            onSaved={handleSaved}
          />
        );
      })}

      <p className="text-xs text-slate-400 text-center pb-4">
        Changes are saved to the database immediately. Last updated settings shown per-row.
      </p>
    </div>
  );
}
