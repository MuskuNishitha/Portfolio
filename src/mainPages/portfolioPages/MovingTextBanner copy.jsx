// MovingTextBanner.jsx - Alternative with different speeds
import React from "react";
import { useTheme } from "@/components/ThemeProvider";

const MovingTextBanner = () => {
  const { isDarkMode } = useTheme();

  const bannerItems = [
    { icon: "fas fa-chart-line", text: "PIXELOR.COM" },
    { icon: "fas fa-chart-simple", text: "ANALYTICS & REPORTING" },
    { icon: "fas fa-chalkboard-user", text: "STRATEGY CONSULTING" },
    { icon: "fas fa-calendar-alt", text: "© 2025 PERSO" },
    { icon: "fas fa-bolt", text: "FUTURE-READY" }
  ];

  const renderBannerContent = () => (
    <>
      {bannerItems.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="mx-6 inline-flex items-center gap-2">
            <i className={item.icon} style={{ color: '#8750f7' }}></i>
            <span className="bg-gradient-to-r from-[#8750f7] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
              {item.text}
            </span>
          </span>
          <span className="mx-2" style={{ color: '#8750f7' }}>✦</span>
        </React.Fragment>
      ))}
      {bannerItems.map((item, idx) => (
        <React.Fragment key={`dup-${idx}`}>
          <span className="mx-6 inline-flex items-center gap-2">
            <i className={item.icon} style={{ color: '#8750f7' }}></i>
            <span className="bg-gradient-to-r from-[#8750f7] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
              {item.text}
            </span>
          </span>
          <span className="mx-2" style={{ color: '#8750f7' }}>✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <>
      {/* TOP BANNER - Moves Left → Right (25s) */}
      <div className="w-full overflow-hidden">
        <div 
          className="overflow-hidden whitespace-nowrap border-y py-4 transition-colors duration-300"
          style={{
            backgroundColor: isDarkMode ? 'rgba(17, 24, 32, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            borderColor: isDarkMode ? 'rgba(135, 80, 247, 0.3)' : 'rgba(135, 80, 247, 0.2)'
          }}
        >
          <div className="inline-block animate-marquee-left font-['Space_Grotesk'] text-xl md:text-2xl font-bold uppercase tracking-wider">
            {renderBannerContent()}
          </div>
        </div>
      </div>

      {/* BOTTOM BANNER - Moves Right → Left (20s - faster) */}
      <div className="w-full overflow-hidden mt-8">
        <div 
          className="overflow-hidden whitespace-nowrap border-y py-4 transition-colors duration-300"
          style={{
            backgroundColor: isDarkMode ? 'rgba(17, 24, 32, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            borderColor: isDarkMode ? 'rgba(135, 80, 247, 0.3)' : 'rgba(135, 80, 247, 0.2)'
          }}
        >
          <div className="inline-block animate-marquee-right font-['Space_Grotesk'] text-xl md:text-2xl font-bold uppercase tracking-wider">
            {renderBannerContent()}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee-left {
          animation: marqueeLeft 25s linear infinite;
          display: inline-block;
          min-width: max-content;
        }
        
        .animate-marquee-right {
          animation: marqueeRight 20s linear infinite;
          display: inline-block;
          min-width: max-content;
        }
      `}</style>
    </>
  );
};

export default MovingTextBanner;