import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/contactService";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Iltimos, ismingizni to'liq kiriting (kamida 2 ta belgi)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: "Iltimos, to'g'ri email manzilini kiriting." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, error: "Xabar matni juda qisqa (kamida 5 ta belgi kiriting)." },
        { status: 400 }
      );
    }

    if (message.trim().length > 2500) {
      return NextResponse.json(
        { ok: false, error: "Xabar matni 2500 belgidan oshmasligi kerak." },
        { status: 400 }
      );
    }

    // Client metadata
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const saved = await saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "").trim(),
      message: message.trim(),
      ip,
      userAgent,
    });

    return NextResponse.json({
      ok: true,
      message: "Xabaringiz muvaffaqiyatli yuborildi!",
      id: saved.id,
      telegramSent: saved.telegramSent,
    });
  } catch (err: any) {
    console.error("API /api/contact error:", err);
    return NextResponse.json(
      { ok: false, error: "Serverda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring." },
      { status: 500 }
    );
  }
}
