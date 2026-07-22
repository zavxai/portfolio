export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <p className="section-label mb-3">About</p>
      <h2 className="section-title mb-8 max-w-2xl">
        Systems thinking for
        <br />
        <span className="text-neutral-500">LLM-powered products.</span>
      </h2>

      <div className="surface p-6 sm:p-8">
        <p className="text-body max-w-3xl text-base sm:text-[17px] sm:leading-8">
          I&apos;m an{" "}
          <span className="font-medium text-white">AI Engineer</span> who builds
          at the intersection of{" "}
          <span className="font-medium text-white">large language models</span>,{" "}
          <span className="font-medium text-white">agentic systems</span>, and
          production infrastructure. I design{" "}
          <span className="font-medium text-white">RAG pipelines</span> and{" "}
          <span className="font-medium text-white">
            semantic vector search systems
          </span>
          , orchestrate multi-step AI workflows with{" "}
          <span className="font-medium text-white">LangGraph</span>, and expose
          AI capabilities as{" "}
          <span className="font-medium text-white">MCP servers</span> secured
          with <span className="font-medium text-white">OAuth 2.1</span> so
          agents can interact with production systems directly.
        </p>
        <p className="text-body mt-5 max-w-3xl text-base sm:text-[17px] sm:leading-8">
          I ship full-stack TypeScript products - from{" "}
          <span className="font-medium text-white">NestJS</span> backends with{" "}
          <span className="font-medium text-white">
            pgvector-powered retrieval
          </span>{" "}
          to <span className="font-medium text-white">Next.js</span> frontends -
          that go beyond demos into reliable, scalable systems. I think in
          systems: how context flows, where models fail, and how to engineer
          around their limits with the right retrieval, memory, and tooling
          strategies.
        </p>
      </div>
    </section>
  );
}
