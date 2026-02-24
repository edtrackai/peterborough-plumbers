"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RejectModal } from "./RejectModal";

interface Offer {
  id: string;
  bookingId: string;
  offeredAt: string;
  booking: {
    bookingRef: string;
    serviceType: string | null;
    description: string | null;
    postcode: string;
    slot: { date: string; startTime: string; endTime: string };
    images: { url: string }[];
  };
}

interface OfferCardProps {
  offer: Offer;
  onRemoved: (offerId: string) => void;
}

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short",
  });
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
      const res = await fetch(`/api/plumber/offers/${offer.id}/accept`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to accept"); return; }
      router.push(`/plumber/jobs/${data.bookingId}`);
    } finally {
      setAccepting(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <div>
            <span className="inline-block rounded-full bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 mb-2">
              New Request
            </span>
            <p className="font-mono text-xs text-gray-400">{b.bookingRef}</p>
          </div>
          {b.images.length > 0 && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.images[0].url} alt="" className="h-12 w-12 rounded-lg object-cover border border-gray-100" />
          )}
        </div>

        {/* Body */}
        <div className="px-5 pb-4 flex flex-col gap-2">
          <Row icon="📍" label={b.postcode} />
          <Row icon="🔧" label={b.serviceType ?? "General plumbing"} className="capitalize" />
          <Row icon="📅" label={`${formatDate(b.slot.date)} · ${b.slot.startTime}–${b.slot.endTime}`} />
          {b.description && (
            <p className="mt-1 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600 line-clamp-3">
              {b.description}
            </p>
          )}
        </div>

        {error && <p className="px-5 pb-2 text-xs text-red-600">{error}</p>}

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={() => setShowReject(true)}
            className="flex-1 rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="flex-1 rounded-xl bg-pp-teal py-3 text-sm font-bold text-white hover:bg-pp-teal-dark transition-colors disabled:opacity-60"
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

function Row({ icon, label, className = "" }: { icon: string; label: string; className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <span className={`text-sm text-pp-navy ${className}`}>{label}</span>
    </div>
  );
}
