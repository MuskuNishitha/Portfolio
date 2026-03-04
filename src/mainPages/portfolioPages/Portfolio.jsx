'use client'

import { useState } from 'react'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'uxui', label: 'UX/UI' },
    { id: 'branding', label: 'Branding' },
    { id: 'app', label: 'Apps' },
  ]

  const projects = [
    { id: 1, title: 'Deloitte', cat: 'branding', tag: 'Branding', image: 'DEL', bg: 'from-[#1a0a2e] via-[#2a1454] to-[#3d1a7a]' },
    { id: 2, title: 'New Age', cat: 'uxui', tag: 'UX/UI', image: 'NA', bg: 'from-[#0a1a2e] via-[#142a54] to-[#1a3d7a]' },
    { id: 3, title: 'Sebastian', cat: 'app', tag: 'Apps', image: 'SEB', bg: 'from-[#1a2e0a] via-[#2a5414] to-[#3d7a1a]' },
    { id: 4, title: 'Mochnix', cat: 'branding', tag: 'Branding', image: 'MOC', bg: 'from-[#2e0a1a] via-[#541430] to-[#7a1a4a]' },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.cat === activeFilter)

  return (
    <section id="portfolio" className="py-[100px] bg-bg">
      <div className="container-custom">
        <div className="text-center">
          <span className="section-label">My Work</span>
          <h2 className="section-title">My Recent Works</h2>
          <div className="section-divider section-divider-center" />
        </div>

        <div className="flex items-center gap-2.5 justify-center flex-wrap my-10">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-6 py-2.5 rounded-[50px] text-xs font-semibold transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary text-white border-primary'
                  : 'text-text-muted bg-bg-card border border-border hover:bg-primary hover:text-white'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="rounded-2xl overflow-hidden bg-bg-card border border-border transition-all hover:border-primary hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(135,80,247,0.2)] group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <div className={`w-full h-full flex items-center justify-center font-russo text-4xl text-white/15 bg-gradient-to-br ${project.bg}`}>
                  {project.image}
                </div>
                <span className="absolute top-4 left-4 px-3.5 py-1 bg-primary/85 backdrop-blur rounded-[50px] text-[11px] font-bold text-white uppercase tracking-wide">
                  {project.tag}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 to-transparent flex items-end p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="px-5.5 py-2.5 bg-primary rounded-[50px] text-xs font-bold text-white transition-all hover:bg-primary-2">
                    View Project ↗
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-lg font-bold text-white mb-1">{project.title}</div>
                <div className="text-xs text-text-muted">Project about precision and information.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}