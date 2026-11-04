export interface ResumeJob {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeData {
  name: string;
  role: string;
  location: string;
  initials: string;
  summary: string;
  contacts: {
    type: "email" | "phone" | "linkedin" | "github";
    text: string;
    href: string;
  }[];
  experience: ResumeJob[];
  education: {
    degree: string;
    uni: string;
    period: string;
    focus: string;
  };
  skills: {
    languagesAndCore: string[];
    databasesAndCaching: string[];
    realTimeAndDevops: string[];
  };
  certifications: string[];
  languages: {
    name: string;
    level: string;
  }[];
  downloads: {
    lang: "en" | "uz" | "ru";
    label: string;
    fileName: string;
    path: string;
    featured?: boolean;
  }[];
}

export const RESUME_DATA: ResumeData = {
  name: "Javohir Sadullayev",
  role: ".NET Backend Developer",
  location: "Tashkent, Uzbekistan",
  initials: "JS",
  summary:
    "Backend developer specialising in C#, .NET 8 and ASP.NET Core, with production experience across PostgreSQL, Redis and real-time systems. Currently building adaptive English learning at EnglishAI while completing a B.Sc. in Computer Science at PDP University.",
  contacts: [
    {
      type: "email",
      text: "javohirsadullayev836@gmail.com",
      href: "mailto:javohirsadullayev836@gmail.com",
    },
    {
      type: "phone",
      text: "+998 88 603 66 44",
      href: "tel:+998886036644",
    },
    {
      type: "linkedin",
      text: "linkedin.com/in/javohir-sadullayev",
      href: "https://www.linkedin.com/in/javohir-sadullayev-b8737725a/",
    },
    {
      type: "github",
      text: "github.com/Sadullayev-Javohir",
      href: "https://github.com/Sadullayev-Javohir",
    },
  ],
  experience: [
    {
      role: "Backend Developer",
      company: "EnglishAI, Tashkent",
      period: "Jul 2026 — Present",
      bullets: [
        "Architected ASP.NET Core REST APIs with PostgreSQL and Redis caching for 700+ active users.",
        "Eliminated placement-test dropouts by correcting false anti-cheat triggers and enabling session recovery (+78% onboarding).",
        "Engineered MD5-hashed Redis audio caching for Azure Speech, reducing synthesis costs by 35% and latency to <120ms.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "KitobdagiMen — kitobdagimen.uz",
      period: "Jun 2026 — Jul 2026",
      bullets: [
        "Built full-stack platform (.NET 8, PostgreSQL) with reviews, goals, quotes, and real-time SignalR chat.",
        "Integrated Telegram Mini App with automated quote broadcasts, HMAC-SHA256 validation, and 2-minute OTP auth.",
        "Engineered 60/40 discovery feed with cursor pagination and a 4-route fallback proxy (99.8% availability).",
      ],
    },
    {
      role: "Backend & AI Engineer",
      company: "ZiyoAI — @ZiyoAIBot",
      period: "Aug 2026 — Sep 2026",
      bullets: [
        "Developed multimodal Telegram bot (.NET 8, EF Core, Docker) with Whisper STT, TTS, and OCR document processing.",
        "Engineered autonomous channel enrichment for generating discussion starters, summaries, and educational quizzes.",
        "Built dual-key failover gateway with tiered timeouts (30s/65s) and deduplication, maintaining 99.9% uptime.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "TypingWar — open source",
      period: "Jun 2026 — Jul 2026",
      bullets: [
        "Built multiplayer typing platform (.NET 8, Redis) with 1v1 live duels, rooms, and AI sparring bots.",
        "Synchronized keystrokes, WPM, and live progress with <30ms latency via SignalR Core and Redis Pub/Sub.",
        "Implemented server-side keystroke cadence verification to prevent cheating, covered by 105+ xUnit tests.",
      ],
    },
    {
      role: "Backend Developer",
      company: "MeningVaqtim — meningvaqtim.uz",
      period: "Active project",
      bullets: [
        "Built productivity backend (.NET 8, PostgreSQL) delivering timezone-aware analytics for 200+ users.",
        "Automated timer completion and distraction logging with Hangfire background jobs (100% data integrity).",
      ],
    },
  ],
  education: {
    degree: "B.Sc. Computer Science",
    uni: "PDP University, Tashkent",
    period: "Oct 2024 — Jun 2028",
    focus:
      "Focus: Algorithms & Data Structures · Relational Databases · Network Programming · GPA 4.13 / 4.5",
  },
  skills: {
    languagesAndCore: [
      "C#",
      ".NET 8",
      "ASP.NET Core",
      "REST APIs",
      "Entity Framework Core",
      "Dapper",
      "LINQ",
      "OOP",
      "Clean Architecture",
    ],
    databasesAndCaching: [
      "PostgreSQL",
      "Microsoft SQL Server",
      "Redis (Caching & Pub/Sub)",
      "SQL Query Optimization",
    ],
    realTimeAndDevops: [
      "SignalR Core",
      "WebSockets",
      "Docker",
      "Git",
      "CI/CD (GitHub Actions)",
      "Hangfire",
      "Azure Speech (STT/TTS)",
      "xUnit",
    ],
  },
  certifications: [
    "HackerRank REST API — Intermediate",
    "HackerRank Software Engineer",
    "Microsoft / freeCodeCamp — Foundational C#",
  ],
  languages: [
    { name: "Uzbek", level: "native" },
    { name: "English", level: "B1" },
  ],
  downloads: [
    {
      lang: "en",
      label: "PDF · EN",
      fileName: "Javohir-Sadullayev-Resume.pdf",
      path: "/assets/resume-en.pdf",
      featured: true,
    },
    {
      lang: "uz",
      label: "UZ",
      fileName: "Javohir-Sadullayev-Resume-UZ.pdf",
      path: "/assets/resume-uz.pdf",
    },
    {
      lang: "ru",
      label: "RU",
      fileName: "Javohir-Sadullayev-Resume-RU.pdf",
      path: "/assets/resume-ru.pdf",
    },
  ],
};
