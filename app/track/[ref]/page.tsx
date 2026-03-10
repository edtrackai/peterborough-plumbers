import type { Metadata } from "next";
import TrackerClient from "./TrackerClient";
import { siteSettings } from "@/content/settings";

export const metadata: Metadata = {
  title:  "Track Your Plumber",
  robots: { index: false, follow: false },
};

export default async function TrackPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const bookingRef = ref.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <p className="font-bold text-[#242424] text-lg">{siteSettings.companyName}</p>
          <a
            href={`tel:${siteSettings.phoneHref}`}
            className="text-sm font-semibold text-[#C8102E] hover:underline"
          >
            {siteSettings.phone}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6 pb-12">
        <h1 className="text-xl font-bold text-[#242424] mb-1">Track Your Plumber</h1>
        <p className="text-sm text-gray-500 mb-5">Reference: {bookingRef}</p>
        <TrackerClient bookingRef={bookingRef} />
      </main>
    </div>
  );
}
