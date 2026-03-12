"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TemplateRow {
  id: string;
  key: string;
  channel: string;
  subject: string | null;
  body: string;
  variables: string[];
  isActive: boolean;
  version: number;
  updatedBy: string | null;
  updatedAt: string;
}

export interface KeywordRow {
  id: string;
  word: string;
  intent: string;
  language: string;
  isActive: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const CHANNEL_CFG: Record<string, { label: string; bg: string; text: string }> = {
  whatsapp: { label: "WhatsApp", bg: "#DCFCE7", text: "#166534" },
  email:    { label: "Email",    bg: "#DBEAFE", text: "#1E40AF" },
  sms:      { label: "SMS",      bg: "#FEF3C7", text: "#92400E" },
};

const INTENT_CFG: Record<string, { label: string; bg: string; text: string }> = {
  approve:  { label: "Approve",  bg: "#DCFCE7", text: "#166534" },
  decline:  { label: "Decline",  bg: "#FEE2E2", text: "#991B1B" },
  discuss:  { label: "Discuss",  bg: "#FFF7ED", text: "#9A3412" },
  unclear:  { label: "Unclear",  bg: "#F3F4F6", text: "#6B7280" },
};

function ChannelBadge({ channel }: { channel: string }) {
  const cfg = CHANNEL_CFG[channel] ?? { label: channel, bg: "#F3F4F6", text: "#6B7280" };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[0.62rem] font-bold uppercase tracking-wide"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      {cfg.label}
    </span>
  );
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Template accordion item ────────────────────────────────────────────────────

function TemplateItem({ template, onSaved }: { template: TemplateRow; onSaved: (updated: TemplateRow) => void }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(template.body);
  const [subject, setSubject] = useState(template.subject ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/templates/${template.key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, subject: subject || null }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        onSaved({ ...template, body, subject: subject || null });
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(data.error ?? "Failed to save template.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setBody(template.body);
    setSubject(template.subject ?? "");
    setEditing(false);
    setError(null);
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => { setOpen((o) => !o); if (editing) handleCancel(); }}
        className="w-full flex items-center gap-3 px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <svg
          className={`h-3.5 w-3.5 text-slate-400 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="flex-1 flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-slate-800 truncate">{template.key}</span>
          <ChannelBadge channel={template.channel} />
          {!template.isActive && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[0.62rem] font-bold text-slate-400 bg-slate-100">
              Inactive
            </span>
          )}
        </span>
        <span className="text-xs text-slate-400 shrink-0 hidden sm:block">
          v{template.version} · {fmtDate(template.updatedAt)}
        </span>
        {saved && (
          <span className="text-[0.68rem] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full shrink-0">
            Saved
          </span>
        )}
      </button>

      {/* Accordion body */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-5 bg-white flex flex-col gap-4">
          {/* Subject (email only) */}
          {template.channel === "email" && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subject line</label>
              {editing ? (
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]"
                />
              ) : (
                <p className="text-sm text-slate-700">{template.subject ?? <span className="text-slate-400 italic">No subject</span>}</p>
              )}
            </div>
          )}

          {/* Body */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Template body</label>
            {editing ? (
              <textarea
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] resize-y"
                spellCheck={false}
              />
            ) : (
              <pre
                className="rounded-lg px-4 py-3 text-sm text-slate-700 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto"
                style={{ background: "#F8FAFC", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                {template.body}
              </pre>
            )}
          </div>

          {/* Available variables */}
          {template.variables.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Available Variables
              </p>
              <div className="flex flex-wrap gap-1.5">
                {template.variables.map((v) => (
                  <span
                    key={v}
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold cursor-default select-all"
                    style={{ background: "#EFF6FF", color: "#1E40AF", border: "1px solid #BFDBFE" }}
                    title={`Copy: {{${v}}}`}
                  >
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                  style={{ background: "#C8102E" }}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-[#C8102E] hover:text-[#C8102E] transition-all"
              >
                Edit Template
              </button>
            )}
            {template.updatedBy && (
              <p className="text-xs text-slate-400 ml-auto">Last edited by {template.updatedBy}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Approval keywords section ─────────────────────────────────────────────────

function ApprovalKeywordsSection({ keywords }: { keywords: KeywordRow[] }) {
  const byIntent = keywords.reduce<Record<string, KeywordRow[]>>((acc, k) => {
    if (!acc[k.intent]) acc[k.intent] = [];
    acc[k.intent].push(k);
    return acc;
  }, {});

  const intents = Object.keys(byIntent).sort();

  return (
    <div
      className="rounded-2xl bg-white p-6 flex flex-col gap-5"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <div>
        <h2 className="text-sm font-bold text-slate-800">Approval Keywords</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Customer reply words that trigger automatic intent detection.
        </p>
      </div>

      {intents.length === 0 ? (
        <p className="text-sm text-slate-400 italic">No approval keywords defined.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {intents.map((intent) => {
            const cfg = INTENT_CFG[intent] ?? { label: intent, bg: "#F3F4F6", text: "#6B7280" };
            return (
              <div key={intent}>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.text }}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-xs text-slate-400">{byIntent[intent].length} words</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {byIntent[intent].map((kw) => (
                    <span
                      key={kw.id}
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        kw.isActive ? "" : "opacity-40"
                      }`}
                      style={{ background: "#F8FAFC", color: "#475569", border: "1px solid rgba(0,0,0,0.07)" }}
                    >
                      {kw.word}
                      {!kw.isActive && <span className="ml-1 text-slate-400">(off)</span>}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function TemplatesClient({
  templates: initialTemplates,
  keywords,
}: {
  templates: TemplateRow[];
  keywords: KeywordRow[];
}) {
  const [templates, setTemplates] = useState<TemplateRow[]>(initialTemplates);
  const [channelFilter, setChannelFilter] = useState<string>("all");

  const channels = Array.from(new Set(templates.map((t) => t.channel))).sort();

  const filtered =
    channelFilter === "all" ? templates : templates.filter((t) => t.channel === channelFilter);

  function handleSaved(updated: TemplateRow) {
    setTemplates((prev) => prev.map((t) => (t.key === updated.key ? updated : t)));
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Channel filter */}
      <div
        className="flex items-center gap-1 w-fit rounded-xl p-1"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        {(["all", ...channels] as const).map((ch) => (
          <button
            key={ch}
            onClick={() => setChannelFilter(ch)}
            className={[
              "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize",
              channelFilter === ch ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
            style={
              channelFilter === ch
                ? { background: "linear-gradient(135deg, #E31530, #C8102E)", boxShadow: "0 2px 6px rgba(200,16,46,0.3)" }
                : {}
            }
          >
            {ch === "all" ? "All" : ch}
          </button>
        ))}
      </div>

      {/* Templates accordion */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400 py-8 text-center">No templates found.</p>
        ) : (
          filtered.map((t) => (
            <TemplateItem key={t.id} template={t} onSaved={handleSaved} />
          ))
        )}
      </div>

      {/* Approval keywords */}
      <ApprovalKeywordsSection keywords={keywords} />
    </div>
  );
}
