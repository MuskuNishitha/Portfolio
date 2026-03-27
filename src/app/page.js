"use client";
import { motion } from "framer-motion";
import Blog from "@/mainPages/portfolioPages/Blog";
import Contact from "@/mainPages/portfolioPages/Contact";
import Hero from "@/mainPages/portfolioPages/Hero";
import Portfolio from "@/mainPages/portfolioPages/Portfolio";
import Resume from "@/mainPages/portfolioPages/Resume";
import Services from "@/mainPages/portfolioPages/Services";
import Skills from "@/mainPages/portfolioPages/Skills";
import Testimonials from "@/mainPages/portfolioPages/Testimonials";
import Counter from "@/mainPages/portfolioPages/Counter";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Hero />
      </motion.div>

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Services />
      </motion.div> */}
    </>
  );
}
