import { NextRequest, NextResponse } from "next/server";
import {
  getArticleComments,
  getArticleCommentsCount,
  addComment,
  editComment,
  deleteComment,
} from "@/lib/blogComments";
import { verifyAdmin } from "@/lib/adminAuth";

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

    const comments = getArticleComments(slug, token);
    const totalCount = getArticleCommentsCount(slug);

    return NextResponse.json({ ok: true, comments, totalCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Izohlarni yuklashda xatolik." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { authorName, authorToken, body: commentBody, imageUrl, parentId } = body;

    if (!commentBody || !commentBody.trim()) {
      return NextResponse.json(
        { ok: false, error: "Izoh matni bo'sh bo'lishi mumkin emas." },
        { status: 400 }
      );
    }

    if (!authorToken) {
      return NextResponse.json(
        { ok: false, error: "Foydalanuvchi identifikatori (token) topilmadi." },
        { status: 400 }
      );
    }

    const newComment = addComment({
      articleSlug: slug,
      authorName: authorName || "Foydalanuvchi",
      authorToken,
      body: commentBody,
      imageUrl,
      parentId: parentId || null,
    });

    const totalCount = getArticleCommentsCount(slug);
    return NextResponse.json({ ok: true, comment: newComment, totalCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Izoh qoldirishda xatolik." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteProps) {
  try {
    const body = await req.json();
    const { commentId, authorToken, body: newBody, imageUrl: newImageUrl } = body;

    if (!commentId || !authorToken || !newBody?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Tahrirlash uchun ma'lumotlar to'liq emas." },
        { status: 400 }
      );
    }

    const result = editComment({
      commentId,
      authorToken,
      newBody,
      newImageUrl,
    });

    if (!result.success) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 403 });
    }

    return NextResponse.json({ ok: true, comment: result.comment });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Izohni tahrirlashda xatolik." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("id");
    const authorToken = searchParams.get("token") || undefined;
    const isAdmin = verifyAdmin(req);

    if (!commentId) {
      return NextResponse.json({ ok: false, error: "Izoh ID talab qilinadi." }, { status: 400 });
    }

    const result = deleteComment({
      commentId,
      authorToken,
      isAdmin,
    });

    if (!result.success) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 403 });
    }

    const totalCount = getArticleCommentsCount(slug);
    return NextResponse.json({ ok: true, totalCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Izohni o'chirishda xatolik." },
      { status: 500 }
    );
  }
}
