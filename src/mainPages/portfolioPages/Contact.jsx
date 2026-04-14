"use client";

import {
  fetchContactContent,
  resetFormStatus,
  submitContactForm,
} from "@/redux/contact/contactSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import HeaderBanner from "@/global/HeaderBanner";
import { useTheme } from "@/components/ThemeProvider";
import { ContactSkeleton } from "@/components/SkeletonLoaders";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { socialLinksArray, socialMediaLinks } from "@/global/SocialMediaLinks";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { formStatus, error, content, contentLoading } = useSelector(
    (state) => state.contact,
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    dispatch(fetchContactContent());
  }, [dispatch]);

  useEffect(() => {
    if (formStatus === "succeeded") {
      const timer = setTimeout(() => {
        dispatch(resetFormStatus());
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    };
    dispatch(submitContactForm(submitData));
  };

  // Map icon names to components
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "FaGithub":
        return <FaGithub className="w-5 h-5" />;
      case "FaLinkedin":
        return <FaLinkedin className="w-5 h-5" />;
      case "MdEmail":
        return <MdEmail className="w-5 h-5" />;
      case "FaPhone":
        return <FaPhone className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      label: "Phone",
      value: socialMediaLinks.phone.link.replace("tel:", ""),
      link: socialMediaLinks.phone.link,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Email",
      value: socialMediaLinks.email.link.replace("mailto:", ""),
      link: socialMediaLinks.email.link,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      label: "Address",
      value: "Sr nagar, Hyderabad, Telangana, India",
      color: "from-amber-500 to-orange-500",
    },
  ];

  if (contentLoading) {
    return (
      <>
        <HeaderBanner title={"Contact US"} />
        <ContactSkeleton />
      </>
    );
  }

  return (
    <div className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
      }`}>

      <HeaderBanner title={"Contact US"} />

      <section
        id="contact"
        className="py-[50px] transition-colors duration-300 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text-body)'
        }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${isDarkMode ? 'rgba(135,80,247,0.08)' : 'rgba(135,80,247,0.12)'} 0%, transparent 70%)`
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${isDarkMode ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.1)'} 0%, transparent 70%)`
            }}
          />

          {/* Grid pattern background */}
          <div
            className="absolute inset-0 bg-[length:40px_40px] opacity-30"
            style={{
              backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(135,80,247,0.03)' : 'rgba(135,80,247,0.04)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(135,80,247,0.03)' : 'rgba(135,80,247,0.04)'} 1px, transparent 1px)`
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                backgroundColor: isDarkMode ? 'rgba(135,80,247,0.2)' : 'rgba(135,80,247,0.1)',
                color: 'var(--primary)'
              }}
            >
              {content.subtitle || "Get In Touch"}
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-heading)' }}
            >
              {content.title || "Let's Work Together!"}
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: `linear-gradient(to right, var(--primary), var(--primary-2))`
              }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="rounded-3xl shadow-xl p-8 md:p-10 transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
                }}
              >
                <h3
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Send Me a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl text-sm flex items-center gap-2"
                        style={{
                          backgroundColor: isDarkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.05)',
                          border: `1px solid ${isDarkMode ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.1)'}`,
                          color: isDarkMode ? '#f87171' : '#dc2626'
                        }}
                      >
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid md:grid-cols-2 gap-5">
                    {["firstName", "lastName"].map((field, index) => (
                      <div key={field} className="space-y-2">
                        <label
                          className="block text-sm font-semibold"
                          style={{ color: 'var(--text-body)' }}
                        >
                          {field === "firstName" ? "First Name" : "Last Name"}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-400"
                            style={{
                              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                              color: 'var(--text-heading)'
                            }}
                            onFocus={(e) => {
                              setFocusedField(field);
                              e.currentTarget.style.borderColor = 'var(--primary)';
                              e.currentTarget.style.boxShadow = `0 0 0 4px ${isDarkMode ? 'rgba(135,80,247,0.2)' : 'rgba(135,80,247,0.1)'}`;
                            }}
                            onBlur={(e) => {
                              setFocusedField(null);
                              e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            placeholder={
                              field === "firstName"
                                ? "Enter FirstName"
                                : "Enter Last Name"
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {["email", "phone"].map((field) => (
                      <div key={field} className="space-y-2">
                        <label
                          className="block text-sm font-semibold"
                          style={{ color: 'var(--text-body)' }}
                        >
                          {field === "email" ? "Email Address" : "Phone Number"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "tel"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required={field === "email"}
                          className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-400"
                          style={{
                            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                            color: 'var(--text-heading)'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)';
                            e.currentTarget.style.boxShadow = `0 0 0 4px ${isDarkMode ? 'rgba(135,80,247,0.2)' : 'rgba(135,80,247,0.1)'}`;
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          placeholder={
                            field === "email"
                              ? "john@example.com"
                              : "+1 234 567 890"
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-semibold"
                      style={{ color: 'var(--text-body)' }}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-400 resize-none"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        color: 'var(--text-heading)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.boxShadow = `0 0 0 4px ${isDarkMode ? 'rgba(135,80,247,0.2)' : 'rgba(135,80,247,0.1)'}`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={
                      formStatus === "loading" || formStatus === "succeeded"
                    }
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    style={{
                      background: formStatus === "succeeded"
                        ? "linear-gradient(135deg, #22c55e, #16a34a)"
                        : "linear-gradient(135deg, var(--primary), var(--primary-2))"
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {formStatus === "idle" && (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    )}
                    {formStatus === "loading" && (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    )}
                    {formStatus === "succeeded" && (
                      <span className="flex items-center justify-center gap-2">
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Message Sent!
                      </span>
                    )}
                    {formStatus === "failed" && (
                      <span className="flex items-center justify-center gap-2">
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Failed - Try Again
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Get In Touch
                </h3>
                <p
                  className="leading-relaxed text-lg"
                  style={{ color: 'var(--text-body)' }}
                >
                  I&apos;m always excited to hear about new projects and
                  opportunities. Whether you have a question or just want to say
                  hi, I&apos;ll get back to you!
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group relative"
                  >
                    {item.link ? (
                      <a href={item.link} className="block">
                        <div
                          className="relative flex items-start gap-5 p-6 rounded-2xl transition-all duration-300"
                          style={{
                            backgroundColor: 'var(--bg-card)',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                            boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = isDarkMode ? '0 8px 30px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0,0,0,0.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)';
                          }}
                        >
                          <div
                            className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div
                              className="text-sm font-medium mb-1"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              {item.label}
                            </div>
                            <div
                              className="text-base font-semibold"
                              style={{ color: 'var(--text-heading)' }}
                            >
                              {item.value}
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div
                        className="relative flex items-start gap-5 p-6 rounded-2xl transition-all duration-300"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                          boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.05)'
                        }}
                      >
                        <div
                          className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div
                            className="text-sm font-medium mb-1"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {item.label}
                          </div>
                          <div
                            className="text-base font-semibold"
                            style={{ color: 'var(--text-heading)' }}
                          >
                            {item.value}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-4"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Follow Me
                </h4>
                <div className="flex gap-3">
                  {socialLinksArray.map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-body)',
                        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-body)';
                        e.currentTarget.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                      }}
                    >
                      <span className="sr-only">{social.name}</span>
                      {getIconComponent(social.icon)}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
