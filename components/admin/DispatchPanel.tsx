"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlumberInfo {
  id: string;
  name: string;
  phone: string | null;
}

interface Dispatch {
  id: string;
  status: "offered" | "accepted" | "rejected";
  dispatchMessage: string | null;
  plumberReply: string | null;
  offeredAt: string;
  respondedAt: string | null;
  plumber: PlumberInfo;
}

interface DispatchLead {
  id: string;
  name: string;
  phone: string;
  postcode: string;
  serviceType: string | null;
  notes: string | null;
  preferredTime: string | null;
  status: string;
  source: string;
  createdAt: string;
  assignedPlumber: PlumberInfo | null;
  dispatches: Dispatch[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(date: string) {
  const mins = Math.round((Date.now() - new Date(date).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 1440)}d ago`;
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusColour(status: string) {
  if (status === "accepted") return { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" };
  if (status === "rejected") return { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" };
  return { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" };
}

function leadStatusColour(status: string) {
  if (status === "contacted") return { bg: "#D1FAE5", text: "#065F46" };
  if (status === "converted") return { bg: "#DBEAFE", text: "#1E40AF" };
  if (status === "closed") return { bg: "#F3F4F6", text: "#6B7280" };
  return { bg: "#FEF3C7", text: "#92400E" }; // new
}

function plumberInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DispatchPanel({ initialLeads }: { initialLeads: DispatchLead[] }) {
  const [leads, setLeads] = useState<DispatchLead[]>(initialLeads);
  const [selectedId, setSelectedId] = useState<string | null>(initialLeads[0]?.id ?? null);
  const [dispatching, setDispatching] = useState(false);

  const selected = leads.find((l) => l.id === selectedId) ?? null;

  // Auto-refresh every 10 seconds
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/dispatch/history", {
        headers: { "x-api-key": "" }, // auth handled by middleware/session
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
      }
    } catch {
      // silent fail
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  const dispatchPending = useCallback(async () => {
    setDispatching(true);
    try {
      const res = await fetch("/api/dispatch/trigger-pending", {
        method: "POST",
        headers: { "x-api-key": "3fc83ffbaea7cf2f7b517d7a82edaae0ec262d79e1ec428c039ebc6f4cb08c83" },
      });
      const data = await res.json();
      alert(`Dispatched: ${data.dispatched ?? 0} leads`);
      await refresh();
    } catch {
      alert("Dispatch failed");
    } finally {
      setDispatching(false);
    }
  }, [refresh]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Left panel: lead list ── */}
      <div
        className="w-80 shrink-0 flex flex-col border-r overflow-hidden"
        style={{ borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-slate-900">Plumber Dispatch</h1>
            <button
              onClick={dispatchPending}
              disabled={dispatching}
              className="text-[0.65rem] font-bold px-2.5 py-1 rounded-lg transition-colors"
              style={{ background: "rgba(200,16,46,0.08)", color: "#C8102E" }}
            >
              {dispatching ? "Sending..." : "⚡ Dispatch Pending"}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {leads.length} lead{leads.length !== 1 ? "s" : ""} dispatched · auto-refreshing
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {leads.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-slate-400">No dispatches yet</p>
              <p className="text-xs text-slate-300 mt-1">
                Leads will appear here once dispatched to plumbers.
              </p>
            </div>
          )}

          {leads.map((lead) => {
            const isSelected = lead.id === selectedId;
            const accepted = lead.dispatches.find((d) => d.status === "accepted");
            const pendingCount = lead.dispatches.filter((d) => d.status === "offered").length;
            const sc = leadStatusColour(lead.status);

            return (
              <button
                key={lead.id}
                onClick={() => setSelectedId(lead.id)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 transition-colors hover:bg-slate-50"
                style={isSelected ? { background: "rgba(200,16,46,0.06)" } : undefined}
              >
                {/* Avatar */}
                <div
                  className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-[0.65rem] font-black text-white"
                  style={{
                    background: accepted
                      ? "linear-gradient(135deg, #10B981, #059669)"
                      : pendingCount > 0
                      ? "linear-gradient(135deg, #F59E0B, #D97706)"
                      : "linear-gradient(135deg, #EF4444, #DC2626)",
                  }}
                >
                  {lead.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800 truncate">{lead.name}</p>
                    <span className="text-[0.6rem] text-slate-400 shrink-0 ml-2">
                      {timeAgo(lead.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {lead.postcode}{lead.serviceType ? ` · ${lead.serviceType}` : ""}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span
                      className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: sc.bg, color: sc.text }}
                    >
                      {lead.status.toUpperCase()}
                    </span>
                    <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                      {lead.dispatches.length} PLUMBER{lead.dispatches.length !== 1 ? "S" : ""}
                    </span>
                    {pendingCount > 0 && (
                      <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                        {pendingCount} PENDING
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right panel: dispatch detail ── */}
      <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div
                className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(200,16,46,0.08)" }}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#C8102E" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-600">Select a lead</p>
              <p className="text-xs text-slate-400 mt-1">Choose a dispatched lead from the left</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              className="px-5 py-3 flex items-center justify-between bg-white border-b shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              <div>
                <p className="text-sm font-bold text-slate-800">{selected.name}</p>
                <p className="text-[0.65rem] text-slate-400">
                  {selected.phone} · {selected.postcode}
                  {selected.serviceType ? ` · ${selected.serviceType}` : ""}
                  {selected.preferredTime ? ` · ${selected.preferredTime}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {selected.assignedPlumber ? (
                  <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700">
                    ✓ Assigned to {selected.assignedPlumber.name}
                  </span>
                ) : (
                  <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700">
                    ⏳ Awaiting response
                  </span>
                )}
              </div>
            </div>

            {/* Lead info bar */}
            {selected.notes && (
              <div className="px-5 py-2 bg-blue-50 border-b text-xs text-blue-700 shrink-0"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <span className="font-semibold">Issue: </span>{selected.notes}
              </div>
            )}

            {/* Dispatch timeline */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {selected.dispatches.map((d) => {
                const sc = statusColour(d.status);
                return (
                  <div key={d.id} className="space-y-2">
                    {/* Plumber header */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-7 w-7 rounded-full flex items-center justify-center text-[0.6rem] font-black text-white shrink-0"
                        style={{ background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" }}
                      >
                        {plumberInitials(d.plumber.name)}
                      </div>
                      <span className="text-xs font-bold text-slate-700">{d.plumber.name}</span>
                      {d.plumber.phone && (
                        <span className="text-[0.65rem] text-slate-400">{d.plumber.phone}</span>
                      )}
                      <span
                        className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded ml-auto"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {d.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Message sent to plumber (outbound — right side) */}
                    {d.dispatchMessage && (
                      <div className="flex justify-end">
                        <div
                          className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                          style={{
                            background: "#E0F2FE",
                            color: "#1E293B",
                            border: "1px solid rgba(59,130,246,0.15)",
                            borderTopRightRadius: "4px",
                          }}
                        >
                          <p className="text-[0.55rem] font-bold text-blue-600 mb-1">SENT TO PLUMBER</p>
                          <p className="whitespace-pre-wrap break-words text-xs">{d.dispatchMessage}</p>
                          <p className="text-[0.6rem] mt-1 text-right text-slate-400">
                            {formatTime(d.offeredAt)} · {formatDate(d.offeredAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Plumber reply (inbound — left side) */}
                    {d.plumberReply ? (
                      <div className="flex justify-start">
                        <div
                          className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
                          style={{
                            background: d.status === "accepted" ? "#D1FAE5" : "#FEE2E2",
                            color: "#1E293B",
                            border: `1px solid ${d.status === "accepted" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                            borderTopLeftRadius: "4px",
                          }}
                        >
                          <p
                            className="text-[0.55rem] font-bold mb-1"
                            style={{ color: d.status === "accepted" ? "#065F46" : "#991B1B" }}
                          >
                            PLUMBER REPLY
                          </p>
                          <p className="whitespace-pre-wrap break-words text-xs">{d.plumberReply}</p>
                          {d.respondedAt && (
                            <p className="text-[0.6rem] mt-1 text-slate-400">
                              {formatTime(d.respondedAt)} · {formatDate(d.respondedAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : d.status === "offered" ? (
                      <div className="flex justify-start">
                        <div
                          className="rounded-2xl px-4 py-2 text-xs"
                          style={{
                            background: "#FEF3C7",
                            color: "#92400E",
                            border: "1px solid rgba(245,158,11,0.2)",
                            borderTopLeftRadius: "4px",
                          }}
                        >
                          ⏳ Awaiting reply...
                        </div>
                      </div>
                    ) : null}

                    {/* Divider between plumbers */}
                    <div className="border-b pt-2" style={{ borderColor: "rgba(0,0,0,0.05)" }} />
                  </div>
                );
              })}
            </div>

            {/* Footer info */}
            <div
              className="px-5 py-3 bg-white border-t shrink-0 flex items-center justify-between text-[0.65rem] text-slate-400"
              style={{ borderColor: "rgba(0,0,0,0.06)" }}
            >
              <span>Lead created {formatDate(selected.createdAt)} · Source: {selected.source}</span>
              <span>{selected.dispatches.length} plumber{selected.dispatches.length !== 1 ? "s" : ""} notified</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
