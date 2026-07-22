import Link from "next/link";
import { blogs } from "@/features/blogs/data/blogs";

export default function Blogs() {
  const recentBlogs = blogs.slice(0, 3);

  return (
    <section id="blogs" className="scroll-mt-20 sm:scroll-mt-24">
      <div className="mb-6 flex flex-row items-end justify-between gap-3 sm:mb-8 sm:gap-4">
        <div className="min-w-0">
          <p className="section-label mb-3">Writing</p>
          <h2 className="section-title">
            Latest
            <br />
            <span className="text-neutral-500">thinking.</span>
          </h2>
        </div>
        <Link
          href="/blogs"
          className="btn-secondary shrink-0 !px-3 !py-1.5 !text-xs sm:!px-5 sm:!py-2 sm:!text-sm"
        >
          All posts
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {recentBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] sm:p-5"
          >
            <span className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
              {blog.date}
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
    </section>
  );
}
