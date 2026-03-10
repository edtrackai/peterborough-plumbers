"use client";

import { useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlumberOffer {
  id:          string;
  status:      string;
  offeredAt:   string;
  respondedAt: string | null;
}

interface PlumberRow {
  id:         string;
  name:       string;
  phone:      string | null;
  isOnDuty:   boolean;
  lastSeenAt: string | null;
  offer:      PlumberOffer | null;
}

interface OffersPayload {
  bookingId:  string;
  bookingRef: string;
  status:     string;
  plumbers:   PlumberRow[];
}

// ── Offer status badge ────────────────────────────────────────────────────────

const OFFER_BADGE: Record<string, { label: string; cls: string }> = {
  offered:  { label: "Pending",  cls: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  accepted: { label: "Accepted", cls: "bg-green-50  text-green-700  border border-green-200"  },
  rejected: { label: "Declined", cls: "bg-red-50    text-red-700    border border-red-200"    },
  expired:  { label: "Expired",  cls: "bg-gray-50   text-gray-500   border border-gray-200"   },
};

function formatAgo(isoStr: string) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Main drawer ───────────────────────────────────────────────────────────────

interface Props {
  bookingId:  string;
  bookingRef: string;
  onClose:    () => void;
  onDispatched: () => void;
}

export function OfferDispatchDrawer({ bookingId, bookingRef, onClose, onDispatched }: Props) {
  const [data,     setData]     = useState<OffersPayload | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sending,  setSending]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/offers`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => { load(); }, [load]);

  function togglePlumber(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setError(null);
  }

  function selectAll() {
    if (!data) return;
    const dispatchable = data.plumbers
      .filter((p) => !p.offer || p.offer.status === "rejected" || p.offer.status === "expired")
      .map((p) => p.id);
    setSelected(new Set(dispatchable));
  }

  async function dispatch() {
    if (selected.size === 0) { setError("Select at least one plumber."); return; }
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/offers`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plumberIds: Array.from(selected) }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error ?? "Failed to dispatch."); return; }
      setSuccess(`Offer sent to ${json.dispatched} plumber${json.dispatched !== 1 ? "s" : ""}.`);
      setSelected(new Set());
      onDispatched();
      await load();
    } finally {
      setSending(false);
    }
  }

  const dispatchable = data?.plumbers.filter(
    (p) => !p.offer || p.offer.status === "rejected" || p.offer.status === "expired"
  ) ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Dispatch job offer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Dispatch Offer</p>
            <p className="text-base font-bold text-slate-900 mt-0.5 font-mono">{bookingRef}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="h-8 w-8 rounded-full border-4 border-slate-200 border-t-[#C8102E] animate-spin" />
              <p className="text-sm text-slate-400">Loading plumbers…</p>
            </div>
          ) : !data ? (
            <p className="text-sm text-red-600 text-center py-10">Failed to load.</p>
          ) : (
            <>
              {/* Select all */}
              {dispatchable.length > 1 && (
                <button
                  onClick={selectAll}
                  className="w-full text-left text-xs font-semibold text-[#C8102E] hover:underline mb-1"
                >
                  Select all available ({dispatchable.length})
                </button>
              )}

              {data.plumbers.map((p) => {
                const canDispatch = !p.offer || p.offer.status === "rejected" || p.offer.status === "expired";
                const isSelected  = selected.has(p.id);
                const badge       = p.offer ? (OFFER_BADGE[p.offer.status] ?? OFFER_BADGE.offered) : null;

                return (
                  <label
                    key={p.id}
                    className={[
                      "flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer transition-all select-none",
                      canDispatch
                        ? isSelected
                          ? "border-[#C8102E] bg-red-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                        : "border-slate-100 bg-slate-50 cursor-not-allowed opacity-70",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!canDispatch}
                      onChange={() => togglePlumber(p.id)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#C8102E] accent-[#C8102E]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-slate-800">{p.name}</span>
                        {p.isOnDuty && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] font-bold text-green-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            On duty
                          </span>
                        )}
                        {badge && (
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      {p.phone && (
                        <p className="text-xs text-slate-400 mt-0.5">{p.phone}</p>
                      )}
                      {p.offer && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Sent {formatAgo(p.offer.offeredAt)}
                          {p.offer.respondedAt && ` · Responded ${formatAgo(p.offer.respondedAt)}`}
                        </p>
                      )}
                      {!p.offer && p.lastSeenAt && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Last seen {formatAgo(p.lastSeenAt)}
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}

              {data.plumbers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-500 font-medium">No active plumbers</p>
                  <p className="text-slate-400 text-sm mt-1">Add plumbers in the Plumbers section first.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 space-y-2">
          {success && (
            <p className="text-sm text-green-700 font-medium text-center">{success}</p>
          )}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <button
            onClick={dispatch}
            disabled={sending || selected.size === 0}
            className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-50"
            style={{ background: "#C8102E" }}
          >
            {sending
              ? "Dispatching…"
              : selected.size > 0
              ? `Send Offer to ${selected.size} Plumber${selected.size !== 1 ? "s" : ""}`
              : "Select Plumbers to Dispatch"}
          </button>
        </div>
      </div>
    </>
  );
}
