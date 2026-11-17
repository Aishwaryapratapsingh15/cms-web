import Link from "next/link";
import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import type { Blog, PaginatedResult } from "@/lib/types";
import { Hero } from "./hero";
import { LatestArticles } from "./latest-articles";
import { CtaSection } from "./cta-section";

export const metadata: Metadata = {
  title: "Blog | EICE Technology",
  description: "Articles and updates from EICE Technology.",
};

interface PageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const categoryParam = params.category
    ? `&category=${encodeURIComponent(params.category)}`
    : "";

  const result = await apiFetch<PaginatedResult<Blog>>(
    `/blogs/public?page=${page}&limit=9&sortBy=publishedAt&sortOrder=desc${categoryParam}`,
  );

  const isFirstPage = page === "1";
  const featured = isFirstPage
    ? (result.items.find((blog) => blog.isFeatured) ?? result.items[0])
    : undefined;
  const gridItems = featured
    ? result.items.filter((blog) => blog.id !== featured.id)
    : result.items;

  return (
    <main>
      {featured && <Hero blog={featured} />}

      <LatestArticles blogs={gridItems} />

      {result.meta.totalPages > 1 && (
        <div className="mx-auto max-w-6xl px-6 pb-16 flex items-center justify-center gap-4 text-sm">
          {result.meta.page > 1 && (
            <Link
              href={`/blog?page=${result.meta.page - 1}${params.category ? `&category=${params.category}` : ""}`}
              className="underline"
            >
              Previous
            </Link>
          )}
          <span className="text-black/50 dark:text-white/50">
            Page {result.meta.page} of {result.meta.totalPages}
          </span>
          {result.meta.page < result.meta.totalPages && (
            <Link
              href={`/blog?page=${result.meta.page + 1}${params.category ? `&category=${params.category}` : ""}`}
              className="underline"
            >
              Next
            </Link>
          )}
        </div>
      )}

      <CtaSection />
    </main>
  );
}
