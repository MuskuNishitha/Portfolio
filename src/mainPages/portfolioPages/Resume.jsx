"use client";

import HeaderBanner from "@/global/HeaderBanner";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { fetchResumeContent } from "@/lib/publicApi";

export default function Resume() {
  const { isDarkMode } = useTheme();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchResumeContent();
        
        if (!cancelled) {
          // Check if data is valid
          if (data && typeof data === 'object') {
            setContent(data);
          } else {
            // Set default empty structure if data is invalid
            setContent({
              experiences: [],
              education: [],
              certifications: []
            });
            console.warn('Invalid resume content received:', data);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to fetch resume content:', err);
          setError(err.message || 'Failed to load resume content');
          // Set default empty structure to prevent crashes
          setContent({
            experiences: [],
            education: [],
            certifications: []
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadContent();

    return () => {
      cancelled = true;
    };
  }, []);

  // Show loading state
  if (loading) {
    return (
      // <div className="min-h-screen">
      <div 
      
      >
        <HeaderBanner title={"Resume"} />
        <section className={`py-[50px] ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
          <div className="container-custom">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p className="mt-4" style={{ color: 'var(--text-muted)' }}>Loading resume content...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen">
        <HeaderBanner title={"Resume"} />
        <section className={`py-[50px] ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
          <div className="container-custom">
            <div className="text-center py-12">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                Unable to Load Resume
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Safety check: if content is still null, don't render
  if (!content) {
    return null;
  }

  // Safe destructuring with fallbacks
  const experiences = Array.isArray(content.experiences) ? content.experiences : [];
  const education = Array.isArray(content.education) ? content.education : [];
  const certifications = Array.isArray(content.certifications) ? content.certifications : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 },
    },
  };

  const timelineDotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2,
      },
    },
    pulse: {
      scale: [1, 1.5, 1],
      boxShadow: [
        "0 0 12px var(--primary)",
        "0 0 20px var(--primary)",
        "0 0 12px var(--primary)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const timelineLineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={` min-h-screen py-[100px] transition-colors duration-300 ${
        isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
      }`}
    >
      <HeaderBanner title={"Resume"} />
      <section 
        id="resume" 
        className={`py-[50px] overflow-hidden transition-colors duration-300 ${
          isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
        }`}
      >
        <div className="container-custom">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ color: 'var(--primary-3)' }}
            >
              My Journey
            </motion.span>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ color: 'var(--text-heading)' }}
            >
              Experience & Education
            </motion.h2>
            <motion.div
              className="section-divider section-divider-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ backgroundColor: 'var(--primary)' }}
            />
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-[60px] mt-[50px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <motion.div
                className="flex items-center gap-3 text-2xl font-extrabold mb-8"
                whileHover="hover"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(135, 80, 247, 0.15)' : 'rgba(135, 80, 247, 0.1)',
                    color: 'var(--primary-3)'
                  }}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  💼
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                >
                  Work Experience
                </motion.span>
              </motion.div>

              {experiences.length > 0 ? (
                <motion.div
                  className="relative pl-7"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <motion.div
                    className="absolute top-2 left-0 w-0.5 bottom-0 bg-gradient-to-b from-primary to-transparent origin-top"
                    variants={timelineLineVariants}
                  />

                  {experiences.map((exp, i) => (
                    <motion.div
                      key={i}
                      className="relative pb-9 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ x: 6 }}
                    >
                      <motion.div
                        className="absolute left-[-35px] top-2 w-3.5 h-3.5 rounded-full bg-primary"
                        style={{ 
                          borderWidth: '4px',
                          borderStyle: 'solid',
                          borderColor: isDarkMode ? 'var(--bg-2)' : '#f3f4f6'
                        }}
                        variants={timelineDotVariants}
                        animate="pulse"
                      />

                      <motion.div
                        className="text-xs font-semibold tracking-wide mb-1.5 uppercase"
                        style={{ color: 'var(--primary-3)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.1 }}
                      >
                        {exp.time || 'N/A'}
                      </motion.div>

                      <motion.div
                        className="text-lg font-bold mb-1"
                        style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2 }}
                      >
                        {exp.title || 'Untitled'}
                      </motion.div>

                      <motion.div
                        className="text-sm mb-2"
                        style={{ color: 'var(--text-muted)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                      >
                        {exp.place || 'Unknown'}
                      </motion.div>

                      {/* Achievements List */}
                      {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                        <motion.ul
                          className="space-y-1.5 mt-3"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + 0.4 }}
                        >
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                              <span className="text-primary-3 mt-0.5">▹</span>
                              {achievement}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  No work experience to display
                </div>
              )}
            </motion.div>

            {/* Education & Certifications */}
            <motion.div variants={itemVariants}>
              {/* Education Section */}
              <motion.div
                className="flex items-center gap-3 text-2xl font-extrabold mb-8"
                whileHover="hover"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(135, 80, 247, 0.15)' : 'rgba(135, 80, 247, 0.1)',
                    color: 'var(--primary-3)'
                  }}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  🎓
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                >
                  Education
                </motion.span>
              </motion.div>

              {education.length > 0 ? (
                <motion.div
                  className="relative pl-7 mb-12"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                >
                  <motion.div
                    className="absolute top-2 left-0 w-0.5 bottom-0 bg-gradient-to-b from-primary to-transparent origin-top"
                    variants={timelineLineVariants}
                  />

                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      className="relative pb-9 last:pb-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      whileHover={{ x: 6 }}
                    >
                      <motion.div
                        className="absolute left-[-35px] top-2 w-3.5 h-3.5 rounded-full bg-primary"
                        style={{ 
                          borderWidth: '4px',
                          borderStyle: 'solid',
                          borderColor: isDarkMode ? 'var(--bg-2)' : '#f3f4f6'
                        }}
                        variants={timelineDotVariants}
                        animate="pulse"
                      />

                      <motion.div
                        className="text-xs font-semibold tracking-wide mb-1.5 uppercase"
                        style={{ color: 'var(--primary-3)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.1 }}
                      >
                        {edu.time || 'N/A'}
                      </motion.div>

                      <motion.div
                        className="text-lg font-bold mb-1"
                        style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.2 }}
                      >
                        {edu.title || 'Untitled'}
                      </motion.div>

                      <motion.div
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3 }}
                      >
                        {edu.place || 'Unknown'}
                      </motion.div>

                      {edu.cgpa && (
                        <motion.div
                          className="text-xs mt-1"
                          style={{ color: 'var(--primary-3)' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + 0.35 }}
                        >
                          {edu.cgpa}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-8 mb-12" style={{ color: 'var(--text-muted)' }}>
                  No education to display
                </div>
              )}

              {/* Certifications Section */}
              <motion.div
                className="flex items-center gap-3 text-2xl font-extrabold mb-8"
                whileHover="hover"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(135, 80, 247, 0.15)' : 'rgba(135, 80, 247, 0.1)',
                    color: 'var(--primary-3)'
                  }}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  🏅
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                >
                  Awards & Certifications
                </motion.span>
              </motion.div>

              {certifications.length > 0 ? (
                <div className="grid gap-4">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      className={`rounded-xl p-4 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-bg-card border border-border hover:border-primary'
                          : 'bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-primary'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{cert.icon || '🏆'}</div>
                        <div className="flex-1">
                          <h4 
                            className="font-semibold mb-1"
                            style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                          >
                            {cert.title || 'Untitled Certification'}
                          </h4>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{cert.issuer || 'Unknown'}</p>
                          {cert.year && (
                            <span 
                              className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                              style={{ 
                                backgroundColor: isDarkMode ? 'rgba(135, 80, 247, 0.1)' : 'rgba(135, 80, 247, 0.08)',
                                color: 'var(--primary-3)'
                              }}
                            >
                              {cert.year}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  No certifications to display
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div
            className="text-center mt-[60px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="/Musku_Nishitha_2yrs Mern_Resume.pdf" download className="btn-primary inline-flex items-center gap-2">
              Download Full Resume ↓
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}