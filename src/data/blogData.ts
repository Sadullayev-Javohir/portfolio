export interface PlannedArticle {
  index: string;
  title: string;
  desc: string;
  category: string;
  chipColor: "coral" | "yellow" | "mint" | "lilac";
}

export interface PublishedArticle {
  id: string;
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  readTime: string;
}

export const BLOG_STATS = {
  publishedCount: "00",
  plannedCount: "05",
  lastUpdated: "—",
};

export const BLOG_CATEGORIES = [
  ".NET",
  "C#",
  "Backend Engineering",
  "Software Architecture",
  "PostgreSQL",
  "AI Engineering",
  "Developer Tools",
  "Learning Journey",
  "Personal Projects",
] as const;

export const FEATURED_EMPTY_DATA = {
  eyebrow: "FEATURED",
  badge: "SLOT EMPTY",
  title: "The journal is empty — deliberately.",
  desc: "I'd rather have a blank page than filler. The first articles are being written from real production problems — the anti-cheat bug that cost 21 students their placement test, the Redis cache key that cut speech costs by 35%, and what happens when an AI provider hits its quota mid-conversation.",
  tags: [".NET", "Caching", "Real-time", "AI Engineering"],
};

export const PLANNED_ARTICLES: PlannedArticle[] = [
  {
    index: "01",
    title: "The anti-cheat rule that locked students out",
    desc: "How telemetry turned a “motivation problem” into a fraud-logic bug — and what recovery looked like.",
    category: "BACKEND · .NET",
    chipColor: "coral",
  },
  {
    index: "02",
    title: "A Redis cache key you won't regret",
    desc: "Hashing audio content instead of users, and the cost curve that follows.",
    category: "CACHING · REDIS",
    chipColor: "yellow",
  },
  {
    index: "03",
    title: "Under 30 ms: real-time without lying",
    desc: "SignalR, Redis Pub/Sub and why the server should own the scoreboard.",
    category: "REAL-TIME",
    chipColor: "mint",
  },
  {
    index: "04",
    title: "When the AI provider runs out of quota",
    desc: "Dual-key failover, tiered timeouts and deduplication in a Telegram bot.",
    category: "AI ENGINEERING",
    chipColor: "lilac",
  },
];

export const PUBLISHED_ARTICLES: PublishedArticle[] = [];
