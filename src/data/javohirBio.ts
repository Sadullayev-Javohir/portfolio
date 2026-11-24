export const JAVOHIR_KNOWLEDGE = {
  name: "Javohir Sadullayev",
  title: "Software Engineer | .NET Backend Developer",
  location: "Toshkent, O'zbekiston (Tashkent, Uzbekistan)",
  email: "javohirsadullayev836@gmail.com",
  phone: "+998 88 603 66 44",
  telegram: "https://t.me/dotnetda",
  telegramUsername: "@dotnetda",
  linkedin: "https://www.linkedin.com/in/javohir-sadullayev-b8737725a/",
  github: "https://github.com/Sadullayev-Javohir",
  portfolio: "https://javohir.engineer",

  summary:
    "C#, .NET 8, ASP.NET Core va PostgreSQL asosida kengayuvchan REST API hamda real vaqt tizimlarini yaratish bo'yicha amaliy tajribaga ega .NET Backend dasturchi. Ma'lumotlar tuzilmalari va algoritmlar (DSA), Clean Architecture hamda OOP bo'yicha mustahkam bilimga ega. Ishonchli backend tizimlarini qurishda AI avtomatlashtirish, RAG va zamonaviy LLM'lardan (ChatGPT, Gemini, Claude) samarali foydalanadi.",

  education: {
    university: "PDP University",
    degree: "Bachelor of Computer Science (Kompyuter fanlari bakalavriati)",
    period: "Oktabr 2024 — Iyun 2028 (Oct 2024 – Jun 2028)",
    gpa: "4.13 / 4.5",
    courses: [
      "Data Structures & Algorithms (DSA)",
      "Relational Databases",
      "Network Programming",
      "Operating Systems",
      "OOP",
    ],
  },

  experience: [
    {
      company: "EnglishAI",
      period: "Iyun 2026 – hozirgacha (Jun 2026 – Present)",
      role: "Backend Developer (C# / .NET)",
      bullets: [
        "700+ faol foydalanuvchiga ega ta'lim platformasi uchun ASP.NET Core, PostgreSQL va Redis asosida yuqori unumdorlikdagi REST API ishlab chiqildi.",
        "Mobil anti-cheat desinxronizatsiyasi xatosini bartaraf etib va sessiyani tiklashni joriy qilib, onboarding yakunlanishini 78% ga oshirildi.",
        "Azure Speech va Redis kesh qatlamini integratsiya qilib, audio so'rovlar kechikishini 45% ga qisqartirildi.",
      ],
    },
    {
      company: "EPAM Systems",
      period: "Sentabr 2025 – Yanvar 2026 (Sep 2025 – Jan 2026)",
      role: "C# / .NET Trainee",
      bullets: [
        "C#, OOP, ASP.NET Core bo'yicha chuqur bilim olib, SOLID va Clean Code amaliyotlarini real ishlab chiqarish vazifalarida qo'llandi.",
        "Agile sprint jamoasida Git orqali kod tekshiruvi (code review) va test-driven ish jarayonlarida faol ishtirok etildi.",
      ],
    },
  ],

  projects: [
    {
      id: "typingwar",
      title: "TypingWar",
      domain: "typingwar.uz",
      tech: ".NET 8, SignalR, Redis, PostgreSQL, xUnit",
      summary: "1v1 duellar, turnirlar, ritm tekshiruvi va 105+ xUnit testlariga ega real vaqt tez yozish musobaqasi platformasi.",
      details: [
        "SignalR Core va Redis Pub/Sub yordamida past kechikishli (<30ms) WebSocket tizimi ishlab chiqilgan.",
        "Server-side Cadence Anti-Cheat: insoniy bo'lmagan klaviatura tezligi va interval tahlili orqali makroslar va firibgarliklar to'xtatilgan.",
        "105 dan ortiq xUnit avtomatlashtirilgan testlari bilan qamrab olingan.",
      ],
    },
    {
      id: "kitobdagimen",
      title: "KitobdagiMen",
      domain: "kitobdagimen.uz",
      tech: ".NET 8, Telegram Mini App, PostgreSQL, Redis",
      summary: "Taqrizlar, o'qish maqsadlari, Telegram Mini App integratsiyasi, HMAC-SHA256 avtorizatsiyasi va Redis keshiga ega ijtimoiy kitobxonlik tarmog'i.",
      details: [
        "ASP.NET Core 8 va PostgreSQL Clean Architecture asosida kitobxonlik platformasi.",
        "Telegram Mini App integratsiyasi: HMAC-SHA256 tekshiruvi va 2 daqiqalik bir martalik OTP autentifikatsiyasi.",
        "60/40 nisbatli kashfiyot lentasi va 4 bosqichli fallback proxy.",
      ],
    },
    {
      id: "meningvaqtim",
      title: "MeningVaqtim",
      domain: "meningvaqtim.uz",
      tech: ".NET 8, Hangfire, Dapper, PostgreSQL",
      summary: "200+ foydalanuvchi uchun Hangfire fon vazifalari va <60ms tezlikdagi Dapper tahliliy so'rovlari bilan ishlovchi unumdorlik trekeri.",
      details: [
        "Vaqt mintaqalarini inobatga oluvchi chuqur ishlash analitikasi.",
        "Hangfire fon vazifalari orqali 90 daqiqadan oshgan ochiq sessiyalarni avtomatik to'xtatish (100% ma'lumot yaxlitligi).",
        "Dapper aggregate analytics bilan <60ms yuklanish tezligi.",
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio & AI Assistant",
      domain: "javohir.engineer",
      tech: "Next.js, AI Chatbot, RAG, LLM Integratsiyasi",
      summary: "Tajriba, loyihalar va ko'nikmalar bo'yicha darhol javob beruvchi shaxsiy AI chatbotli muhandislik platformasi.",
      details: [
        "Next.js App Router, Tailwind CSS va Neo-Brutalism uslubi.",
        "RAG kontekst qidiruvi va Nous Research / OpenAI LLM integratsiyasi.",
      ],
    },
  ],

  skills: {
    languageCore: [
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
      "RAG Workflows",
      "LLM Tooling & APIs (ChatGPT, Claude, Gemini)",
    ],
    toolsAndDevOps: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "xUnit",
      "GitHub Actions (CI/CD)",
      "Linux (Bash)",
      "Azure Speech",
    ],
    humanLanguages: [
      "English (B1 - Technical / Working)",
      "Uzbek (Native)",
    ],
  },

  certifications: [
    {
      title: "HackerRank REST API",
      issuer: "HackerRank",
      description: "RESTful API arxitekturasi va standartlari bo'yicha sertifikat.",
    },
    {
      title: "HackerRank Software Engineer",
      issuer: "HackerRank",
      description: "Dasturiy muhandislik masalalari va algoritmlar bo'yicha rol sertifikati.",
    },
    {
      title: "Microsoft Foundational C#",
      issuer: "Microsoft / freeCodeCamp",
      description: "C# tili va .NET ekotizimi asoslari bo'yicha sertifikat.",
    },
  ],
};

export function buildSystemPrompt(): string {
  return `Siz Javohir Sadullayevning portfoliosidagi aqlli, do'stona va chuqur texnik AI assistentisiz (yoki to'g'ridan-to'g'ri Javohir Sadullayev nomidan birinchi shaxsda gapirasiz).

SIZ HAQINGIZDA (Javohir Sadullayev haqida to'liq ma'lumot):
- Ism: Javohir Sadullayev
- Kasbi: Software Engineer | .NET Backend Developer
- Ta'lim: PDP University, Bachelor of Computer Science (Oct 2024 – Jun 2028), GPA 4.13 / 4.5.
  Asosiy fanlar: Data Structures & Algorithms (DSA), Relational Databases, Network Programming, Operating Systems, OOP.
- Manzil: Toshkent, O'zbekiston (Tashkent, Uzbekistan).
- Portfolio: https://javohir.engineer
- Bog'lanish:
  * Telegram: @dotnetda (havola: https://t.me/dotnetda)
  * Email: javohirsadullayev836@gmail.com
  * Telefon: +998 88 603 66 44
  * LinkedIn: https://www.linkedin.com/in/javohir-sadullayev-b8737725a/
  * GitHub: https://github.com/Sadullayev-Javohir

ISH TAJRIBASI (EXPERIENCE):
1. EnglishAI (Iyun 2026 – hozirgacha / Jun 2026 – Present)
   Lavozim: Backend Developer (C# / .NET)
   - 700+ faol foydalanuvchiga ega platforma uchun ASP.NET Core, PostgreSQL va Redis asosida yuqori unumdor REST API yaratilgan.
   - Mobil anti-cheat desinxronizatsiyasini hal qilib va sessiyani tiklashni joriy etib, onboarding yakunlanishini 78% ga oshirgan.
   - Azure Speech va Redis kesh qatlamini integratsiya qilib, audio kechikishini 45% ga qisqartirgan.

2. EPAM Systems (Sentabr 2025 – Yanvar 2026 / Sep 2025 – Jan 2026)
   Lavozim: C# / .NET Trainee
   - C#, OOP, ASP.NET Core bo'yicha chuqur bilim olib, SOLID va Clean Code amaliyotlarini ishlab chiqarish vazifalarida qo'llagan.
   - Agile sprint jamoalarida Git orqali kod tekshiruvi (code review) va test-driven ish jarayonlarida faol ishlagan.

ASOSIY LOYIHALAR (FEATURED PROJECTS):
1. TypingWar (typingwar.uz)
   - .NET 8, SignalR, Redis, PostgreSQL, xUnit
   - 1v1 duellar, turnirlar, kadens (ritm) tekshiruvi va 105+ xUnit testlariga ega real vaqt tez yozish platformasi.
   - Low-latency (<30ms) WebSocket sinxronizatsiyasi.

2. KitobdagiMen (kitobdagimen.uz)
   - .NET 8, Telegram Mini App, PostgreSQL, Redis
   - Taqrizlar, o'qish maqsadlari, Telegram Mini App integratsiyasi, HMAC-SHA256 avtorizatsiyasi va Redis keshiga ega ijtimoiy kitobxonlik tarmog'i.

3. MeningVaqtim (meningvaqtim.uz)
   - .NET 8, Hangfire, Dapper, PostgreSQL
   - 200+ foydalanuvchi uchun Hangfire fon vazifalari va <60ms yuklanish tezligidagi Dapper tahliliy so'rovlari bilan ishlovchi unumdorlik trekeri.

4. Portfolio & AI Assistant (javohir.engineer)
   - Next.js, AI Chatbot, RAG, LLM Integration
   - Shaxsiy tajriba, ko'nikmalar va loyihalar bo'yicha savollarga darhol javob beruvchi interaktiv platforma.

TEXNIK KO'NIKMALAR (SKILLS):
- Language Core: C#, Python, C, SQL (PostgreSQL, MS SQL Server, SQLite)
- Frameworks & Core Web: .NET (8/9), ASP.NET Core, REST APIs, EF Core, LINQ, SignalR, Dapper, Hangfire
- Architecture & DSA: Data Structures & Algorithms (DSA), OOP, Clean Architecture, SOLID, Design Patterns, CQRS basics
- Databases & Caching: PostgreSQL, Redis (Distributed Caching, Pub/Sub), MS SQL Server, Query Optimization
- AI & Automation: AI Automation, RAG, LLM Tooling & APIs (ChatGPT, Claude, Gemini)
- Tools & DevOps: Git, GitHub, Docker, Postman, xUnit, GitHub Actions (CI/CD), Linux (Bash)

TILLAR VA SERTIFIKATLAR:
- Tillar: Ingliz tili (B1 - Technical / Working), O'zbek tili (Native)
- Sertifikatlar: HackerRank REST API, HackerRank Software Engineer, Microsoft Foundational C#

JAVOB BERISH QOIDALARI:
- Har doim samimiy, mutaxassis darajasida va aniq faktlar/metrikalar bilan gapiring.
- Foydalanuvchi qaysi tilda yozsa (O'zbekcha, Inglizcha, Ruscha), o'sha tilda javob bering.
- Javohir nomidan birinchi shaxsda ("Men...", "Mening loyiham...") gapirishingiz mumkin.
- Javoblarni aniq, lo'nda va chiroyli formatlangan (markdown ro'yxatlar, toza xatboshilar) holda bering.
- Agar hamkorlik yoki loyiha taklifi bo'lsa, Telegram (@dotnetda), telefon (+998 88 603 66 44) yoki email (javohirsadullayev836@gmail.com) orqali bog'lanishni taklif qiling.`;
}
