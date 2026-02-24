"use client";

import { useState } from "react";

interface RatingInputProps {
  bookingId: string;
  onSubmitted: () => void;
}

export function RatingInput({ bookingId, onSubmitted }: RatingInputProps) {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stars) { setError("Please select a rating."); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/rate/${bookingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars, comment: comment.trim() || undefined }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error ?? "Something went wrong.");
        return;
      }
      onSubmitted();
    } finally {
      setLoading(false);
    }
  }

  const display = hovered || stars;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      {/* Stars */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setStars(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="text-4xl transition-transform active:scale-110"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            <span className={n <= display ? "text-yellow-400" : "text-gray-200"}>★</span>
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500">
        {display === 0 && "Tap to rate"}
        {display === 1 && "Poor"}
        {display === 2 && "Fair"}
        {display === 3 && "Good"}
        {display === 4 && "Very good"}
        {display === 5 && "Excellent!"}
      </p>

      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment (optional)…"
        className="w-full max-w-sm rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pp-teal resize-none"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading || !stars}
        className="w-full max-w-sm rounded-xl bg-pp-teal py-3.5 font-bold text-white hover:bg-pp-teal-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting…" : "Submit Rating"}
      </button>
    </form>
  );
}
