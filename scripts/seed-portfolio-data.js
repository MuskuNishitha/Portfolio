/* eslint-disable no-console */
const axios = require("axios");

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3111";

const profilePayload = {
  firstName: "Musku",
  lastName: "Nishitha",
  role: [
    "Frontend Developer",
    "React.js Developer",
    "MERN Stack Developer",
    "Mobile App Developer",
  ],
  tagline: "React & React Native Developer | Building Modern Apps",
  description:
    "I am a passionate React and React Native developer with 2 years of experience in building modern web and mobile applications. I have worked on admin panels and complete app development using technologies like React, Node.js, and MongoDB. I enjoy creating clean UI designs and improving user experience. I am always eager to learn new technologies and grow as a developer.",
  profileImage: "/assets/ProfileMain.jpeg",
  birthdate: "2003-08-11",
  resumeUrl: "/Musku_Nishitha_2yrs Mern_Resume.pdf",
  available: true,
  address: "Brahmanpally Kamareddy",
  Experience: "2",
  nationality: "Indian",
  completedProjects: "6",
  happycustomers: "3",
  languages: ["English", "Telugu", "Hindi"],
  email: "mnishithareddy8765@gmail.com",
  phone: "7416264657",
  linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b/",
  github: "https://github.com/MuskuNishitha",
  freelance: true,
  socialLinks: {
    github: "https://github.com/MuskuNishitha",
    linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b/",
    instagram: "mnishithareddy8765@gmail.com",
  },
};

const worksPayload = [
  {
    title: "EWShopping",
    shortDescription:
      "Full-scale multi-vendor e-commerce platform with customer website, admin panel, seller panel, and mobile app.",
    description:
      "Built a Next.js customer website, admin and seller dashboards, and a React Native mobile app. Improved SEO, performance, real-time updates, and production stability for a multi-vendor commerce workflow.",
    techStack: [
      "Next.js",
      "React.js",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
    ],
    liveUrl: "https://ewshopping-demo.vercel.app",
    githubUrl: "https://github.com/MuskuNishitha/ewshopping",
    repoUrl: "https://github.com/MuskuNishitha/ewshopping",
    startDate: "2024-06-01",
    endDate: null,
    images: ["/assets/projects/Ewshooping.png"],
    category: "ecommerce",
  },
  {
    title: "KiranaWorld",
    shortDescription:
      "Grocery e-commerce platform enabling online orders of fruits, vegetables, and household essentials.",
    description:
      "Created a responsive customer website, admin tools, and a React Native app with scalable backend services, smooth checkout flows, and inventory management support.",
    techStack: [
      "React.js",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Redux Toolkit",
    ],
    liveUrl: "https://kiranaworld-demo.vercel.app",
    githubUrl: "https://github.com/MuskuNishitha/kiranaworld",
    repoUrl: "https://github.com/MuskuNishitha/kiranaworld",
    startDate: "2025-04-01",
    endDate: null,
    images: ["/assets/projects/KiranaWorld.png"],
    category: "ecommerce",
  },
  {
    title: "POT Dashboard",
    shortDescription:
      "Mobile dashboard for visualising construction project metrics including cost, manpower, and progress.",
    description:
      "Developed a dashboard focused on charts, mobile-first reporting, and performance-minded data visualisation for project tracking and planning.",
    techStack: [
      "React Native",
      "Redux Toolkit",
      "Chart.js",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    liveUrl: "https://pot-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/MuskuNishitha/pot-dashboard",
    repoUrl: "https://github.com/MuskuNishitha/pot-dashboard",
    startDate: "2025-11-01",
    endDate: "2026-01-31",
    images: ["/assets/projects/POT.png"],
    category: "dashboard",
  },
  {
    title: "Primera Dental Hub",
    shortDescription:
      "Specialised dental e-commerce platform for products, instruments, and equipment.",
    description:
      "Delivered a performance-focused storefront with product flows, admin operations, optimized listings, and secure role-based access patterns.",
    techStack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://primeradental-demo.vercel.app",
    githubUrl: "https://github.com/MuskuNishitha/primeradental",
    repoUrl: "https://github.com/MuskuNishitha/primeradental",
    startDate: "2025-07-01",
    endDate: null,
    images: ["/assets/projects/Primeradental.png"],
    category: "ecommerce",
  },
];

const experiencesPayload = [
  {
    title: "MERN Stack & React Native Developer",
    startDate: "2024-06-01",
    endDate: null,
    location: "AI Apps Hub Private Limited, Hyderabad",
    details: [
      "Delivered scalable web and mobile applications",
      "Optimized backend APIs to reduce response time",
      "Built secure authentication and file management using JWT and REST APIs",
      "Built responsive UIs with React, React Native, Next.js, and Redux Toolkit",
      "Integrated Firebase Cloud Messaging and Google Maps API",
    ],
    type: "Work",
  },
  {
    title: "Intern",
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    location: "AI Apps Hub Private Limited, Hyderabad",
    details: [
      "Developed responsive components using HTML, CSS, and JavaScript",
      "Supported API integration and backend development using Node.js and Express.js",
      "Debugged UI and functional issues to improve stability",
      "Worked in Agile workflows with real delivery ownership",
    ],
    type: "Work",
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    startDate: "2020-08-01",
    endDate: "2023-06-30",
    location: "A.V. College of Arts, Science & Commerce, Hyderabad",
    details: ["CGPA: 8.42/10"],
    type: "Education",
  },
  {
    title: "Intermediate (MPC)",
    startDate: "2018-08-01",
    endDate: "2020-06-30",
    location: "Sri Aryabhata Junior College, Kamareddy",
    details: ["CGPA: 9.2/10"],
    type: "Education",
  },
  {
    title: "Full Stack Java Developer",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    location: "JSPiders, Punjagutta",
    details: ["Award"],
    type: "Certification",
  },
  {
    title: "Best Performer of the Month",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    location: "AI Apps Hub Private Limited",
    details: ["Award"],
    type: "Certification",
  },
  {
    title: "Zero Critical Bugs Achievement",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    location: "AI Apps Hub Private Limited",
    details: ["Award"],
    type: "Certification",
  },
  {
    title: "95%+ Task Completion",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    location: "AI Apps Hub Private Limited",
    details: ["Award"],
    type: "Certification",
  },
];

const skillsPayload = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", percentage: 92, priority: 1, icon: "React" },
      { name: "Next.js", percentage: 85, priority: 2, icon: "Next" },
      { name: "JavaScript", percentage: 89, priority: 3, icon: "JS" },
      { name: "Tailwind CSS", percentage: 90, priority: 4, icon: "UI" },
      { name: "Redux Toolkit", percentage: 88, priority: 5, icon: "State" },
    ],
  },
  {
    category: "Mobile",
    skills: [
      { name: "React Native", percentage: 88, priority: 1, icon: "Mobile" },
      { name: "Firebase", percentage: 80, priority: 2, icon: "Cloud" },
      { name: "Google Maps API", percentage: 78, priority: 3, icon: "Map" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", percentage: 86, priority: 1, icon: "Node" },
      { name: "Express.js", percentage: 84, priority: 2, icon: "API" },
      { name: "MongoDB", percentage: 82, priority: 3, icon: "DB" },
    ],
  },
];

async function getData(path) {
  const response = await axios.get(`${API_BASE_URL}${path}`);
  return response.data?.data;
}

async function postAll(path, items) {
  for (const item of items) {
    await axios.post(`${API_BASE_URL}${path}`, item);
  }
}

async function seed() {
  console.log(`Seeding portfolio data into ${API_BASE_URL}`);

  const profile = await getData("/api/v1/profiles/main").catch(() => null);
  if (profile?._id) {
    await axios.put(`${API_BASE_URL}/api/v1/profiles/${profile._id}`, profilePayload);
    console.log("Updated main profile.");
  } else {
    await axios.post(`${API_BASE_URL}/api/v1/profiles`, profilePayload);
    console.log("Created main profile.");
  }

  const works = await getData("/api/v1/works?limit=50");
  if (!Array.isArray(works) || works.length === 0) {
    await postAll("/api/v1/works", worksPayload);
    console.log(`Inserted ${worksPayload.length} works.`);
  } else {
    console.log(`Skipped works. Existing count: ${works.length}`);
  }

  const experiences = await getData("/api/v1/experiences");
  if (!Array.isArray(experiences) || experiences.length === 0) {
    await postAll("/api/v1/experiences", experiencesPayload);
    console.log(`Inserted ${experiencesPayload.length} experiences.`);
  } else {
    console.log(`Skipped experiences. Existing count: ${experiences.length}`);
  }

  const skills = await getData("/api/v1/skills");
  if (!Array.isArray(skills) || skills.length === 0) {
    await postAll("/api/v1/skills", skillsPayload);
    console.log(`Inserted ${skillsPayload.length} skill categories.`);
  } else {
    console.log(`Skipped skills. Existing count: ${skills.length}`);
  }

  const [finalWorks, finalExperiences, finalSkills] = await Promise.all([
    getData("/api/v1/works?limit=50"),
    getData("/api/v1/experiences"),
    getData("/api/v1/skills"),
  ]);

  console.log(
    JSON.stringify(
      {
        works: Array.isArray(finalWorks) ? finalWorks.length : 0,
        experiences: Array.isArray(finalExperiences) ? finalExperiences.length : 0,
        skills: Array.isArray(finalSkills) ? finalSkills.length : 0,
      },
      null,
      2,
    ),
  );
}

seed().catch((error) => {
  console.error("Seed failed:", error.response?.data || error.message);
  process.exit(1);
});
