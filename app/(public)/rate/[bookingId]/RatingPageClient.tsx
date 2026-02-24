"use client";

import { useState } from "react";
import { RatingInput } from "@/components/plumber/RatingInput";

interface Props {
  bookingId: string;
  existingRating: { stars: number; comment: string | null } | null;
}

export function RatingPageClient({ bookingId, existingRating }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (existingRating || submitted) {
    const stars = existingRating?.stars ?? 5;
    return (
      <div className="text-center flex flex-col items-center gap-4">
        <span className="text-5xl">🎉</span>
        <div>
          <p className="text-lg font-bold text-pp-navy">Thank you!</p>
          <p className="text-sm text-gray-500 mt-1">Your rating has been recorded.</p>
        </div>
        <div className="text-2xl text-yellow-400">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
        {existingRating?.comment && (
          <p className="text-sm text-gray-600 italic">"{existingRating.comment}"</p>
        )}
      </div>
    );
  }

  return <RatingInput bookingId={bookingId} onSubmitted={() => setSubmitted(true)} />;
}
