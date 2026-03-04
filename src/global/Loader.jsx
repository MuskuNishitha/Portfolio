"use client"
import React, { useEffect, useState } from 'react'

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style jsx>{`
        @keyframes loading {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .loading-text span {
          display: inline-block;
          animation: loading 1s infinite alternate;
        }
        .loading-text span:nth-child(1) { animation-delay: 0s; }
        .loading-text span:nth-child(2) { animation-delay: 0.1s; }
        .loading-text span:nth-child(3) { animation-delay: 0.2s; }
        .loading-text span:nth-child(4) { animation-delay: 0.3s; }
        .loading-text span:nth-child(5) { animation-delay: 0.4s; }
        .loading-text span:nth-child(6) { animation-delay: 0.5s; }
        .loading-text span:nth-child(7) { animation-delay: 0.6s; }
      `}</style>

      <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050709]">
        {/* SVG Wave Background */}
        <svg 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-full"
          style={{ fill: '#050709' }}
        >
          <path d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
        </svg>
        
        {/* Loading Text */}
        <div className="relative z-20">
          <div className="loading-text text-white text-xl font-[200] tracking-[15px] uppercase">
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loader