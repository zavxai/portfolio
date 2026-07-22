"use client";

import { useState } from "react";
import {
  GitPullRequest,
  ExternalLink,
  GitMerge,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

interface Contribution {
  repo: string;
  repoUrl: string;
  prTitle: string;
  prNumber: string;
  prUrl: string;
  status: "Open" | "Merged";
  description: string;
  tech: string[];
}

export default function Contributions() {
  const [activeIndex, setActiveIndex] = useState(0);

  const contributions: Contribution[] = [
    {
      repo: "SigNoz/signoz",
      repoUrl: "https://github.com/SigNoz/signoz",
      prTitle:
        "fix(alerts): set default time range to 5m on create alert page",
      prNumber: "#11601",
      prUrl: "https://github.com/SigNoz/signoz/pull/11601",
      status: "Open",
      description:
        "Identified ClickHouse Out-of-Memory (OOM) errors caused by default 6-hour high-cardinality queries during new alert creation. Optimized performance by reducing the default time range to 5 minutes, mitigating backend memory spikes in production scale environments.",
      tech: ["TypeScript", "React", "ClickHouse", "Alerting Systems"],
    },
    {
      repo: "AkkalDhami/servercn",
      repoUrl: "https://github.com/AkkalDhami/servercn",
      prTitle: "feat: add postgres component with drizzle ORM integration",
      prNumber: "PRs",
      prUrl:
        "https://github.com/AkkalDhami/servercn/pulls?q=is%3Apr+author%3Azavxai",
      status: "Merged",
      description:
        "Contributed the core PostgreSQL adapter component integrated with Drizzle ORM. Configured connection pooling, schema generation templates, and robust database migration utilities to enable developers to scaffold database layers instantly.",
      tech: ["TypeScript", "Drizzle ORM", "PostgreSQL", "Node.js"],
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? contributions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === contributions.length - 1 ? 0 : prev + 1
    );
  };

  const currentContrib = contributions[activeIndex];

  const getStatusBadge = (status: "Open" | "Merged") => {
    if (status === "Merged") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-300">
          <GitMerge className="h-3.5 w-3.5" />
          Merged
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
        <GitPullRequest className="h-3.5 w-3.5" />
        Open
      </span>
    );
  };

  return (
    <section id="contributions" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label mb-3">Open source</p>
          <h2 className="section-title">
            Contributions
            <br />
            <span className="text-neutral-500">that matter.</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            aria-label="Previous contribution"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[3rem] text-center font-mono text-xs text-neutral-500">
            {activeIndex + 1} / {contributions.length}
          </span>
          <button
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            aria-label="Next contribution"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        key={activeIndex}
        className="surface animate-in fade-in p-6 duration-300 sm:p-8"
      >
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <a
              href={currentContrib.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 transition-colors hover:text-white"
            >
              <FaGithub className="h-3.5 w-3.5" />
              {currentContrib.repo}
            </a>
            <h3 className="mt-2 max-w-2xl text-base font-medium leading-snug tracking-tight text-white sm:text-lg">
              {currentContrib.prTitle}{" "}
              <span className="font-mono text-sm font-normal text-neutral-500">
                {currentContrib.prNumber}
              </span>
            </h3>
          </div>
          {getStatusBadge(currentContrib.status)}
        </div>

        <p className="text-body mb-6 min-h-[72px] max-w-3xl">
          {currentContrib.description}
        </p>

        <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {currentContrib.tech.map((t, idx) => (
              <span
                key={idx}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={currentContrib.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !px-4 !py-2"
          >
            <span>View pull request</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
