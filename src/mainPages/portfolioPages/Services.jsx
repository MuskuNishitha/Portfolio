'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeaderBanner from '@/global/HeaderBanner'
import { useTheme } from '@/components/ThemeProvider'
import { fetchServicesContent } from '@/lib/publicApi'
import { ServicesSkeleton } from '@/components/SkeletonLoaders'

export default function Services() {
  const [activeService, setActiveService] = useState(0)
  const [servicesData, setServicesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isDarkMode } = useTheme()

  const defaultServicesData = {
    title: 'My Quality Services',
    subtitle: 'What I Do',
    description: 'I transform your ideas into scalable web and mobile solutions that drive engagement and deliver results.',
    services: [
      {
        num: '01',
        name: 'Full-Stack MERN Development',
        desc: 'End-to-end web applications built with React.js, Next.js, Node.js, Express.js, and MongoDB. Implement secure authentication, REST APIs, and state management with Redux Toolkit for scalable, high-performance solutions.'
      },
      {
        num: '02',
        name: 'Cross-Platform Mobile Apps',
        desc: 'iOS and Android apps developed with React Native. Integrate real-time features using Firebase Cloud Messaging, Google Maps API, and push notifications for seamless user experiences across all devices.'
      },
      {
        num: '03',
        name: 'E-Commerce Platforms',
        desc: 'Complete multi-vendor and specialty e-commerce solutions with customer websites, admin panels, seller dashboards, and mobile apps. Optimized for SEO, performance, and reliability.'
      },
      {
        num: '04',
        name: 'Admin Dashboards & Analytics',
        desc: 'Interactive dashboards for resource management, inventory tracking, and business metrics. Built with dynamic charts, real-time data visualization, and Redux Toolkit for actionable insights.'
      }
    ]
  }

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
            services: Array.isArray(data?.services) && data.services.length > 0
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
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 14,
      },
    },
  }

  const serviceHighlights = [
    { label: 'Delivery Style', value: 'Clean UI + stable backend' },
    { label: 'Focus', value: 'MERN, React Native, performance' },
    { label: 'Project Strength', value: `${servicesData?.services?.length || 4} tailored service tracks` },
  ]

  if (loading) {
    return (
      <>
        <HeaderBanner title={'Services'} />
        <ServicesSkeleton />
      </>
    )
  }

  if (error && !servicesData) {
    return (
      <section id="services" className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
        <HeaderBanner title={'Services'} />
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

  if (!servicesData || !servicesData.services) {
    return (
      <section id="services" className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
        <HeaderBanner title={'Services'} />
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

  return (
    <section id="services" className={`py-[100px] transition-colors duration-300 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-50'}`}>
      <HeaderBanner title={'Services'} subtitle={'Design, development, and polished execution for modern products.'} />

      <div className="container-custom">
        <motion.div
          className="grid gap-4 md:grid-cols-3 mt-2 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {serviceHighlights.map((item) => (
            <div
              key={item.label}
              className={`rounded-[24px] border p-5 backdrop-blur-sm transition-all duration-300 ${
                isDarkMode
                  ? 'border-white/10 bg-white/5'
                  : 'border-slate-200 bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.06)]'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.24em]" style={{ color: 'var(--primary-3)' }}>
                {item.label}
              </p>
              <p className="mt-3 text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="section-label" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ color: 'var(--primary-3)' }}>
            {servicesData.subtitle}
          </motion.span>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} style={{ color: 'var(--text-heading)' }}>
            {servicesData.title}
          </motion.h2>
          <motion.div className="section-divider section-divider-center" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ backgroundColor: 'var(--primary)' }} />
          <motion.p className="section-desc mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ color: 'var(--text-muted)' }}>
            {servicesData.description}
          </motion.p>
        </motion.div>

        <motion.div className="grid gap-5 mt-[50px] lg:grid-cols-2" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {servicesData.services.map((service, index) => (
            <motion.div
              key={`${service.name}-${index}`}
              variants={itemVariants}
              className={`flex flex-col justify-between min-h-[260px] p-7 lg:p-8 border rounded-[28px] cursor-pointer transition-all duration-300 relative overflow-hidden ${
                activeService === index
                  ? 'border-primary'
                  : isDarkMode
                  ? 'border-border'
                  : 'border-gray-200'
              } hover:border-primary`}
              style={{
                background: isDarkMode
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
                  : 'linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,0.95))',
              }}
              onMouseEnter={() => setActiveService(index)}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br from-primary to-secondary ${activeService === index ? 'opacity-[0.07]' : 'opacity-0'}`}
                initial={false}
                animate={{ opacity: activeService === index ? 0.07 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex items-start justify-between gap-6">
                <div className="flex items-center gap-5 flex-1">
                  <motion.span
                    className="font-russo text-xs min-w-[48px] h-12 rounded-full flex items-center justify-center"
                    style={{
                      color: activeService === index ? 'white' : 'var(--primary)',
                      backgroundColor: activeService === index ? 'var(--primary)' : isDarkMode ? 'rgba(135,80,247,0.16)' : 'rgba(135,80,247,0.1)',
                    }}
                    animate={{ scale: activeService === index ? [1, 1.12, 1] : 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    {service.num || String(index + 1).padStart(2, '0')}
                  </motion.span>

                  <div>
                    <h3 className="text-xl font-bold m-0 transition-colors duration-300" style={{ color: isDarkMode ? 'white' : 'var(--text-heading)' }}>
                      {service.name || 'Service Name'}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed lg:hidden" style={{ color: 'var(--text-muted)' }}>
                      {service.desc || 'Service description goes here'}
                    </p>
                  </div>
                </div>

                <motion.div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300 ${
                    activeService === index
                      ? 'bg-primary text-white border-primary'
                      : isDarkMode
                      ? 'border-border-2 text-primary hover:bg-primary/10'
                      : 'border-gray-300 text-primary hover:bg-primary/5'
                  }`}
                  animate={{ rotate: activeService === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↗
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={service.desc}
                  className="relative z-10 text-sm max-w-[460px] leading-relaxed hidden lg:block mt-8"
                  style={{ color: 'var(--text-muted)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.desc || 'Service description goes here'}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}