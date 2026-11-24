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
  { value: "700+", label: "USERS SERVED" },
  { value: "45%", label: "AUDIO LATENCY CUT" },
  { value: "+78%", label: "ONBOARDING COMPLETION" },
  { value: "105+", label: "UNIT TESTS" },
];

export const CURRENT_ROLE_NOTE = {
  label: "✳ CURRENTLY",
  role: "Backend Developer (C# / .NET) at EnglishAI",
  sub: "Adaptive English platform · Tashkent",
  url: "/projects/englishai",
};

export const ROLES_DATA: RoleItem[] = [
  {
    id: "englishai",
    markerColor: "bg-blue",
    markerHex: "#4F7CFF",
    period: "JUN 2026 — PRESENT",
    isCurrent: true,
    company: "EnglishAI",
    place: "Tashkent, Uzbekistan",
    role: "Backend Developer (C# / .NET)",
    summary:
      "Adaptive English platform serving 700+ active learners with automated testing and speech scoring.",
    bullets: [
      "Built high-performance ASP.NET Core REST APIs with PostgreSQL and Redis, supporting 700+ active users.",
      "Resolved mobile anti-cheat desync with session recovery, boosting onboarding completion by 78%.",
      "Integrated Azure Speech and Redis caching, slashing median audio evaluation latency by 45%.",
    ],
    techStack: ["C#", ".NET 8", "ASP.NET Core", "PostgreSQL", "Redis", "Azure Speech"],
    caseStudyUrl: "/projects/englishai",
  },
  {
    id: "epam",
    markerColor: "bg-mint",
    markerHex: "#7BE0AD",
    period: "SEP 2025 — JAN 2026",
    isCurrent: false,
    company: "EPAM Systems",
    place: "Tashkent, Uzbekistan",
    role: "C# / .NET Trainee",
    summary:
      "Mastered C#, OOP, ASP.NET Core, and applied SOLID and Clean Code principles in production tasks.",
    bullets: [
      "Mastered C#, OOP, ASP.NET Core, and applied SOLID and Clean Code principles in production tasks.",
      "Collaborated in Agile sprint teams using Git for version control, code reviews, and test-driven workflows.",
    ],
    techStack: ["C#", "OOP", "ASP.NET Core", "SOLID", "Clean Code", "Git"],
  },
];

export const BEYOND_ROLES_DATA = {
  eyebrow: "ALONGSIDE THE ROLE",
  title: "Still a student. Still shipping.",
  subtitle: "B.Sc. Computer Science at PDP University, expected June 2028.",
  certifications: [
    { title: "HackerRank REST API" },
    { title: "HackerRank Software Engineer" },
    { title: "Microsoft Foundational C#" },
  ],
  languages: [
    { name: "English", level: "B1 - Technical / Working" },
    { name: "Uzbek", level: "Native" },
  ],
};
