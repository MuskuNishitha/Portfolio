export default function Skills() {
  const skills = [
    { icon: '🌐', name: 'HTML5', pct: 92 },
    { icon: '🎨', name: 'CSS3', pct: 80 },
    { icon: '⚡', name: 'JavaScript', pct: 85 },
    { icon: '⚛️', name: 'React.js', pct: 89 },
    { icon: '🔺', name: 'Next.js', pct: 82 },
    { icon: '🌊', name: 'Webflow', pct: 99 },
  ]

  return (
    <section id="skills" className="py-[100px] bg-bg">
      <div className="container-custom">
        <div className="text-center">
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">My Skills</h2>
          <div className="section-divider section-divider-center" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[50px]">
          {skills.map((skill, i) => (
            <div key={i} className="bg-bg-card border border-border rounded-2xl p-8 text-center transition-all relative overflow-hidden group hover:border-primary hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(135,80,247,0.2)]">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 transition-transform group-hover:scale-x-100" />
              <div className="text-4xl mb-4 drop-shadow-[0_4px_12px_rgba(135,80,247,0.3)]">{skill.icon}</div>
              <div className="font-russo text-3xl text-primary-3 mb-1.5 leading-none">{skill.pct}%</div>
              <div className="text-xs font-semibold text-text-muted">{skill.name}</div>
              <div className="mt-3 h-1 bg-border-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-[width] duration-1000 delay-300" style={{ width: `${skill.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}