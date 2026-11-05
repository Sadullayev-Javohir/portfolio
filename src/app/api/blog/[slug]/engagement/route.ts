import { NextRequest, NextResponse } from "next/server";
import {
  getArticleEngagement,
  recordArticleView,
  toggleArticleLike,
  recordArticleReaction,
} from "@/lib/blogEngagement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || "";

    const data = getArticleEngagement(slug, token);
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Engagement ma'lumotlarini yuklashda xatolik." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { action, token, reactionKind } = body;

    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Qurilma tokeni (token) talab qilinadi." },
        { status: 400 }
      );
    }

    if (action === "view") {
      const views = recordArticleView(slug, token);
      return NextResponse.json({ ok: true, views });
    }

    if (action === "like") {
      const result = toggleArticleLike(slug, token);
      return NextResponse.json({ ok: true, ...result });
    }

    if (action === "reaction" && reactionKind) {
      const counts = recordArticleReaction(slug, reactionKind);
      return NextResponse.json({ ok: true, counts });
    }

    return NextResponse.json({ ok: false, error: "Noma'lum amal." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Engagement amalini bajarishda xatolik." },
      { status: 500 }
    );
  }
}
