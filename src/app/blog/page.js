import BlogIndex from "@/components/blog/BlogIndex";
import HeaderBanner from "@/global/HeaderBanner";
import {
  BLOG_BASE_URL,
  getAllBlogPostSummaries,
  getBlogCategories,
  toAbsoluteBlogUrl,
} from "@/lib/blogs";
import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Read the blog posts by Nishitha Reddy Musku, covering topics on React Native development, MERN Stack, web development tips, mobile app development, and career insights for developers.",
  path: "/blog",
  keywords: [
    "React Native Blog",
    "MERN Stack Blog",
    "Web Development Blog",
    "Mobile App Development Tips",
    "Developer Blog India",
    "Nishitha Reddy Musku Blog",
  ],
  type: "website",
});

export default function BlogPage() {
  const postSummaries = getAllBlogPostSummaries();
  const categories = getBlogCategories(postSummaries);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Nishitha Reddy Musku Blog",
    description:
      "Practical technical articles about React, React Native, Next.js, Node.js, MongoDB, Redux Toolkit, and frontend engineering.",
    url: `${BLOG_BASE_URL}/blog`,
    author: {
      "@type": "Person",
      name: "Nishitha Reddy Musku",
      url: BLOG_BASE_URL,
    },
    blogPost: postSummaries.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${BLOG_BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      image: toAbsoluteBlogUrl(post.image),
      keywords: post.keywords,
    })),
  };

  return (
    <>
      <Script
        id="blog-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="blog-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <BlogIndex posts={postSummaries} categories={categories} />
    </>
  );
}
