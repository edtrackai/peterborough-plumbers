/**
 * Loads config values from pb_config_settings.
 * Returns typed defaults if a key is missing (safe for first deploy before seeding).
 */
import { prisma } from "@/lib/prisma";

const DEFAULTS: Record<string, string> = {
  "quote.valid_hours":               "48",
  "quote.vat_rate":                  "0",
  "variation.office_approval_above": "50",
  "variation.auto_send_below":       "50",
  "quote.reminder_after_hours":      "24",
  "revisit.default_callout_fee":     "75",
  "booking.quote_expiry_action":     "cancel",
  "plumber.variation_photo_required":"true",
  "upload.max_files":                "5",
  "upload.max_size_mb":              "5",
};

let cache: Record<string, string> | null = null;
let cacheExpiry = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getConfig(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cache && now < cacheExpiry) return cache;

  try {
    const rows = await prisma.configSetting.findMany();
    const map: Record<string, string> = { ...DEFAULTS };
    for (const row of rows) map[row.key] = row.value;
    cache = map;
    cacheExpiry = now + CACHE_TTL_MS;
    return map;
  } catch {
    return { ...DEFAULTS };
  }
}

export async function getConfigValue(key: string): Promise<string> {
  const cfg = await getConfig();
  return cfg[key] ?? DEFAULTS[key] ?? "";
}

export async function getConfigNumber(key: string): Promise<number> {
  const val = await getConfigValue(key);
  return parseFloat(val) || 0;
}

export async function getConfigBool(key: string): Promise<boolean> {
  const val = await getConfigValue(key);
  return val === "true" || val === "1";
}

/** Call after admin updates a config value to bust the cache */
export function bustConfigCache(): void {
  cache = null;
  cacheExpiry = 0;
}
