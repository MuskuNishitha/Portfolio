'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi'
import HeaderBanner from '@/global/HeaderBanner'
import { fetchPortfolioContent } from '@/lib/publicApi'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { isDarkMode } = useTheme()

  useEffect(() => {
    setMounted(true)
    let cancelled = false
    fetchPortfolioContent().then((data) => {
      if (!cancelled) setContent(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const projects = content?.projects || []
  const categories = (() => {
    const baseCategories = Array.isArray(content?.categories) && content.categories.length
      ? content.categories
      : []

    const uniqueFromProjects = Array.from(
      new Map(
        projects
          .map((p) => p?.category)
          .filter(Boolean)
          .map((id) => [id, { id, name: id }]),
      ).values(),
    )

    const raw = baseCategories.length ? baseCategories : uniqueFromProjects

    const withCounts = raw.map((cat) => ({
      ...cat,
      count: projects.filter((p) => p.category === cat.id).length,
    }))

    return [{ id: 'all', name: 'All Work', count: projects.length }, ...withCounts]
  })()

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  if (!mounted || !content) return null

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
  const inactiveFilterText = isDarkMode ? 'text-gray-400' : 'text-gray-500'

  return (


    <div   className={` min-h-screen py-[100px] transition-colors duration-300 ${
        isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
      }`}>
      <HeaderBanner title={"Portfolio"} />
      <section
        ref={sectionRef}
        className={`${bgColor} py-12 sm:py-16 lg:py-24 relative overflow-hidden transition-colors duration-300`}
        style={{ minHeight: '100vh' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="mb-10 sm:mb-12 text-center sm:text-left"
          // initial={{ opacity: 0, y: 26 }}
          // animate={isInView ? { opacity: 1, y: 0 } : {}}
          // transition={{ duration: 0.55 }}
          >
            <span className="section-label">My Work</span>
            <h2 className="section-title">Portfolio</h2>
            <p className="section-desc mx-auto sm:mx-0">
              A curated set of projects showcasing modern UI, smooth animations, and scalable full-stack builds.
            </p>
            <div className="section-divider mx-auto sm:mx-0" />
          </motion.div>

          {/* Filter Bar */}
          <motion.div

            className={`flex flex-nowrap overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible justify-start gap-2 sm:gap-3 mb-10 sm:mb-12 pb-4 border-b ${borderColor}`}
          >
            {categories.map((cat) => {
              const active = filter === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`relative px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${active
                    ? `${activeFilterBg} text-primary`
                    : `${inactiveFilterText} hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20`
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: idx * 0.07 }}
                  className={`${cardBg} group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 ${borderColor} border`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image Container */}
                  <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-4">
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
                  <div className="p-5 sm:p-6">
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

                    {/* Mobile Actions */}
                    <div className="sm:hidden flex gap-3 mb-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 px-3 py-2 bg-primary text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${isDarkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        <FiGithub className="w-4 h-4" />
                        Code
                      </a>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs px-2 py-1 rounded-md ${tagBg} ${tagText}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className={`text-xs px-2 py-1 rounded-md bg-primary/20 text-primary`}>
                          +{project.tech.length - 4}
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
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${textPrimary}`}>
                        {selectedProject.title}
                      </h3>
                      <p className="text-primary font-medium">
                        {selectedProject.subcategory} • {selectedProject.period}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto ${isDarkMode
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
    </div >

  )
}
