import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

const components = {
  h1: ({ children }) => (
    <h1 className="mb-8 mt-12 text-center text-3xl font-medium tracking-tight text-white md:text-4xl">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 border-b border-white/[0.08] pb-3 text-xl font-medium tracking-tight text-white md:text-2xl">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-lg font-medium tracking-tight text-neutral-100">
      {children}
    </h3>
  ),

  Block: ({ children }) => (
    <div className="mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4">
      {children}
    </div>
  ),

  p: ({ children }) => (
    <p className="my-4 text-base leading-8 text-neutral-400 sm:text-[17px]">
      {children}
    </p>
  ),

  a: ({ href, children }) => (
    <a
      href={href}
      className="text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),

  ul: ({ children }) => (
    <ul className="my-4 list-inside list-disc space-y-2 text-neutral-400">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="my-4 list-inside list-decimal space-y-2 text-neutral-400">
      {children}
    </ol>
  ),

  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 italic text-neutral-500">
      {children}
    </blockquote>
  ),

  code: ({ children }) => (
    <code className="rounded-md border border-white/[0.08] bg-white/[0.05] px-1.5 py-0.5 text-sm text-neutral-200">
      {children}
    </code>
  ),

  pre: ({ children }) => (
    <pre className="my-6 max-w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs text-neutral-300 sm:rounded-2xl sm:p-5 sm:text-sm">
      {children}
    </pre>
  ),

  img: (props) => (
    <Image
      {...(props as ImageProps)}
      width={250}
      height={250}
      sizes="(max-width: 768px) 100vw, 520px"
      className="mx-auto my-8 rounded-2xl border border-white/[0.08]"
      style={{ height: "auto" }}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
