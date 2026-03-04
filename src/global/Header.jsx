"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Set active item based on current path
    setActiveItem(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resume", path: "/resume" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNavClick = (path) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0  left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-b border-gray-200/50 dark:border-gray-800/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo with hover effect */}
            <Link href="/" className="group flex-shrink-0">
              <div className="relative w-[140px] h-[80px]">
                <Image
                  src="/assets/white_bg.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeItem === item.path
                      ? "text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {item.name}
                  {activeItem === item.path && (
                    <span className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Email with hover effect */}
              <a
                href="mailto:mnishithareddy8765@gmail.com"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                mnishithareddy8765@gmail.com
              </a>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  {/* Sun Icon */}
                  <svg
                    className={`absolute inset-0 transition-all duration-300 ${
                      !isDarkMode
                        ? "opacity-100 rotate-0 text-yellow-500"
                        : "opacity-0 -rotate-90 text-primary"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  

                  {/* Moon Icon */}
                  <svg
                    className={`absolute inset-0 transition-all duration-300 ${
                      isDarkMode
                        ? "opacity-100 rotate-0 text-primary"
                        : "opacity-0 rotate-90 text-yellow-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
              </button>
              <Link
                href="/Contact"
                className="group relative inline-flex items-center gap-3 bg-primary text-white font-semibold rounded-full py-2.5 pl-6 pr-6 overflow-hidden transition-all duration-300 hover:bg-black shadow-lg shadow-primary/25 hover:shadow-xl"
              >
                <span>Hire Me!</span>

                {/* Icon wrapper */}
                <span className="relative flex-shrink-0 w-6 h-6 bg-white rounded-full grid place-items-center overflow-hidden group-hover:bg-white transition-colors">
                  {/* Original icon */}
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Copy icon that appears on hover */}
                  <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute w-3 h-3 text-primary transition-transform duration-300 ease-in-out translate-x-[-150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 delay-100"
                  >
                    <path
                      d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Link>

              
            </div>


            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-200 block transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-x-0 top-[72px] bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-y-0 h-screen"
              : "opacity-0 -translate-y-4 h-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col h-full overflow-y-auto py-8 px-6">
            <div className="flex-1 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block py-4 px-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                    activeItem === item.path
                      ? "bg-primary/10 dark:bg-primary/20 text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="mt-auto pt-8 space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
                <button
                  onClick={toggleTheme}
                  className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors"
                >
                  <span
                    className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                      isDarkMode ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>

              {/* Email */}
              <Link
                href="mnishithareddy8765@gmail.com"
                className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-primary transition-colors group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="flex-1 group-hover:text-primary transition-colors">
                  mnishithareddy8765@gmail.com
                </span>
              </Link>

              {/* Hire Me Button */}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-4 bg-primary text-white font-semibold rounded-xl text-center shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Hire Me!
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
