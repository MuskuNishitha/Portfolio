"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  FiTwitter, 
  FiDownload, 
  FiArrowUpRight,
  FiCalendar,
  FiMessageCircle,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowLeft,
  FiArrowRight
} from 'react-icons/fi';
import { 
  FaBasketballBall,
  FaLinkedinIn,
  FaGithub,
  FaTimes,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { IoCodeSlashOutline } from 'react-icons/io5';
import { MdOutlineSmartphone, MdOutlineBrowser, MdOutlineDesignServices } from 'react-icons/md';
import { GiCrown, GiTrophy, GiGraduateCap } from 'react-icons/gi';
import { BsBriefcase, BsCalendar, BsClock } from 'react-icons/bs';
import { BiUser, BiEnvelope, BiPhone, BiMap, BiMessageDetail } from 'react-icons/bi';
import { RiGraduationCapLine, RiUserStarLine, RiAwardLine, RiUserExperienceLine } from 'react-icons/ri';
import { TbSeo, TbUxCircle } from 'react-icons/tb';
import { CgWebsite } from 'react-icons/cg';
import { SiFlutter } from 'react-icons/si';

const GeroldPortfolio = () => {
  const [activeService, setActiveService] = useState(0);
  const [activeFilter, setActiveFilter] = useState('*');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [popupContent, setPopupContent] = useState({});

  // Initialize animations and effects
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      number: '01',
      title: 'Responsive Design',
      description: 'Ensure your website looks great on any device, with layouts that adapt to different screen sizes seamlessly.',
      icon: <MdOutlineSmartphone className="text-2xl" />,
      detailedDesc: `Elizabeth some dodgy chavs are you taking the piss faff about pardon amongst car boot a load of old tosh is cracking goal blow off telling brown. Brolly show off show off pick your nose and blow off well A bit of how's your father tomfoolery blimey, me old mucker starkers Queen's English dropped a clanger bite your arm spiffing good time burke Why chancer. Hotpot bum bag cracking goal young delinquent naff bugger cup of chars bender loo it's all gone to pot the nancy cheeky.`
    },
    {
      id: 2,
      number: '02',
      title: 'CMS Development',
      description: 'Set up user-friendly CMS solutions like WordPress or custom-built options so clients can manage content easily.',
      icon: <IoCodeSlashOutline className="text-2xl" />,
      detailedDesc: `Elizabeth some dodgy chavs are you taking the piss faff about pardon amongst car boot a load of old tosh is cracking goal blow off telling brown. Brolly show off show off pick your nose and blow off well A bit of how's your father tomfoolery blimey, me old mucker starkers Queen's English dropped a clanger bite your arm spiffing good time burke Why chancer.`
    },
    {
      id: 3,
      number: '03',
      title: 'API Integrations',
      description: 'Build and integrate APIs to connect websites with third-party applications, enhancing functionality and performance.',
      icon: <IoCodeSlashOutline className="text-2xl" />,
      detailedDesc: `Elizabeth some dodgy chavs are you taking the piss faff about pardon amongst car boot a load of old tosh is cracking goal blow off telling brown.`
    },
    {
      id: 4,
      number: '04',
      title: 'Website Redesign',
      description: 'Refresh outdated websites with modern, appealing designs that align with current brand goals and user expectations.',
      icon: <CgWebsite className="text-2xl" />,
      detailedDesc: `Elizabeth some dodgy chavs are you taking the piss faff about pardon amongst car boot a load of old tosh is cracking goal blow off telling brown.`
    }
  ];

  const portfolioItems = [
    { category: 'branding', title: 'Deloitte', desc: 'Project was about precision and information.', image: '/assets/img/portfolio/2.jpg' },
    { category: 'uxui', title: 'New Age', desc: 'Project was about precision and information.', image: '/assets/img/portfolio/1.jpg' },
    { category: 'mobile-app', title: 'Sebastian', desc: 'Project was about precision and information.', image: '/assets/img/portfolio/3.jpg' },
    { category: 'branding', title: 'Mochnix', desc: 'Project was about precision and information.', image: '/assets/img/portfolio/4.jpg' }
  ];

  const experiences = [
    { time: '2022 - Present', title: 'Programming course', institute: 'Blockdots, London' },
    { time: '2021 - 2022', title: 'CMS course', institute: 'Parsons, The New School' },
    { time: '2020 - 2021', title: 'Web design course', institute: 'House of Life, Leeds' },
    { time: '2018 - 2020', title: 'Parsons, The New School', institute: 'Theme Junction, Bursa' }
  ];

  const educations = [
    { time: '2020 - 2023', title: 'BLOCKDOTS', institute: 'Harverd University' },
    { time: '2016 - 2020', title: 'Parsons, The New School', institute: 'University of Denmark' },
    { time: '2012 - 2015', title: 'IDEO', institute: 'University of California' },
    { time: '2010 - 2011', title: 'Parsons, The New School', institute: 'Parsons, The New School' }
  ];

  const skills = [
    { name: 'HTML', percentage: 92, icon: '/assets/img/icons/skills-1.svg' },
    { name: 'CSS3', percentage: 80, icon: '/assets/img/icons/skills-2.svg' },
    { name: 'Javascript', percentage: 85, icon: '/assets/img/icons/skills-3.svg' },
    { name: 'Webflow', percentage: 99, icon: '/assets/img/icons/webflow-1.svg' },
    { name: 'ReactJS', percentage: 89, icon: '/assets/img/icons/react.svg' },
    { name: 'Framer', percentage: 93, icon: '/assets/img/icons/framer-1.svg' }
  ];

  const testimonials = [
    {
      logo: '/assets/img/testimonials/logo/1.png',
      user: '/assets/img/testimonials/user/1.jpg',
      quote: '“Taylor is a professional Designer he really helps my business by providing value to my business.',
      name: 'Brandon Fraser',
      designation: 'Senior Software Dev, Cosmic Sport'
    },
    {
      logo: '/assets/img/testimonials/logo/2.png',
      user: '/assets/img/testimonials/user/2.jpg',
      quote: '“Taylor is a professional Designer he really helps my business by providing value to my business.',
      name: 'Tim Bailey',
      designation: 'SEO Specialist, Theme Junction'
    }
  ];

  const blogs = [
    { image: '/assets/img/blog/1.jpg', category: 'Tutorial', date: 'Oct 01, 2022', title: 'top 10 ui ux designers' },
    { image: '/assets/img/blog/2.jpg', category: 'TIPS', date: 'Nov 01, 2022', title: 'App Development Guides' },
    { image: '/assets/img/blog/3.jpg', category: 'FREEBIES', date: 'Dec 01, 2022', title: 'learn graphic design free' }
  ];

  const openPopup = (type, content) => {
    setPopupType(type);
    setPopupContent(content);
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupType(null);
    setPopupContent({});
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-5">
          <svg viewBox="0 0 1320 300" className="w-full">
            <text x="50%" y="50%" textAnchor="middle" className="text-[200px] font-bold fill-current">
              HI
            </text>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-on-scroll">
              <span className="text-[#ff4d4d] text-lg font-medium mb-4 block">
                I am Gerold
              </span>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Next-Level Web <br />
                <span className="text-[#ff4d4d]">Developer.</span>
              </h1>
              
              {/* Mobile Image */}
              <div className="lg:hidden mb-8">
                <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-[#ff4d4d]">
                  <Image 
                    src="/assets/img/hero/me.png"
                    alt="Gerold"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                I break down complex user experience problems to create integrity focussed solutions that connect billions of people.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <button className="group inline-flex items-center gap-2 px-6 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-all duration-300">
                  Download CV 
                  <FiDownload className="group-hover:translate-y-1 transition-transform" />
                </button>
                
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#ff4d4d] hover:text-[#ff4d4d] transition-all">
                    <FiTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#ff4d4d] hover:text-[#ff4d4d] transition-all">
                    <FaBasketballBall />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#ff4d4d] hover:text-[#ff4d4d] transition-all">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:border-[#ff4d4d] hover:text-[#ff4d4d] transition-all">
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Image - Desktop */}
            <div className="hidden lg:block animate-on-scroll">
              <div className="relative w-[500px] h-[500px] mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff4d4d] to-purple-600 blur-3xl opacity-20"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#ff4d4d]">
                  <Image 
                    src="/assets/img/hero/me.png"
                    alt="Gerold"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center lg:text-left animate-on-scroll">
              <div className="text-3xl lg:text-4xl font-bold text-[#ff4d4d] mb-2">14</div>
              <div className="text-gray-400">Years of <br />Experience</div>
            </div>
            <div className="text-center lg:text-left animate-on-scroll">
              <div className="text-3xl lg:text-4xl font-bold text-[#ff4d4d] mb-2">50+</div>
              <div className="text-gray-400">Project <br />Completed</div>
            </div>
            <div className="text-center lg:text-left animate-on-scroll">
              <div className="text-3xl lg:text-4xl font-bold text-[#ff4d4d] mb-2">1.5K</div>
              <div className="text-gray-400">Happy <br />Clients</div>
            </div>
            <div className="text-center lg:text-left animate-on-scroll">
              <div className="text-3xl lg:text-4xl font-bold text-[#ff4d4d] mb-2">14</div>
              <div className="text-gray-400">Years of <br />Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">
              My Quality Services
            </h2>
            <p className="text-gray-400 animate-on-scroll">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative p-6 mb-4 rounded-2xl cursor-pointer transition-all duration-500 animate-on-scroll
                  ${activeService === index 
                    ? 'bg-gradient-to-r from-[#ff4d4d] to-purple-600 scale-105 shadow-2xl' 
                    : 'hover:bg-[#1a1a1a]'}`}
                onClick={() => setActiveService(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4 lg:w-1/3">
                    <span className={`text-2xl font-bold ${activeService === index ? 'text-white' : 'text-[#ff4d4d]'}`}>
                      {service.number}
                    </span>
                    <h3 className={`text-xl font-semibold ${activeService === index ? 'text-white' : 'text-gray-300'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className={`text-sm lg:w-2/3 ${activeService === index ? 'text-white' : 'text-gray-400'}`}>
                    {service.description}
                  </p>
                  
                  <FiArrowUpRight className={`absolute top-6 right-6 text-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1
                    ${activeService === index ? 'text-white' : 'text-[#ff4d4d]'}`} />
                </div>
                
                <button 
                  onClick={() => openPopup('service', service)}
                  className="absolute inset-0 w-full h-full opacity-0"
                  aria-label="View service details"
                ></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">
              My Recent Works
            </h2>
            <p className="text-gray-400 animate-on-scroll">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
            {['All', 'UX/UI', 'Branding', 'Apps'].map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter === 'All' ? '*' : filter.toLowerCase())}
                className={`px-6 py-2 rounded-full transition-all duration-300
                  ${(filter === 'All' && activeFilter === '*') || 
                    (filter.toLowerCase() === activeFilter)
                    ? 'bg-[#ff4d4d] text-white' 
                    : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a]'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openPopup('portfolio', item)}
              >
                <div className="relative h-[300px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{item.desc}</p>
                    <FiArrowUpRight className="text-[#ff4d4d] text-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8 animate-on-scroll">
                {/* <RiUserExperienceLine className="text-3xl text-[#ff4d4d]" /> */}
                <h2 className="text-2xl lg:text-3xl font-bold">My Experience</h2>
              </div>
              
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#252525] transition-all duration-300 animate-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-[#ff4d4d] text-sm mb-2">{exp.time}</div>
                    <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                    <div className="text-gray-400">{exp.institute}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8 animate-on-scroll">
                <RiGraduationCapLine className="text-3xl text-[#ff4d4d]" />
                <h2 className="text-2xl lg:text-3xl font-bold">My Education</h2>
              </div>
              
              <div className="space-y-6">
                {educations.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#252525] transition-all duration-300 animate-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-[#ff4d4d] text-sm mb-2">{edu.time}</div>
                    <h3 className="text-xl font-semibold mb-2">{edu.title}</h3>
                    <div className="text-gray-400">{edu.institute}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">
              My Skills
            </h2>
            <p className="text-gray-400 animate-on-scroll">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-center animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-24 h-24 mb-3">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="#1a1a1a"
                      strokeWidth="4"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="44"
                      fill="none"
                      stroke="#ff4d4d"
                      strokeWidth="4"
                      strokeDasharray={276.46}
                      strokeDashoffset={276.46 - (276.46 * skill.percentage) / 100}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                    {skill.percentage}%
                  </span>
                </div>
                <p className="font-medium">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                My Client's Stories
              </h2>
              <p className="text-gray-400">
                Empowering people in new a digital journey with my super services
              </p>
            </div>

            <div className="animate-on-scroll">
              <div className="relative">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] p-8 rounded-2xl mb-6 last:mb-0 hover:bg-[#252525] transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={testimonial.logo}
                          alt="Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="w-12 h-12 relative rounded-full overflow-hidden">
                        <Image
                          src={testimonial.user}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#ff4d4d]" />
                      ))}
                    </div>

                    <p className="text-gray-300 mb-4 italic">
                      {testimonial.quote}
                    </p>

                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-on-scroll">
              Recent Blogs
            </h2>
            <p className="text-gray-400 animate-on-scroll">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and your customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="group bg-[#1a1a1a] rounded-2xl overflow-hidden hover:bg-[#252525] transition-all duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#ff4d4d] text-xs font-semibold rounded-full">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-[#ff4d4d]" /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMessageCircle className="text-[#ff4d4d]" /> Comment (0)
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold capitalize hover:text-[#ff4d4d] transition-colors">
                    <a href="#">{blog.title}</a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-on-scroll">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Let's work together!
              </h2>
              <p className="text-gray-400 mb-8">
                I design and code beautifully simple things and i love what i do. Just simple like that!
              </p>

              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all"
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all"
                  />
                </div>

                <select className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all">
                  <option value="" disabled selected>Choose Service</option>
                  <option value="branding">Branding Design</option>
                  <option value="web">Web Design</option>
                  <option value="uxui">UI/UX Design</option>
                  <option value="app">App Design</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full px-4 py-3 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition-all resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#ff4d4d] text-white rounded-full hover:bg-[#ff3333] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex items-center animate-on-scroll">
              <div className="space-y-6 w-full">
                <div className="flex items-center gap-4 p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#252525] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center">
                    <FiPhone className="text-[#ff4d4d] text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a href="tel:0123456789" className="text-lg font-semibold hover:text-[#ff4d4d] transition-colors">
                      +01 123 654 8096
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#252525] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center">
                    <FiMail className="text-[#ff4d4d] text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:mail@mail.com" className="text-lg font-semibold hover:text-[#ff4d4d] transition-colors">
                      gerolddesign@mail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#252525] transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center">
                    <FiMapPin className="text-[#ff4d4d] text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <a href="#" className="text-lg font-semibold hover:text-[#ff4d4d] transition-colors">
                      Warne Park Street Pine, <br />FL 33157, New York
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closePopup}></div>
          
          <div className="relative bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#ff4d4d] transition-colors z-10"
            >
              <FaTimes />
            </button>

            {popupType === 'service' && (
              <div className="p-6 lg:p-8">
                <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/assets/img/services/modal-img.jpg"
                    alt={popupContent.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <span className="text-[#ff4d4d] text-sm font-semibold mb-2 block">SERVICES</span>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{popupContent.title}</h3>
                    
                    <div className="space-y-4 text-gray-300 mb-6">
                      <p>{popupContent.detailedDesc}</p>
                      <p>Brolly show off show off pick your nose and blow off well A bit of how's your father tomfoolery blimey, me old mucker starkers Queen's English dropped a clanger bite your arm spiffing good time burke Why chancer. Hotpot bum bag cracking goal young delinquent naff bugger cup of chars bender loo it's all gone to pot the nancy cheeky.</p>
                    </div>

                    <h4 className="text-xl font-bold mb-4">Services Process</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]"></span>
                        Reinvent Your Business to Better
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]"></span>
                        Pioneering the Internet's First
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]"></span>
                        Pioneering the Design World's First
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]"></span>
                        Pioneering the Design World's First
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="bg-[#2a2a2a] rounded-2xl p-6 mb-6">
                      <h4 className="text-lg font-semibold mb-4">All Services</h4>
                      <ul className="space-y-2">
                        <li className="p-3 bg-[#ff4d4d] rounded-lg">Branding Design</li>
                        <li className="p-3 hover:bg-[#333] rounded-lg transition-colors cursor-pointer">3D Animation</li>
                        <li className="p-3 hover:bg-[#333] rounded-lg transition-colors cursor-pointer">UI/UX Design</li>
                        <li className="p-3 hover:bg-[#333] rounded-lg transition-colors cursor-pointer">Web Design</li>
                        <li className="p-3 hover:bg-[#333] rounded-lg transition-colors cursor-pointer">App Design</li>
                      </ul>
                    </div>

                    <div className="bg-[#2a2a2a] rounded-2xl p-6">
                      <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
                      <form className="space-y-3">
                        <input type="text" placeholder="Name" className="w-full px-4 py-2 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-2 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]" />
                        <textarea rows="3" placeholder="Your message" className="w-full px-4 py-2 bg-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d4d]"></textarea>
                        <button type="submit" className="w-full py-2 bg-[#ff4d4d] rounded-lg hover:bg-[#ff3333] transition-colors">
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {popupType === 'portfolio' && (
              <div className="p-6 lg:p-8">
                <div className="relative h-64 lg:h-96 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="/assets/img/portfolio/modal-img.jpg"
                    alt={popupContent.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">{popupContent.title}</h3>
                    <p className="text-gray-300 mb-6">
                      They are was greater open above shelter lets itself under appear sixth open gathering made upon can't own above midst gathering gathered he one us saying can't divide.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-2 bg-[#ff4d4d] rounded-full hover:bg-[#ff3333] transition-colors">
                      live preview <FiArrowUpRight />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="font-semibold">Web Design</p>
                    </div>
                    <div className="p-4 bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-400 text-sm">Client</p>
                      <p className="font-semibold">Artboard Studio</p>
                    </div>
                    <div className="p-4 bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-400 text-sm">Start Date</p>
                      <p className="font-semibold">August 20, 2023</p>
                    </div>
                    <div className="p-4 bg-[#2a2a2a] rounded-xl">
                      <p className="text-gray-400 text-sm">Designer</p>
                      <a href="#" className="font-semibold hover:text-[#ff4d4d]">ThemeJunction</a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image src="/assets/img/portfolio-gallery/p-gallery-1.jpg" alt="Gallery" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image src="/assets/img/portfolio-gallery/p-gallery-2.jpg" alt="Gallery" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image src="/assets/img/portfolio-gallery/p-gallery-3.jpg" alt="Gallery" fill className="object-cover" />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <Image src="/assets/img/portfolio-gallery/p-gallery-4.jpg" alt="Gallery" fill className="object-cover" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4">Project Description</h4>
                    <p className="text-gray-300">
                      The goal is there are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-4">The story</h4>
                    <p className="text-gray-300">
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-8 border-t border-gray-800">
                  <button className="flex items-center gap-3 group">
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <span className="text-sm text-gray-400">Previous Project</span>
                      <h5 className="font-semibold">Sebastian</h5>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 group">
                    <div className="text-right">
                      <span className="text-sm text-gray-400">Next Project</span>
                      <h5 className="font-semibold">Qwillo</h5>
                    </div>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default GeroldPortfolio;