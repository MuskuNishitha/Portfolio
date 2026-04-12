'use client'

import { useState, useEffect } from 'react'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    { 
      initials: 'BF', 
      name: 'Brandon Fraser', 
      role: 'Senior Software Dev, Cosmic Sport',
      text: 'Taylor is a professional Designer who really helps my business by providing exceptional value. The project was delivered on time and exceeded all our expectations.',
      bg: 'from-primary to-secondary'
    },
    { 
      initials: 'TB', 
      name: 'Tim Bailey', 
      role: 'SEO Specialist, Theme Junction',
      text: 'Working with Musku Nishitha was an amazing experience. The attention to detail and creative vision brought our product to life in ways we hadn\'t even imagined.',
      bg: 'from-[#2a54a0] to-[#1464dc]'
    },
    { 
      initials: 'SL', 
      name: 'Sarah Lin', 
      role: 'Product Manager, TechVision',
      text: 'Incredible work from start to finish. Our conversion rate improved dramatically after the redesign and users consistently rate our UX at 5 stars.',
      bg: 'from-[#a03050] to-[#dc1450]'
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-[100px] bg-bg-2 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-center">
          <div>
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">What My Clients Say</h2>
            <div className="section-divider" />
            <p className="section-desc">Empowering people in new digital journeys with exceptional design and development services.</p>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`bg-bg-card border border-border rounded-2xl p-9 transition-all ${
                  i === activeIndex ? 'block animate-fade-up' : 'hidden'
                }`}
              >
                <div className="flex items-center justify-between mb-7">
                  <div className="text-4xl text-primary opacity-70 leading-none">&quot;</div>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-13 h-13 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center font-extrabold text-lg text-white flex-shrink-0`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{testimonial.name}</div>
                      <div className="text-xs text-text-muted">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
                <p className="text-base text-text-body leading-relaxed italic">{testimonial.text}</p>
              </div>
            ))}

            <div className="flex gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === activeIndex ? 'w-6 bg-primary' : 'w-2 bg-border-2'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
