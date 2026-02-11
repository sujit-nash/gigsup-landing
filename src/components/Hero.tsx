'use client'

import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    const heroContent = document.getElementById('heroContent')
    const heroLine1 = document.getElementById('heroLine1')
    const heroLine2 = document.getElementById('heroLine2')
    const heroLine3 = document.getElementById('heroLine3')
    const scrollHint = document.getElementById('scrollHint')

    let ticking = false
    function onScroll() {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const progress = Math.min(scrollY / (vh * 0.5), 1)

      // Content: fade
      if (heroContent) {
        heroContent.style.opacity = String(Math.max(1 - progress * 1.2, 0))
      }

      // Text lines: staggered spread apart
      if (heroLine1) heroLine1.style.transform = `translateY(${-progress * 60}px) translateX(${-progress * 20}px)`
      if (heroLine2) heroLine2.style.transform = `translateX(${progress * 30}px)`
      if (heroLine3) heroLine3.style.transform = `translateY(${progress * 60}px) translateX(${-progress * 15}px)`

      // Scroll hint
      if (scrollHint) {
        scrollHint.style.opacity = String(Math.max(1 - scrollY / (vh * 0.12), 0))
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="hero-inner" id="heroContent">
        <div className="hero-tag"><span className="dot"></span> AI-Powered Career Intelligence</div>
        <h1>
          <span className="line" id="heroLine1"><span className="serif">Discover</span> You.</span>
          <span className="line" id="heroLine2"><span className="grad">Match</span> to Careers that Fit.</span>
          <span className="line" id="heroLine3"><span className="serif">Achieve</span> Your career Advantage.</span>
        </h1>
        <div className="hero-diamond"></div>
        <p className="hero-sub">Unlock your potential in a changing world of work. From high school to your next career move, GigsUp helps you uncover your strengths, connect to careers that fit, and take action with clarity.</p>
        <p className="hero-sub-small"><span className="green-text">Free to join</span> · Takes 2 minutes · Powered by <span className="green-text">real data</span></p>
        <div className="hero-actions">
          <a href="/quick-start" className="btn-primary">Join the Community <span className="arr">→</span></a>
          <a href="/assessment" className="btn-ghost">Take VISI Assessment</a>
        </div>
      </div>

      <div className="scroll-hint" id="scrollHint">
        <div className="line"></div>
        Scroll
      </div>
    </section>
  )
}
