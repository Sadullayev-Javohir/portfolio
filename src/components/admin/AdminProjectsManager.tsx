"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderPlus,
  ExternalLink,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Plus,
  Layers,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

export interface CustomProjectData {
  id: string;
  slug: string;
  name: string;
  title: string;
  year: string;
  chip: string;
  categories: string[];
  period: string;
  description: string;
  highlights: string[];
  bulletColor: string;
  tags: string[];
  caseStudyHref: string;
  externalLabel?: string;
  externalUrl?: string;
  githubUrl?: string;
  role?: string;
  overview?: string;
  problemStatement?: string;
  whatIBuilt?: string[];
  architecture?: string;
  results?: string[];
  createdAt: string;
}

interface AdminProjectsManagerProps {
  adminPin: string;
}

const CATEGORY_OPTIONS = [
  "Backend",
  "AI engineering",
  "Full-stack",
  "Real-time",
  "Productivity",
  "Cloud & DevOps",
];

const COLOR_OPTIONS = [
  { label: "Sariq (Yellow)", value: "bg-yellow" },
  { label: "Ko'k (Blue)", value: "bg-blue" },
  { label: "Yashil (Mint)", value: "bg-mint" },
  { label: "Qizil (Coral)", value: "bg-coral" },
  { label: "Binafsha (Lilac)", value: "bg-lilac" },
  { label: "Qora (Ink)", value: "bg-ink" },
];

export function AdminProjectsManager({ adminPin }: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<CustomProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [chip, setChip] = useState("BACKEND · AI");
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const [period, setPeriod] = useState("Software Engineer · 2026 — Present");
  const [role, setRole] = useState("Backend Engineer");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Backend"]);
  const [availableCategories, setAvailableCategories] = useState<string[]>(CATEGORY_OPTIONS);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [bulletColor, setBulletColor] = useState("bg-yellow");
  const [description, setDescription] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [tagsText, setTagsText] = useState(".NET 8, PostgreSQL, Redis");
  const [externalUrl, setExternalUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [architecture, setArchitecture] = useState("");
  const [resultsText, setResultsText] = useState("");

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (res.ok && data.ok) {
        const loadedProjects: CustomProjectData[] = data.projects || [];
        setProjects(loadedProjects);
        const existingCats = loadedProjects.flatMap((p) => p.categories || []);
        setAvailableCategories((prev) => Array.from(new Set([...prev, ...existingCats])));
      }
    } catch {
      console.error("Failed to load projects");
    } finally {
      setIsLoading(false);
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

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      // Auto generate slug
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
    setChip("BACKEND · AI");
    setYear(`${new Date().getFullYear()}`);
    setPeriod("Software Engineer · 2026 — Present");
    setRole("Backend Engineer");
    setSelectedCategories(["Backend"]);
    setCustomCategoryInput("");
    setBulletColor("bg-yellow");
    setDescription("");
    setHighlightsText("");
    setTagsText(".NET 8, PostgreSQL, Redis");
    setExternalUrl("");
    setGithubUrl("");
    setProblemStatement("");
    setArchitecture("");
    setResultsText("");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (project: CustomProjectData) => {
    setEditingId(project.id);
    setTitle(project.title);
    setSlug(project.slug);
    setChip(project.chip);
    setYear(project.year);
    setPeriod(project.period);
    setRole(project.role || "Backend Engineer");
    const projCats = project.categories && project.categories.length > 0 ? project.categories : ["Backend"];
    setSelectedCategories(projCats);
    setAvailableCategories((prev) => Array.from(new Set([...prev, ...projCats])));
    setBulletColor(project.bulletColor || "bg-yellow");
    setDescription(project.description);
    setHighlightsText((project.highlights || []).join("\n"));
    setTagsText((project.tags || []).join(", "));
    setExternalUrl(project.externalUrl || "");
    setGithubUrl(project.githubUrl || "");
    setProblemStatement(project.problemStatement || "");
    setArchitecture(project.architecture || "");
    setResultsText((project.results || []).join("\n"));
    setIsFormOpen(true);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleDelete = async (id: string, projectTitle: string) => {
    if (!confirm(`Haqiqatan ham "${projectTitle}" loyihasini o'chirmoqchimisiz?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-pin": adminPin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatusMessage({
          type: "success",
          text: "Loyiha muvaffaqiyatli o'chirildi.",
        });
        loadProjects();
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
      setStatusMessage({ type: "error", text: "Loyiha sarlavhasini kiriting!" });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const highlights = highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = tagsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const results = resultsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      id: editingId || undefined,
      title: title.trim(),
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: title.trim().toUpperCase(),
      year,
      chip,
      categories: selectedCategories,
      period,
      role,
      bulletColor,
      description: description.trim(),
      highlights: highlights.length > 0 ? highlights : [description.trim()],
      tags: tags.length > 0 ? tags : [".NET", "C#"],
      externalUrl: externalUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      problemStatement: problemStatement.trim(),
      architecture: architecture.trim(),
      results,
    };

    try {
      const res = await fetch("/api/admin/projects", {
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
            ? "Loyiha muvaffaqiyatli yangilandi!"
            : "Yangi loyiha o'rnatildi va /projects bo'limiga qo'shildi! ✓",
        });
        loadProjects();
        handleResetForm();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Loyiha saqlashda xatolik yuz berdi.",
        });
      }
    } catch {
      setStatusMessage({ type: "error", text: "Server bilan aloqa uzildi." });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="flex flex-col gap-8">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-mint animate-pulse" />
            <h2 className="font-display font-bold text-xl text-ink">
              Loyihalar Boshqaruvi (Projects Manager)
            </h2>
          </div>
          <p className="text-muted text-xs font-mono">
            Yangi loyihalaringizni joylang. Ular avtomatik tarzda /projects sahifasida va o&apos;zining maxsus URL manzilida paydo bo&apos;ladi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadProjects}
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
            <span>{isFormOpen && !editingId ? "Yopish" : "+ Yangi Loyiha O'rnatish"}</span>
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

      {/* Project Form (Add / Edit) */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b-2 border-ink/10 pb-4">
            <div className="flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-ink" />
              <h3 className="font-display font-bold text-lg text-ink">
                {editingId ? "Loyihani Tahrirlash" : "Yangi Loyiha Ma'lumotlari"}
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
                Loyiha Nomi (Title) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Masalan: Enterprise Event Bus Gateway"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
                required
              />
            </div>

            {/* Slug & Dynamic URL Preview */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                URL Manzili (Slug) *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 rounded-l-xl border-2 border-r-0 border-ink bg-cream font-mono text-xs text-muted">
                  /projects/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  placeholder="enterprise-event-bus"
                  className="w-full px-3 py-2.5 rounded-r-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
                  required
                />
              </div>
              <p className="text-[11px] font-mono text-muted mt-1">
                Loyiha sahifasi: <span className="font-bold text-ink">/projects/{slug || "loyiha-nomi"}</span> manzilida ochiladi.
              </p>
            </div>

            {/* Chip & Year */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Badge / Chip
              </label>
              <input
                type="text"
                value={chip}
                onChange={(e) => setChip(e.target.value)}
                placeholder="BACKEND · AI yoki REAL-TIME · FULL-STACK"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Yil / Holat (Year)
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026 yoki ACTIVE"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>

            {/* Period / Role */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Faoliyat Davri (Period)
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Backend Developer · Jul 2026 — Present"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Sizning Rolingiz (Role)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Backend Engineer"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
              />
            </div>

            {/* Links */}
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Jonli Sayt / Demo URL (Ixtiyoriy)
              </label>
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://example.uz yoki https://t.me/..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                GitHub Repo URL (Ixtiyoriy)
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/Sadullayev-Javohir/..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-mono focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Categories Selector */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <label className="block text-xs font-mono font-bold text-ink uppercase tracking-wider">
                Kategoriyalar (Filterlar uchun)
              </label>
              <span className="text-[11px] font-mono text-muted">
                Tanlangan: <span className="font-bold text-ink">{selectedCategories.join(", ")}</span>
              </span>
            </div>

            {/* Chips buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
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
                        : "bg-cream text-muted border border-ink/30 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "} {cat}
                  </button>
                );
              })}
            </div>

            {/* Custom Category Input */}
            <div className="flex items-center gap-2 max-w-lg">
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
                placeholder="Yangi kategoriya yozing (masalan: Fintech, Mobile)..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-xs font-mono focus:outline-none focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                disabled={!customCategoryInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-ink text-cream hover:bg-yellow hover:text-ink border-2 border-ink text-xs font-mono font-bold shadow-solid-sm active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-40"
              >
                + Qo&apos;shish
              </button>
            </div>
            <p className="text-[11px] font-mono text-muted mt-1.5">
              💡 Yangi kategoriya nomini yozib <kbd className="px-1.5 py-0.5 bg-cream border border-ink/20 rounded text-[10px]">Enter</kbd> yoki <b>+ Qo&apos;shish</b> tugmasini bosing.
            </p>
          </div>

          {/* Bullet Color */}
          <div>
            <label className="block text-xs font-mono font-bold text-ink mb-2 uppercase tracking-wider">
              Vizual Rang (Bullet Color)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBulletColor(opt.value)}
                  className={`px-3 py-1.5 rounded-xl border-2 border-ink text-xs font-mono flex items-center gap-2 cursor-pointer ${
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

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
              Qisqacha Tavsif (Projects Feed kartochkasida ko&apos;rinadi) *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ushbu loyiha nimani hal qilishi, qaysi arxitekturaga asoslangani haqida qisqacha ma'lumot..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-sm font-sans focus:outline-none focus:bg-white"
              required
            />
          </div>

          {/* Highlights & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Asosiy Yutuqlar / Nuqtalar (Har bir qatorda 1 ta)
              </label>
              <textarea
                rows={4}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                placeholder="SignalR yordamida kechikish 25ms gacha pasaytirildi&#10;Redis kesh bilan server yuklanishi 40% ga kamaydi"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-xs font-mono focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-ink mb-1.5 uppercase tracking-wider">
                Texnologiyalar (Vergul bilan ajrating)
              </label>
              <textarea
                rows={4}
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder=".NET 8, ASP.NET Core, PostgreSQL, Redis, Docker, SignalR"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream/30 text-xs font-mono focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          {/* Deep Case Study Fields */}
          <div className="p-4 rounded-2xl bg-cream/60 border border-ink/20 flex flex-col gap-4">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow" />
              Batafsil Case Study Ma&apos;lumotlari (/projects/{slug || "loyiha"} uchun)
            </span>

            <div>
              <label className="block text-xs font-mono font-medium text-ink mb-1">
                Muammo va Maqsad (Problem Statement):
              </label>
              <textarea
                rows={2}
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                placeholder="Loyiha oldida qanday murakkab texnik yoki biznes muammo turgandi..."
                className="w-full px-3 py-2 rounded-xl border border-ink bg-white text-xs font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-ink mb-1">
                Arxitektura va Texnik Qarorlar (Architecture):
              </label>
              <textarea
                rows={2}
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                placeholder="Qanday qilib servislar ajratildi, ma'lumotlar oqimi, xavfsizlik..."
                className="w-full px-3 py-2 rounded-xl border border-ink bg-white text-xs font-sans focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-ink mb-1">
                Natijalar va Metrikalar (Results - har bir qatorda 1 ta):
              </label>
              <textarea
                rows={2}
                value={resultsText}
                onChange={(e) => setResultsText(e.target.value)}
                placeholder="99.9% uptime ta'minlandi&#10;Kunlik 50,000+ so'rovlar muammosiz qabul qilindi"
                className="w-full px-3 py-2 rounded-xl border border-ink bg-white text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Buttons */}
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
                <span>Saqlanmoqda...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingId ? "O'zgarishlarni Saqlash" : "Loyihani Saqlash va Chop Etish"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
            O&apos;rnatilgan Yangi Loyihalar ({projects.length})
          </h3>
          <Link
            href="/projects"
            target="_blank"
            className="text-xs font-mono font-bold text-ink hover:underline flex items-center gap-1"
          >
            <span>/projects sahifasini ko&apos;rish</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border-2 border-ink shadow-solid-sm text-center flex flex-col items-center justify-center gap-3">
            <Layers className="w-10 h-10 text-muted/50" />
            <p className="text-sm font-sans text-muted">
              Hozircha admin panel orqali qo&apos;shilgan yangi loyihalar yo&apos;q.
            </p>
            <button
              type="button"
              onClick={() => {
                handleResetForm();
                setIsFormOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-yellow border-2 border-ink text-xs font-mono font-bold text-ink shadow-solid-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              + Birinchi Loyihani Qo&apos;shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-ink bg-cream">
                      {proj.chip}
                    </span>
                    <span className="font-mono text-xs font-bold text-muted">
                      {proj.year}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg text-ink">
                    {proj.title}
                  </h4>
                  <p className="font-sans text-xs text-muted line-clamp-2 mt-1">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-ink/20 bg-cream/50 text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-ink/10 flex items-center justify-between">
                  <Link
                    href={`/projects/${proj.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-ink hover:text-blue transition-colors"
                  >
                    <span>/projects/{proj.slug}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(proj)}
                      className="p-1.5 rounded-lg border border-ink/30 hover:border-ink hover:bg-cream text-ink transition-colors cursor-pointer"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proj.id, proj.title)}
                      className="p-1.5 rounded-lg border border-coral/30 hover:border-coral hover:bg-peach text-coral transition-colors cursor-pointer"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
