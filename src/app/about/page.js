import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import AboutUs from "@/mainPages/AboutUs";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "About Me",
  description:
    "Learn more about Nishitha Reddy Musku, a passionate React Native & MERN Stack Developer with 2+ years of experience. Discover my journey, skills, education, and passion for building scalable mobile and web applications.",
  path: "/about",
  keywords: [
    "About Nishitha Reddy Musku",
    "React Native Developer About",
    "MERN Stack Developer Background",
    "Hyderabad Developer Profile",
    "Web Developer Experience",
  ],
  type: "profile",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <div>
      <Script
        id="about-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>About Nishitha Reddy Musku - React Native & MERN Stack Developer</h1>
        <p>
          Learn about Nishitha Reddy Musku, a passionate React Native & MERN Stack Developer 
          based in Hyderabad, India. With 2+ years of experience in building scalable mobile 
          and web applications, I specialize in modern JavaScript frameworks and libraries.
        </p>
      </section>
      <AboutUs />
    </div>
  );
};

export default page;