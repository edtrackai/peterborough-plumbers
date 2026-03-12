"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  lineType: string;
  isOptional: boolean;
  sortOrder: number;
}

interface QuoteMessage {
  id: string;
  direction: string;
  channel: string;
  recipient: string;
  body: string;
  status: string;
  sentAt: string;
}

export interface QuoteRow {
  id: string;
  quoteRef: string;
  quoteType: string;
  status: string;
  subtotal: number;
  calloutFee: number;
  urgencySurcharge: number;
  vatAmount: number;
  total: number;
  notes: string | null;
  internalNotes: string | null;
  jobSummary: string | null;
  validUntil: string | null;
  sentAt: string | null;
  approvedAt: string | null;
  declinedAt: string | null;
  approvedByText: string | null;
  createdAt: string;
  customerName: string | null;
  customerPhone: string | null;
  customerEmail: string | null;
  serviceLabel: string | null;
  bookingRef: string | null;
  lineItems: LineItem[];
  messages: QuoteMessage[];
}

// ── Status badge config ────────────────────────────────────────────────────────

const STATUS_CFG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  draft:      { label: "Draft",      bg: "#F3F4F6", text: "#4B5563", dot: "#9CA3AF" },
  sent:       { label: "Sent",       bg: "#DBEAFE", text: "#1E40AF", dot: "#3B82F6" },
  approved:   { label: "Approved",   bg: "#DCFCE7", text: "#166534", dot: "#22C55E" },
  declined:   { label: "Declined",   bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  expired:    { label: "Expired",    bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
  superseded: { label: "Superseded", bg: "#F3E8FF", text: "#6B21A8", dot: "#A855F7" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] ?? { label: status, bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.68rem] font-semibold whitespace-nowrap capitalize"
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
  });
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Section / Detail helpers (reused in drawer) ────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">{title}</h3>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-28 shrink-0 text-gray-400">{label}</span>
      <span className={`text-pp-navy font-medium ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function QuotesClient({ quotes: initial }: { quotes: QuoteRow[] }) {
  const [quotes, setQuotes] = useState<QuoteRow[]>(initial);
  const [selected, setSelected] = useState<QuoteRow | null>(null);
  const [sending, setSending] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSend(quote: QuoteRow) {
    setSending(quote.id);
    try {
      const res = await fetch(`/api/quotes/${quote.id}/send`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) =>
            q.id === quote.id ? { ...q, status: "sent", sentAt: new Date().toISOString() } : q
          )
        );
        setSelected((prev) =>
          prev?.id === quote.id ? { ...prev, status: "sent", sentAt: new Date().toISOString() } : prev
        );
        showToast(`Quote ${quote.quoteRef} sent successfully.`);
      } else {
        showToast(data.error ?? "Failed to send quote.", false);
      }
    } catch {
      showToast("Network error — please try again.", false);
    } finally {
      setSending(null);
    }
  }

  const empty = quotes.length === 0;

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{quotes.length} quote{quotes.length !== 1 ? "s" : ""}</p>
        {/* Phase 2 placeholder */}
        <Link
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #E31530 0%, #C8102E 100%)",
            boxShadow: "0 2px 8px rgba(200,16,46,0.3)",
          }}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Generate Quote
        </Link>
      </div>

      {/* ── Table ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
      >
        {empty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-slate-400 font-medium">No quotes yet</p>
            <p className="text-slate-300 text-sm mt-1">Quotes will appear here once created.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  {["Quote Ref", "Customer", "Service", "Total", "Status", "Created", "Actions"].map((h) => (
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
                {quotes.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setSelected(q)}
                    className="cursor-pointer hover:bg-slate-50 transition-colors"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.03)" }}
                  >
                    <td className="px-5 py-3 font-mono text-xs text-pp-navy font-semibold whitespace-nowrap">
                      {q.quoteRef}
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm font-semibold text-slate-700">{q.customerName ?? "—"}</p>
                      {q.customerEmail && (
                        <p className="text-xs text-slate-400 truncate max-w-[160px]">{q.customerEmail}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-600 capitalize">
                      {q.serviceLabel ?? "—"}
                    </td>
                    <td className="px-5 py-3 text-sm font-semibold text-slate-800 whitespace-nowrap">
                      {fmtGbp(q.total)}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={q.status} />
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap">
                      {fmtDate(q.createdAt)}
                    </td>
                    <td
                      className="px-5 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        {q.status === "draft" && (
                          <button
                            disabled={sending === q.id}
                            onClick={() => handleSend(q)}
                            className="rounded-full px-3 py-1 text-xs font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                            style={{ background: "#C8102E" }}
                          >
                            {sending === q.id ? "Sending…" : "Send"}
                          </button>
                        )}
                        {(q.status === "sent" || q.status === "declined") && (
                          <button
                            disabled={sending === q.id}
                            onClick={() => handleSend(q)}
                            className="rounded-full px-3 py-1 text-xs font-semibold text-slate-700 border border-slate-300 hover:border-slate-500 transition-all disabled:opacity-50"
                          >
                            {sending === q.id ? "Sending…" : "Resend"}
                          </button>
                        )}
                        <button
                          onClick={() => setSelected(q)}
                          className="rounded-full px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-400 transition-all"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Detail drawer ── */}
      {selected && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
              <div>
                <p className="font-mono text-xs text-gray-400 mb-0.5">{selected.quoteRef}</p>
                <StatusBadge status={selected.status} />
              </div>
              <div className="flex items-center gap-3">
                {selected.status === "draft" && (
                  <button
                    disabled={sending === selected.id}
                    onClick={() => handleSend(selected)}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50"
                    style={{ background: "#C8102E" }}
                  >
                    {sending === selected.id ? "Sending…" : "Send Quote"}
                  </button>
                )}
                {(selected.status === "sent" || selected.status === "declined") && (
                  <button
                    disabled={sending === selected.id}
                    onClick={() => handleSend(selected)}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-300 hover:border-slate-500 transition-all disabled:opacity-50"
                  >
                    {sending === selected.id ? "Sending…" : "Resend"}
                  </button>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

              {/* Customer */}
              <Section title="Customer">
                <Detail label="Name" value={selected.customerName} />
                <Detail label="Phone" value={selected.customerPhone} />
                <Detail label="Email" value={selected.customerEmail} />
                {selected.bookingRef && (
                  <Detail label="Booking ref" value={selected.bookingRef} mono />
                )}
              </Section>

              {/* Quote summary */}
              <Section title="Quote summary">
                <Detail label="Service" value={selected.serviceLabel} />
                <Detail label="Quote type" value={selected.quoteType} />
                <Detail label="Job summary" value={selected.jobSummary} />
                <Detail label="Notes" value={selected.notes} />
                {selected.validUntil && (
                  <Detail label="Valid until" value={fmtDate(selected.validUntil)} />
                )}
              </Section>

              {/* Line items */}
              {selected.lineItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    Line Items
                  </h3>
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-3 py-2 text-left text-xs font-semibold text-slate-400">Description</th>
                          <th className="px-3 py-2 text-right text-xs font-semibold text-slate-400">Qty</th>
                          <th className="px-3 py-2 text-right text-xs font-semibold text-slate-400">Unit</th>
                          <th className="px-3 py-2 text-right text-xs font-semibold text-slate-400">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {selected.lineItems.map((li) => (
                          <tr key={li.id}>
                            <td className="px-3 py-2 text-slate-700">
                              {li.description}
                              {li.isOptional && (
                                <span className="ml-1.5 text-[0.6rem] font-medium text-slate-400 uppercase tracking-wide">
                                  optional
                                </span>
                              )}
                              <span
                                className="ml-1.5 inline-block px-1.5 py-0.5 rounded text-[0.58rem] font-semibold uppercase"
                                style={{ background: "#F1F5F9", color: "#64748B" }}
                              >
                                {li.lineType}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-right text-slate-500">{li.quantity}</td>
                            <td className="px-3 py-2 text-right text-slate-500">{fmtGbp(li.unitPrice)}</td>
                            <td className="px-3 py-2 text-right font-semibold text-slate-700">{fmtGbp(li.lineTotal)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        {selected.calloutFee > 0 && (
                          <tr className="bg-slate-50">
                            <td colSpan={3} className="px-3 py-1.5 text-xs text-slate-400">Callout fee</td>
                            <td className="px-3 py-1.5 text-right text-xs font-semibold text-slate-600">{fmtGbp(selected.calloutFee)}</td>
                          </tr>
                        )}
                        {selected.urgencySurcharge > 0 && (
                          <tr className="bg-slate-50">
                            <td colSpan={3} className="px-3 py-1.5 text-xs text-slate-400">Urgency surcharge</td>
                            <td className="px-3 py-1.5 text-right text-xs font-semibold text-slate-600">{fmtGbp(selected.urgencySurcharge)}</td>
                          </tr>
                        )}
                        {selected.vatAmount > 0 && (
                          <tr className="bg-slate-50">
                            <td colSpan={3} className="px-3 py-1.5 text-xs text-slate-400">VAT</td>
                            <td className="px-3 py-1.5 text-right text-xs font-semibold text-slate-600">{fmtGbp(selected.vatAmount)}</td>
                          </tr>
                        )}
                        <tr style={{ borderTop: "2px solid rgba(0,0,0,0.06)" }}>
                          <td colSpan={3} className="px-3 py-2 text-sm font-bold text-slate-700">Total</td>
                          <td className="px-3 py-2 text-right text-sm font-bold text-slate-800">{fmtGbp(selected.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Approval evidence */}
              {selected.status === "approved" && (
                <Section title="Approval Evidence">
                  {selected.approvedAt && (
                    <Detail label="Approved at" value={fmtDateTime(selected.approvedAt)} />
                  )}
                  {selected.approvedByText && (
                    <div className="text-sm">
                      <p className="text-gray-400 mb-1">Customer reply</p>
                      <blockquote
                        className="rounded-lg px-3 py-2 text-slate-700 italic border-l-2"
                        style={{ background: "#F0FDF4", borderColor: "#22C55E" }}
                      >
                        &ldquo;{selected.approvedByText}&rdquo;
                      </blockquote>
                    </div>
                  )}
                </Section>
              )}

              {/* Messages log */}
              {selected.messages.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                    Message Log ({selected.messages.length})
                  </h3>
                  <div className="flex flex-col gap-2">
                    {selected.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="rounded-xl px-4 py-3 text-sm"
                        style={{
                          background: msg.direction === "outbound" ? "#EFF6FF" : "#F8FAFC",
                          border: `1px solid ${msg.direction === "outbound" ? "#BFDBFE" : "rgba(0,0,0,0.06)"}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-[0.62rem] font-bold uppercase tracking-wide"
                            style={{ color: msg.direction === "outbound" ? "#1E40AF" : "#64748B" }}
                          >
                            {msg.direction === "outbound" ? "Sent" : "Received"} · {msg.channel}
                          </span>
                          <span className="text-[0.62rem] text-slate-400">
                            {fmtDateTime(msg.sentAt)}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.body}</p>
                        <p className="text-[0.6rem] text-slate-400 mt-1.5">{msg.recipient}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <Section title="Timeline">
                <Detail label="Created" value={fmtDateTime(selected.createdAt)} />
                {selected.sentAt && <Detail label="Sent" value={fmtDateTime(selected.sentAt)} />}
                {selected.approvedAt && <Detail label="Approved" value={fmtDateTime(selected.approvedAt)} />}
                {selected.declinedAt && <Detail label="Declined" value={fmtDateTime(selected.declinedAt)} />}
              </Section>

            </div>
          </aside>
        </>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg"
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
