export interface ResumeJob {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeProject {
  name: string;
  domain: string;
  tech: string;
  desc: string;
}

export interface ResumeData {
  name: string;
  role: string;
  location: string;
  initials: string;
  summary: string;
  contacts: {
    type: "email" | "phone" | "website" | "linkedin" | "github";
    text: string;
    href: string;
  }[];
  experience: ResumeJob[];
  projects: ResumeProject[];
  education: {
    degree: string;
    uni: string;
    period: string;
    gpa: string;
    focus: string;
  };
  skills: {
    languagesAndCore: string[];
    frameworksAndWeb: string[];
    architectureAndDSA: string[];
    databasesAndCaching: string[];
    aiAndAutomation: string[];
    toolsAndDevops: string[];
    realTimeAndDevops: string[]; // For backwards compatibility
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
  role: "Software Engineer | .NET Backend Developer",
  location: "Tashkent, Uzbekistan",
  initials: "JS",
  summary:
    "Motivated .NET Backend Developer with hands-on experience building scalable REST APIs and real-time systems using C#, .NET 8, ASP.NET Core, and PostgreSQL. Solid background in Data Structures & Algorithms (DSA), OOP, and Clean Architecture. Experienced with AI automation, RAG workflows, and modern LLMs (ChatGPT, Gemini, Claude) to build robust, modern products.",
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
      type: "website",
      text: "javohir.engineer",
      href: "https://javohir.engineer",
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
      role: "Backend Developer (C# / .NET)",
      company: "EnglishAI",
      period: "Jun 2026 – Present",
      bullets: [
        "Built high-performance ASP.NET Core REST APIs with PostgreSQL and Redis, supporting 700+ active users.",
        "Resolved mobile anti-cheat desync with session recovery, boosting onboarding completion by 78%.",
        "Integrated Azure Speech and Redis caching, slashing median audio evaluation latency by 45%.",
      ],
    },
    {
      role: "C# / .NET Trainee",
      company: "EPAM Systems",
      period: "Sep 2025 – Jan 2026",
      bullets: [
        "Mastered C#, OOP, ASP.NET Core, and applied SOLID and Clean Code principles in production tasks.",
        "Collaborated in Agile sprint teams using Git for version control, code reviews, and test-driven workflows.",
      ],
    },
  ],
  projects: [
    {
      name: "TypingWar",
      domain: "typingwar.uz",
      tech: ".NET 8, SignalR, Redis, PostgreSQL, xUnit",
      desc: "Real-time competitive typing platform with 1v1 duels, automated tournaments, cadence verification, and 105+ xUnit tests.",
    },
    {
      name: "KitobdagiMen",
      domain: "kitobdagimen.uz",
      tech: ".NET 8, Telegram Mini App, PostgreSQL, Redis",
      desc: "Social reading platform with reviews, reading goals, Telegram Mini App integration, HMAC-SHA256 auth, and Redis caching.",
    },
    {
      name: "MeningVaqtim",
      domain: "meningvaqtim.uz",
      tech: ".NET 8, Hangfire, Dapper, PostgreSQL",
      desc: "Productivity tracker for 200+ users with Hangfire background jobs and Dapper aggregate analytics with <60ms load times.",
    },
    {
      name: "Portfolio & AI Assistant",
      domain: "javohir.engineer",
      tech: "Next.js, AI Chatbot, RAG, LLM Integration",
      desc: "Interactive personal engineering platform featuring an AI chatbot providing instant answers about my experience and skills.",
    },
  ],
  education: {
    degree: "Bachelor of Computer Science",
    uni: "PDP University",
    period: "Oct 2024 – Jun 2028",
    gpa: "GPA: 4.13 / 4.5",
    focus:
      "Relevant Courses: Data Structures & Algorithms (DSA), Relational Databases, Network Programming, Operating Systems, OOP",
  },
  skills: {
    languagesAndCore: [
      "C#",
      "Python",
      "C",
      "SQL (PostgreSQL, MS SQL Server, SQLite)",
    ],
    frameworksAndWeb: [
      ".NET (8/9)",
      "ASP.NET Core",
      "REST APIs",
      "EF Core",
      "LINQ",
      "SignalR",
      "Dapper",
      "Hangfire",
    ],
    architectureAndDSA: [
      "Data Structures & Algorithms (DSA)",
      "OOP",
      "Clean Architecture",
      "SOLID",
      "Design Patterns",
      "CQRS basics",
    ],
    databasesAndCaching: [
      "PostgreSQL",
      "Redis (Distributed Caching, Pub/Sub)",
      "MS SQL Server",
      "Query Optimization",
    ],
    aiAndAutomation: [
      "AI Automation",
      "RAG",
      "LLM Tooling & APIs (ChatGPT, Claude, Gemini)",
    ],
    toolsAndDevops: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "xUnit",
      "GitHub Actions (CI/CD)",
      "Linux (Bash)",
    ],
    realTimeAndDevops: [
      "SignalR Core",
      "WebSockets",
      "Docker",
      "Git",
      "CI/CD (GitHub Actions)",
      "Hangfire",
      "Azure Speech",
      "xUnit",
    ],
  },
  certifications: [
    "HackerRank REST API",
    "HackerRank Software Engineer",
    "Microsoft Foundational C#",
  ],
  languages: [
    { name: "English", level: "B1 - Technical / Working" },
    { name: "Uzbek", level: "Native" },
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
