'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeaderBanner from '@/global/HeaderBanner'
import { useTheme } from '@/components/ThemeProvider'
import { fetchServicesContent } from '@/lib/publicApi'
import { ServicesSkeleton } from '@/components/SkeletonLoaders'

export default function Services() {
  const [activeService, setActiveService] = useState(null)
  const [servicesData, setServicesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDarkMode } = useTheme()

  // Fixed: Wrapped with useMemo to prevent unnecessary re-renders
  const defaultServicesData = useMemo(() => ({
    title: 'My Quality Services',
    subtitle: 'What I Do',
    description:
      'I transform your ideas into scalable web and mobile solutions that drive engagement and deliver results.',
    services: [
      {
        num: '01',
        name: 'Full-Stack MERN Development',
        desc: 'End-to-end web applications built with React.js, Next.js, Node.js, Express.js, and MongoDB. Implement secure authentication, REST APIs, and state management with Redux Toolkit for scalable, high-performance solutions.',
        tags: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
      },
      {
        num: '02',
        name: 'Cross-Platform Mobile Apps',
        desc: 'iOS and Android apps developed with React Native. Integrate real-time features using Firebase Cloud Messaging, Google Maps API, and push notifications for seamless user experiences across all devices.',
        tags: ['React Native', 'Firebase', 'iOS', 'Android'],
      },
      {
        num: '03',
        name: 'E-Commerce Platforms',
        desc: 'Complete multi-vendor and specialty e-commerce solutions with customer websites, admin panels, seller dashboards, and mobile apps. Optimized for SEO, performance, and reliability.',
        tags: ['Multi-vendor', 'SEO', 'Admin Panel', 'Mobile'],
      },
      {
        num: '04',
        name: 'Admin Dashboards & Analytics',
        desc: 'Interactive dashboards for resource management, inventory tracking, and business metrics. Built with dynamic charts, real-time data visualization, and Redux Toolkit for actionable insights.',
        tags: ['Charts', 'Real-time', 'Redux', 'Analytics'],
      },
    ],
  }), [])

  // Fixed: Added defaultServicesData to dependency array
  useEffect(() => {
    let cancelled = false
    const loadServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchServicesContent().catch(() => defaultServicesData)
        if (!cancelled) {
          setServicesData({
            title: data?.title || defaultServicesData.title,
            subtitle: data?.subtitle || defaultServicesData.subtitle,
            description: data?.description || defaultServicesData.description,
            services:
              Array.isArray(data?.services) && data.services.length > 0
                ? data.services
                : defaultServicesData.services,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load services')
          setServicesData(defaultServicesData)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadServices()
    return () => { cancelled = true }
  }, [defaultServicesData]) // Fixed: Added dependency

  if (loading) {
    return (
      <>
        <HeaderBanner title="Services" />
        <ServicesSkeleton />
      </>
    )
  }

  if (error && !servicesData) {
    return (
      <section id="services" className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
        <HeaderBanner title="Services" />
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">!</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              Unable to Load Services
            </h3>
            <p className="mb-4" style={{ color: 'var(--text-muted)' }}>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (!servicesData || !servicesData.services) return null

  // Service icons mapping
  const serviceIcons = {
    0: '💻',
    1: '📱',
    2: '🛒',
    3: '📊'
  }

  // Statistics data
  const statistics = [
    { value: '5+', label: 'Years Experience', icon: '⭐', color: '#FFD700' },
    { value: '50+', label: 'Projects Completed', icon: '🚀', color: '#FF6B6B' },
    { value: '24/7', label: 'Support Available', icon: '💬', color: '#4ECDC4' },
    { value: '100%', label: 'Client Satisfaction', icon: '😊', color: '#45B7D1' }
  ]

  return (
    <section
      id="services"
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.05 }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--primary-2) 0%, transparent 70%)', opacity: 0.05 }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      </div>

      <HeaderBanner title="Services" />

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span
            className="inline-block text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-2 rounded-full"
            style={{ 
              color: 'var(--primary)',
              backgroundColor: isDarkMode ? 'rgba(135,80,247,0.15)' : 'rgba(135,80,247,0.1)',
              border: `1px solid ${isDarkMode ? 'rgba(135,80,247,0.3)' : 'rgba(135,80,247,0.2)'}`
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ✨ {servicesData.subtitle} ✨
          </motion.span>
          
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--text-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {servicesData.title}
          </motion.h2>
          
          <motion.p
            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {servicesData.description}
          </motion.p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10' 
                  : 'bg-white shadow-xl border border-gray-100 hover:shadow-2xl'
              }`}
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <motion.div
                className="text-3xl sm:text-4xl mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {stat.icon}
              </motion.div>
              <motion.p
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1"
                style={{ color: 'var(--primary)' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1), type: "spring", stiffness: 300 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-800 hover:to-gray-900 border border-gray-700' 
                  : 'bg-white hover:shadow-2xl border border-gray-200 hover:border-primary/30'
              }`}
              onClick={() => setActiveService(index)}
            >
              {/* Background Number */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold opacity-5"
                  style={{ color: 'var(--primary)' }}
                >
                  {service.num}
                </span>
              </div>

              {/* Icon Circle */}
              <motion.div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)`,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-2xl sm:text-3xl">
                  {serviceIcons[index] || '🚀'}
                </span>
              </motion.div>

              {/* Title */}
              <h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 transition-colors duration-300 pr-12"
                style={{ color: 'var(--text-heading)' }}
              >
                {service.name}
              </h3>

              {/* Description */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-4 line-clamp-3"
                style={{ color: 'var(--text-muted)' }}
              >
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service?.tags?.slice(0, 3).map((tag) => (
                  <motion.span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      color: 'var(--primary)',
                      backgroundColor: isDarkMode ? 'rgba(135,80,247,0.15)' : 'rgba(135,80,247,0.08)',
                      border: `1px solid ${isDarkMode ? 'rgba(135,80,247,0.3)' : 'rgba(135,80,247,0.2)'}`
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {service?.tags?.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ color: 'var(--text-muted)' }}>
                    +{service?.tags?.length - 3}
                  </span>
                )}
              </div>

              {/* Learn More Link */}
              <motion.div
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                style={{ color: 'var(--primary)' }}
                whileHover={{ x: 5 }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Service Modal */}
        <AnimatePresence>
          {activeService !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
              onClick={() => setActiveService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-900' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Content */}
                <div className="relative p-6 sm:p-8 lg:p-12">
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveService(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
                    style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Modal Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)` }}
                    >
                      <span className="text-3xl">
                        {serviceIcons[activeService] || '🚀'}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                        Service {servicesData.services[activeService]?.num}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold mt-1" style={{ color: 'var(--text-heading)' }}>
                        {servicesData.services[activeService]?.name}
                      </h3>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="space-y-6">
                    <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {servicesData.services[activeService]?.desc}
                    </p>

                    {/* Tags */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
                        Technologies & Tools:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {servicesData.services[activeService]?.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 rounded-full text-sm font-medium"
                            style={{
                              color: 'var(--primary)',
                              backgroundColor: isDarkMode ? 'rgba(135,80,247,0.15)' : 'rgba(135,80,247,0.08)',
                              border: `1px solid ${isDarkMode ? 'rgba(135,80,247,0.3)' : 'rgba(135,80,247,0.2)'}`
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
                        style={{
                          background: 'var(--primary)',
                          color: 'white'
                        }}
                        onClick={() => {
                          setActiveService(null)
                          // Add contact navigation
                        }}
                      >
                        Get This Service
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2"
                        style={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Schedule Consultation
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Banner - FIXED: Escaped apostrophes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-primary/30 via-primary/20 to-transparent' 
              : 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-2/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" style={{ color: 'var(--text-heading)' }}>
                Ready to Start Your Project?
              </h3>
              {/* FIXED: Escaped apostrophe in "Let's" */}
              <p className="text-base sm:text-lg" style={{ color: 'var(--text-muted)' }}>
                Let&apos;s discuss how I can help you achieve your goals with cutting-edge solutions
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                style={{
                  background: 'var(--primary)',
                  color: 'white'
                }}
              >
                Get in Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 border-2 whitespace-nowrap"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  backgroundColor: 'transparent'
                }}
              >
                View Portfolio
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Floating Social Proof */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-8 right-8 z-40 hidden lg:block"
        >
          <motion.div
            className={`p-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
              isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-2 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-heading)' }}>
                  Trusted by 50+ Clients
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  ⭐ 5.0 Rating
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}