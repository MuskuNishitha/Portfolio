'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { isDarkMode } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  const categories = [
    { id: 'all', name: 'All Work', count: 4 },
    { id: 'ecommerce', name: 'Web Development', count: 3 },
    { id: 'mobile', name: 'Applications', count: 1 },
    { id: 'dashboard', name: 'Dashboards', count: 1 },
  ]

  const projects = [
    {
      id: 1,
      title: 'EWShopping',
      category: 'ecommerce',
      subcategory: 'Web Development',
      period: 'Jun 2024 – Present',
      image: '/assets/projects/Ewshooping.png',
      description: 'Full-scale multi-vendor e-commerce platform with customer website, admin panel, seller panel, and mobile app.',
      features: [
        'Next.js customer website with 20% improved SEO and performance',
        'Admin & Seller dashboards with React (Vite) and Tailwind CSS',
        'Cross-platform mobile app with React Native',
        'Firebase for real-time updates, reducing data sync delay by 50%',
        'Hostinger deployment with 99% uptime',
      ],
      tech: ['Next.js', 'React.js', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Firebase'],
      liveLink: 'https://ewshopping-demo.vercel.app',
      githubLink: 'https://github.com/MuskuNishitha/ewshopping',
      challenges: 'Implementing real-time inventory sync across multiple vendors and platforms simultaneously.',
      solution: 'Implemented WebSocket connections and optimised DB queries to ensure real-time synchronisation with 99.9% accuracy.',
    },
    {
      id: 2,
      title: 'KiranaWorld',
      category: 'ecommerce',
      subcategory: 'Web Development',
      period: 'Apr 2025 – Present',
      image: '/assets/projects/KiranaWorld.png',
      description: 'Grocery e-commerce platform enabling online orders of fruits, vegetables, and household essentials.',
      features: [
        'Responsive customer website with React.js (Vite), improving UX by 30%',
        'Admin Panel for efficient inventory and order management',
        'Cross-platform mobile app with React Native',
        'Scalable backend with Node.js, Express.js, and MongoDB',
        'Smooth checkout experience across all platforms',
      ],
      tech: ['React.js', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Redux Toolkit'],
      liveLink: 'https://kiranaworld-demo.vercel.app',
      githubLink: 'https://github.com/MuskuNishitha/kiranaworld',
      challenges: 'Managing real-time inventory updates and preventing overselling during peak hours.',
      solution: 'Implemented optimistic updates with rollback mechanisms and used Redis caching for inventory management.',
    },
    {
      id: 3,
      title: 'POT Dashboard',
      category: 'dashboard',
      subcategory: 'Dashboard',
      period: 'Nov 2025 – Jan 2026',
      image: '/assets/projects/POT.png',
      description: 'Mobile dashboard for visualising construction project metrics including cost, manpower, and progress.',
      features: [
        'Dynamic charts and graphs for real-time decision-making',
        'Responsive UI for mobile and tablet, improving field usability by 40%',
        'State management with Redux Toolkit',
        'Real-time data visualisation with Chart.js',
        'Project cost and resource tracking with export capabilities',
      ],
      tech: ['React Native', 'Redux Toolkit', 'Chart.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
      liveLink: 'https://pot-dashboard-demo.vercel.app',
      githubLink: 'https://github.com/MuskuNishitha/pot-dashboard',
      challenges: 'Creating smooth, real-time chart updates with large datasets on mobile devices.',
      solution: 'Implemented server-side data aggregation and used memoisation for efficient re-renders.',
    },
    {
      id: 4,
      title: 'Primera Dental Hub',
      category: 'ecommerce',
      subcategory: 'Web Development',
      period: 'Jul 2025 – Present',
      image: '/assets/projects/Primeradental.png',
      description: 'Specialised dental e-commerce platform for products, instruments, and equipment.',
      features: [
        'Next.js customer website with improved performance and SEO',
        'Firebase Authentication for secure login and email verification',
        'Admin Panel with React (Vite) and Tailwind CSS',
        'Cross-platform mobile apps (Customer & Service) with React Native',
        'SMS and email notifications for orders and authentication',
      ],
      tech: ['Next.js', 'React.js', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS'],
      liveLink: 'https://primera-dental-demo.vercel.app',
      githubLink: 'https://github.com/MuskuNishitha/primera-dental',
      challenges: 'Implementing role-based access for customer and service provider apps with secure authentication.',
      solution: 'Used JWT with refresh tokens and implemented RBAC (Role-Based Access Control) system.',
    },
  ]

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  if (!mounted) return null

  // Theme-based colors matching your header
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const textMuted = isDarkMode ? 'text-gray-400' : 'text-gray-500'
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200'
  const tagBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
  const tagText = isDarkMode ? 'text-gray-300' : 'text-gray-600'
  const activeFilterBg = isDarkMode ? 'bg-primary/20' : 'bg-primary/10'
  const activeFilterText = 'text-primary'
  const inactiveFilterText = isDarkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <section
      ref={sectionRef}
      className={`${bgColor} py-20 lg:py-28 relative overflow-hidden transition-colors duration-300`}
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="mb-12 text-center sm:text-left"
        // initial={{ opacity: 0, y: 26 }}
        // animate={isInView ? { opacity: 1, y: 0 } : {}}
        // transition={{ duration: 0.55 }}
        >
          <p className={`text-primary font-semibold text-sm uppercase ${isDarkMode ? 'text-[#fff]' : 'text-[#000]'} tracking-wider mb-3`}>            My Work
          </p>
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${isDarkMode ? 'text-[#fff]' : 'text-[#000]'} mb-4`}>            Portfolio
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto sm:mx-0" />
        </motion.div>

        {/* Filter Bar */}
        <motion.div

          className={`flex flex-wrap justify-center sm:justify-start gap-2 mb-12 pb-4 border-b ${borderColor}`}
        >
          {categories.map((cat) => {
            const active = filter === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${active
                  ? `${activeFilterBg} ${activeFilterText}`
                  : `${inactiveFilterText} hover:${activeFilterText} hover:${activeFilterBg}`
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {cat.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${active
                    ? 'bg-primary/30 text-primary'
                    : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`}>
                    {cat.count}
                  </span>
                </span>
                {active && (
                  <motion.span
                    layoutId="activeFilter"
                    className={`absolute inset-0 rounded-lg ${activeFilterBg}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 38 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: idx * 0.07 }}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${cardBg} rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${hoveredCard === project.id
                  ? 'shadow-2xl transform -translate-y-2'
                  : 'shadow-lg'
                  } ${borderColor} border`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-4 ${hoveredCard === project.id ? 'opacity-100' : ''
                    }`}>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <FiExternalLink className="w-5 h-5" />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <FiGithub className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {project.subcategory}
                    </span>
                    <span className={`text-xs ${textMuted}`}>
                      {project.period}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>
                    {project.title}
                  </h3>

                  <p className={`text-sm ${textSecondary} line-clamp-2 mb-4`}>
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-2 py-1 rounded-md ${tagBg} ${tagText}`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className={`text-xs px-2 py-1 rounded-md bg-primary/20 text-primary`}>
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-primary hover:text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                      }`}
                  >
                    View Details
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">🔍</p>
              <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                No projects found
              </h3>
              <p className={textMuted}>Try another filter category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`${cardBg} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col ${borderColor} border`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-primary/20 to-primary/5">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover object-top"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${textPrimary}`}>
                      {selectedProject.title}
                    </h3>
                    <p className="text-primary font-medium">
                      {selectedProject.subcategory} • {selectedProject.period}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <FiGithub className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>

                <p className={`${textSecondary} mb-6 leading-relaxed`}>
                  {selectedProject.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${textPrimary}`}>Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`flex items-start gap-2 text-sm ${textSecondary}`}
                      >
                        <span className="text-primary mt-1">▹</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className={`font-semibold mb-3 ${textPrimary}`}>Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`text-sm px-3 py-1 rounded-lg ${tagBg} ${tagText}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                  <h4 className={`font-semibold mb-2 ${textPrimary}`}>Challenge</h4>
                  <p className={`text-sm mb-4 ${textSecondary}`}>
                    {selectedProject.challenges}
                  </p>
                  <h4 className={`font-semibold mb-2 ${textPrimary}`}>Solution</h4>
                  <p className={`text-sm ${textSecondary}`}>
                    {selectedProject.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}