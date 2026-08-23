import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

const repeatItems = (items, copies = 2) =>
  Array.from({ length: copies }, (_, copyIndex) =>
    items.map((item, itemIndex) => ({
      id: `${copyIndex}-${itemIndex}`,
      text: item,
    }))
  ).flat();

const Spark = ({ outlined = false, animated = false }) => (
  <span
    aria-hidden="true"
    className={`inline-flex items-center justify-center text-2xl leading-none transition-all duration-500 ${
      outlined ? "text-transparent [-webkit-text-stroke:1.5px_currentColor]" : ""
    } ${animated ? "animate-pulse" : ""}`}
    style={{ color: outlined ? undefined : "var(--primary)" }}
  >
    <svg viewBox="0 0 24 24" className="w-[1em] h-[1em] transition-transform duration-300 group-hover:scale-110">
      <path
        d="M12 2.8 14.7 9.3 21.2 12l-6.5 2.7L12 21.2l-2.7-6.5L2.8 12l6.5-2.7L12 2.8Z"
        fill="currentColor"
      />
    </svg>
  </span>
);

const getBannerItems = (content) => {
  const name = (content?.name || "Musku Nishitha").toUpperCase();
  const badge = (content?.badge || "Full Stack Mern & React Native Developer").toUpperCase();
  const stack = Array.isArray(content?.techStack) ? content.techStack.slice(0, 6) : [];

  const topItems = [
    `🔥 ${name}`,
    badge,
    "💼 OPEN TO WORK",
    "📊 2+ YEARS",
    ...stack.map((item) => `⚡ ${item.toUpperCase()}`),
  ];

  const bottomItems = [
    "PORTFOLIO 2024",
    "MERN STACK",
    "REACT NATIVE",
    "WEB3 READY",
    "CLOUD NATIVE",
    "API EXPERT",
  ];

  return {
    topItems: repeatItems(topItems, 3),
    bottomItems: repeatItems(bottomItems, 3),
  };
};

const MovingTextBanner = ({ content }) => {
  const { isDarkMode } = useTheme();
  const { topItems, bottomItems } = getBannerItems(content);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full my-16 overflow-hidden group/banner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[200px] bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-r from-purple-500/10 via-primary/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Bottom Ribbon */}
        <div className="relative h-32 overflow-hidden mb-3">
          <div
            className={`absolute left-1/2 w-[150vw] min-w-[1300px] transform -translate-x-1/2 -rotate-3 top-8 overflow-hidden backdrop-blur-sm transition-all duration-700 ${
              isDarkMode 
                ? "bg-black/80 border border-white/10" 
                : "bg-white/90 border border-gray-200"
            } ${isHovered ? "shadow-2xl" : "shadow-xl"}`}
            style={{ zIndex: 1 }}
          >
            <div className={`animate-marquee-slow ${isHovered ? "pause-animation" : ""}`}>
              <div className="flex items-center py-4">
                {bottomItems.map((item) => (
                  <div
                    key={item.id}
                    className={`inline-flex items-center gap-5 mr-8 px-3 transition-all duration-300 ${
                      isDarkMode ? "hover:text-primary" : "hover:text-primary"
                    }`}
                  >
                    <span className="text-sm md:text-base font-bold tracking-wider font-mono uppercase whitespace-nowrap bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                      {item.text}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                    <Spark />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Ribbon with Glassmorphism */}
        <div className="relative h-32 overflow-hidden">
          <div
            className={`absolute left-1/2 w-[150vw] min-w-[1300px] transform -translate-x-1/2 rotate-2 top-2 overflow-hidden transition-all duration-700 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-primary/30 backdrop-blur-sm"
                : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-primary/30"
            } ${isHovered ? "shadow-2xl shadow-primary/20 scale-[1.02]" : "shadow-xl"}`}
            style={{ zIndex: 2 }}
          >
            <div className={`animate-marquee-fast ${isHovered ? "pause-animation" : ""}`}>
              <div className="flex items-center py-4">
                {topItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-5 mr-8 px-3 group cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-base md:text-lg lg:text-xl font-black tracking-tight font-sans uppercase whitespace-nowrap bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                      {item.text}
                    </span>
                    <div className="w-px h-7 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                    <Spark outlined={index % 2 === 1} animated={index % 3 === 0} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes marquee-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee-slow {
          animation: marquee-slow 30s linear infinite;
          width: max-content;
        }

        .animate-marquee-fast {
          animation: marquee-fast 24s linear infinite;
          width: max-content;
        }

        .pause-animation {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-marquee-slow {
            animation-duration: 25s;
          }
          .animate-marquee-fast {
            animation-duration: 20s;
          }
        }

        /* Smooth gradient transitions */
        .moving-banner-ribbon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default MovingTextBanner;