import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

const DEFAULT_SECRET = "dev-only-secret-change-in-prod-must-be-32chars!!";

if (process.env.NODE_ENV === "production" && !process.env.SESSION_SECRET) {
  console.warn(
    "[security] SESSION_SECRET is not set — using insecure default. " +
    "Set SESSION_SECRET in your environment variables immediately."
  );
}

export interface PlumberSessionData {
  plumberId: string;
  name: string;
  email: string;
}

export const sessionOptions = {
  // Must be at least 32 chars. Set SESSION_SECRET in .env.local for production.
  password: process.env.SESSION_SECRET ?? DEFAULT_SECRET,
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
