/**
 * lib/calling/realtime.ts
 *
 * OpenAI Realtime API — session configuration, tool definitions,
 * spoken-response rules, and safety behaviour for the Peterborough
 * Plumbers voice calling agent.
 *
 * STATUS: Architecture-ready placeholder.
 * Activate when Meta Calling API number verification completes.
 *
 * HOW THIS PLUGS IN (future):
 *   1. Meta Calling API sends inbound call webhook
 *   2. /api/calls/start creates a Call record → returns callId
 *   3. Audio stream opens between Meta and OpenAI Realtime via WebSocket
 *   4. buildRealtimeSessionConfig() is sent as the session.update event
 *   5. Transcript deltas POST to /api/calls/transcript per turn
 *   6. On session end → POST /api/calls/process with full transcript
 */

// ── System instructions ────────────────────────────────────────────────────────
// Stored in docs/ai-prompts/realtime-voice-agent-instructions.md (full version).
// This is the trimmed runtime version passed to the API.

const SYSTEM_INSTRUCTIONS = `You are the live voice agent for Peterborough Plumbers.

Speak in natural British English. Sound calm, warm, and professional — not robotic.

Greet callers with: "Hello, you've reached Peterborough Plumbers. How can I help today?"

Rules:
- One question per turn only
- Short replies — 1 to 2 spoken sentences unless safety requires more
- Never invent prices, ETAs, or diagnose with certainty
- Never give unsafe gas or electrical advice
- Classify intent, then follow the correct route
- Use the create_lead tool when name, postcode, and issue are all collected
- Every call ends in one of: emergency_escalated, human_handoff, qualified_lead_captured, general_advice_given, follow_up_requested, no_action

Routes:
- EMERGENCY: burst pipe, flooding, active leak, ceiling leak, drain overflow, no heating with vulnerable occupants → triage in 2-4 questions, collect postcode, escalate
- GAS SMELL: immediate override → leave property, no switches, turn off gas, call 0800 111 999
- GENERAL QUESTION: answer briefly, hedge, suggest inspection, offer to take details
- SERVICE ENQUIRY: collect name → postcode → issue → urgency → preferred time → use create_lead tool
- HUMAN HANDOFF: angry/distressed caller, legal complaint, pricing dispute, explicit human request, exact ETA demand

Business: Peterborough Plumbers. Areas: PE1–PE4, PE6, PE7, PE9.
Services: emergency plumbing, boiler service/repair, CP12, central heating, bathrooms, landlord services, drain blockages, leak detection, plumbing repairs, surveys.
Pricing and booking confirmation always come from the team — never invent.`;

// ── Tool definitions ───────────────────────────────────────────────────────────

export interface RealtimeTool {
  type: "function";
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

export const REALTIME_TOOLS: RealtimeTool[] = [
  {
    type: "function",
    name: "create_lead",
    description:
      "Create or update a lead record when enough customer details have been collected during the call. Call this tool as soon as name, postcode, and issue summary are all known. Do not wait for all fields.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Customer full name",
        },
        phone: {
          type: "string",
          description:
            "Customer phone number — use the caller identifier if no different number is given",
        },
        postcode: {
          type: "string",
          description: "Property postcode e.g. PE1 2AB",
        },
        serviceType: {
          type: "string",
          description:
            "Service needed e.g. boiler repair, drain blockage, emergency plumbing",
        },
        issueSummary: {
          type: "string",
          description: "Short description of the problem",
        },
        urgency: {
          type: "string",
          description: "Urgency level: low, medium, or high",
        },
        preferredTime: {
          type: "string",
          description: "Preferred appointment time if given e.g. tomorrow morning",
        },
      },
      required: ["name", "postcode", "issueSummary"],
    },
  },
];

// ── Session configuration ──────────────────────────────────────────────────────

export type RealtimeVoice =
  | "alloy"
  | "ash"
  | "ballad"
  | "coral"
  | "echo"
  | "sage"
  | "shimmer"
  | "verse";

export interface RealtimeSessionConfig {
  modalities: string[];
  instructions: string;
  voice: RealtimeVoice;
  input_audio_format: string;
  output_audio_format: string;
  input_audio_transcription: {
    model: string;
  };
  turn_detection: {
    type: string;
    threshold: number;
    prefix_padding_ms: number;
    silence_duration_ms: number;
  };
  tools: RealtimeTool[];
  tool_choice: string;
  temperature: number;
  max_response_output_tokens: number;
}

/**
 * Builds the OpenAI Realtime session configuration.
 * Sent as the `session.update` event on the WebSocket connection.
 *
 * Voice: "alloy" — calm, neutral, works well for British English.
 * Silence threshold: 600ms — gives callers time to finish speaking.
 * Max tokens: 120 — enforces short spoken replies at API level.
 * Temperature: 0.6 — consistent responses without sounding robotic.
 */
export function buildRealtimeSessionConfig(): RealtimeSessionConfig {
  return {
    modalities: ["text", "audio"],
    instructions: SYSTEM_INSTRUCTIONS,
    voice: "alloy",
    input_audio_format: "pcm16",
    output_audio_format: "pcm16",
    input_audio_transcription: {
      model: "whisper-1",
    },
    turn_detection: {
      type: "server_vad",
      threshold: 0.5,
      prefix_padding_ms: 300,
      silence_duration_ms: 600,
    },
    tools: REALTIME_TOOLS,
    tool_choice: "auto",
    temperature: 0.6,
    max_response_output_tokens: 120,
  };
}

// ── Safety overrides ───────────────────────────────────────────────────────────

/**
 * Hard-coded safety responses for critical situations.
 * These are injected as system messages if the agent misses them,
 * or used as TTS fallback if the realtime model is unavailable.
 */
export const SAFETY_SCRIPTS = {
  gas_smell:
    "Please leave the property now. Do not use any switches or open flames. If it is safe to do so, turn off the gas at the meter. Call the National Gas Emergency line on 0800 111 999 before contacting us. Your safety comes first.",

  severe_flooding:
    "If you can safely reach your stopcock, turn off the water supply now. Move valuables away from the water if it is safe to do so. I am flagging this as urgent for the team right away.",

  no_heating_vulnerable:
    "I understand this is urgent. Can I take your postcode so I can flag this to the team immediately?",
} as const;

export type SafetyScriptKey = keyof typeof SAFETY_SCRIPTS;

/**
 * Returns the appropriate safety script for a given emergency type.
 */
export function getSafetyScript(emergencyType: SafetyScriptKey): string {
  return SAFETY_SCRIPTS[emergencyType];
}

// ── Spoken response rules (reference) ─────────────────────────────────────────

/**
 * These rules are enforced via system instructions and max_response_output_tokens.
 * Listed here for documentation and future automated testing.
 */
export const SPOKEN_RESPONSE_RULES = {
  maxSentencesPerTurn: 2,
  questionsPerTurn: 1,
  forbiddenPhrases: [
    "Certainly!",
    "Absolutely!",
    "Of course!",
    "I am an AI",
    "I cannot help with that",
    "As an AI language model",
  ],
  requiredHedges: [
    "it may be worth getting it checked",
    "an inspection would confirm",
    "the team will be able to advise",
    "pricing depends on the job",
  ],
  neverSay: [
    "your boiler is definitely broken",
    "that will cost",
    "we can be there by",
    "guaranteed same day",
  ],
} as const;
