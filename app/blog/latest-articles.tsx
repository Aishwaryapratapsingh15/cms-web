import Link from "next/link";
import type { Blog } from "@/lib/types";
import { BlogCard } from "./blog-card";

export function LatestArticles({ blogs }: { blogs: Blog[] }) {
  return (
    <section id="articles" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-bloo">
            Latest Articles
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-blackk sm:text-4xl">
            Fresh from the blog
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            Explore our latest insights, product updates, and industry knowledge.
          </p>
        </div>

        <Link
          href="/blog"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border-2 border-bloo px-6 font-semibold text-bloo transition-all duration-300 hover:-translate-y-0.5 hover:bg-bloo hover:text-white sm:self-auto"
        >
          View All Articles
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="mt-16 text-center text-black/50 dark:text-white/50">
          No posts published yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
}
