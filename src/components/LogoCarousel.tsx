'use client'

import { useState } from 'react'

type LogoItem = string | { name: string; color?: string; logo?: string; initials?: string }

interface LogoCarouselProps {
  id?: string
  eyebrow?: string
  heading: string
  subtitle?: string
  logos: LogoItem[]
  direction?: 'left' | 'right'
  speed?: 'slow' | 'normal' | 'fast'
  rows?: 1 | 2 | 3
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
  subtitle,
  logos,
  direction = 'left',
  speed = 'normal',
  rows = 1,
}: LogoCarouselProps) {
  const headerBlock = (
    <div className="container">
      {eyebrow && <div className="carousel-eyebrow sr">{eyebrow}</div>}
      <h2 className="carousel-heading sr">{heading}</h2>
      {subtitle && <p className="carousel-subtitle sr">{subtitle}</p>}
    </div>
  )

  if (rows > 1) {
    const perRow = Math.ceil(logos.length / rows)
    const rowData: LogoItem[][] = []
    for (let r = 0; r < rows; r++) {
      const slice = logos.slice(r * perRow, (r + 1) * perRow)
      rowData.push([...slice, ...slice])
    }

    return (
      <section className="carousel-section" id={id}>
        {headerBlock}
        <div className="carousel-rows">
          {rowData.map((row, r) => {
            const dir = r % 2 === 0 ? direction : (direction === 'left' ? 'right' : 'left')
            return (
              <div className="carousel-track-wrapper sr" key={r}>
                <div className={`carousel-track carousel-track--${dir} carousel-track--${speed}`}>
                  {row.map((logo, i) => (
                    <LogoPill logo={logo} key={`r${r}-${i}`} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  const track = [...logos, ...logos]

  return (
    <section className="carousel-section" id={id}>
      {headerBlock}
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
