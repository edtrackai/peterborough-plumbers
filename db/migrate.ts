/**
 * Migration runner — executes all .sql files in db/migrations/ in order.
 * Uses Pool (not neon tagged-template) because migrations are raw SQL strings.
 *
 * Usage: npx tsx db/migrate.ts
 * Requires DATABASE_URL in .env.local or environment.
 */

import * as fs from "fs";
import * as path from "path";
import { Pool } from "@neondatabase/serverless";

// Load .env.local for local development
const dotenvPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(dotenvPath)) {
  const lines = fs.readFileSync(dotenvPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = val;
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL is not set. Add it to .env.local");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const migrationsDir = path.join(process.cwd(), "db", "migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No migration files found in db/migrations/");
    await pool.end();
    return;
  }

  console.log(`Running ${files.length} migration(s)...\n`);

  for (const file of files) {
    const migration = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`▶ ${file}`);
    try {
      await pool.query(migration);
      console.log(`  ✓ Done\n`);
    } catch (err) {
      console.error(`  ✗ Failed: ${err instanceof Error ? err.message : err}\n`);
      await pool.end();
      process.exit(1);
    }
  }

  await pool.end();
  console.log("All migrations complete.");
}

main();
