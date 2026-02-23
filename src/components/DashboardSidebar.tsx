'use client'

import { useEffect, useRef } from 'react'

interface DashboardSidebarProps {
  region: string
}

const navLinks = [
  {
    label: 'Dashboard',
    desc: 'Overview & insights',
    active: true,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    label: 'Job Matches',
    desc: 'Ranked opportunities',
    active: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    label: 'Saved Careers',
    desc: 'Your favourites',
    active: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    label: 'Explore Careers',
    desc: 'Discover pathways',
    active: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  },
]

const quickLinks = [
  {
    label: 'Upload Resume',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
  {
    label: 'Upload Transcript',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/></svg>,
  },
  {
    label: 'Find Mentors',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
]

export default function DashboardSidebar({ region }: DashboardSidebarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = '42%'
    }, 900)
    return () => clearTimeout(timer)
  }, [])

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
          <p className="db-profile-role">High School Explorer</p>
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
          {navLinks.map((link) => (
            <a key={link.label} href="#" className={`db-side-link ${link.active ? 'db-side-link-active' : ''}`}>
              <span className={`db-side-link-icon ${link.active ? 'db-side-link-icon-active' : ''}`}>
                {link.icon}
              </span>
              <div className="db-side-link-text">
                <span className="db-side-link-name">{link.label}</span>
                <span className="db-side-link-desc">{link.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </nav>

      {/* Next Step CTA */}
      <div className="db-side-cta-card">
        <h4 className="db-side-cta-title">Next Step</h4>
        <p className="db-side-cta-text">Upload your resume for personalized career matches.</p>
        <a href="#" className="db-side-cta-btn">
          Upload Resume
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>

    </aside>
  )
}
