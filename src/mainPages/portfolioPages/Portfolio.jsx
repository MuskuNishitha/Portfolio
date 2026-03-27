'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import HeaderBanner from '@/global/HeaderBanner'
import { useTheme } from '@/components/ThemeProvider'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const { isDarkMode } = useTheme()

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🎯' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒' },
    { id: 'mobile', name: 'Mobile Apps', icon: '📱' },
    { id: 'dashboard', name: 'Dashboards', icon: '📊' }
  ]

  const projects = [
    {
      id: 1,
      title: "EWShopping",
      category: "ecommerce",
      subcategory: "Multi-Vendor E-Commerce Platform",
      period: "Jun 2024 - Present",
      image: "/assets/projects/ewshopping.jpg",
      icon: "🛍️",
      description: "Full-scale multi-vendor e-commerce platform with customer website, admin panel, seller panel, and mobile app.",
      features: [
        "Next.js customer website with 20% improved SEO and performance",
        "Admin & Seller dashboards with React (Vite) and Tailwind CSS",
        "Cross-platform mobile app with React Native",
        "Firebase for real-time updates, reducing data sync delay by 50%",
        "Hostinger deployment with 99% uptime"
      ],
      tech: ["Next.js", "React.js (Vite)", "React Native", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Firebase", "Git"],
      liveLink: "#",
      githubLink: "https://github.com/MuskuNishitha/ewshopping",
      challenges: "Implementing real-time inventory sync across multiple vendors and platforms simultaneously."
    },
    {
      id: 2,
      title: "KiranaWorld",
      category: "ecommerce",
      subcategory: "Grocery E-Commerce Platform",
      period: "Apr 2025 - Present",
      image: "/assets/projects/kiranaworld.jpg",
      icon: "🥬",
      description: "Grocery e-commerce platform enabling online orders of fruits, vegetables, and household essentials.",
      features: [
        "Responsive customer website with React.js (Vite), improving UX by 30%",
        "Admin Panel for efficient inventory and order management",
        "Cross-platform mobile app with React Native",
        "Scalable backend with Node.js, Express.js, and MongoDB",
        "Smooth checkout experience across all platforms"
      ],
      tech: ["React.js (Vite)", "React Native", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Git"],
      liveLink: "#",
      githubLink: "https://github.com/MuskuNishitha/kiranaworld",
      challenges: "Managing real-time inventory updates and preventing overselling during peak hours."
    },
    {
      id: 3,
      title: "POT Dashboard",
      category: "dashboard",
      subcategory: "Construction Resource Management System",
      period: "Nov 2025 - Jan 2026",
      image: "/assets/projects/pot-dashboard.jpg",
      icon: "🏗️",
      description: "Mobile dashboard for visualizing construction project metrics including cost, manpower, and progress.",
      features: [
        "Dynamic charts and graphs for real-time decision-making",
        "Responsive UI for mobile and tablet, improving field usability by 40%",
        "State management with Redux Toolkit",
        "Real-time data visualization",
        "Project cost and resource tracking"
      ],
      tech: ["React Native", "Redux Toolkit", "Chart Libraries", "Node.js", "Express.js", "MongoDB"],
      liveLink: "#",
      githubLink: "https://github.com/MuskuNishitha/pot-dashboard",
      challenges: "Creating smooth, real-time chart updates with large datasets on mobile devices."
    },
    {
      id: 4,
      title: "Primera Dental Hub",
      category: "ecommerce",
      subcategory: "Dental E-Commerce Platform",
      period: "Jul 2025 - Present",
      image: "/assets/projects/primera.jpg",
      icon: "🦷",
      description: "Specialized dental e-commerce platform for products, instruments, and equipment.",
      features: [
        "Next.js customer website with improved performance and SEO",
        "Firebase Authentication for secure login and email verification",
        "Admin Panel with React (Vite) and Tailwind CSS",
        "Cross-platform mobile apps (Customer & Service) with React Native",
        "SMS and email notifications for orders and authentication",
        "Analytics for monitoring user activity and business performance"
      ],
      tech: ["Next.js", "React.js (Vite)", "React Native", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Git"],
      liveLink: "#",
      githubLink: "https://github.com/MuskuNishitha/primera-dental",
      challenges: "Implementing role-based access for customer and service provider apps with secure authentication."
    }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section 
      id="portfolio" 
      className={`py-[100px] relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
      }`}
    >
      <HeaderBanner title={"Portfolio"} />
      
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-[length:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px)`
        }}
      />
      <div 
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full animate-float"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(135,80,247,0.08)' : 'rgba(135,80,247,0.05)'} 0%, transparent 70%)`
        }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full animate-float [animation-delay:2s]"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(135,80,247,0.08)' : 'rgba(135,80,247,0.05)'} 0%, transparent 70%)`
        }}
      />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            My Portfolio
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: 'var(--text-heading)' }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="section-divider section-divider-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <motion.p 
            className="section-desc mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ color: 'var(--text-muted)' }}
          >
            Here are some of my recent projects showcasing my expertise in MERN stack and React Native development.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-[50px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : isDarkMode
                    ? 'bg-bg-card border border-border text-text-body hover:border-primary hover:text-primary-3'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary-3'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-bg-card to-bg-3 border border-border'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-xl'
                } hover:border-primary`}
                whileHover={{ y: -8 }}
              >
                {/* Project Image Placeholder with Icon */}
                <div className={`relative h-[240px] overflow-hidden ${
                  isDarkMode ? 'bg-gradient-to-br from-primary/10 to-secondary/10' : 'bg-gradient-to-br from-primary/5 to-secondary/5'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-8xl transition-opacity duration-300 ${
                      isDarkMode ? 'opacity-20 group-hover:opacity-30' : 'opacity-30 group-hover:opacity-40'
                    }`}>
                      {project.icon}
                    </div>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDarkMode ? 'from-bg-card via-transparent to-transparent' : 'from-white via-transparent to-transparent'
                  }`} />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <Link 
                      href={project.liveLink}
                      className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      🌐
                    </Link>
                    <Link 
                      href={project.githubLink}
                      target="_blank"
                      className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      ⌘
                    </Link>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs text-primary-3 bg-primary/10 px-3 py-1 rounded-full">
                        {project.subcategory}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{project.period}</span>
                  </div>
                  
                  <h3 
                    className="text-xl font-bold mb-2 group-hover:text-primary-3 transition-colors"
                    style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}
                  >
                    {project.title}
                  </h3>
                  
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                    {project.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-primary-3 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs flex items-start gap-1.5" style={{ color: 'var(--text-muted)' }}>
                          <span className="text-primary-3">▹</span>
                          {feature.length > 80 ? feature.substring(0, 80) + "..." : feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tech, idx) => (
                      <span 
                        key={idx}
                        className={`px-2 py-1 rounded-md text-[10px] ${
                          isDarkMode
                            ? 'bg-bg-2 border border-border text-text-muted'
                            : 'bg-gray-100 border border-gray-200 text-gray-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="px-2 py-1 text-[10px] text-primary-3">
                        +{project.tech.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={`mt-5 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'border border-border text-text-body hover:border-primary hover:text-primary-3'
                        : 'border border-gray-200 text-gray-600 hover:border-primary hover:text-primary-3'
                    }`}
                  >
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button */}
        <motion.div 
          className="text-center mt-[60px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="#" className="btn-primary">
            View All Projects →
          </Link>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto ${
                isDarkMode ? 'bg-bg-card border border-border' : 'bg-white border border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 p-5 flex justify-between items-center ${
                isDarkMode ? 'bg-bg-card border-b border-border' : 'bg-white border-b border-gray-200'
              }`}>
                <h3 className="text-xl font-bold" style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}>
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`w-8 h-8 rounded-full transition-colors ${
                    isDarkMode
                      ? 'bg-bg-2 text-text-muted hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <span className="text-xs text-primary-3 bg-primary/10 px-3 py-1 rounded-full">
                    {selectedProject.subcategory}
                  </span>
                  <span className="text-xs ml-3" style={{ color: 'var(--text-muted)' }}>{selectedProject.period}</span>
                </div>
                
                <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {selectedProject.description}
                </p>
                
                <h4 className="text-sm font-semibold mb-3" style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}>
                  📋 All Features:
                </h4>
                <ul className="space-y-2 mb-6">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-body)' }}>
                      <span className="text-primary-3 mt-1">▹</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-sm font-semibold mb-3" style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}>
                  ⚙️ Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        isDarkMode
                          ? 'bg-bg-2 border border-border text-text-body'
                          : 'bg-gray-100 border border-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-sm font-semibold mb-3" style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}>
                  💡 Challenges & Solutions:
                </h4>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-body)' }}>
                  {selectedProject.challenges}
                </p>
                
                <div className="flex gap-4 pt-4 border-t" style={{ borderColor: isDarkMode ? 'var(--border)' : '#e5e7eb' }}>
                  <Link href={selectedProject.liveLink} className="btn-primary flex-1 text-center">
                    Live Demo 🌐
                  </Link>
                  <Link href={selectedProject.githubLink} target="_blank" className="btn-secondary flex-1 text-center">
                    GitHub ⌘
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}