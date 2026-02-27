import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/plumber/:path*"],
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin routes: HTTP Basic Auth ─────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme === "Basic" && encoded) {
        const decoded = atob(encoded);
        const colon = decoded.indexOf(":");
        const user = decoded.slice(0, colon);
        const pass = decoded.slice(colon + 1);
        const validUser = process.env.ADMIN_USER?.trim();
        const validPass = process.env.ADMIN_PASSWORD?.trim();
        if (validUser && validPass && user === validUser && pass === validPass) {
          return NextResponse.next();
        }
      }
    }
    return new NextResponse("Unauthorised", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
    });
  }

  // ── Plumber routes: session cookie gate (except login) ────────────────────
  if (pathname.startsWith("/plumber") && !pathname.startsWith("/plumber/login")) {
    const sessionCookie = req.cookies.get("pp_plumber");
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/plumber/login", req.url));
    }
  }

  return NextResponse.next();
}
