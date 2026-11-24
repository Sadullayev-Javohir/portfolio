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
  { name: "C# / .NET (8/9)", where: "Core language & runtime" },
  { name: "ASP.NET Core", where: "REST APIs & WebSockets" },
  { name: "PostgreSQL", where: "Primary database" },
  { name: "Redis", where: "Distributed cache & Pub/Sub" },
  { name: "AI Automation & RAG", where: "LLMs & workflows" },
];

export const SKILL_GROUPS: SkillCategoryGroup[] = [
  {
    id: "language-core",
    name: "Language Core",
    count: "04",
    color: "#4F7CFF", // blue
    rows: [
      {
        tech: "C#",
        category: "Language Core",
        used: "Primary backend language (production)",
      },
      {
        tech: "Python",
        category: "Language Core",
        used: "Automation & data processing scripts",
      },
      {
        tech: "C",
        category: "Language Core",
        used: "Low-level foundations & algorithms",
      },
      {
        tech: "SQL (PostgreSQL, MS SQL, SQLite)",
        category: "Language Core",
        used: "Relational database queries & tuning",
      },
    ],
  },
  {
    id: "frameworks-core-web",
    name: "Frameworks & Core Web",
    count: "08",
    color: "#FF6B5A", // coral
    rows: [
      {
        tech: ".NET (8/9)",
        category: "Frameworks & Core Web",
        used: "TypingWar · KitobdagiMen · MeningVaqtim · EnglishAI",
      },
      {
        tech: "ASP.NET Core",
        category: "Frameworks & Core Web",
        used: "REST APIs & backend microservices",
      },
      {
        tech: "REST APIs",
        category: "Frameworks & Core Web",
        used: "EnglishAI · KitobdagiMen · HackerRank certified",
      },
      {
        tech: "Entity Framework Core",
        category: "Frameworks & Core Web",
        used: "ORM & relational modeling",
      },
      {
        tech: "LINQ",
        category: "Frameworks & Core Web",
        used: "Data transformations & query pipelines",
      },
      {
        tech: "SignalR",
        category: "Frameworks & Core Web",
        used: "Real-time duels & instant messaging",
      },
      {
        tech: "Dapper",
        category: "Frameworks & Core Web",
        used: "High-performance data queries (<60ms)",
      },
      {
        tech: "Hangfire",
        category: "Frameworks & Core Web",
        used: "Reliable background job orchestration",
      },
    ],
  },
  {
    id: "architecture-dsa",
    name: "Architecture & DSA",
    count: "06",
    color: "#7BE0AD", // mint
    rows: [
      {
        tech: "Data Structures & Algorithms (DSA)",
        category: "Architecture & DSA",
        used: "Academic coursework (GPA 4.13) & HackerRank",
      },
      {
        tech: "OOP",
        category: "Architecture & DSA",
        used: "Clean object-oriented system modeling",
      },
      {
        tech: "Clean Architecture",
        category: "Architecture & DSA",
        used: "Domain isolation & decoupled service design",
      },
      {
        tech: "SOLID Principles",
        category: "Architecture & DSA",
        used: "EPAM Systems training & production code",
      },
      {
        tech: "Design Patterns",
        category: "Architecture & DSA",
        used: "Creational, structural, and behavioral patterns",
      },
      {
        tech: "CQRS basics",
        category: "Architecture & DSA",
        used: "Command/query segregation in APIs",
      },
    ],
  },
  {
    id: "databases-caching",
    name: "Databases & Caching",
    count: "04",
    color: "#FFC940", // yellow
    rows: [
      {
        tech: "PostgreSQL",
        category: "Databases & Caching",
        used: "All backend services & indexing",
      },
      {
        tech: "Redis (Distributed Caching, Pub/Sub)",
        category: "Databases & Caching",
        used: "EnglishAI · TypingWar · KitobdagiMen",
      },
      {
        tech: "MS SQL Server",
        category: "Databases & Caching",
        used: "Enterprise relational schema management",
      },
      {
        tech: "Query Optimization",
        category: "Databases & Caching",
        used: "Execution plans, B-trees & composite indexes",
      },
    ],
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    count: "03",
    color: "#C9BDF5", // lilac
    rows: [
      {
        tech: "AI Automation",
        category: "AI & Automation",
        used: "Automated pipelines & intelligent bots",
      },
      {
        tech: "RAG Workflows",
        category: "AI & Automation",
        used: "Portfolio AI assistant & context retrieval",
      },
      {
        tech: "LLM Tooling & APIs (ChatGPT, Claude, Gemini)",
        category: "AI & Automation",
        used: "Prompt engineering, function calling & APIs",
      },
    ],
  },
  {
    id: "tools-devops",
    name: "Tools & DevOps",
    count: "07",
    color: "#A8D8FF", // sky
    rows: [
      {
        tech: "Git & GitHub",
        category: "Tools & DevOps",
        used: "Version control, branching & code review",
      },
      {
        tech: "Docker",
        category: "Tools & DevOps",
        used: "Containerization & compose environments",
      },
      {
        tech: "Postman",
        category: "Tools & DevOps",
        used: "API testing, mocks & documentation",
      },
      {
        tech: "xUnit",
        category: "Tools & DevOps",
        used: "105+ unit & integration tests (TypingWar)",
      },
      {
        tech: "GitHub Actions (CI/CD)",
        category: "Tools & DevOps",
        used: "Automated build & test pipelines",
      },
      {
        tech: "Linux (Bash)",
        category: "Tools & DevOps",
        used: "Server management, scripts & hosting",
      },
      {
        tech: "Azure Speech",
        category: "Tools & DevOps",
        used: "Speech-to-text & pronunciation evaluation",
      },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "HackerRank REST API",
    sub: "RESTful architecture & API standards",
  },
  {
    title: "HackerRank Software Engineer",
    sub: "Problem solving, DSA & engineering",
  },
  {
    title: "Microsoft Foundational C#",
    sub: "C# language & .NET ecosystem certification",
  },
  {
    title: "Languages",
    sub: "English (B1 - Technical / Working) · Uzbek (Native)",
  },
];
