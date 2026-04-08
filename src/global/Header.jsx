"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiArrowRight,
  FiHome,
  FiUser,
  FiSettings,
  FiFolder,
  FiFileText,
  FiBookOpen,
  FiMail as FiMailIcon,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiChevronRight,
  FiSend,
  FiUser as FiUserIcon,
  FiPhone,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    setActiveItem(window.location.pathname);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "About", path: "/about", icon: FiUser },
    { name: "Services", path: "/services", icon: FiSettings },
    { name: "Portfolio", path: "/Portfolio", icon: FiFolder },
    { name: "Resume", path: "/Resume", icon: FiFileText },
    // { name: "Blog", path: "/Blog", icon: FiBookOpen },
    { name: "Contact", path: "/Contact", icon: FiMailIcon },
  ];

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/musku-nishitha", label: "GitHub" },
    { icon: FiLinkedin, href: "https://linkedin.com/in/musku-nishitha", label: "LinkedIn" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  ];

  const handleNavClick = (path) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your name" });
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your email" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email address" });
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your message" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
=======

>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
    if (!validateForm()) {
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/v1/contacts/new_gmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          phone: formData.phone?.trim() || ""
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "✓ Message sent successfully! I'll get back to you within 24 hours."
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
<<<<<<< HEAD
        
=======

>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
        // Auto close modal after 2 seconds on success
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus({ type: "", message: "" });
        }, 2000);
      } else {
        throw new Error(data.message || data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Network error. Please check your connection and try again."
      });
<<<<<<< HEAD
      
=======

>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
      // Clear error after 4 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Reset form when opening
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitStatus({ type: "", message: "" });
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSubmitStatus({ type: "", message: "" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const navItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const getLogoPath = () => {
    if (!mounted) return "/assets/white_bg.png";
    return isDarkMode ? "/assets/white_bg.png" : "/assets/black_bg.png";
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? isDarkMode
              ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50"
              : "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
<<<<<<< HEAD
            <Link 
              href="/" 
              className="group relative flex-shrink-0" 
              onClick={() => handleNavClick("/")}
            >
              <motion.div 
=======
            <Link
              href="/"
              className="group relative flex-shrink-0"
              onClick={() => handleNavClick("/")}
            >
              <motion.div
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                className="relative w-[90px] sm:w-[110px] lg:w-[130px] h-[40px] sm:h-[55px] lg:h-[65px] transition-all duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src={getLogoPath()}
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 250px"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium transition-all duration-300 group ${activeItem === item.path
                      ? "text-primary"
                      : isDarkMode
                        ? "text-gray-300 hover:text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {activeItem === item.path && (
                    <motion.span
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-lg ${isDarkMode ? "bg-primary/20" : "bg-primary/10"
                        }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2" />
                </Link>
              ))}
            </nav>

            {/* Tablet Navigation */}
            <nav className="hidden md:flex lg:hidden items-center gap-1">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => handleNavClick(item.path)}
<<<<<<< HEAD
                  className={`relative px-2.5 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    activeItem === item.path
=======
                  className={`relative px-2.5 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${activeItem === item.path
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      ? "text-primary"
                      : isDarkMode
                        ? "text-gray-300 hover:text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`}
                >
                  {item.name}
                  {activeItem === item.path && (
                    <motion.span
                      layoutId="activeNavTablet"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
              {navItems.length > 5 && (
                <button
                  onClick={() => setMobileMenuOpen(true)}
<<<<<<< HEAD
                  className={`px-2.5 py-2 text-xs font-medium transition-all hover:scale-105 whitespace-nowrap ${
                    isDarkMode
=======
                  className={`px-2.5 py-2 text-xs font-medium transition-all hover:scale-105 whitespace-nowrap ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      ? "text-gray-300 hover:text-primary"
                      : "text-gray-700 hover:text-primary"
                    }`}
                >
                  More...
                </button>
              )}
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`relative w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-100 border border-gray-200"
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-4 h-4 lg:w-5 lg:h-5"
                >
                  {!isDarkMode ? (
                    <FiSun className="w-full h-full text-yellow-500" />
                  ) : (
                    <FiMoon className="w-full h-full text-primary" />
                  )}
                </motion.div>
              </motion.button>
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-full py-2 px-4 lg:py-2.5 lg:px-6 xl:py-3 xl:px-7 overflow-hidden transition-all duration-300 hover:shadow-xl text-sm lg:text-base"
=======
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-2)] text-white font-semibold rounded-full py-2 px-4 lg:py-2.5 lg:px-6 xl:py-3 xl:px-7 overflow-hidden transition-all duration-300 hover:shadow-xl text-sm lg:text-base"
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
              >
                <span className="relative z-10">Hire Me!</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-2)]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full grid place-items-center">
                  <FiArrowRight className="w-2.5 h-2.5 lg:w-3 lg:h-3" style={{ color: 'var(--primary)' }} />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${isDarkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-100"
                }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
              ) : (
                <FiMenu className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl z-50 md:hidden ${isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className={`flex items-center justify-between p-5 sm:p-6 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}>
                  <div className="relative w-24 h-12 sm:w-28 sm:h-14">
                    <Image
                      src={getLogoPath()}
                      alt="Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-full transition-colors ${isDarkMode
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                      }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                  </motion.button>
                </div>

                {/* Navigation Items with Icons */}
                <nav className="flex-1 overflow-y-auto py-6 px-5 sm:px-6">
                  {navItems.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={navItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`flex items-center gap-3 sm:gap-4 py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl transition-all duration-300 mb-2 group ${isActive
                              ? isDarkMode
                                ? "bg-primary/20 text-primary"
                                : "bg-primary/10 text-primary"
                              : isDarkMode
                                ? "text-gray-300 hover:bg-gray-800"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${isActive ? "text-primary" : isDarkMode ? "text-gray-400 group-hover:text-primary" : "text-gray-500 group-hover:text-primary"
                            }`} />
                          <span className="text-sm sm:text-base font-medium flex-1">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeMobile"
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                          {!isActive && (
                            <FiChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? "text-gray-600" : "text-gray-400"
                              } group-hover:translate-x-1 transition-transform`} />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Social Links in Mobile */}
                  <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-gray-800" : "border-gray-200"
                    }`}>
                    <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                      Connect With Me
                    </h3>
                    <div className="flex gap-2 sm:gap-3 px-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2.5 sm:p-3 rounded-xl transition-all ${isDarkMode
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
                </nav>

                {/* Footer */}
                <div className={`p-5 sm:p-6 border-t space-y-3 sm:space-y-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}>
                  {/* Email */}
                  <a
                    href="mailto:mnishithareddy8765@gmail.com"
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all group ${isDarkMode
                        ? "bg-gray-800/50 hover:bg-primary/10"
                        : "bg-gray-50 hover:bg-primary/5"
                      }`}
                  >
                    <div className={`p-2 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-700" : "bg-white"
                      }`}>
                      <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        Email Me
                      </p>
                      <p className={`text-xs sm:text-sm font-medium truncate transition-colors ${isDarkMode
                          ? "text-gray-300 group-hover:text-primary"
                          : "text-gray-700 group-hover:text-primary"
                        }`}>
                        mnishithareddy8765@gmail.com
                      </p>
                    </div>
                    <FiArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${isDarkMode ? "text-gray-500 group-hover:text-primary group-hover:translate-x-1" : "text-gray-400 group-hover:text-primary group-hover:translate-x-1"
                      }`} />
                  </a>

                  {/* Theme Toggle */}
                  <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                    }`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg shadow-sm ${isDarkMode ? "bg-gray-700" : "bg-white"
                        }`}>
                        {!isDarkMode ? (
                          <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        ) : (
                          <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                          Theme
                        </p>
                        <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                          {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative w-11 h-6 rounded-full p-1 transition-colors ${isDarkMode ? "bg-gray-600" : "bg-gray-300"
                        }`}
                    >
                      <motion.span
                        animate={{ x: isDarkMode ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>

                  {/* Hire Me Button */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal();
                    }}
                    className="group block w-full py-3 sm:py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Hire Me!
                      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hire Me Modal - Mobile Responsive */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              onClick={closeModal}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
<<<<<<< HEAD
                className={`w-full max-w-[95%] sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header - Sticky */}
                <div className={`sticky top-0 z-10 px-4 sm:px-6 py-4 sm:py-5 border-b ${
                  isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}>
                        Hire Me
                      </h3>
                      <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}>
=======
                className={`w-full max-w-[95%] sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-white"
                  }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header - Sticky */}
                <div className={`sticky top-0 z-10 px-4 sm:px-6 py-4 sm:py-5 border-b ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        Hire Me
                      </h3>
                      <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                        Fill out the form and I'll get back to you within 24 hours
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      disabled={isSubmitting}
<<<<<<< HEAD
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                        isDarkMode
=======
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-100"
                        } disabled:opacity-50`}
                    >
<<<<<<< HEAD
                      <FiX className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`} />
=======
                      <FiX className={`w-4 h-4 sm:w-5 sm:h-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`} />
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                    </button>
                  </div>
                </div>

                {/* Form - Scrollable */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
                  {/* Name Field */}
                  <div>
<<<<<<< HEAD
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUserIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`} />
=======
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUserIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`} />
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
<<<<<<< HEAD
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
=======
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
<<<<<<< HEAD
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`} />
=======
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`} />
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
<<<<<<< HEAD
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
=======
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
<<<<<<< HEAD
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <FiPhone className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`} />
=======
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <FiPhone className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`} />
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
<<<<<<< HEAD
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
=======
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
<<<<<<< HEAD
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Message / Project Details *
                    </label>
                    <div className="relative">
                      <FiMessageSquare className={`absolute left-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`} />
=======
                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                      Message / Project Details *
                    </label>
                    <div className="relative">
                      <FiMessageSquare className={`absolute left-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`} />
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
<<<<<<< HEAD
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm sm:text-base ${
                          isDarkMode
=======
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm sm:text-base ${isDarkMode
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                          }`}
                        placeholder="Tell me about your project or what you need help with..."
                      />
                    </div>
                  </div>

                  {/* Status Message */}
                  <AnimatePresence>
                    {submitStatus.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
<<<<<<< HEAD
                        className={`p-2.5 sm:p-3 rounded-lg flex items-start gap-2 text-xs sm:text-sm ${
                          submitStatus.type === "success"
=======
                        className={`p-2.5 sm:p-3 rounded-lg flex items-start gap-2 text-xs sm:text-sm ${submitStatus.type === "success"
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                            ? isDarkMode
                              ? "bg-green-900/20 text-green-400 border border-green-800"
                              : "bg-green-50 text-green-700 border border-green-200"
                            : isDarkMode
                              ? "bg-red-900/20 text-red-400 border border-red-800"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                      >
                        {submitStatus.type === "success" ? (
                          <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                        ) : (
                          <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="flex-1">{submitStatus.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-2.5 sm:py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className={`inline-flex items-center justify-center gap-2 transition-all ${isSubmitting ? "opacity-0" : "opacity-100"}`}>
                      Send Message
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </motion.button>
                </form>

                {/* Footer - Sticky */}
<<<<<<< HEAD
                <div className={`sticky bottom-0 px-4 sm:px-6 py-3 sm:py-4 border-t ${
                  isDarkMode ? "border-gray-800 bg-gray-800/30" : "border-gray-200 bg-gray-50"
                }`}>
                  <p className={`text-[10px] sm:text-xs text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
=======
                <div className={`sticky bottom-0 px-4 sm:px-6 py-3 sm:py-4 border-t ${isDarkMode ? "border-gray-800 bg-gray-800/30" : "border-gray-200 bg-gray-50"
>>>>>>> 89dd205 (updated portfolio theme change  layout ---nishitha_new)
                  }`}>
                  <p className={`text-[10px] sm:text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                    I'll respond within 24 hours. Your information is safe with me.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}