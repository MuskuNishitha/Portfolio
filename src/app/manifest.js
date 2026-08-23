// manifest.js - Web App Manifest for PWA support
// Generates manifest.json at build time

const BASE_URL = "https://muskunishitha.vercel.app";

export default function manifest() {
  return {
    name: "Nishitha Reddy Musku - React Native & MERN Stack Developer",
    short_name: "Nishitha Portfolio",
    description:
      "Portfolio of Nishitha Reddy Musku, React Native & MERN Stack Developer specializing in scalable mobile apps, web apps, and modern UI/UX design.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8750f7",
    orientation: "portrait-primary",
    lang: "en",
    scope: "/",
    categories: ["portfolio", "technology", "development"],
    icons: [
      {
        src: "/favicon-32x32.jpg",
        sizes: "32x32",
        type: "image/jpeg",
      },
      {
        src: "/favicon-16x16.jpg",
        sizes: "16x16",
        type: "image/jpeg",
      },
      {
        src: "/apple-touch-icon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
        purpose: "any maskable",
      },
      {
        src: "/main_photo_seo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/main_photo_seo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  };
}