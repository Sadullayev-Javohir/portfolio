/**
 * SEO & GEO (Generative Engine Optimization) Configuration
 * Optimized for Google Search & AI Crawlers (ChatGPT, Perplexity, Claude, Gemini, SGE)
 * Target queries: "Javohir Sadullayev", "sadullayev", "javohir", "javohir engineer", "javohir.engineer"
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://sadullayev-javohir.github.io"
    : "http://localhost:3000");

export const SITE_CONFIG = {
  name: "Javohir Sadullayev",
  shortName: "Javohir",
  lastName: "Sadullayev",
  alternateNames: [
    "Sadullayev Javohir",
    "javohir engineer",
    "javohir.engineer",
    "Javohir",
    "Sadullayev",
    "Javohirbek Sadullayev",
    "Javohir Sadullayev .NET",
    "Sadullaev Javohir",
  ],
  title: "Javohir Sadullayev · Software Engineer & .NET Developer | javohir.engineer",
  headline: "Software Engineer & .NET Backend Developer in Tashkent, Uzbekistan",
  description:
    "Official portfolio of Javohir Sadullayev (javohir.engineer). Software Engineer & .NET Backend Developer specializing in high-concurrency systems, C# / .NET 8, PostgreSQL, Redis, SignalR, and AI-powered products. PDP University CS student.",
  url: SITE_URL,
  email: "javohirsadullayev836@gmail.com",
  phone: "+998886036644",
  location: {
    city: "Tashkent",
    country: "Uzbekistan",
    countryCode: "UZ",
  },
  education: {
    university: "PDP University",
    degree: "B.Sc. in Computer Science",
    period: "2024 — 2028",
    gpa: "4.13 / 4.5",
  },
  social: {
    github: "https://github.com/Sadullayev-Javohir",
    linkedin: "https://www.linkedin.com/in/javohir-sadullayev-b8737725a/",
    telegram: "https://t.me/dotnetda",
    telegramUsername: "@dotnetda",
  },
  keywords: [
    "Javohir Sadullayev",
    "Sadullayev Javohir",
    "javohir",
    "sadullayev",
    "javohir engineer",
    "javohir.engineer",
    "Javohirbek Sadullayev",
    "Javohir Sadullayev portfolio",
    "Sadullayev portfolio",
    "Javohir portfolio",
    ".NET Developer Tashkent",
    "Software Engineer Uzbekistan",
    "Backend Developer Tashkent",
    "C# Developer",
    "ASP.NET Core Developer",
    "PDP University Javohir Sadullayev",
    "EnglishAI",
    "KitobdagiMen",
    "TypingWar",
    "ZiyoAI",
    "MeningVaqtim",
    "Distributed Systems",
    "Redis SignalR .NET",
    "High-concurrency systems",
    "PostgreSQL query optimization",
    "Azure Cognitive Speech",
  ],
};
