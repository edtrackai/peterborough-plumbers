"use client";

import { useState } from "react";

interface RevisitReason {
  id:          string;
  key:         string;
  label:       string;
  isChargeable: boolean;
}

interface RevisitPanelProps {
  bookingId:  string;
  reasons:    RevisitReason[];
  onSubmitted?: () => void;
}

export function RevisitPanel({ bookingId, reasons, onSubmitted }: RevisitPanelProps) {
  const [reasonId, setReasonId]       = useState("");
  const [notes, setNotes]             = useState("");
  const [partsNeeded, setPartsNeeded] = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [done, setDone]               = useState(false);
  const [error, setError]             = useState<string | null>(null);

  const selectedReason = reasons.find(r => r.id === reasonId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reasonId) { setError("Select a reason"); return; }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/plumber/bookings/${bookingId}/revisit`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reasonId, notes, partsNeeded, imageUrls: [] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed"); return; }
      setDone(true);
      onSubmitted?.();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-amber-800">✅ Return visit requested — customer will be notified</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-semibold text-pp-navy text-sm uppercase tracking-wide">Request Return Visit</h3>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Reason *</label>
        <select
          required
          value={reasonId}
          onChange={e => setReasonId(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <option value="">Select reason…</option>
          {reasons.map(r => (
            <option key={r.id} value={r.id}>
              {r.label} {r.isChargeable ? "(chargeable)" : "(no charge)"}
            </option>
          ))}
        </select>
      </div>

      {selectedReason?.isChargeable && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">
          ⚠️ This return visit will incur a call-out charge for the customer.
        </p>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="What's needed for the return visit?"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Parts needed</label>
        <input
          type="text"
          value={partsNeeded}
          onChange={e => setPartsNeeded(e.target.value)}
          placeholder="e.g. 22mm compression fitting, drain valve"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-pp-navy py-3 text-sm font-semibold text-white hover:bg-pp-navy-dark transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Request return visit"}
      </button>
    </form>
  );
}
