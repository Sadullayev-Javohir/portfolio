"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Image as ImageIcon,
  UploadCloud,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Split,
  Maximize2,
  FileText,
  Sparkles,
  Link2,
  Minus,
  Table,
  Palette,
  Layers,
  Loader2,
} from "lucide-react";
import { MarkdownRenderer } from "@/components/article/MarkdownRenderer";

export interface CustomArticleData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categories?: string[];
  chip?: string;
  bulletColor?: string;
  coverImage?: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  markdownContent: string;
  createdAt: string;
}

interface AdminArticlesManagerProps {
  adminPin: string;
}

const DEFAULT_CATEGORIES = [
  ".NET",
  "C#",
  "Backend Engineering",
  "Software Architecture",
  "PostgreSQL",
  "Redis & Caching",
  "AI Engineering",
  "SignalR & Real-time",
  "Cloud & DevOps",
  "Developer Tools",
];

const COLOR_OPTIONS = [
  { label: "Sariq (Yellow)", value: "bg-yellow" },
  { label: "Yashil (Mint)", value: "bg-mint" },
  { label: "Ko'k (Blue)", value: "bg-blue" },
  { label: "Qizil (Coral)", value: "bg-coral" },
  { label: "Binafsha (Lilac)", value: "bg-lilac" },
  { label: "Qora (Ink)", value: "bg-ink" },
];

const SUGGESTED_TAGS = [
  "#dotnet",
  "#csharp",
  "#backend",
  "#architecture",
  "#redis",
  "#postgres",
  "#signalr",
  "#performance",
  "#ai",
  "#docker",
];

const INITIAL_ARTICLE_TEMPLATE = `# Kirish va Muammo Ta'rifi
Ushbu maqolada real production tizimlarda yuqori yuklanish (high concurrency) va minimal kechikish (sub-30ms) masalalarini qanday hal qilganimizni ko'rib chiqamiz.

## 01. Arxitektura va Asosiy Qarorlar
Backend tizimida so'rovlar oqimini to'g'ri taqsimlash va ma'lumotlar bazasiga ortiqcha yuk tushirmaslik uchun Redis Pub/Sub va xotira keshidan foydalandik.

Quyida asosiy handler logikasi:

\`\`\`csharp
public async Task<bool> ProcessMessageAsync(EventPayload payload)
{
    var isValid = await _validator.ValidateCadenceAsync(payload);
    if (!isValid) return false;

    return await _publisher.BroadcastAsync(payload);
}
\`\`\`

## 02. Vizual Natijalar va Diagrammalar
Quyidagi diagramma tizim komponentlari o'rtasidagi ma'lumot oqimini ko'rsatadi:

> [!NOTE]
> Azure Speech sintez so'rovlarida audio hashini keshga olish orqali xarajatlar 35% ga qisqartirildi va takroriy so'rovlar 120ms da qaytarildi.

## 03. Xulosalar va Tavsiyalar
- **Kechikish**: 25ms dan kam (sub-30ms)
- **Ishonchlilik**: 99.9% uptime
- **Xarajat**: 35% tejamkorlik
`;

export function AdminArticlesManager({ adminPin }: AdminArticlesManagerProps) {
  const [articles, setArticles] = useState<CustomArticleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // View mode: split (side-by-side), editor (full edit), preview (full preview)
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [chip, setChip] = useState("JOURNAL · ARTICLE");
  const [bulletColor, setBulletColor] = useState("bg-yellow");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([".NET"]);
  const [availableCategories, setAvailableCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [tagsText, setTagsText] = useState("#dotnet, #csharp, #backend");
  const [markdownContent, setMarkdownContent] = useState(INITIAL_ARTICLE_TEMPLATE);

  // Image Uploading State
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [recentUploadedImages, setRecentUploadedImages] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/articles");
      const data = await res.json();
      if (res.ok && data.ok) {
        const loaded: CustomArticleData[] = data.articles || [];
        setArticles(loaded);
        const cats = loaded.flatMap((a) => a.categories || [a.category]).filter(Boolean);
        setAvailableCategories((prev) => Array.from(new Set([...prev, ...cats])));
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
    setChip("JOURNAL · ARTICLE");
    setBulletColor("bg-yellow");
    setSelectedCategories([".NET"]);
    setCustomCategoryInput("");
    setTagsText("#dotnet, #csharp, #backend");
    setMarkdownContent(INITIAL_ARTICLE_TEMPLATE);
    setEditingId(null);
    setIsFormOpen(false);
    setViewMode("split");
  };

  const handleEdit = (art: CustomArticleData) => {
    setEditingId(art.id);
    setTitle(art.title);
    setSlug(art.slug);
    setSubtitle(art.subtitle);
    setChip(art.chip || "JOURNAL · ARTICLE");
    setBulletColor(art.bulletColor || "bg-yellow");
    const cats = art.categories && art.categories.length > 0 ? art.categories : [art.category || ".NET"];
    setSelectedCategories(cats);
    setAvailableCategories((prev) => Array.from(new Set([...prev, ...cats])));
    setTagsText((art.tags || []).join(", "));
    setMarkdownContent(art.markdownContent);
    setIsFormOpen(true);
    window.scrollTo({ top: 250, behavior: "smooth" });
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

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleAddCustomCategory = () => {
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;

    if (!availableCategories.includes(trimmed)) {
      setAvailableCategories((prev) => [...prev, trimmed]);
    }
    if (!selectedCategories.includes(trimmed)) {
      setSelectedCategories((prev) => [...prev, trimmed]);
    }
    setCustomCategoryInput("");
  };

  const handleAddTagClick = (tag: string) => {
    const currentTags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!currentTags.includes(tag)) {
      setTagsText([...currentTags, tag].join(", "));
    }
  };

  // ----------------- WORD STYLE FORMATTING ACTIONS -----------------
  const insertSyntax = (prefix: string, suffix: string = "", placeholder: string = "matn") => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdownContent.substring(start, end);
    const replacement = `${prefix}${selected || placeholder}${suffix}`;

    const newContent =
      markdownContent.substring(0, start) +
      replacement +
      markdownContent.substring(end);

    setMarkdownContent(newContent);

    setTimeout(() => {
      textarea.focus();
      if (selected) {
        textarea.setSelectionRange(start, start + replacement.length);
      } else {
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + placeholder.length
        );
      }
    }, 10);
  };

  const insertAtCursor = (textToInsert: string) => {
    if (!textareaRef.current) {
      setMarkdownContent((prev) => `${prev}\n\n${textToInsert}\n`);
      return;
    }
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newContent =
      markdownContent.substring(0, start) +
      textToInsert +
      markdownContent.substring(end);

    setMarkdownContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + textToInsert.length,
        start + textToInsert.length
      );
    }, 10);
  };

  // Keyboard Shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K, Tab)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    if (modifier && e.key.toLowerCase() === "b") {
      e.preventDefault();
      insertSyntax("**", "**", "qalin matn");
    } else if (modifier && e.key.toLowerCase() === "i") {
      e.preventDefault();
      insertSyntax("*", "*", "qiya matn");
    } else if (modifier && e.key.toLowerCase() === "u") {
      e.preventDefault();
      insertSyntax("<u>", "</u>", "tagiga chizilgan matn");
    } else if (modifier && e.key.toLowerCase() === "k") {
      e.preventDefault();
      const url = prompt("Havola URL manzilini kiriting:", "https://");
      if (url) {
        insertSyntax("[", `](${url})`, "havola matni");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor("  ");
    }
  };

  // ----------------- IMAGE UPLOAD LOGIC -----------------
  const uploadImageFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Iltimos, faqat rasm fayllarini yuklang.");
      return;
    }

    setIsUploadingImage(true);
    setStatusMessage({
      type: "success",
      text: `Rasm yuklanmoqda: ${file.name}...`,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-pin": adminPin,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        const imageUrl = data.url;
        const altText = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

        // Matnga chiroyli tarzda joylash: yangi qatorda rasm
        const markdownImage = `\n\n![${altText}](${imageUrl})\n\n`;
        insertAtCursor(markdownImage);

        setRecentUploadedImages((prev) => [imageUrl, ...prev.filter((u) => u !== imageUrl)].slice(0, 8));

        setStatusMessage({
          type: "success",
          text: `✓ Rasm muvaffaqiyatli yuklandi va blog matniga qo'shildi!`,
        });
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Rasm yuklashda xatolik yuz berdi.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Serverga ulanishda xatolik yuz berdi.",
      });
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageFile(file);
    }
  };

  // Paste image from clipboard (Ctrl + V)
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          e.preventDefault();
          uploadImageFile(blob);
          return;
        }
      }
    }
  };

  // Drag and drop image
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleInsertImageUrlDialog = () => {
    const url = prompt("Rasm URL manzilini kiriting (masalan: https://...):");
    if (!url) return;
    const caption = prompt("Rasm tavsifi / Caption (ixtiyoriy):", "Tizim arxitekturasi") || "";
    insertAtCursor(`\n\n![${caption}](${url})\n\n`);
  };

  const handleInsertTableDialog = () => {
    const tableTemplate = `\n\n| Metrika | Avvalgi Holat | Yangi Natija |\n| :--- | :--- | :--- |\n| Kechikish (Latency) | 120ms | 22ms |\n| Xotira Sarfi | 1.8 GB | 640 MB |\n| Uptime | 99.2% | 99.99% |\n\n`;
    insertAtCursor(tableTemplate);
  };

  // ----------------- SUBMIT ARTICLE -----------------
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
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const primaryCategory = selectedCategories[0] || ".NET";

    const payload = {
      id: editingId || undefined,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle: subtitle.trim(),
      category: primaryCategory,
      categories: selectedCategories,
      chip: chip.trim() || "JOURNAL · ARTICLE",
      bulletColor,
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

  // Word count & read time calculation
  const wordsCount = markdownContent.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordsCount / 200))} daqiqa o'qish`;

  return (
    <div className="flex flex-col gap-8">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow animate-pulse" />
            <h2 className="font-display font-bold text-xl text-ink">
              Maqolalar Studio va Muharrir (Articles Studio)
            </h2>
          </div>
          <p className="text-muted text-xs font-mono">
            Word kabi qulay formatlash, rasm yuklash (upload) va real-time visual preview bilan maqola yozing va chop eting.
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

      {/* Article Studio Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-7 animate-fadeIn"
        >
          {/* Form Header */}
          <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
            <div className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-ink" />
              <h3 className="font-display font-bold text-lg text-ink">
                {editingId ? "Maqolani Tahrirlash" : "Yangi Maqola Yaratish va Chop Etish"}
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

          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Maqola Sarlavhasi (Title) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Masalan: ASP.NET Core va Redis bilan Sub-30ms Real-Time Arxitekturasi"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
                required
              />
            </div>

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
                  placeholder="aspnet-core-redis-realtime"
                  className="w-full px-3 py-2.5 rounded-r-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
                  required
                />
              </div>
              <p className="text-[11px] font-mono text-muted mt-1">
                Saytda havola: <span className="font-bold text-ink">/blog/{slug || "maqola-nomi"}</span> bo&apos;ladi.
              </p>
            </div>
          </div>

          {/* Row 2: Subtitle */}
          <div>
            <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
              Qisqacha Tavsif / Tagline (Subtitle)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Azure Speech sintez xarajatlarini 35% ga qisqartirish va kechikishni kamaytirish sirlari..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
            />
          </div>

          {/* Row 3: Chip & Bullet Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Badge / Chip (Kichik nishon)
              </label>
              <input
                type="text"
                value={chip}
                onChange={(e) => setChip(e.target.value)}
                placeholder="BACKEND · AI yoki SYSTEM DESIGN"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-2 uppercase tracking-wider">
                Vizual Rang (Theme Color)
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBulletColor(opt.value)}
                    className={`px-3 py-1.5 rounded-xl border-2 border-ink text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
                      bulletColor === opt.value
                        ? "bg-white shadow-solid-sm font-bold"
                        : "bg-cream/50 text-muted"
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border border-ink ${opt.value}`} />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Categories (Multi-select + Custom Add) */}
          <div className="p-4 rounded-2xl border-2 border-ink/20 bg-cream/30 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="block text-xs font-mono font-bold text-ink uppercase tracking-wider">
                Kategoriyalar (Tanlang yoki yangisini qo&apos;shing)
              </label>
              <span className="text-[11px] font-mono text-muted">
                Tanlangan: <span className="font-bold text-ink">{selectedCategories.join(", ")}</span>
              </span>
            </div>

            {/* Chips buttons */}
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-yellow text-ink border-2 border-ink shadow-solid-sm"
                        : "bg-white text-muted border border-ink/30 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "} {cat}
                  </button>
                );
              })}
            </div>

            {/* Add Custom Category */}
            <div className="flex items-center gap-2 max-w-lg mt-1">
              <input
                type="text"
                value={customCategoryInput}
                onChange={(e) => setCustomCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomCategory();
                  }
                }}
                placeholder="Yangi kategoriya (masalan: Microservices, Security)..."
                className="flex-1 px-3.5 py-2 rounded-xl border-2 border-ink bg-white text-xs font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                disabled={!customCategoryInput.trim()}
                className="px-4 py-2 rounded-xl bg-ink text-cream hover:bg-yellow hover:text-ink border-2 border-ink text-xs font-mono font-bold shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-40"
              >
                + Qo&apos;shish
              </button>
            </div>
          </div>

          {/* Row 5: Tags */}
          <div>
            <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
              Teglar (Vergul bilan ajrating)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="#dotnet, #csharp, #redis, #performance"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white mb-2"
            />
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-muted">Tezkor teglar:</span>
              {SUGGESTED_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleAddTagClick(t)}
                  className="px-2 py-0.5 rounded-md border border-ink/30 bg-cream text-[10px] font-mono text-muted hover:text-ink hover:border-ink hover:bg-white cursor-pointer transition-colors"
                >
                  +{t}
                </button>
              ))}
            </div>
          </div>

          {/* ----------------- RICH EDITOR & LIVE PREVIEW ----------------- */}
          <div className="flex flex-col gap-3">
            {/* Control Bar: View Modes & Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-ink/10 pb-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-mono font-bold text-ink uppercase tracking-wider">
                  Maqola Muharriri va Live Visual Preview
                </label>
                <span className="text-[11px] font-mono text-muted px-2 py-0.5 rounded-md bg-cream border border-ink/20">
                  {wordsCount} so&apos;z · {estimatedReadTime}
                </span>
              </div>

              {/* View Mode Buttons */}
              <div className="flex items-center gap-1 bg-cream border-2 border-ink p-1 rounded-2xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "split"
                      ? "bg-yellow text-ink border border-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                  title="Yonma-yon ko'rish (Chapda yozish, o'ngda jonli natija)"
                >
                  <Split className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Yonma-yon (Split)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("editor")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "editor"
                      ? "bg-yellow text-ink border border-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                  title="Faqat matn muharriri"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Yozish</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "preview"
                      ? "bg-yellow text-ink border border-ink shadow-sm"
                      : "text-muted hover:text-ink"
                  }`}
                  title="To'liq vizual ko'rinish"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ko&apos;rish (Preview)</span>
                </button>
              </div>
            </div>

            {/* Word-Style Rich Formatting Toolbar */}
            <div className="w-full bg-[#FAF7EE] border-2 border-ink rounded-2xl p-2.5 flex items-center justify-between flex-wrap gap-2 shadow-solid-sm">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Headings */}
                <div className="flex items-center gap-1 bg-white border border-ink/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => insertSyntax("# ", "", "Katta Sarlavha")}
                    className="px-2 py-1 rounded-lg text-xs font-mono font-bold hover:bg-yellow transition-colors cursor-pointer"
                    title="H1 - Katta Sarlavha"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("## ", "", "O'rta Sarlavha")}
                    className="px-2 py-1 rounded-lg text-xs font-mono font-bold hover:bg-yellow transition-colors cursor-pointer"
                    title="H2 - Bo'lim Sarlavhasi"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("### ", "", "Kichik Sarlavha")}
                    className="px-2 py-1 rounded-lg text-xs font-mono font-bold hover:bg-yellow transition-colors cursor-pointer"
                    title="H3 - Qism Sarlavhasi"
                  >
                    H3
                  </button>
                </div>

                {/* Inline Styles: Bold, Italic, Underline, Strike, Code, Highlight */}
                <div className="flex items-center gap-1 bg-white border border-ink/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => insertSyntax("**", "**", "qalin matn")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Bold / Qalin (Ctrl+B)"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("*", "*", "qiya matn")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Italic / Qiya (Ctrl+I)"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("<u>", "</u>", "tagiga chizilgan matn")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Underline / Tagiga chizilgan (Ctrl+U)"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("~~", "~~", "ustidan chizilgan matn")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Strikethrough / O'chirilgan"
                  >
                    <Strikethrough className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("<mark>", "</mark>", "ajratilgan matn")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Highlighter / Sariq rang bilan belgilash"
                  >
                    <Highlighter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("`", "`", "kod")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer font-mono font-bold text-xs"
                    title="Inline Kod"
                  >
                    &lt;/&gt;
                  </button>
                </div>

                {/* Lists & Checklists */}
                <div className="flex items-center gap-1 bg-white border border-ink/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => insertSyntax("- ", "", "Ro'yxat elementi")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Nuqtali ro'yxat (Bulleted list)"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("1. ", "", "Birinchi element")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Raqamlangan ro'yxat (Numbered list)"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("- [x] ", "", "Bajarilgan vazifa")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Checklist / Vazifalar ro'yxati"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </div>

                {/* Blocks: Quote, Callout, Table, Divider */}
                <div className="flex items-center gap-1 bg-white border border-ink/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => insertSyntax("> ", "", "Muhim iqtibos yoki fikr")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Iqtibos (Blockquote)"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSyntax("> [!NOTE]\n> ", "", "Muhim eslatma matni")}
                    className="px-2 py-1 rounded-lg text-xs font-mono font-bold hover:bg-yellow transition-colors cursor-pointer flex items-center gap-1"
                    title="Callout / Eslatma qutisi"
                  >
                    <span>Eslatma</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertTableDialog}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Jadval kiritish"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertAtCursor("\n\n---\n\n")}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Gorizontal ajratuvchi chiziq"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                {/* Code Block & Link */}
                <div className="flex items-center gap-1 bg-white border border-ink/30 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => insertSyntax("```csharp\n", "\n```", "// C# kodini bu yerga yozing")}
                    className="px-2 py-1 rounded-lg text-xs font-mono font-bold hover:bg-yellow transition-colors cursor-pointer"
                    title="Katta Kod Bloki"
                  >
                    Code Block
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Havola URL manzilini kiriting:", "https://");
                      if (url) {
                        insertSyntax("[", `](${url})`, "havola matni");
                      }
                    }}
                    className="p-1.5 rounded-lg text-ink hover:bg-yellow transition-colors cursor-pointer"
                    title="Havola (Link) qo'shish"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* IMAGE UPLOAD & INSERT BUTTONS */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingImage}
                  className="px-3.5 py-1.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  title="Kompyuteringizdan rasm tanlang va blog matniga qo'shing"
                >
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>📷 Rasm Yuklash</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleInsertImageUrlDialog}
                  className="p-2 rounded-xl border border-ink/40 bg-white hover:bg-cream text-ink text-xs font-mono flex items-center gap-1 cursor-pointer"
                  title="Internetdagi rasm havolasini (URL) kiritish"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recent Uploaded Images Quick Strip */}
            {recentUploadedImages.length > 0 && (
              <div className="p-2.5 rounded-xl bg-cream/40 border border-ink/20 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] font-mono text-muted uppercase font-bold shrink-0">
                  Yuklangan rasmlar:
                </span>
                {recentUploadedImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => insertAtCursor(`\n\n![Rasm ${i + 1}](${imgUrl})\n\n`)}
                    className="relative w-10 h-10 rounded-lg border border-ink overflow-hidden shrink-0 group hover:scale-105 transition-transform cursor-pointer"
                    title="Matnga qo'shish uchun bosing"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt="uploaded" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 bg-ink/60 text-white text-[9px] font-mono font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      +Qo&apos;sh
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Split / Editor / Preview Container */}
            <div
              className={`grid gap-5 w-full ${
                viewMode === "split"
                  ? "grid-cols-1 lg:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {/* LEFT / EDITOR STAGE */}
              {(viewMode === "split" || viewMode === "editor") && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span className="font-bold uppercase tracking-wider text-ink">
                      Matn Muharriri (Markdown / Rich Text)
                    </span>
                    <span>
                      💡 Rasmni to&apos;g&apos;ridan-to&apos;g&apos;ri bu yerga tashlashingiz (drag & drop) yoki Ctrl+V qilishingiz mumkin
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      rows={22}
                      value={markdownContent}
                      onChange={(e) => setMarkdownContent(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      onDrop={handleDrop}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      placeholder="Maqola matnini bu yerga yozing. 5 qator matn, keyin rasm, keyin yana matn, yana rasm xohlagancha joylashtiring..."
                      className={`w-full p-4 rounded-2xl border-2 border-ink text-sm font-mono leading-relaxed resize-y focus:outline-none transition-colors ${
                        isDragOver
                          ? "bg-yellow/20 border-yellow"
                          : "bg-cream/20 focus:bg-white"
                      }`}
                      required
                    />

                    {isDragOver && (
                      <div className="absolute inset-0 rounded-2xl bg-yellow/80 border-2 border-dashed border-ink flex flex-col items-center justify-center pointer-events-none">
                        <UploadCloud className="w-10 h-10 text-ink animate-bounce" />
                        <span className="font-mono font-bold text-sm text-ink mt-2">
                          Rasmni shu yerga tashlang!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* RIGHT / LIVE VISUAL PREVIEW STAGE */}
              {(viewMode === "split" || viewMode === "preview") && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span className="font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                      <span>Jonli Visual Ko&apos;rinish (Live Article Preview)</span>
                    </span>
                    <span className="text-[11px] text-muted font-sans">
                      Saytda aynan shunday ko&apos;rinadi
                    </span>
                  </div>

                  {/* Visual Paper Layout */}
                  <div className="w-full p-6 sm:p-8 rounded-2xl border-2 border-ink bg-white min-h-[500px] max-h-[620px] overflow-y-auto shadow-solid-sm flex flex-col gap-6">
                    {/* Header Mockup */}
                    <div className="flex flex-col gap-3 pb-5 border-b-2 border-ink/10">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full border border-ink bg-yellow font-mono text-[10px] font-bold text-ink uppercase">
                          {chip || "JOURNAL"}
                        </span>
                        {selectedCategories.map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-0.5 rounded-full border border-ink/30 bg-cream font-mono text-[10px] text-ink font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                        <span className="font-mono text-[11px] text-muted ml-auto">
                          {estimatedReadTime}
                        </span>
                      </div>

                      <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight">
                        {title || "Maqola Sarlavhasi Bu Yerda Bo'ladi"}
                      </h1>

                      {subtitle && (
                        <p className="font-sans text-sm text-muted italic border-l-3 border-yellow pl-3 py-0.5">
                          {subtitle}
                        </p>
                      )}

                      <div className="flex items-center gap-3 pt-2 text-xs font-mono text-muted">
                        <span className="font-bold text-ink">Javohir Sadullayev</span>
                        <span>·</span>
                        <span>{new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Rich Markdown & Images Body */}
                    <div className="w-full">
                      <MarkdownRenderer content={markdownContent} />
                    </div>

                    {/* Tags preview */}
                    {tagsText && (
                      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-ink/10">
                        {tagsText
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-full bg-cream border border-ink/30 font-mono text-[10px] text-ink font-semibold"
                            >
                              {t.startsWith("#") ? t : `#${t}`}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions: Cancel & Submit */}
          <div className="flex items-center justify-between border-t-2 border-ink/10 pt-5 flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <Sparkles className="w-4 h-4 text-yellow" />
              <span>Chop etilgan maqolalar bir zumda /blog va /blog/[slug] sahifalarida paydo bo&apos;ladi.</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-5 py-2.5 rounded-xl border-2 border-ink bg-white text-xs font-mono font-bold text-ink hover:bg-cream transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="px-6 py-2.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Chop etilmoqda...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{editingId ? "O'zgarishlarni Saqlash" : "Maqolani Chop Etish (Publish) ✓"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ----------------- ARTICLES LIST ----------------- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
              Chop Etilgan Maqolalar ({articles.length})
            </h3>
            <span className="w-2 h-2 rounded-full bg-mint" />
          </div>

          <Link
            href="/blog"
            target="_blank"
            className="text-xs font-mono font-bold text-ink hover:underline flex items-center gap-1 group"
          >
            <span>/blog sahifasini ko&apos;rish</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid-sm text-center flex flex-col items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-muted/50" />
            <p className="text-sm font-sans text-muted">
              Hozircha admin panel orqali chop etilgan maqolalar yo&apos;q.
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
                className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:shadow-solid-lg transition-all"
              >
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-ink bg-yellow">
                      {art.chip || art.category}
                    </span>
                    {(art.categories || [art.category]).map((c) => (
                      <span
                        key={c}
                        className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full border border-ink/30 bg-cream"
                      >
                        {c}
                      </span>
                    ))}
                    <span className="font-mono text-[11px] text-muted">
                      {art.publishedDate} · {art.readTime}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-ink group-hover:text-blue transition-colors">
                    {art.title}
                  </h4>

                  {art.subtitle && (
                    <p className="font-sans text-xs text-muted line-clamp-1">
                      {art.subtitle}
                    </p>
                  )}

                  <div className="text-[11px] font-mono text-muted/80">
                    URL: <span className="text-ink font-semibold">/blog/{art.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <Link
                    href={`/blog/${art.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-ink bg-cream text-xs font-mono font-bold text-ink hover:bg-yellow transition-all shadow-solid-sm"
                  >
                    <span>O&apos;qish ↗</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleEdit(art)}
                    className="p-2.5 rounded-xl border-2 border-ink/40 hover:border-ink hover:bg-cream text-ink transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-2.5 rounded-xl border-2 border-coral/40 hover:border-coral hover:bg-peach text-coral transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
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
