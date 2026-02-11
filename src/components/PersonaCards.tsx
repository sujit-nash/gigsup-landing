'use client'

import { useEffect } from 'react'

export default function PersonaCards() {
  useEffect(() => {
    // Counter animation
    const counters = document.querySelectorAll('[data-count]')
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const target = parseInt(el.dataset.count || '0')
          let current = 0
          const step = Math.max(Math.ceil(target / 70), 1)
          const timer = setInterval(() => {
            current += step
            if (current >= target) { current = target; clearInterval(timer) }
            el.textContent = current >= 1000
              ? (current / 1000).toFixed(0) + 'K'
              : current.toLocaleString()
            if (current >= target && target >= 1000) el.textContent = (target / 1000) + 'K'
          }, 20)
          counterObs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach(c => counterObs.observe(c))

    return () => counterObs.disconnect()
  }, [])

  return (
    <section className="personas" id="personas">
      <div className="container">
        <div className="personas-grid">
          {/* High School */}
          <div className="persona-card sr" style={{ transitionDelay: '0s' }}>
            <div className="persona-icon">🎓</div>
            <h3>I&apos;m in High School</h3>
            <p className="persona-tagline">Explore what&apos;s possible</p>
            <p>Discover who you are and plan where you&apos;re going. Build an admission &amp; career plan aligned to your strengths.</p>
            <ul className="persona-features">
              <li>Journaling &amp; self-discovery</li>
              <li>School requirements &amp; admissions plan</li>
              <li>Career exploration</li>
            </ul>
            <div className="persona-pain">
              <div className="persona-pain-title">Top Pain Points</div>
              <ul>
                <li><span className="num">01</span> Knowing career options/day-in-the-life</li>
                <li><span className="num">02</span> High school → uni education plan</li>
              </ul>
            </div>
            <a href="/quick-start" className="persona-cta">Get Your Top 5 Career Matches <span>→</span></a>
          </div>

          {/* University */}
          <div className="persona-card sr" style={{ transitionDelay: '0.12s' }}>
            <div className="persona-icon">📚</div>
            <h3>I&apos;m in Uni / College</h3>
            <p className="persona-tagline">Land your first role</p>
            <p>Discover your edge. Match your degree to opportunity. See career paths, major unlocks &amp; identify co-ops and internships.</p>
            <ul className="persona-features">
              <li>Resume &amp; transcript analysis</li>
              <li>Job matching based on degree</li>
              <li>Skill gap closing</li>
              <li>Mentor connections</li>
            </ul>
            <div className="persona-pain">
              <div className="persona-pain-title">Top Pain Points</div>
              <ul>
                <li><span className="num">01</span> Landing first job out of school</li>
                <li><span className="num">02</span> Knowing what you can do with your degree</li>
              </ul>
            </div>
            <a href="/quick-start" className="persona-cta">Find Your 1st Job <span>→</span></a>
          </div>

          {/* Mid-Career */}
          <div className="persona-card sr" style={{ transitionDelay: '0.24s' }}>
            <div className="persona-icon">🚀</div>
            <h3>I&apos;m Mid-Career</h3>
            <p className="persona-tagline">Own your next chapter</p>
            <p>Rediscover your strengths. Re-match your path. Get a personalized education plan, mentor match &amp; strategic job postings.</p>
            <ul className="persona-features">
              <li>LinkedIn &amp; resume analysis</li>
              <li>Career pivoting &amp; story building</li>
              <li>Track career projects &amp; education</li>
              <li>Build your skill toolbox</li>
            </ul>
            <div className="persona-pain">
              <div className="persona-pain-title">Top Pain Points</div>
              <ul>
                <li><span className="num">01</span> Knowing what&apos;s next / career pivot</li>
                <li><span className="num">02</span> Translating skills to new roles</li>
              </ul>
            </div>
            <a href="/quick-start" className="persona-cta">Get Your Top 5 Career Moves <span>→</span></a>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row sr">
          <div className="stat-item">
            <div className="stat-val"><span className="g" data-count="900">0</span>+</div>
            <div className="stat-label">Career Profiles</div>
          </div>
          <div className="stat-item">
            <div className="stat-val"><span className="g" data-count="40000">0</span>+</div>
            <div className="stat-label">Job Titles</div>
          </div>
          <div className="stat-item">
            <div className="stat-val"><span className="g" data-count="500">0</span>+</div>
            <div className="stat-label">Members</div>
          </div>
        </div>
      </div>
    </section>
  )
}
