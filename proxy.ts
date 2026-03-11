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
  matcher: ["/admin/:path*", "/plumber/:path*", "/admin-login"],
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin-login page: always allow ────────────────────────────────────────
  if (pathname === "/admin-login") return NextResponse.next();

  // ── Admin API login/logout: always allow ───────────────────────────────────
  if (pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout")) {
    return NextResponse.next();
  }

  // ── Admin routes: session cookie gate → redirect to login page ────────────
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
    const sessionCookie = req.cookies.get(ADMIN_COOKIE)?.value ?? "";

    if (sessionCookie && safeCompare(sessionCookie, expectedToken)) {
      return NextResponse.next();
    }

    // Not authenticated → redirect to login page
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  // ── Plumber routes: session cookie gate (except login/signup pages) ────────
  const isPublicPlumberPage = pathname === "/plumber/login" || pathname === "/plumber/signup";
  if (pathname.startsWith("/plumber") && !isPublicPlumberPage) {
    const sessionCookie = req.cookies.get("pp_plumber");
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/plumber/login", req.url));
    }
  }

  return NextResponse.next();
}
