"use client";
import { motion } from "framer-motion";
import Hero from "@/mainPages/portfolioPages/Hero";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <>
      {/* ✅ SEO Heading (VERY IMPORTANT) */}
      <h1 style={{ display: "none" }}>
        Nishitha Reddy Musku - React Native & MERN Stack Developer Portfolio
      </h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <Hero />
      </motion.div>
    </>
  );
}