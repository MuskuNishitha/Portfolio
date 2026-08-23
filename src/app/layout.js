import { Sora, Russo_One, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import ScrollTop from "@/global/ScrollTop";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/components/ReduxProvider";
import CustomCursor from "@/components/CustomCursor";
import RouteTransition from "@/components/RouteTransition";
import Script from "next/script";
import { getPersonSchema, getWebsiteSchema, getLocalBusinessSchema } from "@/lib/seo-utils";

const BASE_URL = "https://muskunishitha.vercel.app";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Nishitha Reddy Musku | React Native & MERN Stack Developer Portfolio",
    template: "%s | Nishitha Reddy Musku",
  },

  description:
    "Portfolio of Nishitha Reddy Musku, a skilled React Native & MERN Stack Developer with 2+ years of experience. Specializing in building scalable mobile apps, web applications, and modern UI/UX design. Available for freelance and full-time opportunities.",

  keywords: [
    "Nishitha Reddy Musku",
    "Musku Nishitha Reddy",
    "React Native Developer India",
    "MERN Stack Developer",
    "Frontend Developer Portfolio",
    "React Developer Hyderabad",
    "Mobile App Developer",
    "Web Developer Portfolio",
    "Full Stack Developer",
    "JavaScript Developer",
    "Freelance React Native Developer",
    "Hyderabad Software Developer",
    "React Native Developer Hyderabad",
    "MERN Stack Freelancer",
    "Portfolio Website Developer",
  ],

  authors: [
    { name: "Nishitha Reddy Musku", url: BASE_URL },
    { name: "Musku Nishitha Reddy", url: BASE_URL },
  ],
  creator: "Nishitha Reddy Musku",
  publisher: "Nishitha Reddy Musku",
  generator: "Next.js",
  applicationName: "Nishitha Reddy Musku Portfolio",
  referrer: "origin-when-cross-origin",

  openGraph: {
    title: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    description:
      "Explore the portfolio of Nishitha Reddy Musku, showcasing projects, skills, and experience in React Native, MERN Stack, and frontend development. Building scalable mobile and web applications with modern technologies.",
    url: BASE_URL,
    siteName: "Nishitha Reddy Musku Portfolio",
    images: [
      {
        url: `${BASE_URL}/seo_image.png`,
        width: 1200,
        height: 630,
        alt: "Nishitha Reddy Musku - React Native & MERN Stack Developer Portfolio - Hyderabad, India",
        type: "image/png",
        secureUrl: `${BASE_URL}/seo_image.png`,
      },
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nishitha Reddy Musku Portfolio",
        type: "image/jpeg",
        secureUrl: `${BASE_URL}/og-image.jpg`,
      },
    ],
    locale: "en_IN",
    type: "website",
    determiner: "auto",
    countryName: "India",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    description:
      "Portfolio of Nishitha Reddy Musku - React Native & MERN Stack Developer with 2+ years of experience building scalable apps with modern UI/UX.",
    creator: "@nishithareddy",
    site: "@nishithareddy",
    images: [`${BASE_URL}/seo_image.png`],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "en-IN": BASE_URL,
    },
    types: {
      "application/rss+xml": `${BASE_URL}/rss.xml`,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/image16.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/image32.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/seo_image.png", sizes: "192x192", type: "image/png" },
      { url: "/seo_image.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.jpg",
      },
    ],
  },

  manifest: `${BASE_URL}/manifest.json`,

  category: "technology",
  classification: "Portfolio Website",
  pageInfo: {
    image: `${BASE_URL}/seo_image.png`,
  },

  verification: {
    google: "d0rdKhmxIWpDC4lXnL_h7Bynf697jpQDh5YzSgC2ZWo",
    yandex: "",
    yahoo: "",
    bing: "",
  },

  other: {
    "facebook-domain-verification": "your-facebook-verification-code",
    "google-site-verification": "d0rdKhmxIWpDC4lXnL_h7Bynf697jpQDh5YzSgC2ZWo",
    "msvalidate.01": "",
    "yandex-verification": "",
  },

  appleWebApp: {
    capable: true,
    title: "Nishitha Portfolio",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  bookmarks: BASE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${russoOne.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="Nishitha Reddy Musku Portfolio RSS Feed" href={`${BASE_URL}/rss.xml`} />

        {/* Mobile App Links */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nishitha Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="width" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />

        {/* Copyright */}
        <meta name="copyright" content="Copyright © 2024 Nishitha Reddy Musku. All Rights Reserved." />

        {/* Revisit After */}
        <meta name="revisit-after" content="7 days" />

        {/* Rating */}
        <meta name="rating" content="general" />

        {/* Target Audience */}
        <meta name="target" content="all" />

        {/* Distribution */}
        <meta name="distribution" content="global" />

        {/* Co-Author */}
        <meta name="coverage" content="Worldwide" />

        {/* Resource Hints */}
        <link rel="preload" as="image" href="/seo_image.png" />
        <link rel="preload" as="image" href="/Professional.jpg" />
      </head>
      <body className="font-sora overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Default theme-color meta tag */}
        <Script id="theme-script" strategy="afterInteractive">
          {`
    (function() {
      function updateThemeColor() {
        try {
          const isDark = document.documentElement.classList.contains('dark');
          const savedColor = document.documentElement.getAttribute('data-primary') || 'purple';
          
          const colors = {
            purple: '#8750f7', pink: '#ec489a', blue: '#3b82f6',
            red: '#ef4444', yellow: '#eab308', orange: '#f97316',
            green: '#22c55e', cyan: '#06b6d4'
          };
          
          const darkColors = {
            purple: '#4a2baa', pink: '#9e267a', blue: '#1e4893',
            red: '#a83232', yellow: '#8a6305', orange: '#a34d09',
            green: '#147a3a', cyan: '#047481'
          };
          
          const themeColor = isDark ? (darkColors[savedColor] || '#4a2baa') : (colors[savedColor] || '#8750f7');
          
          let meta = document.querySelector("meta[name='theme-color']");
          if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
          }
          meta.content = themeColor;
        } catch(e) { console.error(e); }
      }
      
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
      }
      
      const savedColor = localStorage.getItem('primary-color') || 'purple';
      document.documentElement.setAttribute('data-primary', savedColor);
      updateThemeColor();
      
      const observer = new MutationObserver(() => updateThemeColor());
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class', 'data-primary'] 
      });
      
      window.addEventListener('primaryColorChanged', () => updateThemeColor());
    })();
  `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-87R1TGZ3MT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-87R1TGZ3MT', {
        page_path: window.location.pathname,
        send_page_view: true
      });
    `}
        </Script>

        {/* Performance monitoring - Core Web Vitals */}
        <Script id="web-vitals" strategy="afterInteractive">
          {`
      if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
          setTimeout(function() {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            if (loadTime > 0) {
              gtag('event', 'performance', {
                'load_time': loadTime,
                'dom_ready': timing.domContentLoadedEventEnd - timing.navigationStart
              });
            }
          }, 0);
        });
      }
    `}
        </Script>

        {/* Structured Data - Person (Enhanced) */}
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />

        {/* Structured Data - Website (Enhanced) */}
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />

        {/* Structured Data - Local Business */}
        <Script
          id="local-business-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <Script
          id="breadcrumb-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: BASE_URL,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Portfolio",
                  item: `${BASE_URL}/Portfolio`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Nishitha Reddy Musku",
                  item: BASE_URL,
                },
              ],
            }),
          }}
        />

        {/* Structured Data - WebPage */}
        <Script
          id="webpage-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Nishitha Reddy Musku Portfolio",
              description:
                "Portfolio of Nishitha Reddy Musku, React Native & MERN Stack Developer",
              url: BASE_URL,
              isPartOf: {
                "@type": "WebSite",
                name: "Nishitha Reddy Musku Portfolio",
                url: BASE_URL,
              },
              about: {
                "@type": "Person",
                name: "Nishitha Reddy Musku",
              },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${BASE_URL}/seo_image.png`,
              },
              inLanguage: "en-US",
              dateCreated: "2024-01-01",
              dateModified: new Date().toISOString(),
            }),
          }}
        />

        <Providers>
          <ThemeProvider>
            <RouteTransition />
            <Header />
            <main>{children}</main>
            <Footer />
            <CustomCursor />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}