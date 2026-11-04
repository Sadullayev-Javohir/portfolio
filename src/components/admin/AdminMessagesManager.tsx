"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Mail,
  Trash2,
  CheckCircle,
  Clock,
  Send,
  RefreshCw,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { ContactMessage } from "@/lib/contactService";

interface AdminMessagesManagerProps {
  pin: string;
}

export function AdminMessagesManager({ pin }: AdminMessagesManagerProps) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMessages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-pin": pin },
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMessages(data.messages || []);
      } else {
        setError(data.error || "Xabarlarni yuklab bo'lmadi.");
      }
    } catch {
      setError("Tarmoq xatosi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [pin]);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": pin,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: "read" } : m))
        );
      }
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Haqiqatan ham bu xabarni o'chirmoqchimisiz?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-pin": pin },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink shadow-solid flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-ink pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-yellow border-2 border-ink shadow-solid-sm flex items-center justify-center shrink-0">
            <Inbox className="w-5 h-5 text-ink" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-xl text-ink">
                Foydalanuvchilar Xabarlari
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-coral text-white font-mono text-[10px] font-bold">
                  {unreadCount} ta yangi
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-muted">
              Portfolio /contact sahifasidan yuborilgan barcha xabarlar ({messages.length} ta jami)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-xl border border-ink bg-cream hover:bg-yellow text-xs font-mono font-bold text-ink shadow-solid-sm active:scale-95 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Yangilash</span>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-peach border border-coral text-xs font-mono text-ink">
          {error}
        </div>
      )}

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="p-10 border-2 border-dashed border-ink/30 rounded-2xl flex flex-col items-center justify-center gap-2 text-center">
          <Mail className="w-8 h-8 text-muted/50" />
          <span className="font-display font-bold text-ink text-base">
            Hozircha xabarlar yo&apos;q
          </span>
          <span className="font-mono text-xs text-muted max-w-[340px]">
            Sayt foydalanuvchilari /contact orqali xabar yuborganida bu yerda saqlanadi.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => {
            const isUnread = msg.status === "unread";
            const dateStr = new Date(msg.createdAt).toLocaleString("uz-UZ", {
              timeZone: "Asia/Tashkent",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border-2 border-ink flex flex-col gap-3 transition-all ${
                  isUnread
                    ? "bg-[#FFF9EE] shadow-solid-sm border-ink"
                    : "bg-[#FAF8F5] opacity-90 hover:opacity-100"
                }`}
              >
                {/* Top: Sender & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/40 pb-2.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-bold text-base text-ink">
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="px-2.5 py-1 rounded-lg bg-white border border-ink/40 text-xs font-mono text-ink hover:border-ink hover:bg-yellow flex items-center gap-1 transition-colors"
                      title="Email orqali javob berish"
                    >
                      <Mail className="w-3 h-3 text-muted" />
                      <span>{msg.email}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-muted" />
                    </a>

                    {isUnread && (
                      <span className="px-2 py-0.5 rounded-full bg-coral/20 border border-coral text-[10px] font-mono font-bold text-coral">
                        YANGI
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
                      <Clock className="w-3 h-3" />
                      {dateStr}
                    </span>

                    {msg.telegramSent ? (
                      <span className="px-2 py-0.5 rounded-full bg-mint/30 border border-ink text-[10px] font-mono font-bold text-ink">
                        Telegram ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-cream border border-ink/40 text-[10px] font-mono text-muted">
                        Lokal saqlangan
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject if provided */}
                {msg.subject && (
                  <div className="text-xs font-mono font-bold text-ink bg-white/70 px-3 py-1.5 rounded-lg border border-line/50 self-start">
                    📌 Mavzu: {msg.subject}
                  </div>
                )}

                {/* Message Body */}
                <p className="font-sans text-sm leading-relaxed text-ink/90 whitespace-pre-wrap bg-white/50 p-3 rounded-xl border border-line/30">
                  {msg.message}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {isUnread && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(msg.id)}
                        className="px-3 py-1 rounded-lg bg-mint/40 hover:bg-mint border border-ink text-[11px] font-mono font-bold text-ink active:scale-95 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>O&apos;qildi deb belgilash</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    disabled={deletingId === msg.id}
                    className="p-1.5 rounded-lg border border-ink/30 text-muted hover:text-coral hover:border-coral transition-colors cursor-pointer"
                    title="Xabarni o'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
