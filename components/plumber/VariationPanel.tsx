"use client";

import { useState } from "react";

interface VariationReason {
  id:    string;
  key:   string;
  label: string;
  description?: string | null;
}

interface VariationPanelProps {
  bookingId:      string;
  reasons:        VariationReason[];
  onSubmitted?:   () => void;
}

export function VariationPanel({ bookingId, reasons, onSubmitted }: VariationPanelProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [extraLabour, setExtraLabour]         = useState("");
  const [extraMaterials, setExtraMaterials]   = useState("");
  const [notes, setNotes]                     = useState("");
  const [submitting, setSubmitting]           = useState(false);
  const [result, setResult]                   = useState<{ status: string; officeApprovalRequired: boolean } | null>(null);
  const [error, setError]                     = useState<string | null>(null);

  function toggleReason(id: string) {
    setSelectedReasons(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedReasons.length === 0) { setError("Select at least one reason"); return; }
    if (!notes.trim()) { setError("Notes are required"); return; }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/plumber/bookings/${bookingId}/variation`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reasonIds:         selectedReasons,
          extraLabourCost:   parseFloat(extraLabour)    || 0,
          extraMaterialCost: parseFloat(extraMaterials) || 0,
          notes,
          imageUrls: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to submit"); return; }
      setResult(data);
      onSubmitted?.();
    } catch {
      setError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <p className="font-semibold text-green-800 mb-1">
          {result.officeApprovalRequired
            ? "✅ Submitted — office will review before sending to customer"
            : "✅ Revised quote sent to customer — awaiting approval"}
        </p>
        <p className="text-sm text-green-700">
          Ref: {/* variationRef shown after full implementation */}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="font-semibold text-pp-navy text-sm uppercase tracking-wide">Report On-Site Issue</h3>

      {/* Reasons */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">What did you find?</p>
        <div className="flex flex-col gap-2">
          {reasons.map(r => (
            <label key={r.id} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedReasons.includes(r.id)}
                onChange={() => toggleReason(r.id)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              <span className="text-sm text-pp-navy">{r.label}
                {r.description && <span className="block text-xs text-gray-400">{r.description}</span>}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Costs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Extra labour (£)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={extraLabour}
            onChange={e => setExtraLabour(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Extra materials (£)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={extraMaterials}
            onChange={e => setExtraMaterials(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Notes *</label>
        <textarea
          required
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Describe exactly what you found..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Submit variation request"}
      </button>
    </form>
  );
}
