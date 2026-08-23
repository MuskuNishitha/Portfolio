import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Projects from "@/mainPages/portfolioPages/Projects";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Projects",
  description:
    "Explore the projects built by Nishitha Reddy Musku, a React Native & MERN Stack Developer. View live demos and case studies of mobile apps, web applications, and full-stack solutions.",
  path: "/projects",
  keywords: [
    "Nishitha Reddy Musku Projects",
    "React Native Projects",
    "MERN Stack Projects",
    "Web Development Projects",
    "Mobile App Development Projects",
    "Full Stack Project Examples",
  ],
  type: "website",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ]);

  return (
    <div>
      <Script
        id="projects-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Projects by Nishitha Reddy Musku - React Native & MERN Stack Developer</h1>
        <p>
          Browse through my portfolio of projects including mobile apps, web applications, 
          and full-stack solutions built with React Native, MERN Stack, and modern technologies.
        </p>
      </section>
      <Projects />
    </div>
  );
};

export default page;