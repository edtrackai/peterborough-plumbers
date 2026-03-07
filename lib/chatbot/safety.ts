// ── Chatbot Safety Guardrails ─────────────────────────────────────────────────
// Any message matching boiler/gas keywords returns a safe refusal.
// NO troubleshooting steps are ever provided for these topics.

import { siteSettings } from "@/content/settings";

const GAS_SMELL_KEYWORDS = [
  "gas smell",
  "smell gas",
  "smells like gas",
  "gas leak",
  "gas escaping",
  "carbon monoxide",
  "co alarm",
  "carbon mono",
];

const RESTRICTED_KEYWORDS = [
  // Gas appliances
  "boiler",
  "gas boiler",
  "combi",
  "combi boiler",
  "worcester",
  "vaillant",
  "baxi",
  "viessmann",
  "ideal boiler",
  // Gas supply / components
  "gas",
  "natural gas",
  "gas pipe",
  "gas supply",
  "gas meter",
  "gas main",
  // Boiler components
  "pilot light",
  "pilot flame",
  "ignition",
  "spark ignition",
  "heat exchanger",
  "condensate",
  "condensate pipe",
  "flue",
  "flue pipe",
  "burner",
  "gas valve",
  "diverter valve",
  "pcb",
  "pressure relief",
  // Fault codes
  "fault code",
  "error code",
  "f1",
  "f22",
  "e119",
  "ea338",
  "e1",
  "e2",
  // Generic boiler issues
  "boiler pressure",
  "boiler not working",
  "no hot water",
  "no heating",
  "heating not working",
  "radiator not hot",
  "radiators cold",
  "boiler keeps",
  "boiler cutting out",
  "boiler making noise",
  "boiler banging",
  "boiler leak",
  "boiler dripping",
  "central heating not working",
];

export interface SafetyCheckResult {
  isRestricted: boolean;
  isGasSmell: boolean;
  reply: string;
}

export function detectRestrictedTopic(text: string): SafetyCheckResult {
  const lower = text.toLowerCase();

  // Gas smell — highest priority, specific emergency guidance
  const isGasSmell = GAS_SMELL_KEYWORDS.some((kw) => lower.includes(kw));
  if (isGasSmell) {
    return {
      isRestricted: true,
      isGasSmell: true,
      reply: [
        "🚨 **If you can smell gas, this is an emergency.**",
        "",
        "Please do the following **right now**:",
        "1. **Do not** turn any switches on or off.",
        "2. **Do not** use your phone inside the property.",
        "3. **Open windows and doors** to ventilate.",
        "4. **Leave the property immediately.**",
        "5. **Call the UK Gas Emergency line: 0800 111 999** (free, 24/7).",
        "",
        "Once you are safe and outside, you can also call us and we will arrange a qualified engineer for follow-up work once the property has been made safe by the emergency service.",
      ].join("\n"),
    };
  }

  // Boiler / gas topic — polite refusal
  const isRestricted = RESTRICTED_KEYWORDS.some((kw) => lower.includes(kw));
  if (isRestricted) {
    return {
      isRestricted: true,
      isGasSmell: false,
      reply: [
        "⚠️ I'm not able to provide boiler or gas troubleshooting advice — this is a safety requirement.",
        "",
        "Gas appliances must only be worked on by a **Gas Safe registered engineer**. Attempting repairs yourself can be dangerous and illegal.",
        "",
        "Our qualified engineers can diagnose and fix your boiler safely:",
        `• **Call us:** ${siteSettings.phone} (7 days a week)`,
        "• **Book online** using the button below",
        "• **Request a callback** and we'll ring you back",
        "",
        "In an emergency (gas smell), call **0800 111 999** immediately.",
      ].join("\n"),
    };
  }

  return { isRestricted: false, isGasSmell: false, reply: "" };
}
