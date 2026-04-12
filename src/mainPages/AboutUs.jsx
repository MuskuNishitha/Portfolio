'use client'

import HeaderBanner from "@/global/HeaderBanner";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function AboutUs() {
  const { isDarkMode } = useTheme();

  const profileData = {
    firstName: "Musku",
    lastName: "Nishitha",
    role: ["Frontend Developer", "React js Developer", "MERN Stack Developer", "Mobile App Developer"],
    tagline: "React & React Native Developer | Building Modern Apps",
    description: "I am a passionate React and React Native developer with 2 year of experience in building modern web and mobile applications. I have worked on admin panels and complete app development using technologies like React, Node.js, and MongoDB. I enjoy creating clean UI designs and improving user experience. I am always eager to learn new technologies and grow as a developer.",
    birthdate: "2003-08-11",
    available: true,
    address: "Brahmanpally Kamareddy",
    Experience: "2",
    nationality: "Indian",
    completedProjects: "6",
    happycustomers: "3",
    languages: ["English", "Telugu", "Hindi"],
    email: "mnishithareddy8765@gmail.com",
    phone: "7416264657",
    freelance: true,
    socialLinks: {
      github: "https://github.com/MuskuNishitha",
      linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b",
      instagram: "mnishithareddy8765@gmail.com"
    }
  };

  const skillsWithPercentage = [
    { name: "React.js", percentage: 92, icon: "⚛️", color: "#61DAFB" },
    { name: "React Native", percentage: 88, icon: "📱", color: "#61DAFB" },
    { name: "Next.js", percentage: 85, icon: "▲", color: "#000000" },
    { name: "Node.js", percentage: 86, icon: "🚀", color: "#68A063" },
    { name: "Express.js", percentage: 84, icon: "⚡", color: "#68A063" },
    { name: "MongoDB", percentage: 82, icon: "🍃", color: "#47A248" },
    { name: "Redux Toolkit", percentage: 88, icon: "🔄", color: "#764ABC" },
    { name: "Tailwind CSS", percentage: 90, icon: "🎨", color: "#06B6D4" },
    { name: "JavaScript", percentage: 89, icon: "🟡", color: "#F7DF1E" },
  ];

  const education = [
    {
      degree: "Bachelor of Business Administration (BBA)",
      institution: "A.V. College of Arts, Science & Commerce, Hyderabad",
      period: "Aug 2020 - Jun 2023",
      cgpa: "8.42/10"
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Sri Aryabhata Junior College, Kamareddy",
      period: "Aug 2018 - Jun 2020",
      cgpa: "9.2/10"
    }
  ];

  const experience = [
    {
      role: "MERN Stack & React Native Developer",
      company: "AI Apps Hub Private Limited",
      location: "Hyderabad",
      period: "Jun 2024 - Present",
      achievements: [
        "Delivered 3+ scalable web and mobile applications, improving user engagement by 25%+",
        "Optimized backend APIs, reducing response time by 40%",
        "Implemented secure authentication with JWT and REST APIs",
        "Built high-performance UIs using React.js, React Native, Next.js, and Redux Toolkit",
        "Integrated Firebase Cloud Messaging and Google Maps API"
      ]
    },
    {
      role: "Intern",
      company: "AI Apps Hub Private Limited",
      location: "Hyderabad",
      period: "Apr 2024 - May 2024",
      achievements: [
        "Developed responsive frontend components using HTML, CSS, and JavaScript",
        "Supported API integration with Node.js and Express.js",
        "Debugged UI/functional issues, improving application stability",
        "Gained hands-on experience in full-stack development and Agile workflows"
      ]
    }
  ];

  const stats = [
    { value: profileData.Experience + "+", label: "Years Experience", icon: "💼", color: "from-primary to-secondary" },
    { value: profileData.completedProjects + "+", label: "Projects Completed", icon: "🚀", color: "from-blue-500 to-cyan-500" },
    { value: "25%+", label: "Engagement Boost", icon: "📈", color: "from-green-500 to-emerald-500" },
    { value: "95%+", label: "On-Time Delivery", icon: "✅", color: "from-orange-500 to-red-500" }
  ];

  // Dynamic background classes based on theme
  const bgColor = isDarkMode ? "bg-bg-2" : "bg-gray-50";
  const cardBg = isDarkMode ? "from-bg-card to-bg-3" : "from-white to-gray-100";
  const borderColor = isDarkMode ? "border-border" : "border-gray-200";
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondary = isDarkMode ? "text-text-body" : "text-gray-700";
  const textMuted = isDarkMode ? "text-text-muted" : "text-gray-500";

  return (
    <section id="about" className={`py-[100px] ${bgColor} relative overflow-hidden`}>
      <HeaderBanner title={"About Us"} />
      
      {/* Animated Background Elements - Adjusted for light mode */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-[linear-gradient(rgba(135,80,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(135,80,247,0.04)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'} bg-[length:60px_60px]`} />
      <div className={`absolute top-[-20%] right-[-10%] w-[700px] h-[700px] ${isDarkMode ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.1)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle,rgba(135,80,247,0.05)_0%,transparent_70%)]'} rounded-full animate-float`} />
      <div className={`absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] ${isDarkMode ? 'bg-[radial-gradient(circle,rgba(135,80,247,0.08)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle,rgba(135,80,247,0.03)_0%,transparent_70%)]'} rounded-full animate-float [animation-delay:2s]`} />

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
            className={`section-title ${textPrimary}`}
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

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 text-center group hover:border-primary transition-all duration-300`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-primary-3 mb-1">{stat.value}</div>
              <div className={`text-xs ${textMuted} uppercase tracking-wide`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-[50px]">
          {/* Left Column - Personal Info & Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Name & Role */}
            <div className="mb-8">
              <h1 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-3`}>
                {profileData.firstName} <span className="gradient-text">{profileData.lastName}</span>
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.role.map((r, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary-3 font-medium">
                    {r}
                  </span>
                ))}
              </div>
              <p className={`${textSecondary} leading-relaxed`}>
                {profileData.description}
              </p>
            </div>

            {/* Personal Details Card */}
            <div className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 mb-8`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">📋</span> Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Birthdate</p>
                  <p className={`text-sm ${textPrimary} font-medium`}>{new Date(profileData.birthdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Nationality</p>
                  <p className={`text-sm ${textPrimary} font-medium`}>{profileData.nationality}</p>
                </div>
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Address</p>
                  <p className={`text-sm ${textPrimary} font-medium`}>{profileData.address}</p>
                </div>
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Availability</p>
                  <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    {profileData.available ? "Available for work" : "Not available"}
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Freelance</p>
                  <p className={`text-sm ${textPrimary} font-medium`}>{profileData.freelance ? "✓ Available" : "Not available"}</p>
                </div>
                <div>
                  <p className={`text-xs ${textMuted} mb-1`}>Languages</p>
                  <p className={`text-sm ${textPrimary} font-medium`}>{profileData.languages.join(", ")}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">📞</span> Contact Info
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 ${isDarkMode ? 'bg-bg-2/50' : 'bg-gray-100'} rounded-xl`}>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-3">📧</div>
                  <div>
                    <p className={`text-xs ${textMuted}`}>Email</p>
                    <a href={`mailto:${profileData.email}`} className={`text-sm ${textPrimary} hover:text-primary-3 transition-colors`}>{profileData.email}</a>
                  </div>
                </div>
                <div className={`flex items-center gap-3 p-3 ${isDarkMode ? 'bg-bg-2/50' : 'bg-gray-100'} rounded-xl`}>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-3">📱</div>
                  <div>
                    <p className={`text-xs ${textMuted}`}>Phone</p>
                    <a href={`tel:${profileData.phone}`} className={`text-sm ${textPrimary} hover:text-primary-3 transition-colors`}>+{profileData.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills with Percentages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 mb-8`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-6 flex items-center gap-2`}>
                <span className="text-primary-3">⚡</span> Technical Skills
              </h3>
              <div className="space-y-5">
                {skillsWithPercentage.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className={`text-sm font-medium ${textPrimary}`}>{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-primary-3">{skill.percentage}%</span>
                    </div>
                    <div className={`relative h-2 ${isDarkMode ? 'bg-bg-2' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6`}>
              <h3 className={`text-lg font-bold ${textPrimary} mb-5 flex items-center gap-2`}>
                <span className="text-primary-3">🎓</span> Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-5 border-l-2 border-primary/30">
                    <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1" />
                    <h4 className={`font-semibold ${textPrimary} mb-1`}>{edu.degree}</h4>
                    <p className="text-xs text-primary-3 mb-1">{edu.institution}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${textMuted}`}>{edu.period}</span>
                      <span className={`text-xs font-medium ${textPrimary} bg-primary/20 px-2 py-0.5 rounded-full`}>CGPA: {edu.cgpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          className="mt-[60px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className={`text-2xl font-bold ${textPrimary} text-center mb-8`}>Work Experience</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${cardBg} border ${borderColor} rounded-2xl p-6 hover:border-primary transition-all duration-300`}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h4 className={`text-lg font-bold ${textPrimary}`}>{exp.role}</h4>
                    <p className="text-primary-3 text-sm">{exp.company}</p>
                  </div>
                  <span className={`text-xs ${textMuted} ${isDarkMode ? 'bg-bg-2' : 'bg-gray-100'} px-3 py-1 rounded-full`}>{exp.period}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className={`${textSecondary} text-sm flex items-start gap-2`}>
                      <span className="text-primary-3 mt-1">▹</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}