import Blog from "@/mainPages/portfolioPages/Blog";
import Contact from "@/mainPages/portfolioPages/Contact";
import Hero from "@/mainPages/portfolioPages/Hero";
import Portfolio from "@/mainPages/portfolioPages/Portfolio";
import Resume from "@/mainPages/portfolioPages/Resume";
import Services from "@/mainPages/portfolioPages/Services";
import Skills from "@/mainPages/portfolioPages/Skills";
import Testimonials from "@/mainPages/portfolioPages/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Resume />
      <Skills />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}