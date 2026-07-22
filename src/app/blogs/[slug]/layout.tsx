import Link from "next/link";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { notFound } from "next/navigation";
import { blogs } from "@/features/blogs/data/blogs";

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blogIndex = blogs.findIndex((b) => b.slug === slug);
  const blog = blogs[blogIndex];

  if (!blog) {
    notFound();
  }

  const prevBlog = blogIndex > 0 ? blogs[blogIndex - 1] : null;
  const nextBlog = blogIndex < blogs.length - 1 ? blogs[blogIndex + 1] : null;

  return (
    <section className="mx-auto w-full max-w-3xl min-w-0 px-4 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
      <Link
        href="/blogs"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white sm:mb-8"
      >
        <IoIosArrowBack className="text-base" />
        All posts
      </Link>

      {"heroImage" in blog && blog.heroImage && (
        <div className="mb-6 w-full overflow-hidden rounded-xl border border-white/[0.08] sm:mb-8 sm:rounded-2xl">
          <Image
            src={blog.heroImage as string}
            alt={blog.title}
            width={800}
            height={450}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8 border-b border-white/[0.08] pb-6 sm:mb-10 sm:pb-8">
        <p className="section-label mb-3 sm:mb-4">
          {blog.date}
          {blog.readingTime ? ` · ${blog.readingTime}` : ""}
        </p>
        <h1 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {blog.title}
        </h1>
      </header>

      <article className="max-w-none min-w-0 overflow-x-hidden">{children}</article>

      <div className="mt-12 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-6 sm:mt-16 sm:grid-cols-2 sm:pt-8">
        {prevBlog ? (
          <Link
            href={`/blogs/${prevBlog.slug}`}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-white/15 hover:bg-white/[0.04] sm:p-5"
          >
            <p className="mb-1.5 text-xs text-neutral-500">← Previous</p>
            <p className="text-sm font-medium text-white">{prevBlog.title}</p>
          </Link>
        ) : (
          <div />
        )}

        {nextBlog ? (
          <Link
            href={`/blogs/${nextBlog.slug}`}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-left transition-all hover:border-white/15 hover:bg-white/[0.04] sm:p-5 sm:text-right"
          >
            <p className="mb-1.5 text-xs text-neutral-500">Next →</p>
            <p className="text-sm font-medium text-white">{nextBlog.title}</p>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  );
}
