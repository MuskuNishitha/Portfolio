import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Experience from "@/mainPages/portfolioPages/Experience";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Experience",
  description:
    "Explore the professional experience of Nishitha Reddy Musku, a React Native & MERN Stack Developer with 2+ years of experience. View work history, achievements, and contributions to various projects.",
  path: "/experience",
  keywords: [
    "Nishitha Reddy Musku Experience",
    "React Native Developer Experience",
    "MERN Stack Developer Work History",
    "Web Developer Experience Hyderabad",
    "Full Stack Developer Experience",
    "Software Developer Career",
  ],
  type: "website",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
  ]);

  return (
    <div>
      <Script
        id="experience-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Experience - Nishitha Reddy Musku | React Native & MERN Stack Developer</h1>
        <p>
          Professional experience of Nishitha Reddy Musku with 2+ years in React Native and MERN Stack 
          development. View work history, key achievements, and technical contributions.
        </p>
      </section>
      <Experience />
    </div>
  );
};

export default page;