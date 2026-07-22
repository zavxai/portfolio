import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const contact = [
    {
      name: "X",
      link: "https://x.com/zavxai",
      icon: <FaXTwitter className="h-5 w-5" />,
      handle: "@zavxai",
    },
    {
      name: "GitHub",
      link: "https://github.com/zavxai",
      icon: <FaGithub className="h-5 w-5" />,
      handle: "@zavxai",
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24">
      <p className="section-label mb-3">Contact</p>
      <h2 className="section-title mb-3 max-w-xl sm:mb-4">
        Let&apos;s build
        <br />
        <span className="text-neutral-500">something real.</span>
      </h2>
      <p className="text-body mb-8 max-w-lg sm:mb-10">
        Open to AI engineering roles, agentic systems work, and interesting
        collaboration. Reach out anytime.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {contact.map((item) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] sm:gap-4 sm:px-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 transition group-hover:border-white/20 group-hover:text-white">
              {item.icon}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium text-white">{item.name}</div>
              <div className="truncate text-xs text-neutral-500">
                {item.handle}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
