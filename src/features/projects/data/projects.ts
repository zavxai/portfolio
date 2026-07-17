export const projects = [
  {
    name: "Inferr",
    src: "/projects/inferr.mp4",
    github: "https://github.com/zavxai/inferr",
    live: "https://inferr.xyz",
    shortDescription:
      "Personalized AI developer news feed with 10-source ingestion, pgvector semantic ranking, LangGraph agentic RAG with self-correction, and a secure MCP server (OAuth 2.1 + PKCE) that exposes tools for AI agents like Claude.",
    detailedDescription:
      "- Built a full-stack AI developer news platform in a pnpm + Turborepo monorepo (Next.js 15 frontend + NestJS 11 API) with Drizzle ORM, deployed on Vercel (web) and Render (API) backed by Neon PostgreSQL + pgvector.\n- Engineered a 10-source daily ingestion pipeline (Hacker News, Dev.to, Reddit /r/programming & /r/webdev, Lobste.rs, Hashnode, Medium, TechCrunch, GitHub, HackerNoon) driven by user interest tags: parallel metadata fetch → concurrent Cheerio content scraping (batches of 5, 8k char cap) → gpt-4o-mini summarization + text-embedding-3-small embeddings. Idempotent via URL deduplication, 24h freshness filter, and tag-aware balancing.\n- Designed a production-grade personalized feed using cached per-user query embeddings: pgvector cosine ANN + dynamic tag-overlap bonus (+0.15 per match, max +0.3), strict relevance threshold (distance < 0.5), 1-day recency, and source-diversity selection logic that returns the highest-ranked article per source before filling remaining slots (top 5–6).\n- Implemented a LangGraph agentic RAG pipeline (retrieve → grade → rewrite → generate) accepting multi-turn history. Uses k=6 retrieval, structured LLM grader (Zod), query rewriting up to 2 iterations when no documents pass grading, and strict separation of originalQuestion vs. searchQuery. Integrated Langfuse tracing + fire-and-forget faithfulness/relevance/recall evaluations persisted to ai_evaluations.\n- Built a complete MCP server (Streamable HTTP transport) exposing 5 user-scoped tools: search_articles, get_personalized_feed, ask_inferr (full agentic flow), get_market_report, and get_job_report. Implemented a full OAuth 2.1 + PKCE authorization server (delegated Google sign-in) with dedicated tables (mcp_clients, pending_mcp_authorizations, pending_auth_codes, mcp_tokens), SHA-256 refresh token rotation, replay detection that revokes the full token chain, and type-scoped JWTs ('mcp_access') separate from web sessions.\n- Implemented dual secure auth systems: web uses 15-minute JWT access + 7-day HttpOnly refresh tokens with atomic replacement-chain traversal in Drizzle; MCP uses 1-hour access + 7-day refresh optimized for machine clients.\n- Delivered a live Tech Market feature: Remotive jobs scraper + two GPT-4o-mini generated reports (demand signals + hiring stats) cached in Postgres (market_reports + jobs) with 24h TTL and in-flight request coalescing.\n- Authored a complete Kubernetes deployment suite (StatefulSet for pgvector Postgres with PVC, Redis Deployment, API Deployment with initContainer wait-for-db + liveness/readiness probes, Services, nginx Ingress, and CronJob for nightly scraper runs) alongside the Render + Vercel cloud path.\n- Added full observability: OpenTelemetry auto-instrumentation (traces to Jaeger) and Langfuse for every LLM and agent step.",
    tech: [
      "Next.js 15",
      "NestJS 11",
      "TypeScript",
      "Drizzle ORM",
      "pgvector",
      "LangGraph",
      "OpenAI",
      "MCP SDK",
      "OAuth 2.1",
      "Langfuse",
      "Kubernetes",
    ],
    category: "AI / Full Stack",
  },
  {
    name: "DevNest",
    src: "/projects/devnest.mp4",
    github: "https://github.com/zavxai/dev-nest",
    shortDescription:
      "Modular NestJS backend for a social platform with dedicated auth, posts, comments, likes, feed, profile, email, and shared infrastructure layers backed by PostgreSQL as the system of record.",
    detailedDescription:
      "- Built a modular NestJS backend for a social platform with dedicated auth, posts, comments, likes, feed, profile, email, and shared infrastructure layers backed by PostgreSQL as the system of record.\n- Implemented secure authentication with JWT access tokens, HTTP-only refresh token rotation, session caps, token reuse detection, soft-delete account revocation, Google OAuth 2.0 sign-in, and SHA-256 hashing of stored login IP metadata.\n- Designed pull-based public and follower feed APIs with cursor pagination, Redis-backed caching, and Prisma query patterns that return author metadata and interaction counts without feed fan-out duplication.\n- Engineered Redis-backed platform infrastructure for distributed rate limiting, cacheable profile and content reads, and BullMQ worker processing for asynchronous welcome email jobs.\n- Offloaded CPU-heavy bcrypt hashing and password verification to a piscina worker-thread pool to keep request handling responsive under concurrent authentication load.\n- Validated production-critical behavior through Jest E2E coverage for auth, posts, comments, likes, feeds, rate limiting, cursor pagination, soft-delete flows, and worker-pool concurrency.",
    tech: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "BullMQ",
      "Piscina (Workers)",
      "Jest E2E",
    ],
    category: "Backend",
  },
  {
    name: "PG RAG",
    src: "/projects/pg-rag.mp4",
    github: "https://github.com/zavxai/rag-paulgraham",
    shortDescription:
      "Bleeding-edge RAG system featuring an intelligent query rewriter, semantic search via FAISS, and real-time streaming responses.",
    detailedDescription:
      "- Architected a complete RAG (Retrieval-Augmented Generation) pipeline using LlamaIndex to orchestrate document ingestion, vector indexing, and LLM generation.\n- Implemented an Intelligence Layer for query rewriting and intent detection, allowing the system to handle complex multi-turn conversations and clarify user intent.\n- Engineered a high-performance vector retrieval system using FAISS and HuggingFace embeddings for sub-50ms semantic search across thousands of text chunks.\n- Developed a responsive Next.js 16 frontend with real-time streaming (NDJSON) and a minimalist, glassmorphic UI providing a premium ChatGPT-like experience.\n- Orchestrated local and cloud LLMs (Ollama, OpenAI) via a FastAPI backend, handling asynchronous event streams for low-latency interactions.",
    tech: [
      "LlamaIndex",
      "FastAPI",
      "FAISS",
      "Python",
      "Ollama",
      "Next.js 16",
      "Tailwind CSS 4",
    ],
    category: "AI / RAG",
  },
];
