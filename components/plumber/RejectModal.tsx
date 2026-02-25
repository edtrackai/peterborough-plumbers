"use client";

import { useState } from "react";

const REASONS = [
  { value: "already_on_job",      label: "Already on a job"         },
  { value: "too_far",             label: "Too far away"             },
  { value: "not_my_skill",        label: "Not my skill area"        },
  { value: "not_available_today", label: "Not available today"      },
  { value: "vehicle_tools_issue", label: "Vehicle / tools issue"    },
  { value: "other",               label: "Other (please specify)"   },
];

interface RejectModalProps {
  offerId:    string;
  bookingRef: string;
  onClose:    () => void;
  onRejected: (offerId: string) => void;
}

export function RejectModal({ offerId, bookingRef, onClose, onRejected }: RejectModalProps) {
  const [reason, setReason]   = useState("");
  const [note, setNote]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!reason) { setError("Please select a reason."); return; }
    if (reason === "other" && !note.trim()) { setError("Please add a note for 'Other'."); return; }

    setLoading(true);
    try {
      const res = await fetch(`/api/plumber/offers/${offerId}/reject`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ rejectReason: reason, rejectNote: note.trim() || undefined }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        return;
      }
      onRejected(offerId);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-[#111111] border border-white/[0.09] shadow-2xl p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-white">Decline Job</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              <span className="font-mono">{bookingRef}</span> — select a reason below
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Reason list */}
          <div className="flex flex-col gap-1.5">
            {REASONS.map((r) => (
              <label
                key={r.value}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-all ${
                  reason === r.value
                    ? "border-[var(--brand)]/40 bg-[var(--brand)]/8 text-white"
                    : "border-white/[0.07] hover:border-white/[0.13] text-zinc-400"
                }`}
              >
                <span className={`h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                  reason === r.value ? "border-[var(--brand)]" : "border-zinc-700"
                }`}>
                  {reason === r.value && (
                    <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />
                  )}
                </span>
                <input
                  type="radio"
                  name="reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={() => setReason(r.value)}
                  className="sr-only"
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>

          {/* "Other" note */}
          {reason === "other" && (
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Please describe…"
              className="w-full rounded-xl bg-[#1A1A1A] border border-white/[0.07] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-700 resize-none focus:outline-none focus:border-[var(--brand)]/50 focus:ring-1 focus:ring-[var(--brand)]/30 transition-colors"
            />
          )}

          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-white/[0.08] py-3 text-sm font-medium text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-red-600/90 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? "Declining…" : "Decline Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
