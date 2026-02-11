'use client'

import { useEffect, useRef } from 'react'

export default function VideoTransition() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const overlay = overlayRef.current
    const ghost = document.getElementById('videoGhost')
    if (!wrap || !ghost) return

    let ticking = false

    function onScroll() {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      const vw = window.innerWidth

      const ghostRect = ghost!.getBoundingClientRect()
      const ghostPageTop = ghostRect.top + scrollY
      const endScroll = Math.max(1, ghostPageTop - vh * 0.45)

      const rawProgress = Math.min(scrollY / endScroll, 1)
      // Ease-in-out for smooth feel
      const progress = rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2

      // Target scale (ghost width relative to viewport width)
      const targetScale = ghostRect.width / vw

      // Current scale: 1 → targetScale
      const currentScale = 1 - progress * (1 - targetScale)

      // Target translate: from viewport center to ghost center
      const ghostCX = ghostRect.left + ghostRect.width / 2
      const ghostCY = ghostRect.top + ghostRect.height / 2
      const tx = progress * (ghostCX - vw / 2)
      const ty = progress * (ghostCY - vh / 2)

      // Border radius
      const radius = progress * 20

      wrap!.style.transform = `translate(${tx}px, ${ty}px) scale(${currentScale})`
      wrap!.style.borderRadius = `${radius}px`

      // Overlay fades away
      if (overlay) {
        overlay.style.opacity = String(Math.max(1 - rawProgress * 2.5, 0))
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="video-fixed" ref={wrapRef}>
      <video
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="video-fixed-overlay" ref={overlayRef}></div>
    </div>
  )
}
