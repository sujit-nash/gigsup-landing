'use client'

import { useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  useEffect(() => {
    const navWrap = document.getElementById('navWrap')
    if (!navWrap) return

    const handleScroll = () => {
      const progress = window.scrollY / (window.innerHeight * 0.9)
      navWrap.classList.toggle('scrolled', progress > 0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="nav-wrap" id="navWrap">
      <nav className="nav">
        <a href="/" className="nav-logo">
          <img src="/gigsup-logo.png" alt="Gigsup" style={{ height: '32px', width: 'auto' }} />
        </a>
        <ul className="nav-center">
          <li className="nav-item">
            Students <span className="chevron">▾</span>
            <div className="nav-dropdown">
              <a href="/quick-start">Career Search</a>
              <a href="/career">Job Postings</a>
              <a href="#">The Community</a>
            </div>
          </li>
          <li className="nav-item">Employers</li>
          <li className="nav-item">Career Centers</li>
          <li className="nav-item">
            Company <span className="chevron">▾</span>
            <div className="nav-dropdown">
              <a href="#">About</a>
              <a href="#">Join Us</a>
              <a href="#">Press</a>
              <a href="#">Blog</a>
            </div>
          </li>
        </ul>
        <div className="nav-right">
          <ThemeToggle />
          <a href="/login" className="btn-login">Login</a>
          <a href="/quick-start" className="btn-join">Join for Free</a>
        </div>
      </nav>
    </div>
  )
}
