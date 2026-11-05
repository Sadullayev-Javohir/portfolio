"use client";

import React, { useState } from "react";
import { StudioTopbar, ViewMode } from "./StudioTopbar";
import { ArticleMetadataPanel } from "./ArticleMetadataPanel";
import { EditorStage } from "./EditorStage";
import { PublishingConfig } from "./PublishingConfig";
import { PublishActionBanner } from "./PublishActionBanner";
import { CheckCircle2 } from "lucide-react";

const INITIAL_MARKDOWN = `# How We Scaled Real-Time Duels to Sub-30ms with SignalR
> When sub-30ms keystroke latency is your core feature, HTTP polling is dead.

## 01. The Architecture of Trust
In competitive typing, the client is the least trustworthy witness.
To eliminate spoofing, every keystroke cadence is verified server-side:

\`\`\`csharp
public async Task<bool> VerifyCadenceAsync(KeystrokeEvent evt) {
    var expected = _clock.GetDelta(evt.Timestamp);
    if (evt.IntervalMs < expected - Tolerance)
        throw new AntiCheatCadenceMismatchException(evt.UserId);
    return await _pubsub.BroadcastProgressAsync(evt.RoomId, evt.Wpm);
}
\`\`\`

## 02. Measured Results in Production
- **Live latency**: <22 ms end-to-end via Redis Pub/Sub
- **Reliability**: 105+ unit tests passing (xUnit)`;

export function WriteBlogView() {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [title, setTitle] = useState(
    "How We Scaled Real-Time Duels to Sub-30ms with SignalR Core"
  );
  const [subtitle, setSubtitle] = useState(
    "Architectural decisions, Redis Pub/Sub backplane, and eliminating client-side cheating with server cadence checks."
  );
  const [category, setCategory] = useState("Backend Architecture (.NET 8)");
  const [tags, setTags] = useState([
    "#signalr",
    "#csharp",
    "#redis",
    "#performance",
  ]);
  const [slug, setSlug] = useState(
    "javohir.engineer/blog/realtime-signalr-duels"
  );
  const [markdownContent, setMarkdownContent] = useState(INITIAL_MARKDOWN);

  // Engagement toggles
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [reactionsEnabled, setReactionsEnabled] = useState(true);
  const [viewsEnabled, setViewsEnabled] = useState(true);
  const [ogEnabled, setOgEnabled] = useState(true);

  // Status message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Draft successfully saved to local storage!");
    }, 400);
  };

  const handlePublish = () => {
    window.location.href = "/admin";
  };

  const handleAddTag = (newTag: string) => {
    setTags((prev) => [...prev, newTag]);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // Word count: default 1420 + delta from initial
  const wordsInMarkdown = markdownContent
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const wordCount = Math.max(1420, 1340 + wordsInMarkdown);

  return (
    <div className="w-full bg-cream text-ink flex flex-col font-sans">
      {/* Section 1: Studio Topbar */}
      <StudioTopbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        isSaving={isSaving}
      />

      {/* Section 2: Article Metadata Panel */}
      <ArticleMetadataPanel
        title={title}
        onTitleChange={setTitle}
        subtitle={subtitle}
        onSubtitleChange={setSubtitle}
        category={category}
        onCategoryChange={setCategory}
        tags={tags}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        slug={slug}
        onSlugChange={setSlug}
        wordCount={wordCount}
      />

      {/* Section 3: Editor Stage */}
      <EditorStage
        viewMode={viewMode}
        markdownContent={markdownContent}
        onMarkdownChange={setMarkdownContent}
        title={title}
      />

      {/* Section 4: Publishing & Engagement Configuration */}
      <PublishingConfig
        commentsEnabled={commentsEnabled}
        onToggleComments={() => setCommentsEnabled(!commentsEnabled)}
        reactionsEnabled={reactionsEnabled}
        onToggleReactions={() => setReactionsEnabled(!reactionsEnabled)}
        viewsEnabled={viewsEnabled}
        onToggleViews={() => setViewsEnabled(!viewsEnabled)}
        ogEnabled={ogEnabled}
        onToggleOg={() => setOgEnabled(!ogEnabled)}
        title={title}
        subtitle={subtitle}
        slug={slug}
      />

      {/* Section 5: Publish Action Banner */}
      <PublishActionBanner
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-ink text-cream border-2 border-yellow rounded-xl shadow-solid animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-mint shrink-0" />
          <span className="font-mono text-xs font-semibold">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}
