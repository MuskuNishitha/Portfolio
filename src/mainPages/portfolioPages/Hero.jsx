import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-[120px] pb-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(135,80,247,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(135,80,247,0.04)_1px,transparent_1px)] bg-[length:60px_60px]" />
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(135,80,247,0.18)_0%,transparent_70%)] rounded-full animate-float" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(42,20,84,0.35)_0%,transparent_70%)] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-russo text-[clamp(120px,18vw,280px)] text-transparent [-webkit-text-stroke:1px_rgba(135,80,247,0.08)] whitespace-nowrap pointer-events-none select-none tracking-[-4px]">
        NISHITHA
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-[60px] items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[2px] uppercase text-primary-3 mb-5 animate-fade-left">
              <span className="w-8 h-0.5 bg-primary" />MERN STACK & REACT NATIVE DEVELOPER
            </div>
            <h1 className="text-[clamp(44px,6vw,76px)] font-extrabold text-white leading-[1.08] mb-6 animate-fade-left [animation-delay:0.15s]">
              Hi, I'm{" "}
              <span className="gradient-text">Musku Nishitha</span>
            </h1>
            <p className="text-base text-text-body leading-relaxed mb-9 max-w-[460px] mx-auto lg:mx-0 animate-fade-left [animation-delay:0.3s]">
              MERN Stack & React Native Developer with 2 years of experience building scalable web and Android mobile applications. Specialized in React.js, Next.js, Node.js, and MongoDB.
            </p>
            
            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 mb-9 justify-center lg:justify-start animate-fade-left [animation-delay:0.4s]">
              {["React.js", "React Native", "Next.js", "Node.js", "MongoDB", "Redux"].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-bg-card border border-primary/20 rounded-full text-sm text-primary-3 font-medium hover:border-primary hover:bg-primary/10 transition-all">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-5 flex-wrap justify-center lg:justify-start animate-fade-left [animation-delay:0.45s]">
              <Link href="#" className="btn-primary">
                Download CV ↓
              </Link>
              <div className="flex items-center gap-3">
                <a href="#" className="social-link" title="LinkedIn">
                  in
                </a>
                <a href="#" className="social-link" title="GitHub">
                  ⌘
                </a>
                <a href="#" className="social-link" title="Email">
                  ✉
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="hidden lg:flex justify-center relative animate-fade-right [animation-delay:0.3s]">
            <div className="absolute w-[470px] h-[470px] rounded-full border border-dashed border-primary/30 animate-spin-slow">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-primary top-[-5px] left-1/2 -translate-x-1/2 shadow-[0_0_12px_var(--primary)]" />
            </div>
            <div className="absolute w-[530px] h-[530px] rounded-full border border-dashed border-primary/30 animate-spin-slow-reverse">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-primary-3 bottom-[-5px] left-1/2 -translate-x-1/2 shadow-[0_0_12px_var(--primary-3)]" />
            </div>

            <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-r from-primary to-secondary p-[3px] animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-bg-3 overflow-hidden relative">
                <Image
                  src="/assets/ProfileMain.jpeg"
                  alt="Musku Nishitha"
                  fill
                  priority
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            
            {/* Experience Card - Updated with actual experience */}
            <div className="absolute top-[60px] left-[-30px] bg-bg-card border border-border-2 rounded-xl p-3 flex items-center gap-2.5 backdrop-blur-xl animate-float">
              <span className="text-2xl">💼</span>
              <div>
                <div className="text-2xl font-extrabold text-primary-3">
                  2+
                </div>
                <div className="text-[11px] text-text-muted">Years Exp.</div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="absolute bottom-[80px] right-[-20px] bg-bg-card border border-border-2 rounded-xl p-3 flex items-center gap-2.5 backdrop-blur-xl animate-float [animation-delay:2s]">
              <span className="text-2xl">📱</span>
              <div>
                <div className="text-2xl font-extrabold text-primary-3">
                  5+
                </div>
                <div className="text-[11px] text-text-muted">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts - Updated with actual data from resume */}
        <div className="mt-[70px] pt-[50px] border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
          {[
            { num: "2+", text: "Years of\nExperience", icon: "⏳" },
            { num: "5+", text: "Projects\nCompleted", icon: "🚀" },
            { num: "40%", text: "API Response\nImprovement", icon: "⚡" },
            { num: "95%", text: "On-Time\nDelivery", icon: "🎯" },
          ].map((fact, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-6 bg-bg-card border border-border rounded-xl transition-all hover:border-primary hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(135,80,247,0.2)] group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{fact.icon}</span>
              <div>
                <div className="font-russo text-3xl text-primary-3 leading-none whitespace-nowrap">
                  {fact.num}
                </div>
                <div className="text-xs text-text-muted whitespace-pre-line leading-relaxed">
                  {fact.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}