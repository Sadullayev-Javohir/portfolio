import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function getExpectedHash(): Promise<string> {
  const pin = (process.env.ADMIN_PIN || "6644").trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`admin_secure_salt_${pin}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  // During build phase, skip restriction checks
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Intercept any request to /admin or /blog/write
  const isRestricted =
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/blog/write" ||
    pathname.startsWith("/blog/write/");

  if (isRestricted) {
    const adminSession = request.cookies.get("admin_session")?.value;

    if (!adminSession) {
      // Fake 404: Pretend the page doesn't exist
      const notFoundUrl = new URL("/", request.url);
      return NextResponse.rewrite(notFoundUrl, {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      });
    }

    try {
      const expected = await getExpectedHash();
      if (adminSession !== expected) {
        const notFoundUrl = new URL("/", request.url);
        return NextResponse.rewrite(notFoundUrl, {
          status: 404,
          headers: { "X-Robots-Tag": "noindex, nofollow" },
        });
      }
    } catch {
      const notFoundUrl = new URL("/", request.url);
      return NextResponse.rewrite(notFoundUrl, {
        status: 404,
        headers: { "X-Robots-Tag": "noindex, nofollow" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blog/write/:path*"],
};
