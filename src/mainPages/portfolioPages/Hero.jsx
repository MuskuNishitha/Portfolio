// Hero.jsx - Clean version with simple hover effects

"use client";
import Image from "next/image";
import Counter from "./Counter";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { fetchHeroContent } from "@/lib/publicApi";
import MovingTextBanner from "./MovingTextBanner";
import Link from "next/link";

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default/fallback content in case API fails
  const defaultContent = {
    name: "Nishitha",
    badge: "Welcome to my portfolio",
    headline: "Hi, I'm",
    summary:
      "Full-Stack Developer specializing in MERN stack with 2+ years of experience building scalable web applications.",
    profileImageUrl: "/assets/ProfileMain.jpeg",
    resumeUrl: "/Musku_Nishitha_2_Y.OE_Mernstack.pdf",
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "TypeScript",
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/musku-nishitha-7a535b36b",
      github: "https://github.com/MuskuNishitha",
      email: "mailto:mnishithareddy8765@gmail.com",
    },
  };

  useEffect(() => {
    let cancelled = false;

    const loadHeroContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchHeroContent();

        if (!cancelled) {
          if (data && typeof data === "object") {
            setContent({
              name: data.name || defaultContent.name,
              badge: data.badge || defaultContent.badge,
              headline: data.headline || defaultContent.headline,
              summary: data.summary || defaultContent.summary,
              profileImageUrl:
                data.profileImageUrl || defaultContent.profileImageUrl,
              resumeUrl: data.resumeUrl || defaultContent.resumeUrl,
              techStack:
                Array.isArray(data.techStack) && data.techStack.length
                  ? data.techStack
                  : defaultContent.techStack,
              socials: {
                linkedin:
                  data.socials?.linkedin || defaultContent.socials.linkedin,
                github: data.socials?.github || defaultContent.socials.github,
                email: data.socials?.email || defaultContent.socials.email,
              },
            });
          } else {
            setContent(defaultContent);
            console.warn("Invalid hero content received:", data);
          }
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch hero content:", err);
          setError(err.message || "Failed to load hero content");
          setContent(defaultContent);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHeroContent();

    return () => {
      cancelled = true;
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <section
        id="home"
        className="min-h-[calc(100vh-96px)] flex items-start relative overflow-hidden pt-[100px] pb-16 md:pt-[120px] md:pb-20 transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-body)",
        }}
      >
        <div className="container-custom relative z-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4" style={{ color: "var(--text-muted)" }}>
                Loading portfolio...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && !content) {
    return (
      <section
        id="home"
        className="min-h-[calc(100vh-96px)] flex items-start relative overflow-hidden pt-[100px] pb-16 md:pt-[120px] md:pb-20 transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text-body)",
        }}
      >
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-heading)" }}
            >
              Unable to Load Content
            </h3>
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <section
      className="min-h-[calc(100vh-96px)] flex items-start relative overflow-hidden pt-[100px] pb-16 md:pt-[120px] md:pb-20 transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-body)",
      }}
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-[length:40px_40px] md:bg-[length:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? "rgba(135,80,247,0.04)" : "rgba(135,80,247,0.06)"} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? "rgba(135,80,247,0.04)" : "rgba(135,80,247,0.06)"} 1px, transparent 1px)`,
        }}
      />
      <div
        className="absolute top-[-20%] right-[-30%] md:right-[-10%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full animate-float"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? "rgba(135,80,247,0.18)" : "rgba(135,80,247,0.1)"} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[-30%] md:left-[-10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? "rgba(42,20,84,0.35)" : "rgba(135,80,247,0.08)"} 0%, transparent 70%)`,
        }}
      />

      {/* Background Text */}
      <div
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-russo text-[clamp(80px,12vw,280px)] whitespace-nowrap pointer-events-none select-none tracking-[-2px] md:tracking-[-4px]"
        style={{
          color: "transparent",
          WebkitTextStroke: `1px ${isDarkMode ? "rgba(135,80,247,0.08)" : "rgba(135,80,247,0.12)"}`,
        }}
      >
        {content.name?.toUpperCase() || "NISHITHA"}
      </div>

      <div>
        <div className="container relative z-10 px-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-[60px] items-center">
            {/* Mobile Image - Simple hover effect */}
            <div className="lg:hidden flex justify-center mb-8 animate-fade-up order-1">
              <div className="relative group">
                <div
                  className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ borderColor: "rgba(135, 80, 247, 0.3)" }}
                />

                <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] p-[3px] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2">
                  <div
                    className="w-full h-full rounded-full overflow-hidden relative"
                    style={{ backgroundColor: "var(--bg-3)" }}
                  >
                    {content.profileImageUrl && (
                      <Image
                        src={content.profileImageUrl}
                        alt={content.name || "Profile"}
                        fill
                        priority
                        sizes="(max-width: 640px) 250px, 280px"
                        className="object-cover rounded-full transition-all duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase mb-4 md:mb-5 animate-fade-left">
                <span
                  className="w-6 md:w-8 h-0.5"
                  style={{ backgroundColor: "var(--primary)" }}
                />
                <span
                  style={{ color: "var(--primary-3)" }}
                  className="text-[10px] md:text-xs"
                >
                  {content.badge || "Welcome"}
                </span>
              </div>

              <h1
                className="text-[clamp(38px,5vw,73px)] font-extrabold mb-4 md:mb-6 animate-fade-left [animation-delay:0.15s] leading-tight"
                style={{ color: "var(--text-heading)" }}
              >
                {content.headline || "Hi, I'm"}{" "}
                <span className="gradient-text whitespace-nowrap">
                  {content.name || "Nishitha"}
                </span>
              </h1>

              <p
                className="text-sm md:text-base leading-relaxed mb-6 md:mb-9 max-w-[460px] mx-auto lg:mx-0 animate-fade-left [animation-delay:0.3s] px-2 md:px-0"
                style={{ color: "var(--text-body)" }}
              >
                {content.summary ||
                  "Full-Stack Developer specializing in MERN stack with 2+ years of experience."}
              </p>

              {/* Tech Stack Pills */}
              {content.techStack && content.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-9 justify-center lg:justify-start animate-fade-left [animation-delay:0.4s] max-w-full">
                  {content.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 md:px-4 py-1.5 md:py-2 border rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                      style={{
                        backgroundColor: "var(--bg-card)",
                        borderColor: "rgba(135, 80, 247, 0.2)",
                        color: "var(--primary-3)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--primary)";
                        e.currentTarget.style.backgroundColor = isDarkMode
                          ? "rgba(135, 80, 247, 0.1)"
                          : "rgba(135, 80, 247, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(135, 80, 247, 0.2)";
                        e.currentTarget.style.backgroundColor = "var(--bg-card)";
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 md:gap-5 flex-wrap justify-center lg:justify-start animate-fade-left [animation-delay:0.45s]">
                {content.resumeUrl && (
                  <a
                    href={content.resumeUrl}
                    download="Musku_Nishitha_Resume.pdf"
                    className="btn-primary text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3"
                  >
                    Download CV
                  </a>
                )}
                <div className="flex items-center gap-2 md:gap-3">
                  {content.socials?.linkedin && (
                    <a
                      href={content.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                      title="LinkedIn"
                    >
                      <FiLinkedin className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                  {content.socials?.github && (
                    <a
                      href={content.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                      title="GitHub"
                    >
                      <FiGithub className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                  {content.socials?.email && (
                    <a
                      href={content.socials.email}
                      className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                      title="Email"
                    >
                      <FiMail className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  )}
                </div>
                <Link
                  href="/devboost-ai"
                  className="px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                    color: "#ffffff",
                    boxShadow: `0 4px 15px rgba(135, 80, 247, 0.3)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 6px 20px rgba(135, 80, 247, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 4px 15px rgba(135, 80, 247, 0.3)`;
                  }}
                >
                  🚀 Try DevBoost AI
                </Link>
              </div>
            </div>

            {/* Desktop Image - Clean simple hover effect */}
            <div className="hidden lg:flex justify-center relative animate-fade-right [animation-delay:0.3s] order-2 group">
              {/* Simple rotating ring */}
              <div
                className="absolute w-[380px] xl:w-[470px] h-[380px] xl:h-[470px] rounded-full border border-dashed animate-spin-slow"
                style={{ borderColor: "rgba(135, 80, 247, 0.3)" }}
              >
                <div
                  className="absolute w-2.5 h-2.5 rounded-full top-[-5px] left-1/2 -translate-x-1/2"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 0 12px var(--primary)",
                  }}
                />
              </div>

              {/* Main image - Just scale and lift on hover */}
              <div className="w-[340px] xl:w-[420px] h-[340px] xl:h-[420px] rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] p-[3px] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-3 cursor-pointer">
                <div
                  className="w-full h-full rounded-full overflow-hidden relative transition-all duration-300 group-hover:scale-102"
                  style={{ backgroundColor: "var(--bg-3)" }}
                >
                  {content.profileImageUrl && (
                    <Image
                      src={content.profileImageUrl}
                      alt={content.name || "Profile"}
                      fill
                      priority
                      sizes="(max-width: 1280px) 340px, 420px"
                      className="object-cover rounded-full transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Counter />
          <MovingTextBanner content={content} />
        </div>
      </div>
    </section>
  );
}