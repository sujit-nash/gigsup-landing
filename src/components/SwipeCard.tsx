'use client'

import { useRef, useState, useCallback } from 'react'
import type { CareerProfile } from '@/lib/mock-data'

interface SwipeCardProps {
  profile: CareerProfile
  onSwipe: (direction: 'left' | 'right') => void
  isTop: boolean
  stackIndex: number
}

export default function SwipeCard({ profile, onSwipe, isTop, stackIndex }: SwipeCardProps) {
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const threshold = 100

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isTop) return
    setDragging(true)
    startX.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [isTop])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    setOffset(e.clientX - startX.current)
  }, [dragging])

  const handlePointerUp = useCallback(() => {
    if (!dragging) return
    setDragging(false)
    if (offset > threshold) {
      onSwipe('right')
    } else if (offset < -threshold) {
      onSwipe('left')
    }
    setOffset(0)
  }, [dragging, offset, onSwipe])

  const rotation = offset * 0.08
  const opacity = Math.min(Math.abs(offset) / threshold, 1)
  const direction = offset > 0 ? 'right' : 'left'

  const stackStyle = !isTop ? {
    transform: `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 8}px)`,
    zIndex: 10 - stackIndex,
    opacity: stackIndex > 1 ? 0 : 1,
  } : {
    transform: dragging
      ? `translateX(${offset}px) rotate(${rotation}deg)`
      : 'translateX(0) rotate(0)',
    zIndex: 20,
    transition: dragging ? 'none' : 'transform 0.3s ease',
    cursor: 'grab',
  }

  return (
    <div
      className="db-swipe-card"
      style={stackStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Direction indicators */}
      {isTop && dragging && (
        <>
          <div className="db-swipe-indicator db-swipe-indicator--save" style={{ opacity: direction === 'right' ? opacity : 0 }}>
            SAVE
          </div>
          <div className="db-swipe-indicator db-swipe-indicator--skip" style={{ opacity: direction === 'left' ? opacity : 0 }}>
            SKIP
          </div>
        </>
      )}

      <div className="db-swipe-card-header">
        <div className="db-swipe-fit">
          <span className="db-swipe-fit-num">{profile.fit}%</span>
          <span className="db-swipe-fit-label">FIT</span>
        </div>
        <div className="db-swipe-card-title-area">
          <h3 className="db-swipe-card-title">{profile.title}</h3>
          <span className="db-swipe-card-industry">{profile.industry}</span>
        </div>
        {profile.trending && <span className="db-swipe-trending">Trending</span>}
      </div>

      <p className="db-swipe-card-desc">{profile.description}</p>

      <div className="db-swipe-card-details">
        <div className="db-swipe-detail">
          <span className="db-swipe-detail-label">Salary Range</span>
          <span className="db-swipe-detail-val">{profile.salary}</span>
        </div>
        <div className="db-swipe-detail">
          <span className="db-swipe-detail-label">Growth</span>
          <span className="db-swipe-detail-val">{profile.growth}</span>
        </div>
      </div>

      {isTop && !dragging && (
        <p className="db-swipe-hint">Drag right to save, left to skip</p>
      )}
    </div>
  )
}
