'use client'

import { useState } from 'react'

type LogoItem = string | { name: string; color?: string; logo?: string; initials?: string }

interface LogoCarouselProps {
  id?: string
  eyebrow?: string
  heading: string
  logos: LogoItem[]
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  rows?: 1 | 2
}

function LogoPill({ logo }: { logo: LogoItem }) {
  const [imgError, setImgError] = useState(false)

  if (typeof logo === 'string') {
    return <div className="carousel-logo-pill">{logo}</div>
  }

  const hasImage = logo.logo && !imgError

  return (
    <div className="carousel-logo-pill">
      {hasImage ? (
        <img
          src={logo.logo}
          alt={logo.name}
          className="carousel-pill-logo"
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className="carousel-pill-initials"
          style={{ background: logo.color }}
        >
          {logo.initials || logo.name.charAt(0)}
        </span>
      )}
      {logo.name}
    </div>
  )
}

export default function LogoCarousel({
  id,
  eyebrow,
  heading,
  logos,
  direction = 'left',
  speed = 'normal',
  rows = 1,
}: LogoCarouselProps) {
  if (rows === 2) {
    const mid = Math.ceil(logos.length / 2)
    const row1 = [...logos.slice(0, mid), ...logos.slice(0, mid)]
    const row2 = [...logos.slice(mid), ...logos.slice(mid)]
    const dir2 = direction === 'left' ? 'right' : 'left'

    return (
      <section className="carousel-section" id={id}>
        <div className="container">
          {eyebrow && <div className="carousel-eyebrow sr">{eyebrow}</div>}
          <h2 className="carousel-heading sr">{heading}</h2>
        </div>
        <div className="carousel-rows">
          <div className="carousel-track-wrapper sr">
            <div className={`carousel-track carousel-track--${direction} carousel-track--${speed}`}>
              {row1.map((logo, i) => (
                <LogoPill logo={logo} key={`r1-${i}`} />
              ))}
            </div>
          </div>
          <div className="carousel-track-wrapper sr">
            <div className={`carousel-track carousel-track--${dir2} carousel-track--${speed}`}>
              {row2.map((logo, i) => (
                <LogoPill logo={logo} key={`r2-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const track = [...logos, ...logos]

  return (
    <section className="carousel-section" id={id}>
      <div className="container">
        {eyebrow && <div className="carousel-eyebrow sr">{eyebrow}</div>}
        <h2 className="carousel-heading sr">{heading}</h2>
      </div>
      <div className="carousel-track-wrapper sr">
        <div className={`carousel-track carousel-track--${direction} carousel-track--${speed}`}>
          {track.map((logo, i) => (
            <LogoPill logo={logo} key={`${i}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
