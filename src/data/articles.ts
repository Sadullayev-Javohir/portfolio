export interface ArticleComment {
  id: string;
  name: string;
  initials?: string;
  avatar?: string;
  avatarBg?: string;
  role: string;
  isAuthor?: boolean;
  time: string;
  upvotes: number;
  body: string;
  reply?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    isAuthor?: boolean;
    time: string;
    likes: number;
    body: string;
  };
}

export interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  breadcrumb: {
    parent: string;
    current: string;
  };
  categories: string[];
  publishedDate: string;
  readTime: string;
  views: string;
  likesCount: number;
  commentsCount: number;
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  cover: {
    label: string;
    code: string;
    caption: string;
    stats: { value: string; label: string }[];
  };
  toc: { id: string; num: string; text: string }[];
  intro: string;
  sections: {
    id: string;
    num: string;
    title: string;
    content: string[];
  }[];
  codeBlock: {
    lang: string;
    caption: string;
    lines: string[];
    badge?: string;
  };
  callout: {
    title: string;
    text: string;
  };
  results: { value: string; label: string }[];
  quote: string;
  bullets: string[];
  tags: string[];
  customMarkdown?: string;
  reactions: {
    likes: number;
    claps: number;
    fires: number;
    bulbs: number;
    reads: string;
    bookmarks: number;
  };
  comments: ArticleComment[];
}

export const SAMPLE_ARTICLE: ArticleData = {
  slug: "caching-azure-speech-output-with-redis",
  title: "Caching Azure Speech output with Redis",
  subtitle:
    "How an MD5 key on the audio content cut synthesis costs by 35% — and why the obvious user-based key was the wrong one.",
  breadcrumb: {
    parent: "JOURNAL",
    current: "TEMPLATE PREVIEW",
  },
  categories: ["BACKEND ENGINEERING", "CACHING"],
  publishedDate: "OCT 2026",
  readTime: "9 MIN READ",
  views: "1,420 VIEWS",
  likesCount: 184,
  commentsCount: 24,
  author: {
    name: "Javohir Sadullayev",
    role: "Software Engineer · .NET",
    bio: "Backend developer. I write about .NET, caching and the failure modes that only show up in production.",
    avatar: "/javohir.jpg",
  },
  cover: {
    label: "SAMPLE COVER · REPLACE WITH ARTICLE IMAGERY",
    code: "tts:{MD5(text|voice|locale)}",
    caption: "same input → same key → same cached audio",
    stats: [
      { value: "−35%", label: "SYNTHESIS COST" },
      { value: "<120 ms", label: "CACHE HIT" },
    ],
  },
  toc: [
    { id: "section-01", num: "01", text: "The obvious cache" },
    { id: "section-02", num: "02", text: "Hashing the content" },
    { id: "section-03", num: "03", text: "What it changed" },
    { id: "section-04", num: "04", text: "Eviction & monitoring" },
    { id: "section-05", num: "05", text: "What I'd change" },
  ],
  intro:
    "Pronunciation assessment is not cheap. Every attempt sends audio to Azure Speech, comes back with a transcript and a score, and lands on the invoice. On EnglishAI the same short prompts were requested hundreds of times a day — different students, identical audio.",
  sections: [
    {
      id: "section-01",
      num: "01",
      title: "01. The obvious cache is the wrong cache",
      content: [
        "The first instinct is to key the cache by user: one bucket per student, easy to invalidate, no accidental sharing. It is also close to useless here. A new student requesting the same phrase is a cache miss by definition, and the expensive call happens again.",
      ],
    },
    {
      id: "section-02",
      num: "02",
      title: "02. Hash the content, keep the TTL boring",
      content: [
        "The key became an MD5 hash of the text, voice and locale. Identical prompts now share one asset, and personalisation is untouched because the output was never personal in the first place. A long TTL is fine for static content — the invalidation risk is in the voice or locale, which are part of the key.",
      ],
    },
    {
      id: "section-03",
      num: "03",
      title: "03. What it changed",
      content: [
        "The assessment scores themselves still come from Azure on the first request. The cache only removes the repeat work — which turned out to be most of the bill.",
      ],
    },
    {
      id: "section-04",
      num: "04",
      title: "04. Eviction & monitoring",
      content: [],
    },
    {
      id: "section-05",
      num: "05",
      title: "05. What I'd change",
      content: [
        "If I were redesigning the caching tier today, I would introduce an in-memory L1 cache using MemoryCache alongside the distributed Redis L2. For the top 50 lesson phrases that receive continuous traffic during peak hours, this eliminates even the 1-2ms Redis network hop and further optimizes throughput.",
      ],
    },
  ],
  codeBlock: {
    lang: "C# · SpeechCache.cs",
    caption:
      "Illustrative implementation — the production version also tracks hit rate and asset size.",
    lines: [
      "// the key is derived from content, not identity",
      'var key = $"tts:{Hash(text, voice, locale)}";',
      " ",
      "var cached = await _cache.GetAsync<AudioAsset>(key);",
      "if (cached is not null)",
      "    return cached;",
      " ",
      "var audio = await _speech.SynthesizeAsync(text, voice, locale);",
      "await _cache.SetAsync(key, audio, TimeSpan.FromDays(30));",
      "return audio;",
    ],
  },
  callout: {
    title: "Only cache content-derived output",
    text: "Never put a user identifier in a shared key. If the response depends on who asked, the cache key must too.",
  },
  results: [
    { value: "−35%", label: "synthesis cost" },
    { value: "<120 ms", label: "repeat latency" },
    { value: "1 key", label: "per unique prompt" },
  ],
  quote:
    "“Cache the expensive thing, not the whole request. The smallest correct key is usually the cheapest one.”",
  bullets: [
    "TTL of 30 days, with voice and locale in the key so a model change can't serve stale audio.",
    "A hit-rate counter per prompt family, because a cache you can't observe is a cache you can't trust.",
    "Size caps in Redis, so a long-running lesson can't quietly fill the instance.",
  ],
  tags: [".NET", "Redis", "Azure Speech", "Caching", "Performance"],
  reactions: {
    likes: 184,
    claps: 248,
    fires: 89,
    bulbs: 64,
    reads: "1,420 reads",
    bookmarks: 42,
  },
  comments: [
    {
      id: "c1",
      initials: "FA",
      avatarBg: "#4F7CFF",
      name: "Farrukh Aliyev",
      role: "SENIOR .NET DEV",
      time: "· 2 days ago",
      upvotes: 18,
      body: "Great breakdown of the MD5 audio hashing. Did you run into cache stampede when multiple students request the same new lesson at the exact same second? Using Redis distributed locks or SemaphoreSlim per key helped us a lot on a similar speech workload.",
      reply: {
        id: "r1",
        name: "Javohir Sadullayev",
        avatar: "/javohir.jpg",
        role: "AUTHOR",
        isAuthor: true,
        time: "· 1 day ago",
        likes: 12,
        body: "Spot on Farrukh! We used a lock-coalescence pattern with in-memory ConcurrentDictionary locks before delegating to Azure Speech. That guaranteed only 1 synthesis request went upstream while the other students waited on the local Task to write to Redis.",
      },
    },
    {
      id: "c2",
      initials: "AQ",
      avatarBg: "#7BE0AD",
      name: "Azizbek Qodirov",
      role: "BACKEND DEV",
      time: "· 3 days ago",
      upvotes: 9,
      body: "The anti-cheat telemetry recovery is such an underrated win. Most teams would just blame the students for dropping out. Respect for digging into the mobile error logs to find the real culprit.",
    },
  ],
};
