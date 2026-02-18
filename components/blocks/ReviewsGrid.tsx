"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Review } from "@/content/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-pp-yellow" : "text-pp-dark/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsGrid({
  reviews,
  heading = "What Our Customers Say",
}: {
  reviews: Review[];
  heading?: string;
}) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = reviews.length;

  const getVisible = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(getVisible());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(total - visible, 0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Touch swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(next, 3500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused, next]);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-pp-dark text-center mb-12">
          {heading}
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 bg-white shadow-lg rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-pp-yellow transition-colors border border-pp-dark/10"
          >
            <svg className="h-5 w-5 text-pp-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Cards container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / visible)}%)`,
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visible}%` }}
                >
                  <div className="bg-pp-offwhite rounded-xl p-6 border border-pp-dark/5 h-full flex flex-col">
                    <Stars rating={review.rating} />
                    <p className="text-pp-dark/80 text-sm leading-relaxed mt-4 mb-4 flex-1">
                      &ldquo;{review.body}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-pp-dark text-sm">{review.customerName}</p>
                      <p className="text-xs text-pp-dark/50">{review.areaName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 bg-white shadow-lg rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-pp-yellow transition-colors border border-pp-dark/10"
          >
            <svg className="h-5 w-5 text-pp-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-pp-accent" : "w-2.5 bg-pp-dark/20 hover:bg-pp-dark/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
