"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Code,
  Bold,
  Italic,
  Link as LinkIcon,
  AtSign,
  CornerDownLeft,
  ThumbsUp,
  Heart,
  ChevronDown,
} from "lucide-react";
import { ArticleComment } from "@/data/articles";

interface ArticleCommentsSectionProps {
  initialComments: ArticleComment[];
}

export function ArticleCommentsSection({ initialComments }: ArticleCommentsSectionProps) {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments);
  const [sortOrder, setSortOrder] = useState<"upvoted" | "newest">("upvoted");
  const [newCommentText, setNewCommentText] = useState("");
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  const [replyHearted, setReplyHearted] = useState(false);
  const [replyHeartCount, setReplyHeartCount] = useState(12);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: `c-${Date.now()}`,
      name: "Javohir Sadullayev",
      avatar: "/javohir.jpg",
      role: "AUTHOR",
      isAuthor: true,
      time: "· just now",
      upvotes: 1,
      body: newCommentText.trim(),
    };

    setComments([newComment, ...comments]);
    setNewCommentText("");
  };

  const handleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const isCurrentlyUpvoted = !!prev[id];
      const nextState = { ...prev, [id]: !isCurrentlyUpvoted };

      setComments((prevComments) =>
        prevComments.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              upvotes: isCurrentlyUpvoted ? c.upvotes - 1 : c.upvotes + 1,
            };
          }
          return c;
        })
      );

      return nextState;
    });
  };

  const handleReplyHeart = () => {
    if (replyHearted) {
      setReplyHeartCount(replyHeartCount - 1);
      setReplyHearted(false);
    } else {
      setReplyHeartCount(replyHeartCount + 1);
      setReplyHearted(true);
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === "upvoted") {
      return b.upvotes - a.upvotes;
    }
    return 0; // maintain insertion order for newest
  });

  return (
    <section className="w-full bg-cream border-2 border-ink rounded-[22px] p-6 sm:p-7 shadow-[6px_6px_0px_#14110F] flex flex-col gap-5">
      {/* Comments Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <h3 className="font-display text-[22px] sm:text-[24px] font-bold text-ink tracking-[-0.6px]">
            Discussion & Comments
          </h3>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-ink border-[1.5px] border-ink font-mono text-[8px] text-cream uppercase tracking-wider">
            {comments.length + 22} COMMENTS
          </span>
        </div>

        {/* Sort Group */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7.5px] text-muted tracking-wider uppercase font-semibold">
            SORT BY:
          </span>
          <button
            onClick={() => setSortOrder("upvoted")}
            className={`px-2.5 py-1 rounded-full border-[1.5px] border-ink font-mono text-[8px] transition-colors ${
              sortOrder === "upvoted"
                ? "bg-yellow text-ink font-bold"
                : "bg-white text-ink hover:bg-cream"
            }`}
          >
            Most Upvoted
          </button>
          <button
            onClick={() => setSortOrder("newest")}
            className={`px-2.5 py-1 rounded-full border-[1.5px] border-ink font-mono text-[8px] transition-colors ${
              sortOrder === "newest"
                ? "bg-yellow text-ink font-bold"
                : "bg-white text-ink hover:bg-cream"
            }`}
          >
            Newest
          </button>
        </div>
      </div>

      {/* Leave Comment Card */}
      <form
        onSubmit={handlePostComment}
        className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-4 sm:p-5 flex flex-col gap-3 shadow-sm"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full border-[1.5px] border-ink overflow-hidden bg-yellow shrink-0">
            <Image
              src="/javohir.jpg"
              alt="Javohir Sadullayev"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-sans text-[13px] font-semibold text-ink">
            Javohir Sadullayev
          </span>
          <span className="px-2 py-0.5 rounded-full bg-yellow border-[1.5px] border-ink font-mono text-[7.5px] text-ink font-semibold uppercase tracking-wider">
            AUTHOR
          </span>
        </div>

        <textarea
          rows={3}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a thoughtful comment, question, or share how you handle Redis caching in .NET..."
          className="w-full bg-cream border-[1.5px] border-rule rounded-[10px] p-3 text-[12.5px] text-ink font-sans placeholder:text-muted focus:outline-none focus:border-ink transition-colors resize-none"
        />

        <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
          <div className="flex items-center gap-2.5 text-muted">
            <button
              type="button"
              className="p-1 hover:text-ink transition-colors"
              title="Insert code"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-ink transition-colors"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-ink transition-colors"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-ink transition-colors"
              title="Insert link"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-ink transition-colors"
              title="Mention someone"
            >
              <AtSign className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-cream border-[1.5px] border-ink hover:bg-ink/90 active:scale-95 transition-all"
          >
            <span className="font-display text-[12px] font-semibold">Post comment</span>
            <CornerDownLeft className="w-3 h-3 text-cream" />
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="flex flex-col gap-4">
        {sortedComments.map((comment) => {
          const isUpvoted = !!upvotedIds[comment.id];
          return (
            <div
              key={comment.id}
              className="w-full bg-white border-[1.5px] border-ink rounded-[16px] p-4 sm:p-5 flex flex-col gap-3 shadow-sm"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  {comment.avatar ? (
                    <div className="relative w-8 h-8 rounded-full border border-ink overflow-hidden bg-yellow shrink-0">
                      <Image
                        src={comment.avatar}
                        alt={comment.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full border border-ink flex items-center justify-center shrink-0"
                      style={{ backgroundColor: comment.avatarBg || "#4F7CFF" }}
                    >
                      <span className="font-mono text-[11px] font-semibold text-cream">
                        {comment.initials || "FA"}
                      </span>
                    </div>
                  )}

                  <span className="font-sans text-[13px] font-semibold text-ink">
                    {comment.name}
                  </span>

                  <span className="px-2 py-0.5 rounded-full bg-cream border-[1.5px] border-ink font-mono text-[7.5px] text-ink uppercase tracking-wider font-semibold">
                    {comment.role}
                  </span>

                  <span className="font-mono text-[8px] text-muted">{comment.time}</span>
                </div>

                {/* Upvote Button */}
                <button
                  onClick={() => handleUpvote(comment.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-ink transition-colors ${
                    isUpvoted ? "bg-mint text-ink font-bold" : "bg-cream text-ink hover:bg-mint/30"
                  }`}
                  title="Upvote comment"
                >
                  <ThumbsUp className="w-3 h-3 text-ink" />
                  <span className="font-mono text-[9px] font-semibold">{comment.upvotes}</span>
                </button>
              </div>

              {/* Comment Body */}
              <p className="font-sans text-[13px] text-ink-soft leading-relaxed">
                {comment.body}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1 font-sans text-[11px]">
                <button className="font-semibold text-blue hover:underline">Reply</button>
                <span className="text-muted">·</span>
                <button className="text-muted hover:text-ink">Share</button>
              </div>

              {/* Nested Reply */}
              {comment.reply && (
                <div className="mt-2 w-full bg-cream border border-ink rounded-[14px] p-3.5 sm:p-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full border border-ink overflow-hidden bg-yellow shrink-0">
                        <Image
                          src={comment.reply.avatar}
                          alt={comment.reply.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-sans text-[12px] font-semibold text-ink">
                        {comment.reply.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-yellow border-[1.5px] border-ink font-mono text-[7px] text-ink uppercase tracking-wider font-semibold">
                        {comment.reply.role}
                      </span>
                      <span className="font-mono text-[7.5px] text-muted">
                        {comment.reply.time}
                      </span>
                    </div>

                    <button
                      onClick={handleReplyHeart}
                      className="flex items-center gap-1 text-ink hover:text-coral transition-colors"
                      title="Heart reply"
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          replyHearted ? "fill-coral text-coral" : "text-coral"
                        }`}
                      />
                      <span className="font-mono text-[8.5px] font-semibold text-ink">
                        {replyHeartCount}
                      </span>
                    </button>
                  </div>

                  <p className="font-sans text-[12px] text-ink-soft leading-relaxed">
                    {comment.reply.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="w-full flex justify-center pt-2">
        <button
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-[1.5px] border-ink bg-transparent hover:bg-white transition-colors"
        >
          <span className="font-mono text-[10px] font-semibold text-ink">
            Load 21 more comments
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-ink" />
        </button>
      </div>
    </section>
  );
}
