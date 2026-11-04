import { NextRequest } from "next/server";
import { streamChatWithFailover, ChatMessage } from "@/lib/nousClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response("Chat API is active", { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Kamida bitta xabar kiritilishi shart." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize and limit context length if necessary (e.g., last 12 messages)
    const recentMessages = messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 3000),
    })) as ChatMessage[];

    const { stream, usedModel } = await streamChatWithFailover(recentMessages);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Ai-Model": usedModel,
      },
    });
  } catch (err: any) {
    console.error("Chat API route error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Ichki server xatoligi yuz berdi." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
