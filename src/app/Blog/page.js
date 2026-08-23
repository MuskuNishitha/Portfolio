import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Blog from "@/mainPages/portfolioPages/Blog";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Read the blog posts by Nishitha Reddy Musku, covering topics on React Native development, MERN Stack, web development tips, mobile app development, and career insights for developers.",
  path: "/Blog",
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

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/Blog" },
  ]);

  return (
    <div>
      <Script
        id="blog-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Blog - Nishitha Reddy Musku | React Native & MERN Stack Developer</h1>
        <p>
          Explore blog posts about React Native development, MERN Stack tutorials, 
          web development best practices, and insights from my journey as a developer.
        </p>
      </section>
      <Blog />
    </div>
  );
};

export default page;