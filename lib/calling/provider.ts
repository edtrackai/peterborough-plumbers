/**
 * lib/calling/provider.ts
 *
 * Future calling provider adapter layer.
 *
 * This is a placeholder interface that defines the contract any future
 * voice calling provider must implement. When Meta Calling API is enabled
 * or OpenAI Realtime is integrated, a concrete adapter is added here
 * without touching the rest of the calling architecture.
 *
 * ─── Current status ───────────────────────────────────────────────────────────
 * Meta Calling API: NOT YET ACTIVE — pending WhatsApp number verification.
 * OpenAI Realtime:  NOT YET ACTIVE — architecture placeholder only.
 *
 * ─── How to plug in a provider ────────────────────────────────────────────────
 * 1. Create a file: lib/calling/providers/meta.ts
 * 2. Implement the CallingProvider interface below.
 * 3. Export it and set CALLING_PROVIDER=meta in env.
 * 4. Nothing else in the calling layer needs to change.
 *
 * ─── OpenAI Realtime integration path ────────────────────────────────────────
 * - Create a WebSocket session via OpenAI Realtime API.
 * - Stream audio in/out.
 * - On each transcript delta: POST /api/calls/transcript.
 * - On session end: POST /api/calls/summary with extracted structured data.
 * - The calling service layer (session.ts, transcript.ts, summary.ts)
 *   handles all DB writes. The provider only handles audio transport.
 *
 * ─── Meta Calling API integration path ───────────────────────────────────────
 * - Meta sends inbound call webhook → POST /api/calls/start.
 * - Meta streams call audio → provider adapter handles transport.
 * - Provider pushes transcript turns → POST /api/calls/transcript.
 * - Call ends → POST /api/calls/summary.
 * - Lead sync → existing Lead model via saveCallSummary().
 */

export interface CallingProvider {
  /**
   * Accept an inbound call and return a session token or connection URL.
   */
  acceptCall(callId: string, waId?: string): Promise<{ sessionToken: string }>;

  /**
   * Reject or deflect a call (e.g. out of hours).
   */
  rejectCall(callId: string, reason?: string): Promise<void>;

  /**
   * Send a text-to-speech message to the caller mid-call.
   * Used before OpenAI Realtime takes over, or for simple announcements.
   */
  speak(callId: string, text: string): Promise<void>;

  /**
   * End the call from the server side.
   */
  endCall(callId: string): Promise<void>;
}

/**
 * Placeholder — replace with real adapter once provider is selected.
 *
 * Usage example (future):
 *   import { callingProvider } from "@/lib/calling/provider";
 *   await callingProvider.acceptCall(call.id, waId);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callingProvider: CallingProvider = {
  async acceptCall(callId) {
    // TODO: implement Meta Calling API or Vapi/Retell adapter
    console.warn(`[CallingProvider] acceptCall not implemented (callId: ${callId})`);
    return { sessionToken: "not-implemented" };
  },
  async rejectCall(callId) {
    console.warn(`[CallingProvider] rejectCall not implemented (callId: ${callId})`);
  },
  async speak(callId, text) {
    console.warn(`[CallingProvider] speak not implemented (callId: ${callId}, text: ${text})`);
  },
  async endCall(callId) {
    console.warn(`[CallingProvider] endCall not implemented (callId: ${callId})`);
  },
};
