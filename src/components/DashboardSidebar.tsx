'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface DashboardSidebarProps {
  region: string
  isMatchUnlocked: boolean
  isAchieveUnlocked: boolean
  isDiscoverComplete?: boolean
  isAchieveStarted?: boolean
}

const navLinks = [
  {
    label: 'Dashboard',
    desc: 'Overview & insights',
    key: 'dashboard',
    lockKey: null,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    label: 'Discover',
    desc: 'Build your profile',
    key: 'discover',
    lockKey: null,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>,
  },
  {
    label: 'Match',
    desc: 'Find your path',
    key: 'match',
    lockKey: 'match' as const,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    label: 'Achieve',
    desc: 'Take action',
    key: 'achieve',
    lockKey: 'achieve' as const,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  },
]

export default function DashboardSidebar({ region, isMatchUnlocked, isAchieveUnlocked, isDiscoverComplete, isAchieveStarted }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = '42%'
    }, 900)
    return () => clearTimeout(timer)
  }, [])

  function isLocked(lockKey: string | null) {
    if (lockKey === 'match') return !isMatchUnlocked
    if (lockKey === 'achieve') return !isAchieveUnlocked
    return false
  }

  function handleNavClick(key: string) {
    // Always go to /dashboard, then dispatch event to open the right panel
    if (pathname !== '/dashboard') {
      router.push('/dashboard')
      // Wait for navigation, then dispatch
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: { panel: key } }))
      }, 100)
    } else {
      window.dispatchEvent(new CustomEvent('dashboard-navigate', { detail: { panel: key } }))
    }
  }

  // Determine which sidebar link is "active"
  const activeKey = pathname === '/dashboard' ? 'dashboard' : null

  // Determine next step CTA
  const nextStep = !isDiscoverComplete
    ? { text: 'Complete your profile to unlock career matches.', cta: 'Go to Discover', key: 'discover' }
    : !isAchieveUnlocked
    ? { text: 'Swipe through careers and pick your focus.', cta: 'Go to Match', key: 'match' }
    : !isAchieveStarted
    ? { text: 'Build your personalized career roadmap.', cta: 'Go to Achieve', key: 'achieve' }
    : { text: 'Review your career roadmap.', cta: 'Go to Achieve', key: 'achieve' }

  return (
    <aside className="db-sidebar">
      {/* Profile Card */}
      <div className="db-side-profile">
        <div className="db-avatar">
          <span>JD</span>
          <div className="db-avatar-dot" />
        </div>
        <div className="db-profile-info">
          <h3>Jordan Davis</h3>
          <div className="db-profile-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {region}
          </div>
        </div>

        {/* Career Clarity inline */}
        <div className="db-profile-clarity">
          <div className="db-profile-clarity-top">
            <span className="db-profile-clarity-label">Career Clarity</span>
            <span className="db-profile-clarity-val">42%</span>
          </div>
          <div className="db-profile-clarity-track">
            <div className="db-profile-clarity-fill" ref={barRef} style={{ width: 0 }} />
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="db-side-nav">
        <p className="db-side-nav-label">Navigate</p>
        <div className="db-side-nav-links">
          {navLinks.map((link) => {
            const locked = isLocked(link.lockKey)
            const active = activeKey === link.key

            if (locked) {
              return (
                <div key={link.label} className="db-side-link db-side-link-locked">
                  <span className="db-side-link-icon">
                    {link.icon}
                  </span>
                  <div className="db-side-link-text">
                    <span className="db-side-link-name">{link.label}</span>
                    <span className="db-side-link-desc">{link.desc}</span>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="db-side-lock-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
              )
            }

            return (
              <button key={link.label} className={`db-side-link ${active ? 'db-side-link-active' : ''}`} onClick={() => handleNavClick(link.key)}>
                <span className={`db-side-link-icon ${active ? 'db-side-link-icon-active' : ''}`}>
                  {link.icon}
                </span>
                <div className="db-side-link-text">
                  <span className="db-side-link-name">{link.label}</span>
                  <span className="db-side-link-desc">{link.desc}</span>
                </div>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Next Step CTA */}
      <div className="db-side-cta-card">
        <h4 className="db-side-cta-title">Next Step</h4>
        <p className="db-side-cta-text">{nextStep.text}</p>
        <button className="db-side-cta-btn" onClick={() => handleNavClick(nextStep.key)}>
          {nextStep.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </aside>
  )
}
