"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Code,
  Bold,
  Italic,
  Link as LinkIcon,
  AtSign,
  CornerDownLeft,
  Edit2,
  Trash2,
  Reply,
  Check,
  X,
  MessageSquare,
  Loader2,
  Quote,
} from "lucide-react";
import { SanitizedBlogComment } from "@/lib/blogComments";
import {
  getOrCreateAuthorToken,
  getSavedAuthorName,
  saveAuthorName,
} from "@/lib/useClientIdentity";

interface ArticleCommentsSectionProps {
  slug?: string;
  initialComments?: any[];
  onCountChange?: (count: number) => void;
}

export function ArticleCommentsSection({ slug, onCountChange }: ArticleCommentsSectionProps) {
  const [comments, setComments] = useState<SanitizedBlogComment[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authorName, setAuthorName] = useState<string>("");
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Active reply form parent ID
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [isSubmittingReply, setIsSubmittingReply] = useState<boolean>(false);

  // Active edit comment ID
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState<boolean>(false);

  // Sorting
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Fetch comments from backend
  const loadComments = useCallback(async () => {
    if (!slug) return;
    const token = getOrCreateAuthorToken();
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/blog/${encodeURIComponent(slug)}/comments?token=${encodeURIComponent(token)}`
      );
      const data = await res.json();
      if (data.ok) {
        setComments(data.comments || []);
        const count = data.totalCount || 0;
        setTotalCount(count);
        onCountChange?.(count);
      }
    } catch (err) {
      console.warn("Failed to load comments:", err);
    } finally {
      setIsLoading(false);
    }
  }, [slug, onCountChange]);

  useEffect(() => {
    setAuthorName(getSavedAuthorName());
    loadComments();
  }, [loadComments]);

  // Insert markdown formatting into textarea
  const insertFormatting = (
    prefix: string,
    suffix: string,
    placeholder: string,
    isReply: boolean = false
  ) => {
    const targetRef = isReply ? replyTextareaRef : textareaRef;
    const targetValue = isReply ? replyText : newCommentText;
    const setTargetValue = isReply ? setReplyText : setNewCommentText;

    const textarea = targetRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = targetValue.substring(start, end) || placeholder;

    const before = targetValue.substring(0, start);
    const after = targetValue.substring(end);
    const updated = `${before}${prefix}${selected}${suffix}${after}`;

    setTargetValue(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 0);
  };

  // Post top-level comment
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !newCommentText.trim() || isSubmitting) return;

    const token = getOrCreateAuthorToken();
    const finalName = authorName.trim() || "Mehmon";
    saveAuthorName(finalName);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: finalName,
          authorToken: token,
          body: newCommentText.trim(),
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setNewCommentText("");
        await loadComments();
      } else {
        alert(data.error || "Izoh yuborishda xatolik yuz berdi.");
      }
    } catch {
      alert("Serverga ulanishda xatolik yuz berdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Post reply
  const handlePostReply = async (parentId: string) => {
    if (!slug || !replyText.trim() || isSubmittingReply) return;

    const token = getOrCreateAuthorToken();
    const finalName = authorName.trim() || "Mehmon";
    saveAuthorName(finalName);
    setIsSubmittingReply(true);

    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: finalName,
          authorToken: token,
          body: replyText.trim(),
          parentId,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setReplyText("");
        setReplyingToId(null);
        await loadComments();
      } else {
        alert(data.error || "Javob yuborishda xatolik.");
      }
    } catch {
      alert("Serverga ulanishda xatolik.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Edit comment
  const handleSaveEdit = async (commentId: string) => {
    if (!slug || !editText.trim() || isSubmittingEdit) return;

    const token = getOrCreateAuthorToken();
    setIsSubmittingEdit(true);

    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId,
          authorToken: token,
          body: editText.trim(),
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setEditingCommentId(null);
        setEditText("");
        await loadComments();
      } else {
        alert(data.error || "Tahrirlashda xatolik.");
      }
    } catch {
      alert("Server xatosi.");
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!slug) return;
    if (!confirm("Haqiqatan ham ushbu izohni o'chirmoqchimisiz?")) return;

    const token = getOrCreateAuthorToken();

    try {
      const res = await fetch(
        `/api/blog/${encodeURIComponent(slug)}/comments?id=${encodeURIComponent(commentId)}&token=${encodeURIComponent(token)}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (data.ok) {
        await loadComments();
      } else {
        alert(data.error || "O'chirishda xatolik.");
      }
    } catch {
      alert("Server xatosi.");
    }
  };

  // Format comment body text with simple markdown (bold, italic, code, link)
  const renderCommentBody = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lIdx) => {
      // Basic inline formatting regexes
      const parts: React.ReactNode[] = [];
      let cursor = 0;

      // Match code, bold, italic, links
      const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|@[a-zA-Z0-9_-]+)/g;
      let match;

      while ((match = regex.exec(line)) !== null) {
        if (match.index > cursor) {
          parts.push(line.substring(cursor, match.index));
        }

        const token = match[0];
        if (token.startsWith("`") && token.endsWith("`")) {
          parts.push(
            <code
              key={match.index}
              className="px-1.5 py-0.5 rounded bg-cream border border-ink/20 font-mono text-[11px] text-ink font-semibold"
            >
              {token.slice(1, -1)}
            </code>
          );
        } else if (token.startsWith("**") && token.endsWith("**")) {
          parts.push(<strong key={match.index} className="font-bold text-ink">{token.slice(2, -2)}</strong>);
        } else if (token.startsWith("*") && token.endsWith("*")) {
          parts.push(<em key={match.index} className="italic text-ink">{token.slice(1, -1)}</em>);
        } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
          const textMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
          if (textMatch) {
            parts.push(
              <a
                key={match.index}
                href={textMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue font-semibold hover:underline"
              >
                {textMatch[1]}
              </a>
            );
          }
        } else if (token.startsWith("@")) {
          parts.push(
            <span key={match.index} className="font-semibold text-blue bg-blue/10 px-1 py-0.5 rounded">
              {token}
            </span>
          );
        }

        cursor = regex.lastIndex;
      }

      if (cursor < line.length) {
        parts.push(line.substring(cursor));
      }

      return (
        <p key={lIdx} className="min-h-[1.2em]">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <section className="w-full bg-cream border-2 border-ink rounded-[22px] p-6 sm:p-7 shadow-solid flex flex-col gap-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-ink" />
          <h3 className="font-display text-[22px] sm:text-[24px] font-bold text-ink tracking-tight">
            Fikrlar va Muhokama
          </h3>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-ink border-[1.5px] border-ink font-mono text-[9px] font-bold text-cream uppercase tracking-wider">
            {totalCount} {totalCount === 1 ? "IZOH" : "IZOHLAR"}
          </span>
        </div>

        {/* Sort Group */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8px] text-muted tracking-wider uppercase font-semibold">
            TARTIBLASH:
          </span>
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-3 py-1 rounded-full border-[1.5px] border-ink font-mono text-[8.5px] font-bold transition-colors cursor-pointer ${
              sortOrder === "newest"
                ? "bg-yellow text-ink shadow-sm"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            Yangi
          </button>
          <button
            onClick={() => setSortOrder("oldest")}
            className={`px-3 py-1 rounded-full border-[1.5px] border-ink font-mono text-[8.5px] font-bold transition-colors cursor-pointer ${
              sortOrder === "oldest"
                ? "bg-yellow text-ink shadow-sm"
                : "bg-white text-muted hover:text-ink hover:bg-cream"
            }`}
          >
            Eski
          </button>
        </div>
      </div>

      {/* Leave Comment Card */}
      <form
        onSubmit={handlePostComment}
        className="w-full bg-white border-2 border-ink rounded-[18px] p-4 sm:p-5 flex flex-col gap-3.5 shadow-solid-sm"
      >
        {/* Name input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 flex-1">
            <div
              className="w-8 h-8 rounded-full border border-ink flex items-center justify-center font-mono text-xs font-bold text-cream shrink-0 shadow-sm"
              style={{ backgroundColor: "#4F7CFF" }}
            >
              {authorName.trim() ? authorName.trim().slice(0, 2).toUpperCase() : "ME"}
            </div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ism-familiyangiz (Masalan: Anvar Qodirov)"
              className="px-3 py-1.5 rounded-xl border border-ink/30 bg-cream/40 text-xs font-sans text-ink focus:outline-none focus:border-ink focus:bg-white flex-1 max-w-sm"
              required
            />
          </div>
          <span className="text-[10px] font-mono text-muted">
            O&apos;z izohlaringizni keyinchalik tahrirlashingiz yoki o&apos;chirishingiz mumkin
          </span>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Maqola bo'yicha savolingiz yoki fikringizni yozing..."
          className="w-full bg-cream/40 border-[1.5px] border-ink/30 rounded-xl p-3 text-[13px] text-ink font-sans placeholder:text-muted focus:outline-none focus:border-ink focus:bg-white transition-colors resize-y min-h-[85px]"
          required
        />

        {/* Toolbar & Submit button */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-ink/10">
          <div className="flex items-center gap-1.5 text-ink">
            <button
              type="button"
              onClick={() => insertFormatting("**", "**", "qalin matn")}
              className="p-1.5 rounded-lg hover:bg-yellow hover:text-ink transition-colors cursor-pointer"
              title="Qalin matn (**bold**)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("*", "*", "kursiv matn")}
              className="p-1.5 rounded-lg hover:bg-yellow hover:text-ink transition-colors cursor-pointer"
              title="Kursiv (*italic*)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("`", "`", "kod")}
              className="p-1.5 rounded-lg hover:bg-yellow hover:text-ink transition-colors cursor-pointer"
              title="Kod (`code`)"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("[", "](https://havola.uz)", "havola matni")}
              className="p-1.5 rounded-lg hover:bg-yellow hover:text-ink transition-colors cursor-pointer"
              title="Havola qo'shish [text](url)"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("@", " ", "foydalanuvchi")}
              className="p-1.5 rounded-lg hover:bg-yellow hover:text-ink transition-colors cursor-pointer"
              title="Belgilash (@nom)"
            >
              <AtSign className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newCommentText.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-cream border-[1.5px] border-ink hover:bg-yellow hover:text-ink active:scale-95 transition-all cursor-pointer disabled:opacity-50 font-sans text-xs font-bold shadow-solid-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Yuborilmoqda...</span>
              </>
            ) : (
              <>
                <span>Izoh qoldirish</span>
                <CornerDownLeft className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Loading state */}
      {isLoading && (
        <div className="py-8 flex items-center justify-center gap-2 text-muted font-mono text-xs">
          <Loader2 className="w-4 h-4 animate-spin text-ink" />
          <span>Izohlar yuklanmoqda...</span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && comments.length === 0 && (
        <div className="p-8 rounded-2xl bg-white border border-ink/20 text-center flex flex-col items-center justify-center gap-2">
          <MessageSquare className="w-8 h-8 text-muted/40" />
          <p className="font-sans text-sm text-muted">
            Hozircha izohlar yo&apos;q. Birinchi bo&apos;lib o&apos;z fikringizni bildiring!
          </p>
        </div>
      )}

      {/* Comment List */}
      <div className="flex flex-col gap-4">
        {sortedComments.map((comment) => (
          <div
            key={comment.id}
            className="w-full bg-white border-2 border-ink rounded-[18px] p-4 sm:p-5 flex flex-col gap-3 shadow-solid-sm"
          >
            {/* Top-level Comment Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full border border-ink flex items-center justify-center font-mono text-xs font-bold text-cream shrink-0 shadow-sm"
                  style={{ backgroundColor: comment.avatarBg || "#4F7CFF" }}
                >
                  {comment.authorName.slice(0, 2).toUpperCase()}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-sans text-[13px] font-bold text-ink">
                    {comment.authorName}
                  </span>
                  <span className="font-mono text-[9px] text-muted">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {comment.updatedAt && (
                    <span className="font-mono text-[8px] text-muted italic">
                      (tahrirlangan)
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons (Reply, Edit, Delete) */}
              <div className="flex items-center gap-1.5">
                {/* Reply button */}
                <button
                  type="button"
                  onClick={() => {
                    setReplyingToId(replyingToId === comment.id ? null : comment.id);
                    setReplyText("");
                  }}
                  className="p-1.5 rounded-lg border border-ink/20 hover:border-ink hover:bg-yellow text-ink transition-colors flex items-center gap-1 text-[11px] font-mono font-semibold cursor-pointer"
                  title="Javob berish"
                >
                  <Reply className="w-3 h-3" />
                  <span>Javob</span>
                </button>

                {/* Edit button (if owner) */}
                {comment.isOwner && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditText(comment.body);
                    }}
                    className="p-1.5 rounded-lg border border-ink/20 hover:border-ink hover:bg-cream text-ink transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                )}

                {/* Delete button (if owner) */}
                {comment.isOwner && (
                  <button
                    type="button"
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1.5 rounded-lg border border-coral/30 hover:border-coral hover:bg-peach text-coral transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Comment Body or Inline Edit Mode */}
            {editingCommentId === comment.id ? (
              <div className="flex flex-col gap-2 pt-1">
                <textarea
                  rows={2}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full bg-cream border border-ink rounded-xl p-2.5 text-xs font-sans text-ink focus:outline-none"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCommentId(null)}
                    className="px-3 py-1 rounded-full border border-ink/30 text-xs font-mono text-muted hover:text-ink cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(comment.id)}
                    disabled={isSubmittingEdit || !editText.trim()}
                    className="px-3.5 py-1 rounded-full bg-yellow border border-ink text-xs font-mono font-bold text-ink hover:bg-yellow-hover shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isSubmittingEdit ? "Saqlanmoqda..." : "Saqlash ✓"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="font-sans text-[13px] text-ink leading-relaxed break-words pl-0.5">
                {renderCommentBody(comment.body)}
              </div>
            )}

            {/* Inline Reply Form */}
            {replyingToId === comment.id && (
              <div className="mt-2 pt-3 border-t border-ink/10 flex flex-col gap-2 bg-cream/30 p-3 rounded-xl border border-ink/20">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-ink flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3 text-muted" />
                    {comment.authorName}ga javob yozish:
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplyingToId(null)}
                    className="text-muted hover:text-ink"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  ref={replyTextareaRef}
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Javobingizni yozing..."
                  className="w-full bg-white border border-ink/30 rounded-lg p-2.5 text-xs font-sans text-ink focus:outline-none focus:border-ink"
                />

                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertFormatting("**", "**", "matn", true)}
                      className="p-1 rounded hover:bg-yellow text-ink cursor-pointer"
                      title="Qalin"
                    >
                      <Bold className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("`", "`", "kod", true)}
                      className="p-1 rounded hover:bg-yellow text-ink cursor-pointer"
                      title="Kod"
                    >
                      <Code className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReplyingToId(null)}
                      className="px-2.5 py-1 text-xs font-mono text-muted hover:text-ink"
                    >
                      Bekor
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePostReply(comment.id)}
                      disabled={isSubmittingReply || !replyText.trim()}
                      className="px-3.5 py-1 rounded-full bg-ink text-cream border border-ink text-xs font-mono font-bold hover:bg-yellow hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingReply ? "Yuborilmoqda..." : "Javob berish"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 1-Level Threaded Replies List */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2 pt-2 border-t border-ink/10 flex flex-col gap-2.5 pl-3 sm:pl-6 border-l-2 border-l-yellow">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="p-3 rounded-xl bg-cream/40 border border-ink/20 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border border-ink flex items-center justify-center font-mono text-[10px] font-bold text-cream shrink-0"
                          style={{ backgroundColor: reply.avatarBg || "#FF6B5A" }}
                        >
                          {reply.authorName.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-sans text-xs font-bold text-ink">
                          {reply.authorName}
                        </span>
                        <span className="font-mono text-[8px] text-muted">
                          {new Date(reply.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      {/* Reply edit/delete buttons */}
                      {reply.isOwner && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(reply.id);
                              setEditText(reply.body);
                            }}
                            className="p-1 rounded text-ink hover:bg-cream cursor-pointer"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-2.5 h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(reply.id)}
                            className="p-1 rounded text-coral hover:bg-peach cursor-pointer"
                            title="O'chirish"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Reply body or edit */}
                    {editingCommentId === reply.id ? (
                      <div className="flex flex-col gap-1.5 pt-1">
                        <textarea
                          rows={2}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-white border border-ink rounded-lg p-2 text-xs font-sans text-ink focus:outline-none"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingCommentId(null)}
                            className="px-2 py-0.5 text-xs font-mono text-muted"
                          >
                            Bekor
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(reply.id)}
                            disabled={isSubmittingEdit || !editText.trim()}
                            className="px-3 py-0.5 rounded-full bg-yellow border border-ink text-xs font-mono font-bold text-ink"
                          >
                            Saqlash
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="font-sans text-xs text-ink leading-relaxed break-words pl-0.5">
                        {renderCommentBody(reply.body)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
