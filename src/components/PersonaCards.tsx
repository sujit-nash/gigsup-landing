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

    // Expandable feature lists
    document.querySelectorAll('.persona-expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.persona-card')
        if (!card) return
        const list = card.querySelector('.persona-features') as HTMLElement
        const isOpen = card.classList.contains('features-open')
        card.classList.toggle('features-open')
        btn.textContent = isOpen ? '+' : '−'
        if (list) {
          list.style.maxHeight = isOpen ? '0' : list.scrollHeight + 'px'
        }
      })
    })

    return () => counterObs.disconnect()
  }, [])

  return (
    <section className="personas" id="personas">
      <div className="container">
        <p className="personas-intro sr">From high school to your first post-University job to your next career move, Gigsup helps you uncover your strengths, connect them to careers that fit, and take focused action with clarity and advantage — through a personalized job, mentor, and education plan.</p>
        <div className="personas-cta-actions sr">
          <a href="/quick-start" className="btn-primary">Free to Join the Community <span className="arr">→</span></a>
        </div>
        <p className="personas-cta-meta sr">Takes 2 minutes</p>

        <div className="personas-grid">
          {/* High School */}
          <div className="persona-card sr" style={{ transitionDelay: '0s' }}>
            <div className="persona-icon">🎓</div>
            <h3>I&apos;m in High School</h3>
            <p className="persona-tagline">Explore what&apos;s possible</p>
            <p>Discover who you are and plan where you&apos;re going. Build a post-secondary admission &amp; career plan aligned to your strengths.</p>
            <a href="/quick-start" className="persona-cta">Get Your Top 5 Career Matches <span>→</span></a>
          </div>

          {/* University */}
          <div className="persona-card sr" style={{ transitionDelay: '0.12s' }}>
            <div className="persona-icon">📚</div>
            <h3>I&apos;m in Uni / College</h3>
            <p className="persona-tagline">Land your first role</p>
            <p>Discover your edge. Match your degree to opportunity. See the career paths your major unlocks &amp; identify co-ops and internships to help you standout.</p>
            <a href="/quick-start" className="persona-cta">Get Your Top 5 Career Matches <span>→</span></a>
          </div>

          {/* Mid-Career */}
          <div className="persona-card sr" style={{ transitionDelay: '0.24s' }}>
            <div className="persona-icon">🚀</div>
            <h3>I&apos;m Mid-Career</h3>
            <p className="persona-tagline">Own your next chapter</p>
            <p>Rediscover your strengths. Re-match your path. Get a personalized education plan, mentor match &amp; strategic job postings just for you.</p>
            <a href="/quick-start" className="persona-cta">Get Your Top 5 Career Matches <span>→</span></a>
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
