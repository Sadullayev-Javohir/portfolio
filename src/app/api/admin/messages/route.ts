import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import {
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage,
} from "@/lib/contactService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ ok: false, error: "Ruxsat etilmagan" }, { status: 401 });
  }

  try {
    const messages = getContactMessages();
    const unreadCount = messages.filter((m) => m.status === "unread").length;
    return NextResponse.json({ ok: true, messages, unreadCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Xabarlarni yuklashda xatolik." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ ok: false, error: "Ruxsat etilmagan" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ ok: false, error: "ID talab qilinadi" }, { status: 400 });
    }

    const success = markMessageAsRead(id);
    return NextResponse.json({ ok: success });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Xatoni belgilashda xatolik." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ ok: false, error: "Ruxsat etilmagan" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "ID talab qilinadi" }, { status: 400 });
    }

    const success = deleteContactMessage(id);
    return NextResponse.json({ ok: success });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "O'chirishda xatolik." },
      { status: 500 }
    );
  }
}
