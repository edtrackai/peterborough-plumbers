"use client";

import { useState } from "react";
import { OfferCard } from "@/components/plumber/OfferCard";

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

export function OffersClient({ initialOffers }: { initialOffers: Offer[] }) {
  const [offers, setOffers] = useState(initialOffers);

  function removeOffer(id: string) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A1A1A] border border-white/[0.07]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="11" stroke="#27272A" strokeWidth="2" />
            <path d="M9 14l3.5 3.5 6.5-7" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-base font-semibold text-white">All caught up</p>
        <p className="text-sm text-zinc-600 mt-1">No pending job requests right now.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {offers.map((o) => (
        <OfferCard key={o.id} offer={o} onRemoved={removeOffer} />
      ))}
    </div>
  );
}
