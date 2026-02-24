import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RatingPageClient } from "./RatingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rate Your Plumber",
  robots: { index: false, follow: false },
};

export default async function RatePage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      assignedPlumber: { select: { name: true } },
      rating: { select: { stars: true, comment: true } },
    },
  });

  if (!booking || booking.status !== "completed") notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pp-navy to-pp-navy-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl mb-3 block">⭐</span>
          <h1 className="text-2xl font-bold text-pp-navy">How did we do?</h1>
          {booking.assignedPlumber && (
            <p className="text-sm text-gray-500 mt-1">
              Rate your experience with <strong>{booking.assignedPlumber.name}</strong>
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">Job ref: {booking.bookingRef}</p>
        </div>

        <RatingPageClient
          bookingId={bookingId}
          existingRating={booking.rating ?? null}
        />
      </div>
    </div>
  );
}
