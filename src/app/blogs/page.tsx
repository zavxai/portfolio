"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { blogs } from "@/features/blogs/data/blogs";
import { IoIosArrowBack } from "react-icons/io";
import { Button } from "@/components/ui/button";

function BlogsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const paginatedBlogs = blogs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    router.push(`/blogs?page=${newPage}`);
  };

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

        <p className="section-label mb-3">Writing</p>
        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          All posts
        </h1>
        <p className="mt-3 max-w-xl text-[15px] text-neutral-400 sm:mt-4 sm:text-base">
          Notes on AI systems, engineering craft, and shipping software that
          lasts.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] sm:p-5"
          >
            <span className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
              {blog.date}
              {blog.readingTime ? ` · ${blog.readingTime}` : ""}
            </span>

            <h3 className="mb-3 text-[15px] font-medium leading-snug tracking-tight text-white">
              {blog.title}
            </h3>

            <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-neutral-500">
              {blog.description}
            </p>

            <span className="mt-4 text-xs font-medium text-neutral-500 transition-colors group-hover:text-white">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className="rounded-full border-white/10 bg-transparent text-neutral-300 hover:bg-white/5 hover:text-white"
          >
            Previous
          </Button>
          <span className="font-mono text-sm text-neutral-500">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="rounded-full border-white/10 bg-transparent text-neutral-300 hover:bg-white/5 hover:text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function BlogsPage() {
  return (
    <Suspense>
      <BlogsContent />
    </Suspense>
  );
}
