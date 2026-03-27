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

import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { socialLinksArray, socialMediaLinks } from "@/global/SocialMediaLinks";

export default function Contact() {
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
      value: "Warne Park Street Pine, FL 33157",
      color: "from-amber-500 to-orange-500",
    },
  ];

  // if (contentLoading) {
  //   return (
  //     <section
  //       id="contact"
  //       className="py-[100px] bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  //     >
  //       <div className="container-custom text-center">
  //         <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
  //           <svg
  //             className="animate-spin h-5 w-5 text-primary"
  //             viewBox="0 0 24 24"
  //           >
  //             <circle
  //               className="opacity-25"
  //               cx="12"
  //               cy="12"
  //               r="10"
  //               stroke="currentColor"
  //               strokeWidth="4"
  //               fill="none"
  //             />
  //             <path
  //               className="opacity-75"
  //               fill="currentColor"
  //               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //             />
  //           </svg>
  //           <span className="text-gray-600 dark:text-gray-300">
  //             Loading contact form...
  //           </span>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <>
      <HeaderBanner title={"Contact US"} />

      <section
        id="contact"
        className="py-[50px] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary text-sm font-semibold mb-4">
              {content.subtitle || "Get In Touch"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {content.title || "Let's Work Together!"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Me a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
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
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {field === "firstName" ? "First Name" : "Last Name"}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/30 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            placeholder={
                              field === "firstName"
                                ? "Enter FirstName"
                                : "Enter Last Name"
                            }
                          />
                          {focusedField === field && (
                            <motion.div
                              layoutId="field-focus"
                              className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {["email", "phone"].map((field) => (
                      <div key={field} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {field === "email" ? "Email Address" : "Phone Number"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "tel"}
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          required={field === "email"}
                          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/30 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 dark:focus:ring-primary/30 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={
                      formStatus === "loading" || formStatus === "succeeded"
                    }
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      formStatus === "succeeded"
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : "bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30"
                    }`}
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
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Get In Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  I'm always excited to hear about new projects and
                  opportunities. Whether you have a question or just want to say
                  hi, I'll get back to you!
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
                        <div className="relative flex items-start gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                          <div
                            className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                              {item.label}
                            </div>
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="relative flex items-start gap-5 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300">
                        <div
                          className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            {item.label}
                          </div>
                          <div className="text-base font-semibold text-gray-900 dark:text-white">
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
                <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
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
                      className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary shadow-md hover:shadow-lg transition-all duration-300"
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
    </>
  );
}