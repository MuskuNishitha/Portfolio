import React from "react";
import { useTheme } from "@/components/ThemeProvider";

const repeatItems = (items, copies = 2) =>
  Array.from({ length: copies }, (_, copyIndex) =>
    items.map((item, itemIndex) => ({
      id: `${copyIndex}-${itemIndex}`,
      text: item,
    }))
  ).flat();

const Spark = ({ outlined = false }) => (
  <span
    aria-hidden="true"
    className={`moving-banner-spark ${outlined ? "moving-banner-spark-outline" : ""}`}
  >
    <svg viewBox="0 0 24 24" className="moving-banner-spark-icon">
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
  const stack = Array.isArray(content?.techStack) ? content.techStack.slice(0, 5) : [];

  const topItems = [
    name,
    badge,
    "OPEN TO WORK",
    "2+ YEARS EXPERIENCE",
    ...stack.map((item) => item.toUpperCase()),
  ];

  const bottomItems = [
    "personal portfolio",
    "mern stack developer",
    "react native developer",
    "scalable web applications",
    "modern mobile apps",
  ];

  return {
    topItems: repeatItems(topItems, 3),
    bottomItems: repeatItems(bottomItems, 3),
  };
};

const MovingTextBanner = ({ content }) => {
  const { isDarkMode } = useTheme();
  const { topItems, bottomItems } = getBannerItems(content);

  return (
    <div className="moving-banner-shell">
      <div className="moving-banner-bleed">
        <div className="moving-banner-stage">
          <div className="moving-banner-ribbon moving-banner-ribbon-back">
            <div className="moving-banner-marquee moving-banner-marquee-back">
              <div className="moving-banner-track">
                {bottomItems.map((item) => (
                  <span key={item.id} className="moving-banner-chip moving-banner-chip-back">
                    <span className="text-[#000]">{item.text}</span>
                    <Spark />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="moving-banner-ribbon moving-banner-ribbon-front">
            <div className="moving-banner-marquee moving-banner-marquee-front">
              <div className="moving-banner-track">
                {topItems.map((item, index) => (
                  <span key={item.id} className="moving-banner-chip moving-banner-chip-front">
                    <span>{item.text}</span>
                    <Spark outlined={index % 2 === 1} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .moving-banner-shell {
          position: relative;
          width: 100%;
          margin-top: 2.5rem;
          padding: 2.5rem 0 1.5rem;
          overflow: hidden;
        }

        .moving-banner-bleed {
          position: relative;
          left: 50%;
          width: 100vw;
          margin-left: -50vw;
        }

        .moving-banner-stage {
          position: relative;
          height: 10.5rem;
          overflow: hidden;
        }

        .moving-banner-ribbon {
          position: absolute;
          left: 50%;
          width: 132vw;
          min-width: 1100px;
          transform-origin: center;
          overflow: hidden;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
        }

        .moving-banner-ribbon-back {
          top: 2.75rem;
          transform: translateX(-50%) rotate(-4.2deg);
          background: ${isDarkMode ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 255, 255, 0.96)"};
          color: var(--text-heading);
          z-index: 1;
          border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.05)"};
        }

        .moving-banner-ribbon-front {
          top: 1.4rem;
          transform: translateX(-50%) rotate(2.1deg);
          background: ${isDarkMode ? "rgba(8, 8, 8, 0.98)" : "rgba(17, 17, 17, 0.96)"};
          color: var(--primary);
          z-index: 2;
          border: 1px solid rgba(var(--primary-rgb), 0.2);
        }

        .moving-banner-marquee {
          display: flex;
          width: max-content;
          white-space: nowrap;
          will-change: transform;
        }

        .moving-banner-marquee-back {
          animation: movingBannerRight 26s linear infinite;
        }

        .moving-banner-marquee-front {
          animation: movingBannerLeft 22s linear infinite;
        }

        .moving-banner-track {
          display: flex;
          align-items: center;
        }

        .moving-banner-chip {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          padding: 1.1rem 0;
          margin-right: 2.75rem;
          font-family: var(--font-russo), "Russo One", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .moving-banner-chip-front {
          font-size: clamp(1.2rem, 1.8vw, 2rem);
          color: inherit;
        }

        .moving-banner-chip-back {
          font-size: clamp(1.15rem, 1.65vw, 1.9rem);
          color: var(--text-heading);
        }

        .moving-banner-spark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          line-height: 1;
          color: var(--primary);
        }

        .moving-banner-spark-icon {
          width: 1em;
          height: 1em;
        }

        .moving-banner-ribbon-back .moving-banner-spark {
          color: var(--primary);
        }

        .moving-banner-spark-outline {
          -webkit-text-stroke: 1.5px currentColor;
          color: transparent;
        }

        @keyframes movingBannerLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes movingBannerRight {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .moving-banner-shell {
            margin-top: 2rem;
            padding: 2rem 0 1rem;
          }

          .moving-banner-stage {
            height: 7.5rem;
          }

          .moving-banner-ribbon {
            width: 180vw;
            min-width: 860px;
          }

          .moving-banner-ribbon-back {
            top: 2.3rem;
            transform: translateX(-50%) rotate(-5.2deg);
          }

          .moving-banner-ribbon-front {
            top: 1.1rem;
            transform: translateX(-50%) rotate(3deg);
          }

          .moving-banner-chip {
            gap: 1.35rem;
            margin-right: 2rem;
            padding: 0.8rem 0;
          }

          .moving-banner-spark {
            font-size: 1.45rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MovingTextBanner;
