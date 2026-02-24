"use client";

import { useState } from "react";

const REASONS = [
  { value: "already_on_job",       label: "Already on a job" },
  { value: "too_far",              label: "Too far away" },
  { value: "not_my_skill",         label: "Not my skill area" },
  { value: "not_available_today",  label: "Not available today" },
  { value: "vehicle_tools_issue",  label: "Vehicle / tools issue" },
  { value: "other",                label: "Other (please specify)" },
];

interface RejectModalProps {
  offerId: string;
  bookingRef: string;
  onClose: () => void;
  onRejected: (offerId: string) => void;
}

export function RejectModal({ offerId, bookingRef, onClose, onRejected }: RejectModalProps) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!reason) { setError("Please select a reason."); return; }
    if (reason === "other" && !note.trim()) { setError("Please add a note for 'Other'."); return; }

    setLoading(true);
    try {
      const res = await fetch(`/api/plumber/offers/${offerId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rejectReason: reason, rejectNote: note.trim() || undefined }),
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
        <h3 className="text-base font-bold text-pp-navy mb-1">Reject Job {bookingRef}</h3>
        <p className="text-xs text-gray-500 mb-4">Select a reason — this helps improve job matching.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            {REASONS.map((r) => (
              <label
                key={r.value}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 cursor-pointer transition-colors ${
                  reason === r.value
                    ? "border-pp-teal bg-pp-teal/5 text-pp-navy"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={() => setReason(r.value)}
                  className="accent-pp-teal"
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>

          {reason === "other" && (
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Please describe…"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal resize-none"
            />
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Rejecting…" : "Reject Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
