'use client'

import Link from 'next/link'

interface PipelineTrackerProps {
  isDiscoverComplete: boolean
  isMatchUnlocked: boolean
  isAchieveUnlocked: boolean
  currentStep?: 'overview' | 'discover' | 'match' | 'achieve'
}

const steps = [
  { key: 'discover', label: 'Discover', href: '/dashboard/discover', num: 1 },
  { key: 'match', label: 'Match', href: '/dashboard/match', num: 2 },
  { key: 'achieve', label: 'Achieve', href: '/dashboard/achieve', num: 3 },
] as const

export default function PipelineTracker({ isDiscoverComplete, isMatchUnlocked, isAchieveUnlocked, currentStep = 'overview' }: PipelineTrackerProps) {
  function getStepState(key: string) {
    if (key === 'discover') {
      if (isDiscoverComplete) return 'completed'
      return currentStep === 'discover' ? 'active' : 'available'
    }
    if (key === 'match') {
      if (isAchieveUnlocked) return 'completed'
      if (!isMatchUnlocked) return 'locked'
      return currentStep === 'match' ? 'active' : 'available'
    }
    if (key === 'achieve') {
      if (!isAchieveUnlocked) return 'locked'
      return currentStep === 'achieve' ? 'active' : 'available'
    }
    return 'available'
  }

  return (
    <div className="db-pipeline">
      {steps.map((step, i) => {
        const state = getStepState(step.key)
        const isLocked = state === 'locked'

        return (
          <div key={step.key} className="db-pipeline-step-wrap">
            {i > 0 && (
              <div className={`db-pipeline-line ${state !== 'locked' ? 'db-pipeline-line--filled' : ''}`} />
            )}
            {isLocked ? (
              <div className="db-pipeline-step db-pipeline-step--locked">
                <span className="db-pipeline-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <span className="db-pipeline-label">{step.label}</span>
              </div>
            ) : (
              <Link href={step.href} className={`db-pipeline-step db-pipeline-step--${state}`}>
                <span className="db-pipeline-circle">
                  {state === 'completed' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span>{step.num}</span>
                  )}
                </span>
                <span className="db-pipeline-label">{step.label}</span>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
