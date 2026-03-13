"use client";

interface BookNowButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Drop-in replacement for any "Book Now" link or button.
 * Dispatches the global "open-booking-modal" event which SimpleBookingModal listens for.
 * Works from both server and client component trees.
 */
export function BookNowButton({ children, className, style }: BookNowButtonProps) {
  function open() {
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  }

  return (
    <button onClick={open} className={className} style={style} type="button">
      {children ?? "Book Now"}
    </button>
  );
}
