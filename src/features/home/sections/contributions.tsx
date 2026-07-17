"use client";

import { useState } from "react";
import {
  GitPullRequest,
  ExternalLink,
  GitMerge,
  ChevronLeft,
  ChevronRight
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
      prTitle: "fix(alerts): set default time range to 5m on create alert page",
      prNumber: "#11601",
      prUrl: "https://github.com/SigNoz/signoz/pull/11601",
      status: "Open",
      description: "Identified ClickHouse Out-of-Memory (OOM) errors caused by default 6-hour high-cardinality queries during new alert creation. Optimized performance by reducing the default time range to 5 minutes, mitigating backend memory spikes in production scale environments.",
      tech: ["TypeScript", "React", "ClickHouse", "Alerting Systems"],
    },
    {
      repo: "AkkalDhami/servercn",
      repoUrl: "https://github.com/AkkalDhami/servercn",
      prTitle: "feat: add postgres component with drizzle ORM integration",
      prNumber: "PRs",
      prUrl: "https://github.com/AkkalDhami/servercn/pulls?q=is%3Apr+author%3Azavxai",
      status: "Merged",
      description: "Contributed the core PostgreSQL adapter component integrated with Drizzle ORM. Configured connection pooling, schema generation templates, and robust database migration utilities to enable developers to scaffold database layers instantly.",
      tech: ["TypeScript", "Drizzle ORM", "PostgreSQL", "Node.js"],
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? contributions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === contributions.length - 1 ? 0 : prev + 1));
  };

  const currentContrib = contributions[activeIndex];

  const getStatusBadge = (status: "Open" | "Merged") => {
    if (status === "Merged") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40 shadow-xs">
          <GitMerge className="w-3.5 h-3.5" />
          Merged
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40 shadow-xs">
        <GitPullRequest className="w-3.5 h-3.5" />
        Open
      </span>
    );
  };

  return (
    <section className="rounded-2xl p-6
                        bg-white/10 dark:bg-white/5
                        backdrop-blur-2xl
                        border border-white/30 dark:border-white/10
                        shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
      
      {/* Header Row */}
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 mb-5 pb-3">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold flex items-center gap-2 text-neutral-900 dark:text-neutral-100 min-w-0 leading-tight">
          <GitPullRequest className="text-emerald-500 dark:text-emerald-400 w-5 h-5 shrink-0" />
          <span>Open Source Contributions</span>
        </h2>

        {/* Slideshow Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
            aria-label="Previous contribution"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          </button>
          
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono px-1 shrink-0 whitespace-nowrap select-none">
            {activeIndex + 1} / {contributions.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
            aria-label="Next contribution"
          >
            <ChevronRight className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          </button>
        </div>
      </div>

      {/* Card Content with Key to force re-render/animation on index change */}
      <div
        key={activeIndex}
        className="group flex flex-col p-4 rounded-xl
                   bg-white/5 dark:bg-white/2
                   border border-white/10 dark:border-white/5
                   hover:border-white/30 dark:hover:border-white/15
                   hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]
                   transition-all duration-300 animate-in fade-in duration-300"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
          <div>
            <a
              href={currentContrib.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors flex items-center gap-1.5"
            >
              <FaGithub className="w-3.5 h-3.5" />
              {currentContrib.repo}
            </a>
            <h3 className="text-base font-semibold mt-1 text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 flex-wrap">
              {currentContrib.prTitle}{" "}
              <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm font-normal">
                {currentContrib.prNumber}
              </span>
            </h3>
          </div>
          {getStatusBadge(currentContrib.status)}
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 min-h-[80px] sm:min-h-[60px]">
          {currentContrib.description}
        </p>

        {/* Footer / Tech list & link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-neutral-200/50 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {currentContrib.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md
                           bg-neutral-100 dark:bg-neutral-800/60
                           text-neutral-600 dark:text-neutral-400
                           border border-neutral-200/50 dark:border-neutral-700/50"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={currentContrib.prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold
                       bg-white/10 dark:bg-white/5 
                       text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white
                       border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10
                       transition-all duration-200 cursor-pointer"
          >
            <span>View Pull Request</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
