import { Sora, Russo_One } from "next/font/google";
import "./globals.css";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import ScrollTop from "@/global/ScrollTop";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/components/ReduxProvider";
import CustomCursor from "@/components/CustomCursor";
// import DotsBackground from "@/global/DotsBackground";

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
  title: "Nishitha Reddy Musku | React Native, MERN Stack & Frontend Developer",
  description:
    "React Native, MERN Stack & Frontend Developer with 2 years of experience building scalable mobile apps and modern full-stack web applications using MongoDB, Express.js, React.js, Node.js, HTML, CSS, and JavaScript.",
  icons: {
    icon: "/ProfileMain.png",
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
        {/* <DotsBackground /> */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-40 noise-bg" />
        <Providers> {/* Wrap everything with Providers */}
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            {/* <ScrollTop /> */}
            <CustomCursor />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}