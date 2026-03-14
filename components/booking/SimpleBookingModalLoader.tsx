"use client";

import dynamic from "next/dynamic";

// `ssr: false` is only allowed inside Client Components.
// This thin wrapper lets layout.tsx (a Server Component) render the modal
// without causing a Turbopack build error.
const SimpleBookingModal = dynamic(
  () =>
    import("@/components/booking/SimpleBookingModal").then((m) => ({
      default: m.SimpleBookingModal,
    })),
  { ssr: false },
);

export function SimpleBookingModalLoader() {
  return <SimpleBookingModal />;
}
