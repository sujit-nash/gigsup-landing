'use client'

import { useEffect, useRef, useState, useMemo } from 'react'

const faces = [
  'https://images.unsplash.com/photo-1464863979621-258859e62245?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
]

function generateScatterOffsets(count: number) {
  const offsets: { x: number; y: number; rot: number }[] = []
  let seed = 42
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
  for (let i = 0; i < count; i++) {
    offsets.push({
      x: (rand() - 0.5) * 300,
      y: (rand() - 0.5) * 200,
      rot: (rand() - 0.5) * 40,
    })
  }
  return offsets
}

export default function JoinNetwork() {
  const facesRef = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const scatterOffsets = useMemo(() => generateScatterOffsets(faces.length), [])

  useEffect(() => {
    const el = facesRef.current
    if (!el) return

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTriggered(true)
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

        <div className={`join-faces ${triggered ? 'visible' : ''}`} ref={facesRef}>
          {faces.map((src, i) => (
            <div
              className="join-face"
              key={i}
              style={
                triggered
                  ? { transitionDelay: `${i * 0.08}s` }
                  : {
                      transform: `translate(${scatterOffsets[i].x}px, ${scatterOffsets[i].y}px) rotate(${scatterOffsets[i].rot}deg) scale(0.6)`,
                      opacity: 0,
                      transitionDelay: `${i * 0.08}s`,
                    }
              }
            >
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
