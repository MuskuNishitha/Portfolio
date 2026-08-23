export const fallbackHero = {
  badge: "REACT.JS | REACT NATIVE | MERN STACK DEVELOPER",
  name: "Musku Nishitha",
  headline: "Hi, I'm",
  summary:
    "React.js | React Native | MERN Stack Developer with 2+ years of experience building scalable web and mobile applications across e-commerce and enterprise platforms. Track record of cutting backend API response time by 40%, growing user engagement by 25%+, and sustaining 95%+ on-time Agile delivery.",
  techStack: [
    "React.js",
    "React Native",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Redux Toolkit",
    "Tailwind CSS",
  ],
  resumeUrl: "/MUSKU NISHITHA.pdf",
  profileImageUrl: "/assets/Professional.jpg",
  socials: {
    linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b/",
    github: "https://github.com/MuskuNishitha",
    email: "mailto:muskunishitha2003@gmail.com",
  },
};

export const fallbackPortfolio = {
  categories: [
    { id: "all", name: "All Work" },
    { id: "ecommerce", name: "Web Development" },
    // { id: "mobile", name: "Applications" },
    { id: "dashboard", name: "Dashboards" },
  ],
  projects: [
    {
      id: 1,
      title: "EWShopping",
      category: "ecommerce",
      subcategory: "Web Development",
      period: "Jun 2024 - Present",
      image: "/assets/projects/Ewshooping.png",
      description:
        "Full-scale multi-vendor e-commerce platform spanning customer website, admin panel, seller panel, and mobile app — supporting 4,000+ vendors and 28,000+ users.",
      features: [
        "Next.js customer website, improving performance and SEO by 20%",
        "Admin & Seller dashboards with React (Vite) and Tailwind CSS for 4,000+ vendors",
        "Cross-platform mobile app with React Native serving 28,000+ users",
        "Real-time updates via Firebase, cutting data sync delay by 50%",
        "Deployed and hosted on Hostinger, maintaining 99% uptime",
      ],
      tech: [
        "Next.js",
        "React.js (Vite)",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Firebase",
      ],
      liveLink: "https://ewshopping.com/",
      playstoreLinks: [
        {
          name: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.ewsapp",
        },
      ],
      githubLink: "",
      challenges:
        "Implementing real-time inventory sync across multiple vendors and platforms.",
      solution:
        "Used realtime updates + optimised DB queries to keep inventory accurate and fast, cutting sync delay by 50%.",
    },
    {
      id: 2,
      title: "KiranaWorld",
      category: "ecommerce",
      subcategory: "Web Development",
      period: "Apr 2025 - Present",
      image: "/assets/projects/KiranaWorld.png",
      description:
        "Grocery e-commerce platform enabling online orders of fruits, vegetables, and household essentials for 1,000+ customers.",
      features: [
        "Responsive customer website with React.js (Vite), improving UX by 30%",
        "Admin panel using React (Vite) and Tailwind CSS for inventory and order management",
        "Cross-platform mobile app with React Native for a smooth checkout flow",
        "Backend services connected with Node.js, Express.js, and MongoDB",
      ],
      tech: [
        "React.js (Vite)",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Redux Toolkit",
      ],
      liveLink: "https://kiranaworld.in",
      githubLink: "",
      playstoreLinks: [
        {
          name: "Play Store",
          url: "https://play.google.com/store/apps/details?id=suprmarket.kiranaworld.app",
        },
      ],
      challenges:
        "Managing inventory updates and preventing overselling during peak hours.",
      solution:
        "Added inventory checks with caching + safer updates during checkout.",
    },
    {
      id: 3,
      title: "Primera Dental Hub",
      category: "ecommerce",
      subcategory: "Web Development",
      period: "Jul 2025 - Present",
      image: "/assets/projects/Primeradental.png",
      description:
        "Specialised dental e-commerce platform for products, instruments, and equipment, supporting 500+ registered users.",
      features: [
        "Next.js customer website, improving performance and SEO by 25%",
        "Firebase Authentication for secure login, supporting 500+ registered users",
        "Admin panel built with React and Tailwind CSS for products, orders, and user management",
        "Customer and Service mobile apps with React Native, serving 200+ active users",
        "SMS and email notifications for orders/authentication, plus usage-analytics dashboards",
      ],
      tech: [
        "Next.js",
        "React.js (Vite)",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "Tailwind CSS",
      ],
      liveLink: "https://primeradentalhub.com",
      githubLink: "",
      playstoreLinks: [
        {
          name: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.primeradental",
        },
        {
          name: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.primeradentalpartner",
        },
      ],
      challenges: "Handling catalogue scale and fast search.",
      solution: "Improved indexing and query patterns for quick results.",
    },
    {
      id: 4,
      title: "POT Dashboard",
      category: "dashboard",
      subcategory: "Dashboard",
      period: "Nov 2025 - Jan 2026",
      image: "/assets/projects/POT.png",
      description:
        "Mobile dashboard visualising construction project metrics — cost, manpower, and progress — across 20+ construction sites.",
      features: [
        "Dynamic charts and graphs for real-time insights, cutting reporting time by 35%",
        "Optimised responsive UI for mobile and tablet, improving field usability by 40%",
        "State management and real-time updates with Redux Toolkit",
        "Export-ready reporting",
      ],
      tech: [
        "React Native",
        "Redux Toolkit",
        "Chart Libraries",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      liveLink: "",
      playstoreLinks: [],
      githubLink: "",
      challenges: "Keeping chart updates smooth with large datasets on mobile.",
      solution:
        "Used aggregation and memoisation to reduce render work and payload size.",
    },
  ],
};

export const fallbackResume = {
  experiences: [
    {
      role: "MERN Stack & React Native Developer",
      company: "Dexterous Technology",
      duration: "Jun 2024 - Present",
      points: [
        "Delivered 3+ scalable web and mobile applications, boosting user engagement by 25% across 2 platforms",
        "Optimized backend RESTful APIs, reducing response time by 40% for 1,000+ daily active users",
        "Architected secure JWT-based authentication and file management systems with zero unauthorized access incidents across 3+ production apps",
        "Engineered responsive, high-performance UIs with React.js, React Native, Next.js, and Redux Toolkit, cutting average page load time by 30%",
        "Integrated Firebase Cloud Messaging and Google Maps API, increasing user retention by 20%",
        "Collaborated in an Agile/Scrum environment, sustaining 95%+ on-time feature delivery across 10+ sprints",
      ],
      tech: [
        "React.js",
        "React Native",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
      ],
    },
    {
      role: "Software Development Intern",
      company: "Dexterous Technology",
      duration: "Apr 2024 - May 2024",
      points: [
        "Built 5+ responsive frontend components using HTML, CSS, and JavaScript, reducing UI inconsistencies by 25%",
        "Assisted with API integration and backend development using Node.js and Express.js, supporting 10+ REST endpoints",
        "Resolved 15+ UI and functional issues, improving application stability by 30%",
        "Gained hands-on experience in full-stack development and Agile workflows across 2 sprint cycles",
      ],
      tech: ["React", "Node.js", "Express"],
    },
    {
      role: "Full Stack Trainee",
      company: "JSpiders, Punjagutta",
      duration: "Jun 2023 - Apr 2024",
      points: [
        "Learned full-stack development (JS, React, Node, MongoDB)",
        "Built CRUD & API-based mini projects",
        "Practiced DSA and problem-solving daily",
        "Worked with Git and real-world project structure",
      ],
      tech: ["JavaScript", "React", "Node.js", "MongoDB"],
    },
  ],
  education: [
    {
      time: "Aug 2020 - Jun 2023",
      title: "Bachelor of Business Administration (BBA)",
      place: "A.V. College of Arts, Science & Commerce, Hyderabad",
      cgpa: "CGPA: 8.42/10",
    },
    {
      time: "Aug 2018 - Jun 2020",
      title: "Intermediate (MPC)",
      place: "Sri Aryabhata Junior College, Kamareddy",
      cgpa: "CGPA: 9.2/10",
    },
  ],
  certifications: [
    {
      title: "Full Stack Java Developer",
      issuer: "JSPiders, Punjagutta",
      year: "2023",
      icon: "☕",
    },
  ],
  achievements: [
    {
      title: "Best Performer of the Month",
      desc: "Recognized for delivering multiple projects ahead of schedule",
      icon: "🏆",
    },
    {
      title: "Zero Critical Bugs",
      desc: "Deployed production applications with zero critical post-launch bugs",
      icon: "🐛",
    },
    {
      title: "95%+ Task Completion",
      desc: "Sustained 95%+ task completion rate in an Agile environment",
      icon: "✅",
    },
  ],
  resumeUrl: "/MUSKU NISHITHA.pdf",
};

export const fallbackSettings = {
  defaultTheme: "dark", // "dark" | "light"
  defaultPrimaryColor: "purple",
};

export const fallbackServices = {
  title: "My Quality Services",
  subtitle: "What I Do",
  description:
    "I transform ideas into scalable web and mobile solutions that cut response times, grow engagement, and ship on schedule.",
  services: [
    {
      num: "01",
      name: "Full-Stack MERN Development",
      desc: "Build end-to-end web applications with React.js, Next.js, Node.js, Express.js, and MongoDB. Implement JWT-based authentication, REST APIs, and state management with Redux Toolkit for scalable, high-performance solutions.",
    },
    {
      num: "02",
      name: "Cross-Platform Mobile Apps",
      desc: "Create React Native apps with smooth UI, API integration, Firebase Cloud Messaging, Google Maps API, and production-ready flows.",
    },
    {
      num: "03",
      name: "E-Commerce Platforms",
      desc: "Develop modern multi-vendor commerce experiences with customer sites, admin/seller panels, and mobile apps — built to handle thousands of vendors and users.",
    },
    {
      num: "04",
      name: "Dashboards & Analytics",
      desc: "Ship admin dashboards and reporting tools with real-time charts that cut reporting time and make data easy to act on.",
    },
  ],
};
export const fallbackAbout = {
  profile: {
    firstName: "Musku",
    lastName: "Nishitha",
    role: [
      "React.js Developer",
      "React Native Developer",
      "MERN Stack Developer",
    ],
    tagline: "Building fast, scalable web & mobile products",
    description:
      "I specialize in shipping production-grade applications end-to-end — from architecting REST APIs and database schemas to building polished, responsive UIs in React, React Native, and Next.js. My focus is on performance and reliability: optimized queries, real-time sync, and clean state management with Redux Toolkit. I've worked across e-commerce, healthcare, and dashboard products, consistently delivering within Agile sprint cycles and keeping post-launch bugs at zero.",
    birthdate: "2003-08-11",
    available: true,
    address: "Sr Nagar, Hyderabad",
    experience: "2",
    nationality: "Indian",
    completedProjects: "6",
    happyCustomers: "3",
    languages: ["English", "Telugu", "Hindi"],
    email: "muskunishitha2003@gmail.com",
    phone: "7416264657",
    freelance: true,
    socialLinks: {
      github: "https://github.com/MuskuNishitha",
      linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b",
      instagram: "", // add your real handle here, or remove this field if unused
    },
  },
  skills: [
    { name: "React.js", percentage: 85, icon: "React" },
    { name: "React Native", percentage: 83, icon: "Mobile" },
    { name: "Next.js", percentage: 85, icon: "Next" },
    { name: "Node.js", percentage: 80, icon: "Node" },
    { name: "Express.js", percentage: 84, icon: "API" },
    { name: "MongoDB", percentage: 82, icon: "DB" },
    { name: "Redux Toolkit", percentage: 82, icon: "State" },
    { name: "Tailwind CSS", percentage: 86, icon: "UI" },
    { name: "JavaScript", percentage: 82, icon: "JS" },
  ],
  education: fallbackResume.education,
  experience: fallbackResume.experiences,
  stats: [
    {
      value: "2+",
      label: "Years Experience",
      icon: "Work",
      color: "from-primary to-secondary",
    },
    {
      value: "6+",
      label: "Projects Completed",
      icon: "Projects",
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "3+",
      label: "Freelance Clients",
      icon: "Clients",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "Open",
      label: "Availability",
      icon: "Status",
      color: "from-orange-500 to-red-500",
    },
  ],
};
