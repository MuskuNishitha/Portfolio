"use client"

import React, { useState, useEffect } from 'react';
import { 
  FiMail, 
  FiArrowRight, 
  FiArrowUp,
  FiMenu,
  FiX 
} from 'react-icons/fi';
import { 
  FaGraduationCap, 
  FaBriefcase,
  FaLongArrowAltRight 
} from 'react-icons/fa';
import { 
  PiGraduationCap, 
  PiSuitcase 
} from 'react-icons/pi';
import { 
  IoArrowForward 
} from 'react-icons/io5';
import { 
  HiOutlineMail 
} from 'react-icons/hi';

// Import images (you'll need to place these in your src/assets folder)
// import logo from './assets/img/logo/logo.png';
// import breadcrumbBg from './assets/img/breadcrumb/breadcrumb-bg.jpg';
// import figmaIcon from './assets/img/icons/figma.svg';
// import sketchIcon from './assets/img/icons/sketch.svg';
// import xdIcon from './assets/img/icons/xd.svg';
// import wpIcon from './assets/img/icons/wp.svg';
// import reactIcon from './assets/img/icons/react.svg';
// import jsIcon from './assets/img/icons/js.svg';

const AboutUs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initialize Wow.js for animations
    // if (typeof window !== 'undefined') {
    //   const WOW = require('wowjs');
    //   new WOW.WOW().init();
    // }

    // Initialize Odometer for counters
    const odometers = document.querySelectorAll('.odometer');
    odometers.forEach((odometer) => {
      const count = odometer.getAttribute('data-count');
      odometer.innerHTML = count;
    });

    // Handle scroll events
    const handleScroll = () => {
      // Sticky header
      setIsSticky(window.scrollY > 100);

      // Scroll to top button visibility and progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Education data
  const educationData = [
    { year: '2023 - 2024', title: 'Programming course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
  ];

  // Experience data
  const experienceData = [
    { year: '2023 - 2024', title: 'Programming course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
    { year: '2023 - 2024', title: 'Graphics Design Course', institution: 'Harvard University' },
  ];

  // Skills data
  // const skillsData = [
  //   { icon: figmaIcon, name: 'Figma', percent: '92%', delay: '.3s' },
  //   { icon: sketchIcon, name: 'Sketch', percent: '80%', delay: '.4s' },
  //   { icon: xdIcon, name: 'XD', percent: '85%', delay: '.5s' },
  //   { icon: wpIcon, name: 'WordPress', percent: '99%', delay: '.6s' },
  //   { icon: reactIcon, name: 'React', percent: '89%', delay: '.7s' },
  //   { icon: jsIcon, name: 'JavaScript', percent: '93%', delay: '.8s' },
  // ];

  // Counter data
  const counterData = [
    { count: '14', label: 'Years of', sublabel: 'Experience', delay: '.3s' },
    { count: '50', plus: '+', label: 'Project', sublabel: 'Completed', delay: '.4s' },
    { count: '1.5', suffix: 'K', label: 'Happy', sublabel: 'Clients', delay: '.5s' },
    { count: '14', label: 'Years of', sublabel: 'Experience', delay: '.6s' },
  ];

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', hasDropdown: true },
    { name: 'About', path: '/about', current: true },
    { name: 'Services', path: '/services' },
    { name: 'Portfolios', path: '/portfolio' },
    { name: 'Blog', path: '/blog', hasDropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="absolute_header bg-[#050709]">
      {/* Back To Top Button */}
      <div 
        className={`fixed right-[50px] bottom-[50px] h-[46px] w-[46px] cursor-pointer block rounded-[50px] shadow-[inset_0_0_0_2px_rgba(135,80,247,0.5)] z-[99] transition-all duration-200 hover:opacity-100 ${
          scrollProgress > 5 ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-[15px]'
        }`}
        onClick={scrollToTop}
      >
        <svg className="progress-circle svg-content w-full h-full -rotate-90" viewBox="-1 -1 102 102">
          <path 
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" 
            style={{ 
              fill: 'none', 
              stroke: '#8750F7', 
              strokeWidth: '4',
              strokeDasharray: '307.919px',
              strokeDashoffset: `${307.919 - (scrollProgress * 3.07919)}px`,
              transition: 'stroke-dashoffset 200ms linear'
            }}
          ></path>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[#8750F7] text-xl">
          <FiArrowUp />
        </span>
      </div>

      {/* Header - Main Header */}
      <header className="tj-header-area header-absolute py-5 absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="row flex flex-wrap items-center">
            <div className="col-12 flex flex-wrap items-center justify-between">
              <div className="logo-box">
                <a href="/">
                  {/* <img src={logo} alt="Logo" className="h-10" /> */}
                </a>
              </div>
              
              <div className="header-info-list hidden md:inline-block">
                <ul className="flex space-x-4">
                  <li>
                    <a href="mailto:mnishithareddy8765@gmail.com" className="text-white hover:text-[#8750F7] transition-colors flex items-center gap-2">
                      <HiOutlineMail className="text-[#8750F7]" />
                     mnishithareddy8765@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Desktop Menu */}
              <div className="header-menu hidden lg:block">
                <nav>
                  <ul className="flex space-x-8">
                    {navItems.map((item) => (
                      <li key={item.name} className="group relative">
                        <a 
                          href={item.path} 
                          className={`${item.current ? 'text-[#8750F7]' : 'text-white hover:text-[#8750F7]'} transition-colors flex items-center gap-1`}
                        >
                          {item.name}
                          {item.hasDropdown && <IoArrowForward className="rotate-90 text-xs" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="header-button hidden md:block">
                <a href="#" className="btn px-8 py-3 bg-[#8750F7] text-white rounded-full hover:bg-opacity-90 transition-all inline-block">
                  Hire me!
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="menu-bar lg:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 flex items-center justify-center text-white text-2xl"
                >
                  {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#140C1C] border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a 
                    key={item.name}
                    href={item.path} 
                    className={`${item.current ? 'text-[#8750F7]' : 'text-white hover:text-[#8750F7]'} py-2 transition-colors`}
                  >
                    {item.name}
                  </a>
                ))}
                <a href="#" className="text-[#8750F7] py-2 font-semibold">Hire me!</a>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 w-full z-50 bg-[#140C1C] transition-transform duration-300 ${
        isSticky ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="row flex flex-wrap items-center justify-between">
            <div className="logo-box">
              <a href="/">
                {/* <img src={logo} alt="Logo" className="h-10" /> */}
              </a>
            </div>
            
            <div className="header-menu hidden lg:block">
              <nav>
                <ul className="flex space-x-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a 
                        href={item.path} 
                        className={`${item.current ? 'text-[#8750F7]' : 'text-white hover:text-[#8750F7]'} transition-colors`}
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="header-button hidden md:block">
              <a href="#" className="btn px-6 py-2 bg-[#8750F7] text-white rounded-full hover:bg-opacity-90 transition-all text-sm inline-block">
                Hire me!
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="site-content pt-20">
        {/* Breadcrumb Area */}
        <section 
          className="breadcrumb_area py-20 md:py-32 relative"
          style={{
            // backgroundImage: `url(${breadcrumbBg})`,
            backgroundColor: '#140C1C',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col text-center">
                <div className="breadcrumb_content flex flex-col items-center">
                  <h2 className="title text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 wow fadeInUp">
                    About
                  </h2>
                  <div className="breadcrumb_navigation flex items-center space-x-2 text-gray-300 wow fadeInUp">
                    <span><a href="/" className="hover:text-[#8750F7] transition-colors">Home</a></span>
                    <FaLongArrowAltRight className="text-[#8750F7]" />
                    <span className="current-item text-white">About</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="works-section style-2 py-20 bg-[#050709]" id="resume-section">
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col-md-12 text-center mb-12">
                <h2 className="section-title text-3xl md:text-4xl text-white font-bold wow fadeInUp">
                  My Resume
                </h2>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="works-wrapper grid md:grid-cols-2 gap-8">
                  {/* Education Column */}
                  <div className="works-content-item">
                    <h3 className="title text-2xl text-white font-semibold mb-6 wow fadeInLeft">
                      Education
                    </h3>
                    <div className="works-inner space-y-6 wow fadeInUp">
                      {educationData.map((item, index) => (
                        <div key={index} className="works-item flex items-start space-x-4 p-6 bg-[#0E0A14] rounded-xl hover:bg-[#140C1C] transition-all group">
                          <div className="works-icon text-[#8750F7] text-2xl group-hover:scale-110 transition-transform">
                            <PiGraduationCap />
                          </div>
                          <div className="works-content">
                            <span className="number text-[#8750F7] text-sm block mb-2">{item.year}</span>
                            <h5 className="title text-white text-lg font-semibold mb-1">{item.title}</h5>
                            <span className="sub-title text-gray-400">{item.institution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience Column */}
                  <div className="works-content-item">
                    <h3 className="title text-2xl text-white font-semibold mb-6 wow fadeInRight">
                      Work Experience
                    </h3>
                    <div className="works-inner space-y-6 wow fadeInUp">
                      {experienceData.map((item, index) => (
                        <div key={index} className="works-item flex items-start space-x-4 p-6 bg-[#0E0A14] rounded-xl hover:bg-[#140C1C] transition-all group">
                          <div className="works-icon text-[#8750F7] text-2xl group-hover:scale-110 transition-transform">
                            <PiSuitcase />
                          </div>
                          <div className="works-content">
                            <span className="number text-[#8750F7] text-sm block mb-2">{item.year}</span>
                            <h5 className="title text-white text-lg font-semibold mb-1">{item.title}</h5>
                            <span className="sub-title text-gray-400">{item.institution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section style-3 py-20 bg-[#050709]" id="skills-section">
          <div className="container mx-auto px-4">
            <div className="row text-center mb-12">
              <div className="col-md-12">
                <h2 className="section-title text-3xl md:text-4xl text-white font-bold mb-4 wow fadeInUp">
                  My Skills
                </h2>
                <p className="text-[#8750F7] uppercase tracking-wider wow fadeInUp">
                  Offered Services
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="skills-widget flex flex-wrap justify-center items-center gap-8">
                  {/* {skillsData.map((skill, index) => (
                    <div 
                      key={index} 
                      className="skill-item text-center wow fadeInUp"
                      data-wow-delay={skill.delay}
                    >
                      <div className="skill-inner w-32 h-32 rounded-full bg-[#0E0A14] flex flex-col items-center justify-center mb-3 hover:bg-[#8750F7] transition-all group cursor-pointer">
                        <div className="icon-box mb-2">
                          <img 
                            src={skill.icon} 
                            alt={skill.name} 
                            className="w-8 h-8 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all" 
                          />
                        </div>
                        <div className="number text-white font-bold">{skill.percent}</div>
                      </div>
                      <p className="text-gray-300">{skill.name}</p>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Counter Section */}
        <section className="counter-section py-20 bg-[#050709]">
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col-12">
                <div className="funfact-area bg-[#0E0A14] rounded-2xl p-8 md:p-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {counterData.map((item, index) => (
                      <div 
                        key={index}
                        className="funfact-item flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 wow fadeInUp"
                        data-wow-delay={item.delay}
                      >
                        <div className="number text-3xl md:text-4xl text-white font-bold">
                          <span className="odometer" data-count={item.count}>{item.count}</span>
                          {item.plus || item.suffix}
                        </div>
                        <div className="text text-gray-300">
                          {item.label}<br />{item.sublabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-section py-20 bg-[#050709]">
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col-12">
                <div className="section-header flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="heading-left text-center md:text-left">
                    <p className="text-[#8750F7] mb-3 wow fadeInUp">Want to start a project?</p>
                    <h2 className="section-title text-3xl md:text-4xl lg:text-5xl text-white font-bold wow fadeInUp">
                      Let's have a chat
                    </h2>
                  </div>
                  <div className="chat-mail wow fadeInRight">
                    <a 
                      href="mailto:info@taylor.com" 
                      className="link text-white text-xl md:text-2xl hover:text-[#8750F7] transition-colors flex items-center gap-3 group"
                    >
                      info@taylor.com 
                      <FiArrowRight className="text-[#8750F7] group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="tj-footer-area style-2 py-12 bg-[#050709] border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="footer-logo-box mb-6">
                <a href="/">
                  {/* <img src={logo} alt="Logo" className="h-12 mx-auto" /> */}
                </a>
              </div>
              <div className="footer-menu mb-6">
                <nav>
                  <ul className="flex flex-wrap justify-center gap-6">
                    {['About', 'Services', 'Portfolios', 'Contact'].map((item) => (
                      <li key={item}>
                        <a 
                          href={`/${item.toLowerCase()}`} 
                          className="text-gray-300 hover:text-[#8750F7] transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="copy-text style-2 text-gray-400">
                <p>&copy; 2024 All rights reserved by <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#8750F7] hover:underline">ThemeJunction</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;