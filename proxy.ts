import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "pp_admin_session";

/** Constant-time XOR comparison — safe in Edge runtime (no timingSafeEqual). */
function safeCompare(a: string, b: string): boolean {
  let diff = a.length === b.length ? 0 : 1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** SHA-256 via Web Crypto — available in Edge runtime. */
async function sha256hex(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function computeAdminToken(user: string, pass: string): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? "default-session-secret";
  return sha256hex(`pp-admin:${user}:${pass}:${secret}`);
}

export const config = {
  matcher: ["/admin/:path*", "/plumber/:path*"],
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin routes: HTTP Basic Auth + session cookie ─────────────────────────
  if (pathname.startsWith("/admin")) {
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      return new NextResponse("Admin access is not configured.", {
        status: 503,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const expectedToken = await computeAdminToken(adminUser, adminPass);

    // Valid session cookie → allow without re-prompting Basic Auth
    const sessionCookie = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
    if (sessionCookie && safeCompare(sessionCookie, expectedToken)) {
      return NextResponse.next();
    }

    // No cookie → require Basic Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Basic ")) {
      return new NextResponse("Unauthorised", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Peterborough Plumbers Admin", charset="UTF-8"',
        },
      });
    }

    let authenticated = false;
    try {
      const decoded = atob(authHeader.slice(6));
      const colonIdx = decoded.indexOf(":");
      if (colonIdx > 0) {
        const providedUser = decoded.slice(0, colonIdx);
        const providedPass = decoded.slice(colonIdx + 1);
        authenticated =
          safeCompare(providedUser, adminUser) &&
          safeCompare(providedPass, adminPass);
      }
    } catch {
      return new NextResponse("Unauthorised", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Peterborough Plumbers Admin"' },
      });
    }

    if (!authenticated) {
      return new NextResponse("Unauthorised", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Peterborough Plumbers Admin", charset="UTF-8"',
        },
      });
    }

    // Successful auth — set session cookie so subsequent requests skip Basic Auth prompt
    const res = NextResponse.next();
    res.cookies.set(ADMIN_COOKIE, expectedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return res;
  }

  // ── Plumber routes: session cookie gate (except login page) ───────────────
  if (pathname.startsWith("/plumber") && !pathname.startsWith("/plumber/login")) {
    const sessionCookie = req.cookies.get("pp_plumber");
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/plumber/login", req.url));
    }
  }

  return NextResponse.next();
}
