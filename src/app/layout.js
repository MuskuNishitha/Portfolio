import { Sora, Russo_One } from "next/font/google";
import "./globals.css";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import ScrollTop from "@/global/ScrollTop";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/components/ReduxProvider";
import CustomCursor from "@/components/CustomCursor";

const BASE_URL = 'https://muskunishitha.vercel.app';

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
});

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Nishitha Reddy Musku | React Native & MERN Stack Developer",
    template: "%s | Nishitha Reddy Musku",
  },

  description:
    "React Native, MERN Stack & Frontend Developer with 2+ years of experience building scalable apps.",

  keywords: [
    "React Native Developer",
    "MERN Stack Developer",
    "Frontend Developer",
  ],

  authors: [{ name: "Nishitha Reddy Musku", url: BASE_URL }],
  creator: "Nishitha Reddy Musku",

  openGraph: {
    title: "Nishitha Reddy Musku Portfolio",
    description: "React Native & MERN Stack Developer",
    url: BASE_URL,
    siteName: "Nishitha Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Nishitha Reddy Musku",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishitha Portfolio",
    description: "React Native Developer",
    images: ["/profile.jpg"],
  },

  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${russoOne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>

      <body className="font-sora overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
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