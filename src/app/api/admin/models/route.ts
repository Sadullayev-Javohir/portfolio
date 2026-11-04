import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAiConfig, saveAiConfig } from "@/lib/aiConfig";
import { fetchNousModels, testModelPing } from "@/lib/nousClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifyAdmin(req: NextRequest): boolean {
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

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Ruxsat etilmagan (PIN talab qilinadi)" }, { status: 401 });
  }

  try {
    const config = getAiConfig();
    const models = await fetchNousModels();

    return NextResponse.json({
      ok: true,
      config,
      models,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Modellarni yuklashda xatolik." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Ruxsat etilmagan" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "test_ping") {
      const { modelId } = body;
      if (!modelId) {
        return NextResponse.json({ error: "modelId talab qilinadi" }, { status: 400 });
      }
      const pingResult = await testModelPing(modelId);
      return NextResponse.json(pingResult);
    }

    if (action === "save_config") {
      const { primaryModel, fallbackModels, temperature, maxTokens, timeoutSeconds } = body;

      const updated = saveAiConfig({
        ...(primaryModel ? { primaryModel } : {}),
        ...(Array.isArray(fallbackModels) ? { fallbackModels } : {}),
        ...(typeof temperature === "number" ? { temperature } : {}),
        ...(typeof maxTokens === "number" ? { maxTokens } : {}),
        ...(typeof timeoutSeconds === "number" ? { timeoutSeconds } : {}),
      });

      return NextResponse.json({ ok: true, config: updated });
    }

    return NextResponse.json({ error: "Noma'lum harakat (action)" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Server xatosi" },
      { status: 500 }
    );
  }
}
