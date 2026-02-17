'use client'

import { useEffect } from 'react'

export default function NetworkEcosystem() {
  useEffect(() => {
    const floatImgs = document.querySelectorAll('.float-img')
    const speeds = [0.03, -0.04, 0.05, -0.03, 0.04, -0.035]
    let pTick = false

    function update() {
      const vh = window.innerHeight

      // Floating images: parallax
      floatImgs.forEach((img, i) => {
        const rect = img.getBoundingClientRect()
        const centerY = rect.top + rect.height / 2
        const offset = (centerY - vh / 2) / vh
        const speed = speeds[i % speeds.length]
        const ty = offset * speed * 200
        const baseRotate = (img as HTMLElement).dataset.rotate || '0'
        ;(img as HTMLElement).style.transform = `rotate(${baseRotate}deg) translateY(${ty}px)`
      })

      pTick = false
    }

    const onScroll = () => {
      if (!pTick) { requestAnimationFrame(update); pTick = true }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    // Keyword interactivity
    document.querySelectorAll('.nk').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.nk').forEach(n => n.classList.remove('active'))
        el.classList.add('active')
      })
    })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="network-section" id="network">
      <div className="container">
        <div className="network-badge sr"><span>The #1 Career Intelligence Network</span></div>
        <h2 className="section-heading sr">Unlock Your Potential in a Changing World of Work</h2>
        <p className="network-sub sr">From high school to your first post-University job to your next career move, Gigsup helps you uncover your strengths, connect them to careers that fit, and take focused action with clarity and advantage — through a personalized job, mentor, and education plan.</p>
        <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '48px' }} className="sr">
          <a href="/quick-start" className="btn-primary">JOIN FOR FREE <span className="arr">→</span></a>
        </div>

        <div className="network-showcase">
          {/* Ghost placeholder — the fixed video shrinks to fit here */}
          <div className="network-video-ghost" id="videoGhost"></div>

          {/* Floating images scattered around the video */}
          <div className="float-img fi-1" data-rotate="-3">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop" alt="Students collaborating" loading="lazy" />
          </div>
          <div className="float-img fi-2" data-rotate="2.5">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=350&h=450&fit=crop" alt="Young professionals" loading="lazy" />
          </div>
          <div className="float-img fi-3" data-rotate="2">
            <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop" alt="Career mentoring" loading="lazy" />
          </div>
          <div className="float-img fi-4" data-rotate="-2">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=350&h=400&fit=crop" alt="University campus" loading="lazy" />
          </div>
          <div className="float-img fi-5" data-rotate="1.5">
            <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop" alt="Team working together" loading="lazy" />
          </div>
        </div>

      </div>
    </section>
  )
}
