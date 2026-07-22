import GitHubCalendar from "react-github-calendar";
import { FaGithub } from "react-icons/fa6";

export default function GitHub() {
  return (
    <section id="github" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label mb-3">Activity</p>
          <h2 className="section-title">
            Consistent
            <br />
            <span className="text-neutral-500">shipping.</span>
          </h2>
        </div>
        <a
          href="https://github.com/zavxai"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost self-start sm:self-auto"
        >
          <FaGithub className="text-sm" />
          @zavxai
        </a>
      </div>

      <div className="surface overflow-hidden p-5 sm:p-6">
        <div className="github-calendar-wrapper w-full">
          <GitHubCalendar
            username="zavxai"
            blockSize={11}
            blockMargin={4}
            fontSize={12}
            colorScheme="dark"
            theme={{
              dark: ["#0a0a0a", "#1a3a24", "#196c37", "#26a641", "#39d353"],
            }}
          />
        </div>
      </div>
    </section>
  );
}
