"use client";

import { useTheme } from "@/components/ThemeProvider";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaNodeJs,
  FaCode,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiRedux,
  SiFirebase,
  SiGooglemaps,
  SiTypescript,
  SiPostman,
  SiVite,
} from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";

const SkillsHome = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const skills = [
    // LANGUAGES (as per resume: JavaScript (ES6+), TypeScript (Fundamentals), HTML5, CSS3, Java (Basics))
    {
      name: "JavaScript (ES6+)",
      icon: <SiJavascript />,
      color: "#f7df1e",
      category: "Languages",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript />,
      color: "#3178c6",
      category: "Languages",
    },
    {
      name: "HTML5",
      icon: <FaHtml5 />,
      color: "#e34f26",
      category: "Languages",
    },
    {
      name: "CSS3",
      icon: <FaCss3Alt />,
      color: "#264de4",
      category: "Languages",
    },
    {
      name: "Java (Basics)",
      icon: <FaCode />, // Using FaCode instead of SiJava
      color: "#007396",
      category: "Languages",
    },

    // FRONTEND & MOBILE (as per resume: React.js, React Native, Next.js, Redux Toolkit, Tailwind CSS, Framer Motion, Responsive & Cross-Platform UI)
    {
      name: "React.js",
      icon: <FaReact />,
      color: "#38bdf8",
      category: "Frontend",
    },
    {
      name: "React Native",
      icon: <FaReact />,
      color: "#61dafb",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
      color: isDarkMode ? "#fff" : "#000",
      category: "Frontend",
    },
    {
      name: "Redux Toolkit",
      icon: <SiRedux />,
      color: "#764abc",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      color: "#22d3ee",
      category: "Frontend",
    },
    {
      name: "Framer Motion",
      icon: <FaReact />,
      color: "#ff6b6b",
      category: "Frontend",
    },

    // BACKEND (as per resume: Node.js, Express.js, RESTful API Design, JWT Authentication, API Integration)
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      color: "#6fbc44",
      category: "Backend",
    },
    {
      name: "Express.js",
      icon: <SiExpress />,
      color: isDarkMode ? "#fff" : "#000",
      category: "Backend",
    },
    {
      name: "RESTful APIs",
      icon: <SiExpress />,
      color: "#818cf8",
      category: "Backend",
    },
    {
      name: "JWT Authentication",
      icon: <SiExpress />,
      color: "#e879f9",
      category: "Backend",
    },
    {
      name: "API Integration",
      icon: <SiExpress />,
      color: "#34d399",
      category: "Backend",
    },

    // DATABASE & CLOUD (as per resume: MongoDB, Firebase - Firestore, Realtime DB, Cloud Messaging, Authentication)
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      color: "#4db33d",
      category: "Database",
    },
    {
      name: "Firebase",
      icon: <SiFirebase />,
      color: "#ffca28",
      category: "Database",
    },
    {
      name: "Firestore",
      icon: <SiFirebase />,
      color: "#ffca28",
      category: "Database",
    },
    {
      name: "Realtime DB",
      icon: <SiFirebase />,
      color: "#ffca28",
      category: "Database",
    },
    {
      name: "Cloud Messaging",
      icon: <SiFirebase />,
      color: "#ffca28",
      category: "Database",
    },

    // TOOLS & PRACTICES (as per resume: Git, GitHub, Google Maps API, Postman, Vite, Agile/Scrum, CI/CD Basics)
    { name: "Git", icon: <FaGitAlt />, color: "#f05032", category: "Tools" },
    { name: "GitHub", icon: <FaGitAlt />, color: "#6e5494", category: "Tools" },
    {
      name: "Google Maps API",
      icon: <SiGooglemaps />,
      color: "#34d399",
      category: "Tools",
    },
    {
      name: "Postman",
      icon: <SiPostman />,
      color: "#ff6c37",
      category: "Tools",
    },
    { name: "Vite", icon: <SiVite />, color: "#646cff", category: "Tools" },
    {
      name: "Agile/Scrum",
      icon: <FaGitAlt />,
      color: "#ffb347",
      category: "Tools",
    },
    {
      name: "CI/CD Basics",
      icon: <FaGitAlt />,
      color: "#00bfff",
      category: "Tools",
    },
  ];

  const categories = [
    "All",
    "Languages",
    "Frontend",
    "Backend",
    "Database",
    "Tools",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-sm tracking-widest text-[var(--primary)] mb-2">
          TECHNICAL SKILLS
        </h2>

        <h1 className="text-3xl md:text-5xl font-bold mb-3">My Tech Stack</h1>

        <p className="text-sm opacity-70 max-w-md mx-auto">
          Technologies I use to build scalable web and mobile applications
          across e-commerce and enterprise platforms.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded-full border transition ${
              activeCategory === cat
                ? "bg-[var(--primary)] text-white"
                : "border-gray-400 text-gray-500 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer border transition-all duration-300"
            style={{
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <div className="text-3xl" style={{ color: skill.color }}>
              {skill.icon}
            </div>

            <p className="text-xs text-center font-medium">{skill.name}</p>
            <span className="text-[10px] opacity-50">{skill.category}</span>
          </motion.div>
        ))}
      </div>

      {/* STATS - Matching resume achievements */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className="text-center p-4 rounded-xl border"
          style={{
            background: isDarkMode
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-3xl font-bold text-[var(--primary)]">40%</p>
          <p className="text-xs opacity-70">API Response Time Reduced</p>
        </div>
        <div
          className="text-center p-4 rounded-xl border"
          style={{
            background: isDarkMode
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-3xl font-bold text-[var(--primary)]">25%+</p>
          <p className="text-xs opacity-70">User Engagement Growth</p>
        </div>
        <div
          className="text-center p-4 rounded-xl border"
          style={{
            background: isDarkMode
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-3xl font-bold text-[var(--primary)]">95%+</p>
          <p className="text-xs opacity-70">On-Time Agile Delivery</p>
        </div>
        <div
          className="text-center p-4 rounded-xl border"
          style={{
            background: isDarkMode
              ? "rgba(255,255,255,0.03)"
              : "rgba(0,0,0,0.02)",
            borderColor: isDarkMode
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-3xl font-bold text-[var(--primary)]">1,000+</p>
          <p className="text-xs opacity-70">Daily Active Users</p>
        </div>
      </div>
    </section>
  );
};

export default SkillsHome;