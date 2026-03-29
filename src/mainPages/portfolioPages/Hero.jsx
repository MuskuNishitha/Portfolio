// Hero.jsx

"use client"
import Image from "next/image";
import Link from "next/link";
import Counter from "./Counter";
import { useTheme } from "@/components/ThemeProvider";

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-[100px] pb-16 md:pt-[120px] md:pb-20 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text-body)'
      }}
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-[length:40px_40px] md:bg-[length:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px)`
        }}
      />
      
      <div 
        className="absolute top-[-20%] right-[-30%] md:right-[-10%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full animate-float"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(135,80,247,0.18)' : 'rgba(135,80,247,0.1)'} 0%, transparent 70%)`
        }}
      />
      
      <div 
        className="absolute bottom-[-20%] left-[-30%] md:left-[-10%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(42,20,84,0.35)' : 'rgba(135,80,247,0.08)'} 0%, transparent 70%)`
        }}
      />
      
      {/* Background Text - Hidden on mobile for better performance */}
      <div 
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-russo text-[clamp(80px,12vw,280px)] whitespace-nowrap pointer-events-none select-none tracking-[-2px] md:tracking-[-4px]"
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px ${isDarkMode ? 'rgba(135,80,247,0.08)' : 'rgba(135,80,247,0.12)'}`
        }}
      >
        NISHITHA
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-[60px] items-center">
          {/* Profile Image - Now visible on mobile */}
          <div className="lg:hidden flex justify-center mb-8 animate-fade-up order-1">
            <div className="relative">
              {/* Decorative rings for mobile */}
              <div 
                className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed animate-spin-slow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ borderColor: 'rgba(135, 80, 247, 0.3)' }}
              />
              
              {/* Main image container */}
              <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] p-[3px] animate-pulse-glow">
                <div 
                  className="w-full h-full rounded-full overflow-hidden relative"
                  style={{ backgroundColor: 'var(--bg-3)' }}
                >
                  <Image
                    src="/assets/ProfileMain.jpeg"
                    alt="Musku Nishitha"
                    fill
                    priority
                    sizes="(max-width: 640px) 250px, 280px"
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            
            </div>
          </div>

          {/* Content - Order changes on mobile */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase mb-4 md:mb-5 animate-fade-left">
              <span className="w-6 md:w-8 h-0.5" style={{ backgroundColor: 'var(--primary)' }} />
              <span style={{ color: 'var(--primary-3)' }} className="text-[10px] md:text-xs">
                FULL STACK MERN & REACT NATIVE DEVELOPER
              </span>
            </div>
            
            <h1 
              className="text-[clamp(3px,5vw,73px)] font-extrabold mb-4 md:mb-6 animate-fade-left [animation-delay:0.15s] leading-tight"
              style={{ color: 'var(--text-heading)' }}
            >
              Hi, I'm{" "}
              <span className="gradient-text whitespace-nowrap">Musku Nishitha</span>
            </h1>
            
            <p 
              className="text-sm md:text-base leading-relaxed mb-6 md:mb-9 max-w-[460px] mx-auto lg:mx-0 animate-fade-left [animation-delay:0.3s] px-2 md:px-0"
              style={{ color: 'var(--text-body)' }}
            >
              Full-stack MERN & React Native developer with 2+ years of experience building scalable web and mobile applications. Skilled in Next.js, React.js, Redux Toolkit, Node.js, MongoDB, and Tailwind CSS, with a proven record of boosting user engagement by 25%+ and delivering projects on time.
            </p>

            {/* Tech Stack Pills - Scrollable on mobile if needed */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-9 justify-center lg:justify-start animate-fade-left [animation-delay:0.4s] max-w-full">
              {["React.js", "React Native", "Next.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS"].map((tech) => (
                <span 
                  key={tech} 
                  className="px-2.5 md:px-4 py-1.5 md:py-2 border rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'rgba(135, 80, 247, 0.2)',
                    color: 'var(--primary-3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(135, 80, 247, 0.1)' : 'rgba(135, 80, 247, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(135, 80, 247, 0.2)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 md:gap-5 flex-wrap justify-center lg:justify-start animate-fade-left [animation-delay:0.45s]">
              <a
                href="/Musku_Nishitha_2yrs Mern_Resume.pdf"
                download
                className="btn-primary text-sm md:text-base px-5 md:px-6 py-2.5 md:py-3"
              >
                Download CV ↓
              </a>
              <div className="flex items-center gap-2 md:gap-3">
                <a 
                  href="https://www.linkedin.com/in/musku-nishitha-7a535b36b/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  title="LinkedIn"
                >
                  in
                </a>
                <a 
                  href="https://github.com/MuskuNishitha" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  title="GitHub"
                >
                  ⌘
                </a>
                <a 
                  href="mailto:mnishithareddy8765@gmail.com" 
                  className="social-link w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                  title="Email"
                >
                  ✉
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Image - Hidden on mobile */}
          <div className="hidden lg:flex justify-center relative animate-fade-right [animation-delay:0.3s] order-2">
            <div 
              className="absolute w-[380px] xl:w-[470px] h-[380px] xl:h-[470px] rounded-full border border-dashed animate-spin-slow"
              style={{ borderColor: 'rgba(135, 80, 247, 0.3)' }}
            >
              <div className="absolute w-2.5 h-2.5 rounded-full top-[-5px] left-1/2 -translate-x-1/2" 
                style={{ backgroundColor: 'var(--primary)', boxShadow: '0 0 12px var(--primary)' }} 
              />
            </div>
            
            <div 
              className="absolute w-[430px] xl:w-[530px] h-[430px] xl:h-[530px] rounded-full border border-dashed animate-spin-slow-reverse"
              style={{ borderColor: 'rgba(135, 80, 247, 0.3)' }}
            >
              <div className="absolute w-2.5 h-2.5 rounded-full bottom-[-5px] left-1/2 -translate-x-1/2" 
                style={{ backgroundColor: 'var(--primary-3)', boxShadow: '0 0 12px var(--primary-3)' }} 
              />
            </div>

            <div className="w-[340px] xl:w-[420px] h-[340px] xl:h-[420px] rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] p-[3px] animate-pulse-glow">
              <div 
                className="w-full h-full rounded-full overflow-hidden relative"
                style={{ backgroundColor: 'var(--bg-3)' }}
              >
                <Image
                  src="/assets/ProfileMain.jpeg"
                  alt="Musku Nishitha"
                  fill
                  priority
                  sizes="(max-width: 1280px) 340px, 420px"
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <Counter />
      </div>
    </section>
  );
}