// ── Chatbot Video Whitelist ────────────────────────────────────────────────────
// ONLY these URLs may be surfaced by the chatbot. No boiler/gas videos allowed.

export type VideoCategory =
  | "leak_tap"
  | "blocked_drain"
  | "toilet_running"
  | "stopcock_emergency"
  | "burst_pipe"
  | "low_pressure";

export interface VideoEntry {
  category: VideoCategory;
  title: string;
  url: string;
}

export const videoWhitelist: VideoEntry[] = [
  {
    category: "leak_tap",
    title: "How to Replace a Tap Washer",
    url: "https://www.youtube.com/watch?v=hYL7EbB3nFU",
  },
  {
    category: "blocked_drain",
    title: "How to Unblock a Sink or Drain",
    url: "https://www.youtube.com/watch?v=3COQSVP--8A",
  },
  {
    category: "toilet_running",
    title: "Why Won't My Toilet Stop Filling Up?",
    url: "https://www.youtube.com/watch?v=nPX_aQNPX1U",
  },
  {
    category: "stopcock_emergency",
    title: "How to Turn Off Your Stopcock",
    url: "https://www.youtube.com/watch?v=9Uy4SeXVRYg",
  },
  {
    category: "burst_pipe",
    title: "How to Turn Off Your Stopcock",
    url: "https://www.youtube.com/watch?v=9Uy4SeXVRYg",
  },
  {
    category: "low_pressure",
    title: "How to Test for Low Water Pressure",
    url: "https://www.youtube.com/watch?v=TOVc5i47KG8",
  },
];

export function getVideoForCategory(category: VideoCategory): VideoEntry | undefined {
  return videoWhitelist.find((v) => v.category === category);
}
