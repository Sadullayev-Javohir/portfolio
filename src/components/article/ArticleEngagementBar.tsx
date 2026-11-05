"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Heart, Eye, Share2, Check } from "lucide-react";
import { ArticleData } from "@/data/articles";
import { getOrCreateAuthorToken } from "@/lib/useClientIdentity";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleEngagementBarProps {
  slug?: string;
  reactions?: ArticleData["reactions"];
  onStatsChange?: (stats: { views: number; likes: number }) => void;
}

export function ArticleEngagementBar({ slug, reactions, onStatsChange }: ArticleEngagementBarProps) {
  const { dict } = useLanguage();
  const b = dict.blogPage;
  const [likes, setLikes] = useState<number>(reactions?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [views, setViews] = useState<number>(0);
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
        // Record new view once per device
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
        onStatsChange?.({ views: data.data.views || 0, likes: data.data.likes || 0 });
      }
    } catch (e) {
      console.warn("Engagement init error:", e);
    }
  }, [slug, onStatsChange]);

  useEffect(() => {
    initEngagement();
  }, [initEngagement]);

  // Handle Like Toggle: only 1 like per device, clicking toggles ON/OFF
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-ink rounded-[20px] px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-solid-sm">
      {/* Like Button Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`group flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 border-ink transition-all active:scale-95 cursor-pointer shadow-solid-sm hover:shadow-solid ${
            hasLiked
              ? "bg-coral text-cream border-ink"
              : "bg-cream text-ink hover:bg-coral/20"
          }`}
          title={hasLiked ? b.liked : b.likePrompt}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              hasLiked ? "fill-cream text-cream" : "text-ink"
            }`}
          />
          <span className="font-mono text-xs font-bold tracking-wide">
            {hasLiked ? b.liked : b.like}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-mono text-xs font-bold ${
              hasLiked ? "bg-white/20 text-cream" : "bg-white text-ink border border-ink/30"
            }`}
          >
            {likes}
          </span>
        </button>
        <span className="text-xs font-mono text-muted hidden sm:inline">
          {hasLiked ? b.likeThanks : b.likePrompt}
        </span>
      </div>

      {/* Engagement Right (Views, Share) */}
      <div className="flex items-center gap-3">
        {/* Read / Views Count */}
        <div className="flex items-center gap-2 text-ink px-3.5 py-2 rounded-full bg-cream border border-ink/30 shadow-sm">
          <Eye className="w-4 h-4 text-ink" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            {views} {b.viewsLabel}
          </span>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-ink bg-cream text-ink hover:bg-yellow hover:shadow-solid-sm transition-all cursor-pointer font-mono text-xs font-bold"
          title={b.share}
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-mint stroke-[3]" />
              <span className="text-ink">{b.copied}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-ink" />
              <span>{b.share}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
