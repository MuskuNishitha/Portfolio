import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import SkillsHome from "@/mainPages/portfolioPages/SkillsHome";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Skills",
  description:
    "Explore the technical skills of Nishitha Reddy Musku, a React Native & MERN Stack Developer. Proficient in React Native, React.js, Node.js, MongoDB, Express.js, Next.js, TypeScript, and modern web technologies.",
  path: "/skills",
  keywords: [
    "React Native Skills",
    "MERN Stack Skills",
    "Web Development Skills",
    "JavaScript Developer Skills",
    "React Developer Hyderabad Skills",
    "Full Stack Developer Skills",
    "Node.js Skills",
    "MongoDB Skills",
  ],
  type: "website",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Skills", path: "/skills" },
  ]);

  return (
    <div className="py-30">
      <Script
        id="skills-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Skills - Nishitha Reddy Musku | React Native & MERN Stack Developer</h1>
        <p>
          Technical skills and expertise of Nishitha Reddy Musku including React Native, React.js, 
          Node.js, Express.js, MongoDB, Next.js, TypeScript, JavaScript, Tailwind CSS, and more.
        </p>
      </section>
      <SkillsHome />
    </div>
  );
};

export default page;