import { neon } from "@neondatabase/serverless";

const url =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_9wXc6aMmACUk@ep-floral-queen-abxph2ii-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS bookings (
    id          SERIAL PRIMARY KEY,
    name        TEXT        NOT NULL,
    phone       TEXT        NOT NULL,
    email       TEXT        NOT NULL,
    postcode    TEXT        NOT NULL,
    service     TEXT        NOT NULL,
    date        DATE        NOT NULL,
    time_window TEXT        NOT NULL,
    details     TEXT        NOT NULL,
    status      TEXT        NOT NULL DEFAULT 'new',
    ip_address  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

console.log("✓ bookings table ready");
