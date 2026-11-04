"use client";

import { useState, useRef, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Salom! Men Javohir Sadullayevning AI assistentiman. Men Javohirning C# / .NET 8 backend arxitekturasi, EnglishAI, KitobdagiMen, TypingWar loyihalari, PDP University'dagi o'qishi yoki bog'lanish kontaktlari bo'yicha har qanday savolingizga javob bera olaman. Sizga qanday yordam bera olaman?",
  model: "Ready",
  timestamp: "Hozir",
};

export function usePortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState<string>("upstage/solar-mini4:free");
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (overrideText?: string) => {
      const textToSend = (overrideText ?? input).trim();
      if (!textToSend || isLoading) return;

      setInput("");
      const userMsgId = `user_${Date.now()}`;
      const assistantMsgId = `assistant_${Date.now()}`;

      const userMessage: Message = {
        id: userMsgId,
        role: "user",
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);

      const assistantMessage: Message = {
        id: assistantMsgId,
        role: "assistant",
        content: "",
        model: activeModel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages([...newMessages, assistantMessage]);

      try {
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Server xatosi: HTTP ${res.status}`);
        }

        const modelHeader = res.headers.get("X-Ai-Model");
        if (modelHeader) {
          setActiveModel(modelHeader);
        }

        if (!res.body) {
          throw new Error("Stream oqimi topilmadi.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";
        let lineBuffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          lineBuffer += decoder.decode(value, { stream: true });
          const lines = lineBuffer.split("\n");
          lineBuffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            try {
              const parsed = JSON.parse(trimmed);
              if (parsed.type === "model" && parsed.model) {
                setActiveModel(parsed.model);
              } else if (parsed.type === "token" && parsed.text) {
                accumulatedText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, content: accumulatedText, model: parsed.model || activeModel }
                      : m
                  )
                );
              }
            } catch {
              // Plain text token fallback if line was not JSON
              accumulatedText += trimmed;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, content: accumulatedText } : m
                )
              );
            }
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Chat error:", err);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    content:
                      m.content ||
                      "Kechirasiz, xatolik yuz berdi. Iltimos qayta urinib ko'ring yoki Telegram orqali yozing: @dotnetda",
                  }
                : m
            )
          );
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [input, isLoading, messages, activeModel]
  );

  const clearMessages = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    input,
    setInput,
    isLoading,
    activeModel,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}
