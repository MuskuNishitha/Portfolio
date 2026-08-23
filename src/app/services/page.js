import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Services from "@/mainPages/portfolioPages/Services";
import Script from "next/script";
import React from "react";

export const metadata = generateMetadata({
  title: "Services",
  description:
    "Explore the services offered by Nishitha Reddy Musku, a React Native & MERN Stack Developer. Specializing in mobile app development, web application development, UI/UX design, and full-stack solutions.",
  path: "/services",
  keywords: [
    "React Native Development Services",
    "MERN Stack Development Services",
    "Mobile App Development Services",
    "Web Development Services Hyderabad",
    "Freelance Developer Services",
    "Full Stack Development Services",
  ],
  type: "website",
});

const page = () => {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <div>
      <Script
        id="services-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Services - Nishitha Reddy Musku | React Native & MERN Stack Developer</h1>
        <p>
          Professional development services including React Native mobile apps, MERN Stack web applications, 
          custom UI/UX design, and full-stack solutions. Based in Hyderabad, serving clients worldwide.
        </p>
      </section>
      <Services />
    </div>
  );
};

export default page;