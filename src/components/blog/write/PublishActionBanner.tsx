"use client";

import React from "react";
import { Save, ArrowUpRight } from "lucide-react";

interface PublishActionBannerProps {
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function PublishActionBanner({
  onSaveDraft,
  onPublish,
}: PublishActionBannerProps) {
  return (
    <section className="w-full bg-yellow border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Copy */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[8.5px] uppercase tracking-[1.2px] text-ink font-semibold">
            READY TO DEPLOY ARTICLE?
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-ink tracking-tight">
            Publish to javohir.engineer/blog with 1 click.
          </h2>
          <p className="font-sans text-xs text-[#3B3530]">
            Comments, reactions, and view counting will be activated automatically.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onSaveDraft}
            className="inline-flex items-center gap-1.5 px-4 sm:px-[18px] py-2.5 rounded-full border-2 border-ink bg-transparent hover:bg-yellow-hover active:translate-y-0.5 text-[12.5px] font-semibold text-ink transition-all cursor-pointer"
          >
            <span>Save Draft</span>
            <Save className="w-3.5 h-3.5 text-ink" />
          </button>

          <button
            type="button"
            onClick={onPublish}
            className="inline-flex items-center gap-1.5 px-5 sm:px-[22px] py-3 rounded-full border-2 border-ink bg-ink text-cream hover:bg-neutral-800 active:translate-y-0.5 text-[13px] font-semibold shadow-solid transition-all cursor-pointer"
          >
            <span>Publish Now 🚀</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cream" />
          </button>
        </div>
      </div>
    </section>
  );
}
