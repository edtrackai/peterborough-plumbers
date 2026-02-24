-- Migration 001: Initial schema for Peterborough Plumbers
-- Run via: npx tsx db/migrate.ts

-- ────────────────────────────────────────────────────────────────
-- Table: bookings
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name           VARCHAR(100) NOT NULL,
  email          VARCHAR(254) NOT NULL,
  phone          VARCHAR(20)  NOT NULL,
  service        VARCHAR(100) NOT NULL,
  preferred_date DATE,
  time_window    VARCHAR(50),
  details        TEXT,
  postcode       VARCHAR(10),
  ip_address     VARCHAR(45),
  status         VARCHAR(20)  NOT NULL DEFAULT 'new',
  source         VARCHAR(50)  DEFAULT 'website',
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- Table: leads  (contact form enquiries — separate from bookings)
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(254) NOT NULL,
  phone        VARCHAR(20),
  message      TEXT         NOT NULL,
  page_source  VARCHAR(300),
  ip_address   VARCHAR(45),
  status       VARCHAR(20)  NOT NULL DEFAULT 'new',
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- Table: reviews
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name  VARCHAR(100) NOT NULL,
  area           VARCHAR(100),
  service        VARCHAR(100),
  rating         SMALLINT     NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text    TEXT         NOT NULL,
  review_date    DATE         NOT NULL,
  platform       VARCHAR(50)  DEFAULT 'google',
  verified       BOOLEAN      DEFAULT FALSE,
  published      BOOLEAN      DEFAULT TRUE,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- Table: analytics_events
-- ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics_events (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name  VARCHAR(100) NOT NULL,
  page_path   VARCHAR(500),
  session_id  VARCHAR(100),
  metadata    JSONB,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ────────────────────────────────────────────────────────────────
-- Indexes
-- ────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_status    ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created   ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status       ON leads(status);
CREATE INDEX IF NOT EXISTS idx_reviews_published  ON reviews(published) WHERE published = TRUE;
CREATE INDEX IF NOT EXISTS idx_reviews_date       ON reviews(review_date DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event    ON analytics_events(event_name, created_at DESC);
