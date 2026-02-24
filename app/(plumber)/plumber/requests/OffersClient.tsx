"use client";

import { useState } from "react";
import { OfferCard } from "@/components/plumber/OfferCard";

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

export function OffersClient({ initialOffers }: { initialOffers: Offer[] }) {
  const [offers, setOffers] = useState(initialOffers);

  function removeOffer(id: string) {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  }

  if (offers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">✅</span>
        <p className="text-lg font-semibold text-pp-navy">All caught up!</p>
        <p className="text-sm text-gray-400 mt-1">No pending job requests right now.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {offers.map((o) => (
        <OfferCard key={o.id} offer={o} onRemoved={removeOffer} />
      ))}
    </div>
  );
}
