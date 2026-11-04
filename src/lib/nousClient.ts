import { getAiConfig } from "./aiConfig";
import { buildRagPrompt } from "./ragService";

const NOUS_BASE_URL =
  process.env.NOUS_BASE_URL || "https://inference-api.nousresearch.com/v1";
const NOUS_API_KEY =
  process.env.NOUS_API_KEY || "sk-nous-DXuYhAN0EECISfov3ttdsIMEcllgKbCe";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ModelInfo {
  id: string;
  name: string;
  isFree: boolean;
  contextLength?: number;
  description?: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

export async function fetchNousModels(): Promise<ModelInfo[]> {
  try {
    const res = await fetch(`${NOUS_BASE_URL}/models`, {
      headers: {
        Authorization: `Bearer ${NOUS_API_KEY}`,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Nous API models fetch failed: ${res.statusText}`);
    }

    const json = await res.json();
    const data: any[] = json.data || [];

    const formatted: ModelInfo[] = data
      .filter((m) => {
        const endpoints = m.endpoints || [];
        return (
          endpoints.includes("/api/v1/chat/completions") ||
          endpoints.includes("/v1/chat/completions")
        );
      })
      .map((m) => {
        const promptPrice = parseFloat(m.pricing?.prompt || "0");
        const completionPrice = parseFloat(m.pricing?.completion || "0");
        const isFree =
          (promptPrice === 0 && completionPrice === 0) ||
          m.id.toLowerCase().includes(":free") ||
          m.id.toLowerCase().includes("free");

        return {
          id: m.id,
          name: m.name || m.id,
          isFree,
          contextLength: m.context_length,
          description: m.description,
          pricing: {
            prompt: m.pricing?.prompt || "0",
            completion: m.pricing?.completion || "0",
          },
        };
      });

    // Sort free models first, then alphabetical
    formatted.sort((a, b) => {
      if (a.isFree && !b.isFree) return -1;
      if (!a.isFree && b.isFree) return 1;
      return a.id.localeCompare(b.id);
    });

    return formatted;
  } catch (err) {
    console.error("fetchNousModels error:", err);
    return [
      { id: "upstage/solar-mini4:free", name: "Upstage: Solar Mini 4", isFree: true },
      { id: "stepfun/step-3.7-flash:free", name: "StepFun: Step 3.7 Flash", isFree: true },
      { id: "stealth/crouton-alpha", name: "Crouton Alpha", isFree: true },
      { id: "reflection/beam-1.0-501b-a23b:free", name: "Reflection: Beam 1.0", isFree: true },
    ];
  }
}

export async function testModelPing(
  modelId: string
): Promise<{ ok: boolean; latencyMs: number; error?: string; reply?: string }> {
  const start = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${NOUS_API_KEY}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages: [{ role: "user", content: "Ping! Reply with 'PONG'." }],
        tags: ["user=javohir"],
        max_tokens: 15,
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const latencyMs = Date.now() - start;

    if (!res.ok) {
      const errText = await res.text();
      let msg = `HTTP ${res.status}`;
      try {
        const parsed = JSON.parse(errText);
        msg = parsed.message || parsed.error?.message || msg;
      } catch {
        msg = errText.slice(0, 100);
      }
      return { ok: false, latencyMs, error: msg };
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      data.choices?.[0]?.message?.reasoning ||
      "PONG";
    return { ok: true, latencyMs, reply: reply.trim() };
  } catch (err: any) {
    clearTimeout(timeout);
    const latencyMs = Date.now() - start;
    const isTimeout = err.name === "AbortError";
    return {
      ok: false,
      latencyMs,
      error: isTimeout ? "Taymout (8 soniya oshdi)" : err.message || "Ulanish xatosi",
    };
  }
}

/**
 * Detects common deterministic queries (e.g., identity, portfolio ownership, contact info)
 * and returns a flawless, instantly grounded answer in the appropriate language.
 */
export function matchDirectIntent(query: string): string | null {
  const q = (query || "")
    .trim()
    .toLowerCase()
    .replace(/[?!.,;:"`\x27‘’“”]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");

  if (!q) return null;

  // 1. "bu kimniki?" / "bu sayt kimniki?"
  const isWhoseSite =
    /^(bu\s+)?(sayt|veb-?sayt|portfolio|veb\s+sayt)?\s*(kimniki|kimga\s+(tegishli|qarashli)|kimning\s+(sayti|portfoliosi))(\s|$)/iu.test(q) ||
    /^(whose\s+(website|site|portfolio)|who\s+owns\s+this)(\s|$)/iu.test(q) ||
    /^(чей\s+(это\s+)?(сайт|портфолио)|кому\s+принадлежит\s+(этот\s+)?(сайт|портфолио))(\s|$)/iu.test(q) ||
    q === "kimniki";

  if (isWhoseSite) {
    if (/[а-яё]/iu.test(q)) {
      return "Этот сайт и портфолио принадлежат .NET Backend разработчику Джавохиру Садуллаеву. Здесь собраны его реальные проекты (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), стек технологий и статьи. А я — его AI-ассистент, готовый ответить на любые вопросы о его опыте.";
    }
    if (/^(whose|who)/i.test(q)) {
      return "This portfolio website belongs to Javohir Sadullayev, a .NET Backend Developer. It showcases his engineering projects (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), technical stack, and system architecture case studies. I am his AI assistant, here to help answer your questions.";
    }
    return "Ushbu veb-sayt va portfolio .NET Backend dasturchisi Javohir Sadullayevga tegishli. Unda uning ishlab chiqqan yirik loyihalari (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), texnologik steki, maqolalari va tajribasi jamlangan. Men esa uning AI assistentiman va sayt bo'yicha har qanday savolingizga javob beraman.";
  }

  // 2. "sen kimsan?" / "kimsan?"
  const isWhoAreYou =
    /^(sen\s+)?(ozing\s+|o\x27zing\s+)?kimsan(\s|$)/iu.test(q) ||
    /^(siz\s+)?kimsiz(\s|$)/iu.test(q) ||
    /^(kim\s+bu|bu\s+kim)(\s|$)/iu.test(q) ||
    /^who\s+(are\s+you|r\s+u)(\s|$)/iu.test(q) ||
    /^(ты\s+кто|кто\s+ты|кто\s+вы|вы\s+кто)(\s|$)/iu.test(q);

  if (isWhoAreYou) {
    if (/[а-яё]/iu.test(q)) {
      return "Я — официальный AI-ассистент в портфолио Джавохира Садуллаева. Я помогаю посетителям узнать больше о проектах Джавохира на .NET / C# (EnglishAI, KitobdagiMen, TypingWar), его стеке, учёбе в PDP University (GPA 4.13) и контактных данных. Чем могу помочь?";
    }
    if (/^(who)/i.test(q)) {
      return "I am the AI assistant on Javohir Sadullayev's portfolio website. I can provide detailed information about Javohir's .NET / C# backend projects (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), technical stack, education at PDP University, and contact details. How can I help you today?";
    }
    return "Men Javohir Sadullayevning portfolio saytidagi rasmiy AI assistentiman. Men sizga Javohirning .NET / C# backend tajribasi, amalga oshirgan loyihalari (EnglishAI, KitobdagiMen, TypingWar, MeningVaqtim, ZiyoAI), PDP University'dagi ta'limi (GPA 4.13) hamda bog'lanish kontaktlari haqida ma'lumot berish uchun yaratilganman. Sizga qanday yordam bera olaman?";
  }

  // 3. "Javohir kim?"
  const isWhoIsJavohir =
    /^javohir\s+(sadullayev\s+)?kim(\s|$)/iu.test(q) ||
    /^who\s+is\s+javohir(\s|$)/iu.test(q) ||
    /^кто\s+такой\s+джавохир(\s|$)/iu.test(q);

  if (isWhoIsJavohir) {
    if (/[а-яё]/iu.test(q)) {
      return "Джавохир Садуллаев — .NET Backend разработчик и студент 3-го курса Computer Science в PDP University (GPA 4.13). Специализируется на высоконагруженных REST API, real-time системах на SignalR (<30ms), оптимизации PostgreSQL и Redis, а также Clean Architecture.";
    }
    if (/^(who)/i.test(q)) {
      return "Javohir Sadullayev is a .NET Backend Developer and 3rd-year Computer Science student at PDP University (GPA 4.13). He specializes in high-throughput REST APIs, low-latency SignalR real-time systems (<30ms), PostgreSQL and Redis optimization, and Clean Architecture.";
    }
    return "Javohir Sadullayev — .NET Backend dasturchisi va PDP University Computer Science yo'nalishi 3-kurs talabasi (GPA 4.13). U yuqori yuklamali REST API'lar, past kechikishli SignalR real-time tizimlari (<30ms), PostgreSQL va Redis optimallashtiruvi hamda Clean Architecture asosidagi tizimlar qurishga ixtisoslashgan.";
  }

  // 4. "Kontaktlar / Bog'lanish"
  const isContact =
    /^(kontakt|aloqa|bog\x27lanish|kontaktlar|telefon|telegram|email)(\s|$)/iu.test(q) ||
    /^(contact|how\s+to\s+contact)(\s|$)/iu.test(q) ||
    /^(контакт|связаться|как\s+связаться|телеграм)(\s|$)/iu.test(q);

  if (isContact) {
    if (/[а-яё]/iu.test(q)) {
      return "Связаться с Джавохиром Садуллаевым:\n• Telegram: @dotnetda (https://t.me/dotnetda)\n• Email: javohirsadullayev836@gmail.com\n• Телефон: +998 88 603 66 44\n• LinkedIn: linkedin.com/in/javohir-sadullayev-b8737725a\n• GitHub: github.com/Sadullayev-Javohir";
    }
    if (/^(contact|how)/i.test(q)) {
      return "You can reach Javohir Sadullayev via:\n• Telegram: @dotnetda (https://t.me/dotnetda)\n• Email: javohirsadullayev836@gmail.com\n• Phone: +998 88 603 66 44\n• LinkedIn: linkedin.com/in/javohir-sadullayev-b8737725a\n• GitHub: github.com/Sadullayev-Javohir";
    }
    return "Javohir Sadullayev bilan quyidagi kanallar orqali bog'lanishingiz mumkin:\n• Telegram: @dotnetda (https://t.me/dotnetda)\n• Email: javohirsadullayev836@gmail.com\n• Telefon: +998 88 603 66 44\n• LinkedIn: linkedin.com/in/javohir-sadullayev-b8737725a\n• GitHub: github.com/Sadullayev-Javohir\nManzil: Toshkent, O'zbekiston.";
  }

  return null;
}

/**
 * Creates a simulated token stream for instant, 100% reliable responses.
 */
export function createDirectStream(
  answer: string,
  modelName = "portfolio-assistant"
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = answer.split(" ");

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      // Send initial metadata event
      controller.enqueue(
        encoder.encode(JSON.stringify({ type: "model", model: modelName }) + "\n")
      );

      // Stream tokens naturally
      for (let i = 0; i < words.length; i++) {
        const text = (i === 0 ? "" : " ") + words[i];
        controller.enqueue(
          encoder.encode(JSON.stringify({ type: "token", text }) + "\n")
        );
        // Small delay to provide clean typewriter effect
        await new Promise((r) => setTimeout(r, 14));
      }
      controller.close();
    },
  });
}

/**
 * Robust streaming with cascading failover across configured models.
 */
export async function streamChatWithFailover(
  userMessages: ChatMessage[],
  overrideModelChain?: string[]
): Promise<{ stream: ReadableStream<Uint8Array>; usedModel: string }> {
  // Retrieve user query
  const lastUserMsg = [...userMessages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMsg ? lastUserMsg.content : "";

  // 1. Check for guaranteed instant response on core identity/portfolio queries
  const directAnswer = matchDirectIntent(userQuery);
  if (directAnswer) {
    const stream = createDirectStream(directAnswer, "portfolio-assistant");
    return { stream, usedModel: "portfolio-assistant" };
  }

  const config = getAiConfig();
  const modelChain =
    overrideModelChain && overrideModelChain.length > 0
      ? overrideModelChain
      : [config.primaryModel, ...config.fallbackModels];

  const systemMessage: ChatMessage = {
    role: "system",
    content: buildRagPrompt(userQuery),
  };

  const fullMessages = [systemMessage, ...userMessages];
  const encoder = new TextEncoder();

  for (let i = 0; i < modelChain.length; i++) {
    const model = modelChain[i];
    const isLastModel = i === modelChain.length - 1;

    try {
      const controller = new AbortController();
      // Connection timeout: 15s to get initial HTTP response
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${NOUS_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NOUS_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: fullMessages,
          stream: true,
          tags: ["user=javohir"],
          temperature: config.temperature ?? 0.3,
          max_tokens: config.maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        clearTimeout(timeoutId);
        const errorText = await response.text();
        console.warn(`Model ${model} failed with HTTP ${response.status}:`, errorText);
        if (!isLastModel) continue; // Try next model in chain
        throw new Error(
          `Barcha modellar xato qaytardi. Oxirgi model (${model}) xatosi: ${response.status}`
        );
      }

      // Valid response received! Clear connection timeout
      clearTimeout(timeoutId);
      const upstreamBody = response.body;

      // Transform upstream SSE stream to clean tokens
      const stream = new ReadableStream<Uint8Array>({
        async start(readableController) {
          // Send initial metadata event with the used model name
          const metaPayload = JSON.stringify({ type: "model", model }) + "\n";
          readableController.enqueue(encoder.encode(metaPayload));

          const reader = upstreamBody.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data:")) continue;

                const jsonStr = trimmed.slice(5).trim();
                if (jsonStr === "[DONE]") {
                  continue;
                }

                try {
                  const parsed = JSON.parse(jsonStr);
                  const delta = parsed.choices?.[0]?.delta;
                  if (!delta) continue;

                  // ONLY extract delta.content! NEVER leak internal reasoning tokens!
                  const tokenText = delta.content || "";

                  if (tokenText) {
                    const tokenPayload =
                      JSON.stringify({ type: "token", text: tokenText }) + "\n";
                    readableController.enqueue(encoder.encode(tokenPayload));
                  }
                } catch {
                  // Ignore JSON parse errors on chunk boundaries
                }
              }
            }
          } catch (streamErr) {
            console.error(`Stream error during model ${model}:`, streamErr);
          } finally {
            readableController.close();
          }
        },
      });

      return { stream, usedModel: model };
    } catch (err: any) {
      console.warn(`Failover triggered for model ${model}:`, err.message);
      if (isLastModel) {
        // If even the last model failed, return a fallback message stream
        const fallbackStream = new ReadableStream<Uint8Array>({
          start(readableController) {
            const errorMsg =
              "Kechirasiz, hozirda barcha AI modellar band yoki internet aloqasida muammo bo'ldi. Iltimos, bir ozdan so'ng qayta urinib ko'ring yoki to'g'ridan-to'g'ri Telegram orqali bog'laning: @dotnetda";
            const payload = JSON.stringify({ type: "token", text: errorMsg }) + "\n";
            readableController.enqueue(encoder.encode(payload));
            readableController.close();
          },
        });
        return { stream: fallbackStream, usedModel: "system-fallback" };
      }
    }
  }

  throw new Error("No model in chain could be reached.");
}
