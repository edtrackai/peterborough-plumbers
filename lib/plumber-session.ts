import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

const DEFAULT_SECRET = "dev-only-secret-change-in-prod-must-be-32chars!!";

// iron-session requires password >= 32 chars. Fall back to DEFAULT_SECRET if
// SESSION_SECRET is missing, empty, or too short (< 32 chars).
const _raw = process.env.SESSION_SECRET;
const SESSION_PASSWORD = _raw && _raw.length >= 32 ? _raw : DEFAULT_SECRET;

if (process.env.NODE_ENV === "production" && SESSION_PASSWORD === DEFAULT_SECRET) {
  console.warn(
    "[security] SESSION_SECRET is not set or is too short (< 32 chars) — " +
    "using insecure default. Set a 32+ character SESSION_SECRET in Vercel env vars."
  );
}

export interface PlumberSessionData {
  plumberId: string;
  name: string;
  email: string;
}

export const sessionOptions = {
  password: SESSION_PASSWORD,
  cookieName: "pp_plumber",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export type PlumberSession = IronSession<PlumberSessionData>;

export async function getPlumberSession(): Promise<PlumberSession> {
  const cookieStore = await cookies();
  return getIronSession<PlumberSessionData>(cookieStore, sessionOptions);
}
