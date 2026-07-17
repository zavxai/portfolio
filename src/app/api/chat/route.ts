import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = {
  name: string;
  keywords: string[];
  content: string;
};

// ─── Always-injected fragments ────────────────────────────────────────────────

const IDENTITY =
  "You are Byte, AI assistant on Johnvessly Alti's portfolio. Answer concisely and professionally.";

const TONE_SECTION = `== TONE ==
Be warm, direct, confident. Keep answers 2-3 sentences unless more detail requested. If info not available, say so and suggest email or LinkedIn.`;

// ─── Keyword-matched sections ─────────────────────────────────────────────────

const SECTIONS: readonly Section[] = [
  {
    name: "WHO",
    keywords: [
      "who", "about", "background", "bio", "what does he do",
      "what do you do", "specializ", "focus", "ai engineer",
      "johnvessly", "john", "yourself", "him",
    ],
    content: `== WHO ==
AI Engineer specializing in LLMs, agentic systems, RAG pipelines, and production AI infrastructure. Focuses on AI architecture, scalability, and performance. Thinks in systems: context flow, model failure modes, and engineering around limits.`,
  },
  {
    name: "TECHNOLOGIES",
    keywords: [
      "tech", "stack", "language", "tools", "framework", "work with",
      "python", "typescript", "nestjs", "node", "fastapi", "faiss",
      "llamaindex", "openai", "ollama", "docker", "aws", "redis",
      "postgres", "next.js", "nextjs", "tailwind", "bullmq", "prisma",
    ],
    content: `== TECHNOLOGIES ==
AI/RAG: LlamaIndex, FAISS, OpenAI, Ollama. Languages: TypeScript, Python. Backend: Node.js, NestJS, FastAPI, BullMQ. Database: PostgreSQL, Redis. Frontend: Next.js, Tailwind CSS. DevOps: Docker, AWS.`,
  },
  {
    name: "PROJECTS",
    keywords: [
      "project", "built", "build", "portfolio",
      "application", "pg rag", "rag", "devnest", "xoxo", "liftlog",
      "subtrackr", "github", "demo", "live",
    ],
    content: `== PROJECTS ==
1. PG RAG — RAG pipeline with query rewriting, FAISS semantic search, NDJSON streaming. Stack: LlamaIndex, FastAPI, FAISS, Ollama. github.com/zavxai/rag-paulgraham
2. DevNest — NestJS social backend: JWT auth, token rotation, Google OAuth, cursor-paginated feeds, Redis cache, BullMQ email workers, Piscina bcrypt, Jest E2E. Live: dev-nest-4hxb.onrender.com/api/docs
3. XOXO — Multiplayer Tic-Tac-Toe: Nakama authoritative server, WebSocket <100ms latency, Docker. Live: tic-tac-toe.johnvesslyalti.xyz
4. LiftLog — Fitness analytics: normalized PostgreSQL schema, aggregation SQL, <120ms latency. Live: johnvesslyalti-liftlog.vercel.app
5. SubTrackr — Multi-tenant subscription SaaS: tenant isolation, OAuth, concurrency-safe CRUD. Live: johnvesslyalti-subtrackr.vercel.app`,
  },
  {
    name: "CONTACT",
    keywords: [
      "contact", "reach", "email", "linkedin", "twitter", "x ",
      "youtube", "social", "hire", "connect", "get in touch", "dm", "message",
    ],
    content: `== CONTACT ==
Email: altijohnvessly@gmail.com | LinkedIn: linkedin.com/in/zavxai | GitHub: github.com/zavxai | Twitter/YouTube: @zavxai`,
  },
  {
    name: "BLOGS",
    keywords: [
      "blog", "article", "topic", "cursor pagination", "piscina",
      "systems thinking", "javascript", "leetcode", "pos system",
      "support request", "slack",
    ],
    content: `== BLOGS ==
Topics: AI vs engineers, cursor pagination, follow system design, Slack ownership, scaling Node.js with Piscina, offline POS, systems thinking, tools vs concepts, JavaScript choice, ChatGPT for devs, tech roles evolution, LeetCode vs systems thinking, support request workflows.`,
  },
];

// ─── Off-topic canned response ────────────────────────────────────────────────

const OFF_TOPIC_RESPONSE =
  "I can only answer questions about Johnvessly's work, skills, projects, and how to reach him. Try asking something like \"What has he built?\" or \"How do I contact him?\"";

// ─── Intent detection ─────────────────────────────────────────────────────────

function isOffTopic(lowerMsg: string): boolean {
  return !SECTIONS.some((s) => s.keywords.some((kw) => lowerMsg.includes(kw)));
}

function buildSystemPrompt(lowerMsg: string): string {
  const matched = SECTIONS.filter((s) =>
    s.keywords.some((kw) => lowerMsg.includes(kw))
  );
  return [IDENTITY, ...matched.map((s) => s.content), TONE_SECTION].join("\n\n");
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "missing_key" }, { status: 503 });
  }

  const { messages } = await req.json();

  const trimmedMessages = messages.slice(-6);

  const lastUserMessage: string =
    [...trimmedMessages].reverse().find((m: { role: string }) => m.role === "user")
      ?.content ?? "";

  const lowerMsg = lastUserMessage.toLowerCase();

  if (isOffTopic(lowerMsg)) {
    return new Response(OFF_TOPIC_RESPONSE, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  const system = buildSystemPrompt(lowerMsg);

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system,
      messages: trimmedMessages,
      maxOutputTokens: 200,
    });

    return result.toTextStreamResponse();
  } catch {
    return Response.json({ error: "api_error" }, { status: 503 });
  }
}
