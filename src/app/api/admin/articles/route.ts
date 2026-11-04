import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import {
  getCustomArticles,
  saveCustomArticle,
  deleteCustomArticle,
} from "@/lib/dynamicContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const articles = getCustomArticles();
    return NextResponse.json({ ok: true, articles });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Maqolalarni yuklashda xatolik." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ ok: false, error: "Ruxsat etilmagan" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { ok: false, error: "Maqola sarlavhasi (title) kiritilishi shart." },
        { status: 400 }
      );
    }

    const article = saveCustomArticle(body);
    return NextResponse.json({ ok: true, article });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Maqolani saqlashda xatolik." },
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

    const success = deleteCustomArticle(id);
    return NextResponse.json({ ok: success });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "O'chirishda xatolik." },
      { status: 500 }
    );
  }
}
