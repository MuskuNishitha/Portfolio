import {
  fallbackAbout,
  fallbackHero,
  fallbackPortfolio,
  fallbackResume,
  fallbackServices,
} from "./publicContent";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function formatPeriod(startDate, endDate) {
  if (!startDate) return "N/A";

  const format = (value) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const start = format(startDate);
  const end = endDate ? format(endDate) : "Present";
  return `${start} - ${end}`;
}

function capitalizeWords(value = "") {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function mapCategoryName(category = "") {
  const normalized = category.toLowerCase();

  if (normalized.includes("ecommerce")) return "Web Development";
  if (normalized.includes("dashboard")) return "Dashboards";
  if (normalized.includes("mobile")) return "Applications";
  if (normalized.includes("app")) return "Applications";
  return capitalizeWords(category) || "Projects";
}

function getProfileName(profile) {
  return [profile?.firstName, profile?.lastName].filter(Boolean).join(" ").trim();
}

export function mapHeroContent(profile) {
  if (!profile) return fallbackHero;

  return {
    badge: profile.tagline || fallbackHero.badge,
    name: getProfileName(profile) || fallbackHero.name,
    headline: "Hi, I'm",
    summary: profile.description || fallbackHero.summary,
    techStack: safeArray(profile.role).length ? profile.role : fallbackHero.techStack,
    resumeUrl: profile.resumeUrl || fallbackHero.resumeUrl,
    profileImageUrl: profile.profileImage || fallbackHero.profileImageUrl,
    socials: {
      linkedin: profile.linkedin || profile.socialLinks?.linkedin || fallbackHero.socials.linkedin,
      github: profile.github || profile.socialLinks?.github || fallbackHero.socials.github,
      email: profile.email ? `mailto:${profile.email}` : fallbackHero.socials.email,
    },
  };
}

export function mapPortfolioContent(works) {
  const workList = safeArray(works);
  if (!workList.length) return fallbackPortfolio;

  const projects = workList.map((work, index) => ({
    id: work._id || index + 1,
    title: work.title || `Project ${index + 1}`,
    category: work.category || "general",
    subcategory: mapCategoryName(work.category),
    period: formatPeriod(work.startDate, work.endDate),
    image: work.images?.[0] || fallbackPortfolio.projects[index % fallbackPortfolio.projects.length]?.image || "/assets/ProfileMain.jpeg",
    description: work.shortDescription || work.description || "Project details coming soon.",
    features: work.description
      ? work.description
          .split(".")
          .map((item) => item.trim())
          .filter(Boolean)
          .slice(0, 5)
      : [],
    tech: safeArray(work.techStack),
    liveLink: work.liveUrl || "",
    githubLink: work.githubUrl || work.repoUrl || "",
    challenges: "",
    solution: work.description || "",
  }));

  const categoryMap = new Map();
  projects.forEach((project) => {
    if (!project.category) return;
    categoryMap.set(project.category, {
      id: project.category,
      name: mapCategoryName(project.category),
    });
  });

  return {
    categories: Array.from(categoryMap.values()),
    projects,
  };
}

export function mapResumeContent(experiences, profile) {
  const experienceList = safeArray(experiences);
  if (!experienceList.length) {
    return {
      ...fallbackResume,
      resumeUrl: profile?.resumeUrl || fallbackResume.resumeUrl,
    };
  }

  const workExperience = experienceList
    .filter((item) => (item.type || "Work").toLowerCase() === "work")
    .map((item) => ({
      time: formatPeriod(item.startDate, item.endDate),
      title: item.title,
      place: item.location || "Unknown",
      achievements: safeArray(item.details),
    }));

  const education = experienceList
    .filter((item) => (item.type || "").toLowerCase() === "education")
    .map((item) => ({
      time: formatPeriod(item.startDate, item.endDate),
      title: item.title,
      place: item.location || "Unknown",
      cgpa: item.details?.[0] || "",
    }));

  const certifications = experienceList
    .filter((item) => (item.type || "").toLowerCase() === "certification")
    .map((item) => ({
      title: item.title,
      issuer: item.location || "Unknown",
      year: item.startDate ? new Date(item.startDate).getFullYear().toString() : "",
      icon: item.details?.[0] || "Award",
    }));

  return {
    experiences: workExperience.length ? workExperience : fallbackResume.experiences,
    education: education.length ? education : fallbackResume.education,
    certifications: certifications.length ? certifications : fallbackResume.certifications,
    resumeUrl: profile?.resumeUrl || fallbackResume.resumeUrl,
  };
}

export function mapServicesContent(profile, works, skillCategories) {
  const workList = safeArray(works);
  const flattenedSkills = safeArray(skillCategories)
    .flatMap((category) => safeArray(category.skills))
    .map((skill) => skill?.name)
    .filter(Boolean);

  if (!workList.length && !flattenedSkills.length) return fallbackServices;

  const serviceCards = [
    {
      num: "01",
      name: "Full-Stack Web Development",
      desc: `Build responsive, scalable products with ${flattenedSkills.slice(0, 5).join(", ") || "React, Next.js, Node.js, and MongoDB"}.`,
    },
    {
      num: "02",
      name: "Cross-Platform App Development",
      desc: "Ship consistent mobile experiences with React Native, API integrations, and production-ready UX flows.",
    },
    {
      num: "03",
      name: "Portfolio & Business Platforms",
      desc: `${workList.length}+ project case studies translated into polished customer-facing websites, admin dashboards, and branded product experiences.`,
    },
    {
      num: "04",
      name: "Performance & Feature Delivery",
      desc: "Improve API response time, streamline state management, and turn static interfaces into dynamic, maintainable applications.",
    },
  ];

  return {
    title: "My Quality Services",
    subtitle: safeArray(profile?.role).slice(0, 2).join(" - ") || fallbackServices.subtitle,
    description: profile?.description || fallbackServices.description,
    services: serviceCards,
  };
}

export function mapAboutContent(profile, experiences, skillCategories) {
  if (!profile) return fallbackAbout;

  const resumeContent = mapResumeContent(experiences, profile);
  const allSkills = safeArray(skillCategories)
    .flatMap((category) => safeArray(category.skills))
    .sort((a, b) => (b.percentage || 0) - (a.percentage || 0));

  const topSkills = allSkills.length ? allSkills.slice(0, 9) : fallbackAbout.skills;
  const workExperience = resumeContent.experiences;
  const stats = [
    {
      value: `${profile.Experience || fallbackAbout.stats[0].value}+`,
      label: "Years Experience",
      icon: "Work",
      color: "from-primary to-secondary",
    },
    {
      value: `${profile.completedProjects || safeArray(workExperience).length}+`,
      label: "Projects Completed",
      icon: "Projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: `${profile.happycustomers || "3"}+`,
      label: "Happy Clients",
      icon: "Clients",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: profile.available ? "Open" : "Closed",
      label: "Availability",
      icon: "Status",
      color: "from-orange-500 to-red-500",
    },
  ];

  return {
    profile: {
      firstName: profile.firstName || fallbackAbout.profile.firstName,
      lastName: profile.lastName || fallbackAbout.profile.lastName,
      role: safeArray(profile.role).length ? profile.role : fallbackAbout.profile.role,
      tagline: profile.tagline || fallbackAbout.profile.tagline,
      description: profile.description || fallbackAbout.profile.description,
      birthdate: profile.birthdate || fallbackAbout.profile.birthdate,
      available: Boolean(profile.available),
      address: profile.address || fallbackAbout.profile.address,
      experience: profile.Experience || fallbackAbout.profile.experience,
      nationality: profile.nationality || fallbackAbout.profile.nationality,
      completedProjects: profile.completedProjects || fallbackAbout.profile.completedProjects,
      happyCustomers: profile.happycustomers || fallbackAbout.profile.happyCustomers,
      languages: safeArray(profile.languages).length ? profile.languages : fallbackAbout.profile.languages,
      email: profile.email || fallbackAbout.profile.email,
      phone: profile.phone || fallbackAbout.profile.phone,
      freelance: Boolean(profile.freelance),
      socialLinks: {
        github: profile.github || profile.socialLinks?.github || fallbackAbout.profile.socialLinks.github,
        linkedin: profile.linkedin || profile.socialLinks?.linkedin || fallbackAbout.profile.socialLinks.linkedin,
        instagram: profile.socialLinks?.instagram || fallbackAbout.profile.socialLinks.instagram,
      },
    },
    skills: topSkills,
    education: resumeContent.education,
    experience: workExperience,
    stats,
  };
}

