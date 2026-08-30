import BlogArticle from "@/components/blog/BlogArticle";
import {
  BLOG_BASE_URL,
  getAllBlogPostSummaries,
  getBlogPostBySlug,
  getPreviousAndNextBlogPosts,
  getRelatedBlogPosts,
  getTableOfContents,
  parseMarkdownBlocks,
  toAbsoluteBlogUrl,
} from "@/lib/blogs";
import {
  generateMetadata as buildMetadata,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";
import Script from "next/script";

export function generateStaticParams() {
  return getAllBlogPostSummaries().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  const metadata = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords?.length
      ? post.keywords
      : [post.category, ...post.tags, "Nishitha Reddy Musku Blog"],
    ogImage: post.image,
    ogImageAlt: post.imageAlt,
    type: "article",
  });

  const canonicalUrl = post.canonical || `${BLOG_BASE_URL}/blog/${post.slug}`;
  const datePublished = new Date(`${post.date}T00:00:00`).toISOString();
  const dateModified = new Date(`${post.dateModified || post.date}T00:00:00`).toISOString();

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      url: canonicalUrl,
      publishedTime: datePublished,
      modifiedTime: dateModified,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      ...metadata.twitter,
      title: `${post.title} | Nishitha Reddy Musku`,
      description: post.description,
      images: [toAbsoluteBlogUrl(post.image)],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blocks = parseMarkdownBlocks(post.content);
  const tableOfContents = getTableOfContents(post.content);
  const relatedPosts = getRelatedBlogPosts(post);
  const { previous, next } = getPreviousAndNextBlogPosts(post.slug);

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.description,
    image: toAbsoluteBlogUrl(post.image),
    datePublished: new Date(`${post.date}T00:00:00`).toISOString(),
    dateModified: new Date(`${post.dateModified || post.date}T00:00:00`).toISOString(),
    url: post.canonical || `${BLOG_BASE_URL}/blog/${post.slug}`,
    wordCount: post.wordCount,
    category: post.category,
    keywords: post.keywords,
    author: post.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <Script
        id="blog-article-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="blog-article-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </section>
      <BlogArticle
        post={post}
        blocks={blocks}
        tableOfContents={tableOfContents}
        relatedPosts={relatedPosts}
        previousPost={previous}
        nextPost={next}
      />
    </>
  );
}
