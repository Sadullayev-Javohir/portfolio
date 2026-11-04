"use client";

import React, { useState } from "react";
import { Heart, Eye, Bookmark } from "lucide-react";
import { ArticleData } from "@/data/articles";

interface ArticleEngagementBarProps {
  reactions: ArticleData["reactions"];
}

export function ArticleEngagementBar({ reactions }: ArticleEngagementBarProps) {
  const [likes, setLikes] = useState(reactions.likes);
  const [liked, setLiked] = useState(true);

  const [claps, setClaps] = useState(reactions.claps);
  const [clapped, setClapped] = useState(false);

  const [fires, setFires] = useState(reactions.fires);
  const [fired, setFired] = useState(false);

  const [bulbs, setBulbs] = useState(reactions.bulbs);
  const [bulbed, setBulbed] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(reactions.bookmarks);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleClap = () => {
    setClaps(claps + 1);
    setClapped(true);
  };

  const handleFire = () => {
    setFires(fires + 1);
    setFired(true);
  };

  const handleBulb = () => {
    setBulbs(bulbs + 1);
    setBulbed(true);
  };

  const handleBookmark = () => {
    if (bookmarked) {
      setBookmarkCount(bookmarkCount - 1);
      setBookmarked(false);
    } else {
      setBookmarkCount(bookmarkCount + 1);
      setBookmarked(true);
    }
  };

  return (
    <div className="w-full bg-white border-2 border-ink rounded-[18px] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Reactions Left */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="font-mono text-[8px] text-muted tracking-wider uppercase font-semibold mr-1">
          REACTIONS
        </span>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 ${
            liked ? "bg-coral text-cream" : "bg-cream text-ink hover:bg-coral/20"
          }`}
          title="Like this article"
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-cream text-cream" : "text-ink"}`} />
          <span className="font-mono text-[10px] font-semibold">{likes}</span>
        </button>

        {/* Clap Button */}
        <button
          onClick={handleClap}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 ${
            clapped ? "bg-yellow text-ink" : "bg-cream text-ink hover:bg-yellow/30"
          }`}
          title="Clap"
        >
          <span className="text-[11px] leading-none">👏</span>
          <span className="font-mono text-[10px] font-semibold">{claps}</span>
        </button>

        {/* Fire Button */}
        <button
          onClick={handleFire}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 ${
            fired ? "bg-coral/30 text-ink" : "bg-cream text-ink hover:bg-coral/20"
          }`}
          title="Fire"
        >
          <span className="text-[11px] leading-none">🔥</span>
          <span className="font-mono text-[10px] font-semibold">{fires}</span>
        </button>

        {/* Bulb Button */}
        <button
          onClick={handleBulb}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-transform active:scale-95 ${
            bulbed ? "bg-yellow/30 text-ink" : "bg-cream text-ink hover:bg-yellow/20"
          }`}
          title="Insightful"
        >
          <span className="text-[11px] leading-none">💡</span>
          <span className="font-mono text-[10px] font-semibold">{bulbs}</span>
        </button>
      </div>

      {/* Stats Right */}
      <div className="flex items-center gap-3.5">
        <div className="flex items-center gap-1.5 text-muted">
          <Eye className="w-3.5 h-3.5" />
          <span className="font-mono text-[9.5px] font-medium">{reactions.reads}</span>
        </div>

        <button
          onClick={handleBookmark}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[1.5px] border-ink transition-colors ${
            bookmarked ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream"
          }`}
          title="Save article"
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-cream text-cream" : "text-ink"}`} />
          <span className="font-mono text-[9px] font-medium">
            {bookmarked ? `Saved (${bookmarkCount})` : `Bookmark (${bookmarkCount})`}
          </span>
        </button>
      </div>
    </div>
  );
}
