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
    intro: "A dripping tap is one of the most common calls we get — and it's often a DIY fix. It's usually a worn washer or O-ring. Here's what to try:",
    tips: [
      "Turn off the water supply under the sink (isolation valve) or at the stopcock.",
      "Turn the tap on fully to release remaining pressure in the pipe.",
      "Undo the tap head — there's usually a screw under the hot/cold cap — to access the cartridge.",
      "Replace the rubber washer or cartridge. Take the old one to a hardware shop to match the exact size.",
      "Reassemble, turn the water back on slowly, and check for drips.",
    ],
    callToAction:
      "If the drip comes back or you're not comfortable doing this yourself, we can fix it same day — with a clear price before we start.",
    suggestedActions: ["Book a same-day visit", "Get a free quote", "What if it's still dripping?"],
  },

  blocked_drain: {
    category: "blocked_drain",
    videoCategory: "blocked_drain",
    intro: "Before calling an engineer, it's worth trying these steps — they clear the majority of household blockages:",
    tips: [
      "Pour a full kettle of boiling water slowly down the drain — this dissolves most grease build-up.",
      "Use a plunger: block the overflow hole with a damp cloth and plunge firmly 10–15 times.",
      "Try bicarbonate of soda + white vinegar — pour both in, wait 30 minutes, then flush with hot water.",
      "For a shower or bath drain, remove the cover and pull out any hair or debris by hand.",
      "Avoid pouring cooking fat or oil down sinks — it cools and solidifies, causing repeat blockages.",
    ],
    callToAction:
      "If it won't clear or multiple drains are affected, it's likely a deeper blockage. We carry drain rods and high-pressure jetting equipment for exactly this.",
    suggestedActions: ["Book drain clearance", "What if it won't clear?", "Get a quote"],
  },

  toilet_running: {
    category: "toilet_running",
    videoCategory: "toilet_running",
    intro:
      "A constantly running toilet wastes up to 200 litres a day — that's roughly £300 added to your annual water bill. The good news: the fix is usually cheap and quick.",
    tips: [
      "Lift the cistern lid and check the float arm — if it's set too high, bend it slightly downward.",
      "Check the flapper (the rubber seal at the bottom of the cistern) — if it's worn or warped, it needs replacing.",
      "If you can see water dripping from the overflow pipe outside the house, the cistern level is too high.",
      "Turn off the isolation valve behind the toilet before touching anything inside the cistern.",
      "Replacement flappers and fill valves cost £5–£15 at any DIY store and take about 20 minutes to swap.",
    ],
    callToAction:
      "Still running after trying the above? Our plumbers can diagnose toilet faults quickly, including dual-flush mechanisms and concealed cisterns.",
    suggestedActions: ["Book a toilet repair", "How much will it cost?", "Get a free quote"],
  },

  burst_pipe: {
    category: "burst_pipe",
    videoCategory: "burst_pipe",
    intro: "Act immediately — a burst pipe can cause serious damage within minutes. Follow these steps in order:",
    tips: [
      "🔴 Turn off your stopcock RIGHT NOW — it's usually under the kitchen sink or where the water main enters your property.",
      "Open all taps to drain the remaining water from your pipes quickly.",
      "Switch off your immersion heater and central heating system.",
      "Catch dripping water in buckets and move belongings away from the affected area.",
      "If water is near electrical fittings or your consumer unit, switch off the electricity at the mains.",
    ],
    callToAction:
      "Call us now — we take emergency call-outs across Peterborough and surrounding areas.",
    suggestedActions: ["📞 Call us now — emergency", "Book an emergency visit"],
  },

  low_pressure: {
    category: "low_pressure",
    videoCategory: "low_pressure",
    intro:
      "Low pressure is usually one of three things: a blocked aerator, a partially-closed stopcock, or a local supply issue. Let's work through it. (Note: this is mains water pressure — not boiler pressure.)",
    tips: [
      "Check if all taps are affected or just one — a single tap points to a blocked aerator (the small mesh filter on the spout).",
      "Unscrew the aerator and rinse it under running water to clear the build-up.",
      "Check your stopcock is fully open — it sometimes gets knocked partially closed.",
      "Contact Anglian Water (the local supplier for Peterborough) to check for any known supply issues in your area.",
      "If mains pressure is fine but your taps are still weak, there may be a restriction or partial blockage inside your pipework.",
    ],
    callToAction:
      "Persistent low pressure often means a hidden leak or corroded pipework. Our engineers can trace and fix it with minimal disruption.",
    suggestedActions: ["Book a diagnosis visit", "Is it my water supplier?", "Get a quote"],
  },

  quote_booking: {
    category: "quote_booking",
    intro:
      "Happy to help you get booked in. We're available Mon–Fri 8am–6pm and Sat 8am–5pm, with emergency call-outs any time.",
    tips: [
      "Use our online booking tool for same-day or next-day appointments.",
      "Or call us on 02039514510 — we answer 7 days a week.",
      "We confirm the call-out fee before we attend — no surprises.",
      "All engineers are fully qualified and carry parts for the most common repairs.",
      "You'll receive a clear written quote before any work begins.",
    ],
    callToAction: "Ready to get sorted? Use the options below.",
    suggestedActions: ["Book online", "Call 02039514510", "What are your prices?"],
  },

  general: {
    category: "general",
    intro: "I'm not sure I caught that — could you describe the issue in a bit more detail? Or tap one of the quick topics below:",
    tips: [],
    callToAction:
      "If it's urgent, call us directly on 02039514510 — we're available 7 days a week.",
    suggestedActions: ["Leaking tap", "Blocked drain", "Toilet running", "Burst pipe", "Get a quote"],
  },
};
