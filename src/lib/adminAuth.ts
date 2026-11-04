import { NextRequest } from "next/server";
import crypto from "crypto";

export function verifyAdmin(req: NextRequest): boolean {
  const correctPin = (process.env.ADMIN_PIN || "6644").trim();
  const authHeader = req.headers.get("x-admin-pin") || "";
  if (authHeader.trim() === correctPin) return true;

  const cookieToken = req.cookies.get("admin_session")?.value;
  if (cookieToken) {
    const validToken = crypto
      .createHash("sha256")
      .update(`admin_secure_salt_${correctPin}`)
      .digest("hex");
    return cookieToken === validToken;
  }

  return false;
}
