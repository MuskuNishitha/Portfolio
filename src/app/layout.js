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
    title: "Nishitha Reddy Musku Portfolio",
    description:
      "Explore projects, skills, and experience in React Native, MERN Stack, and frontend development.",
    url: BASE_URL,
    siteName: "Nishitha Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Use local or properly versioned image
        width: 1200,
        height: 630,
        alt: "Nishitha Reddy Musku Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishitha Reddy Musku Portfolio",
    description:
      "React Native & MERN Stack Developer building scalable apps.",
    creator: "@nishitha_reddy", // Update with actual handle
    images: ["/og-image.jpg"],
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
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${russoOne.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sora overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
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

        {/* Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Nishitha Reddy Musku",
            url: BASE_URL,
            image:
              "https://res.cloudinary.com/db7ysyonw/image/upload/v1774774517/ProfileMain_gzqney.jpg",
            jobTitle: "React Native & MERN Stack Developer",
            sameAs: [
              "https://github.com/MuskuNishitha", // Update actual URL
              "https://www.linkedin.com/in/musku-nishitha-7a535b36b", // Update actual URL
            ],
            worksFor: {
              "@type": "Organization",
              name: "Freelancer / Developer",
            },
            knowsAbout: ["React Native", "MERN Stack", "TypeScript", "Node.js"],
          })}
        </Script>

        <Providers>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollTop />
            <CustomCursor />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}