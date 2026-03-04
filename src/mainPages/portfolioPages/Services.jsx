'use client'

import { useState } from 'react'

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    { num: '01', name: 'Responsive Design', desc: 'Ensure your website looks great on any device, with layouts that adapt to different screen sizes seamlessly.' },
    { num: '02', name: 'CMS Development', desc: 'Set up user-friendly CMS solutions so clients can manage content easily and efficiently.' },
    { num: '03', name: 'API Integrations', desc: 'Build and integrate APIs to connect websites with third-party applications, enhancing functionality.' },
    { num: '04', name: 'Website Redesign', desc: 'Refresh outdated websites with modern, appealing designs aligned with brand goals and user expectations.' },
  ]

  return (
    <section id="services" className="py-[100px] bg-bg-2">
      <div className="container-custom">
        <div className="text-center">
          <span className="section-label">What I Do</span>
          <h2 className="section-title">My Quality Services</h2>
          <div className="section-divider section-divider-center" />
          <p className="section-desc mx-auto">I put your ideas and wishes into unique web projects that inspire you and your customers.</p>
        </div>

        <div className="flex flex-col gap-0.5 mt-[50px]">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-7 lg:p-8 border border-border bg-bg-card rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                activeService === index ? 'border-primary' : ''
              } hover:border-primary hover:translate-x-2`}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 transition-opacity group-hover:opacity-[0.06] ${
                activeService === index ? 'opacity-[0.06]' : ''
              }`} />
              
              <div className="flex items-center gap-6 flex-1">
                <span className="font-russo text-xs text-primary opacity-70 min-w-[28px]">{service.num}</span>
                <h3 className="text-xl font-bold text-white m-0">{service.name}</h3>
              </div>
              
              <p className="text-sm text-text-muted max-w-[400px] leading-relaxed hidden lg:block">{service.desc}</p>
              
              <div className={`w-11 h-11 rounded-full border border-border-2 flex items-center justify-center text-primary text-lg transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-45 flex-shrink-0 ${
                activeService === index ? 'bg-primary text-white rotate-45' : ''
              }`}>
                ↗
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}