'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePipelineState } from '@/lib/pipeline-state'
import { careerProfiles } from '@/lib/mock-data'
import SwipeCard from '@/components/SwipeCard'
import StepLock from '@/components/StepLock'

export default function MatchPage() {
  const pipeline = usePipelineState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const remaining = careerProfiles.slice(currentIndex)

  const handleSwipe = (direction: 'left' | 'right') => {
    const profile = careerProfiles[currentIndex]
    pipeline.recordDecision(
      profile.id,
      profile.title,
      direction === 'right' ? 'saved' : 'disregarded'
    )

    if (currentIndex + 1 >= careerProfiles.length) {
      setShowResults(true)
    }
    setCurrentIndex(prev => prev + 1)
  }

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    handleSwipe(direction)
  }

  // Already completed - show summary
  if (pipeline.state.match.selectedFocus) {
    return (
      <StepLock isUnlocked={pipeline.isMatchUnlocked} stepName="Match" prerequisite="Discover">
        <div className="db-match">
          <div className="db-match-complete">
            <div className="db-match-complete-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h2>Your Career Focus</h2>
            <div className="db-match-focus-card">
              <h3>{pipeline.state.match.selectedFocus}</h3>
              <p>You&apos;ve chosen this as your primary career goal. Your Achieve roadmap is built around this.</p>
            </div>
            <div className="db-match-summary-stats">
              <div className="db-match-summary-stat">
                <span className="db-match-summary-num">{pipeline.savedCareers.length}</span>
                <span className="db-match-summary-label">Saved</span>
              </div>
              <div className="db-match-summary-stat">
                <span className="db-match-summary-num">{pipeline.state.match.decisions.filter(d => d.decision === 'disregarded').length}</span>
                <span className="db-match-summary-label">Skipped</span>
              </div>
            </div>
            <Link href="/dashboard/achieve" className="db-discover-cta">
              Go to Achieve
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </StepLock>
    )
  }

  return (
    <StepLock isUnlocked={pipeline.isMatchUnlocked} stepName="Match" prerequisite="Discover">
      <div className="db-match">
        {!showResults ? (
          <>
            <div className="db-match-header">
              <h2 className="db-discover-heading">Find Your Career</h2>
              <p className="db-discover-sub">Swipe right to save, left to skip. Then pick your focus.</p>
              <div className="db-swipe-counter">
                {currentIndex + 1} of {careerProfiles.length} profiles
              </div>
            </div>

            <div className="db-swipe-area">
              {remaining.slice(0, 3).map((profile, i) => (
                <SwipeCard
                  key={profile.id}
                  profile={profile}
                  onSwipe={handleSwipe}
                  isTop={i === 0}
                  stackIndex={i}
                />
              ))}
            </div>

            <div className="db-swipe-actions">
              <button
                className="db-swipe-btn db-swipe-btn--skip"
                onClick={() => handleButtonSwipe('left')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Skip
              </button>
              <button
                className="db-swipe-btn db-swipe-btn--save"
                onClick={() => handleButtonSwipe('right')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="db-match-results">
            <h2 className="db-discover-heading">Your Saved Careers</h2>
            <p className="db-discover-sub">Select ONE career to focus your efforts on</p>

            {pipeline.savedCareers.length === 0 ? (
              <div className="db-match-empty">
                <p>You didn&apos;t save any careers. Go back and try again?</p>
                <button className="db-discover-cta" onClick={() => { setCurrentIndex(0); setShowResults(false) }}>
                  Start Over
                </button>
              </div>
            ) : (
              <>
                <div className="db-match-saved-list">
                  {pipeline.savedCareers.map(career => {
                    const profile = careerProfiles.find(p => p.id === career.id)
                    return (
                      <button
                        key={career.id}
                        className={`db-match-saved-card ${pipeline.state.match.selectedFocus === career.title ? 'db-match-saved-card--selected' : ''}`}
                        onClick={() => pipeline.selectFocus(career.title)}
                      >
                        <div className="db-match-saved-fit">{profile?.fit || 0}%</div>
                        <div className="db-match-saved-info">
                          <span className="db-match-saved-title">{career.title}</span>
                          <span className="db-match-saved-meta">{profile?.salary} · {profile?.growth} growth</span>
                        </div>
                        {pipeline.state.match.selectedFocus === career.title ? (
                          <span className="db-match-saved-check">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                        ) : (
                          <span className="db-match-saved-select">This is my goal</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {pipeline.state.match.selectedFocus && (
                  <Link href="/dashboard/achieve" className="db-discover-cta">
                    Build My Plan
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </StepLock>
  )
}
