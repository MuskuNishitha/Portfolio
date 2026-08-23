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
    theme_color: "#eab308",
    orientation: "portrait-primary",
    lang: "en",
    scope: "/",
    categories: ["portfolio", "technology", "development"],

    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],

    screenshots: [
      {
        src: "/og_img.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
      },
    ],
  };
}