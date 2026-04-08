import { Sora, Russo_One } from "next/font/google";
import "./globals.css";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import ScrollTop from "@/global/ScrollTop";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/components/ReduxProvider";
import CustomCursor from "@/components/CustomCursor";
import Script from "next/script";

const BASE_URL = "https://muskunishitha.vercel.app";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    template: "%s | Nishitha Reddy Musku",
  },

  description:
    "Portfolio of Nishitha Reddy Musku, React Native & MERN Stack Developer specializing in scalable mobile apps, web apps, and modern UI/UX.",

  keywords: [
    "Nishitha Reddy Musku",
    "React Native Developer India",
    "MERN Stack Developer",
    "Frontend Developer Portfolio",
    "React Developer Hyderabad",
  ],

  authors: [{ name: "Nishitha Reddy Musku", url: BASE_URL }],
  creator: "Nishitha Reddy Musku",
  publisher: "Nishitha Reddy Musku",

  openGraph: {
    title: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    description:
      "Explore projects, skills, and experience in React Native, MERN Stack, and frontend development. Building scalable mobile and web applications.",
    url: BASE_URL,
    siteName: "Nishitha Reddy Musku Portfolio",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nishitha Reddy Musku - React Native & MERN Stack Developer Portfolio",
        type: "image/jpeg",
        secureUrl: `${BASE_URL}/og-image.jpg`,
      },
    ],
    locale: "en_IN",
    type: "website",
    determiner: "auto",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    description:
      "Portfolio of Nishitha Reddy Musku - React Native & MERN Stack Developer building scalable apps with modern UI/UX.",
    creator: "@nishithareddy",
    site: "@nishithareddy",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/site.webmanifest",
  
  category: "technology",
  
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
  },

  other: {
    "facebook-domain-verification": "your-facebook-verification-code", // Optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${russoOne.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sora overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
<<<<<<< HEAD
        {/* Theme Script */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                console.error('Theme initialization failed:', e);
              }
            })();
          `}
        </Script>
=======
      <Script id="theme-script" strategy="beforeInteractive">
  {`
    (function() {
      try {
        // Handle theme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
          document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
          document.documentElement.classList.remove('dark');
        }

        // Handle primary color
        const savedColor = localStorage.getItem('primary-color');
        if (savedColor) {
          document.documentElement.setAttribute('data-primary', savedColor);
        } else {
          document.documentElement.setAttribute('data-primary', 'purple');
        }
      } catch (e) {
        console.error('Theme initialization failed:', e);
      }
    })();
  `}
</Script>
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)

        {/* Structured Data - Person */}
        <Script
          id="person-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nishitha Reddy Musku",
            url: BASE_URL,
            image: `${BASE_URL}/profile.jpg`,
            sameAs: [
              "https://github.com/muskunishitha",
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
              "MERN Stack",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Next.js",
            ],
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Your University Name",
            },
            description:
              "React Native & MERN Stack Developer specializing in building scalable mobile and web applications with modern technologies.",
          })}
        </Script>

        {/* Structured Data - Website */}
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Nishitha Reddy Musku Portfolio",
            url: BASE_URL,
            description:
              "Portfolio of Nishitha Reddy Musku, React Native & MERN Stack Developer",
            potentialAction: {
              "@type": "SearchAction",
              target: `${BASE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

        {/* Structured Data - BreadcrumbList */}
        <Script
          id="breadcrumb-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
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
                item: `${BASE_URL}/portfolio`,
              },
            ],
          })}
        </Script>

        <Providers>
          <ThemeProvider>
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