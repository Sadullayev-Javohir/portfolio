"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Heart, Eye, Bookmark, Share2, Check } from "lucide-react";
import { ArticleData } from "@/data/articles";
import { getOrCreateAuthorToken } from "@/lib/useClientIdentity";

interface ArticleEngagementBarProps {
  slug?: string;
  reactions?: ArticleData["reactions"];
  onStatsChange?: (stats: { views: number; likes: number }) => void;
}

export function ArticleEngagementBar({ slug, reactions, onStatsChange }: ArticleEngagementBarProps) {
  const [likes, setLikes] = useState<number>(reactions?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [views, setViews] = useState<number>(0);

  const [claps, setClaps] = useState<number>(reactions?.claps || 0);
  const [fires, setFires] = useState<number>(reactions?.fires || 0);
  const [bulbs, setBulbs] = useState<number>(reactions?.bulbs || 0);

  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Initialize and record view
  const initEngagement = useCallback(async () => {
    if (!slug) return;
    const token = getOrCreateAuthorToken();
    if (!token) return;

    // Check if device already viewed this article
    const viewedKey = `viewed_article_${slug}`;
    const alreadyViewed = typeof window !== "undefined" && !!localStorage.getItem(viewedKey);

    try {
      if (!alreadyViewed) {
        // Record new view once
        const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/engagement`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "view", token }),
        });
        const data = await res.json();
        if (data.ok) {
          localStorage.setItem(viewedKey, `${Date.now()}`);
        }
      }

      // Fetch current engagement stats & like status
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/engagement?token=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (data.ok && data.data) {
        setViews(data.data.views || 0);
        setLikes(data.data.likes || 0);
        setHasLiked(Boolean(data.data.hasLiked));
        setClaps(data.data.claps || 0);
        setFires(data.data.fires || 0);
        setBulbs(data.data.bulbs || 0);
        onStatsChange?.({ views: data.data.views || 0, likes: data.data.likes || 0 });
      }
    } catch (e) {
      console.warn("Engagement init error:", e);
    }
  }, [slug, onStatsChange]);

  useEffect(() => {
    initEngagement();

    if (slug && typeof window !== "undefined") {
      setBookmarked(localStorage.getItem(`bookmarked_${slug}`) === "true");
    }
  }, [slug, initEngagement]);

  // Handle Like Toggle
  const handleLike = async () => {
    if (!slug || isLiking) return;
    const token = getOrCreateAuthorToken();
    setIsLiking(true);

    // Optimistic UI update
    const nextHasLiked = !hasLiked;
    const nextLikes = nextHasLiked ? likes + 1 : Math.max(0, likes - 1);
    setHasLiked(nextHasLiked);
    setLikes(nextLikes);

    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}/engagement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", token }),
      });
      const data = await res.json();
      if (data.ok) {
        setLikes(data.likes);
        setHasLiked(data.hasLiked);
        onStatsChange?.({ views, likes: data.likes });
      }
    } catch {
      // Revert on error
      setHasLiked(!nextHasLiked);
      setLikes(likes);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReaction = async (kind: "claps" | "fires" | "bulbs") => {
    if (!slug) return;
    const token = getOrCreateAuthorToken();

    if (kind === "claps") setClaps((c) => c + 1);
    if (kind === "fires") setFires((f) => f + 1);
    if (kind === "bulbs") setBulbs((b) => b + 1);

    try {
      await fetch(`/api/blog/${encodeURIComponent(slug)}/engagement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reaction", token, reactionKind: kind }),
      });
    } catch (e) {
      console.warn("Reaction error:", e);
    }
  };

  const handleBookmark = () => {
    if (!slug) return;
    const nextState = !bookmarked;
    setBookmarked(nextState);
    if (typeof window !== "undefined") {
      localStorage.setItem(`bookmarked_${slug}`, String(nextState));
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-ink rounded-[18px] px-5 py-4 flex flex-wrap items-center justify-between gap-4 shadow-solid-sm">
      {/* Reactions Left */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="font-mono text-[8px] text-muted tracking-wider uppercase font-semibold mr-1">
          REACTIONS
        </span>

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-all active:scale-95 cursor-pointer ${
            hasLiked
              ? "bg-coral text-cream shadow-sm"
              : "bg-cream text-ink hover:bg-coral/20"
          }`}
          title={hasLiked ? "Liked (Unlike qilish uchun bosing)" : "Like bosish"}
        >
          <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-cream text-cream" : "text-ink"}`} />
          <span className="font-mono text-[10px] font-bold">{likes}</span>
        </button>

        {/* Clap Button */}
        <button
          onClick={() => handleReaction("claps")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 bg-cream text-ink hover:bg-yellow/30 cursor-pointer"
          title="Qarsak chalish"
        >
          <span className="text-[11px] leading-none">👏</span>
          <span className="font-mono text-[10px] font-semibold">{claps}</span>
        </button>

        {/* Fire Button */}
        <button
          onClick={() => handleReaction("fires")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 bg-cream text-ink hover:bg-coral/20 cursor-pointer"
          title="Olov"
        >
          <span className="text-[11px] leading-none">🔥</span>
          <span className="font-mono text-[10px] font-semibold">{fires}</span>
        </button>

        {/* Bulb Button */}
        <button
          onClick={() => handleReaction("bulbs")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 bg-cream text-ink hover:bg-yellow/30 cursor-pointer"
          title="G'oya"
        >
          <span className="text-[11px] leading-none">💡</span>
          <span className="font-mono text-[10px] font-semibold">{bulbs}</span>
        </button>
      </div>

      {/* Engagement Right (Views, Bookmark, Share) */}
      <div className="flex items-center gap-3">
        {/* Read / Views Count */}
        <div className="flex items-center gap-1.5 text-muted px-2 py-1 rounded-full bg-cream border border-ink/20">
          <Eye className="w-3.5 h-3.5 text-ink" />
          <span className="font-mono text-[9px] font-semibold text-ink uppercase tracking-wide">
            {views} {views === 1 ? "VIEW" : "VIEWS"}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full border-[1.5px] border-ink transition-colors cursor-pointer ${
            bookmarked ? "bg-yellow text-ink" : "bg-cream text-ink hover:bg-yellow/30"
          }`}
          title={bookmarked ? "Saqlangan (Bookmark)" : "Saqlash"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-ink text-ink" : "text-ink"}`} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-2 rounded-full border-[1.5px] border-ink bg-cream text-ink hover:bg-yellow/30 transition-colors cursor-pointer"
          title="Havoladan nusxa olish"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-mint" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
