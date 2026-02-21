/**
 * Neon Serverless Postgres client
 * ---------------------------------------------------------------------------
 * Used for all database queries across the app.
 * Connection is established via the DATABASE_URL environment variable.
 *
 * Setup:
 *   1. Create a database at neon.tech (or via Vercel → Storage → Add)
 *   2. Copy the connection string from your Neon dashboard
 *   3. Add it to .env.local as DATABASE_URL=...
 *   4. On Vercel: add the same variable in Project → Settings → Environment Variables
 *
 * Usage:
 *   import { sql } from '@/lib/db';
 *   const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
 */

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL environment variable is not set. " +
    "Add it to .env.local for local development, or to Vercel environment variables for production."
  );
}

export const sql = neon(process.env.DATABASE_URL);
