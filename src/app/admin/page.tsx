"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Zap,
  Activity,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Save,
  ArrowLeft,
  Sliders,
  Send,
  Radio,
  Clock,
  Sparkles,
  FolderGit2,
  FileText,
  Cpu,
  Inbox,
} from "lucide-react";
import Link from "next/link";
import { ChatMessageContent } from "@/components/chat/ChatMessageContent";
import { AdminProjectsManager } from "@/components/admin/AdminProjectsManager";
import { AdminArticlesManager } from "@/components/admin/AdminArticlesManager";
import { AdminMessagesManager } from "@/components/admin/AdminMessagesManager";

interface ModelInfo {
  id: string;
  name: string;
  isFree: boolean;
  contextLength?: number;
  description?: string;
}

interface AiConfig {
  primaryModel: string;
  fallbackModels: string[];
  temperature: number;
  maxTokens: number;
  timeoutSeconds: number;
  lastUpdated?: string;
}

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [adminSection, setAdminSection] = useState<"projects" | "articles" | "ai" | "messages">("projects");

  // Dashboard Data
  const [config, setConfig] = useState<AiConfig | null>(null);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Ping test results per model ID
  const [pingResults, setPingResults] = useState<
    Record<string, { ok: boolean; latencyMs: number; error?: string; reply?: string; loading?: boolean }>
  >({});

  // Filter & Search
  const [search, setSearch] = useState("");
  const [showOnlyFree, setShowOnlyFree] = useState(true);

  // Playground test
  const [playgroundPrompt, setPlaygroundPrompt] = useState(
    "Javohir Sadullayev haqida 2 ta asosiy ma'lumot ber."
  );
  const [playgroundOutput, setPlaygroundOutput] = useState("");
  const [playgroundModel, setPlaygroundModel] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  // Check saved session PIN or Cookie
  useEffect(() => {
    const checkAuth = async () => {
      const savedPin = sessionStorage.getItem("admin_pin");
      if (savedPin) {
        setPin(savedPin);
        validatePin(savedPin);
        return;
      }

      setIsLoadingAuth(true);
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (res.ok && data.ok) {
          setIsAuthenticated(true);
          loadDashboardData("");
        } else {
          window.location.href = "/not-found";
        }
      } catch {
        window.location.href = "/not-found";
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const validatePin = async (pinToTest: string) => {
    setIsLoadingAuth(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinToTest }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_pin", pinToTest);
        loadDashboardData(pinToTest);
      } else {
        setAuthError(data.error || "PIN-kod noto'g'ri.");
      }
    } catch {
      setAuthError("Server bilan aloqa uzildi.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const loadDashboardData = async (activePin: string) => {
    setIsLoadingData(true);
    try {
      const res = await fetch("/api/admin/models", {
        headers: { "x-admin-pin": activePin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setConfig(data.config);
        setModels(data.models || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handlePingModel = async (modelId: string) => {
    setPingResults((prev) => ({
      ...prev,
      [modelId]: { ok: false, latencyMs: 0, loading: true },
    }));

    try {
      const res = await fetch("/api/admin/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({
          action: "test_ping",
          modelId,
        }),
      });

      const result = await res.json();
      setPingResults((prev) => ({
        ...prev,
        [modelId]: {
          ok: result.ok,
          latencyMs: result.latencyMs,
          error: result.error,
          reply: result.reply,
          loading: false,
        },
      }));
    } catch (err: any) {
      setPingResults((prev) => ({
        ...prev,
        [modelId]: {
          ok: false,
          latencyMs: 0,
          error: err.message,
          loading: false,
        },
      }));
    }
  };

  const handlePingAllFree = async () => {
    const freeModels = models.filter((m) => m.isFree).slice(0, 6);
    for (const m of freeModels) {
      handlePingModel(m.id);
    }
  };

  const handleSaveConfig = async () => {
    if (!config) return;
    setSaveStatus("Saqlanmoqda...");

    try {
      const res = await fetch("/api/admin/models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({
          action: "save_config",
          ...config,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setConfig(data.config);
        setSaveStatus("Sozlamalar muvaffaqiyatli saqlandi! ✓");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("Xatolik yuz berdi: " + (data.error || ""));
      }
    } catch {
      setSaveStatus("Tarmoq xatosi.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    sessionStorage.removeItem("admin_pin");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const handleRunPlayground = async () => {
    if (!playgroundPrompt.trim() || isPlaying) return;
    setIsPlaying(true);
    setPlaygroundOutput("");
    setPlaygroundModel("Ulanmoqda...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: playgroundPrompt }],
        }),
      });

      const used = res.headers.get("X-Ai-Model");
      if (used) setPlaygroundModel(used);

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          try {
            const parsed = JSON.parse(trimmed);
            if (parsed.type === "model" && parsed.model) {
              setPlaygroundModel(parsed.model);
            } else if (parsed.type === "token" && parsed.text) {
              setPlaygroundOutput((prev) => prev + parsed.text);
            }
          } catch {
            setPlaygroundOutput((prev) => prev + trimmed);
          }
        }
      }
    } catch (err: any) {
      setPlaygroundOutput("Xatolik: " + err.message);
    } finally {
      setIsPlaying(false);
    }
  };

  // Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border-2 border-ink rounded-3xl p-8 sm:p-10 shadow-[6px_6px_0px_#14110F]">
          <div className="w-14 h-14 rounded-2xl bg-yellow border-2 border-ink shadow-solid-sm flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-ink" />
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-ink mb-2">
            Admin Boshqaruvi
          </h2>
          <p className="text-muted text-sm font-sans mb-6">
            Nous Portal AI modellari va avtomatik zaxira tizimini nazorat qilish uchun PIN-kodni kiriting.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validatePin(pin);
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-xs font-mono font-bold text-ink uppercase tracking-wider mb-2">
                Xavfsizlik PIN-kodi
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-xl border-2 border-ink bg-cream/30 text-ink font-mono text-center text-lg tracking-widest focus:outline-none focus:bg-white focus:shadow-solid-sm"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-peach border border-coral text-xs font-mono text-ink flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-coral shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth || !pin.trim()}
              className="w-full py-3.5 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink font-mono font-bold text-sm text-ink shadow-solid hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoadingAuth ? (
                <span>Tekshirilmoqda...</span>
              ) : (
                <>
                  <span>Kirish</span>
                  <Zap className="w-4 h-4" />
                </>
              )}
            </button>

            <Link
              href="/"
              className="mt-2 text-center text-xs font-mono text-muted hover:text-ink flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolioga qaytish</span>
            </Link>
          </form>
        </div>
      </div>
    );
  }

  const filteredModels = models.filter((m) => {
    if (showOnlyFree && !m.isFree) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-8 lg:px-14">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        {/* Top Navbar */}
        <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-xl border border-ink bg-cream hover:bg-yellow shadow-solid-sm transition-all"
              title="Saytga o'tish"
            >
              <ArrowLeft className="w-4 h-4 text-ink" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-xl sm:text-2xl text-ink">
                  Admin Boshqaruv Markazi
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-yellow border border-ink text-[11px] font-mono font-bold">
                  Admin 6644
                </span>
              </div>
              <p className="text-xs font-mono text-muted">
                Yangi loyihalar o&apos;rnatish, maqolalar chop etish va AI tizimini sozlash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-ink bg-cream hover:bg-peach text-xs font-mono font-bold text-ink shadow-solid-sm active:scale-95 transition-all cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2.5 border-b-2 border-ink pb-4 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setAdminSection("projects")}
            className={`px-5 py-2.5 rounded-2xl border-2 border-ink text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminSection === "projects"
                ? "bg-yellow shadow-solid text-ink -translate-y-0.5"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Loyihalar Boshqaruvi (Projects)</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection("articles")}
            className={`px-5 py-2.5 rounded-2xl border-2 border-ink text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminSection === "articles"
                ? "bg-yellow shadow-solid text-ink -translate-y-0.5"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Maqolalar (Blog Studio)</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection("ai")}
            className={`px-5 py-2.5 rounded-2xl border-2 border-ink text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminSection === "ai"
                ? "bg-yellow shadow-solid text-ink -translate-y-0.5"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Modellari (Failover Hub)</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminSection("messages")}
            className={`px-5 py-2.5 rounded-2xl border-2 border-ink text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              adminSection === "messages"
                ? "bg-yellow shadow-solid text-ink -translate-y-0.5"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Kelgan Xabarlar (Inbox)</span>
          </button>
        </div>

        {/* Section 1: Projects */}
        {adminSection === "projects" && <AdminProjectsManager adminPin={pin} />}

        {/* Section 2: Articles */}
        {adminSection === "articles" && <AdminArticlesManager adminPin={pin} />}

        {/* Section 3: Messages */}
        {adminSection === "messages" && <AdminMessagesManager pin={pin} />}

        {/* Section 3: AI Hub */}
        {adminSection === "ai" && (
          <div className="flex flex-col gap-8">
            {/* Status / Active Chain Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Primary Model */}
          <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-muted tracking-wider">
                  Birlamchi Model (Primary)
                </span>
                <span className="w-3 h-3 rounded-full bg-mint animate-pulse" />
              </div>
              <h3 className="font-display font-black text-xl text-ink mb-1">
                {config?.primaryModel || "Aniqlanmagan"}
              </h3>
              <p className="text-xs text-muted font-sans">
                Foydalanuvchi so'rov yuborganida birinchi bo'lib murojaat qilinadigan model.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-rule flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-ink">Holat: Faol</span>
              <button
                type="button"
                onClick={() => config?.primaryModel && handlePingModel(config.primaryModel)}
                className="px-2.5 py-1 rounded-lg border border-ink bg-yellow text-[11px] font-mono font-bold hover:translate-x-0.5 active:scale-95 transition-all cursor-pointer"
              >
                Ping qilish
              </button>
            </div>
          </div>

          {/* Card 2: Fallback Chain */}
          <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-muted tracking-wider">
                  Kaskadli Zaxira Zanjiri
                </span>
                <Sliders className="w-4 h-4 text-ink" />
              </div>
              <h3 className="font-display font-black text-xl text-ink mb-2">
                {config?.fallbackModels.length || 0} ta zaxira model
              </h3>
              <div className="space-y-1.5">
                {config?.fallbackModels.map((fm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs font-mono px-2.5 py-1 rounded-lg bg-cream border border-ink/20"
                  >
                    <span className="truncate max-w-[200px]">
                      {idx + 1}. {fm}
                    </span>
                    <span className="text-[10px] text-muted font-bold">Backup</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted font-mono">
              ⚡ Asosiy model taymout bo'lsa avtomatik navbatga o'tiladi.
            </p>
          </div>

          {/* Card 3: Model Ping Tester */}
          <div className="p-6 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-muted tracking-wider">
                  Tezkor Salomatlik Tekshiruvi
                </span>
                <Activity className="w-4 h-4 text-coral" />
              </div>
              <h3 className="font-display font-black text-xl text-ink mb-2">
                Sog'liq & Kechikish
              </h3>
              <p className="text-xs text-muted font-sans mb-4">
                Barcha bepul modellarni bir necha soniyada tekshirib, qaysi biri eng tez ishlayotganini aniqlang.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePingAllFree}
              className="w-full py-2.5 rounded-xl bg-coral hover:bg-coral/90 text-white font-mono font-bold text-xs border border-ink shadow-solid-sm hover:translate-x-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Bepul modellarni testlash</span>
            </button>
          </div>
        </div>

        {/* Live Playground & Configuration Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Configuration Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6">
            <div className="flex items-center justify-between border-b-2 border-ink pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-ink">
                  Tizim Sozlamalari
                </h3>
                <p className="text-xs font-mono text-muted">
                  Birlamchi model va taymout parametrlarini sozlash
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-4 py-2 rounded-xl bg-yellow hover:bg-yellow-hover border-2 border-ink text-ink font-mono font-bold text-xs shadow-solid-sm hover:translate-x-0.5 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Saqlash</span>
              </button>
            </div>

            {saveStatus && (
              <div className="p-3 rounded-xl bg-mint/30 border border-ink text-xs font-mono font-bold text-ink">
                {saveStatus}
              </div>
            )}

            {config && (
              <div className="space-y-5">
                {/* Primary Model Select */}
                <div>
                  <label className="block text-xs font-mono font-bold text-ink uppercase mb-2">
                    Birlamchi Model (Primary)
                  </label>
                  <select
                    value={config.primaryModel}
                    onChange={(e) =>
                      setConfig({ ...config, primaryModel: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-ink bg-cream font-mono text-xs font-bold text-ink focus:outline-none focus:bg-white"
                  >
                    {models
                      .filter((m) => m.isFree)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.id})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Timeout slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-mono font-bold text-ink uppercase">
                      Model Taymout Chegarasi
                    </label>
                    <span className="text-xs font-mono font-bold text-ink">
                      {config.timeoutSeconds} soniya
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={config.timeoutSeconds}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        timeoutSeconds: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-ink cursor-pointer"
                  />
                  <p className="text-[11px] text-muted font-mono mt-1">
                    Agar model shu vaqt ichida javob bermasa, kaskadli failover keyingi modelga o'tadi.
                  </p>
                </div>

                {/* Temperature slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-mono font-bold text-ink uppercase">
                      Harorat (Temperature)
                    </label>
                    <span className="text-xs font-mono font-bold text-ink">
                      {config.temperature}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={config.temperature}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        temperature: parseFloat(e.target.value),
                      })
                    }
                    className="w-full accent-ink cursor-pointer"
                  />
                </div>

                {/* Max Tokens */}
                <div>
                  <label className="block text-xs font-mono font-bold text-ink uppercase mb-2">
                    Maksimal Tokenlar (Max Tokens)
                  </label>
                  <input
                    type="number"
                    value={config.maxTokens}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        maxTokens: parseInt(e.target.value) || 1024,
                      })
                    }
                    className="w-full px-4 py-2 rounded-xl border-2 border-ink bg-cream font-mono text-xs font-bold text-ink"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Interactive Live Test Playground */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-5">
            <div className="border-b-2 border-ink pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-ink">
                  Jonli Sinov Maydoni (Playground)
                </h3>
                <p className="text-xs font-mono text-muted">
                  Modelning javob berish tezligi va streamingini jonli sinab ko'ring
                </p>
              </div>
              {playgroundModel && (
                <span className="px-2.5 py-1 rounded-full bg-yellow border border-ink text-[11px] font-mono font-bold">
                  {playgroundModel.split("/")[1] || playgroundModel}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <textarea
                value={playgroundPrompt}
                onChange={(e) => setPlaygroundPrompt(e.target.value)}
                rows={2}
                placeholder="Savol kiriting..."
                className="w-full p-3 rounded-xl border-2 border-ink bg-cream/30 text-xs sm:text-sm font-sans focus:outline-none focus:bg-white resize-none"
              />
              <button
                type="button"
                onClick={handleRunPlayground}
                disabled={isPlaying || !playgroundPrompt.trim()}
                className="py-2.5 px-4 rounded-xl bg-ink text-white font-mono font-bold text-xs shadow-solid-sm hover:translate-x-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 self-end disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {isPlaying ? (
                  <span>Streaming oqimi...</span>
                ) : (
                  <>
                    <span>Sinab ko'rish</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Response Box */}
            <div className="flex-1 min-h-[220px] max-h-[340px] overflow-y-auto p-4 rounded-2xl border-2 border-ink bg-[#FAF8F5]">
              {playgroundOutput ? (
                <ChatMessageContent content={playgroundOutput} />
              ) : (
                <div className="h-full flex items-center justify-center text-xs font-mono text-muted">
                  Test natijasi bu yerda real-time oqimda ko'rinadi...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Model Catalog Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-ink pb-5">
            <div>
              <h3 className="font-display font-black text-xl text-ink">
                Nous Portal Modellari Katalogi ({models.length} ta mavjud)
              </h3>
              <p className="text-xs font-mono text-muted">
                Har bir modelni alohida ping qilib, kechikish va javobini ko'rishingiz mumkin.
              </p>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Model nomi yoki ID qidirish..."
                className="px-3.5 py-2 rounded-xl border-2 border-ink bg-cream/30 text-xs font-mono text-ink placeholder:text-muted focus:outline-none focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowOnlyFree(!showOnlyFree)}
                className={`px-3.5 py-2 rounded-xl border-2 border-ink text-xs font-mono font-bold shadow-solid-sm active:scale-95 transition-all cursor-pointer ${
                  showOnlyFree ? "bg-mint text-ink" : "bg-white text-muted"
                }`}
              >
                {showOnlyFree ? "✓ Faqat bepul modellar" : "Barcha modellar"}
              </button>
            </div>
          </div>

          {/* Model Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModels.map((m) => {
              const ping = pingResults[m.id];
              const isPrimary = config?.primaryModel === m.id;
              const isFallback = config?.fallbackModels.includes(m.id);

              return (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border-2 border-ink flex flex-col justify-between transition-all ${
                    isPrimary
                      ? "bg-yellow/20 border-ink shadow-solid-sm"
                      : "bg-[#FAF8F5] hover:bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-display font-bold text-sm text-ink truncate">
                        {m.name}
                      </span>
                      {m.isFree ? (
                        <span className="px-2 py-0.5 rounded-full bg-mint border border-ink text-[10px] font-mono font-bold shrink-0">
                          FREE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-cream border border-ink text-[10px] font-mono text-muted shrink-0">
                          PAID
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-muted break-all mb-3">
                      {m.id}
                    </p>

                    {/* Ping Status */}
                    {ping && (
                      <div className="mb-3 p-2 rounded-lg bg-white border border-ink text-xs font-mono">
                        {ping.loading ? (
                          <span className="text-muted flex items-center gap-1.5">
                            <RefreshCw className="w-3 h-3 animate-spin" /> Ping yuborilmoqda...
                          </span>
                        ) : ping.ok ? (
                          <div className="text-ink flex flex-col gap-1">
                            <span className="text-mint font-bold flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-mint" /> OK ({ping.latencyMs}ms)
                            </span>
                            {ping.reply && (
                              <span className="text-[10px] text-muted truncate">
                                Javob: {ping.reply}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-coral font-bold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-coral" /> Xato: {ping.error}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-rule flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handlePingModel(m.id)}
                      disabled={ping?.loading}
                      className="px-2.5 py-1 rounded-lg border border-ink bg-white hover:bg-cream text-[11px] font-mono font-semibold text-ink shadow-solid-sm active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed"
                    >
                      Ping
                    </button>

                    <div className="flex items-center gap-1.5">
                      {isPrimary ? (
                        <span className="px-2.5 py-1 rounded-lg bg-yellow border border-ink text-[11px] font-mono font-bold text-ink">
                          Asosiy
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (config) {
                              setConfig({ ...config, primaryModel: m.id });
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg border border-ink bg-cream hover:bg-yellow text-[11px] font-mono font-semibold text-ink active:scale-95 transition-all cursor-pointer"
                        >
                          Asosiy qilish
                        </button>
                      )}

                      {!isPrimary && (
                        <button
                          type="button"
                          onClick={() => {
                            if (!config) return;
                            if (isFallback) {
                              setConfig({
                                ...config,
                                fallbackModels: config.fallbackModels.filter(
                                  (id) => id !== m.id
                                ),
                              });
                            } else {
                              setConfig({
                                ...config,
                                fallbackModels: [...config.fallbackModels, m.id],
                              });
                            }
                          }}
                          className={`px-2 py-1 rounded-lg border border-ink text-[10px] font-mono font-semibold shadow-solid-sm active:scale-95 transition-all cursor-pointer ${
                            isFallback ? "bg-coral text-white" : "bg-white text-ink"
                          }`}
                        >
                          {isFallback ? "- Zaxira" : "+ Zaxira"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
}
