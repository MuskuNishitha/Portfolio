"use client";

import { FiMail, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import Image from "next/image";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LetsWorkTogether() {
  const { isDarkMode } = useTheme();
  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/musku-nishitha",
      label: "GitHub",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/in/musku-nishitha",
      label: "LinkedIn",
    },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-body)",
      }}
    >
      {/* Background Blobs (same as Hero) */}
      <div
        className="absolute top-[-20%] right-[-20%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(135,80,247,0.25), transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[-20%] left-[-20%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(42,20,84,0.35), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-5 md:px-10 relative z-10">
        {/* Card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center rounded-3xl p-6 md:p-12 border shadow-lg"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "rgba(135,80,247,0.2)",
          }}
        >
          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Let’s Work Together
            </h2>

            <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              Have a project in mind? Let’s create something amazing together.
              I’m open to freelance work, full-time roles, and collaborations.
            </p>

            {/* Contact Button */}
            <Link
              href={"/Contact"}
              //   className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
              //   style={{
              //     background: "btn-primary",
              //     boxShadow: "0 4px 15px rgba(135, 80, 247, 0.3)",
              //   }}
              className="btn-primary text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3"
            >
              <FiMail /> Contact Me
            </Link>

            {/* Socials
            <div className="flex justify-center lg:justify-start gap-4 mt-6">
              <a
                href="#"
                className="p-2 rounded-full border transition hover:bg-purple-500"
                style={{ borderColor: "rgba(135,80,247,0.4)" }}
              >
                <FiLinkedin />
              </a>

              <a
                href="#"
                className="p-2 rounded-full border transition hover:bg-purple-500"
                style={{ borderColor: "rgba(135,80,247,0.4)" }}
              >
                <FiGithub />
              </a>

              <a
                href="mailto:example@gmail.com"
                className="p-2 rounded-full border transition hover:bg-purple-500"
                style={{ borderColor: "rgba(135,80,247,0.4)" }}
              >
                <FiMail />
              </a>
            </div> */}
            <div className="flex gap-2 sm:gap-3 px-2 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 sm:p-3 rounded-xl transition-all ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-400 hover:text-primary hover:bg-primary/20"
                      : "bg-gray-100 text-gray-600 hover:text-primary hover:bg-primary/10"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition"
                style={{
                  background:
                    "radial-gradient(circle, #8750f7, transparent 70%)",
                }}
              />

              {/* Image */}
              {/* <div className="w-[200px] md:w-[280px] lg:w-[320px] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/no_background_new.png"
                  alt="Contact Illustration"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div> */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div
                  className="w-48 sm:w-56 md:w-64 lg:w-72"
                  style={{
                    filter: isDarkMode
                      ? "drop-shadow(0 20px 40px rgba(135,80,247,0.35))"
                      : "drop-shadow(0 20px 40px rgba(135,80,247,0.25))",
                  }}
                >
                  <Image
                    src="/assets/no_background_new.png"
                    alt="Nishitha Reddy Musku"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* floating badge — top right of image */}
                <motion.div
                  className="absolute -top-3 -right-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: isDarkMode ? "rgba(135,80,247,0.9)" : "#8750f7",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(135,80,247,0.4)",
                    whiteSpace: "nowrap",
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Open to work ✦
                </motion.div>
                {/* floating badge — bottom left */}
                <motion.div
                  className="absolute -bottom-2 -left-6 flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
                  style={{
                    background: isDarkMode
                      ? "rgba(20,12,40,0.9)"
                      : "rgba(255,255,255,0.92)",
                    border: "1px solid rgba(135,80,247,0.25)",
                    color: isDarkMode ? "#c4b0ff" : "#6a3fd4",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    backdropFilter: "blur(8px)",
                    whiteSpace: "nowrap",
                  }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "#22c55e",
                      boxShadow: "0 0 6px #22c55e",
                    }}
                  />
                  React Native · MERN Stack
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
