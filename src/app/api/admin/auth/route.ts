import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory brute-force protection
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

function getSessionToken(pin: string): string {
  return crypto
    .createHash("sha256")
    .update(`admin_secure_salt_${pin.trim()}`)
    .digest("hex");
}

export async function GET(req: NextRequest) {
  const correctPin = (process.env.ADMIN_PIN || "6644").trim();
  const validToken = getSessionToken(correctPin);
  const cookieToken = req.cookies.get("admin_session")?.value;

  if (cookieToken && cookieToken === validToken) {
    return NextResponse.json({ ok: true, authenticated: true });
  }

  return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();

    // Check rate limit
    const attempt = failedAttempts.get(ip);
    if (attempt && attempt.lockedUntil > now) {
      const waitMin = Math.ceil((attempt.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          ok: false,
          error: `Juda ko'p xato urinishlar. Iltimos, ${waitMin} daqiqadan so'ng qayta urinib ko'ring.`,
        },
        { status: 429 }
      );
    }

    const { pin } = await req.json();
    const correctPin = (process.env.ADMIN_PIN || "6644").trim();

    if (pin && String(pin).trim() === correctPin) {
      // Clear failed attempts on success
      failedAttempts.delete(ip);

      const token = getSessionToken(correctPin);
      const res = NextResponse.json({ ok: true, token });

      // Set secure HTTP cookie
      res.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return res;
    }

    // Handle failed attempt
    const currentCount = (attempt?.count || 0) + 1;
    if (currentCount >= 5) {
      failedAttempts.set(ip, {
        count: currentCount,
        lockedUntil: now + 15 * 60 * 1000, // 15 minutes lockout
      });
      return NextResponse.json(
        {
          ok: false,
          error: "Ketma-ket 5 marta xato PIN kiritildi. Tizim 15 daqiqaga bloklandi.",
        },
        { status: 429 }
      );
    } else {
      failedAttempts.set(ip, {
        count: currentCount,
        lockedUntil: 0,
      });
      return NextResponse.json(
        {
          ok: false,
          error: `PIN-kod noto'g'ri. (Qolgan urinishlar: ${5 - currentCount})`,
        },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Noto'g'ri so'rov formati." },
      { status: 400 }
    );
  }
}
