"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CallTranscript {
  id: string;
  speaker: string;
  text: string;
  intent: string | null;
  turnIndex: number;
  spokenAt: string;
}

interface CallEvent {
  id: string;
  eventType: string;
  notes: string | null;
  createdAt: string;
}

interface CallSummary {
  id: string;
  summary: string;
  urgency: string | null;
  serviceType: string | null;
  issueSummary: string | null;
  preferredTime: string | null;
  needsHuman: boolean;
  endState: string | null;
  createdAt: string;
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

function urgencyColour(urgency: string | null) {
  if (urgency === "high") return "#EF4444";
  if (urgency === "medium") return "#F59E0B";
  return "#22C55E";
}

function outcomeLabel(outcome: string | null) {
  if (!outcome) return "—";
  return outcome.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function outcomeColour(outcome: string | null) {
  if (outcome === "emergency_escalated") return "#EF4444";
  if (outcome === "human_handoff") return "#F59E0B";
  if (outcome === "qualified_lead_captured") return "#22C55E";
  if (outcome === "general_advice_given") return "#60A5FA";
  return "rgba(255,255,255,0.3)";
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
    ? Math.round(
        calls.reduce((acc, c) => acc + (c.durationSeconds ?? 0), 0) / calls.length
      )
    : 0;

  return (
    <div
      className="flex h-full"
      style={{ background: "#0B0F1A", color: "rgba(255,255,255,0.85)" }}
    >
      {/* ── Left panel — call list ─────────────────────────────────────── */}
      <div
        className="w-[320px] flex flex-col shrink-0 h-full overflow-hidden"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h1 className="text-white font-bold text-[0.95rem] tracking-tight">Calls</h1>
          <p className="text-white/30 text-[0.72rem] mt-0.5">{totalCalls} total</p>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 gap-px"
          style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { label: "Leads", value: leadsCreated },
            { label: "Escalated", value: escalated },
            { label: "Avg Duration", value: formatDuration(avgDuration) },
            { label: "Total", value: totalCalls },
          ].map(({ label, value }) => (
            <div key={label} className="px-4 py-3" style={{ background: "#0B0F1A" }}>
              <p className="text-white font-bold text-[1rem]">{value}</p>
              <p className="text-white/30 text-[0.65rem] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Call list */}
        <div className="flex-1 overflow-y-auto">
          {calls.length === 0 ? (
            <div className="px-5 py-10 text-center text-white/20 text-sm">
              No calls yet
            </div>
          ) : (
            calls.map((call) => {
              const isActive = selected?.id === call.id;
              const needsHuman = call.summary?.needsHuman;
              return (
                <button
                  key={call.id}
                  onClick={() => { setSelected(call); setTab("summary"); }}
                  className="w-full text-left px-4 py-3.5 transition-all"
                  style={{
                    background: isActive ? "rgba(200,16,46,0.12)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    borderLeft: isActive ? "2px solid #C8102E" : "2px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Avatar */}
                      <div
                        className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-[0.65rem] font-black shrink-0"
                        style={{
                          background: needsHuman
                            ? "linear-gradient(135deg,#EF4444,#B91C1C)"
                            : "linear-gradient(135deg,#1E3A5F,#0F2A4A)",
                        }}
                      >
                        {call.direction === "inbound" ? "IN" : "OUT"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-[0.82rem] font-semibold truncate">
                          {callerLabel(call)}
                        </p>
                        <p className="text-white/35 text-[0.68rem] truncate">
                          {call.summary?.serviceType || call.source}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-white/25 text-[0.65rem]">{timeAgo(call.startedAt)}</p>
                      <p
                        className="text-[0.6rem] font-semibold mt-0.5"
                        style={{ color: outcomeColour(call.outcome) }}
                      >
                        {outcomeLabel(call.outcome)}
                      </p>
                    </div>
                  </div>
                  {/* Issue summary preview */}
                  {call.summary?.issueSummary && (
                    <p className="text-white/30 text-[0.68rem] mt-1.5 truncate pl-10">
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
          <div
            className="px-6 py-4 flex items-start justify-between gap-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <h2 className="text-white font-bold text-[1rem]">{callerLabel(selected)}</h2>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-white/35 text-[0.72rem]">
                  {new Date(selected.startedAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })} · {formatTime(selected.startedAt)}
                </span>
                <span className="text-white/35 text-[0.72rem]">
                  Duration: {formatDuration(selected.durationSeconds)}
                </span>
                {selected.leadId && (
                  <span
                    className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E" }}
                  >
                    Lead Created
                  </span>
                )}
                {selected.summary?.needsHuman && (
                  <span
                    className="text-[0.65rem] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
                  >
                    Needs Human
                  </span>
                )}
              </div>
            </div>
            {/* Outcome badge */}
            <span
              className="text-[0.7rem] font-bold px-3 py-1 rounded-full shrink-0"
              style={{
                background: `${outcomeColour(selected.outcome)}22`,
                color: outcomeColour(selected.outcome),
              }}
            >
              {outcomeLabel(selected.outcome)}
            </span>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {(["summary", "transcript", "events"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-5 py-3 text-[0.78rem] font-semibold capitalize transition-all"
                style={{
                  color: tab === t ? "#fff" : "rgba(255,255,255,0.3)",
                  borderBottom: tab === t ? "2px solid #C8102E" : "2px solid transparent",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">

            {/* ── Summary tab ── */}
            {tab === "summary" && (
              <div className="space-y-4">
                {selected.summary ? (
                  <>
                    {/* Team summary */}
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <p className="text-white/40 text-[0.65rem] uppercase tracking-widest mb-2">
                        Team Summary
                      </p>
                      <p className="text-white/80 text-[0.85rem] leading-relaxed">
                        {selected.summary.summary}
                      </p>
                    </div>

                    {/* Fields grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Urgency", value: selected.summary.urgency, colour: urgencyColour(selected.summary.urgency) },
                        { label: "Service Type", value: selected.summary.serviceType },
                        { label: "Issue", value: selected.summary.issueSummary },
                        { label: "Preferred Time", value: selected.summary.preferredTime },
                        { label: "End State", value: selected.summary.endState?.replace(/_/g, " ") },
                        { label: "Needs Human", value: selected.summary.needsHuman ? "Yes" : "No" },
                      ].map(({ label, value, colour }) => (
                        <div
                          key={label}
                          className="rounded-lg p-3"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <p className="text-white/30 text-[0.62rem] uppercase tracking-widest mb-1">
                            {label}
                          </p>
                          <p
                            className="text-[0.82rem] font-semibold"
                            style={{ color: colour ?? "rgba(255,255,255,0.8)" }}
                          >
                            {value || "—"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-white/25 text-sm">No summary available for this call.</p>
                )}
              </div>
            )}

            {/* ── Transcript tab ── */}
            {tab === "transcript" && (
              <div className="space-y-3">
                {selected.transcripts.length === 0 ? (
                  <p className="text-white/25 text-sm">No transcript recorded.</p>
                ) : (
                  selected.transcripts.map((t) => (
                    <div
                      key={t.id}
                      className={`flex gap-3 ${t.speaker === "agent" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center text-[0.6rem] font-black shrink-0 mt-0.5"
                        style={{
                          background:
                            t.speaker === "agent"
                              ? "linear-gradient(135deg,#C8102E,#8B0C1E)"
                              : "rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                      >
                        {t.speaker === "agent" ? "PP" : "CX"}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-xl px-4 py-2.5 ${t.speaker === "agent" ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                        style={{
                          background:
                            t.speaker === "agent"
                              ? "rgba(200,16,46,0.15)"
                              : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="text-white/85 text-[0.82rem] leading-relaxed">{t.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-white/20 text-[0.6rem]">{formatTime(t.spokenAt)}</p>
                          {t.intent && (
                            <span className="text-white/20 text-[0.6rem]">· {t.intent}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ── Events tab ── */}
            {tab === "events" && (
              <div className="space-y-2">
                {selected.events.length === 0 ? (
                  <p className="text-white/25 text-sm">No events logged.</p>
                ) : (
                  selected.events.map((e) => (
                    <div
                      key={e.id}
                      className="flex items-start gap-3 rounded-lg px-4 py-3"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div
                        className="h-2 w-2 rounded-full mt-1.5 shrink-0"
                        style={{
                          background:
                            e.eventType === "escalated" || e.eventType === "human_handoff"
                              ? "#EF4444"
                              : e.eventType === "ended"
                              ? "#22C55E"
                              : "#60A5FA",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-[0.82rem] font-semibold capitalize">
                          {e.eventType.replace(/_/g, " ")}
                        </p>
                        {e.notes && (
                          <p className="text-white/35 text-[0.72rem] mt-0.5">{e.notes}</p>
                        )}
                      </div>
                      <p className="text-white/20 text-[0.65rem] shrink-0">{formatTime(e.createdAt)}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/20 text-sm">Select a call to view details</p>
        </div>
      )}
    </div>
  );
}
