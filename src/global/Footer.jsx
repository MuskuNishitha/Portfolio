// components/Footer.jsx (Updated)
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { socialLinksArray } from "./SocialMediaLinks";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import ScrollToTopFooter from "@/components/ScrollToTopFooter";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/Portfolio" },
  { name: "Resume", href: "/Resume" },
  // { name: "Blog", href: "/Blog" },
  { name: "Contact", href: "/Contact" },
];

// Map icon strings to actual components
const iconMap = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
  FaPhone: FaPhone,
  MdEmail: MdEmail,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show based on theme
  const getLogoPath = () => {
    if (!mounted) return "/assets/white_bg.png";
    return isDarkMode ? "/assets/white_bg.png" : "/assets/black_bg.png";
  };

  return (
    <>
      <footer className={`relative border-t transition-colors duration-300 overflow-hidden ${
        isDarkMode 
          ? "bg-gradient-to-b from-gray-900 to-gray-900/95 border-gray-800" 
          : "bg-gradient-to-b from-gray-50 to-white border-gray-200"
      }`}>
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="container-custom py-12 md:py-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Link 
              href="/" 
              className="inline-block transition-all duration-300 hover:scale-105 hover:opacity-90"
              aria-label="Go to homepage"
            >
              <div className="relative w-[140px] h-[80px]">
                <Image
                  src={getLogoPath()}
                  alt="Musku Nishitha Reddy Logo"
                  fill
                  sizes="140px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-8"
            aria-label="Footer navigation"
          >
            <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 relative group ${
                      isDarkMode
                        ? "text-gray-400 hover:text-primary-3"
                        : "text-gray-600 hover:text-primary-3"
                    }`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-primary-3" : "bg-primary-3"
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4 mb-8"
          >
            {socialLinksArray.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target={social.link.startsWith('http') ? "_blank" : undefined}
                  rel={social.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-400 hover:bg-primary-3 hover:text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-primary-3 hover:text-white"
                  }`}
                  aria-label={`Visit our ${social.name} page`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className="text-lg" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-center text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p>
              © {currentYear} All rights reserved by{" "}
              <span className={`transition-all duration-300 font-medium hover:underline inline-block hover:scale-105 ${
                isDarkMode 
                  ? "text-primary-3 hover:text-primary" 
                  : "text-primary-3 hover:text-primary"
              }`}>
                Musku Nishitha Reddy
              </span>
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to Top Button with Water Effect */}
      <ScrollToTopFooter />
    </>
  );
}