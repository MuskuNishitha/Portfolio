'use client';
// components/Services.jsx
export function Services() {
  const services = [
    { num: '01', title: 'Responsive Design', desc: 'Ensure your website looks great on any device, with layouts that adapt to different screen sizes seamlessly.' },
    { num: '02', title: 'CMS Development', desc: 'Set up user-friendly CMS solutions so clients can manage content easily and efficiently.' },
    { num: '03', title: 'API Integrations', desc: 'Build and integrate APIs to connect websites with third-party applications, enhancing functionality.' },
    { num: '04', title: 'Website Redesign', desc: 'Refresh outdated websites with modern, appealing designs aligned with brand goals and user expectations.' },
  ];

  return (
    <section id="services" className="py-24 bg-[#0e1418]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-4">
          <span className="section-label">What I Do</span>
          <h2 className="section-title">My Quality Services</h2>
          <div className="section-divider mx-auto" />
          <p className="text-[#747779] text-base max-w-[520px] mx-auto leading-relaxed">
            I put your ideas into unique web projects that inspire you and your customers.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-2">
          {services.map(({ num, title, desc }) => (
            <div
              key={num}
              className="group flex flex-wrap sm:flex-nowrap items-center justify-between gap-6 px-8 py-7 rounded-xl bg-[#111820] border border-[#1b2227] hover:border-[#8750f7] hover:translate-x-2 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8750f7] to-[#2a1454] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300" />
              <div className="flex items-center gap-6 flex-1 relative">
                <span className="text-xs font-bold text-[#8750f7]/70 min-w-[24px]">{num}</span>
                <h3 className="text-xl font-bold text-white">{title}</h3>
              </div>
              <p className="text-sm text-[#747779] max-w-[380px] leading-relaxed relative hidden sm:block">{desc}</p>
              <div className="w-11 h-11 rounded-full border border-[#2a343c] flex items-center justify-center text-[#8750f7] text-lg group-hover:bg-[#8750f7] group-hover:text-white group-hover:rotate-45 transition-all duration-300 relative flex-shrink-0">
                ↗
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState } from 'react';

export function Portfolio() {
  const [active, setActive] = useState('all');

  const projects = [
    { id: 1, title: 'Deloitte', cat: 'branding', desc: 'About precision and information.', bg: 'from-[#1a0a2e] to-[#3d1a7a]', initials: 'DEL' },
    { id: 2, title: 'New Age', cat: 'uxui', desc: 'About precision and information.', bg: 'from-[#0a1a2e] to-[#1a3d7a]', initials: 'NA' },
    { id: 3, title: 'Sebastian', cat: 'app', desc: 'About precision and information.', bg: 'from-[#1a2e0a] to-[#3d7a1a]', initials: 'SEB' },
    { id: 4, title: 'Mochnix', cat: 'branding', desc: 'About precision and information.', bg: 'from-[#2e0a1a] to-[#7a1a4a]', initials: 'MOC' },
  ];

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'uxui', label: 'UX/UI' },
    { key: 'branding', label: 'Branding' },
    { key: 'app', label: 'Apps' },
  ];

  const filtered = active === 'all' ? projects : projects.filter(p => p.cat === active);
  const catLabel = { branding: 'Branding', uxui: 'UX/UI', app: 'Apps' };

  return (
    <section id="portfolio" className="py-24 bg-[#0c1115]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center">
          <span className="section-label">My Work</span>
          <h2 className="section-title">My Recent Works</h2>
          <div className="section-divider mx-auto" />
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-10">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                active === key
                  ? 'bg-[#8750f7] border-[#8750f7] text-white'
                  : 'bg-[#111820] border-[#1b2227] text-[#747779] hover:border-[#8750f7] hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map(({ id, title, cat, desc, bg, initials }) => (
            <div
              key={id}
              className="group rounded-2xl overflow-hidden bg-[#111820] border border-[#1b2227] hover:border-[#8750f7] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(135,80,247,0.2)]"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <div className={`w-full h-full bg-gradient-to-br ${bg} flex items-center justify-center font-['Russo_One'] text-5xl text-white/10 transition-transform duration-500 group-hover:scale-105`}>
                  {initials}
                </div>
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#8750f7]/85 backdrop-blur-sm rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {catLabel[cat]}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1115]/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button className="px-5 py-2.5 bg-[#8750f7] rounded-full text-sm font-bold text-white hover:bg-[#6c3fd4] transition-colors">
                    View Project ↗
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-sm text-[#747779]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Resume() {
  const experience = [
    { time: '2022 – Present', title: 'Programming Course', place: 'Blockdots, London' },
    { time: '2021 – 2022', title: 'CMS Development', place: 'Parsons, The New School' },
    { time: '2020 – 2021', title: 'Web Design Course', place: 'House of Life, Leeds' },
    { time: '2018 – 2020', title: 'Frontend Development', place: 'Theme Junction, Bursa' },
  ];
  const education = [
    { time: '2020 – 2023', title: 'BLOCKDOTS', place: 'Harvard University' },
    { time: '2016 – 2020', title: 'Parsons, The New School', place: 'University of Denmark' },
    { time: '2012 – 2015', title: 'IDEO Design', place: 'University of California' },
    { time: '2010 – 2011', title: 'Design Fundamentals', place: 'Parsons, The New School' },
  ];

  const TimelineItem = ({ time, title, place }) => (
    <div className="relative pl-8 pb-9 group hover:translate-x-1.5 transition-transform duration-300">
      <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-[#8750f7] border-[3px] border-[#0e1418] shadow-[0_0_12px_#8750f7]" />
      <div className="text-xs font-bold text-[#a97bff] tracking-wider uppercase mb-1.5">{time}</div>
      <div className="text-lg font-bold text-white mb-1">{title}</div>
      <div className="text-sm text-[#747779]">{place}</div>
    </div>
  );

  return (
    <section id="resume" className="py-24 bg-[#0e1418]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <div className="section-divider mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <div>
            <div className="flex items-center gap-3 text-xl font-extrabold text-white mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#8750f7]/15 flex items-center justify-center text-xl text-[#a97bff]">💼</div>
              My Experience
            </div>
            <div className="relative border-l-2 pl-6" style={{ borderImage: 'linear-gradient(to bottom, #8750f7, transparent) 1' }}>
              {experience.map((item) => <TimelineItem key={item.title} {...item} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 text-xl font-extrabold text-white mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#8750f7]/15 flex items-center justify-center text-xl text-[#a97bff]">🎓</div>
              My Education
            </div>
            <div className="relative border-l-2 pl-6" style={{ borderImage: 'linear-gradient(to bottom, #8750f7, transparent) 1' }}>
              {education.map((item) => <TimelineItem key={item.title} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// components/Skills.jsx
export function Skills() {
  const skills = [
    { icon: '🌐', name: 'HTML5', pct: 92 },
    { icon: '🎨', name: 'CSS3', pct: 80 },
    { icon: '⚡', name: 'JavaScript', pct: 85 },
    { icon: '⚛️', name: 'React.js', pct: 89 },
    { icon: '🔺', name: 'Next.js', pct: 82 },
    { icon: '🌊', name: 'Webflow', pct: 99 },
  ];

  return (
    <section id="skills" className="py-24 bg-[#0c1115]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-4">
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">My Skills</h2>
          <div className="section-divider mx-auto" />
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {skills.map(({ icon, name, pct }) => (
            <div
              key={name}
              className="group relative bg-[#111820] border border-[#1b2227] rounded-2xl p-8 text-center hover:border-[#8750f7] hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(135,80,247,0.2)] overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8750f7] to-[#2a1454] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <div className="text-4xl mb-4 filter drop-shadow-[0_4px_12px_rgba(135,80,247,0.3)]">{icon}</div>
              <div className="font-['Russo_One'] text-2xl text-[#a97bff] mb-1 leading-none">{pct}%</div>
              <div className="text-xs font-semibold text-[#747779] mb-3">{name}</div>
              <div className="h-1 bg-[#2a343c] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8750f7] to-[#2a1454] transition-all duration-1000 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// components/Testimonials.jsx
export function Testimonials() {
  const [active, setActive] = useState(0);

  const testimonials = [
    {
      name: 'Brandon Fraser', role: 'Senior Software Dev, Cosmic Sport', initials: 'BF',
      text: 'Taylor is a professional Designer who really helps my business by providing exceptional value. The project was delivered on time and exceeded all our expectations.',
      gradient: 'from-[#8750f7] to-[#2a1454]',
    },
    {
      name: 'Tim Bailey', role: 'SEO Specialist, Theme Junction', initials: 'TB',
      text: 'Working with Gerold was an amazing experience. The attention to detail and creative vision brought our product to life in ways we hadn\'t even imagined.',
      gradient: 'from-[#2a54a0] to-[#1464dc]',
    },
    {
      name: 'Sarah Lin', role: 'Product Manager, TechVision', initials: 'SL',
      text: 'Incredible work from start to finish. Our conversion rate improved dramatically after the redesign and users consistently rate our UX at 5 stars.',
      gradient: 'from-[#a03050] to-[#dc1450]',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#0e1418] overflow-hidden">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What My Clients Say</h2>
            <div className="section-divider" />
            <p className="text-[#747779] text-base leading-relaxed max-w-[420px]">
              Empowering people in new digital journeys with exceptional design and development services.
            </p>
          </div>
          <div>
            <div className="bg-[#111820] border border-[#1b2227] rounded-2xl p-9">
              <div className="flex items-center justify-between mb-7">
                <div className="text-[#8750f7] text-4xl opacity-70 leading-none font-serif">&quot;</div>
                <div className="flex items-center gap-3">
                  <div className={`w-13 h-13 w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[active].gradient} flex items-center justify-center text-white font-extrabold text-base`}>
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{testimonials[active].name}</div>
                    <div className="text-xs text-[#747779]">{testimonials[active].role}</div>
                  </div>
                </div>
              </div>
              <p className="text-[#c8c8d0] text-base leading-[1.8] italic">{testimonials[active].text}</p>
              <div className="flex gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-[#8750f7] w-6' : 'bg-[#2a343c] w-2'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// components/Blog.jsx
export function Blog() {
  const posts = [
    { emoji: '🎨', cat: 'Tutorial', date: 'Oct 01, 2023', comments: 5, title: 'Top 10 UI/UX Designers You Should Follow in 2024', excerpt: 'Discover the most influential designers shaping the future of digital experiences.', bg: 'from-[#1a0a2e] to-[#3d1a7a]' },
    { emoji: '📱', cat: 'Tips', date: 'Nov 01, 2023', comments: 3, title: 'App Development Guide: From Idea to Launch', excerpt: 'A comprehensive guide covering everything you need to know about building successful apps.', bg: 'from-[#0a1a2e] to-[#1a3d7a]' },
    { emoji: '🆓', cat: 'Freebies', date: 'Dec 01, 2023', comments: 8, title: 'Learn Graphic Design for Free: Best Resources 2024', excerpt: 'The best free resources, tools, and courses to level up your graphic design skills today.', bg: 'from-[#1a2e0a] to-[#3d7a1a]' },
  ];

  return (
    <section id="blog" className="py-24 bg-[#0c1115]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-4">
          <span className="section-label">Latest Posts</span>
          <h2 className="section-title">Recent Blogs</h2>
          <div className="section-divider mx-auto" />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map(({ emoji, cat, date, comments, title, excerpt, bg }) => (
            <div
              key={title}
              className="group bg-[#111820] border border-[#1b2227] rounded-2xl overflow-hidden hover:border-[#8750f7] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(135,80,247,0.15)]"
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <div className={`w-full h-full bg-gradient-to-br ${bg} flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500`}>
                  {emoji}
                </div>
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#8750f7] rounded-full text-xs font-bold text-white uppercase tracking-wider">
                  {cat}
                </span>
              </div>
              <div className="p-6">
                <div className="flex gap-4 text-xs text-[#747779] mb-3">
                  <span>📅 {date}</span>
                  <span>💬 {comments} Comments</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-[#a97bff] transition-colors capitalize">{title}</h3>
                <p className="text-sm text-[#747779] leading-relaxed">{excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const info = [
    { icon: '📞', label: 'Phone', value: '+01 123 654 8096' },
    { icon: '✉️', label: 'Email', value: 'gerolddesign@mail.com' },
    { icon: '📍', label: 'Address', value: 'Sr nagar, Hyderabad, Telangana, India' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0e1418]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
          {/* Form */}
          <div>
            <span className="section-label">Contact Me</span>
            <h2 className="section-title">Let&apos;s Work Together!</h2>
            <div className="section-divider" />
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-[#747779] mb-2">First Name</label>
                  <input type="text" className="form-field" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#747779] mb-2">Last Name</label>
                  <input type="text" className="form-field" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-semibold text-[#747779] mb-2">Email</label>
                  <input type="email" className="form-field" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#747779] mb-2">Phone</label>
                  <input type="tel" className="form-field" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#747779] mb-2">Service</label>
                <select className="form-field">
                  <option value="" disabled>Choose a Service</option>
                  <option>Responsive Design</option>
                  <option>CMS Development</option>
                  <option>API Integration</option>
                  <option>Website Redesign</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#747779] mb-2">Message</label>
                <textarea className="form-field min-h-[130px] resize-y" placeholder="Tell me about your project..." />
              </div>
              <button
                type="submit"
                className={`btn-primary ${submitted ? '!bg-none !bg-green-600' : ''}`}
              >
                {submitted ? '✅ Message Sent!' : 'Send Message ✉️'}
              </button>
            </form>
          </div>
          {/* Info */}
          <div className="pt-3">
            <h3 className="text-3xl font-extrabold text-white mb-4">Get In Touch</h3>
            <p className="text-[#747779] leading-relaxed mb-10 text-base">
              I design and code beautifully simple things and I love what I do. Just simple like that!
            </p>
            <div className="flex flex-col gap-5">
              {info.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-6 bg-[#111820] border border-[#1b2227] rounded-xl hover:border-[#8750f7] hover:translate-x-1.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#8750f7]/15 rounded-xl flex items-center justify-center text-xl text-[#a97bff] flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#747779] uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-sm font-semibold text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
