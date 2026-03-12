SELECT
  c.id,
  c.direction,
  c.status,
  c.source,
  c.outcome,
  c."waId",
  c.phone,
  c."leadId",
  c."durationSeconds",
  c."startedAt",
  c."endedAt",
  c."createdAt",
  cs.summary AS "callSummary",
  cs.urgency,
  cs."serviceType" AS "summaryServiceType",
  cs."issueSummary",
  cs."preferredTime",
  cs."needsHuman",
  cs."endState",
  cs."transcriptText",
  (
    SELECT
      count(*) AS count
    FROM
      pb_call_transcripts ct
    WHERE
      (ct."callId" = c.id)
  ) AS "transcriptTurns",
  (
    SELECT
      count(*) AS count
    FROM
      pb_call_events ce
    WHERE
      (ce."callId" = c.id)
  ) AS "eventCount"
FROM
  (
    pb_calls c
    LEFT JOIN pb_call_summaries cs ON ((cs."callId" = c.id))
  );