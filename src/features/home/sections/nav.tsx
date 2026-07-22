import Link from "next/link";
import { Mail } from "lucide-react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-8">
        <Link
          href="/"
          className="min-w-0 shrink text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 sm:text-2xl md:text-3xl"
        >
          Johnvessly Alti
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-[13px] text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center">
          <a
            href="mailto:altijohnvessly@gmail.com"
            className="btn-primary !hidden !px-4 !py-1.5 !text-xs sm:!inline-flex"
          >
            altijohnvessly@gmail.com
          </a>
          <a
            href="mailto:altijohnvessly@gmail.com"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white text-black transition hover:bg-neutral-200 sm:hidden"
            aria-label="Email altijohnvessly@gmail.com"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
