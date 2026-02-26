// ── Chatbot Category Classifier ───────────────────────────────────────────────
// Lightweight keyword-based classifier for safe plumbing categories.

import type { PlumbingCategory } from "./kb";

interface ClassifierRule {
  category: PlumbingCategory;
  keywords: string[];
}

const rules: ClassifierRule[] = [
  {
    category: "burst_pipe",
    keywords: [
      "burst",
      "burst pipe",
      "pipe burst",
      "flooding",
      "flood",
      "water everywhere",
      "water pouring",
      "stopcock",
      "isolation valve",
      "turn water off",
      "emergency",
    ],
  },
  {
    category: "leak_tap",
    keywords: [
      "dripping",
      "drip",
      "leaking tap",
      "tap leak",
      "tap dripping",
      "faucet",
      "washer",
      "tap keeps dripping",
      "tap won't stop",
      "leaky tap",
      "mixer tap",
    ],
  },
  {
    category: "blocked_drain",
    keywords: [
      "blocked drain",
      "blocked sink",
      "blocked shower",
      "blocked bath",
      "clogged",
      "slow drain",
      "drain blocked",
      "not draining",
      "won't drain",
      "gurgling",
      "drain smell",
      "smelly drain",
      "drain backing",
      "overflow",
    ],
  },
  {
    category: "toilet_running",
    keywords: [
      "running toilet",
      "toilet running",
      "toilet won't stop",
      "cistern",
      "toilet flush",
      "flush not working",
      "toilet not flushing",
      "loo",
      "toilet keeps",
      "toilet handle",
      "toilet overflow",
      "toilet water",
      "flapper",
    ],
  },
  {
    category: "low_pressure",
    keywords: [
      "low pressure",
      "low water pressure",
      "weak flow",
      "poor pressure",
      "no pressure",
      "shower pressure",
      "tap pressure",
      "trickle",
      "slow water",
      "pressure drop",
    ],
  },
  {
    category: "quote_booking",
    keywords: [
      "quote",
      "price",
      "cost",
      "how much",
      "rates",
      "charge",
      "book",
      "appointment",
      "visit",
      "callback",
      "call me",
      "contact",
      "schedule",
      "available",
      "availability",
      "engineer",
      "plumber",
      "send someone",
    ],
  },
];

export function classifyMessage(text: string): PlumbingCategory {
  const lower = text.toLowerCase();

  // Score each category by number of keyword matches
  const scores = rules.map((rule) => ({
    category: rule.category,
    score: rule.keywords.filter((kw) => lower.includes(kw)).length,
  }));

  const best = scores.reduce((a, b) => (b.score > a.score ? b : a));

  return best.score > 0 ? best.category : "general";
}
