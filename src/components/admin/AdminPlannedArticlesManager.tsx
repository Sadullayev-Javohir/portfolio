"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Layers,
  Palette,
  HelpCircle,
} from "lucide-react";
import { CustomPlannedArticle } from "@/lib/dynamicContent";

interface AdminPlannedArticlesManagerProps {
  adminPin: string;
}

const CHIP_COLORS: { label: string; value: CustomPlannedArticle["chipColor"]; bgClass: string }[] = [
  { label: "Qizil / Coral", value: "coral", bgClass: "bg-coral" },
  { label: "Sariq / Yellow", value: "yellow", bgClass: "bg-yellow" },
  { label: "Yashil / Mint", value: "mint", bgClass: "bg-mint" },
  { label: "Binafsha / Lilac", value: "lilac", bgClass: "bg-lilac" },
];

const SUGGESTED_CATEGORIES = [
  "BACKEND · .NET",
  "CACHING · REDIS",
  "REAL-TIME",
  "AI ENGINEERING",
  "DATABASE · POSTGRESQL",
  "ARCHITECTURE · DISTRIBUTED",
  "SECURITY & AUTH",
  "DEV TOOLS",
];

export function AdminPlannedArticlesManager({ adminPin }: AdminPlannedArticlesManagerProps) {
  const [items, setItems] = useState<CustomPlannedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("BACKEND · .NET");
  const [chipColor, setChipColor] = useState<CustomPlannedArticle["chipColor"]>("coral");

  const loadPlannedArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/planned-articles", {
        headers: { "x-admin-pin": adminPin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setItems(data.plannedArticles || []);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Ma'lumotlarni yuklab bo'lmadi." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Serverga ulanishda xatolik yuz berdi." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlannedArticles();
  }, [adminPin]);

  const handleResetForm = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
    setCategory("BACKEND · .NET");
    setChipColor("coral");
  };

  const handleEdit = (item: CustomPlannedArticle) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDesc(item.desc);
    setCategory(item.category);
    setChipColor(item.chipColor);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Rostdan ham "${itemTitle}" rejalashtirilgan maqolasini o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/planned-articles?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-pin": adminPin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMessage({ type: "success", text: "Maqola muvaffaqiyatli o'chirildi!" });
        loadPlannedArticles();
        if (editingId === id) handleResetForm();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "O'chirishda xatolik." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Server bilan aloqa uzildi." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim() || !category.trim()) {
      setStatusMessage({ type: "error", text: "Iltimos, barcha majburiy maydonlarni to'ldiring!" });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const payload: Partial<CustomPlannedArticle> = {
        id: editingId || undefined,
        title: title.trim(),
        desc: desc.trim(),
        category: category.trim(),
        chipColor,
      };

      const res = await fetch("/api/admin/planned-articles", {
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
            ? "Rejalashtirilgan mavzu muvaffaqiyatli yangilandi!"
            : "Yangi rejalashtirilgan mavzu qo'shildi! ✓",
        });
        handleResetForm();
        loadPlannedArticles();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Saqlashda xatolik yuz berdi." });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Server bilan aloqa uzildi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Banner / Info */}
      <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
            <h2 className="font-display font-bold text-xl text-ink">
              Rejalashtirilgan mavzular (Upcoming Deep Dives)
            </h2>
          </div>
          <p className="text-muted text-xs font-mono">
            /blog sahifasidagi &quot;Upcoming Deep Dives&quot; bo&apos;limi kartochkalarini shu yerdan qo&apos;shing, tahrirlang yoki o&apos;chiring.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPlannedArticles}
          disabled={isLoading}
          className="px-4 py-2 rounded-xl border-2 border-ink bg-cream text-ink text-xs font-mono font-bold flex items-center gap-2 hover:bg-yellow transition-all shadow-solid-sm active:translate-y-0.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border-2 border-ink flex items-center gap-3 font-mono text-xs ${
            statusMessage.type === "success"
              ? "bg-mint/30 text-ink border-ink"
              : "bg-coral/20 text-ink border-ink"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-ink shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-coral shrink-0" />
          )}
          <span className="font-bold">{statusMessage.text}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-ink">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow border border-ink" />
            <h3 className="font-display font-bold text-lg text-ink">
              {editingId ? "Mavzuni Tahrirlash" : "Yangi Rejalashtirilgan Mavzu Qo'shish"}
            </h3>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs font-mono text-muted hover:text-ink underline cursor-pointer"
            >
              Bekor qilish
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              Mavzu Sarlavhasi (Title) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: Under 30 ms: real-time without lying"
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-cream/30 text-ink font-sans text-sm placeholder:text-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              Qisqacha Tavsif (Desc) *
            </label>
            <textarea
              required
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Masalan: SignalR, Redis Pub/Sub and why the server should own the scoreboard."
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-cream/30 text-ink font-sans text-sm placeholder:text-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              Kategoriya (Category) *
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Masalan: BACKEND · .NET"
              className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-cream/30 text-ink font-mono text-xs uppercase placeholder:text-muted/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow"
            />
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SUGGESTED_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-2.5 py-1 rounded-full border border-ink text-[10px] font-mono transition-all ${
                    category === cat
                      ? "bg-ink text-white font-bold"
                      : "bg-cream text-muted hover:text-ink hover:bg-yellow/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Chip Color */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-muted" />
              <span>Kartochka Teg Rangi (Chip Color)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CHIP_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setChipColor(c.value)}
                  className={`p-3 rounded-2xl border-2 border-ink flex items-center gap-3 transition-all cursor-pointer ${
                    chipColor === c.value
                      ? "bg-white shadow-solid ring-2 ring-ink -translate-y-0.5"
                      : "bg-cream/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border border-ink ${c.bgClass}`} />
                  <span className="font-mono text-xs font-bold text-ink">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-3">
            {editingId && (
              <button
                type="button"
                onClick={handleResetForm}
                className="px-6 py-3 rounded-2xl border-2 border-ink bg-white font-mono text-xs font-bold text-ink hover:bg-cream transition-all"
              >
                Bekor qilish
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-2xl border-2 border-ink bg-yellow font-mono text-xs font-bold text-ink shadow-solid hover:shadow-solid-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {editingId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{editingId ? "O'zgarishlarni Saqlash" : "Ro'yxatga Qo'shish"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Cards List Preview */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2">
            <span>Hozirgi Rejalashtirilgan Kartochkalar</span>
            <span className="px-2 py-0.5 rounded-full bg-ink text-white font-mono text-xs font-bold">
              {items.length}
            </span>
          </h3>
          <span className="font-mono text-xs text-muted">
            /blog da avtomatik {items.length.toString().padStart(2, "0")} soni ko&apos;rinadi
          </span>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white border-2 border-ink text-muted font-mono text-sm">
            Hozircha hech qanday rejalashtirilgan mavzu mavjud emas.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => {
              const chipInfo = CHIP_COLORS.find((c) => c.value === item.chipColor) || CHIP_COLORS[0];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border-2 border-ink shadow-solid flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`${chipInfo.bgClass} border border-ink text-ink font-mono text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}
                    >
                      PLANNED · {item.index}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="p-1.5 rounded-lg border border-ink bg-cream hover:bg-yellow text-ink transition-all"
                        title="Tahrirlash"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-lg border border-ink bg-cream hover:bg-coral text-ink transition-all"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-ink mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-muted leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-ink/10 flex items-center justify-between text-[10px] font-mono text-muted">
                    <span className="uppercase font-bold text-ink/80">{item.category}</span>
                    <span>{item.chipColor}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
