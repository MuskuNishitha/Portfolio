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
      className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-20 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text-body)'
      }}
    >
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-[length:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(135,80,247,0.04)' : 'rgba(135,80,247,0.06)'} 1px, transparent 1px)`
        }}
      />
      
      <div 
        className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full animate-float"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(135,80,247,0.18)' : 'rgba(135,80,247,0.1)'} 0%, transparent 70%)`
        }}
      />
      
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${isDarkMode ? 'rgba(42,20,84,0.35)' : 'rgba(135,80,247,0.08)'} 0%, transparent 70%)`
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-russo text-[clamp(120px,18vw,280px)] whitespace-nowrap pointer-events-none select-none tracking-[-4px]"
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px ${isDarkMode ? 'rgba(135,80,247,0.08)' : 'rgba(135,80,247,0.12)'}`
        }}
      >
        NISHITHA
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-[60px] items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase mb-5 animate-fade-left">
              <span className="w-8 h-0.5" style={{ backgroundColor: 'var(--primary)' }} />
              <span style={{ color: 'var(--primary-3)' }}>FULL STACK MERN & REACT NATIVE DEVELOPER</span>
            </div>
            
            <h1 
              className="text-[clamp(44px,6vw,76px)] font-extrabold mb-6 animate-fade-left [animation-delay:0.15s]"
              style={{ color: 'var(--text-heading)' }}
            >
              Hi, I'm{" "}
              <span className="gradient-text">Musku Nishitha</span>
            </h1>
            
            <p 
              className="text-base leading-relaxed mb-9 max-w-[460px] mx-auto lg:mx-0 animate-fade-left [animation-delay:0.3s]"
              style={{ color: 'var(--text-body)' }}
            >
              Full-stack MERN & React Native developer with 2+ years of experience building scalable web and mobile applications. Skilled in Next.js, React.js, Redux Toolkit, Node.js, MongoDB, and Tailwind CSS, with a proven record of boosting user engagement by 25%+ and delivering projects on time.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 mb-9 justify-center lg:justify-start animate-fade-left [animation-delay:0.4s]">
              {["React.js", "React Native", "Next.js", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS"].map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 border rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
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

            <div className="flex items-center gap-5 flex-wrap justify-center lg:justify-start animate-fade-left [animation-delay:0.45s]">
              <a
                href="/Musku_Nishitha_2yrs Mern_Resume.pdf"
                download
                className="btn-primary"
              >
                Download CV ↓
              </a>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/in/musku-nishitha-7a535b36b/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  title="LinkedIn"
                >
                  in
                </a>
                <a 
                  href="https://github.com/MuskuNishitha" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                  title="GitHub"
                >
                  ⌘
                </a>
                <a 
                  href="mailto:mnishithareddy8765@gmail.com" 
                  className="social-link"
                  title="Email"
                >
                  ✉
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hidden lg:flex justify-center relative animate-fade-right [animation-delay:0.3s]">
            <div 
              className="absolute w-[470px] h-[470px] rounded-full border border-dashed animate-spin-slow"
              style={{ borderColor: 'rgba(135, 80, 247, 0.3)' }}
            >
              <div className="absolute w-2.5 h-2.5 rounded-full top-[-5px] left-1/2 -translate-x-1/2" 
                style={{ backgroundColor: 'var(--primary)', boxShadow: '0 0 12px var(--primary)' }} 
              />
            </div>
            
            <div 
              className="absolute w-[530px] h-[530px] rounded-full border border-dashed animate-spin-slow-reverse"
              style={{ borderColor: 'rgba(135, 80, 247, 0.3)' }}
            >
              <div className="absolute w-2.5 h-2.5 rounded-full bottom-[-5px] left-1/2 -translate-x-1/2" 
                style={{ backgroundColor: 'var(--primary-3)', boxShadow: '0 0 12px var(--primary-3)' }} 
              />
            </div>

            <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] p-[3px] animate-pulse-glow">
              <div 
                className="w-full h-full rounded-full overflow-hidden relative"
                style={{ backgroundColor: 'var(--bg-3)' }}
              >
                <Image
                  src="/assets/ProfileMain.jpeg"
                  alt="Musku Nishitha"
                  fill
                  priority
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            {/* Experience Card */}
            <div 
              className="absolute top-[60px] left-[-30px] rounded-xl p-3 flex items-center gap-2.5 backdrop-blur-xl animate-float"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-2)'
              }}
            >
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-2xl font-extrabold" style={{ color: 'var(--primary-3)' }}>
                  2+
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Years Exp.</div>
              </div>
            </div>

            {/* Projects Card */}
            <div 
              className="absolute bottom-[80px] right-[-20px] rounded-xl p-3 flex items-center gap-2.5 backdrop-blur-xl animate-float [animation-delay:2s]"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-2)'
              }}
            >
              <span className="text-2xl">📱</span>
              <div>
                <div className="text-2xl font-extrabold" style={{ color: 'var(--primary-3)' }}>
                  5+
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Projects</div>
              </div>
            </div>
          </div>
        </div>
        <Counter />
      </div>
    </section>
  );
}