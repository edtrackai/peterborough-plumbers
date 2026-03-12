-- Peterborough Plumbers — DB Views
-- Run once: npx tsx prisma/run-views.ts
-- Or paste directly in Neon SQL Editor

-- ── v_booking_full ────────────────────────────────────────────────────────────
-- Bookings joined with slot, assigned plumber, and rating
DROP VIEW IF EXISTS v_booking_full;
CREATE VIEW v_booking_full AS
SELECT
  b.id,
  b."bookingRef",
  b.status,
  b.postcode,
  b."zonePrefix",
  b."serviceType",
  b.description,
  b."customerName",
  b.phone,
  b.email,
  b.address,
  b."accessNotes",
  b."reservedAt",
  b."confirmedAt",
  b."completedAt",
  b."estimatedArrival",
  b."expiresAt",
  b."createdAt",
  b."updatedAt",
  -- slot
  ts.date        AS "slotDate",
  ts."startTime" AS "slotStart",
  ts."endTime"   AS "slotEnd",
  -- assigned plumber
  p.id           AS "plumberId",
  p.name         AS "plumberName",
  p.email        AS "plumberEmail",
  p.phone        AS "plumberPhone",
  p."isOnDuty"   AS "plumberOnDuty",
  -- rating
  br.stars       AS "ratingStars",
  br.comment     AS "ratingComment",
  -- counts
  (SELECT COUNT(*) FROM pb_booking_offers o WHERE o."bookingId" = b.id)     AS "offerCount",
  (SELECT COUNT(*) FROM pb_booking_images i WHERE i."bookingId" = b.id)     AS "imageCount"
FROM pb_bookings b
LEFT JOIN pb_time_slots ts   ON ts.id = b."slotId"
LEFT JOIN pb_plumbers p      ON p.id  = b."assignedPlumberId"
LEFT JOIN pb_booking_ratings br ON br."bookingId" = b.id;

-- ── v_call_full ───────────────────────────────────────────────────────────────
-- Calls joined with summary and transcript/event counts
DROP VIEW IF EXISTS v_call_full;
CREATE VIEW v_call_full AS
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
  -- summary fields
  cs.summary        AS "callSummary",
  cs.urgency,
  cs."serviceType"  AS "summaryServiceType",
  cs."issueSummary",
  cs."preferredTime",
  cs."needsHuman",
  cs."endState",
  cs."transcriptText",
  -- counts
  (SELECT COUNT(*) FROM pb_call_transcripts ct WHERE ct."callId" = c.id) AS "transcriptTurns",
  (SELECT COUNT(*) FROM pb_call_events     ce WHERE ce."callId" = c.id)  AS "eventCount"
FROM pb_calls c
LEFT JOIN pb_call_summaries cs ON cs."callId" = c.id;

-- ── v_whatsapp_overview ───────────────────────────────────────────────────────
-- WaChat with message counts and last message preview
DROP VIEW IF EXISTS v_whatsapp_overview;
CREATE VIEW v_whatsapp_overview AS
SELECT
  wc.id,
  wc."waId",
  wc."customerName",
  wc."customerPhone",
  wc.postcode,
  wc."serviceType",
  wc."botActive",
  wc."isEmergency",
  wc."leadCaptured",
  wc."lastMessageAt",
  wc."createdAt",
  -- message counts
  (SELECT COUNT(*) FROM pb_wa_messages wm WHERE wm."chatId" = wc.id)                             AS "totalMessages",
  (SELECT COUNT(*) FROM pb_wa_messages wm WHERE wm."chatId" = wc.id AND wm.role = 'user')        AS "userMessages",
  (SELECT COUNT(*) FROM pb_wa_messages wm WHERE wm."chatId" = wc.id AND wm.role = 'assistant')   AS "botMessages",
  -- last message
  (SELECT wm.content FROM pb_wa_messages wm WHERE wm."chatId" = wc.id ORDER BY wm."createdAt" DESC LIMIT 1) AS "lastMessage",
  (SELECT wm.role    FROM pb_wa_messages wm WHERE wm."chatId" = wc.id ORDER BY wm."createdAt" DESC LIMIT 1) AS "lastMessageRole"
FROM pb_wa_chats wc;

-- ── v_plumber_stats ───────────────────────────────────────────────────────────
-- Per-plumber booking stats
DROP VIEW IF EXISTS v_plumber_stats;
CREATE VIEW v_plumber_stats AS
SELECT
  p.id,
  p.name,
  p.email,
  p.phone,
  p."isActive",
  p."isOnDuty",
  p."lastSeenAt",
  p."createdAt",
  -- booking counts by status
  COUNT(b.id)                                                                    AS "totalBookings",
  COUNT(b.id) FILTER (WHERE b.status = 'completed')                             AS "completedBookings",
  COUNT(b.id) FILTER (WHERE b.status IN ('accepted','en_route','arrived','in_progress')) AS "activeBookings",
  COUNT(b.id) FILTER (WHERE b.status = 'cancelled')                             AS "cancelledBookings",
  -- ratings
  ROUND(AVG(br.stars)::numeric, 1)                                              AS "avgRating",
  COUNT(br.id)                                                                   AS "totalRatings",
  -- offers
  COUNT(bo.id) FILTER (WHERE bo.status = 'offered')                             AS "pendingOffers",
  COUNT(bo.id) FILTER (WHERE bo.status = 'rejected')                            AS "rejectedOffers"
FROM pb_plumbers p
LEFT JOIN pb_bookings b        ON b."assignedPlumberId" = p.id
LEFT JOIN pb_booking_ratings br ON br."bookingId" = b.id
LEFT JOIN pb_booking_offers bo  ON bo."plumberId" = p.id
GROUP BY p.id, p.name, p.email, p.phone, p."isActive", p."isOnDuty", p."lastSeenAt", p."createdAt";

-- ── v_lead_pipeline ───────────────────────────────────────────────────────────
-- Leads with source breakdown for pipeline view
DROP VIEW IF EXISTS v_lead_pipeline;
CREATE VIEW v_lead_pipeline AS
SELECT
  id,
  name,
  phone,
  email,
  postcode,
  "serviceType",
  status,
  source,
  "createdAt",
  "updatedAt",
  -- age in hours
  EXTRACT(EPOCH FROM (NOW() - "createdAt")) / 3600 AS "ageHours"
FROM pb_leads;
