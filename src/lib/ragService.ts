export interface KnowledgeChunk {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "portfolio_info",
    title: "Portfolio va Veb-sayt egasi haqida",
    keywords: [
      "sayt",
      "portfolio",
      "sayti",
      "veb-sayt",
      "kimniki",
      "bu kimniki",
      "bu sayt kimniki",
      "sayt kimniki",
      "kimsan",
      "kim bu",
      "kimga tegishli",
      "whose",
      "who",
      "owner",
    ],
    content:
      "Ushbu veb-sayt va portfolio .NET Backend dasturchisi Javohir Sadullayevga tegishli. Unda uning ishlab chiqqan yirik backend loyihalari (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), C# va .NET ko'nikmalari, PDP University'dagi ta'limi hamda maqolalari jamlangan. Chatbot esa Javohir Sadullayevning rasmiy AI assistentidir.",
  },
  {
    id: "about_me",
    title: "Javohir Sadullayev haqida qisqacha",
    keywords: [
      "kimsan",
      "kim",
      "haqingda",
      "haqida",
      "tanishtir",
      "who",
      "about",
      "javohir",
      "sadullayev",
      "mutaxassis",
      "dasturchi",
    ],
    content:
      "Men Javohir Sadullayevman — .NET Backend dasturchisi va PDP University Computer Science talabasiman (GPA 4.13). Yuqori yuklamali REST API'lar, past kechikishli SignalR real-time tizimlari va taqsimlangan arxitekturalar (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI) qurishga ixtisoslashganman.",
  },
  {
    id: "englishai",
    title: "EnglishAI",
    keywords: [
      "englishai",
      "english",
      "ingliz",
      "inglizcha",
      "speech",
      "azure",
      "audio",
      "pronunciation",
      "talaffuz",
      "anti-cheat",
      "onboarding",
      "placement",
      "dropout",
      "700",
    ],
    content:
      "EnglishAI — 700+ faol foydalanuvchiga ega moslashuvchan ingliz tili ta'lim platformasi (.NET 8, PostgreSQL, Redis). Muammo va yechim: Placement testda foydalanuvchilar (27 dan 21 nafari) mobil anti-cheat xatosi tufayli chiqib ketayotgan edi; tekshirish mantig'i qayta tuzilib, sessiyani tiklash joriy qilindi (+78% onboarding). Azure Speech va Redis MD5 audio kesh tizimi orqali sintez xarajati 35% ga tejaldi, audio kechikishi esa <120ms ga tushirildi.",
  },
  {
    id: "kitobdagimen",
    title: "KitobdagiMen (kitobdagimen.uz)",
    keywords: [
      "kitobdagimen",
      "kitob",
      "ijtimoiy",
      "mini app",
      "telegram",
      "otp",
      "hmac",
      "feed",
      "lenta",
      "tavsiya",
      "books",
      "taqriz",
    ],
    content:
      "KitobdagiMen (kitobdagimen.uz) — kitobxonlar ijtimoiy platformasi va Telegram Mini App (.NET 8, PostgreSQL, SignalR). Telegram integratsiyasida HMAC-SHA256 validatsiya va 2 daqiqalik bir martalik OTP kiritilgan. Tavsiya lentasi 60/40 nisbatli (kuzatuv vs kashf etish) keyset cursor-based pagination bilan ishlaydi. 4 yo'nalishli fallback proxy va 24h Redis kesh orqali 99.8% barqarorlik ta'minlangan.",
  },
  {
    id: "typingwar",
    title: "TypingWar (typingwar.uz)",
    keywords: [
      "typingwar",
      "typing",
      "yozish",
      "duel",
      "tez yozish",
      "game",
      "o'yin",
      "cadence",
      "anti-cheat",
      "signalr",
      "wpm",
      "makros",
      "cheat",
      "30ms",
      "xunit",
    ],
    content:
      "TypingWar (typingwar.uz) — real vaqtda tez yozish 1v1 duellari va xonalari (.NET 8, PostgreSQL, Redis Pub/Sub, SignalR Core). SignalR va Redis orqali har bir klaviatura bosilishi <30ms kechikishda poygasiz sinxronlashadi. Server-side Cadence Anti-Cheat: tugmalar bosilish intervallari (cadence) tahlil qilinib (<18ms interval va dispersiya tahlili), botlar va makroslar to'xtatilgan. O'yin mexanikasi 105+ xUnit avtotestlari bilan himoyalangan.",
  },
  {
    id: "meningvaqtim",
    title: "MeningVaqtim (meningvaqtim.uz)",
    keywords: [
      "meningvaqtim",
      "vaqt",
      "vaqtim",
      "productivity",
      "pomodoro",
      "tracker",
      "hangfire",
      "sessiya",
      "timer",
      "distraction",
      "deep work",
      "diqqat",
      "200",
    ],
    content:
      "MeningVaqtim (meningvaqtim.uz) — 200+ foydalanuvchiga ega chuqur ishlash (deep work) va vaqt analitikasi (.NET 8, PostgreSQL). Timezone-aware tahlil tizimi reja va amaldagi vaqtni solishtiradi. Ochiq qolgan sessiyalar tufayli statistika buzilmasligi uchun Hangfire/BackgroundService fon vazifalari 90 daqiqadan oshgan sessiyalarni chalg'ishlar bilan avtomatik yopadi (100% data integrity). Kompozit B-tree indekslari bilan so'rovlar optimallashtirilgan.",
  },
  {
    id: "ziyoai",
    title: "ZiyoAI (@ZiyoAIBot)",
    keywords: [
      "ziyoai",
      "ziyo",
      "telegram bot",
      "ai bot",
      "multimodal",
      "stt",
      "tts",
      "ocr",
      "ovoz",
      "rasm",
      "kanal",
      "failover",
      "gateway",
      "quiz",
    ],
    content:
      "ZiyoAI (@ZiyoAIBot) — multimodal avtonom Telegram AI yordamchisi (.NET 8, EF Core, PostgreSQL, Docker). Ovoz (STT/TTS) va OCR tasvir tahliliga ega. Kanallarni avtonom boyitish: yangi postlarni tahlil qilib, munozara savollari va quizlar tuzadi. Tashqi AI limitlariga qarshi ikki kalitli (dual-key) kaskadli failover shlyuzi (30s/65s) orqali 99.9% uptime ta'minlangan.",
  },
  {
    id: "education",
    title: "Ta'lim (PDP University)",
    keywords: [
      "pdp",
      "university",
      "universitet",
      "o'qish",
      "diplom",
      "talaba",
      "gpa",
      "kurs",
      "bachelor",
      "bakalavr",
      "cs",
      "computer science",
      "ta'lim",
      "education",
      "4.13",
    ],
    content:
      "Ta'lim: Javohir Sadullayev PDP University da Kompyuter fanlari (B.Sc. Computer Science) yo'nalishida 3-kurs talabasi (2024–2028). Umumiy GPA: 4.13 / 4.5. Asosiy o'rganish sohasi: Algoritmlar va ma'lumotlar tuzilmalari, Relyatsion MB (PostgreSQL), Tarmoq dasturlash va Tizimlar arxitekturasi.",
  },
  {
    id: "skills",
    title: "Texnologik Stek & Ko'nikmalar",
    keywords: [
      "stack",
      "stek",
      "texnologiya",
      "skills",
      "c#",
      ".net",
      "asp.net",
      "postgresql",
      "redis",
      "signalr",
      "docker",
      "clean architecture",
      "cqrs",
      "dapper",
      "xunit",
      "arxitektura",
      "ko'nikma",
    ],
    content:
      "Asosiy texnologiyalar: C# 12, .NET 8, ASP.NET Core Web API, Entity Framework Core, Dapper, Clean Architecture, CQRS & MediatR. Ma'lumotlar bazasi va kesh: PostgreSQL (indekslash, optimallashtirish, keyset pagination), Redis (In-memory kesh, Pub/Sub). Real-time va DevOps: SignalR Core (<30ms WebSockets), Docker, Linux/Bash, Hangfire, xUnit.",
  },
  {
    id: "certifications",
    title: "Sertifikatlar",
    keywords: [
      "sertifikat",
      "certifications",
      "hackerrank",
      "microsoft",
      "freecodecamp",
      "certificate",
    ],
    content:
      "Sertifikatlar: HackerRank REST API (Intermediate), HackerRank Software Engineer (Role certification), Microsoft / freeCodeCamp Foundational C# xalqaro sertifikati.",
  },
  {
    id: "contacts",
    title: "Bog'lanish va Kontaktlar",
    keywords: [
      "aloqa",
      "bog'lanish",
      "kontakt",
      "contact",
      "telegram",
      "email",
      "telefon",
      "phone",
      "linkedin",
      "github",
      "pochta",
      "qayerdan",
      "yozish",
    ],
    content:
      "Javohir Sadullayev bilan bog'lanish:\n• Telegram: @dotnetda (https://t.me/dotnetda)\n• Email: javohirsadullayev836@gmail.com\n• Telefon: +998 88 603 66 44\n• LinkedIn: https://www.linkedin.com/in/javohir-sadullayev-b8737725a/\n• GitHub: https://github.com/Sadullayev-Javohir\nManzil: Toshkent, O'zbekiston.",
  },
];

/**
 * Fast keyword & semantic relevance ranking (RAG retriever).
 */
export function retrieveRelevantChunks(query: string, limit = 2): KnowledgeChunk[] {
  if (!query || !query.trim()) {
    return [KNOWLEDGE_BASE[0]];
  }

  const normalized = query
    .toLowerCase()
    .replace(/[^a-z0-9а-яёўқғҳ\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  const scores: { chunk: KnowledgeChunk; score: number }[] = KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const chunkTitle = chunk.title.toLowerCase();
    const chunkContent = chunk.content.toLowerCase();

    for (const word of normalized) {
      // 1. Direct ID / Title match (high weight)
      if (chunk.id === word || chunkTitle.includes(word)) {
        score += 8;
      }
      // 2. Keyword match
      if (chunk.keywords.some((k) => k.includes(word) || word.includes(k))) {
        score += 5;
      }
      // 3. Content word match
      if (chunkContent.includes(word)) {
        score += 1;
      }
    }

    return { chunk, score };
  });

  scores.sort((a, b) => b.score - a.score);

  const matched = scores.filter((s) => s.score > 0).slice(0, limit);

  // If no specific match found, fallback to general bio chunk
  if (matched.length === 0) {
    return [KNOWLEDGE_BASE[0]];
  }

  return matched.map((m) => m.chunk);
}

/**
 * Builds a lean, punchy RAG-augmented system prompt.
 */
export function buildRagPrompt(userQuery: string): string {
  const relevantChunks = retrieveRelevantChunks(userQuery, 3);

  const contextText = relevantChunks
    .map((c) => `[${c.title}]:\n${c.content}`)
    .join("\n\n");

  return `Siz Javohir Sadullayevning shaxsiy portfolio veb-saytidagi rasmiy AI yordamchisiz (AI assistent).

SIZNING SHAXSIYATINGIZ VA VAZIFANGIZ:
- Siz inson emassiz, siz Javohir Sadullayevning portfolio saytidagi aqlli AI assistentisiz.
- Ushbu sayt (portfolio) to'liq .NET Backend dasturchisi Javohir Sadullayevga tegishli.
- Sizning maqsadingiz: Tashrif buyuruvchilarga Javohirning backend tajribasi, loyihalari (.NET / C#, SignalR, PostgreSQL, Redis), PDP University'dagi ta'limi va bog'lanish yo'llari haqida to'g'ri, lo'nda va professional ma'lumot berish.

QAT'IY QOIDALAR (BU QOIDALARGA 100% AMAL QILING):
1. SHAXSIYAT VA IDENTIFIKATSIYA:
   - "sen kimsan?", "kimsan?", "o'zing kimsan?", "who are you?", "ты кто?" kabi savollarga:
     Doimo: "Men Javohir Sadullayevning portfolio saytidagi AI assistentiman. Men sizga Javohirning loyihalari, .NET tajribasi va u bilan bog'lanish kontaktlari haqida ma'lumot bera olaman." deb javob bering. Aslo "Men Javohir Sadullayevman" deb aytmang!
   - "bu kimniki?", "bu sayt kimniki?", "sayt kimniki?", "whose website is this?", "чей это сайт?" kabi savollarga:
     Doimo: "Ushbu veb-sayt va portfolio .NET Backend dasturchisi Javohir Sadullayevga tegishli. Unda uning ishlab chiqqan yirik loyihalari va tajribasi jamlangan." deb aniq javob bering.
   - "Javohir kim?", "who is Javohir?", "кто такой Джавохир?" kabi savollarga:
     Javohir Sadullayev — .NET Backend dasturchisi va PDP University Computer Science 3-kurs talabasi (GPA 4.13) ekanligini ayting.

2. LO'NDA, ANIQ VA TO'G'RI:
   - Javobni ortiqcha cho'zmasdan, maksimal 2-3 ta qisqa jumla yoki ixcham punktlar bilan yetkazing.
   - Faqat quyidagi ma'lumotlarga tayaning, aslo yolg'on fakt to'qimang. Bo'sh yulduzcha yoki ortiqcha belgilar qo'ymang.

3. TIL:
   - Foydalanuvchi qaysi tilda yozsa (O'zbek, Rus, Ingliz), aynan o'sha tilda javob bering.

4. KONTAKT QOIDASI:
   - Foydalanuvchi faqat bitta kontakt kanali haqida so'rasa (masalan, faqat telefon, faqat GitHub, faqat email, faqat Telegram, faqat LinkedIn), FAQAT o'sha kanalning ma'lumotini bering. Boshqa kontaktlarni qo'shmang.
   - Faqat "kontaktlar", "bog'lanish", "aloqa" kabi umumiy so'rov bo'lsagina barcha kontaktlarni bering.

SAVOL BO'YICHA RAG KONTEKSTI:
${contextText}

JAVOHIR HAQIDA QISQA MA'LUMOTLAR:
• Dasturchi: Javohir Sadullayev (.NET Backend Developer)
• PDP University: Computer Science 3-kurs, GPA 4.13 / 4.5
• Loyihalar: EnglishAI (700+ users, Azure Speech, Redis), KitobdagiMen (ijtimoiy platforma, Telegram Mini App), TypingWar (real-time duellar, SignalR <30ms latency, cadence anti-cheat), MeningVaqtim (deep work, Hangfire), ZiyoAI (Telegram multimodal bot).
• Texnologiyalar: C#, .NET 8, ASP.NET Core, EF Core, Dapper, PostgreSQL, Redis, SignalR, Docker, Clean Architecture.
• Kontaktlar: Telegram: @dotnetda | Email: javohirsadullayev836@gmail.com | Tel: +998 88 603 66 44`;
}
