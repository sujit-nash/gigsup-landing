'use client'

import { useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import DashboardSidebar from '@/components/DashboardSidebar'
import PipelineTracker from '@/components/PipelineTracker'
import { usePipelineState } from '@/lib/pipeline-state'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const pipeline = usePipelineState()

  const currentStep = pathname === '/dashboard/discover' ? 'discover'
    : pathname === '/dashboard/match' ? 'match'
    : pathname === '/dashboard/achieve' ? 'achieve'
    : 'overview' as const

  // Counter animation for overview stats
  const animateCounters = useCallback(() => {
    const els = document.querySelectorAll('[data-counter]')
    els.forEach(el => {
      const target = parseInt((el as HTMLElement).dataset.counter || '0')
      let current = 0
      const step = Math.max(Math.ceil(target / 30), 1)
      const timer = setInterval(() => {
        current += step
        if (current >= target) { current = target; clearInterval(timer) }
        el.textContent = String(current)
      }, 40)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(animateCounters, 600)
    return () => clearTimeout(timer)
  }, [animateCounters])

  const region = pipeline.state.userType === 'university' ? 'Ontario' : 'Ontario'

  return (
    <div className="db-page">
      <Navigation />
      <div className="db-app">
        <DashboardSidebar
          region={region}
          isMatchUnlocked={pipeline.isMatchUnlocked}
          isAchieveUnlocked={pipeline.isAchieveUnlocked}
          isDiscoverComplete={pipeline.isDiscoverComplete}
          isAchieveStarted={pipeline.state.achieve.started}
        />
        <main className="db-main-area">
          <header className="db-topbar">
            <div className="db-topbar-left">
              <h1 className="db-topbar-title">
                Welcome back, <span className="db-accent">Jordan</span>
              </h1>
              <p className="db-topbar-sub">Plan your path to the right career</p>
            </div>
            <div className="db-topbar-right">
              <div className="db-topbar-stats">
                <div className="db-mini-stat">
                  <span className="db-mini-num" data-counter={pipeline.savedCareers.length || 0}>0</span>
                  <span className="db-mini-label">Saved</span>
                </div>
                <div className="db-mini-stat">
                  <span className="db-mini-num" data-counter={pipeline.state.match.selectedFocus ? 1 : 0}>0</span>
                  <span className="db-mini-label">Focus</span>
                </div>
                <div className="db-mini-stat db-mini-stat-accent">
                  <span className="db-mini-num" data-counter={
                    (pipeline.state.discover.visiCompleted ? 25 : 0) +
                    (pipeline.isDiscoverComplete ? 15 : 0) +
                    (pipeline.state.match.selectedFocus ? 35 : 0) +
                    (pipeline.state.achieve.started ? 25 : 0)
                  }>0</span>
                  <span className="db-mini-label">Clarity %</span>
                </div>
              </div>
            </div>
          </header>

          {pipeline.state.userType && (
            <PipelineTracker
              isDiscoverComplete={pipeline.isDiscoverComplete}
              isMatchUnlocked={pipeline.isMatchUnlocked}
              isAchieveUnlocked={pipeline.isAchieveUnlocked}
              currentStep={currentStep}
            />
          )}

          <div className="db-step-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
