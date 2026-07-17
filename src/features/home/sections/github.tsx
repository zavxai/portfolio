import GitHubCalendar from "react-github-calendar";
import { FaGithub } from "react-icons/fa6";

export default function GitHub() {
  return (
    <section className="rounded-2xl p-5 overflow-hidden
                        bg-white/10 dark:bg-white/5
                        backdrop-blur-2xl
                        border border-white/30 dark:border-white/10
                        shadow-[0_8px_32px_rgba(0,0,0,0.10)]">

      {/* Header row */}
      <div className="flex items-center justify-between mb-1 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <FaGithub className="text-xl text-neutral-700 dark:text-neutral-300" />
          <h2 className="text-xl font-semibold">GitHub Contributions</h2>
        </div>
        <a
          href="https://github.com/zavxai"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:block text-xs text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          @zavxai
        </a>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-4">
        Consistent shipping — one commit at a time.
      </p>

      {/* Calendar */}
      <div className="github-calendar-wrapper w-full">
        <GitHubCalendar
          username="zavxai"
          blockSize={11}
          blockMargin={4}
          fontSize={12}
          theme={{
            light: ["#f0f0f0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
            dark:  ["#1a1a1a", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
        />
      </div>
    </section>
  );
}