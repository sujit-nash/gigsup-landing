'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePipelineState, UserType } from '@/lib/pipeline-state'
import { careerProfiles } from '@/lib/mock-data'

export default function DiscoverPage() {
  const pipeline = usePipelineState()
  const [visiStarted, setVisiStarted] = useState(false)
  const [visiProgress, setVisiProgress] = useState(0)

  const handleVisi = () => {
    setVisiStarted(true)
    // Simulate assessment progress
    let p = 0
    const timer = setInterval(() => {
      p += 10
      setVisiProgress(p)
      if (p >= 100) {
        clearInterval(timer)
        pipeline.markVisiCompleted()
      }
    }, 300)
  }

  const uploadItems = [
    {
      key: 'resume',
      label: 'Upload Resume',
      desc: 'Match to real jobs based on your experience',
      done: pipeline.state.discover.resumeUploaded,
      action: pipeline.markResumeUploaded,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    },
    {
      key: 'transcript',
      label: 'Upload Transcript',
      desc: 'Map your academic strengths to career paths',
      done: pipeline.state.discover.transcriptUploaded,
      action: pipeline.markTranscriptUploaded,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/></svg>,
    },
    {
      key: 'linkedin',
      label: 'Connect LinkedIn',
      desc: 'Import your professional profile automatically',
      done: pipeline.state.discover.linkedinConnected,
      action: pipeline.markLinkedinConnected,
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    },
  ]

  return (
    <div className="db-discover">
      {/* User Type Selection */}
      {!pipeline.state.userType && pipeline.mounted && (
        <section className="db-discover-section">
          <h2 className="db-discover-heading">Tell us about you</h2>
          <p className="db-discover-sub">This helps us personalize your career journey</p>
          <div className="db-type-cards">
            {([
              { type: 'highschool' as UserType, label: 'High School', desc: 'Exploring careers & planning for post-secondary', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg> },
              { type: 'university' as UserType, label: 'University / College', desc: 'Working towards a degree or diploma', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
              { type: 'professional' as UserType, label: 'Professional', desc: 'Working & looking to advance or pivot', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
            ]).map(item => (
              <button key={item.type} className="db-type-card" onClick={() => pipeline.setUserType(item.type)}>
                <span className="db-type-icon">{item.icon}</span>
                <span className="db-type-label">{item.label}</span>
                <span className="db-type-desc">{item.desc}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Upload Section */}
      {pipeline.state.userType && (
        <section className="db-discover-section">
          <h2 className="db-discover-heading">Build Your Profile</h2>
          <p className="db-discover-sub">Upload documents to get more accurate career matches</p>

          <div className="db-upload-grid">
            {uploadItems.map(item => (
              <button
                key={item.key}
                className={`db-upload-card ${item.done ? 'db-upload-card--done' : ''}`}
                onClick={item.action}
                disabled={item.done}
              >
                <span className="db-upload-icon">{item.icon}</span>
                <span className="db-upload-label">{item.label}</span>
                <span className="db-upload-desc">{item.desc}</span>
                {item.done ? (
                  <span className="db-upload-check">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                ) : (
                  <span className="db-upload-plus">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>

          {!pipeline.state.discover.explorationMode && !pipeline.state.discover.resumeUploaded && !pipeline.state.discover.transcriptUploaded && !pipeline.state.discover.linkedinConnected && (
            <button className="db-explore-link" onClick={pipeline.enableExplorationMode}>
              Skip uploads, just explore careers →
            </button>
          )}
        </section>
      )}

      {/* VISI Assessment */}
      {pipeline.state.userType && (pipeline.state.discover.resumeUploaded || pipeline.state.discover.transcriptUploaded || pipeline.state.discover.linkedinConnected || pipeline.state.discover.explorationMode) && (
        <section className="db-discover-section">
          <h2 className="db-discover-heading">VISI Career Assessment</h2>
          <p className="db-discover-sub">A quick assessment to understand your values, interests, skills, and identity</p>

          {pipeline.state.discover.visiCompleted ? (
            <div className="db-visi-done">
              <div className="db-visi-done-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3>Assessment Complete!</h3>
              <p>We&apos;ve analyzed your profile and generated career matches.</p>
              <div className="db-visi-traits">
                <span className="db-visi-trait">Analytical</span>
                <span className="db-visi-trait">Creative</span>
                <span className="db-visi-trait">People-Oriented</span>
                <span className="db-visi-trait">Detail-Focused</span>
              </div>
            </div>
          ) : visiStarted ? (
            <div className="db-visi-progress">
              <div className="db-visi-progress-bar">
                <div className="db-visi-progress-fill" style={{ width: `${visiProgress}%` }} />
              </div>
              <p className="db-visi-progress-text">Analyzing your profile... {visiProgress}%</p>
            </div>
          ) : (
            <button className="db-visi-start" onClick={handleVisi}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Start VISI Assessment
            </button>
          )}
        </section>
      )}

      {/* Career Preview */}
      {pipeline.state.discover.visiCompleted && (
        <section className="db-discover-section">
          <h2 className="db-discover-heading">Your Career Matches</h2>
          <p className="db-discover-sub">We found {careerProfiles.length} careers that align with your profile. Continue to Match to explore them.</p>

          <div className="db-career-preview">
            {careerProfiles.slice(0, 3).map(career => (
              <div key={career.id} className="db-career-preview-card">
                <div className="db-career-preview-fit">{career.fit}%</div>
                <div className="db-career-preview-info">
                  <span className="db-career-preview-title">{career.title}</span>
                  <span className="db-career-preview-meta">{career.salary} · {career.growth} growth</span>
                </div>
              </div>
            ))}
            <div className="db-career-preview-more">+{careerProfiles.length - 3} more matches</div>
          </div>

          <Link href="/dashboard/match" className="db-discover-cta">
            Continue to Match
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </section>
      )}
    </div>
  )
}
