// src/app/api/chat/route.ts
// AI Chat API — OpenAI GPT-4o-mini with RAG + streaming SSE

import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chat-context";
import { searchContext, formatContext } from "@/lib/rag";
import { checkAndNotifyLead } from "@/lib/chat-leads";

export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Rate limiting (in-memory, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // messages per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many messages. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    const { messages, locale } = await req.json();

    if (!messages?.length) {
      return new Response(JSON.stringify({ error: "No messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const recentMessages: ChatMessage[] = messages.slice(-10);
    const lastUser = [...recentMessages]
      .reverse()
      .find((m) => m.role === "user");

    let ragContext = "";
    if (lastUser) {
      try {
        const results = await searchContext(lastUser.content, 4, 0.3);
        ragContext = formatContext(results);
      } catch (err) {
        console.error("RAG failed:", err);
      }

      // Lead detection (fire and forget)
      checkAndNotifyLead(lastUser.content, locale).catch(console.error);
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + ragContext },
          ...recentMessages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI error:", await response.text());
      return new Response(JSON.stringify({ error: "AI unavailable" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Stream response (SSE parsing)
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

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
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) controller.enqueue(encoder.encode(content));
              } catch {
                // Skip malformed JSON
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
