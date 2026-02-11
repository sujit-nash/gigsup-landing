'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const srEls = document.querySelectorAll('.sr')
    const srObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          srObs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    srEls.forEach(el => srObs.observe(el))

    return () => srObs.disconnect()
  }, [])

  return null
}
