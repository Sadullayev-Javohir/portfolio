"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PenTool,
  ExternalLink,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Plus,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  Eye,
  Code,
} from "lucide-react";

export interface CustomArticleData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  markdownContent: string;
  createdAt: string;
}

interface AdminArticlesManagerProps {
  adminPin: string;
}

const CATEGORY_OPTIONS = [
  ".NET",
  "C#",
  "Backend Engineering",
  "Software Architecture",
  "PostgreSQL",
  "Redis & Caching",
  "AI Engineering",
  "Developer Tools",
  "Personal Projects",
];

const DEFAULT_TEMPLATE = `# Kirish
Ushbu maqolada real production tizimlarda uchraydigan arxitekturaviy masalalar va ularning yechimlari haqida so'z yuritamiz.

## 01. Arxitektura va Asosiy Qarorlar
Backend tizimini loyihalashda yuqori yuklanish (high throughput) va minimal kechikish (sub-30ms latency) asosiy talab bo'ldi.

\`\`\`csharp
public async Task<bool> ProcessEventAsync(EventPayload payload) {
    var isValid = await _validator.ValidateCadenceAsync(payload);
    if (!isValid) return false;
    return await _publisher.BroadcastAsync(payload);
}
\`\`\`

## 02. Natijalar va Xulosalar
- **Kechikish**: 25ms dan kam
- **Ishonchlilik**: 99.9% uptime
`;

export function AdminArticlesManager({ adminPin }: AdminArticlesManagerProps) {
  const [articles, setArticles] = useState<CustomArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState(".NET");
  const [tagsText, setTagsText] = useState("#dotnet, #csharp, #backend");
  const [markdownContent, setMarkdownContent] = useState(DEFAULT_TEMPLATE);

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (res.ok && data.ok) {
        setArticles(data.articles || []);
      }
    } catch {
      console.error("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleResetForm = () => {
    setTitle("");
    setSlug("");
    setSubtitle("");
    setCategory(".NET");
    setTagsText("#dotnet, #csharp, #backend");
    setMarkdownContent(DEFAULT_TEMPLATE);
    setEditingId(null);
    setIsFormOpen(false);
    setActiveTab("write");
  };

  const handleEdit = (art: CustomArticleData) => {
    setEditingId(art.id);
    setTitle(art.title);
    setSlug(art.slug);
    setSubtitle(art.subtitle);
    setCategory(art.category);
    setTagsText(art.tags.join(", "));
    setMarkdownContent(art.markdownContent);
    setIsFormOpen(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDelete = async (id: string, articleTitle: string) => {
    if (!confirm(`Haqiqatan ham "${articleTitle}" maqolasini o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/articles?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": adminPin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMessage({
          type: "success",
          text: "Maqola muvaffaqiyatli o'chirildi.",
        });
        loadArticles();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        alert(data.error || "O'chirishda xatolik");
      }
    } catch {
      alert("Tarmoq xatosi");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Maqola sarlavhasini kiriting!" });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      id: editingId || undefined,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle: subtitle.trim(),
      category,
      tags: tags.length > 0 ? tags : [".NET", "Backend"],
      markdownContent,
    };

    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": adminPin,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMessage({
          type: "success",
          text: editingId
            ? "Maqola muvaffaqiyatli yangilandi!"
            : "Yangi maqola chop etildi va /blog bo'limiga joylandi! ✓",
        });
        loadArticles();
        handleResetForm();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Maqolani saqlashda xatolik yuz berdi.",
        });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Server bilan aloqa uzildi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
            <h2 className="font-display font-bold text-xl text-ink">
              Maqolalar Boshqaruvi (Articles Studio)
            </h2>
          </div>
          <p className="text-muted text-xs font-mono">
            Faqat admin uchun: Yangi maqola yozing va chop eting. Maqolalaringiz /blog va /blog/[slug] sahifalarida avtomatik joylanadi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadArticles}
            className="p-2.5 rounded-xl border border-ink bg-cream hover:bg-white text-ink transition-colors cursor-pointer"
            title="Yangilash"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (isFormOpen && !editingId) {
                setIsFormOpen(false);
              } else {
                handleResetForm();
                setIsFormOpen(true);
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isFormOpen && !editingId ? "Yopish" : "+ Yangi Maqola Yozish"}</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border-2 border-ink shadow-solid-sm flex items-center gap-3 text-sm font-mono ${
            statusMessage.type === "success"
              ? "bg-mint/30 text-ink"
              : "bg-peach text-ink"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-ink shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-coral shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Article Editor Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
            <div className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-ink" />
              <h3 className="font-display font-bold text-lg text-ink">
                {editingId ? "Maqolani Tahrirlash" : "Yangi Maqola Yozish"}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs font-mono text-muted hover:text-ink cursor-pointer"
            >
              Bekor qilish
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Maqola Sarlavhasi (Title) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Masalan: ASP.NET Core va Redis bilan Kesh Strategiyasi"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                URL Manzili (Slug) *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 rounded-l-xl border-2 border-r-0 border-ink bg-cream font-mono text-xs text-muted">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="aspnet-core-redis-kesh"
                  className="w-full px-3 py-2.5 rounded-r-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
                  required
                />
              </div>
              <p className="text-[11px] font-mono text-muted mt-1">
                Maqola: <span className="font-bold text-ink">/blog/{slug || "maqola-nomi"}</span> manzilida ochiladi.
              </p>
            </div>

            {/* Subtitle */}
            <div className="md:col-span-2">
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Qisqacha Tavsif / Tagline (Subtitle)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Azure Speech sintez xarajatlarini 35% ga qisqartirish va takroriy so'rovlarni 120ms da qaytarish uslubi..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Teglar (Vergul bilan ajrating)
              </label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="#dotnet, #csharp, #redis, #performance"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Editor / Preview Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                Maqola Matni (Markdown Formati) *
              </label>
              <div className="flex items-center gap-1 bg-cream border border-ink/20 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "write"
                      ? "bg-white border border-ink font-bold text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Yozish (Editor)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-white border border-ink font-bold text-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ko&apos;rish (Preview)</span>
                </button>
              </div>
            </div>

            {activeTab === "write" ? (
              <textarea
                rows={14}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder="Maqola matnini Markdown formatida yozing..."
                className="w-full p-4 rounded-2xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white leading-relaxed resize-y"
                required
              />
            ) : (
              <div className="w-full p-6 rounded-2xl border-2 border-ink bg-white min-h-[300px] max-h-[500px] overflow-y-auto prose prose-stone max-w-none">
                <div className="font-display font-bold text-2xl text-ink mb-2">
                  {title || "Maqola Sarlavhasi"}
                </div>
                {subtitle && (
                  <div className="text-muted text-sm font-sans mb-4 italic">
                    {subtitle}
                  </div>
                )}
                <div className="whitespace-pre-wrap font-sans text-sm text-ink leading-relaxed">
                  {markdownContent}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl border border-ink bg-white text-xs font-mono text-ink hover:bg-cream transition-colors cursor-pointer"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-6 py-2.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Chop etilmoqda...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? "O'zgarishlarni Saqlash" : "Maqolani Chop Etish (Publish)"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Articles List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            Chop Etilgan Maqolalar ({articles.length})
          </h3>
          <Link
            href="/blog"
            target="_blank"
            className="text-xs font-mono font-bold text-ink hover:underline flex items-center gap-1"
          >
            <span>/blog sahifasini ko&apos;rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid-sm text-center flex flex-col items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-muted/50" />
            <p className="text-sm font-sans text-muted">
              Hozircha admin panel orqali qo&apos;shilgan yangi maqolalar yo&apos;q.
            </p>
            <button
              type="button"
              onClick={() => {
                handleResetForm();
                setIsFormOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-yellow border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              + Birinchi Maqolani Yozish
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-5 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-ink bg-cream">
                      {art.category}
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      {art.publishedDate} · {art.readTime}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-ink">
                    {art.title}
                  </h4>
                  {art.subtitle && (
                    <p className="font-sans text-xs text-muted line-clamp-1">
                      {art.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/blog/${art.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-ink bg-cream text-xs font-mono font-bold text-ink hover:bg-yellow transition-colors"
                  >
                    <span>O&apos;qish ↗</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleEdit(art)}
                    className="p-2 rounded-xl border border-ink/30 hover:border-ink hover:bg-cream text-ink transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-2 rounded-xl border border-coral/30 hover:border-coral hover:bg-peach text-coral transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
