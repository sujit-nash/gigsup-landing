'use client'

import { useState } from 'react'

interface Partner {
  name: string
  logo: string
}

const partners: Partner[] = [
  { name: 'Accelerate Okanagan', logo: '/logos/partners/accelerate.png' },
  { name: 'Spring', logo: '/logos/partners/spring.png' },
  { name: 'M51 Accelerator', logo: '/logos/partners/m51.webp' },
  { name: 'NVIDIA Inception', logo: '/logos/partners/nvidia.png' },
  { name: 'Virtual Trade Accelerator', logo: '/logos/partners/vta.png' },
  { name: 'NRC IRAP', logo: '/logos/partners/nrcirap.png' },
  { name: 'Mitacs', logo: '/logos/partners/mitacs.png' },
  { name: 'BCIT', logo: '/logos/partners/bcit.png' },
  { name: 'UCW', logo: '/logos/partners/ucw.png' },
]

function PartnerLogo({ partner }: { partner: Partner }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="partner-item sr">
      {!imgError ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="partner-logo"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="partner-fallback">{partner.name.charAt(0)}</span>
      )}
      <span className="partner-name">{partner.name}</span>
    </div>
  )
}

export default function PartnerWall() {
  return (
    <section className="partner-section" id="supporters">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow sr">Our Partners</div>
          <h2 className="section-heading sr">Supported By</h2>
        </div>
        <div className="partner-grid">
          {partners.map((p, i) => (
            <PartnerLogo partner={p} key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
