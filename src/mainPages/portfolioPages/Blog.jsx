export default function Blog() {
  const posts = [
    { icon: '🎨', cat: 'Tutorial', date: 'Oct 01, 2023', comments: 5, title: 'Top 10 UI/UX Designers You Should Follow in 2024', excerpt: 'Discover the most influential designers shaping the future of digital experiences around the world.', bg: 'from-[#1a0a2e] to-[#3d1a7a]' },
    { icon: '📱', cat: 'Tips', date: 'Nov 01, 2023', comments: 3, title: 'App Development Guide: From Idea to Launch', excerpt: 'A comprehensive guide covering everything you need to know about building successful mobile apps.', bg: 'from-[#0a1a2e] to-[#1a3d7a]' },
    { icon: '🆓', cat: 'Freebies', date: 'Dec 01, 2023', comments: 8, title: 'Learn Graphic Design for Free: Best Resources 2024', excerpt: 'The best free resources, tools, and courses to level up your graphic design skills today.', bg: 'from-[#1a2e0a] to-[#3d7a1a]' },
  ]

  return (
    <section id="blog" className="py-[100px] bg-bg">
      <div className="container-custom">
        <div className="text-center">
          <span className="section-label">Latest Posts</span>
          <h2 className="section-title">Recent Blogs</h2>
          <div className="section-divider section-divider-center" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-[50px]">
          {posts.map((post, i) => (
            <div key={i} className="bg-bg-card border border-border rounded-2xl overflow-hidden transition-all hover:border-primary hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(135,80,247,0.15)] group">
              <div className="relative aspect-video overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br ${post.bg}`}>
                  {post.icon}
                </div>
                <span className="absolute top-4 left-4 px-3.5 py-1 bg-primary rounded-[50px] text-[11px] font-bold text-white uppercase tracking-wide">
                  {post.cat}
                </span>
              </div>
              <div className="p-6">
                <div className="flex gap-4 text-xs text-text-muted mb-3.5">
                  <span className="flex items-center gap-1.5">📅 {post.date}</span>
                  <span className="flex items-center gap-1.5">💬 {post.comments} Comments</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-tight mb-3 group-hover:text-primary-3 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}