"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RejectModal } from "./RejectModal";

interface Offer {
  id: string;
  bookingId: string;
  offeredAt: string;
  booking: {
    bookingRef:  string;
    serviceType: string | null;
    description: string | null;
    postcode:    string;
    slot: { date: string; startTime: string; endTime: string };
    images: { url: string }[];
  };
}

interface OfferCardProps {
  offer:     Offer;
  onRemoved: (offerId: string) => void;
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short",
  });
}

/* ── Small icon helpers ──────────────────────────────────────────────────── */
function IconPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M6.5 1.5a3.5 3.5 0 013.5 3.5c0 2.5-3.5 7-3.5 7S3 7.5 3 5a3.5 3.5 0 013.5-3.5z" stroke="#71717A" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="6.5" cy="5" r="1.2" fill="#71717A" />
    </svg>
  );
}
function IconWrench() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M9 1.5a2.5 2.5 0 00-2.5 2.5c0 .3.05.6.13.87L1.5 10l1 1.5 5.2-5.2c.27.08.55.13.87.13A2.5 2.5 0 0011.5 4c0-.5-.15-.96-.4-1.35L9.5 4.3 8.7 3.5l1.65-1.6A2.48 2.48 0 009 1.5z" stroke="#71717A" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function IconCal() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="1.5" y="2.5" width="10" height="9" rx="1.5" stroke="#71717A" strokeWidth="1.3" />
      <path d="M1.5 5.5h10" stroke="#71717A" strokeWidth="1.3" />
      <path d="M4.5 1.5v2M8.5 1.5v2" stroke="#71717A" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function OfferCard({ offer, onRemoved }: OfferCardProps) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const b = offer.booking;

  async function handleAccept() {
    setAccepting(true);
    setError(null);
    try {
      const res  = await fetch(`/api/plumber/offers/${offer.id}/accept`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to accept"); return; }
      router.push(`/plumber/jobs/${data.bookingId}`);
    } finally {
      setAccepting(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl bg-[#111111] border border-white/[0.07] overflow-hidden transition-all duration-200 hover:border-white/[0.12]">

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/[0.06]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-500/20 px-2.5 py-1 text-xs font-semibold text-blue-400 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              New Request
            </span>
            <p className="font-mono text-xs text-zinc-600">{b.bookingRef}</p>
          </div>
          {b.images.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={b.images[0].url}
              alt=""
              className="h-14 w-14 rounded-xl object-cover border border-white/[0.07]"
            />
          )}
        </div>

        {/* ── Body ── */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <Row icon={<IconPin />}    label={b.postcode} />
          <Row icon={<IconWrench />} label={b.serviceType ?? "General plumbing"} className="capitalize" />
          <Row icon={<IconCal />}    label={`${formatDate(b.slot.date)} · ${b.slot.startTime}–${b.slot.endTime}`} />

          {b.description && (
            <div className="mt-1 rounded-xl bg-[#1A1A1A] border border-white/[0.05] px-3.5 py-3">
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">{b.description}</p>
            </div>
          )}
        </div>

        {error && (
          <p className="px-5 pb-2 text-xs text-red-400">{error}</p>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={() => setShowReject(true)}
            className="flex-1 rounded-xl border border-white/[0.08] py-3 text-sm font-medium text-zinc-400 hover:border-red-500/30 hover:text-red-400 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="flex-1 rounded-xl bg-[var(--brand)] py-3 text-sm font-bold text-white hover:bg-[var(--brand-hover)] transition-colors disabled:opacity-50 shadow-md shadow-[var(--brand)]/15"
          >
            {accepting ? "Accepting…" : "Accept Job"}
          </button>
        </div>
      </div>

      {showReject && (
        <RejectModal
          offerId={offer.id}
          bookingRef={b.bookingRef}
          onClose={() => setShowReject(false)}
          onRejected={(id) => { setShowReject(false); onRemoved(id); }}
        />
      )}
    </>
  );
}

function Row({
  icon, label, className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <span className={`text-sm text-zinc-300 ${className}`}>{label}</span>
    </div>
  );
}
