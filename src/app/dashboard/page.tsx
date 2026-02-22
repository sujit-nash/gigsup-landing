'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Navigation from '@/components/Navigation'
import DashboardSidebar from '@/components/DashboardSidebar'

const mockMatches = [
  { title: 'UX Designer', fit: 94, growth: 'High', salary: '$65K–$95K', company: 'Tech & SaaS', trending: true },
  { title: 'Product Manager', fit: 89, growth: 'Very High', salary: '$75K–$120K', company: 'All Industries', trending: true },
  { title: 'Data Analyst', fit: 85, growth: 'High', salary: '$55K–$85K', company: 'Finance & Tech', trending: false },
  { title: 'Marketing Strategist', fit: 82, growth: 'Moderate', salary: '$50K–$80K', company: 'Media & Retail', trending: false },
  { title: 'Business Analyst', fit: 78, growth: 'High', salary: '$60K–$90K', company: 'Consulting', trending: false },
]

const skillGaps = [
  { skill: 'SQL & Data Querying', priority: 'High', action: 'Close Gap', progress: 15 },
  { skill: 'Stakeholder Management', priority: 'Medium', action: 'Find Mentor', progress: 40 },
  { skill: 'Figma Prototyping', priority: 'Medium', action: 'View Course', progress: 0 },
]

const discoverItems = [
  { icon: 'resume', label: 'Upload Resume', done: true, desc: 'Match to real jobs' },
  { icon: 'transcript', label: 'Upload Transcript', done: false, desc: 'Map your program' },
  { icon: 'journal', label: 'Career Journal', done: false, desc: 'Reflect & discover strengths' },
  { icon: 'skills', label: 'Skills Assessment', done: false, desc: 'Identify your edge' },
]

const regions = ['Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba', 'Saskatchewan']

function DiscoverIcon({ type }: { type: string }) {
  switch (type) {
    case 'resume': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    case 'transcript': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/></svg>
    case 'journal': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    case 'skills': return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    default: return null
  }
}

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState('Ontario')

  // Counter animation
  const animateCounters = useCallback(() => {
    const els = document.querySelectorAll('[data-counter]')
    els.forEach(el => {
      const target = parseInt((el as HTMLElement).dataset.counter || '0')
      let current = 0
      const step = Math.max(Math.ceil(target / 30), 1)
      const timer = setInterval(() => {
        current += step
        if (current >= target) { current = target; clearInterval(timer) }
        el.textContent = String(current)
      }, 40)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(animateCounters, 600)
    return () => clearTimeout(timer)
  }, [animateCounters])

  return (
    <div className="db-page">
      <Navigation />

      <div className="db-app">
        <DashboardSidebar region={selectedRegion} />

        <main className="db-main-area">
          {/* Top Bar */}
          <header className="db-topbar">
            <div className="db-topbar-left">
              <h1 className="db-topbar-title">
                Welcome back, <span className="db-accent">Jordan</span>
              </h1>
              <p className="db-topbar-sub">Discover every career your degree opens up</p>
            </div>
            <div className="db-topbar-right">
              <div className="db-region">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="db-region-select">
                  {regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="db-topbar-stats">
                <div className="db-mini-stat">
                  <span className="db-mini-num" data-counter="5">0</span>
                  <span className="db-mini-label">Matches</span>
                </div>
                <div className="db-mini-stat">
                  <span className="db-mini-num" data-counter="3">0</span>
                  <span className="db-mini-label">Skill Gaps</span>
                </div>
                <div className="db-mini-stat db-mini-stat-accent">
                  <span className="db-mini-num" data-counter="42">0</span>
                  <span className="db-mini-label">Clarity %</span>
                </div>
              </div>
            </div>
          </header>

          {/* 3-Column Cards */}
          <div className="db-columns">
            {/* ── DISCOVER ── */}
            <section className="db-col-card">
              <div className="db-col-header">
                <h2 className="db-col-title">DISCOVER</h2>
                <p className="db-col-desc">Build your profile through guided steps</p>
              </div>

              <div className="db-col-body">
                <div className="db-progress-wrap">
                  <div className="db-progress-info">
                    <span>Profile Progress</span>
                    <span className="db-progress-count">1 of 4</span>
                  </div>
                  <div className="db-progress-track">
                    <div className="db-progress-bar" style={{ width: '25%' }} />
                  </div>
                </div>

                <div className="db-checklist">
                  {discoverItems.map((item) => (
                    <button key={item.label} className={`db-check-item ${item.done ? 'db-done' : ''}`}>
                      <span className="db-check-icon">
                        <DiscoverIcon type={item.icon} />
                      </span>
                      <div className="db-check-body">
                        <span className="db-check-name">{item.label}</span>
                        <span className="db-check-desc">{item.desc}</span>
                      </div>
                      {item.done ? (
                        <span className="db-check-done">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                      ) : (
                        <span className="db-check-arrow">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <p className="db-col-footer">Complete all to unlock AI-powered career insights</p>
              </div>
            </section>

            {/* ── MATCH ── */}
            <section className="db-col-card">
              <div className="db-col-header">
                <h2 className="db-col-title">MATCH</h2>
                <p className="db-col-desc">Reveal jobs that truly align with your degree</p>
              </div>

              <div className="db-col-body">
                <div className="db-matches">
                  {mockMatches.map((match, i) => (
                    <button key={match.title} className="db-match-card">
                      <div className="db-match-ring-wrap">
                        <svg viewBox="0 0 64 64" className="db-match-ring-svg">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" className="db-ring-bg" strokeWidth="4" fill="none" />
                          <circle cx="32" cy="32" r="28" className="db-ring-fill" strokeWidth="4" fill="none"
                            strokeDasharray={`${match.fit * 1.76} 176`} strokeLinecap="round" />
                        </svg>
                        <span className="db-match-pct">{match.fit}%</span>
                      </div>
                      <div className="db-match-info">
                        <span className="db-match-title">
                          {match.title}
                          {match.trending && <span className="db-trending">Trending</span>}
                        </span>
                        <span className="db-match-meta">{match.salary} · {match.growth} growth</span>
                      </div>
                      <span className="db-match-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </span>
                    </button>
                  ))}
                </div>

                <button className="db-view-all-btn">
                  View All 5 Matches
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </section>

            {/* ── ACHIEVE ── */}
            <section className="db-col-card">
              <div className="db-col-header">
                <h2 className="db-col-title">ACHIEVE</h2>
                <p className="db-col-desc">3 ways to land your first role</p>
              </div>

              <div className="db-col-body">
                {/* Skill Gaps */}
                <h4 className="db-subsection-label">Skill Gaps to Close</h4>
                <div className="db-gaps">
                  {skillGaps.map((gap) => (
                    <div key={gap.skill} className="db-gap-card">
                      <div className="db-gap-top">
                        <span className="db-gap-name">{gap.skill}</span>
                        <span className={`db-priority ${gap.priority === 'High' ? 'db-priority-high' : 'db-priority-med'}`}>
                          {gap.priority}
                        </span>
                      </div>
                      {gap.progress > 0 && (
                        <div className="db-gap-progress">
                          <div className="db-gap-fill" style={{ width: `${gap.progress}%` }} />
                        </div>
                      )}
                      <button className="db-gap-action">
                        {gap.action}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Application Tracker */}
                <h4 className="db-subsection-label">Application Tracker</h4>
                <div className="db-tracker">
                  {[
                    { label: 'Applied', count: 0, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
                    { label: 'Interview', count: 0, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                    { label: 'Offer', count: 0, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                  ].map((s) => (
                    <div key={s.label} className="db-tracker-card">
                      <span className="db-tracker-icon">{s.icon}</span>
                      <span className="db-tracker-count">{s.count}</span>
                      <span className="db-tracker-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
