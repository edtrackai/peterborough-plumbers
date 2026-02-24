import { sql } from "@/lib/db";

export type AnalyticsEventName =
  | "call_click"
  | "whatsapp_click"
  | "booking_submit"
  | "contact_submit"
  | "emergency_cta_click"
  | "book_click";

export interface TrackEventInput {
  eventName: AnalyticsEventName;
  pagePath?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export async function trackDbEvent(data: TrackEventInput): Promise<void> {
  try {
    await sql`
      INSERT INTO analytics_events (event_name, page_path, session_id, metadata)
      VALUES (
        ${data.eventName},
        ${data.pagePath ?? null},
        ${data.sessionId ?? null},
        ${data.metadata ? JSON.stringify(data.metadata) : null}
      )
    `;
  } catch (err) {
    // Analytics should never break the user experience — log and swallow
    console.error("[Analytics] Failed to track event:", data.eventName, err instanceof Error ? err.message : err);
  }
}

export async function getEventCounts(since: Date): Promise<{ event_name: string; count: number }[]> {
  const rows = await sql`
    SELECT event_name, COUNT(*)::int AS count
    FROM analytics_events
    WHERE created_at >= ${since.toISOString()}
    GROUP BY event_name
    ORDER BY count DESC
  `;
  return rows as { event_name: string; count: number }[];
}
