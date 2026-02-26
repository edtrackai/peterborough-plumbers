// ── Chatbot Knowledge Base ────────────────────────────────────────────────────
// Safe plumbing guidance only. NO boiler/gas content.

import type { VideoCategory } from "./videos";

export type PlumbingCategory =
  | "leak_tap"
  | "blocked_drain"
  | "toilet_running"
  | "burst_pipe"
  | "low_pressure"
  | "quote_booking"
  | "general"
  | "boiler_gas"; // blocked — never served

export interface KBEntry {
  category: PlumbingCategory;
  videoCategory?: VideoCategory;
  intro: string;
  tips: string[];
  callToAction: string;
  suggestedActions: string[];
}

export const knowledgeBase: Record<Exclude<PlumbingCategory, "boiler_gas">, KBEntry> = {
  leak_tap: {
    category: "leak_tap",
    videoCategory: "leak_tap",
    intro: "A dripping tap is usually a worn washer or O-ring — a quick fix in most cases.",
    tips: [
      "Turn off the water supply under the sink (isolation valve) or at the stopcock.",
      "Turn the tap on to release remaining pressure in the pipe.",
      "Undo the tap head (usually a screw under the hot/cold cap) to access the cartridge.",
      "Replace the rubber washer or cartridge — take the old one to a hardware shop to match the size.",
      "Reassemble, turn the water back on, and check for drips.",
    ],
    callToAction:
      "If the drip persists or you're unsure, our engineers can fix it same day. No call-out charge.",
    suggestedActions: ["Book a visit", "Request a callback", "Get a quote"],
  },

  blocked_drain: {
    category: "blocked_drain",
    videoCategory: "blocked_drain",
    intro: "Most blocked drains can be cleared with a few simple steps before calling a plumber.",
    tips: [
      "Pour boiling water slowly down the drain — this can dissolve grease build-up.",
      "Use a plunger: block the overflow hole with a cloth and plunge firmly 10–15 times.",
      "Try a drain-clearing solution (e.g. bicarbonate of soda + white vinegar, leave 30 mins, flush).",
      "For a shower/bath drain, remove the cover and clear any hair or debris by hand.",
      "Avoid pouring cooking grease down sinks — it solidifies and causes repeat blockages.",
    ],
    callToAction:
      "If the blockage won't clear or affects multiple drains, it could be a deeper issue. We carry drain rods and high-pressure jetting equipment.",
    suggestedActions: ["Book a drain clearance", "Request a callback", "Get a quote"],
  },

  toilet_running: {
    category: "toilet_running",
    videoCategory: "toilet_running",
    intro:
      "A constantly running toilet wastes up to 200 litres a day. It's usually the fill valve or flapper.",
    tips: [
      "Lift the cistern lid and check if the float arm is too high — bend it slightly downward.",
      "Check the flapper (rubber seal at the bottom of the cistern) — if worn or warped, replace it.",
      "If the overflow pipe is dripping outside, the water level in the cistern is too high — adjust the float.",
      "Turn off the isolation valve behind the toilet before doing any repairs.",
      "Replacement flappers and fill valves cost £5–£15 at any DIY store.",
    ],
    callToAction:
      "Still running? Our plumbers can diagnose and fix toilet faults quickly, including dual-flush mechanisms.",
    suggestedActions: ["Book a visit", "Request a callback", "Get a quote"],
  },

  burst_pipe: {
    category: "burst_pipe",
    videoCategory: "burst_pipe",
    intro: "A burst pipe is an emergency. Act fast to minimise water damage.",
    tips: [
      "🔴 IMMEDIATELY turn off your stopcock — usually under the kitchen sink or where the water main enters.",
      "Turn on all taps to drain remaining water from the pipes.",
      "Switch off your immersion heater and central heating system.",
      "Catch dripping water in buckets and move belongings away from the affected area.",
      "If water is near electrical fittings or the consumer unit, turn off the electricity at the mains.",
    ],
    callToAction:
      "Call us now — we respond to burst pipe emergencies 24/7 across Peterborough.",
    suggestedActions: ["Call now — 24/7 emergency", "Book emergency visit"],
  },

  low_pressure: {
    category: "low_pressure",
    videoCategory: "low_pressure",
    intro:
      "Low water pressure from taps or showers is often a simple fix. Note: this is mains water pressure, not boiler pressure.",
    tips: [
      "Check if all taps in the house are affected or just one — a single tap suggests a blocked aerator.",
      "Unscrew the aerator (the small mesh filter on the tap spout) and rinse it clean.",
      "Check if your stopcock is fully open — sometimes it gets partially closed accidentally.",
      "Contact your water company (Anglian Water in Peterborough) to check for local supply issues.",
      "If pressure is fine at the mains but low at taps, you may have an internal pipe restriction.",
    ],
    callToAction:
      "Persistent low pressure could indicate a leak or supply issue. Our engineers can trace and fix it.",
    suggestedActions: ["Book a diagnosis visit", "Request a callback", "Get a quote"],
  },

  quote_booking: {
    category: "quote_booking",
    intro:
      "We'd love to help. Here's the quickest way to get a quote or book an engineer.",
    tips: [
      "Use our online booking tool for same-day or next-day appointments.",
      "Call us on 02039514510 — we answer 7 days a week.",
      "No call-out charge — you only pay for the work done.",
      "Gas Safe registered engineers for all plumbing and heating work.",
      "Fixed, upfront pricing — no hidden extras.",
    ],
    callToAction: "Ready to book? Use the links below.",
    suggestedActions: ["Book online", "Call 02039514510", "Request a callback"],
  },

  general: {
    category: "general",
    intro: "I can help with common plumbing questions. What's the issue you're experiencing?",
    tips: [],
    callToAction:
      "For a fast answer, tap one of the quick topics below or describe your problem.",
    suggestedActions: ["Leaking tap", "Blocked drain", "Toilet running", "Burst pipe", "Get a quote"],
  },
};
