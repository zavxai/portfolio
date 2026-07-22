"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Mail } from "lucide-react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="min-w-0 shrink text-sm font-bold tracking-tight text-white transition-opacity hover:opacity-80 sm:text-base"
          onClick={() => setOpen(false)}
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

        <div className="flex shrink-0 items-center gap-2">
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

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-black/95 px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-neutral-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:altijohnvessly@gmail.com"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white"
            >
              altijohnvessly@gmail.com
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
