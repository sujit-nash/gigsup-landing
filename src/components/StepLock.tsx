'use client'

interface StepLockProps {
  isUnlocked: boolean
  stepName: string
  prerequisite: string
  children: React.ReactNode
}

export default function StepLock({ isUnlocked, stepName, prerequisite, children }: StepLockProps) {
  if (isUnlocked) return <>{children}</>

  return (
    <div className="db-lock-overlay">
      <div className="db-lock-card">
        <div className="db-lock-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h3 className="db-lock-title">{stepName}</h3>
        <p className="db-lock-text">Complete <strong>{prerequisite}</strong> to unlock this step</p>
      </div>
    </div>
  )
}
