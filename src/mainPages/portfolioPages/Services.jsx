'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeaderBanner from '@/global/HeaderBanner'
import { useTheme } from '@/components/ThemeProvider'
import { fetchServicesContent } from '@/lib/publicApi' // Create this API function

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [servicesData, setServicesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDarkMode } = useTheme()

  // Default/fallback data in case API fails
  const defaultServicesData = {
    title: "My Quality Services",
    subtitle: "What I Do",
    description: "I transform your ideas into scalable web and mobile solutions that drive engagement and deliver results.",
    services: [
      {
        num: "01",
        name: "Full-Stack MERN Development",
        desc: "End-to-end web applications built with React.js, Next.js, Node.js, Express.js, and MongoDB. Implement secure authentication, REST APIs, and state management with Redux Toolkit for scalable, high-performance solutions."
      },
      {
        num: "02",
        name: "Cross-Platform Mobile Apps",
        desc: "iOS and Android apps developed with React Native. Integrate real-time features using Firebase Cloud Messaging, Google Maps API, and push notifications for seamless user experiences across all devices."
      },
      {
        num: "03",
        name: "E-Commerce Platforms",
        desc: "Complete multi-vendor and specialty e-commerce solutions—customer websites, admin panels, seller dashboards, and mobile apps. Optimized for SEO, performance, and 99% uptime."
      },
      {
        num: "04",
        name: "Admin Dashboards & Analytics",
        desc: "Interactive dashboards for resource management, inventory tracking, and business metrics. Built with dynamic charts, real-time data visualization, and Redux Toolkit for actionable insights."
      }
    ]
  }

  useEffect(() => {
    let cancelled = false

    const loadServices = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch from API, fallback to default data
        let data
        try {
          data = await fetchServicesContent()
        } catch (err) {
          console.warn('Failed to fetch services from API, using default data:', err)
          data = defaultServicesData
        }
        
        if (!cancelled) {
          // Validate and merge data with defaults
          setServicesData({
            title: data?.title || defaultServicesData.title,
            subtitle: data?.subtitle || defaultServicesData.subtitle,
            description: data?.description || defaultServicesData.description,
            services: Array.isArray(data?.services) && data.services.length > 0 
              ? data.services 
              : defaultServicesData.services
          })
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Error loading services:', err)
          setError(err.message || 'Failed to load services')
          // Use default data on error
          setServicesData(defaultServicesData)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadServices()

    return () => {
      cancelled = true
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 45, transition: { duration: 0.3 } }
  }

  // Loading state
  if (loading) {
    return (
      <section 
        id="services" 
        className={`py-[100px] transition-colors duration-300 ${
          isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
        }`}
      >
        <HeaderBanner title={"Services"} />
        <div className="container-custom">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4" style={{ color: 'var(--text-muted)' }}>Loading services...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state (still shows content with default data)
  if (error && !servicesData) {
    return (
      <section 
        id="services" 
        className={`py-[100px] transition-colors duration-300 ${
          isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
        }`}
      >
        <HeaderBanner title={"Services"} />
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              Unable to Load Services
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
    )
  }

  // Safety check
  if (!servicesData || !servicesData.services) {
    return null
  }

  return (
    <section 
      id="services" 
      className={`py-[100px] transition-colors duration-300 ${
        isDarkMode ? 'bg-bg-2' : 'bg-gray-50'
      }`}
    >
      <HeaderBanner title={"Services"} />
      
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
            {servicesData.subtitle}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: 'var(--text-heading)' }}
          >
            {servicesData.title}
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
            {servicesData.description}
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-col gap-0.5 mt-[50px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-7 lg:p-8 border rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                activeService === index 
                  ? 'border-primary' 
                  : isDarkMode 
                    ? 'border-border' 
                    : 'border-gray-200'
              } hover:border-primary`}
              style={{
                backgroundColor: isDarkMode ? 'var(--bg-card)' : 'white',
              }}
              onMouseEnter={() => setActiveService(index)}
              whileHover={{ 
                x: 8,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r from-primary to-secondary ${
                  activeService === index ? 'opacity-[0.06]' : 'opacity-0'
                }`}
                initial={false}
                animate={{ opacity: activeService === index ? 0.06 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex items-center gap-6 flex-1">
                <motion.span 
                  className="font-russo text-xs min-w-[28px]"
                  style={{ 
                    color: 'var(--primary)',
                    opacity: 0.7
                  }}
                  animate={{ 
                    scale: activeService === index ? [1, 1.2, 1] : 1 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {service.num || String(index + 1).padStart(2, '0')}
                </motion.span>
                <h3 
                  className="text-xl font-bold m-0 transition-colors duration-300"
                  style={{ 
                    color: isDarkMode ? 'white' : 'var(--text-heading)'
                  }}
                >
                  {service.name || 'Service Name'}
                </h3>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.p 
                  key={service.desc}
                  className="text-sm max-w-[400px] leading-relaxed hidden lg:block"
                  style={{ color: 'var(--text-muted)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.desc || 'Service description goes here'}
                </motion.p>
              </AnimatePresence>
              
              <motion.div 
                className={`w-11 h-11 rounded-full border flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300 ${
                  activeService === index 
                    ? 'bg-primary text-white border-primary' 
                    : isDarkMode
                      ? 'border-border-2 text-primary hover:bg-primary/10'
                      : 'border-gray-300 text-primary hover:bg-primary/5'
                }`}
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                animate={{ 
                  rotate: activeService === index ? 45 : 0,
                  backgroundColor: activeService === index ? 'var(--primary)' : undefined,
                  color: activeService === index ? 'white' : undefined
                }}
                transition={{ duration: 0.3 }}
              >
                ↗
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}