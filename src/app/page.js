import { generateMetadata } from "@/lib/seo-utils";
import Hero from "@/mainPages/portfolioPages/Hero";

export const metadata = generateMetadata({
  title: "Musku Nishitha | Portfolio",
  description:
    "Welcome to the portfolio of Nishitha Reddy Musku, a skilled React Native & MERN Stack Developer with 2+ years of experience. Explore projects, skills, and experience in building scalable mobile and web applications.",
  path: "/",
  keywords: [
    "Nishitha Reddy Musku Portfolio",
    "React Native Developer Portfolio",
    "MERN Stack Developer Portfolio",
    "Hyderabad Web Developer",
  ],
  type: "website",
});

export default function Home() {
  return (
    <>
      {/* SEO Heading - Visible to users and search engines */}
      <section className="sr-only" aria-hidden="false">
        <h1>
          Nishitha Reddy Musku - React Native & MERN Stack Developer Portfolio
        </h1>
        <p>
          Welcome to the portfolio of Nishitha Reddy Musku, a skilled React
          Native & MERN Stack Developer with 2+ years of experience.
          Specializing in building scalable mobile applications, web
          applications, and modern UI/UX design. Based in Hyderabad, India.
        </p>
      </section>

      <Hero />
    </>
  );
}
