import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface BlogComment {
  id: string;
  articleSlug: string;
  parentId?: string | null;
  authorName: string;
  authorTokenHash: string;
  avatarBg?: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SanitizedBlogComment {
  id: string;
  articleSlug: string;
  parentId?: string | null;
  authorName: string;
  avatarBg?: string;
  isOwner?: boolean;
  body: string;
  createdAt: string;
  updatedAt?: string;
  replies?: SanitizedBlogComment[];
}

const COMMENTS_FILE = path.join(process.cwd(), "src/data/blogComments.json");

function ensureFile() {
  try {
    const dir = path.dirname(COMMENTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(COMMENTS_FILE)) {
      fs.writeFileSync(COMMENTS_FILE, "[]", "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure comments file:", err);
  }
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const AVATAR_COLORS = ["#4F7CFF", "#FF6B5A", "#F4B840", "#22C55E", "#A855F7", "#14110F", "#EC4899"];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export function getAllComments(): BlogComment[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(COMMENTS_FILE, "utf-8");
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function saveAllComments(comments: BlogComment[]) {
  ensureFile();
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2), "utf-8");
}

export function getArticleComments(slug: string, clientToken?: string): SanitizedBlogComment[] {
  const all = getAllComments();
  const articleComments = all.filter((c) => c.articleSlug === slug);
  const clientHash = clientToken ? hashToken(clientToken) : "";

  // Sanitize and check ownership
  const sanitizedList: SanitizedBlogComment[] = articleComments.map((c) => ({
    id: c.id,
    articleSlug: c.articleSlug,
    parentId: c.parentId || null,
    authorName: c.authorName,
    avatarBg: c.avatarBg || getAvatarColor(c.authorName),
    isOwner: Boolean(clientHash && c.authorTokenHash === clientHash),
    body: c.body,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  }));

  // Build 1-level threaded structure: top-level comments with replies array
  const topLevel: SanitizedBlogComment[] = [];
  const repliesMap: Record<string, SanitizedBlogComment[]> = {};

  for (const c of sanitizedList) {
    if (c.parentId) {
      if (!repliesMap[c.parentId]) repliesMap[c.parentId] = [];
      repliesMap[c.parentId].push(c);
    } else {
      topLevel.push(c);
    }
  }

  // Sort top-level by newest first
  topLevel.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Attach and sort replies (oldest first for natural conversation flow)
  for (const parent of topLevel) {
    const replies = repliesMap[parent.id] || [];
    replies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    parent.replies = replies;
  }

  return topLevel;
}

export function getArticleCommentsCount(slug: string): number {
  const all = getAllComments();
  return all.filter((c) => c.articleSlug === slug).length;
}

export function addComment(params: {
  articleSlug: string;
  authorName: string;
  authorToken: string;
  body: string;
  parentId?: string | null;
}): SanitizedBlogComment {
  const all = getAllComments();
  const authorName = params.authorName.trim() || "Foydalanuvchi";
  const body = params.body.trim();
  const tokenHash = hashToken(params.authorToken);
  const avatarBg = getAvatarColor(authorName);

  const newComment: BlogComment = {
    id: `com_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    articleSlug: params.articleSlug,
    parentId: params.parentId || null,
    authorName,
    authorTokenHash: tokenHash,
    avatarBg,
    body,
    createdAt: new Date().toISOString(),
  };

  all.push(newComment);
  saveAllComments(all);

  return {
    id: newComment.id,
    articleSlug: newComment.articleSlug,
    parentId: newComment.parentId,
    authorName: newComment.authorName,
    avatarBg: newComment.avatarBg,
    isOwner: true,
    body: newComment.body,
    createdAt: newComment.createdAt,
    replies: [],
  };
}

export function editComment(params: {
  commentId: string;
  authorToken: string;
  newBody: string;
}): { success: boolean; comment?: SanitizedBlogComment; error?: string } {
  const all = getAllComments();
  const index = all.findIndex((c) => c.id === params.commentId);
  if (index === -1) {
    return { success: false, error: "Izoh topilmadi." };
  }

  const comment = all[index];
  const clientHash = hashToken(params.authorToken);

  if (comment.authorTokenHash !== clientHash) {
    return { success: false, error: "Faqat o'zingiz yozgan izohni tahrirlashingiz mumkin." };
  }

  comment.body = params.newBody.trim();
  comment.updatedAt = new Date().toISOString();
  saveAllComments(all);

  return {
    success: true,
    comment: {
      id: comment.id,
      articleSlug: comment.articleSlug,
      parentId: comment.parentId,
      authorName: comment.authorName,
      avatarBg: comment.avatarBg,
      isOwner: true,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    },
  };
}

export function deleteComment(params: {
  commentId: string;
  authorToken?: string;
  isAdmin?: boolean;
}): { success: boolean; error?: string } {
  const all = getAllComments();
  const index = all.findIndex((c) => c.id === params.commentId);
  if (index === -1) {
    return { success: false, error: "Izoh topilmadi." };
  }

  const comment = all[index];
  const clientHash = params.authorToken ? hashToken(params.authorToken) : "";
  const isOwner = clientHash && comment.authorTokenHash === clientHash;

  if (!isOwner && !params.isAdmin) {
    return { success: false, error: "O'chirish uchun ruxsat berilmagan." };
  }

  // Delete comment and any replies belonging to it
  const filtered = all.filter((c) => c.id !== params.commentId && c.parentId !== params.commentId);
  saveAllComments(filtered);

  return { success: true };
}
