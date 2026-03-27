'use client'

import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const Counter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className='mt-20'>
      <section>
        <div>
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Years of Experience */}
              <div className="flex flex-col sm:flex-row items-center justify-center p-7 lg:p-8 rounded-xl transform transition-all duration-500 hover:scale-105 hover:border-primary cursor-pointer group bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-[0.06] rounded-xl" />
                <div className="number text-3xl md:text-7xl font-bold text-heading relative">
                  {isVisible && <CountUp end={2} duration={2.5} />}
                </div>
                <div className="text text-body text-center sm:text-left sm:ml-3 relative">
                  Years of <br />Experience
                </div>
              </div>

              {/* Projects Completed */}
              <div className="flex flex-col sm:flex-row items-center justify-center p-7 lg:p-8 rounded-xl transform transition-all duration-500 hover:scale-105 hover:border-primary cursor-pointer group bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-[0.06] rounded-xl" />
                <div className="number text-3xl md:text-7xl font-bold text-heading relative">
                  {isVisible && <CountUp end={4} duration={2.5} />}+
                </div>
                <div className="text text-body text-center sm:text-left sm:ml-3 relative">
                  Project <br />Completed
                </div>
              </div>

              {/* Happy Clients */}
              <div className="flex flex-col sm:flex-row items-center justify-center p-7 lg:p-8 rounded-xl transform transition-all duration-500 hover:scale-105 hover:border-primary cursor-pointer group bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-[0.06] rounded-xl" />
                <div className="number text-3xl md:text-7xl font-bold text-heading relative">
                  {isVisible && <CountUp end={3} duration={2.5} />} +
                </div>
                <div className="text text-body text-center sm:text-left sm:ml-3 relative">
                  Happy <br />Clients
                </div>
              </div>

              {/* Awards Won */}
              <div className="flex flex-col sm:flex-row items-center justify-center p-7 lg:p-8 rounded-xl transform transition-all duration-500 hover:scale-105 hover:border-primary cursor-pointer group bg-card border border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-[0.06] rounded-xl" />
                <div className="number text-3xl md:text-7xl font-bold text-heading relative">
                  {isVisible && <CountUp end={1} duration={2.5} />}
                </div>
                <div className="text text-body text-center sm:text-left sm:ml-3 relative">
                  Awards <br />Won
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Counter;