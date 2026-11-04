"use client";

import React from "react";
import Link from "next/link";
import { Save, Send } from "lucide-react";

export type ViewMode = "split" | "source" | "preview";

interface StudioTopbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSaving?: boolean;
  saveTimeText?: string;
}

export function StudioTopbar({
  viewMode,
  onViewModeChange,
  onSaveDraft,
  onPublish,
  isSaving = false,
  saveTimeText = "Draft autosaved to local · 12s ago",
}: StudioTopbarProps) {
  return (
    <div className="w-full bg-white border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Breadcrumbs + Autosave indicator */}
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[1.2px] uppercase">
            <Link
              href="/blog"
              className="text-muted hover:text-ink transition-colors font-medium"
            >
              JOURNAL
            </Link>
            <span className="text-muted">/</span>
            <span className="text-ink font-semibold">STUDIO / WRITE POST</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream border border-[#E7DFD2]">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-mint ${
                isSaving ? "animate-ping" : ""
              }`}
            />
            <span className="font-mono text-[8px] text-muted tracking-tight">
              {saveTimeText}
            </span>
          </div>
        </div>

        {/* Right: View Segments + Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Segmented View Switch */}
          <div className="inline-flex items-center p-[3px] bg-cream rounded-full border-[1.5px] border-ink gap-0.5 shadow-sm">
            <button
              type="button"
              onClick={() => onViewModeChange("split")}
              className={`px-2.5 py-1 rounded-full font-mono text-[8.5px] transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-ink text-cream shadow-xs font-semibold"
                  : "text-muted hover:text-ink"
              }`}
            >
              Split Editor
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("source")}
              className={`px-2.5 py-1 rounded-full font-mono text-[8.5px] transition-all cursor-pointer ${
                viewMode === "source"
                  ? "bg-ink text-cream shadow-xs font-semibold"
                  : "text-muted hover:text-ink"
              }`}
            >
              Source Only
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("preview")}
              className={`px-2.5 py-1 rounded-full font-mono text-[8.5px] transition-all cursor-pointer ${
                viewMode === "preview"
                  ? "bg-ink text-cream shadow-xs font-semibold"
                  : "text-muted hover:text-ink"
              }`}
            >
              Live Preview
            </button>
          </div>

          {/* Save Draft Button */}
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-ink bg-transparent hover:bg-cream active:translate-y-0.5 text-[12.5px] font-semibold text-ink transition-all cursor-pointer"
          >
            <span>Save draft</span>
            <Save className="w-3.5 h-3.5 text-ink" />
          </button>

          {/* Publish Button */}
          <button
            type="button"
            onClick={onPublish}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-ink bg-yellow hover:bg-yellow-hover active:translate-y-0.5 text-[12.5px] font-semibold text-ink shadow-solid-sm transition-all cursor-pointer"
          >
            <span>Publish Article 🚀</span>
            <Send className="w-3.5 h-3.5 text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}
