"use client";

import React, { useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  Image as ImageIcon,
  Table,
} from "lucide-react";
import { ViewMode } from "./StudioTopbar";

interface EditorStageProps {
  viewMode: ViewMode;
  markdownContent: string;
  onMarkdownChange: (content: string) => void;
  title: string;
}

export function EditorStage({
  viewMode,
  markdownContent,
  onMarkdownChange,
  title,
}: EditorStageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertSyntax = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdownContent.substring(start, end);
    const replacement = `${prefix}${selected || "text"}${suffix}`;

    const newContent =
      markdownContent.substring(0, start) +
      replacement +
      markdownContent.substring(end);

    onMarkdownChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + replacement.length - suffix.length
      );
    }, 10);
  };

  const lines = markdownContent.split("\n");

  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-8 flex flex-col gap-4">
        {/* Markdown Toolbar */}
        <div className="w-full bg-white rounded-[14px] border-2 border-ink px-4 py-2.5 flex items-center justify-between flex-wrap gap-3 shadow-xs">
          {/* Tools Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {/* H1 */}
            <button
              type="button"
              onClick={() => insertSyntax("# ")}
              className="px-2 py-1 rounded-md bg-cream border border-ink font-mono text-[8.5px] font-bold text-ink hover:bg-yellow transition-colors cursor-pointer"
            >
              H1
            </button>
            {/* H2 */}
            <button
              type="button"
              onClick={() => insertSyntax("## ")}
              className="px-2 py-1 rounded-md bg-yellow border border-ink font-mono text-[8.5px] font-bold text-ink hover:bg-yellow-hover transition-colors cursor-pointer"
            >
              H2
            </button>
            {/* H3 */}
            <button
              type="button"
              onClick={() => insertSyntax("### ")}
              className="px-2 py-1 rounded-md bg-cream border border-ink font-mono text-[8.5px] font-bold text-ink hover:bg-yellow transition-colors cursor-pointer"
            >
              H3
            </button>

            {/* Separator */}
            <div className="w-[1px] h-4 bg-[#E7DFD2] mx-0.5" />

            {/* Bold */}
            <button
              type="button"
              onClick={() => insertSyntax("**", "**")}
              title="Bold"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>

            {/* Italic */}
            <button
              type="button"
              onClick={() => insertSyntax("*", "*")}
              title="Italic"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>

            {/* Strikethrough */}
            <button
              type="button"
              onClick={() => insertSyntax("~~", "~~")}
              title="Strikethrough"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>

            {/* Code */}
            <button
              type="button"
              onClick={() => insertSyntax("`", "`")}
              title="Inline Code"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5" />
            </button>

            {/* Quote */}
            <button
              type="button"
              onClick={() => insertSyntax("> ")}
              title="Blockquote"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>

            {/* List */}
            <button
              type="button"
              onClick={() => insertSyntax("- ")}
              title="Bullet List"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
            </button>

            {/* Ordered List */}
            <button
              type="button"
              onClick={() => insertSyntax("1. ")}
              title="Numbered List"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>

            {/* Image */}
            <button
              type="button"
              onClick={() => insertSyntax("![alt text](", ")")}
              title="Image"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>

            {/* Table */}
            <button
              type="button"
              onClick={() =>
                insertSyntax("\n| Col 1 | Col 2 |\n|---|---|\n| val 1 | val 2 |\n")
              }
              title="Table"
              className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-cream border border-transparent hover:border-ink/20 text-ink transition-colors cursor-pointer"
            >
              <Table className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Stats on Right */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] font-semibold text-emerald-700 tracking-wide bg-mint/30 px-2 py-0.5 rounded-full border border-mint">
              MARKDOWN (MDX) · VALID ✓
            </span>
          </div>
        </div>

        {/* Split Area */}
        <div
          className={`w-full grid gap-5 ${
            viewMode === "split"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* Left: Markdown Source Editor */}
          {(viewMode === "split" || viewMode === "source") && (
            <div className="w-full bg-ink rounded-[18px] border-2 border-ink shadow-[5px_5px_0px_#14110F] overflow-hidden flex flex-col min-h-[480px]">
              {/* Editor Pane Head */}
              <div className="w-full border-b border-[#2A2622] px-4 py-2.5 flex items-center justify-between bg-[#14110F]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#222730] border-[1.5px] border-[#3A3530] font-mono text-[8px] text-cream tracking-wider font-medium">
                    realtime-duels.mdx
                  </span>
                </div>
                <div className="font-mono text-[7.5px] text-[#8F8678] tracking-tight">
                  Ln {lines.length}, Col {lines[lines.length - 1]?.length || 0} · UTF-8
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="relative flex-1 p-4 font-mono text-[9px] leading-[1.65] bg-[#14110F] overflow-x-auto">
                <textarea
                  ref={textareaRef}
                  value={markdownContent}
                  onChange={(e) => onMarkdownChange(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full min-h-[420px] bg-transparent text-cream font-mono text-[9.5px] leading-[1.7] resize-none focus:outline-none selection:bg-yellow selection:text-ink"
                  style={{ tabSize: 4 }}
                />
              </div>
            </div>
          )}

          {/* Right: Live Rendered Preview */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div className="w-full bg-white rounded-[18px] border-2 border-ink shadow-[5px_5px_0px_#14110F] p-6 flex flex-col gap-3.5 min-h-[480px]">
              {/* Preview Head */}
              <div className="flex items-center justify-between pb-1 border-b border-[#E7DFD2]">
                <span className="px-2 py-0.5 rounded-full bg-yellow border-[1.5px] border-ink font-mono text-[8px] font-semibold text-ink tracking-wider">
                  LIVE PREVIEW
                </span>
                <div className="flex items-center gap-2.5 font-mono text-[8px] text-muted">
                  <span>👁 0 views</span>
                  <span>·</span>
                  <span>♥ 0 likes</span>
                  <span>·</span>
                  <span>💬 0 comments</span>
                </div>
              </div>

              {/* Live Rendered Content */}
              <h1 className="font-display text-xl sm:text-[22px] font-bold text-ink leading-[1.15] tracking-tight">
                {title || "Untitled Article"}
              </h1>

              {/* Blockquote */}
              <blockquote className="w-full bg-cream rounded-r-md border-l-[3px] border-ink p-3 text-[#3B3530] text-[11.5px] leading-relaxed italic">
                “When sub-30ms keystroke latency is your core feature, HTTP polling is dead.”
              </blockquote>

              {/* H2 */}
              <h2 className="font-display text-[16px] font-bold text-ink tracking-tight pt-1">
                01. The Architecture of Trust
              </h2>

              {/* Paragraph */}
              <p className="text-[#3B3530] text-[11.5px] leading-relaxed">
                In competitive typing, the client is the least trustworthy witness.
                To eliminate spoofing, every keystroke cadence is verified server-side.
              </p>

              {/* Rendered Code Box */}
              <div className="w-full bg-ink rounded-[10px] p-3.5 flex flex-col gap-0.5 font-mono text-[8.5px] leading-[1.6] overflow-x-auto shadow-inner">
                <span className="text-cream">
                  public async Task&lt;bool&gt; VerifyCadenceAsync(KeystrokeEvent evt) &#123;
                </span>
                <span className="text-sky pl-4">
                  var expected = _clock.GetDelta(evt.Timestamp);
                </span>
                <span className="text-mint pl-4">
                  return await _pubsub.BroadcastProgressAsync(roomId, evt.Wpm);
                </span>
                <span className="text-cream">&#125;</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
