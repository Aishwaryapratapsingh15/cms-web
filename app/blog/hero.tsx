import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function Hero({ blog }: { blog: Blog }) {
  return (
    <section className="border-b border-black/5 bg-[#012060]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-bloo">
            Featured Article
          </span>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 line-clamp-4 sm:text-lg">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <span>{blog.author.fullName}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(blog.publishedAt)}</span>
            {blog.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{blog.readingTime} min read</span>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#articles"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-transparent bg-bloo px-7 font-semibold text-white shadow-lg shadow-bloo/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#012060] hover:shadow-xl"
            >
              Browse Blogs
            </Link>
            <a
              href="https://eicetechnology.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-bloo px-7 font-semibold text-bloo transition-all duration-300 hover:-translate-y-0.5 hover:bg-bloo hover:text-white"
            >
              Request a Demo
            </a>
          </div>

          {blog.categories.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {blog.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full bg-[#eef4fb] px-4 py-1.5 text-sm font-medium text-[#012060] transition-colors duration-200 hover:bg-bloo hover:text-white"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-2xl shadow-slate-900/15 lg:aspect-[5/4] lg:h-full">
          {blog.featuredMedia ? (
            <Image
              src={blog.featuredMedia.url}
              alt={blog.featuredMedia.altText ?? blog.title}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#012060] to-bloo" />
          )}
        </div>
      </div>
    </section>
  );
}
