// seo-utils.js - SEO Utility functions for consistent metadata across pages

const BASE_URL = "https://muskunishitha.vercel.app";

/**
 * Generate complete metadata for any page
 * @param {Object} options - SEO options
 * @param {string} options.title - Page title (without suffix)
 * @param {string} options.description - Meta description
 * @param {string} options.path - Page path (e.g., "/about")
 * @param {string[]} options.keywords - Array of keywords
 * @param {string} options.ogImage - Custom OG image path (defaults to main_photo_seo.png)
 * @param {string} options.type - OG type (website, article, profile)
 * @param {Object} options.robots - Custom robots config
 * @param {boolean} options.noIndex - If true, sets noindex
 * @returns {Object} Complete metadata object
 */
export function generateMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  ogImage = "/main_photo_seo.png",
  type = "website",
  robots = {},
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | Nishitha Reddy Musku`
    : "Nishitha Reddy Musku | React Native & MERN Stack Developer";
  const url = `${BASE_URL}${path}`;
  const imageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  return {
    title: title,
    description: description,
    keywords: [
      "Nishitha Reddy Musku",
      "React Native Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "Web Developer Portfolio",
      "React Developer Hyderabad",
      "Mobile App Developer",
      ...keywords,
    ],
    authors: [{ name: "Nishitha Reddy Musku", url: BASE_URL }],
    creator: "Nishitha Reddy Musku",
    publisher: "Nishitha Reddy Musku",
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: "Nishitha Reddy Musku Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Nishitha Reddy Musku - ${title || "Portfolio"}`,
          type: "image/png",
          secureUrl: imageUrl,
        },
      ],
      locale: "en_IN",
      type: type,
      determiner: "auto",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      creator: "@nishithareddy",
      site: "@nishithareddy",
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true, ...robots }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
          ...robots,
        },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
      },
    },
    category: "technology",
    classification: "Portfolio",
  };
}

/**
 * Generate structured data for Person/Profile
 * @returns {Object} JSON-LD Person schema
 */
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nishitha Reddy Musku",
    givenName: "Nishitha",
    familyName: "Musku",
    alternateName: "Musku Nishitha Reddy",
    url: BASE_URL,
    image: `${BASE_URL}/Professional.jpg`,
    sameAs: [
      "https://github.com/musku-nishitha",
      "https://github.com/muskunishitha",
      "https://linkedin.com/in/musku-nishitha",
      "https://linkedin.com/in/muskunishitha",
      "https://twitter.com/nishithareddy",
    ],
    jobTitle: "React Native & MERN Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance Developer",
    },
    knowsAbout: [
      "React Native",
      "React.js",
      "MERN Stack",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "REST API",
      "GraphQL",
      "Firebase",
      "AWS",
      "Git",
      "Docker",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University Name",
    },
    email: "muskunishitha2003@gmail.com",
    telephone: "+91-XXXXXXXXXX",
    description:
      "React Native & MERN Stack Developer with 2+ years of experience specializing in building scalable mobile and web applications with modern technologies.",
    knowsAbout: [
      "React Native",
      "React.js",
      "MERN Stack",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "REST API",
      "GraphQL",
      "Firebase",
      "AWS",
      "Git",
      "Docker",
    ],
  };
}

/**
 * Generate structured data for Website
 * @returns {Object} JSON-LD Website schema
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nishitha Reddy Musku Portfolio",
    url: BASE_URL,
    description:
      "Portfolio of Nishitha Reddy Musku, React Native & MERN Stack Developer",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: "Nishitha Reddy Musku",
    },
  };
}

/**
 * Generate structured data for BreadcrumbList
 * @param {Array} items - Array of {name, path} objects
 * @returns {Object} JSON-LD BreadcrumbList schema
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${BASE_URL}${item.path}`,
    })),
  };
}

/**
 * Generate structured data for Article
 * @param {Object} article - Article details
 * @returns {Object} JSON-LD Article schema
 */
export function getArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image || `${BASE_URL}/og-image.jpg`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Nishitha Reddy Musku",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Nishitha Reddy Musku",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url || BASE_URL,
    },
    wordCount: article.wordCount || 0,
    articleSection: article.category || "Technology",
  };
}

/**
 * Generate structured data for LocalBusiness (if applicable)
 * @returns {Object} JSON-LD LocalBusiness schema
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nishitha Reddy Musku - Freelance Developer",
    description:
      "React Native & MERN Stack Developer providing freelance development services for mobile apps, web apps, and modern UI/UX design.",
    url: BASE_URL,
    telephone: "+91-XXXXXXXXXX",
    email: "muskunishitha2003@gmail.com",
    image: `${BASE_URL}/Professional.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.3850",
      longitude: "78.4867",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "React Native Mobile Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MERN Stack Web Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Frontend Development",
          },
        },
      ],
    },
  };
}

/**
 * Generate structured data for FAQ
 * @param {Array} faqs - Array of {question, answer} objects
 * @returns {Object} JSON-LD FAQ schema
 */
export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const seoUtils = {
  generateMetadata,
  getPersonSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getArticleSchema,
  getLocalBusinessSchema,
  getFAQSchema,
};

export default seoUtils;