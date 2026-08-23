import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Portfolio",
  description:
    "Explore the complete portfolio of Nishitha Reddy Musku, featuring projects in React Native, MERN Stack, web development, and mobile applications. See my best work and case studies.",
  path: "/Portfolio",
  keywords: [
    "Nishitha Reddy Musku Portfolio",
    "React Native Projects",
    "MERN Stack Projects",
    "Web Development Portfolio",
    "Mobile App Portfolio",
  ],
  type: "website",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/Portfolio" },
  ]);

  return (
    <div>
      <Script
        id="portfolio-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Portfolio - Nishitha Reddy Musku | React Native & MERN Stack Developer</h1>
        <p>
          Browse through the complete portfolio of Nishitha Reddy Musku, showcasing expertise in 
          React Native mobile development, MERN Stack web applications, and modern UI/UX design.
        </p>
      </section>
      <>Portfolio</>
    </div>
  );
};

export default page;