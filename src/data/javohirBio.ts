export const JAVOHIR_KNOWLEDGE = {
  name: "Javohir Sadullayev",
  title: ".NET Backend Developer & Computer Science Student",
  location: "Toshkent, O'zbekiston (Tashkent, Uzbekistan)",
  email: "javohirsadullayev836@gmail.com",
  phone: "+998 88 603 66 44",
  telegram: "https://t.me/dotnetda",
  telegramUsername: "@dotnetda",
  linkedin: "https://www.linkedin.com/in/javohir-sadullayev-b8737725a/",
  github: "https://github.com/Sadullayev-Javohir",
  portfolio: "https://javohir.engineer",

  education: {
    university: "PDP University",
    degree: "B.Sc. in Computer Science (Kompyuter fanlari bakalavriati)",
    period: "Oktabr 2024 — Iyun 2028 (Hozirda 3-kurs talabasi)",
    gpa: "4.13 / 4.5",
    focus: [
      "Algoritmlar va ma'lumotlar tuzilmalari (Algorithms & Data Structures)",
      "Relyatsion ma'lumotlar bazalari (Relational Databases, PostgreSQL, SQL Optimization)",
      "Tarmoq dasturlash va protokollar (Network Programming, WebSockets, HTTP/2)",
      "Tizimlar arxitekturasi va taqsimlangan tizimlar (Distributed Systems, Clean Architecture)",
    ],
  },

  skills: {
    languages: ["C# (C# 12)", ".NET 8 / .NET Core", "SQL", "TypeScript / JavaScript"],
    backend: [
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "Dapper",
      "Clean Architecture",
      "CQRS & MediatR",
      "RESTful API Design",
      "Background Jobs (Hangfire, IHostedService, BackgroundService)",
    ],
    databasesAndCache: [
      "PostgreSQL (Indexing, Query Optimization, Cursor Pagination)",
      "Microsoft SQL Server",
      "Redis (In-memory Caching, Distributed Locks, Pub/Sub)",
    ],
    realtimeAndAI: [
      "SignalR Core",
      "WebSockets (<30ms low-latency streaming)",
      "Azure Cognitive Services (Speech-to-Text, Text-to-Speech)",
      "OpenAI / Nous Research LLM Integrations",
      "OCR Visual Comprehension",
    ],
    devopsAndTools: [
      "Docker & Docker Compose",
      "Git & GitHub Actions (CI/CD)",
      "Linux / Bash",
      "Postman",
      "Serilog & Observability",
      "xUnit (Unit & Integration Testing)",
    ],
    humanLanguages: [
      "O'zbek tili (Native / Ona tili)",
      "Ingliz tili (English - B1, texnik hujjatlar va kasbiy muloqot)",
      "Rus tili (Russian - professional darajada muloqot)",
    ],
  },

  certifications: [
    {
      title: "HackerRank REST API (Intermediate)",
      issuer: "HackerRank",
      description: "RESTful API arxitekturasi va ilg'or HTTP amaliyotlari bo'yicha sertifikat.",
    },
    {
      title: "HackerRank Software Engineer",
      issuer: "HackerRank",
      description: "Dasturiy muhandislik masalalari va algoritmlar bo'yicha rol sertifikati.",
    },
    {
      title: "Foundational C#",
      issuer: "Microsoft / freeCodeCamp",
      description: "C# tili va .NET ekotizimi asoslari bo'yicha xalqaro sertifikat.",
    },
  ],

  projects: [
    {
      id: "englishai",
      title: "EnglishAI",
      category: "Backend & AI",
      period: "Iyul 2026 — Hozir",
      role: "Backend Developer",
      metrics: "700+ faol o'rganuvchilar · <120ms kechikish · +78% onboarding completion",
      summary: "Nutqni baholash, darajani aniqlash testi va real vaqt talaffuz balliga ega moslashuvchan ingliz tili ta'lim platformasi.",
      details: [
        "700+ faol foydalanuvchiga ega ta'lim platformasi uchun ASP.NET Core, PostgreSQL va Redis asosida barqaror REST API ishlab chiqilgan.",
        "Placement-test loglari tahlil qilingan: 27 foydalanuvchidan 21 nafari mobil qurilmalarda noto'g'ri ishlagan anti-cheat mexanizmi tufayli testni tashlab ketgani aniqlangan. Shubhali mantiq qayta yozilib, sessiyani tiklash qo'shilgan, bu esa onboardingni 78% ga oshirgan.",
        "Azure Speech (STT va talaffuzni baholash) integratsiya qilingan. Takroriy so'rovlar uchun MD5-heshlangan Redis audio kesh tizimi yaratilib, sun'iy sintez xarajatlari 35% ga, audio kechikishi esa <120ms ga qisqartirilgan.",
      ],
      stack: ["ASP.NET Core", ".NET 8", "PostgreSQL", "Redis", "Azure Speech", "Docker"],
    },
    {
      id: "kitobdagimen",
      title: "KitobdagiMen (kitobdagimen.uz)",
      category: "Full-Stack · Social & Telegram Mini App",
      period: "Iyun 2026 — Iyul 2026",
      role: "Full-Stack Developer",
      metrics: "99.8% Uptime · 60/40 Lenta · 2 daqiqalik xavfsiz OTP",
      summary: "Kitobxonlar uchun ijtimoiy platforma, sharhlar, iqtiboslar, o'qish maqsadlari va Telegram Mini App bilan integratsiya.",
      details: [
        "ASP.NET Core 8 va PostgreSQL Clean Architecture asosida kitoblar, taqrizlar, o'qish maqsadlari, iqtiboslar va SignalR asosidagi real vaqt chati qurilgan.",
        "Telegram Bot va Mini App integratsiyasi: sharh va iqtiboslarni xabar ID sinxronizatsiyasi bilan avtomatlashtirilgan kanallarga uzatish, Telegram Mini App HMAC-SHA256 tekshiruvi va 2 daqiqalik bir martalik OTP autentifikatsiyasi yaratilgan.",
        "60/40 nisbatli kuzatilayotgan va kashf etilayotgan mualliflar algoritmi (keyset cursor-based pagination) bilan ta'minlangan. Katalog cheklovlariga qarshi 4 bosqichli fallback proxy va 24 soatlik Redis kesh qurilib, 99.8% barqarorlik ta'minlangan.",
      ],
      stack: [".NET 8", "PostgreSQL", "SignalR", "Telegram Mini App", "Redis", "HMAC-SHA256"],
    },
    {
      id: "typingwar",
      title: "TypingWar (typingwar.uz)",
      category: "Game & Real-Time Engine",
      period: "Iyun 2026 — Iyul 2026",
      role: "Full-Stack Developer",
      metrics: "<30ms kechikish · Server-side Cadence Anti-Cheat · 105+ xUnit tests",
      summary: "Real vaqt rejimida tez yozish bo'yicha 1v1 duellar, ko'p o'yinchili xonalar va sun'iy intellekt spar-botlari.",
      details: [
        "SignalR Core va Redis Pub/Sub yordamida past kechikishli (<30ms) WebSocket tizimi ishlab chiqilgan: har bir klaviatura bosilishi, WPM tezligi va xatolar real vaqtda poygasiz holatda sinxronlashadi.",
        "Server tomonida tugmalar oralig'i (cadence) tahlili kiritilgan: insoniy bo'lmagan tezlik (masalan, <18ms interval va o'rtacha kvadratik chetlanish stdDev < 11.5) orqali klaviatura makroslari, botlar va nusxalash firibgarliklari to'xtatilgan.",
        "O'yin mexanikasi 105 dan ortiq xUnit avtomatlashtirilgan testlari bilan qamrab olingan.",
      ],
      stack: [".NET 8", "SignalR Core", "Redis Pub/Sub", "PostgreSQL", "WebSockets", "xUnit"],
    },
    {
      id: "meningvaqtim",
      title: "MeningVaqtim (meningvaqtim.uz)",
      category: "Productivity & Backend",
      period: "Faol Loyiha (Active)",
      role: "Backend Developer",
      metrics: "200+ foydalanuvchilar · 100% ma'lumot yaxlitligi · Timezone-aware",
      summary: "Rejalashtirilgan vazifalar va diqqatli ish (deep work) sessiyalarini taqqoslovchi shaxsiy vaqt boshqaruvi platformasi.",
      details: [
        "200+ foydalanuvchiga xizmat ko'rsatuvchi, vaqt mintaqalarini inobatga oladigan chuqur ishlash analitikasi ishlab chiqilgan.",
        "Ochiq qolib ketgan taymerlar tufayli haftalik statistika buzilishining oldini olish uchun Hangfire va BackgroundService fon vazifalari joriy qilingan: 90 daqiqadan oshgan sessiyalar chalg'ishlar bilan avtomatik yopiladi (100% ma'lumot yaxlitligi).",
        "PostgreSQL'da murakkab vaqt agregatsiyalari va filtrlari uchun maxsus kompozit B-tree indekslari yaratilib, so'rov tezligi optimallashtirilgan.",
      ],
      stack: [".NET 8", "PostgreSQL", "Hangfire", "Docker", "Clean Architecture"],
    },
    {
      id: "ziyoai",
      title: "ZiyoAI (@ZiyoAIBot)",
      category: "AI & Education",
      period: "Avgust 2026 — Sentabr 2026",
      role: "Backend & AI Engineer",
      metrics: "99.9% Uptime · Dual-Key Failover Gateway · Multimodal (Audio/OCR)",
      summary: "Guruhlar va kanallar uchun avtonom multimodal Telegram AI yordamchisi (ovozli muloqot, OCR va avtomatik post boyitish).",
      details: [
        ".NET 8, EF Core, PostgreSQL va Docker mikroservislari asosida ovozli kiritish/chiqarish (STT/TTS) va tasvirlarni ko'rish (OCR) qobiliyatiga ega bot yaratilgan.",
        "Kanal postlarini avtonom tahlil qilish moduli: ulangan kanallarga tushgan yangi maqolalarni o'rganib, guruhlar uchun munozara savollari, xulosalar va viktorina (quiz) tuzadi.",
        "Tashqi AI API'larining kvota va taymout cheklovlariga qarshi ikki kalitli (dual-key) kaskadli failover shlyuzi ishlab chiqilgan (30 soniya birlamchi, 65 soniya jami taymout) va so'rovlar deduplikatsiyasi bilan 99.9% uptime ta'minlangan.",
      ],
      stack: [".NET 8", "Azure Cognitive Services", "PostgreSQL", "Docker", "Redis", "OpenAI / Nous"],
    },
  ],

  engineeringPrinciples: [
    {
      title: "1. Serverga ishon (Never trust the client)",
      desc: "Mijoz yuborgan har bir so'rov, vaqt oraliqlari va qiymatlar serverda qat'iy tekshiriladi va hisoblanadi (masalan, TypingWar'dagi cadence anti-cheat).",
    },
    {
      title: "2. Keshlash — bu arxitektura (Caching is an architecture)",
      desc: "Keshlash faqat ma'lumotni saqlash emas; aniq TTL, xesh kalitlari (MD5) va invalidatsiya siyosati bo'lmasa, kesh yangi xatolar manbaiga aylanadi.",
    },
    {
      title: "3. Toza kod va modullilik (Clean Architecture & CQRS)",
      desc: "Biznes mantig'ini (Domain) tashqi freymvorklar va kutubxonalardan mustaqil saqlash xUnit orqali oson va ishonchli testlash imkonini beradi.",
    },
    {
      title: "4. Ma'lumot yaxlitligi (Data integrity above all)",
      desc: "Tranzaksiyalar, fon ishchilari (Hangfire) va kaskadli zaxira shlyuzlari har bir jarayon oxirigacha xatosiz yetib borishini ta'minlaydi.",
    },
  ],
};

export function buildSystemPrompt(): string {
  return `Siz Javohir Sadullayevning portfoliosidagi aqlli, do'stona va chuqur texnik AI assistentisiz (yoki to'g'ridan-to'g'ri Javohir Sadullayev nomidan birinchi shaxsda gapirasiz).

SIZ HAQINGIZDA (Javohir Sadullayev haqida to'liq ma'lumot):
- Ism: Javohir Sadullayev
- Kasbi: .NET Backend Dasturchi, tizimlar arxitekturasi va real-time infratuzilma muhandisi.
- Ta'lim: PDP University, Computer Science (B.Sc.) 3-kurs talabasi (2024-2028), GPA 4.13 / 4.5.
- Asosiy texnologik stek: C# (C# 12), .NET 8, ASP.NET Core Web API, PostgreSQL, Redis, SignalR Core, Docker, Hangfire, Azure Cognitive Services (Speech), xUnit, Clean Architecture, CQRS, Dapper.
- Manzil: Toshkent, O'zbekiston.
- Bog'lanish:
  * Telegram: @dotnetda (havola: https://t.me/dotnetda)
  * Email: javohirsadullayev836@gmail.com
  * Telefon: +998 88 603 66 44
  * LinkedIn: https://www.linkedin.com/in/javohir-sadullayev-b8737725a/
  * GitHub: https://github.com/Sadullayev-Javohir

LOYIHALAR TAFSILOTLARI:
1. EnglishAI:
   - 700+ faol foydalanuvchiga ega moslashuvchan ingliz tili platformasi.
   - Muammo va yechim: Placement testda 27 foydalanuvchidan 21 nafari noto'g'ri mobil anti-cheat tufayli chiqib ketgan. Javohir anti-cheat logikasini to'g'rilab, sessiya tiklashni joriy qildi (+78% onboarding completion).
   - Azure Speech STT/TTS va MD5-keshlangan Redis audio tizimi orqali API xarajatlarini 35% ga tejab, kechikishni <120ms ga tushirdi.

2. KitobdagiMen (kitobdagimen.uz):
   - Kitobxonlar ijtimoiy tarmog'i va Telegram Mini App.
   - Telegram bot va Mini App uchun HMAC-SHA256 validatsiya va 2 daqiqalik xavfsiz OTP autentifikatsiyasi.
   - Algoritmik 60/40 lenta (kuzatilayotgan vs yangi mualliflar balansi) keyset cursor-based pagination bilan qurilgan.
   - 4-yo'nalishli fallback proxy va 24 soatlik Redis kesh bilan 99.8% uptime.

3. TypingWar (typingwar.uz):
   - Real-time tez yozish 1v1 duellari va xonalari.
   - SignalR Core va Redis Pub/Sub orqali tugmalar bosilishi va WPM tezligini <30ms kechikishda sinxronlash.
   - Server-side Cadence Anti-Cheat: insoniy bo'lmagan tezlikni (interval <18ms yoki o'rtacha kvadratik og'ish stdDev < 11.5) hisoblab botlar va makroslarni bartaraf etgan.
   - 105+ xUnit testlari bilan himoyalangan.

4. MeningVaqtim (meningvaqtim.uz):
   - 200+ foydalanuvchiga ega chuqur ishlash (deep work) va Pomodoro tahlil platformasi.
   - Foydalanuvchilar sessiyani ochiq qoldirib ketganda analitika buzilmasligi uchun Hangfire/BackgroundService fon vazifalari 90 daqiqadan oshgan sessiyalarni chalg'ishlar bilan avtomatik yopadi (100% data integrity).
   - PostgreSQL kompozit B-tree indekslari bilan tezkor vaqt agregatsiyalari.

5. ZiyoAI (@ZiyoAIBot):
   - Avtonom multimodal Telegram AI yordamchi boti (Ovoz STT/TTS, OCR, Docker).
   - Kanallarni avtomatik boyitish: ulangan kanallardagi yangi postlarni avtonom tahlil qilib, munozara savollari va quizlar tuzadi.
   - Ikki kalitli (dual-key) kaskadli failover gateway (30s/65s) orqali AI API uzilishlarini yengib, 99.9% uptime ta'minlagan.

MUHANDISLIK TAMOYILLARI:
- Serverga ishon (Never trust client input)
- Keshlash — bu shunchaki RAM emas, aniq TTL va invalidatsiyaga ega puxta arxitektura
- Clean Architecture va CQRS: biznes mantiq freymvorkdan mustaqil bo'lishi kerak
- Ma'lumotlar yaxlitligi: tranzaksiyalar va Hangfire fon vazifalari

JAVOB BERISH QOIDALARI:
- Har doim samimiy, mutaxassis darajasida va aniq metrikalar bilan gapiring.
- Foydalanuvchi qaysi tilda yozsa (O'zbekcha, Inglizcha, Ruscha), o'sha tilda javob bering.
- Javohir nomidan birinchi shaxsda ("Men...", "Mening loyiham...") gapirishingiz mumkin.
- Javoblarni juda cho'zib yubormang, aniq, lo'nda va chiroyli formatlangan (markdown ro'yxatlar, toza xatboshilar bilan) holda bering.
- Matnda ortiqcha, bo'sh yoki noto'g'ri yulduzchalarni ishlatmang (masalan: bo'sh yulduzchalar yoki bo'sh qavslar qo'ymang). Matn o'qishga qulay va ravon bo'lsin.
- Agar loyiha taklifi yoki hamkorlik haqida so'rashsa, Telegram (@dotnetda), telefon yoki email orqali bog'lanishni taklif qiling.`;
}
