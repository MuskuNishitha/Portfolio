"use client";
import { useTheme } from "@/components/ThemeProvider";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGitAlt,
  FaNodeJs,
  FaJava,
  FaDatabase,
  FaCloudUploadAlt,
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
} from "react-icons/si";
import { motion } from "framer-motion";
import { useState } from "react";

const categoryMeta = {
  Frontend: { color: "#8750f7", label: "Frontend", emoji: "🎨" },
  Backend: { color: "#22d3ee", label: "Backend", emoji: "⚙️" },
  Database: { color: "#4ade80", label: "Database", emoji: "🗄️" },
  "State Management": {
    color: "#f97316",
    label: "State Management",
    emoji: "🔄",
  },
  Tools: { color: "#f43f5e", label: "Tools", emoji: "🛠️" },
  Security: { color: "#a78bfa", label: "Security", emoji: "🔐" },
  Integration: { color: "#34d399", label: "Integration", emoji: "🔗" },
  Languages: { color: "#fb923c", label: "Languages", emoji: "💻" },
};

const SkillsHome = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    {
      name: "HTML",
      icon: <FaHtml5 />,
      iconColor: "#e34f26",
      category: "Frontend",
    },
    {
      name: "CSS",
      icon: <FaCss3Alt />,
      iconColor: "#264de4",
      category: "Frontend",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript />,
      iconColor: "#f7df1e",
      category: "Frontend",
    },
    {
      name: "React.js",
      icon: <FaReact />,
      iconColor: "#38bdf8",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
      iconColor: isDarkMode ? "#ffffff" : "#000000",
      category: "Frontend",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      iconColor: "#22d3ee",
      category: "Frontend",
    },
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      iconColor: "#6fbc44",
      category: "Backend",
    },
    {
      name: "Express.js",
      icon: <SiExpress />,
      iconColor: isDarkMode ? "#ffffff" : "#404040",
      category: "Backend",
    },
    {
      name: "Firebase",
      icon: <SiFirebase />,
      iconColor: "#ffca28",
      category: "Backend",
    },
    {
      name: "REST APIs",
      icon: <FaCloudUploadAlt />,
      iconColor: "#818cf8",
      category: "Backend",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      iconColor: "#4db33d",
      category: "Database",
    },
    {
      name: "MongoDB Atlas",
      icon: <SiMongodb />,
      iconColor: "#4db33d",
      category: "Database",
    },
    {
      name: "Redux Toolkit",
      icon: <SiRedux />,
      iconColor: "#764abc",
      category: "State Management",
    },
    {
      name: "Git & GitHub",
      icon: <FaGitAlt />,
      iconColor: "#f05032",
      category: "Tools",
    },
    {
      name: "JWT",
      icon: <FaDatabase />,
      iconColor: "#a78bfa",
      category: "Security",
    },
    {
      name: "Google Maps API",
      icon: <SiGooglemaps />,
      iconColor: "#4ade80",
      category: "Integration",
    },
    {
      name: "Java (Basics)",
      icon: <FaJava />,
      iconColor: "#e76f00",
      category: "Languages",
    },
  ];

  const categoryOrder = [
    "Frontend",
    "Backend",
    "Database",
    "State Management",
    "Tools",
    "Security",
    "Integration",
    "Languages",
  ];
  const allCategories = ["All", ...categoryOrder];

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  // Group skills by category for "All" view
  const groupedMap = new Map();
  filteredSkills.forEach((skill) => {
    if (!groupedMap.has(skill.category)) {
      groupedMap.set(skill.category, []);
    }
    groupedMap.get(skill.category).push(skill);
  });

  const groupedSkills = categoryOrder
    .filter((cat) => groupedMap.has(cat))
    .map((cat) => ({
      category: cat,
      skills: groupedMap.get(cat),
      meta: categoryMeta[cat],
    }));

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div
      className="py-16 px-4 md:px-10 lg:px-16 max-w-7xl mx-auto transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-body)" }}
    >
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span
          className="inline-block text-[10px] font-bold tracking-[4px] uppercase px-3 py-1.5 rounded-full mb-4"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(var(--primary-rgb), 0.15)"
              : "rgba(var(--primary-rgb), 0.08)",
            color: "var(--primary)",
            border: "1px solid rgba(var(--primary-rgb), 0.3)",
          }}
        >
          Technical Expertise
        </span>

        <h2
          className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight"
          style={{ color: "var(--text-heading)" }}
        >
          My{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 50%, var(--primary-3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills
          </span>
        </h2>

        <p
          className="text-sm md:text-base max-w-md mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Technologies and tools I use to build scalable web &amp; mobile
          applications.
        </p>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat;
          const color =
            cat === "All" ? "#8750f7" : (categoryMeta[cat]?.color ?? "#8750f7");
          const backgroundColor = isActive ? color : "transparent";

          return (
            <button
              type="button"
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: backgroundColor,
                borderColor: isActive
                  ? color
                  : isDarkMode
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.1)",
                color: isActive ? "#fff" : "var(--text-muted)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}
      {activeCategory === "All" ? (
        // Grouped view for "All" category
        <div className="space-y-10">
          {groupedSkills.length > 0 ? (
            groupedSkills.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: gi * 0.05 }}
                viewport={{ once: true }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs font-bold tracking-[2px] uppercase px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${group.meta.color}18`,
                      color: group.meta.color,
                      border: `1px solid ${group.meta.color}40`,
                    }}
                  >
                    {group.category}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(to right, ${group.meta.color}50, transparent)`,
                    }}
                  />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {group.skills.length}{" "}
                    {group.skills.length === 1 ? "skill" : "skills"}
                  </span>
                </div>

                {/* Skills row */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {group.skills.map((skill, si) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      meta={group.meta}
                      isDarkMode={isDarkMode}
                      hovered={hoveredSkill === skill.name}
                      onEnter={() => setHoveredSkill(skill.name)}
                      onLeave={() => setHoveredSkill(null)}
                      delay={si * 0.04}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div
              className="text-center py-10"
              style={{ color: "var(--text-muted)" }}
            >
              No skills found
            </div>
          )}
        </div>
      ) : (
        // Single category grid view
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4"
        >
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, si) => {
              const meta = categoryMeta[skill.category];
              return (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  meta={meta}
                  isDarkMode={isDarkMode}
                  hovered={hoveredSkill === skill.name}
                  onEnter={() => setHoveredSkill(skill.name)}
                  onLeave={() => setHoveredSkill(null)}
                  delay={si * 0.05}
                  large
                />
              );
            })
          ) : (
            <div
              className="col-span-full text-center py-10"
              style={{ color: "var(--text-muted)" }}
            >
              No skills found in {activeCategory} category
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Skill Card Component
const SkillCard = ({
  skill,
  meta,
  isDarkMode,
  hovered,
  onEnter,
  onLeave,
  delay = 0,
  large = false,
}) => {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 ${
        large ? "p-5 rounded-2xl gap-3" : "p-3 rounded-xl gap-2"
      }`}
      style={{
        backgroundColor: hovered
          ? isDarkMode
            ? `${meta.color}18`
            : `${meta.color}10`
          : isDarkMode
            ? "rgba(255,255,255,0.03)"
            : "rgba(0,0,0,0.02)",
        border: hovered
          ? `1px solid ${meta.color}60`
          : isDarkMode
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.06)",
        boxShadow: hovered ? `0 4px 24px ${meta.color}30` : "none",
      }}
    >
      {/* Glow orb behind icon */}
      {hovered && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "60px",
            height: "60px",
            background: `radial-gradient(circle, ${meta.color}35 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1.4 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={`relative z-10 ${large ? "text-4xl" : "text-2xl md:text-3xl"}`}
        style={{ color: skill.iconColor }}
      >
        {skill.icon}
      </motion.div>

      {/* Name */}
      <p
        className={`relative z-10 font-semibold text-center leading-tight ${
          large ? "text-[11px] md:text-xs" : "text-[9px] md:text-[10px]"
        }`}
        style={{
          color: hovered ? meta.color : "var(--text-muted)",
          transition: "color 0.2s",
        }}
      >
        {skill.name}
      </p>

      {/* Hover tooltip */}
      <motion.div
        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap z-20 pointer-events-none"
        style={{ backgroundColor: meta.color, color: "#fff" }}
        initial={{ opacity: 0, y: 4, scale: 0.85 }}
        animate={
          hovered
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 4, scale: 0.85 }
        }
        transition={{ duration: 0.15 }}
      >
        {skill.category}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          style={{ backgroundColor: meta.color }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SkillsHome;
