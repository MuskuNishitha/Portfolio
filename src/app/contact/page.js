// app/contact/page.jsx

import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import Contact from "@/mainPages/portfolioPages/Contact";
import Script from "next/script";

export const metadata = generateMetadata({
  title: "Contact Me",
  description:
    "Get in touch with Nishitha Reddy Musku, a skilled React Native & MERN Stack Developer. Available for freelance opportunities, full-time positions, and collaboration on exciting projects. Let's discuss your next project!",
  path: "/contact",
  keywords: [
    "Contact Nishitha Reddy Musku",
    "Hire React Native Developer",
    "Hire MERN Stack Developer",
    "Freelance Web Developer Hyderabad",
    "React Native Developer Contact",
    "Web Developer For Hire",
  ],
  type: "website",
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <main>
      <Script
        id="contact-breadcrumb-json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only" aria-hidden="false">
        <h1>Contact Nishitha Reddy Musku - React Native & MERN Stack Developer</h1>
        <p>
          Have a project in mind? Get in touch with Nishitha Reddy Musku for freelance 
          opportunities, full-time positions, or collaboration. Let&apos;s build something amazing together.
        </p>
      </section>
      <Contact />
    </main>
  );
}