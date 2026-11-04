export interface PrimarySkillItem {
  name: string;
  where: string;
}

export interface SkillRow {
  tech: string;
  category: string;
  used: string;
}

export interface SkillCategoryGroup {
  id: string;
  name: string;
  count: string;
  color: string; // hex color for mark and dot
  rows: SkillRow[];
}

export interface CertificationItem {
  title: string;
  sub: string;
}

export const PRIMARY_STACK: PrimarySkillItem[] = [
  { name: "C# / .NET 8", where: "every product" },
  { name: "ASP.NET Core", where: "EnglishAI API" },
  { name: "PostgreSQL", where: "all five projects" },
  { name: "Redis", where: "cache · pub/sub" },
  { name: "Docker", where: "ZiyoAI deployment" },
];

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    id: "languages-core",
    name: "Languages & core",
    count: "09",
    color: "#4F7CFF", // blue
    rows: [
      {
        tech: "C#",
        category: "Languages & core",
        used: "All five projects",
      },
      {
        tech: ".NET 8",
        category: "Languages & core",
        used: "KitobdagiMen · ZiyoAI · TypingWar · MeningVaqtim",
      },
      {
        tech: "ASP.NET Core",
        category: "Languages & core",
        used: "EnglishAI REST API",
      },
      {
        tech: "REST APIs",
        category: "Languages & core",
        used: "EnglishAI · KitobdagiMen",
      },
      {
        tech: "Entity Framework Core",
        category: "Languages & core",
        used: "ZiyoAI",
      },
      {
        tech: "Dapper",
        category: "Languages & core",
        used: "Toolkit",
      },
      {
        tech: "LINQ",
        category: "Languages & core",
        used: "Daily query work",
      },
      {
        tech: "OOP",
        category: "Languages & core",
        used: "Everywhere",
      },
      {
        tech: "Clean Architecture",
        category: "Languages & core",
        used: "API structure",
      },
    ],
  },
  {
    id: "databases-caching",
    name: "Databases & caching",
    count: "04",
    color: "#FFC940", // yellow
    rows: [
      {
        tech: "PostgreSQL",
        category: "Databases & caching",
        used: "EnglishAI · KitobdagiMen · ZiyoAI · TypingWar · MeningVaqtim",
      },
      {
        tech: "Microsoft SQL Server",
        category: "Databases & caching",
        used: "Toolkit",
      },
      {
        tech: "Redis (Caching & Pub/Sub)",
        category: "Databases & caching",
        used: "EnglishAI · KitobdagiMen · TypingWar",
      },
      {
        tech: "SQL Query Optimization",
        category: "Databases & caching",
        used: "Reporting & feeds",
      },
    ],
  },
  {
    id: "realtime-background",
    name: "Real-time & background work",
    count: "05",
    color: "#FF6B5A", // coral
    rows: [
      {
        tech: "SignalR Core",
        category: "Real-time & background work",
        used: "KitobdagiMen · TypingWar",
      },
      {
        tech: "WebSockets",
        category: "Real-time & background work",
        used: "TypingWar",
      },
      {
        tech: "Redis Pub/Sub",
        category: "Real-time & background work",
        used: "TypingWar",
      },
      {
        tech: "Hangfire",
        category: "Real-time & background work",
        used: "MeningVaqtim",
      },
      {
        tech: "BackgroundService",
        category: "Real-time & background work",
        used: "MeningVaqtim",
      },
    ],
  },
  {
    id: "delivery-testing",
    name: "Delivery & testing",
    count: "04",
    color: "#7BE0AD", // mint
    rows: [
      {
        tech: "Docker",
        category: "Delivery & testing",
        used: "ZiyoAI",
      },
      {
        tech: "Git",
        category: "Delivery & testing",
        used: "All projects",
      },
      {
        tech: "CI/CD (GitHub Actions)",
        category: "Delivery & testing",
        used: "Build pipeline",
      },
      {
        tech: "xUnit",
        category: "Delivery & testing",
        used: "TypingWar · 105+ tests",
      },
    ],
  },
  {
    id: "ai-speech",
    name: "AI & speech",
    count: "02",
    color: "#C9BDF5", // lilac
    rows: [
      {
        tech: "Azure Speech (STT / TTS)",
        category: "AI & speech",
        used: "EnglishAI · ZiyoAI",
      },
      {
        tech: "OCR / visual comprehension",
        category: "AI & speech",
        used: "ZiyoAI",
      },
    ],
  },
  {
    id: "auth-integrations",
    name: "Auth & integrations",
    count: "04",
    color: "#A8D8FF", // sky
    rows: [
      {
        tech: "Google OAuth",
        category: "Auth & integrations",
        used: "KitobdagiMen",
      },
      {
        tech: "Telegram Bot API",
        category: "Auth & integrations",
        used: "KitobdagiMen · ZiyoAI",
      },
      {
        tech: "Telegram Mini App (HMAC-SHA256)",
        category: "Auth & integrations",
        used: "KitobdagiMen",
      },
      {
        tech: "OTP authentication",
        category: "Auth & integrations",
        used: "KitobdagiMen · 2-min OTP",
      },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "HackerRank",
    sub: "REST API (Intermediate)",
  },
  {
    title: "HackerRank",
    sub: "Software Engineer",
  },
  {
    title: "Microsoft / freeCodeCamp",
    sub: "Foundational C#",
  },
  {
    title: "Languages",
    sub: "Uzbek (native) · English (B1)",
  },
];
