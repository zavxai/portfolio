import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

export default function Contact() {
  const contact = [
    { name: "Email", link: "mailto:altijohnvessly@gmail.com", icon: <Mail className="w-7 h-7 sm:w-6 sm:h-6" /> },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/zavxai", icon: <FaLinkedin className="w-7 h-7 sm:w-6 sm:h-6" /> },
    { name: "GitHub", link: "https://github.com/zavxai", icon: <FaGithub className="w-7 h-7 sm:w-6 sm:h-6" /> },
    { name: "X (Twitter)", link: "https://x.com/zavxai", icon: <FaXTwitter className="w-7 h-7 sm:w-6 sm:h-6" /> },
  ];

  return (
    <section className="flex justify-center items-center w-full py-2">
      <div className="flex flex-nowrap justify-center gap-1 sm:gap-3 px-2 sm:px-6 py-3 sm:py-4 rounded-2xl
                      bg-white/10 dark:bg-white/5
                      backdrop-blur-2xl
                      border border-white/30 dark:border-white/10
                      shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
        {contact.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center justify-center w-11 h-11 sm:w-11 sm:h-11 rounded-xl
                       bg-white/20 dark:bg-white/8
                       border border-white/30 dark:border-white/10
                       shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                       text-base sm:text-xl text-neutral-600 dark:text-neutral-400
                       hover:bg-white/40 dark:hover:bg-white/15
                       hover:text-neutral-900 dark:hover:text-neutral-100
                       hover:scale-110 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]
                       transition-all duration-200"
          >
            {item.icon}
            <span
              className="absolute left-1/2 -translate-x-1/2 -top-9
                         px-3 py-1 text-xs font-medium
                         bg-white/80 dark:bg-neutral-900/80
                         backdrop-blur-md
                         text-black dark:text-white
                         rounded-lg shadow-lg border border-white/40 dark:border-neutral-700/50
                         opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                         transition-all duration-150 whitespace-nowrap pointer-events-none"
            >
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
