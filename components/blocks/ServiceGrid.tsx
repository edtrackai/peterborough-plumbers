'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/content/services';

/* ── Chevron icons ─────────────────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11 14 7 9l4-5" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 4l4 5-4 5" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function ServiceGrid({
  services,
  heading = "Our Services",
}: {
  services: Service[];
  heading?: string;
}) {
  /* ── Refs & state ── */
  const trackRef    = useRef<HTMLDivElement>(null);
  const idxRef      = useRef(0);              // mutable mirror of activeIdx
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused]   = useState(false);

  // drag tracking
  const isDragging = useRef(false);
  const hasDragged = useRef(false);           // guards link clicks after drag
  const dragStart  = useRef({ x: 0, sl: 0 });

  // pause timer
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = services.length;

  /* ── Helpers ────────────────────────────────────────────────────────────── */
  function pauseFor(ms = 5000) {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setIsPaused(true);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), ms);
  }

  /* ── Scroll-to-index ────────────────────────────────────────────────────── */
  const scrollToIndex = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.min(Math.max(idx, 0), total - 1);
    const cards   = track.querySelectorAll<HTMLElement>('[data-card]');
    const card    = cards[clamped];
    if (!card) return;
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
    idxRef.current = clamped;
    setActiveIdx(clamped);
  }, [total]);

  /* ── Scroll → active dot sync ───────────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards  = track.querySelectorAll<HTMLElement>('[data-card]');
      const tLeft  = track.getBoundingClientRect().left;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.getBoundingClientRect().left - tLeft);
        if (d < bestD) { bestD = d; best = i; }
      });
      idxRef.current = best;
      setActiveIdx(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Autoplay ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (isPaused) return;
    const id = setInterval(() => {
      const next = idxRef.current >= total - 1 ? 0 : idxRef.current + 1;
      scrollToIndex(next);
    }, 7000);
    return () => clearInterval(id);
  }, [isPaused, total, scrollToIndex]);

  /* ── Cleanup ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    return () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); };
  }, []);

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  function prev() { scrollToIndex(idxRef.current - 1); pauseFor(); }
  function next() { scrollToIndex(idxRef.current + 1); pauseFor(); }

  /* ── Drag-to-scroll ─────────────────────────────────────────────────────── */
  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current  = { x: e.pageX, sl: trackRef.current?.scrollLeft ?? 0 };
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
    setIsPaused(true);
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    trackRef.current.scrollLeft = dragStart.current.sl - dx;
  }

  function onDragEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = '';
    pauseFor();
  }

  /* ── Keyboard ───────────────────────────────────────────────────────────── */
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  }

  if (!total) return null;

  /* ── Glass arrow class ──────────────────────────────────────────────────── */
  const glassBtn = [
    'absolute top-[calc(50%-0.75rem)] -translate-y-1/2 z-20',
    'w-10 h-10 flex items-center justify-center',
    'rounded-full bg-white/85 backdrop-blur-sm',
    'border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.13)]',
    'text-[#242424]',
    'transition-all duration-200',
    'hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] hover:-translate-y-[calc(50%+3px)]',
    'active:scale-[0.93]',
    'disabled:opacity-25 disabled:pointer-events-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
  ].join(' ');

  /* ── JSX ────────────────────────────────────────────────────────────────── */
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-3xl lg:text-4xl font-bold text-pp-heading section-heading-underline">
            {heading}
          </h2>
        </div>

        {/* ── Slider wrapper ── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { if (!isDragging.current) setIsPaused(false); }}
        >

          {/* ← Prev */}
          <button
            onClick={prev}
            disabled={activeIdx === 0}
            aria-label="Previous service"
            className={`${glassBtn} left-1 sm:left-2`}
          >
            <ChevronLeft />
          </button>

          {/* Next → */}
          <button
            onClick={next}
            disabled={activeIdx >= total - 1}
            aria-label="Next service"
            className={`${glassBtn} right-1 sm:right-2`}
          >
            <ChevronRight />
          </button>

          {/* ── Scrollable track ── */}
          <div
            ref={trackRef}
            role="region"
            aria-label={`${heading} carousel`}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            className="flex gap-5 overflow-x-auto py-3 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 rounded-lg"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory',
              cursor: 'grab',
            } as React.CSSProperties}
          >
            {services.map((service) => (
              <article
                key={service.slug}
                data-card=""
                className={[
                  'shrink-0',
                  'w-[82%] sm:w-[47%] lg:w-[30%]',
                  'rounded-xl overflow-hidden',
                  'border border-black/[0.07]',
                  'bg-white shadow-[0_1px_4px_rgba(0,0,0,0.07)]',
                  'transition-all duration-300',
                  'hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]',
                  'group',
                ].join(' ')}
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Image / placeholder */}
                {service.image ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 47vw, 30vw"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}
                  >
                    <span
                      className="font-bold select-none transition-transform duration-500 group-hover:scale-105"
                      style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', color: 'rgba(200,16,46,0.25)' }}
                      aria-hidden="true"
                    >
                      {service.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-semibold text-pp-heading text-base mb-1.5 leading-snug">
                    {service.name}
                  </h3>
                  {service.shortDescription && (
                    <p className="text-sm text-pp-body line-clamp-2 mb-4 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  )}
                  <Link
                    href={`/services/${service.slug}`}
                    draggable={false}
                    onClick={(e) => { if (hasDragged.current) e.preventDefault(); }}
                    className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  >
                    View service <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── Progress pill indicators ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-1.5 mt-5"
          role="group"
          aria-label={`${heading} slide navigation`}
        >
          {services.map((svc, i) => (
            <button
              key={svc.slug}
              aria-label={`Go to ${svc.name}`}
              aria-pressed={i === activeIdx}
              onClick={() => { scrollToIndex(i); pauseFor(); }}
              className={[
                'h-1.5 rounded-full transition-all duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
                i === activeIdx
                  ? 'w-6 bg-brand'
                  : 'w-2 bg-gray-300 hover:bg-gray-400',
              ].join(' ')}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
