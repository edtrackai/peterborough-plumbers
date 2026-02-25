"use client";

import { useState, useTransition } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PipelineLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  serviceType: string | null;
  message: string | null;
  status: string;
  source: string;
  createdAt: string;
}

// ── Pipeline stages ───────────────────────────────────────────────────────────
const STAGES = [
  {
    id: "new",
    label: "New",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    nextLabel: "Mark Contacted",
    nextStatus: "contacted",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "contacted",
    label: "Contacted",
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    nextLabel: "Mark Converted",
    nextStatus: "converted",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: "converted",
    label: "Converted",
    color: "#22C55E",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    nextLabel: null,
    nextStatus: null,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "closed",
    label: "Closed",
    color: "#94A3B8",
    bg: "#F8FAFC",
    border: "#E2E8F0",
    nextLabel: null,
    nextStatus: null,
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

// ── Icons ─────────────────────────────────────────────────────────────────────
function PhoneIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <circle cx="12" cy="11" r="3" />
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// ── Lead card (shared mobile + desktop) ───────────────────────────────────────
function LeadCard({
  lead,
  stage,
  onUpdate,
}: {
  lead: PipelineLead;
  stage: (typeof STAGES)[number];
  onUpdate: (id: string, status: string) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [hidden, setHidden] = useState(false);

  const ago = (() => {
    const mins = Math.round((Date.now() - new Date(lead.createdAt).getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
    return `${Math.round(mins / 1440)}d ago`;
  })();

  function advance() {
    if (!stage.nextStatus) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: stage.nextStatus }),
      });
      if (res.ok) onUpdate(lead.id, stage.nextStatus!);
    });
  }

  function markClosed() {
    startTransition(async () => {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      });
      if (res.ok) { setHidden(true); onUpdate(lead.id, "closed"); }
    });
  }

  if (hidden) return null;

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-3.5 space-y-2.5 hover:shadow-md transition-shadow border border-slate-100"
      style={{ borderLeft: `3px solid ${stage.color}`, opacity: pending ? 0.5 : 1 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-black text-slate-800 leading-tight">{lead.name}</p>
          <p className="text-[0.65rem] text-slate-400 mt-0.5">{ago}</p>
        </div>
        {lead.source && (
          <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold uppercase tracking-wide shrink-0">
            {lead.source.replace(/_/g, " ")}
          </span>
        )}
      </div>

      {/* Service */}
      {lead.serviceType && (
        <p className="text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg px-2.5 py-1.5 truncate">
          {lead.serviceType}
        </p>
      )}

      {/* Message snippet */}
      {lead.message && (
        <p className="text-[0.65rem] text-slate-400 line-clamp-2 leading-relaxed italic">
          &ldquo;{lead.message}&rdquo;
        </p>
      )}

      {/* Contact */}
      <div className="flex flex-col gap-1">
        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-[0.68rem] text-slate-500 hover:text-slate-800 transition-colors">
          <PhoneIcon /> {lead.phone}
        </a>
        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-[0.68rem] text-slate-500 hover:text-slate-800 transition-colors truncate">
          <MailIcon /> {lead.email}
        </a>
        {lead.postcode && (
          <span className="flex items-center gap-1.5 text-[0.68rem] text-slate-400">
            <MapIcon /> {lead.postcode}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="pt-1 border-t border-slate-100 flex gap-1.5">
        {stage.nextLabel && stage.nextStatus && (
          <button
            onClick={advance}
            disabled={pending}
            className="flex-1 py-1.5 rounded-lg text-[0.68rem] font-bold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            style={{ background: STAGES.find((s) => s.id === stage.nextStatus)?.color ?? stage.color }}
          >
            {stage.nextLabel}
          </button>
        )}
        {stage.id !== "closed" && stage.id !== "converted" && (
          <button
            onClick={markClosed}
            disabled={pending}
            className="px-2.5 py-1.5 rounded-lg text-[0.68rem] font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            title="Mark as closed"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

// ── Mobile accordion view ─────────────────────────────────────────────────────
function MobilePipeline({
  leads,
  onUpdate,
}: {
  leads: PipelineLead[];
  onUpdate: (id: string, s: string) => void;
}) {
  const [expanded, setExpanded] = useState<string | null>("new");

  return (
    <div className="space-y-2">
      {STAGES.map((stage) => {
        const cards = leads.filter((l) => l.status === stage.id);
        const isOpen = expanded === stage.id;

        return (
          <div
            key={stage.id}
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: stage.border, background: stage.bg }}
          >
            <button
              className="w-full px-4 py-3.5 flex items-center justify-between"
              onClick={() => setExpanded(isOpen ? null : stage.id)}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: stage.color }}>{stage.icon}</span>
                <span className="text-sm font-bold text-slate-700">{stage.label}</span>
                <span
                  className="h-5 min-w-[1.25rem] px-1.5 rounded-full text-[0.62rem] font-black flex items-center justify-center text-white"
                  style={{ background: stage.color }}
                >
                  {cards.length}
                </span>
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            {isOpen && (
              <div className="px-2.5 pb-2.5 space-y-2.5">
                {cards.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 italic py-5">No leads here</p>
                ) : (
                  cards.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} stage={stage} onUpdate={onUpdate} />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Pipeline board ────────────────────────────────────────────────────────────
export function LeadsPipeline({ initialLeads }: { initialLeads: PipelineLead[] }) {
  const [leads, setLeads] = useState(initialLeads);

  function handleUpdate(id: string, newStatus: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
  }

  const total = leads.length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const rate = total > 0 ? Math.round((converted / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Conversion progress bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-600">Conversion Pipeline</p>
          <span className="text-xs font-bold text-slate-700">{rate}% conversion rate</span>
        </div>
        <div className="flex rounded-full overflow-hidden h-2.5">
          {STAGES.map((stage) => {
            const count = leads.filter((l) => l.status === stage.id).length;
            const pct = total > 0 ? (count / total) * 100 : 0;
            return pct > 0 ? (
              <div
                key={stage.id}
                title={`${stage.label}: ${count}`}
                style={{ width: `${pct}%`, background: stage.color }}
              />
            ) : null;
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-2.5">
          {STAGES.map((stage) => {
            const count = leads.filter((l) => l.status === stage.id).length;
            return (
              <span key={stage.id} className="flex items-center gap-1 text-[0.68rem] text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ background: stage.color }} />
                {stage.label}: <strong className="text-slate-700">{count}</strong>
              </span>
            );
          })}
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="block lg:hidden">
        <MobilePipeline leads={leads} onUpdate={handleUpdate} />
      </div>

      {/* Desktop kanban */}
      <div className="hidden lg:flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const cards = leads.filter((l) => l.status === stage.id);
          return (
            <div
              key={stage.id}
              className="shrink-0 w-[240px] flex flex-col rounded-xl overflow-hidden border"
              style={{ background: stage.bg, borderColor: stage.border }}
            >
              <div
                className="px-4 py-3 flex items-center justify-between border-b"
                style={{ borderColor: stage.border }}
              >
                <div className="flex items-center gap-2" style={{ color: stage.color }}>
                  {stage.icon}
                  <span className="text-xs font-bold text-slate-700">{stage.label}</span>
                </div>
                <span
                  className="h-5 min-w-[1.25rem] px-1 rounded-full text-[0.65rem] font-black flex items-center justify-center text-white"
                  style={{ background: stage.color }}
                >
                  {cards.length}
                </span>
              </div>

              <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
                {cards.length === 0 ? (
                  <div className="flex items-center justify-center h-16 text-xs text-slate-400 italic">
                    Empty
                  </div>
                ) : (
                  cards.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} stage={stage} onUpdate={handleUpdate} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
