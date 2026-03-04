export default function Resume() {
  const experiences = [
    { time: '2022 – Present', title: 'Programming Course', place: 'Blockdots, London' },
    { time: '2021 – 2022', title: 'CMS Development', place: 'Parsons, The New School' },
    { time: '2020 – 2021', title: 'Web Design Course', place: 'House of Life, Leeds' },
    { time: '2018 – 2020', title: 'Frontend Development', place: 'Theme Junction, Bursa' },
  ]

  const education = [
    { time: '2020 – 2023', title: 'BLOCKDOTS', place: 'Harvard University' },
    { time: '2016 – 2020', title: 'Parsons, The New School', place: 'University of Denmark' },
    { time: '2012 – 2015', title: 'IDEO Design', place: 'University of California' },
    { time: '2010 – 2011', title: 'Design Fundamentals', place: 'Parsons, The New School' },
  ]

  return (
    <section id="resume" className="py-[100px] bg-bg-2">
      <div className="container-custom">
        <div className="text-center">
          <span className="section-label">My Journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <div className="section-divider section-divider-center" />
        </div>

        <div className="grid lg:grid-cols-2 gap-[60px] mt-[50px]">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 text-2xl font-extrabold mb-8">
              <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center text-xl text-primary-3">💼</div>
              My Experience
            </div>
            <div className="relative pl-7 before:absolute before:top-2 before:left-0 before:w-0.5 before:bottom-0 before:bg-gradient-to-b before:from-primary before:to-transparent">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pb-9 last:pb-0 group hover:translate-x-1.5 transition-all">
                  <div className="absolute left-[-35px] top-2 w-3.5 h-3.5 rounded-full bg-primary border-4 border-bg-2 shadow-[0_0_12px_var(--primary)]" />
                  <div className="timeline-time text-xs font-semibold text-primary-3 tracking-wide mb-1.5 uppercase">{exp.time}</div>
                  <div className="text-lg font-bold text-white mb-1">{exp.title}</div>
                  <div className="text-sm text-text-muted">{exp.place}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 text-2xl font-extrabold mb-8">
              <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center text-xl text-primary-3">🎓</div>
              My Education
            </div>
            <div className="relative pl-7 before:absolute before:top-2 before:left-0 before:w-0.5 before:bottom-0 before:bg-gradient-to-b before:from-primary before:to-transparent">
              {education.map((edu, i) => (
                <div key={i} className="relative pb-9 last:pb-0 group hover:translate-x-1.5 transition-all">
                  <div className="absolute left-[-35px] top-2 w-3.5 h-3.5 rounded-full bg-primary border-4 border-bg-2 shadow-[0_0_12px_var(--primary)]" />
                  <div className="timeline-time text-xs font-semibold text-primary-3 tracking-wide mb-1.5 uppercase">{edu.time}</div>
                  <div className="text-lg font-bold text-white mb-1">{edu.title}</div>
                  <div className="text-sm text-text-muted">{edu.place}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}