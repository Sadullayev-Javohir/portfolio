import fs from "fs";
import path from "path";

export interface ArticleEngagement {
  slug: string;
  views: number;
  likes: number;
  claps: number;
  fires: number;
  bulbs: number;
  viewedTokens: Record<string, number>; // token or ipHash -> timestamp
  likedTokens: Record<string, boolean>; // token -> boolean
}

const ENGAGEMENT_FILE = path.join(process.cwd(), "src/data/blogEngagement.json");

function ensureFile() {
  try {
    const dir = path.dirname(ENGAGEMENT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(ENGAGEMENT_FILE)) {
      fs.writeFileSync(ENGAGEMENT_FILE, "{}", "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure engagement file:", err);
  }
}

export function getAllEngagement(): Record<string, ArticleEngagement> {
  ensureFile();
  try {
    const raw = fs.readFileSync(ENGAGEMENT_FILE, "utf-8");
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

function saveAllEngagement(data: Record<string, ArticleEngagement>) {
  ensureFile();
  fs.writeFileSync(ENGAGEMENT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getArticleEngagement(slug: string, token?: string): {
  views: number;
  likes: number;
  hasLiked: boolean;
} {
  const all = getAllEngagement();
  const entry = all[slug] || {
    slug,
    views: 0,
    likes: 0,
    claps: 0,
    fires: 0,
    bulbs: 0,
    viewedTokens: {},
    likedTokens: {},
  };

  const hasLiked = token ? !!entry.likedTokens?.[token] : false;
  const likesCount = entry.likedTokens ? Object.keys(entry.likedTokens).length : (entry.likes || 0);
  const viewsCount = entry.viewedTokens ? Object.keys(entry.viewedTokens).length : (entry.views || 0);

  return {
    views: viewsCount,
    likes: likesCount,
    hasLiked,
  };
}

export function recordArticleView(slug: string, token: string): number {
  if (!slug || !token) return 0;
  const all = getAllEngagement();
  if (!all[slug]) {
    all[slug] = {
      slug,
      views: 0,
      likes: 0,
      claps: 0,
      fires: 0,
      bulbs: 0,
      viewedTokens: {},
      likedTokens: {},
    };
  }

  const entry = all[slug];
  if (!entry.viewedTokens) entry.viewedTokens = {};

  if (!entry.viewedTokens[token]) {
    entry.viewedTokens[token] = Date.now();
  }

  entry.views = Object.keys(entry.viewedTokens).length;
  saveAllEngagement(all);
  return entry.views;
}

export function toggleArticleLike(slug: string, token: string): { likes: number; hasLiked: boolean } {
  if (!slug || !token) return { likes: 0, hasLiked: false };
  const all = getAllEngagement();
  if (!all[slug]) {
    all[slug] = {
      slug,
      views: 0,
      likes: 0,
      claps: 0,
      fires: 0,
      bulbs: 0,
      viewedTokens: {},
      likedTokens: {},
    };
  }

  const entry = all[slug];
  if (!entry.likedTokens) entry.likedTokens = {};

  const currentlyLiked = !!entry.likedTokens[token];
  if (currentlyLiked) {
    delete entry.likedTokens[token];
  } else {
    entry.likedTokens[token] = true;
  }

  entry.likes = Object.keys(entry.likedTokens).length;
  saveAllEngagement(all);

  return {
    likes: entry.likes,
    hasLiked: !currentlyLiked,
  };
}

export function recordArticleReaction(
  slug: string,
  kind: "claps" | "fires" | "bulbs"
): { claps: number; fires: number; bulbs: number } {
  const all = getAllEngagement();
  if (!all[slug]) {
    all[slug] = {
      slug,
      views: 0,
      likes: 0,
      claps: 0,
      fires: 0,
      bulbs: 0,
      viewedTokens: {},
      likedTokens: {},
    };
  }

  const entry = all[slug];
  if (kind === "claps") entry.claps = (entry.claps || 0) + 1;
  if (kind === "fires") entry.fires = (entry.fires || 0) + 1;
  if (kind === "bulbs") entry.bulbs = (entry.bulbs || 0) + 1;

  saveAllEngagement(all);
  return {
    claps: entry.claps || 0,
    fires: entry.fires || 0,
    bulbs: entry.bulbs || 0,
  };
}
