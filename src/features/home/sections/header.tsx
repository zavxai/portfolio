export default function Header() {
  return (
    <section className="relative flex min-h-[min(70vh,640px)] flex-col justify-center py-10 sm:min-h-[72vh] sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[280px] w-[min(100vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl sm:h-[420px]"
      />

      <p className="section-label mb-4 max-w-full text-[10px] leading-relaxed sm:mb-6 sm:text-[11px]">
        AI Engineer · Agentic Systems · Production RAG
      </p>

      <h1 className="max-w-4xl text-[2rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-[fade-up_0.7s_ease-out_0.05s_both]">
        Building AI systems
        <br />
        <span className="text-neutral-500">that ship to production.</span>
      </h1>

      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-400 sm:mt-8 sm:text-lg animate-[fade-up_0.7s_ease-out_0.12s_both]">
        I design agentic workflows, RAG pipelines, and MCP servers - then wire
        them into reliable TypeScript backends that teams can actually run.
        LangGraph, pgvector, NestJS, and OAuth 2.1 when agents need production
        access.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 animate-[fade-up_0.7s_ease-out_0.18s_both] sm:mt-10 sm:flex-row sm:flex-wrap">
        <a
          href="#projects"
          className="btn-primary w-full justify-center sm:w-auto"
        >
          View projects
        </a>
        <a
          href="https://github.com/zavxai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full justify-center sm:w-auto"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
