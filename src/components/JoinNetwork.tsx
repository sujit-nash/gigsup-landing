'use client'

import { useEffect, useRef } from 'react'

const faces = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1529470839332-78ad660a6a82?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
]

export default function JoinNetwork() {
  const facesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = facesRef.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Pop in scattered
          el.classList.add('visible')

          obs.unobserve(el)
        }
      })
    }, { threshold: 0.3 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="network-join-section">
      <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 className="section-heading sr">Join Network for Students</h2>
        <p className="network-sub sr">We built Canada&apos;s student network ecosystem. Gigsup connects you to mentors, schools &amp; employers within a growing career network. All aligned to your strengths &amp; next move.</p>

        <div className="join-faces" ref={facesRef}>
          {faces.map((src, i) => (
            <div className="join-face" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
