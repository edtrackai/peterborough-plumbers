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
    title: "How to Fix a Dripping Tap",
    url: "https://www.youtube.com/watch?v=EzBSUkWpZ1I",
  },
  {
    category: "blocked_drain",
    title: "How to Unblock a Sink or Drain",
    url: "https://www.youtube.com/watch?v=3O_oADvEOhY",
  },
  {
    category: "toilet_running",
    title: "How to Fix a Running Toilet Cistern",
    url: "https://www.youtube.com/watch?v=cfE1jG6-4bQ",
  },
  {
    category: "stopcock_emergency",
    title: "How to Turn Off Your Stopcock",
    url: "https://www.youtube.com/watch?v=oNuvDVvAiGw",
  },
  {
    category: "burst_pipe",
    title: "Burst Pipe – Emergency Steps",
    url: "https://www.youtube.com/watch?v=oNuvDVvAiGw",
  },
  {
    category: "low_pressure",
    title: "Low Water Pressure – Common Causes",
    url: "https://www.youtube.com/watch?v=B0F3fVxUeRs",
  },
];

export function getVideoForCategory(category: VideoCategory): VideoEntry | undefined {
  return videoWhitelist.find((v) => v.category === category);
}
