"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface VariationReason {
  id: string;
  key: string;
  label: string;
  isChargeable: boolean;
}

interface VariationImage {
  id: string;
  url: string;
}

export interface VariationRow {
  id: string;
  variationRef: string;
  status: string;
  extraLabourCost: number;
  extraMaterialCost: number;
  extraTotal: number;
  notes: string | null;
  officeApprovedBy: string | null;
  officeApprovedAt: string | null;
  createdAt: string;
  updatedAt: string;
  bookingRef: string;
  customerName: string | null;
  serviceType: string | null;
  plumberName: string;
  plumberPhone: string | null;
  reasons: VariationReason[];
  images: VariationImage[];
}

// ── Status badge config ───────────────────────────────────────────────────────

const STATUS_CFG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  draft:              { label: "Draft",            bg: "#F3F4F6", text: "#4B5563", dot: "#9CA3AF" },
  pending_office:     { label: "Pending Office",   bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  approved_for_send:  { label: "Approved",         bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  sent:               { label: "Sent",             bg: "#EDE9FE", text: "#5B21B6", dot: "#8B5CF6" },
  approved:           { label: "Customer Approved",bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  declined:           { label: "Declined",         bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  discussion:         { label: "In Discussion",    bg: "#FFF7ED", text: "#9A3412", dot: "#F97316" },
  cancelled:          { label: "Cancelled",        bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? { label: status, bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold whitespace-nowrap"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function fmtGbp(n: number) {
  return `£${n.toFixed(2)}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Approve modal ─────────────────────────────────────────────────────────────

function ApproveModal({
  variation,
  onClose,
  onApproved,
}: {
  variation: VariationRow;
  onClose: () => void;
  onApproved: (id: string) => void;
}) {
  const [labour, setLabour] = useState(variation.extraLabourCost.toFixed(2));
  const [materials, setMaterials] = useState(variation.extraMaterialCost.toFixed(2));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = (parseFloat(labour) || 0) + (parseFloat(materials) || 0);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/variations/${variation.id}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          extraLabourCost: parseFloat(labour) || 0,
          extraMaterialCost: parseFloat(materials) || 0,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        onApproved(variation.id);
        onClose();
      } else {
        setError(data.error ?? "Failed to approve variation.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed z-60 inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto rounded-2xl bg-white shadow-2xl p-6 flex flex-col gap-5"
        style={{ zIndex: 60 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-base font-bold text-slate-900">Approve &amp; Send Variation</h2>
          <p className="text-sm text-slate-500 mt-0.5">{variation.variationRef}</p>
        </div>

        <p className="text-sm text-slate-600">
          Review the cost breakdown before sending to the customer.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="labour">
              Extra Labour (£)
            </label>
            <input
              id="labour"
              type="number"
              min="0"
              step="0.01"
              value={labour}
              onChange={(e) => setLabour(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5" htmlFor="materials">
              Extra Materials (£)
            </label>
            <input
              id="materials"
              type="number"
              min="0"
              step="0.01"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E]"
            />
          </div>
        </div>

        <div
          className="flex items-center justify-between rounded-lg px-4 py-3"
          style={{ background: "#F8FAFC", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <span className="text-sm font-semibold text-slate-700">Extra Total</span>
          <span className="text-sm font-bold text-slate-900">{fmtGbp(total)}</span>
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-400 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
            style={{ background: "#C8102E" }}
          >
            {submitting ? "Approving…" : "Approve & Send"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Variation card ────────────────────────────────────────────────────────────

function VariationCard({
  variation,
  onApprove,
  onReject,
}: {
  variation: VariationRow;
  onApprove: (v: VariationRow) => void;
  onReject: (id: string) => void;
}) {
  const [rejecting, setRejecting] = useState(false);

  async function handleReject() {
    setRejecting(true);
    onReject(variation.id);
  }

  return (
    <div
      className="rounded-2xl bg-white p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-slate-400 mb-1">{variation.variationRef}</p>
          <p className="text-sm font-bold text-slate-800">{variation.bookingRef}</p>
          {variation.customerName && (
            <p className="text-xs text-slate-500 mt-0.5">{variation.customerName}</p>
          )}
        </div>
        <StatusBadge status={variation.status} />
      </div>

      {/* Plumber + service */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
        <span>
          <span className="font-semibold text-slate-700">Engineer: </span>
          {variation.plumberName}
        </span>
        {variation.serviceType && (
          <span>
            <span className="font-semibold text-slate-700">Service: </span>
            {variation.serviceType}
          </span>
        )}
        <span>
          <span className="font-semibold text-slate-700">Raised: </span>
          {fmtDate(variation.createdAt)}
        </span>
      </div>

      {/* Reasons / tags */}
      {variation.reasons.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {variation.reasons.map((r) => (
            <span
              key={r.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold"
              style={{
                background: r.isChargeable ? "#FEF3C7" : "#F1F5F9",
                color: r.isChargeable ? "#92400E" : "#475569",
              }}
            >
              {r.label}
            </span>
          ))}
        </div>
      )}

      {/* Cost breakdown */}
      <div
        className="grid grid-cols-3 gap-3 rounded-xl p-3"
        style={{ background: "#F8FAFC", border: "1px solid rgba(0,0,0,0.05)" }}
      >
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Labour</p>
          <p className="text-sm font-bold text-slate-800">{fmtGbp(variation.extraLabourCost)}</p>
        </div>
        <div className="text-center" style={{ borderLeft: "1px solid rgba(0,0,0,0.06)", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
          <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Materials</p>
          <p className="text-sm font-bold text-slate-800">{fmtGbp(variation.extraMaterialCost)}</p>
        </div>
        <div className="text-center">
          <p className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Total Extra</p>
          <p className="text-base font-black" style={{ color: "#C8102E" }}>{fmtGbp(variation.extraTotal)}</p>
        </div>
      </div>

      {/* Notes */}
      {variation.notes && (
        <p className="text-sm text-slate-600 italic leading-relaxed">&ldquo;{variation.notes}&rdquo;</p>
      )}

      {/* Photo thumbnails */}
      {variation.images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {variation.images.map((img) => (
            <a
              key={img.id}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-16 w-16 rounded-lg overflow-hidden border border-slate-200 hover:border-[#C8102E] transition-colors shrink-0"
              title="View full image"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Variation photo" className="h-full w-full object-cover" />
            </a>
          ))}
        </div>
      )}

      {/* Action buttons */}
      {variation.status === "pending_office" && (
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => onApprove(variation)}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{ background: "#C8102E" }}
          >
            Approve &amp; Send
          </button>
          <button
            disabled={rejecting}
            onClick={handleReject}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:border-red-300 hover:text-red-700 transition-all disabled:opacity-50"
          >
            {rejecting ? "Rejecting…" : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── All variations table ───────────────────────────────────────────────────────

function AllVariationsTable({ variations }: { variations: VariationRow[] }) {
  if (variations.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-center">
        <div>
          <p className="text-slate-400 font-medium">No variations found</p>
          <p className="text-slate-300 text-sm mt-1">Variations that have been sent or resolved will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            {["Ref", "Booking", "Customer", "Engineer", "Extra Total", "Status", "Updated"].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variations.map((v) => (
            <tr
              key={v.id}
              className="hover:bg-slate-50 transition-colors"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.03)" }}
            >
              <td className="px-5 py-3 font-mono text-xs text-pp-navy font-semibold">{v.variationRef}</td>
              <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-700">{v.bookingRef}</td>
              <td className="px-5 py-3 text-sm text-slate-600">{v.customerName ?? "—"}</td>
              <td className="px-5 py-3 text-sm text-slate-600">{v.plumberName}</td>
              <td className="px-5 py-3 text-sm font-semibold text-slate-800">{fmtGbp(v.extraTotal)}</td>
              <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
              <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">{fmtDate(v.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function VariationsClient({
  pending: initialPending,
  all: initialAll,
}: {
  pending: VariationRow[];
  all: VariationRow[];
}) {
  const [pendingList, setPendingList] = useState<VariationRow[]>(initialPending);
  const [allList, setAllList] = useState<VariationRow[]>(initialAll);
  const [tab, setTab] = useState<"pending" | "all">("pending");
  const [approveTarget, setApproveTarget] = useState<VariationRow | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  function handleApproved(id: string) {
    const approved = pendingList.find((v) => v.id === id);
    setPendingList((prev) => prev.filter((v) => v.id !== id));
    if (approved) {
      setAllList((prev) => [{ ...approved, status: "approved_for_send" }, ...prev]);
    }
    showToast("Variation approved and queued for sending.");
  }

  async function handleReject(id: string) {
    try {
      const res = await fetch(`/api/admin/variations/${id}/reject`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const rejected = pendingList.find((v) => v.id === id);
        setPendingList((prev) => prev.filter((v) => v.id !== id));
        if (rejected) {
          setAllList((prev) => [{ ...rejected, status: "declined" }, ...prev]);
        }
        showToast("Variation rejected.");
      } else {
        showToast(data.error ?? "Failed to reject variation.", false);
      }
    } catch {
      showToast("Network error — please try again.", false);
    }
  }

  return (
    <>
      {/* Tabs */}
      <div
        className="flex items-center gap-1 w-fit rounded-xl p-1"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        {(["pending", "all"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-4 py-1.5 rounded-lg text-sm font-semibold transition-all",
              tab === t ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
            style={
              tab === t
                ? { background: "linear-gradient(135deg, #E31530, #C8102E)", boxShadow: "0 2px 6px rgba(200,16,46,0.3)" }
                : {}
            }
          >
            {t === "pending" ? (
              <span className="flex items-center gap-1.5">
                Awaiting Approval
                {pendingList.length > 0 && (
                  <span
                    className="inline-flex items-center justify-center h-4 min-w-[1rem] rounded-full text-[0.6rem] font-bold px-1"
                    style={{ background: tab === "pending" ? "rgba(255,255,255,0.3)" : "#FEF3C7", color: tab === "pending" ? "#fff" : "#92400E" }}
                  >
                    {pendingList.length}
                  </span>
                )}
              </span>
            ) : (
              "All Variations"
            )}
          </button>
        ))}
      </div>

      {/* Pending tab */}
      {tab === "pending" && (
        pendingList.length === 0 ? (
          <div
            className="rounded-2xl flex items-center justify-center py-24 text-center"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
          >
            <div>
              <p className="text-slate-400 font-medium">No variations awaiting approval</p>
              <p className="text-slate-300 text-sm mt-1">All variations have been processed.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingList.map((v) => (
              <VariationCard
                key={v.id}
                variation={v}
                onApprove={setApproveTarget}
                onReject={handleReject}
              />
            ))}
          </div>
        )
      )}

      {/* All variations tab */}
      {tab === "all" && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <AllVariationsTable variations={allList} />
        </div>
      )}

      {/* Approve modal */}
      {approveTarget && (
        <ApproveModal
          variation={approveTarget}
          onClose={() => setApproveTarget(null)}
          onApproved={handleApproved}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg"
          style={{ background: toast.ok ? "#166534" : "#991B1B" }}
        >
          {toast.ok ? (
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}
    </>
  );
}
