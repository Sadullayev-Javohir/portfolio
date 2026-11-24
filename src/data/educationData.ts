export interface CourseworkPillar {
  num: string;
  title: string;
  description: string;
  tags: string;
  color: string;
}

export interface ParallelProjectItem {
  year: string;
  title: string;
  description: string;
  tag: string;
  href: string;
}

export interface CredentialBadge {
  title: string;
  subtitle: string;
}

export const EDUCATION_HEADER_DATA = {
  eyebrow: "EDUCATION — PDP UNIVERSITY",
  headline: "Fundamentals first.",
  sub: "Bachelor of Computer Science at PDP University (Oct 2024 — Jun 2028), balancing rigorous academic coursework with hands-on software engineering.",
  gpa: {
    label: "OVERALL GPA",
    value: "4.13",
    max: "out of 4.5",
  },
};

export const UNIVERSITY_CARD_DATA = {
  label: "PDP UNIVERSITY · TASHKENT, UZBEKISTAN",
  title: "Bachelor of Computer Science",
  period: "OCT 2024 — JUN 2028 · IN PROGRESS",
  description:
    "Core computer science curriculum emphasizing algorithmic complexity, relational databases, network programming, and operating systems.",
  focusLabel: "RELEVANT COURSES",
  focusChips: [
    "Data Structures & Algorithms (DSA)",
    "Relational Databases",
    "Network Programming",
    "Operating Systems",
    "OOP",
  ],
};

export const COURSEWORK_PILLARS: CourseworkPillar[] = [
  {
    num: "01",
    title: "Data Structures & Algorithms (DSA)",
    description:
      "Time and space complexity analysis, tree and graph algorithms, recursion, and collection optimization.",
    tags: "Complexity · B-trees · Sorting · Graphs",
    color: "#4F7CFF", // blue
  },
  {
    num: "02",
    title: "Relational Databases",
    description:
      "Schema normalization, indexing strategies, transaction isolation levels, ACID, and query optimization.",
    tags: "PostgreSQL · MS SQL · Indexing · Transactions",
    color: "#FF6B5A", // coral
  },
  {
    num: "03",
    title: "Network Programming & Operating Systems",
    description:
      "TCP/UDP socket communication, HTTP/WebSocket protocols, process concurrency, threads, and memory management.",
    tags: "Sockets · WebSockets · Linux · Concurrency",
    color: "#7BE0AD", // mint
  },
];

export const PARALLEL_PROJECTS: ParallelProjectItem[] = [
  {
    year: "2025",
    title: "TypingWar",
    description:
      "Real-time competitive typing platform with 1v1 duels, automated tournaments, cadence verification, and 105+ xUnit tests.",
    tag: "REAL-TIME · .NET 8",
    href: "/projects/typingwar",
  },
  {
    year: "2026",
    title: "KitobdagiMen",
    description:
      "Social reading platform with reviews, reading goals, Telegram Mini App integration, HMAC-SHA256 auth, and Redis caching.",
    tag: "FULL-STACK · SOCIAL",
    href: "/projects/kitobdagimen",
  },
  {
    year: "2025",
    title: "MeningVaqtim",
    description:
      "Productivity tracker for 200+ users with Hangfire background jobs and Dapper aggregate analytics with <60ms load times.",
    tag: "PRODUCTIVITY · BACKEND",
    href: "/projects/meningvaqtim",
  },
  {
    year: "2026",
    title: "EnglishAI",
    description:
      "Backend Developer (C# / .NET) — high-performance REST APIs with PostgreSQL and Redis, supporting 700+ active users.",
    tag: "BACKEND · AI",
    href: "/projects/englishai",
  },
];

export const CREDENTIALS_DATA: CredentialBadge[] = [
  {
    title: "HackerRank REST API",
    subtitle: "Intermediate certification",
  },
  {
    title: "HackerRank Software Engineer",
    subtitle: "Problem solving & software engineering",
  },
  {
    title: "Microsoft Foundational C#",
    subtitle: "Microsoft / freeCodeCamp",
  },
  {
    title: "Languages",
    subtitle: "English (B1 - Technical / Working) · Uzbek (Native)",
  },
];
