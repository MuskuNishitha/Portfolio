export const fallbackHero = {
  badge: "FULL STACK MERN & REACT NATIVE DEVELOPER",
  name: "Musku Nishitha",
  headline: "Hi, I'm",
  summary:
    "Full-stack MERN & React Native developer with 2+ years of experience building scalable web and mobile apps, optimising performance, and delivering projects on time.",
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
  resumeUrl: "/Musku_Nishitha_2yrs Mern_Resume.pdf",
  profileImageUrl: "/assets/ProfileMain.jpeg",
  socials: {
    linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b/",
    github: "https://github.com/MuskuNishitha",
    email: "mailto:mnishithareddy8765@gmail.com",
  },
};

export const fallbackPortfolio = {
  categories: [
    { id: "all", name: "All Work" },
    { id: "ecommerce", name: "Web Development" },
    { id: "mobile", name: "Applications" },
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
        "Full-scale multi-vendor e-commerce platform with customer website, admin panel, seller panel, and mobile app.",
      features: [
        "Next.js customer website with improved SEO and performance",
        "Admin & Seller dashboards with React and Tailwind CSS",
        "Cross-platform mobile app with React Native",
        "Firebase for real-time updates",
        "Production deployment with high uptime",
      ],
      tech: [
        "Next.js",
        "React.js",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Firebase",
      ],
      liveLink: "https://ewshopping-demo.vercel.app",
      githubLink: "https://github.com/MuskuNishitha/ewshopping",
      challenges:
        "Implementing real-time inventory sync across multiple vendors and platforms.",
      solution:
        "Used realtime updates + optimised DB queries to keep inventory accurate and fast.",
    },
    {
      id: 2,
      title: "KiranaWorld",
      category: "ecommerce",
      subcategory: "Web Development",
      period: "Apr 2025 - Present",
      image: "/assets/projects/KiranaWorld.png",
      description:
        "Grocery e-commerce platform enabling online orders of fruits, vegetables, and household essentials.",
      features: [
        "Responsive customer website with React and Tailwind CSS",
        "Admin panel for inventory and order management",
        "Cross-platform mobile app with React Native",
        "Scalable backend with Node.js, Express.js, and MongoDB",
        "Smooth checkout across devices",
      ],
      tech: [
        "React.js",
        "React Native",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Redux Toolkit",
      ],
      liveLink: "https://kiranaworld-demo.vercel.app",
      githubLink: "https://github.com/MuskuNishitha/kiranaworld",
      challenges:
        "Managing inventory updates and preventing overselling during peak hours.",
      solution:
        "Added inventory checks with caching + safer updates during checkout.",
    },
    {
      id: 3,
      title: "POT Dashboard",
      category: "dashboard",
      subcategory: "Dashboard",
      period: "Nov 2025 - Jan 2026",
      image: "/assets/projects/POT.png",
      description:
        "Mobile dashboard for visualising construction project metrics including cost, manpower, and progress.",
      features: [
        "Charts and graphs for quick decision-making",
        "Responsive UI for mobile and tablet",
        "State management with Redux Toolkit",
        "Real-time-ish visualisation patterns",
        "Export-ready reporting",
      ],
      tech: [
        "React Native",
        "Redux Toolkit",
        "Chart.js",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      liveLink: "https://pot-dashboard-demo.vercel.app",
      githubLink: "https://github.com/MuskuNishitha/pot-dashboard",
      challenges: "Keeping chart updates smooth with large datasets on mobile.",
      solution:
        "Used aggregation and memoisation to reduce render work and payload size.",
    },
    {
      id: 4,
      title: "Primera Dental Hub",
      category: "ecommerce",
      subcategory: "Web Development",
      period: "Jul 2025 - Present",
      image: "/assets/projects/Primeradental.png",
      description:
        "Specialised dental e-commerce platform for products, instruments, and equipment.",
      features: [
        "Next.js customer website with performance-first pages",
        "Admin workflow for products and orders",
        "Optimised search and listing UX",
        "Secure auth patterns and role-based access",
      ],
      tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB"],
      liveLink: "https://primeradental-demo.vercel.app",
      githubLink: "https://github.com/MuskuNishitha/primeradental",
      challenges: "Handling catalogue scale and fast search.",
      solution: "Improved indexing and query patterns for quick results.",
    },
  ],
};

export const fallbackResume = {
  experiences: [
    {
      time: "Jun 2024 - Present",
      title: "MERN Stack & React Native Developer",
      place:
        "AI Apps Hub Private Limited (formerly Dexterous Technology), Hyderabad",
      achievements: [
        "Delivered scalable web and mobile applications",
        "Optimised backend APIs to reduce response time",
        "Built secure authentication and file management using JWT + REST APIs",
        "Built responsive UIs with React, React Native, Next.js, and Redux Toolkit",
        "Integrated Firebase Cloud Messaging and Google Maps API",
      ],
    },
    {
      time: "Apr 2024 - May 2024",
      title: "Intern",
      place:
        "AI Apps Hub Private Limited (formerly Dexterous Technology), Hyderabad",
      achievements: [
        "Developed responsive components using HTML, CSS, and JavaScript",
        "Supported API integration and backend development using Node.js and Express.js",
        "Debugged UI/functional issues to improve stability",
        "Worked in Agile workflows with real delivery ownership",
      ],
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
    {
      title: "Best Performer of the Month",
      issuer: "AI Apps Hub Private Limited",
      year: "2024",
      icon: "🏆",
    },
    {
      title: "Zero Critical Bugs Achievement",
      issuer: "AI Apps Hub Private Limited",
      year: "2024",
      icon: "🐛",
    },
    {
      title: "95%+ Task Completion",
      issuer: "AI Apps Hub Private Limited",
      year: "2024",
      icon: "✅",
    },
  ],
};

export const fallbackSettings = {
  defaultTheme: "dark", // "dark" | "light"
  defaultPrimaryColor: "purple",
};
