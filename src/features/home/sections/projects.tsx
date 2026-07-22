"use client";

import { projects } from "@/features/projects/data/projects";
import { FaGithub } from "react-icons/fa";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import Link from "next/link";

export default function Projects() {
  const proj = projects.slice(0, 3);

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24">
      <div className="mb-6 flex flex-row items-end justify-between gap-3 sm:mb-8 sm:gap-4">
        <div className="min-w-0">
          <p className="section-label mb-3">Work</p>
          <h2 className="section-title">
            Selected
            <br />
            <span className="text-neutral-500">projects.</span>
          </h2>
        </div>
        <Link
          href="/projects"
          className="btn-secondary shrink-0 !px-3 !py-1.5 !text-xs sm:!px-5 sm:!py-2 sm:!text-sm"
        >
          View all
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {proj.map((project, index) => (
          <div
            key={index}
            className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              {project.src.endsWith(".png") || project.src.endsWith(".webp") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.src}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <video
                  src={project.src}
                  className="h-full w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  suppressHydrationWarning
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                    {project.category}
                  </p>
                  <h3 className="mt-1 truncate text-[15px] font-medium tracking-tight text-white">
                    {project.name}
                  </h3>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-neutral-600">
                  0{index + 1}
                </span>
              </div>

              <p className="line-clamp-2 text-[13px] leading-relaxed text-neutral-500">
                {project.shortDescription}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <FaGithub className="text-xs" /> GitHub
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <LiaExternalLinkAltSolid className="text-xs" /> Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
