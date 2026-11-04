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
  sub: "B.Sc. in Computer Science at PDP University (2024 — 2028), studied alongside full-time backend engineering.",
  gpa: {
    label: "OVERALL GPA",
    value: "4.13",
    max: "out of 4.5",
  },
};

export const UNIVERSITY_CARD_DATA = {
  label: "PDP UNIVERSITY · TASHKENT, UZBEKISTAN",
  title: "B.Sc. Computer Science",
  period: "OCT 2024 — JUN 2028 · EXPECTED",
  description:
    "Foundational computer science principles: algorithm complexity, relational storage, and socket-level network architecture.",
  focusLabel: "FOCUS AREAS",
  focusChips: [
    "Algorithms & Data Structures",
    "Relational Databases",
    "Network Programming",
  ],
};

export const COURSEWORK_PILLARS: CourseworkPillar[] = [
  {
    num: "01",
    title: "Algorithms & Data Structures",
    description:
      "Time and space complexity analysis, optimal collection selection, and algorithmic efficiency.",
    tags: "Complexity · structures · recursion",
    color: "#4F7CFF", // blue
  },
  {
    num: "02",
    title: "Relational Databases",
    description:
      "Schema normalization, B-tree indexing strategies, transaction isolation, and EXPLAIN query plan optimization.",
    tags: "Schema · indexes · queries",
    color: "#FF6B5A", // coral
  },
  {
    num: "03",
    title: "Network Programming",
    description:
      "TCP/UDP socket communication, HTTP/WebSocket protocols, connection pooling, and resilient retry policies.",
    tags: "Protocols · sockets · services",
    color: "#7BE0AD", // mint
  },
];

export const PARALLEL_PROJECTS: ParallelProjectItem[] = [
  {
    year: "2026",
    title: "EnglishAI",
    description:
      "Backend Developer — adaptive English platform with speech assessment.",
    tag: "BACKEND · AI",
    href: "/projects/englishai",
  },
  {
    year: "2026",
    title: "KitobdagiMen",
    description:
      "Full-Stack Developer — social reading platform and Telegram Mini App.",
    tag: "FULL-STACK",
    href: "/projects/kitobdagimen",
  },
  {
    year: "2026",
    title: "ZiyoAI",
    description:
      "Backend & AI Engineer — multimodal Telegram assistant with OCR and voice.",
    tag: "AI ENGINEERING",
    href: "/projects/ziyoai",
  },
  {
    year: "2026",
    title: "TypingWar",
    description:
      "Full-Stack Developer — real-time typing duels, 105+ unit tests.",
    tag: "REAL-TIME",
    href: "/projects/typingwar",
  },
  {
    year: "ACTIVE",
    title: "MeningVaqtim",
    description:
      "Backend Developer — timezone-aware productivity analytics.",
    tag: "PRODUCTIVITY",
    href: "/projects/meningvaqtim",
  },
];

export const CREDENTIALS_DATA: CredentialBadge[] = [
  {
    title: "HackerRank",
    subtitle: "REST API (Intermediate)",
  },
  {
    title: "HackerRank",
    subtitle: "Software Engineer",
  },
  {
    title: "Microsoft / freeCodeCamp",
    subtitle: "Foundational C#",
  },
  {
    title: "Languages",
    subtitle: "Uzbek native · English B1",
  },
];
