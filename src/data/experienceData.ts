export interface RoleItem {
  id: string;
  markerColor: string; // Tailwind color class or hex
  markerHex: string;
  period: string;
  isCurrent?: boolean;
  company: string;
  place: string;
  placeUrl?: string;
  role: string;
  summary: string;
  bullets: string[];
  techStack: string[];
  caseStudyUrl?: string;
}

export interface HeaderStat {
  value: string;
  label: string;
}

export interface CertificationItem {
  title: string;
  url?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export const EXPERIENCE_STATS: HeaderStat[] = [
  { value: "05", label: "ROLES" },
  { value: "700+", label: "USERS SERVED" },
  { value: "99.9%", label: "BEST UPTIME" },
  { value: "105+", label: "UNIT TESTS" },
];

export const CURRENT_ROLE_NOTE = {
  label: "✳ CURRENTLY",
  role: "Backend Developer at EnglishAI",
  sub: "Adaptive English learning · Tashkent",
  url: "/projects/englishai",
};

export const ROLES_DATA: RoleItem[] = [
  {
    id: "englishai",
    markerColor: "bg-blue",
    markerHex: "#4F7CFF",
    period: "JUL 2026 — PRESENT",
    isCurrent: true,
    company: "EnglishAI",
    place: "Tashkent, Uzbekistan · Full-time",
    role: "Backend Developer",
    summary:
      "Adaptive English platform serving 700+ active learners with automated testing and speech scoring.",
    bullets: [
      "Architected ASP.NET Core REST APIs with PostgreSQL and Redis caching for 700+ active users.",
      "Eliminated placement-test dropouts by correcting false anti-cheat triggers and enabling session recovery (+78% onboarding).",
      "Engineered MD5-hashed Redis audio caching for Azure Speech, reducing synthesis costs by 35% and latency to <120ms.",
    ],
    techStack: ["C#", "ASP.NET Core", "PostgreSQL", "Redis", "Azure Speech"],
    caseStudyUrl: "/projects/englishai",
  },
  {
    id: "kitobdagimen",
    markerColor: "bg-coral",
    markerHex: "#FF6B5A",
    period: "JUN — JUL 2026",
    company: "KitobdagiMen",
    place: "kitobdagimen.uz · Product collaboration",
    placeUrl: "https://kitobdagimen.uz",
    role: "Full-Stack Developer",
    summary:
      "Social reading platform with algorithmic feed, SignalR chat, and Telegram Mini App integration.",
    bullets: [
      "Built full-stack platform (.NET 8, PostgreSQL) with reviews, goals, quotes, and real-time SignalR chat.",
      "Integrated Telegram Mini App with automated quote broadcasts, HMAC-SHA256 validation, and 2-minute OTP auth.",
      "Engineered 60/40 discovery feed with cursor pagination and a 4-route fallback proxy (99.8% availability).",
    ],
    techStack: [".NET 8", "PostgreSQL", "SignalR", "Google OAuth", "Telegram Mini App", "Redis"],
    caseStudyUrl: "/projects/kitobdagimen",
  },
  {
    id: "ziyoai",
    markerColor: "bg-mint",
    markerHex: "#7BE0AD",
    period: "AUG — SEP 2026",
    company: "ZiyoAI",
    place: "@ZiyoAIBot · AI product",
    placeUrl: "https://t.me/ZiyoAIBot",
    role: "Backend & AI Engineer",
    summary:
      "Autonomous multimodal Telegram assistant with voice interaction, OCR vision, and channel auto-enrichment.",
    bullets: [
      "Developed multimodal Telegram bot (.NET 8, EF Core, Docker) with Whisper STT, TTS, and OCR document processing.",
      "Engineered autonomous channel enrichment for generating discussion starters, summaries, and educational quizzes.",
      "Built dual-key failover gateway with tiered timeouts (30s/65s) and deduplication, maintaining 99.9% uptime.",
    ],
    techStack: [".NET 8", "EF Core", "PostgreSQL", "Docker", "STT / TTS", "OCR"],
    caseStudyUrl: "/projects/ziyoai",
  },
  {
    id: "typingwar",
    markerColor: "bg-lilac",
    markerHex: "#C9BDF5",
    period: "JUN — JUL 2026",
    company: "TypingWar",
    place: "Open source · github.com/Sadullayev-Javohir/typingwar",
    placeUrl: "https://github.com/Sadullayev-Javohir/typingwar",
    role: "Full-Stack Developer",
    summary:
      "Real-time competitive typing platform with 1v1 duels, battle rooms, and automated tournaments.",
    bullets: [
      "Built multiplayer typing platform (.NET 8, Redis) with 1v1 live duels, rooms, and AI sparring bots.",
      "Synchronized keystrokes, WPM, and live progress with <30ms latency via SignalR Core and Redis Pub/Sub.",
      "Implemented server-side keystroke cadence verification to prevent cheating, covered by 105+ xUnit tests.",
    ],
    techStack: [".NET 8", "PostgreSQL", "Redis", "SignalR Core", "xUnit"],
    caseStudyUrl: "/projects/typingwar",
  },
  {
    id: "meningvaqtim",
    markerColor: "bg-yellow",
    markerHex: "#FFC940",
    period: "ACTIVE PROJECT",
    isCurrent: true,
    company: "MeningVaqtim",
    place: "meningvaqtim.uz · Ongoing",
    placeUrl: "https://meningvaqtim.uz",
    role: "Backend Developer",
    summary:
      "Productivity tracker comparing planned tasks with deep-work sessions across timezones.",
    bullets: [
      "Built productivity backend (.NET 8, PostgreSQL) delivering timezone-aware analytics for 200+ users.",
      "Automated timer completion and distraction logging with Hangfire background jobs (100% data integrity).",
    ],
    techStack: [".NET 8", "PostgreSQL", "Hangfire", "BackgroundService"],
    caseStudyUrl: "/projects/meningvaqtim",
  },
];

export const BEYOND_ROLES_DATA = {
  eyebrow: "ALONGSIDE THE ROLE",
  title: "Still a student. Still shipping.",
  subtitle: "B.Sc. Computer Science at PDP University, expected June 2028.",
  certifications: [
    { title: "HackerRank REST API — Intermediate" },
    { title: "HackerRank Software Engineer" },
    { title: "Microsoft / freeCodeCamp — Foundational C#" },
  ],
  languages: [
    { name: "Uzbek", level: "native" },
    { name: "English", level: "B1" },
  ],
};
