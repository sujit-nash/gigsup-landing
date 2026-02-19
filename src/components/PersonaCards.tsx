'use client'

import { useEffect, useState, useCallback } from 'react'

const personas = [
  {
    id: 'highschool',
    icon: '🎓',
    tab: 'High School',
    title: "I'm in High School",
    tagline: 'Explore what\'s possible',
    description: 'Discover who you are and plan where you\'re going. Build a post-secondary admission & career plan aligned to your strengths.',
    cta: 'Get Your Post-Secondary Admission Plan',
    href: '/quick-start',
  },
  {
    id: 'university',
    icon: '📚',
    tab: 'University',
    title: "I'm in Uni / College",
    tagline: 'Land your first role',
    description: 'Discover your edge. Match your degree to opportunity. See the career paths your major unlocks & identify co-ops / internships to help you standout.',
    cta: 'Discover the Top 5 Career Matches for Your Degree',
    href: '/quick-start',
  },
  {
    id: 'midcareer',
    icon: '🚀',
    tab: 'Mid-Career',
    title: "I'm Mid-Career",
    tagline: 'Own your next chapter',
    description: 'Rediscover your strengths. Re-match your path. Get a personalized education plan, mentor match & strategic job postings just for you.',
    cta: 'Get Your Personalized Career Plan',
    href: '/quick-start',
  },
]

const stats = [
  { value: 1000, label: 'Career Profiles' },
  { value: 40000, label: 'Job Titles' },
  { value: 1000, label: 'Members' },
]

const CYCLE_MS = 5000

export default function PersonaCards() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % personas.length)
    setProgress(0)
  }, [])

  // Auto-cycle
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          next()
          return 0
        }
        return prev + (100 / (CYCLE_MS / 50))
      })
    }, 50)
    return () => clearInterval(interval)
  }, [paused, next])

  const selectTab = (i: number) => {
    setActive(i)
    setProgress(0)
  }

  // Counter animation — only triggers when stats row scrolls into view
  useEffect(() => {
    const statsRow = document.querySelector('.stats-row')
    if (!statsRow) return

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = statsRow.querySelectorAll('[data-count]')
          counters.forEach(c => {
            const el = c as HTMLElement
            const target = parseInt(el.dataset.count || '0')
            let current = 0
            const step = Math.max(Math.ceil(target / 70), 1)
            const timer = setInterval(() => {
              current += step
              if (current >= target) { current = target; clearInterval(timer) }
              el.textContent = current.toLocaleString()
            }, 20)
          })
          counterObs.unobserve(statsRow)
        }
      })
    }, { threshold: 0.8 })

    counterObs.observe(statsRow)
    return () => counterObs.disconnect()
  }, [])

  const p = personas[active]

  return (
    <section className="personas" id="personas">
      <div className="container">
        <div className="persona-header sr">
          <div className="section-eyebrow" style={{ textAlign: 'center' }}>Built for You</div>
          <h2 className="section-heading">Where are you on your <span style={{ color: '#000000' }}>journey?</span></h2>
        </div>

        {/* Tab selector */}
        <div
          className="persona-tabs sr"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {personas.map((persona, i) => (
            <button
              key={persona.id}
              className={`persona-tab ${i === active ? 'active' : ''}`}
              onClick={() => selectTab(i)}
            >
              <span className="persona-tab-icon">{persona.icon}</span>
              <span className="persona-tab-label">{persona.tab}</span>
              {i === active && (
                <div className="persona-tab-progress">
                  <div className="persona-tab-bar" style={{ width: `${progress}%` }} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div
          className="persona-showcase sr"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          key={active}
        >
          <div className="persona-showcase-content">
            <div className="persona-showcase-badge">{p.tagline}</div>
            <h3 className="persona-showcase-title">{p.title}</h3>
            <p className="persona-showcase-desc">{p.description}</p>
            <a href={p.href} className="persona-showcase-cta">
              {p.cta} <span>→</span>
            </a>
          </div>
          <div className="persona-showcase-visual">
            <div className="persona-showcase-icon">{p.icon}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row sr">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-val">
                <span className="g" data-count={s.value}>0</span>+
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
