import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ ok: false, error: "Ruxsat etilmagan (Unauthorized)" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "Rasm fayli tanlanmagan." },
        { status: 400 }
      );
    }

    // Fayl hajmi va formati tekshiruvi (max 15MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { ok: false, error: "Rasm hajmi juda katta (maksimal 15MB)." },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
      return NextResponse.json(
        { ok: false, error: "Faqat rasm fayllari (JPG, PNG, WebP, GIF, SVG) ruxsat etiladi." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Toza nom hosil qilish
    const originalExt = path.extname(file.name) || ".png";
    const baseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);
    const uniqueName = `${baseName || "image"}-${Date.now()}${originalExt.toLowerCase()}`;
    const destinationPath = path.join(uploadsDir, uniqueName);

    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      fileName: uniqueName,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Fayl yuklashda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
