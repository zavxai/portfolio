import { ReactNode } from "react";
import {
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiAmazonwebservices,
  SiFastapi,
  SiOpenai,
  SiGithubactions,
} from "react-icons/si";
import { Bot, Database, Workflow } from "lucide-react";

interface Technology {
  name: string;
  icon: ReactNode;
  link?: string;
}

export default function Technologies() {
  const technologies: Record<string, Technology[]> = {
    "AI & RAG": [
      {
        name: "LangGraph",
        icon: <Workflow className="w-3.5 h-3.5" />,
        link: "https://www.langchain.com/langgraph",
      },
      {
        name: "OpenAI",
        icon: <SiOpenai />,
        link: "https://openai.com/",
      },
      {
        name: "LlamaIndex",
        icon: <Bot className="w-3.5 h-3.5" />,
        link: "https://www.llamaindex.ai/",
      },
      {
        name: "MCP",
        icon: <Workflow className="w-3.5 h-3.5" />,
        link: "https://modelcontextprotocol.io/",
      },
    ],
    "AI Evaluations": [
      {
        name: "Langfuse",
        icon: <Bot className="w-3.5 h-3.5" />,
        link: "https://langfuse.com/",
      },
      {
        name: "LangSmith",
        icon: <Workflow className="w-3.5 h-3.5" />,
        link: "https://www.langchain.com/langsmith",
      },
    ],
    Backend: [
      {
        name: "Node.js",
        icon: <SiNodedotjs />,
        link: "https://nodejs.org/en",
      },
      {
        name: "NestJS",
        icon: <SiNestjs />,
        link: "https://nestjs.com/",
      },
      {
        name: "FastAPI",
        icon: <SiFastapi />,
        link: "https://fastapi.tiangolo.com/",
      },
    ],
    Database: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
        link: "https://www.postgresql.org/",
      },
      {
        name: "pgvector",
        icon: <Database className="w-3.5 h-3.5" />,
        link: "https://github.com/pgvector/pgvector",
      },
      {
        name: "Redis",
        icon: <SiRedis />,
        link: "https://redis.io/",
      },
    ],
    DevOps: [
      {
        name: "Kubernetes",
        icon: <SiKubernetes />,
        link: "https://kubernetes.io/",
      },
      {
        name: "GitHub Actions",
        icon: <SiGithubactions />,
        link: "https://github.com/features/actions",
      },
      {
        name: "AWS",
        icon: <SiAmazonwebservices />,
        link: "https://aws.amazon.com/",
      },
    ],
    Observability: [
      {
        name: "OpenTelemetry",
        icon: <Workflow className="w-3.5 h-3.5" />,
        link: "https://opentelemetry.io/",
      },
    ],
  };

  return (
    <section id="technologies" className="scroll-mt-24">
      <p className="section-label mb-3">Stack</p>
      <h2 className="section-title mb-8 max-w-xl">
        Tools I use to
        <br />
        <span className="text-neutral-500">ship reliable AI.</span>
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(technologies).map(([category, items]) => (
          <div key={category} className="flex flex-col gap-3">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((tech, index) => {
                const badge = (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-neutral-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                    <span className="text-sm opacity-80">{tech.icon}</span>
                    <span>{tech.name}</span>
                  </span>
                );

                if (tech.link) {
                  return (
                    <a
                      key={index}
                      href={tech.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {badge}
                    </a>
                  );
                }

                return <div key={index}>{badge}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
