'use client'

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutUs() {
  const achievements = [
    { value: "2+", label: "Years Experience", icon: "💼" },
    { value: "5+", label: "Projects Delivered", icon: "🚀" },
    { value: "25%+", label: "User Engagement Boost", icon: "📈" },
    { value: "95%+", label: "On-Time Delivery", icon: "✅" },
  ];

  const skills = {
    frontend: ["React.js", "React Native", "Next.js", "Redux Toolkit", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Authentication"],
    tools: ["Git", "GitHub", "Firebase", "Google Maps API", "FCM"]
  };

  const experience = [
    {
      role: "MERN Stack & React Native Developer",
      company: "AI Apps Hub Private Limited (formerly Dexterous Technology)",
      location: "Hyderabad",
      period: "Jun 2024 - Present",
      achievements: [
        "Delivered 3+ scalable web and mobile applications, improving user engagement and product reach",
        "Optimized backend APIs, reducing response time by 40% and enhancing overall performance",
        "Designed and implemented secure authentication and file management systems using JWT and REST APIs",
        "Built responsive, high-performance UIs using React.js, React Native, Next.js, and Redux Toolkit",
        "Integrated third-party services such as Firebase Cloud Messaging and Google Maps API"
      ]
    },
    {
      role: "Intern",
      company: "AI Apps Hub Private Limited (formerly Dexterous Technology)",
      location: "Hyderabad",
      period: "Apr 2024 - May 2024",
      achievements: [
        "Assisted in developing responsive frontend components using HTML, CSS, and JavaScript",
        "Supported API integration and backend development using Node.js and Express.js",
        "Debugged and resolved UI/functional issues, improving application stability",
        "Gained hands-on experience in full-stack development and Agile workflows"
      ]
    }
  ];

  return (
    <section id="about" className="py-[100px] bg-bg-2 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(135,80,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(135,80,247,0.04)_1px,transparent_1px)] bg-[length:60px_60px]" />
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(135,80,247,0.08)_0%,transparent_70%)] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(42,20,84,0.25)_0%,transparent_70%)] rounded-full" />
      
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
          >
            About Me
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Know Who I Am
          </motion.h2>
          <motion.div 
            className="section-divider section-divider-center"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[60px] items-start">
          {/* Left Column - Image & Achievements */}
          <div>
            <motion.div 
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-primary/30 animate-spin-slow">
                <div className="absolute w-2.5 h-2.5 rounded-full bg-primary top-[-5px] left-1/2 -translate-x-1/2 shadow-[0_0_12px_var(--primary)]" />
              </div>
              <div className="w-[340px] h-[340px] rounded-full bg-gradient-to-r from-primary to-secondary p-[3px]">
                <div className="w-full h-full rounded-full bg-bg-3 overflow-hidden relative">
                  <Image
                    src="/assets/ProfileMain.jpeg"
                    alt="Musku Nishitha"
                    fill
                    priority
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mt-[40px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {achievements.map((item, index) => (
                <div key={index} className="bg-bg-card border border-border rounded-xl p-5 text-center hover:border-primary transition-all duration-300">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-2xl font-extrabold text-primary-3">{item.value}</div>
                  <div className="text-xs text-text-muted mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Bio, Experience & Skills */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Who Am I?</h3>
              <p className="text-text-body leading-relaxed mb-4">
                I'm <span className="text-primary-3 font-semibold">Musku Nishitha</span>, a passionate Full-stack MERN & React Native developer with 2+ years of experience building scalable web and mobile applications. I specialize in creating high-performance, user-centric solutions that drive engagement and deliver results.
              </p>
              <p className="text-text-body leading-relaxed mb-6">
                With a strong foundation in modern JavaScript technologies, I've successfully delivered 5+ projects including multi-vendor e-commerce platforms, grocery apps, and resource management dashboards. My approach combines clean code, responsive design, and seamless user experiences.
              </p>
              
              {/* Education */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span>🎓</span> Education
                </h4>
                <div className="space-y-3">
                  <div className="bg-bg-card/50 border border-border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <span className="font-semibold text-white">A.V. College of Arts, Science & Commerce, Hyderabad</span>
                      <span className="text-xs text-primary-3">Aug 2020 - Jun 2023</span>
                    </div>
                    <p className="text-sm text-text-muted">Bachelor of Business Administration (BBA) | CGPA: 8.42/10</p>
                  </div>
                  <div className="bg-bg-card/50 border border-border rounded-lg p-4">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <span className="font-semibold text-white">Sri Aryabhata Junior College, Kamareddy</span>
                      <span className="text-xs text-primary-3">Aug 2018 - Jun 2020</span>
                    </div>
                    <p className="text-sm text-text-muted">Intermediate (MPC) | CGPA: 9.2/10</p>
                  </div>
                </div>
              </div>

              {/* Skills Tabs */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <span>⚡</span> Technical Skills
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-primary-3 mb-2">Frontend</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-bg-card border border-primary/20 rounded-full text-xs text-text-body hover:border-primary hover:text-primary-3 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-primary-3 mb-2">Backend & Database</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-bg-card border border-primary/20 rounded-full text-xs text-text-body hover:border-primary hover:text-primary-3 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-primary-3 mb-2">Tools & Others</h5>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 bg-bg-card border border-primary/20 rounded-full text-xs text-text-body hover:border-primary hover:text-primary-3 transition-all">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Experience Section */}
        <motion.div 
          className="mt-[80px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Work Experience</h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300">
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                    <p className="text-primary-3 text-sm">{exp.company} • {exp.location}</p>
                  </div>
                  <span className="text-xs text-text-muted bg-bg-3 px-3 py-1 rounded-full">{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-text-body text-sm flex items-start gap-2">
                      <span className="text-primary-3 mt-1">▹</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}