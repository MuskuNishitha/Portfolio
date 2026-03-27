'use client'

import { motion } from 'framer-motion'

export default function Skills() {
  const skills = [
    { icon: '🌐', name: 'HTML5', pct: 92 },
    { icon: '🎨', name: 'CSS3', pct: 80 },
    { icon: '⚡', name: 'JavaScript', pct: 85 },
    { icon: '⚛️', name: 'React.js', pct: 89 },
    { icon: '🔺', name: 'Next.js', pct: 82 },
    { icon: '🌊', name: 'Webflow', pct: 99 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (pct) => ({
      width: `${pct}%`,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <section id="skills" className="py-[100px] bg-bg">
      <div className="container-custom">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">My Skills</h2>
          <motion.div 
            className="section-divider section-divider-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[50px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 16px 48px rgba(135,80,247,0.2)",
                transition: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="bg-bg-card border border-border rounded-2xl p-8 text-center transition-all relative overflow-hidden group"
            >
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div 
                className="text-4xl mb-4 drop-shadow-[0_4px_12px_rgba(135,80,247,0.3)]"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {skill.icon}
              </motion.div>
              
              <motion.div 
                className="font-russo text-3xl text-primary-3 mb-1.5 leading-none"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 + i * 0.1 
                }}
              >
                {skill.pct}%
              </motion.div>
              
              <div className="text-xs font-semibold text-text-muted">{skill.name}</div>
              
              <div className="mt-3 h-1 bg-border-2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  variants={progressBarVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={skill.pct}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}