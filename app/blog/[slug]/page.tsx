import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { apiFetch, ApiError } from "@/lib/api";
import type { Blog } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    return await apiFetch<Blog>(`/blogs/slug/${slug}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};

  return {
    title: blog.seoTitle ?? blog.title,
    description: blog.seoDescription ?? blog.excerpt ?? undefined,
    alternates: blog.canonicalUrl ? { canonical: blog.canonicalUrl } : undefined,
    openGraph: blog.featuredMedia
      ? {
          images: [
            {
              url: blog.featuredMedia.url,
              width: blog.featuredMedia.width ?? undefined,
              height: blog.featuredMedia.height ?? undefined,
            },
          ],
        }
      : undefined,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="text-sm text-black/50 hover:underline dark:text-white/50">
        ← Back to blog
      </Link>

      <article className="mt-6">
        {blog.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {blog.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: category.color ? `${category.color}1a` : undefined,
                  color: category.color ?? undefined,
                }}
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{blog.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/50 dark:text-white/50">
          <span>{blog.author.fullName}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(blog.publishedAt)}</span>
          {blog.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{blog.readingTime} min read</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{blog.views.toLocaleString()} views</span>
        </div>

        {blog.featuredMedia && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blog.featuredMedia.url}
            alt={blog.featuredMedia.altText ?? ""}
            className="mt-6 aspect-video w-full rounded-xl object-cover"
          />
        )}

        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>

        {blog.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-black/10 pt-6 dark:border-white/10">
            {blog.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-black/5 px-2.5 py-0.5 text-xs text-black/60 dark:bg-white/10 dark:text-white/60"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
