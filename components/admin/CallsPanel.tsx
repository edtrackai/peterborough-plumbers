"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CallSummary {
  id: string;
  summary: string;
  urgency: string | null;
  serviceType: string | null;
  issueSummary: string | null;
  preferredTime: string | null;
  needsHuman: boolean;
  endState: string | null;
  transcriptText: string | null;
  createdAt: string;
}

interface CallEvent {
  id: string;
  eventType: string;
  notes: string | null;
  createdAt: string;
}

interface CallTranscript {
  id: string;
  speaker: string;
  text: string;
  intent: string | null;
  turnIndex: number;
  spokenAt: string;
}

interface Call {
  id: string;
  direction: string;
  status: string;
  source: string;
  outcome: string | null;
  waId: string | null;
  phone: string | null;
  leadId: string | null;
  durationSeconds: number | null;
  startedAt: string;
  endedAt: string | null;
  summary: CallSummary | null;
  events: CallEvent[];
  transcripts: CallTranscript[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(date: string) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 1440)}d ago`;
}

function formatDuration(secs: number | null) {
  if (!secs) return "—";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function callerLabel(call: Call) {
  return call.phone ? `+${call.phone}` : call.waId ? `+${call.waId}` : "Unknown";
}

function urgencyBadge(urgency: string | null) {
  if (urgency === "high") return { bg: "#FEE2E2", text: "#DC2626" };
  if (urgency === "medium") return { bg: "#FEF3C7", text: "#D97706" };
  return { bg: "#DCFCE7", text: "#16A34A" };
}

function outcomeBadge(outcome: string | null) {
  if (outcome === "emergency_escalated") return { bg: "#FEE2E2", text: "#DC2626" };
  if (outcome === "human_handoff") return { bg: "#FEF3C7", text: "#D97706" };
  if (outcome === "qualified_lead_captured") return { bg: "#DCFCE7", text: "#16A34A" };
  if (outcome === "general_advice_given") return { bg: "#DBEAFE", text: "#2563EB" };
  return { bg: "#F1F5F9", text: "#64748B" };
}

function outcomeLabel(outcome: string | null) {
  if (!outcome) return "—";
  return outcome.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Parse raw transcript text "Customer: ... Agent: ..." into turns
function parseTranscriptText(text: string): { speaker: "customer" | "agent"; text: string }[] {
  const lines: { speaker: "customer" | "agent"; text: string }[] = [];
  const parts = text.split(/(?=Customer:|Agent:)/g);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("Customer:")) {
      lines.push({ speaker: "customer", text: trimmed.replace(/^Customer:\s*/, "").trim() });
    } else if (trimmed.startsWith("Agent:")) {
      lines.push({ speaker: "agent", text: trimmed.replace(/^Agent:\s*/, "").trim() });
    }
  }
  return lines;
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CallsPanel({ initialCalls }: { initialCalls: Call[] }) {
  const [calls] = useState<Call[]>(initialCalls);
  const [selected, setSelected] = useState<Call | null>(calls[0] ?? null);
  const [tab, setTab] = useState<"summary" | "transcript" | "events">("summary");

  const totalCalls = calls.length;
  const leadsCreated = calls.filter((c) => c.leadId).length;
  const escalated = calls.filter(
    (c) => c.outcome === "emergency_escalated" || c.outcome === "human_handoff"
  ).length;
  const avgDuration = calls.length
    ? Math.round(calls.reduce((acc, c) => acc + (c.durationSeconds ?? 0), 0) / calls.length)
    : 0;

  return (
    <div className="flex h-full bg-white text-slate-800">
      {/* ── Left panel — call list ─────────────────────────────────────── */}
      <div className="w-[300px] flex flex-col shrink-0 h-full overflow-hidden border-r border-slate-100">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100">
          <h1 className="text-slate-900 font-bold text-[0.95rem]">Calls</h1>
          <p className="text-slate-400 text-[0.72rem] mt-0.5">{totalCalls} total · auto-refreshing</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100">
          {[
            { label: "Leads", value: leadsCreated },
            { label: "Escalated", value: escalated },
            { label: "Avg Duration", value: formatDuration(avgDuration) },
            { label: "Total", value: totalCalls },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3 bg-white">
              <p className="text-slate-900 font-bold text-[1rem]">{value}</p>
              <p className="text-slate-400 text-[0.65rem] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Call list */}
        <div className="flex-1 overflow-y-auto">
          {calls.length === 0 ? (
            <div className="px-5 py-10 text-center text-slate-400 text-sm">No calls yet</div>
          ) : (
            calls.map((call) => {
              const isActive = selected?.id === call.id;
              const ob = outcomeBadge(call.outcome);
              return (
                <button
                  key={call.id}
                  onClick={() => { setSelected(call); setTab("summary"); }}
                  className="w-full text-left px-4 py-3.5 transition-colors hover:bg-slate-50"
                  style={{
                    background: isActive ? "rgba(200,16,46,0.05)" : undefined,
                    borderBottom: "1px solid #F1F5F9",
                    borderLeft: isActive ? "2px solid #C8102E" : "2px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Avatar */}
                      <div
                        className="h-9 w-9 rounded-full flex items-center justify-center text-white text-[0.6rem] font-black shrink-0"
                        style={{
                          background: call.summary?.needsHuman
                            ? "linear-gradient(135deg,#DC2626,#991B1B)"
                            : "linear-gradient(135deg,#1E3A5F,#0F2A4A)",
                        }}
                      >
                        {call.direction === "inbound" ? "IN" : "OUT"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-slate-800 text-[0.82rem] font-semibold truncate">
                          {callerLabel(call)}
                        </p>
                        <p className="text-slate-400 text-[0.68rem] truncate">
                          {call.summary?.serviceType || call.source}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-slate-400 text-[0.65rem]">{timeAgo(call.startedAt)}</p>
                      <span
                        className="text-[0.58rem] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block"
                        style={{ background: ob.bg, color: ob.text }}
                      >
                        {outcomeLabel(call.outcome)}
                      </span>
                    </div>
                  </div>
                  {call.summary?.issueSummary && (
                    <p className="text-slate-400 text-[0.68rem] mt-1.5 truncate pl-11">
                      {call.summary.issueSummary}
                    </p>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Right panel — call detail ──────────────────────────────────── */}
      {selected ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Call header */}
          <div className="px-6 py-4 flex items-start justify-between gap-4 border-b border-slate-100 bg-white">
            <div>
              <h2 className="text-slate-900 font-bold text-[1rem]">{callerLabel(selected)}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-slate-400 text-[0.72rem]">
                  {new Date(selected.startedAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })} · {formatTime(selected.startedAt)}
                </span>
                <span className="text-slate-400 text-[0.72rem]">
                  Duration: {formatDuration(selected.durationSeconds)}
                </span>
                {selected.leadId && (
                  <span className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    Lead Created
                  </span>
                )}
                {selected.summary?.needsHuman && (
                  <span className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                    Needs Human
                  </span>
                )}
              </div>
            </div>
            {/* Outcome badge */}
            {(() => {
              const ob = outcomeBadge(selected.outcome);
              return (
                <span
                  className="text-[0.7rem] font-bold px-3 py-1 rounded-full shrink-0"
                  style={{ background: ob.bg, color: ob.text }}
                >
                  {outcomeLabel(selected.outcome)}
                </span>
              );
            })()}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-white">
            {(["summary", "transcript", "events"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-3 text-[0.78rem] font-semibold capitalize transition-all"
                style={{
                  color: tab === t ? "#C8102E" : "#94A3B8",
                  borderBottom: tab === t ? "2px solid #C8102E" : "2px solid transparent",
                }}
              >
                {t}
                {t === "transcript" && selected.summary?.transcriptText && (
                  <span className="ml-1.5 text-[0.6rem] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {parseTranscriptText(selected.summary.transcriptText).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 bg-slate-50">

            {/* ── Summary tab ── */}
            {tab === "summary" && (
              <div className="space-y-4">
                {selected.summary ? (
                  <>
                    {/* Team summary */}
                    <div className="rounded-xl p-4 bg-white border border-slate-100 shadow-sm">
                      <p className="text-slate-400 text-[0.65rem] uppercase tracking-widest mb-2 font-semibold">
                        Team Summary
                      </p>
                      <p className="text-slate-700 text-[0.88rem] leading-relaxed">
                        {selected.summary.summary}
                      </p>
                    </div>

                    {/* Fields grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Urgency", value: selected.summary.urgency },
                        { label: "Service Type", value: selected.summary.serviceType },
                        { label: "Issue", value: selected.summary.issueSummary },
                        { label: "Preferred Time", value: selected.summary.preferredTime },
                        { label: "End State", value: selected.summary.endState?.replace(/_/g, " ") },
                        { label: "Needs Human", value: selected.summary.needsHuman ? "Yes" : "No" },
                      ].map(({ label, value }) => {
                        const isUrgency = label === "Urgency" && value;
                        const ub = isUrgency ? urgencyBadge(value) : null;
                        return (
                          <div key={label} className="rounded-xl p-3.5 bg-white border border-slate-100 shadow-sm">
                            <p className="text-slate-400 text-[0.62rem] uppercase tracking-widest mb-1 font-semibold">
                              {label}
                            </p>
                            {ub ? (
                              <span
                                className="text-[0.78rem] font-bold px-2 py-0.5 rounded-full capitalize"
                                style={{ background: ub.bg, color: ub.text }}
                              >
                                {value}
                              </span>
                            ) : (
                              <p className="text-slate-800 text-[0.85rem] font-semibold capitalize">
                                {value || "—"}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-slate-400 text-sm">No summary available for this call.</p>
                )}
              </div>
            )}

            {/* ── Transcript tab ── */}
            {tab === "transcript" && (() => {
              // Prefer structured transcripts; fall back to raw text
              const hasTurns = selected.transcripts.length > 0;
              const hasRaw = !!selected.summary?.transcriptText;

              if (!hasTurns && !hasRaw) {
                return <p className="text-slate-400 text-sm">No transcript recorded.</p>;
              }

              if (hasTurns) {
                return (
                  <div className="space-y-3">
                    {selected.transcripts.map((t) => {
                      const isAgent = t.speaker === "agent";
                      return (
                        <div key={t.id} className={`flex gap-3 ${isAgent ? "flex-row-reverse" : ""}`}>
                          <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-[0.6rem] font-black shrink-0 mt-0.5 text-white"
                            style={{
                              background: isAgent
                                ? "linear-gradient(135deg,#C8102E,#8B0C1E)"
                                : "linear-gradient(135deg,#1E3A5F,#0F2A4A)",
                            }}
                          >
                            {isAgent ? "PP" : "CX"}
                          </div>
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isAgent ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                            style={{
                              background: isAgent ? "#FEE2E2" : "#fff",
                              border: `1px solid ${isAgent ? "rgba(200,16,46,0.15)" : "rgba(0,0,0,0.06)"}`,
                            }}
                          >
                            <p className="text-[0.55rem] font-bold mb-1" style={{ color: isAgent ? "#C8102E" : "#64748B" }}>
                              {isAgent ? "AGENT" : "CUSTOMER"}
                            </p>
                            <p className="text-slate-700 text-[0.85rem] leading-relaxed">{t.text}</p>
                            <p className="text-slate-400 text-[0.6rem] mt-1">
                              {formatTime(t.spokenAt)}
                              {t.intent ? ` · ${t.intent}` : ""}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }

              // Parse raw transcript text
              const turns = parseTranscriptText(selected.summary!.transcriptText!);
              return (
                <div className="space-y-3">
                  {turns.map((turn, i) => {
                    const isAgent = turn.speaker === "agent";
                    return (
                      <div key={i} className={`flex gap-3 ${isAgent ? "flex-row-reverse" : ""}`}>
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-[0.6rem] font-black shrink-0 mt-0.5 text-white"
                          style={{
                            background: isAgent
                              ? "linear-gradient(135deg,#C8102E,#8B0C1E)"
                              : "linear-gradient(135deg,#1E3A5F,#0F2A4A)",
                          }}
                        >
                          {isAgent ? "PP" : "CX"}
                        </div>
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isAgent ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                          style={{
                            background: isAgent ? "#FEE2E2" : "#fff",
                            border: `1px solid ${isAgent ? "rgba(200,16,46,0.15)" : "rgba(0,0,0,0.06)"}`,
                          }}
                        >
                          <p className="text-[0.55rem] font-bold mb-1" style={{ color: isAgent ? "#C8102E" : "#64748B" }}>
                            {isAgent ? "AGENT" : "CUSTOMER"}
                          </p>
                          <p className="text-slate-700 text-[0.85rem] leading-relaxed">{turn.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* ── Events tab ── */}
            {tab === "events" && (
              <div className="space-y-2">
                {selected.events.length === 0 ? (
                  <p className="text-slate-400 text-sm">No events logged.</p>
                ) : (
                  selected.events.map((e) => (
                    <div key={e.id} className="flex items-start gap-3 rounded-xl px-4 py-3 bg-white border border-slate-100 shadow-sm">
                      <div
                        className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                        style={{
                          background:
                            e.eventType === "escalated" || e.eventType === "human_handoff"
                              ? "#DC2626"
                              : e.eventType === "ended"
                              ? "#16A34A"
                              : "#2563EB",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 text-[0.82rem] font-semibold capitalize">
                          {e.eventType.replace(/_/g, " ")}
                        </p>
                        {e.notes && (
                          <p className="text-slate-500 text-[0.72rem] mt-0.5">{e.notes}</p>
                        )}
                      </div>
                      <p className="text-slate-400 text-[0.65rem] shrink-0">{formatTime(e.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <p className="text-slate-400 text-sm">Select a call to view details</p>
        </div>
      )}
    </div>
  );
}
