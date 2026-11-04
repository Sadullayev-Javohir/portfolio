"use client";

import React from "react";
import { MessageSquare, Heart, Eye, Share2 } from "lucide-react";

interface PublishingConfigProps {
  commentsEnabled: boolean;
  onToggleComments: () => void;
  reactionsEnabled: boolean;
  onToggleReactions: () => void;
  viewsEnabled: boolean;
  onToggleViews: () => void;
  ogEnabled: boolean;
  onToggleOg: () => void;
  title: string;
  subtitle: string;
  slug: string;
}

export function PublishingConfig({
  commentsEnabled,
  onToggleComments,
  reactionsEnabled,
  onToggleReactions,
  viewsEnabled,
  onToggleViews,
  ogEnabled,
  onToggleOg,
  title,
  subtitle,
  slug,
}: PublishingConfigProps) {
  const cleanSlug = slug.replace(/^javohir\.engineer\/blog\//, "").replace(/^\/+/, "");
  const formattedUrl = `https://javohir.engineer › blog › ${cleanSlug || "realtime-signalr-duels"}`;

  return (
    <section className="w-full bg-white border-y-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 pb-11 flex flex-col gap-5">
        {/* Head */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
            Interactivity & Community Engagement Controls
          </h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-mint border-[1.5px] border-ink font-mono text-[8px] font-semibold text-ink tracking-wider uppercase">
            FEATURES: ACTIVE
          </span>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Toggles Column */}
          <div className="flex flex-col gap-3">
            {/* Toggle 1: Comments */}
            <div className="w-full bg-cream rounded-[14px] border-[1.5px] border-ink p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] font-semibold text-ink leading-snug">
                    Allow public comments & discussions
                  </span>
                  <span className="font-sans text-[11px] text-muted leading-tight">
                    Readers can comment, upvote threads, and ask technical questions.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleComments}
                aria-label="Toggle comments"
                className={`w-[44px] h-[24px] rounded-full p-[3px] transition-colors cursor-pointer shrink-0 flex items-center ${
                  commentsEnabled ? "bg-ink justify-end" : "bg-neutral-300 justify-start"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full transition-transform ${
                    commentsEnabled ? "bg-yellow" : "bg-white"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Reactions */}
            <div className="w-full bg-cream rounded-[14px] border-[1.5px] border-ink p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-coral" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] font-semibold text-ink leading-snug">
                    Enable multi-reactions (Likes ♥, Claps 👏, Fire 🔥, Bulb 💡)
                  </span>
                  <span className="font-sans text-[11px] text-muted leading-tight">
                    Let developers react to code snippets and architecture decisions.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleReactions}
                aria-label="Toggle reactions"
                className={`w-[44px] h-[24px] rounded-full p-[3px] transition-colors cursor-pointer shrink-0 flex items-center ${
                  reactionsEnabled ? "bg-ink justify-end" : "bg-neutral-300 justify-start"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full transition-transform ${
                    reactionsEnabled ? "bg-yellow" : "bg-white"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: View stats */}
            <div className="w-full bg-cream rounded-[14px] border-[1.5px] border-ink p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-mint/20 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] font-semibold text-ink leading-snug">
                    Display public view counter & read statistics
                  </span>
                  <span className="font-sans text-[11px] text-muted leading-tight">
                    Show &apos;1,420 reads&apos; publicly on article header and blog index.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleViews}
                aria-label="Toggle views counter"
                className={`w-[44px] h-[24px] rounded-full p-[3px] transition-colors cursor-pointer shrink-0 flex items-center ${
                  viewsEnabled ? "bg-ink justify-end" : "bg-neutral-300 justify-start"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full transition-transform ${
                    viewsEnabled ? "bg-yellow" : "bg-white"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 4: Social share cards */}
            <div className="w-full bg-cream rounded-[14px] border-[1.5px] border-ink p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4 text-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] font-semibold text-ink leading-snug">
                    Enable social share cards & OpenGraph preview
                  </span>
                  <span className="font-sans text-[11px] text-muted leading-tight">
                    Generates Twitter/LinkedIn card tags for javohir.engineer/blog.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleOg}
                aria-label="Toggle OpenGraph"
                className={`w-[44px] h-[24px] rounded-full p-[3px] transition-colors cursor-pointer shrink-0 flex items-center ${
                  ogEnabled ? "bg-ink justify-end" : "bg-neutral-300 justify-start"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-full transition-transform ${
                    ogEnabled ? "bg-yellow" : "bg-white"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* SEO Preview Column */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted font-medium">
              GOOGLE & SOCIAL META PREVIEW
            </span>
            <div className="w-full bg-cream rounded-[14px] border-2 border-[#E7DFD2] p-4 flex flex-col gap-1 shadow-xs">
              <span className="font-mono text-[8.5px] text-muted truncate">
                {formattedUrl}
              </span>
              <h3 className="font-sans text-[14px] font-semibold text-[#1A0DAB] hover:underline cursor-pointer leading-snug pt-0.5">
                {title || "How We Scaled Real-Time Duels to Sub-30ms with SignalR Core"}
              </h3>
              <p className="font-sans text-[11.5px] text-[#4D5156] leading-relaxed line-clamp-2">
                {subtitle ||
                  "Architectural decisions, Redis Pub/Sub backplane, and eliminating client-side cheating with server cadence checks by Javohir Sadullayev."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
