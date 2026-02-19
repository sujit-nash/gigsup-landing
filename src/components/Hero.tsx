'use client'

import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    // Align lines 1 & 2 to start where "Achieve" starts
    const line1 = document.getElementById('heroLine1')
    const line2 = document.getElementById('heroLine2')
    const line3 = document.getElementById('heroLine3')
    const h1El = document.querySelector('.hero h1') as HTMLElement
    if (line3 && h1El) {
      const align = () => {
        const achieveSpan = line3.querySelector('.serif')
        const spans = line3.querySelectorAll('span')
        const advantageSpan = spans[spans.length - 1]
        if (!achieveSpan || !advantageSpan) return

        // Align lines 1 & 2 to Achieve
        const achieveLeft = achieveSpan.getBoundingClientRect().left
        const h1Left = h1El.getBoundingClientRect().left
        const offset = achieveLeft - h1Left
        if (line1) { line1.style.paddingLeft = '0'; line1.style.marginLeft = `${offset}px` }
        if (line2) { line2.style.paddingLeft = '0'; line2.style.marginLeft = `${offset}px` }
      }
      // Run after animations settle
      setTimeout(() => { requestAnimationFrame(align) }, 400)
      setTimeout(() => { requestAnimationFrame(align) }, 1200)
      window.addEventListener('resize', align)
    }

    const heroContent = document.getElementById('heroContent')
    const heroLine1 = document.getElementById('heroLine1')
    const heroLine2 = document.getElementById('heroLine2')
    const heroLine3 = document.getElementById('heroLine3')

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
        <h1>
          <span className="line" id="heroLine1"><span className="serif">Discover</span> You</span>
          <span className="line" id="heroLine2"><span className="grad">Match</span> to Careers that Fit</span>
          <span className="line" id="heroLine3"><span className="serif">Achieve</span> <span>Your</span> <span>Career</span> <span>Advantage</span></span>
        </h1>
      </div>
    </section>
  )
}
