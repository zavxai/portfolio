"use client";

import { projects } from "@/features/projects/data/projects";
import { FaGithub } from "react-icons/fa";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl min-w-0 px-4 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
      <div className="mb-10 sm:mb-14">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white sm:mb-8"
        >
          <IoIosArrowBack className="text-base" />
          Back
        </Link>

        <p className="section-label mb-3">Work</p>
        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          All projects
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-neutral-400 sm:mt-4 sm:text-base">
          Production systems across AI, backend infrastructure, and full-stack
          products.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <article
            key={index}
            className="group min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/15"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-video overflow-hidden bg-black lg:aspect-auto lg:min-h-[280px]">
                {project.src.endsWith(".png") ||
                project.src.endsWith(".webp") ? (
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
              </div>

              <div className="flex min-w-0 flex-col gap-4 p-4 sm:gap-5 sm:p-6 md:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                      {project.category}
                    </p>
                    <h2 className="text-lg font-medium tracking-tight text-white sm:text-xl md:text-2xl">
                      {project.name}
                    </h2>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-neutral-600">
                    0{index + 1}
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm leading-relaxed text-neutral-400">
                  {project.detailedDescription
                    .split("\n")
                    .map((line) => line.replace(/^- /, "").trim())
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((point, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                        <span className="min-w-0 break-words">{point}</span>
                      </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  <Link
                    href={project.github}
                    target="_blank"
                    className="btn-ghost"
                  >
                    <FaGithub className="text-sm" /> GitHub
                  </Link>
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      className="btn-ghost"
                    >
                      <LiaExternalLinkAltSolid className="text-sm" /> Live
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
