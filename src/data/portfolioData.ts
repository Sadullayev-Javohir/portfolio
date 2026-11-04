export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  slug: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  color: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
}

export interface ExpertiseItem {
  number: string;
  title: string;
  description: string;
  technologies: string;
}

export const SOCIAL_LINKS = {
  github: "https://github.com/Sadullayev-Javohir",
  linkedin: "https://www.linkedin.com/in/javohir-sadullayev-b8737725a/",
  telegram: "https://t.me/dotnetda",
  email: "mailto:javohirsadullayev836@gmail.com",
  phone: "tel:+998886036644",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "englishai",
    index: "01",
    title: "EnglishAI",
    category: "BACKEND · AI",
    year: "2026",
    description: "Adaptive English platform with speech assessment, placement testing and real-time pronunciation scoring.",
    tags: [".NET 8", "Azure Speech", "Redis", "SignalR"],
    slug: "englishai",
    image: "/project-englishai.jpg",
    color: "#4F7CFF",
    metrics: [
      { label: "Active Learners", value: "700+" },
      { label: "Speech Latency", value: "<120ms" },
      { label: "Onboarding Completion", value: "+78%" },
    ],
  },
  {
    id: "kitobdagimen",
    index: "02",
    title: "KitobdagiMen",
    category: "FULL-STACK · SOCIAL",
    year: "2026",
    description: "Social book reading platform with Telegram Mini App auth, algorithmic discovery feed and live quotes.",
    tags: [".NET 8", "PostgreSQL", "Telegram API", "SignalR"],
    slug: "kitobdagimen",
    image: "/project-kitobdagimen.jpg",
    color: "#7BE0AD",
    metrics: [
      { label: "Feed Latency", value: "<45ms" },
      { label: "Telegram Auth Rate", value: "99.4%" },
    ],
  },
  {
    id: "typingwar",
    index: "03",
    title: "TypingWar",
    category: "GAME · REAL-TIME",
    year: "2025",
    description: "Multiplayer typing duel engine with sub-50ms synchronization, anti-cheat validation and live lobbies.",
    tags: ["SignalR", "Redis Pub/Sub", "WebSockets", "C#"],
    slug: "typingwar",
    image: "/project-typingwar.jpg",
    color: "#FF6B5A",
    metrics: [
      { label: "Sync Latency", value: "<50ms" },
      { label: "Concurrent Duels", value: "100+" },
    ],
  },
  {
    id: "ziyoai",
    index: "04",
    title: "ZiyoAI",
    category: "AI · EDUCATION",
    year: "2026",
    description: "AI-driven educational assistance platform with automated homework grading and multi-turn student tutoring.",
    tags: [".NET Core", "Azure Cognitive", "Redis", "OpenAI"],
    slug: "ziyoai",
    image: "/project-ziyoai.jpg",
    color: "#C9BDF5",
  },
  {
    id: "meningvaqtim",
    index: "05",
    title: "MeningVaqtim",
    category: "PRODUCTIVITY · BACKEND",
    year: "2025",
    description: "Personal time allocation and sprint tracker with deep productivity analytics and offline-first sync.",
    tags: [".NET 8", "PostgreSQL", "Docker", "Clean Architecture"],
    slug: "meningvaqtim",
    image: "/project-meningvaqtim.jpg",
    color: "#FFC940",
  },
];

export const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    number: "01",
    title: "Backend & Architecture",
    description: "Domain-driven design, Clean Architecture, and resilient REST APIs in .NET 8.",
    technologies: "C# 12 · .NET 8 · ASP.NET Core Web API · Entity Framework Core · Clean Architecture · MediatR",
  },
  {
    number: "02",
    title: "Data & Storage",
    description: "Relational schema design, query plan optimization, and distributed Redis caching.",
    technologies: "PostgreSQL · Microsoft SQL Server · Redis (Caching & Pub/Sub) · SQL Query Optimization",
  },
  {
    number: "03",
    title: "Real-Time & AI",
    description: "Sub-50ms SignalR sockets, Azure Speech processing, and resilient LLM integrations.",
    technologies: "SignalR Core · WebSockets · Azure Cognitive Services (Speech) · OpenAI API · Background Workers",
  },
  {
    number: "04",
    title: "DevOps & Tooling",
    description: "Docker containerization, automated migrations, CI/CD, and Serilog telemetry.",
    technologies: "Docker & Compose · Git · Linux / Bash · Postman · Serilog · Swagger / OpenAPI",
  },
];

export const EXPERIENCE_PREVIEW: ExperienceItem[] = [
  {
    period: "JUL 2026 — NOW",
    role: "Backend Developer",
    company: "EnglishAI",
    location: "",
    description: "Adaptive English platform with speech assessment — 700+ active users.",
    tags: ["ASP.NET Core", "PostgreSQL", "Redis"],
  },
  {
    period: "JUN — JUL 2026",
    role: "Full-Stack Developer",
    company: "KitobdagiMen · kitobdagimen.uz",
    location: "",
    description: "Social reading platform with algorithmic feed and Telegram Mini App auth.",
    tags: [".NET 8", "SignalR", "Telegram"],
  },
  {
    period: "FEB — MAY 2026",
    role: "Backend Lead",
    company: "ZiyoAI",
    location: "",
    description: "AI-driven educational assistance platform with automated homework grading.",
    tags: [".NET Core", "Azure Cognitive", "Redis"],
  },
];

export const EDUCATION_DATA = {
  university: "PDP University",
  degree: "B.Sc. Computer Science",
  period: "OCT 2024 — JUN 2028",
  gpa: "4.13",
  gpaMax: "4.5",
  focusTopics: [
    "Algorithms & Data Structures",
    "Relational Databases",
    "Computer Architecture",
    "Object-Oriented Design",
  ],
};

export interface CertificationItem {
  title: string;
  subtitle: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: "HackerRank REST API",
    subtitle: "Intermediate certificate",
  },
  {
    title: "HackerRank Software Engineer",
    subtitle: "Role certification",
  },
  {
    title: "Foundational C#",
    subtitle: "Microsoft / freeCodeCamp",
  },
  {
    title: "Languages",
    subtitle: "Uzbek (native) · English (B1)",
  },
];

