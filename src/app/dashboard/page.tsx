'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { usePipelineState, UserType } from '@/lib/pipeline-state'
import { careerProfiles, careerPathways, mockMentors, mockJobs, defaultJobs } from '@/lib/mock-data'
import SwipeCard from '@/components/SwipeCard'

const SWIPE_LIMIT = 5
const swipeProfiles = careerProfiles.slice(0, SWIPE_LIMIT)

const userTypes: { type: UserType; label: string; desc: string; icon: React.ReactNode }[] = [
  { type: 'highschool', label: 'High School', desc: 'Exploring careers & planning for post-secondary', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg> },
  { type: 'university', label: 'University / College', desc: 'Working towards a degree or diploma', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { type: 'professional', label: 'Professional', desc: 'Working & looking to advance or pivot', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
]

const discoverItemsByType: Record<string, { label: string; done: boolean; desc: string }[]> = {
  highschool: [
    { label: 'Upload Transcript', done: true, desc: 'Map your academic path' },
    { label: 'VISI Assessment', done: true, desc: 'Values & interests mapped' },
    { label: 'Journal My Future Self', done: true, desc: 'Reflect on your goals' },
    { label: 'Upload Resume', done: true, desc: 'Match to real opportunities' },
  ],
  university: [
    { label: 'Upload Resume', done: true, desc: 'Match to real jobs' },
    { label: 'VISI Assessment', done: true, desc: 'Values & interests mapped' },
    { label: 'Connect LinkedIn', done: true, desc: 'Import your profile' },
    { label: 'Journal My Future Self', done: true, desc: 'Reflect on your goals' },
  ],
  professional: [
    { label: 'Connect LinkedIn', done: true, desc: 'Import your profile' },
    { label: 'Upload Resume', done: true, desc: 'Match to real jobs' },
    { label: 'VISI Assessment', done: true, desc: 'Values & interests mapped' },
    { label: 'Journal My Future Self', done: true, desc: 'Reflect on your goals' },
  ],
}

type AchieveTab = 'education' | 'mentor' | 'jobs'
type ExpandedPanel = null | 'match' | 'achieve'

export default function DashboardOverview() {
  const pipeline = usePipelineState()
  const [swipeIndex, setSwipeIndex] = useState(0)
  const [showMatchResults, setShowMatchResults] = useState(false)
  const [achieveTab, setAchieveTab] = useState<AchieveTab | null>(null)
  const [expanded, setExpanded] = useState<ExpandedPanel>(null)
  const [expandContent, setExpandContent] = useState<ExpandedPanel>(null)
  const [expandRect, setExpandRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const columnsRef = useRef<HTMLDivElement>(null)
  const matchCardRef = useRef<HTMLElement>(null)
  const achieveCardRef = useRef<HTMLElement>(null)

  const openExpanded = useCallback((panel: ExpandedPanel, cardRef: React.RefObject<HTMLElement | null>) => {
    if (!cardRef.current || !columnsRef.current) return
    const colRect = columnsRef.current.getBoundingClientRect()
    const cardRect = cardRef.current.getBoundingClientRect()
    setExpandRect({
      top: cardRect.top - colRect.top,
      left: cardRect.left - colRect.left,
      width: cardRect.width,
      height: cardRect.height,
    })
    setExpandContent(panel)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExpanded(panel)
      })
    })
  }, [])

  const closeExpanded = useCallback(() => {
    setExpanded(null)
    setTimeout(() => {
      setExpandRect(null)
      setExpandContent(null)
    }, 500)
  }, [])

  const handleDiscover = () => {
    pipeline.markResumeUploaded()
    pipeline.markTranscriptUploaded()
    pipeline.markVisiCompleted()
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    const profile = swipeProfiles[swipeIndex]
    pipeline.recordDecision(
      profile.id,
      profile.title,
      direction === 'right' ? 'saved' : 'disregarded'
    )
    if (swipeIndex + 1 >= SWIPE_LIMIT) {
      setShowMatchResults(true)
    }
    setSwipeIndex(prev => prev + 1)
  }

  const handleAchieve = () => {
    pipeline.markAchieveStarted()
  }

  // Listen for sidebar navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const panel = (e as CustomEvent).detail?.panel
      const hasFocus = pipeline.state.match.selectedFocus !== null
      const achieveStarted = pipeline.state.achieve.started
      const focusCareer = pipeline.state.match.selectedFocus || ''
      const hasPathway = !!careerPathways[focusCareer]
      if (panel === 'match' && hasFocus) {
        openExpanded('match', matchCardRef)
      } else if (panel === 'achieve' && achieveStarted && hasPathway) {
        openExpanded('achieve', achieveCardRef)
      }
      if (panel === 'dashboard' || panel === 'discover') {
        closeExpanded()
      }
    }
    window.addEventListener('dashboard-navigate', handler)
    return () => window.removeEventListener('dashboard-navigate', handler)
  })

  // ── Before user type selected ──
  if (!pipeline.state.userType) {
    if (!pipeline.mounted) return null
    return (
      <div className="db-usertype-section">
        <h2 className="db-usertype-heading">Tell us about you</h2>
        <p className="db-usertype-subtext">Select your current stage so we can personalize your career journey.</p>
        <div className="db-usertype-grid">
          {userTypes.map(item => (
            <button key={item.type} className="db-usertype-card" onClick={() => pipeline.setUserType(item.type)}>
              <span className="db-usertype-icon">{item.icon}</span>
              <div className="db-usertype-info">
                <span className="db-usertype-label">{item.label}</span>
                <span className="db-usertype-desc">{item.desc}</span>
              </div>
              <svg className="db-usertype-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── After user type: 3 big cards ──
  const discoverDone = pipeline.isDiscoverComplete
  const matchDone = pipeline.isAchieveUnlocked
  const achieveDone = pipeline.state.achieve.started
  const selectedFocus = pipeline.state.match.selectedFocus || ''
  const pathway = careerPathways[selectedFocus]
  const savedCareers = pipeline.savedCareers
  const userType = pipeline.state.userType || 'highschool'

  // Swipe state
  const remaining = swipeProfiles.slice(swipeIndex)
  const isSwiping = discoverDone && !matchDone && !showMatchResults
  const isPickingFocus = discoverDone && !matchDone && showMatchResults

  // Achieve tab content
  const mentors = mockMentors[selectedFocus] || mockMentors['UX Designer'] || []
  const jobs = (mockJobs[selectedFocus] || defaultJobs)[userType] || defaultJobs[userType]

  const tabOrder: { key: AchieveTab; label: string; icon: React.ReactNode; count: number }[] = userType === 'professional'
    ? [
        { key: 'jobs', label: 'Jobs', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, count: jobs.length },
        { key: 'education', label: 'Education', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>, count: pathway ? pathway.universityPrograms.length : 0 },
        { key: 'mentor', label: 'Mentors', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, count: mentors.length },
      ]
    : [
        { key: 'education', label: 'Education', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>, count: pathway ? pathway.universityPrograms.length + (userType === 'highschool' ? pathway.hsSubjects.length : 0) : 0 },
        { key: 'mentor', label: 'Mentors', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, count: mentors.length },
        { key: 'jobs', label: userType === 'highschool' ? 'Exposure' : 'Internships', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, count: jobs.length },
      ]

  const activeAchieveTab = achieveTab || tabOrder[0].key

  // ── Shared expanded content renderers ──
  const renderMatchExpanded = () => (
    <div className="db-expand-body">
      <div className="db-expand-header">
        <h2 className="db-expand-title">Your Career Matches</h2>
        <p className="db-expand-sub">{savedCareers.length} careers saved · Focus: {selectedFocus}</p>
      </div>
      <div className="db-expand-scroll">
        <div className="db-expand-match-grid">
          {savedCareers.map(career => {
            const profile = careerProfiles.find(p => p.id === career.id)
            if (!profile) return null
            return (
              <div key={career.id} className={`db-expand-match-card ${career.title === selectedFocus ? 'db-expand-match-card--focus' : ''}`}>
                <div className="db-expand-match-fit">
                  <svg viewBox="0 0 64 64" className="db-match-ring-svg">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" className="db-ring-bg" strokeWidth="4" fill="none" />
                    <circle cx="32" cy="32" r="28" className="db-ring-fill" strokeWidth="4" fill="none"
                      strokeDasharray={`${profile.fit * 1.76} 176`} strokeLinecap="round" />
                  </svg>
                  <span className="db-match-pct">{profile.fit}%</span>
                </div>
                <h3 className="db-expand-match-title">
                  {profile.title}
                  {career.title === selectedFocus && <span className="db-trending">Focus</span>}
                </h3>
                <p className="db-expand-match-desc">{profile.description}</p>
                <div className="db-expand-match-meta">
                  <span>{profile.salary}</span>
                  <span>{profile.growth} growth</span>
                  <span>{profile.industry}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderAchieveExpanded = () => (
    <div className="db-expand-body">
      <div className="db-expand-header">
        <h2 className="db-expand-title">Path to {selectedFocus}</h2>
        <p className="db-expand-sub">
          {userType === 'highschool' && 'Everything you need from high school through to your first role.'}
          {userType === 'university' && 'Your roadmap from where you are now to your career goal.'}
          {userType === 'professional' && 'Your plan to transition into your target career.'}
        </p>
      </div>
      {/* Tabs */}
      <div className="db-expand-achieve-tabs">
        {tabOrder.map(tab => (
          <button
            key={tab.key}
            className={`db-expand-achieve-tab ${activeAchieveTab === tab.key ? 'db-expand-achieve-tab--active' : ''}`}
            onClick={() => setAchieveTab(tab.key)}
          >
            <span className="db-iat-icon">{tab.icon}</span>
            <span className="db-iat-label">{tab.label}</span>
            <span className="db-iat-count">{tab.count}</span>
          </button>
        ))}
      </div>
      <div className="db-expand-scroll">
        {activeAchieveTab === 'education' && pathway && (
          <div className="db-achieve-education">
            {userType === 'highschool' && (
              <div className="db-achieve-block">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Subjects &amp; Gaps to Fill
                </h3>
                <div className="db-achieve-subjects">
                  {pathway.hsSubjects.map(sub => (
                    <div key={sub.subject} className={`db-achieve-subject ${sub.met ? 'db-achieve-subject--met' : 'db-achieve-subject--gap'}`}>
                      <span className="db-achieve-subject-status">
                        {sub.met ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        )}
                      </span>
                      <span className="db-achieve-subject-name">{sub.subject}</span>
                      <span className="db-achieve-subject-grade">Target: {sub.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userType === 'university' && pathway.uniCourses && (
              <div className="db-achieve-block">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Courses &amp; Gaps
                </h3>
                <div className="db-achieve-subjects">
                  {pathway.uniCourses.map(c => (
                    <div key={c.course} className={`db-achieve-subject ${c.status === 'completed' ? 'db-achieve-subject--met' : c.status === 'in-progress' ? 'db-achieve-subject--progress' : 'db-achieve-subject--gap'}`}>
                      <span className="db-achieve-subject-status">
                        {c.status === 'completed' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : c.status === 'in-progress' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        )}
                      </span>
                      <span className="db-achieve-subject-name">{c.course}</span>
                      <span className="db-achieve-subject-grade">{c.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="db-achieve-block">
              <h3 className="db-achieve-block-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5"/></svg>
                Recommended Programs
              </h3>
              <div className="db-achieve-programs">
                {pathway.universityPrograms.map(prog => (
                  <div key={prog.name} className="db-achieve-program">
                    <div className="db-achieve-program-match">{prog.match}%</div>
                    <div className="db-achieve-program-info">
                      <span className="db-achieve-program-name">{prog.name}</span>
                      <span className="db-achieve-program-uni">{prog.university}</span>
                      <span className="db-achieve-program-meta">
                        <span className="db-achieve-program-type">{prog.type}</span>
                        {prog.admissionAvg !== 'N/A' && <span>Admission: {prog.admissionAvg}</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {pathway.alternatePaths.length > 0 && (
              <div className="db-achieve-block">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12H8"/><path d="m12 8 4 4-4 4"/></svg>
                  Alternate Pathways
                </h3>
                <div className="db-achieve-alts">
                  {pathway.alternatePaths.map(alt => (
                    <div key={alt} className="db-achieve-alt">{alt}</div>
                  ))}
                </div>
              </div>
            )}
            {pathway.certifications.length > 0 && (
              <div className="db-achieve-block">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
                  Certifications & Exams
                </h3>
                <div className="db-achieve-certs">
                  {pathway.certifications.map(cert => (
                    <span key={cert} className="db-achieve-cert">{cert}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="db-achieve-block db-achieve-block--highlight">
              <h3 className="db-achieve-block-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                First Job After Graduation
              </h3>
              <p className="db-achieve-first-job">{pathway.firstJobOutOfSchool}</p>
            </div>
          </div>
        )}
        {activeAchieveTab === 'mentor' && (
          <div className="db-achieve-mentors">
            <div className="db-achieve-block">
              <h3 className="db-achieve-block-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Available Mentors
              </h3>
              <div className="db-achieve-mentor-grid">
                {mentors.map(mentor => (
                  <div key={mentor.name} className="db-achieve-mentor-card">
                    <div className="db-achieve-mentor-avatar">{mentor.avatar}</div>
                    <div className="db-achieve-mentor-info">
                      <span className="db-achieve-mentor-name">{mentor.name}</span>
                      <span className="db-achieve-mentor-role">{mentor.role}</span>
                      <span className="db-achieve-mentor-company">{mentor.company} · {mentor.experience}</span>
                      <span className="db-achieve-mentor-avail">Available: {mentor.availability}</span>
                    </div>
                    <button className="db-achieve-mentor-btn">Request</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeAchieveTab === 'jobs' && (
          <div className="db-achieve-jobs">
            <div className="db-achieve-block">
              <h3 className="db-achieve-block-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Application Tracker
              </h3>
              <div className="db-app-tracker">
                <div className="db-app-tracker-stat">
                  <span className="db-app-tracker-num">0</span>
                  <span className="db-app-tracker-label">Applied</span>
                </div>
                <div className="db-app-tracker-stat">
                  <span className="db-app-tracker-num">0</span>
                  <span className="db-app-tracker-label">Interview</span>
                </div>
                <div className="db-app-tracker-stat">
                  <span className="db-app-tracker-num">0</span>
                  <span className="db-app-tracker-label">Offer</span>
                </div>
              </div>
            </div>
            <div className="db-achieve-block">
              <h3 className="db-achieve-block-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                {userType === 'highschool' ? 'Relevant Opportunities' : userType === 'university' ? 'Internship & Co-op Opportunities' : 'Job Postings'}
              </h3>
              <div className="db-achieve-job-list">
                {jobs.map(job => (
                  <div key={job.title} className="db-achieve-job-card">
                    <div className="db-achieve-job-top">
                      <span className="db-achieve-job-title">{job.title}</span>
                      <span className={`db-achieve-job-type db-achieve-job-type--${job.type.toLowerCase().replace(/[- ]/g, '')}`}>{job.type}</span>
                    </div>
                    <span className="db-achieve-job-company">{job.company}</span>
                    <span className="db-achieve-job-salary">{job.salary}</span>
                    <p className="db-achieve-job-relevance">{job.relevance}</p>
                  </div>
                ))}
              </div>
            </div>
            {pathway && (
              <div className="db-achieve-block">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Key Skills to Develop
                </h3>
                <div className="db-achieve-skills">
                  {pathway.keySkills.map(skill => (
                    <span key={skill} className="db-achieve-skill">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <div className="db-columns" ref={columnsRef} style={{ position: 'relative' }}>
        {/* ── Expanded Panel (inside columns, animates from card) ── */}
        {expandRect && (
          <div
            className={`db-expand-panel ${expanded ? 'db-expand-panel--open' : ''}`}
            style={{
              '--ex-top': `${expandRect.top}px`,
              '--ex-left': `${expandRect.left}px`,
              '--ex-width': `${expandRect.width}px`,
              '--ex-height': `${expandRect.height}px`,
            } as React.CSSProperties}
          >
            <button className="db-expand-close" onClick={closeExpanded}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            {expandContent === 'match' && renderMatchExpanded()}
            {expandContent === 'achieve' && renderAchieveExpanded()}
          </div>
        )}
        {/* ── DISCOVER ── */}
        <section className={`db-col-card ${!discoverDone ? 'db-col-card-clickable' : ''}`} onClick={!discoverDone ? handleDiscover : undefined}>
          <div className="db-col-header">
            <span className="db-col-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
            </span>
            <h2 className="db-col-title">DISCOVER</h2>
            <p className="db-col-desc">Build your profile through guided steps</p>
          </div>
          <div className="db-col-body">
            {discoverDone ? (
              <>
                <div className="db-progress-wrap">
                  <div className="db-progress-info">
                    <span>Profile Progress</span>
                    <span className="db-progress-count">{(discoverItemsByType[userType] || discoverItemsByType.highschool).length} of {(discoverItemsByType[userType] || discoverItemsByType.highschool).length}</span>
                  </div>
                  <div className="db-progress-track">
                    <div className="db-progress-bar" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="db-checklist">
                  {(discoverItemsByType[userType] || discoverItemsByType.highschool).map(item => (
                    <div key={item.label} className="db-check-item db-done">
                      <span className="db-check-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <div className="db-check-body">
                        <span className="db-check-name">{item.label}</span>
                        <span className="db-check-desc">{item.desc}</span>
                      </div>
                      <span className="db-check-done">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="db-col-footer">All steps completed</p>
              </>
            ) : (
              <div className="db-step-pending-body">
                <div className="db-step-pending-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                </div>
                <p className="db-step-pending-text">Upload your resume, transcript, and complete your VISI assessment.</p>
                <span className="db-step-click-hint">Click to auto-complete</span>
              </div>
            )}
          </div>
        </section>

        {/* ── MATCH ── */}
        <section ref={matchCardRef} className={`db-col-card ${!discoverDone ? 'db-col-card-locked' : ''} ${matchDone ? 'db-col-card-expandable' : ''}`} onClick={matchDone ? () => openExpanded('match', matchCardRef) : undefined}>
          {!discoverDone && (
            <div className="db-col-lock-overlay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Complete Discover to unlock</span>
            </div>
          )}
          <div className="db-col-header">
            <span className="db-col-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </span>
            <h2 className="db-col-title">MATCH</h2>
            <p className="db-col-desc">{isSwiping ? `${swipeIndex + 1} of ${SWIPE_LIMIT}` : isPickingFocus ? 'Pick your career focus' : 'Reveal careers that align with your profile'}</p>
            {matchDone && (
              <button className="db-col-expand-arrow" onClick={() => openExpanded('match', matchCardRef)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            )}
          </div>
          <div className="db-col-body">
            {matchDone ? (
              /* ── Completed: show preview + View Details ── */
              <>
                <div className="db-matches">
                  {savedCareers.slice(0, 3).map(career => {
                    const profile = careerProfiles.find(p => p.id === career.id)
                    if (!profile) return null
                    return (
                      <div key={career.id} className={`db-match-card ${career.title === selectedFocus ? 'db-match-card-focus' : ''}`}>
                        <div className="db-match-ring-wrap">
                          <svg viewBox="0 0 64 64" className="db-match-ring-svg">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" className="db-ring-bg" strokeWidth="4" fill="none" />
                            <circle cx="32" cy="32" r="28" className="db-ring-fill" strokeWidth="4" fill="none"
                              strokeDasharray={`${profile.fit * 1.76} 176`} strokeLinecap="round" />
                          </svg>
                          <span className="db-match-pct">{profile.fit}%</span>
                        </div>
                        <div className="db-match-info">
                          <span className="db-match-title">
                            {profile.title}
                            {career.title === selectedFocus && <span className="db-trending">Focus</span>}
                          </span>
                          <span className="db-match-meta">{profile.salary} · {profile.growth} growth</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {savedCareers.length > 3 && (
                  <span className="db-card-more">+{savedCareers.length - 3} more</span>
                )}
              </>
            ) : isSwiping ? (
              <>
                <div className="db-inline-swipe-area">
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
                <div className="db-inline-swipe-actions">
                  <button className="db-swipe-btn db-swipe-btn--skip" onClick={() => handleSwipe('left')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Skip
                  </button>
                  <button className="db-swipe-btn db-swipe-btn--save" onClick={() => handleSwipe('right')}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    Save
                  </button>
                </div>
              </>
            ) : isPickingFocus ? (
              <div className="db-inline-pick-focus">
                {savedCareers.length === 0 ? (
                  <div className="db-step-pending-body">
                    <p className="db-step-pending-text">No careers saved. Try again?</p>
                    <button className="db-step-click-hint" onClick={() => { setSwipeIndex(0); setShowMatchResults(false) }}>
                      Start Over
                    </button>
                  </div>
                ) : (
                  <div className="db-matches">
                    {savedCareers.map(career => {
                      const profile = careerProfiles.find(p => p.id === career.id)
                      if (!profile) return null
                      return (
                        <button
                          key={career.id}
                          className={`db-match-card db-match-card-selectable ${pipeline.state.match.selectedFocus === career.title ? 'db-match-card-focus' : ''}`}
                          onClick={() => pipeline.selectFocus(career.title)}
                        >
                          <div className="db-match-ring-wrap">
                            <svg viewBox="0 0 64 64" className="db-match-ring-svg">
                              <circle cx="32" cy="32" r="28" stroke="currentColor" className="db-ring-bg" strokeWidth="4" fill="none" />
                              <circle cx="32" cy="32" r="28" className="db-ring-fill" strokeWidth="4" fill="none"
                                strokeDasharray={`${profile.fit * 1.76} 176`} strokeLinecap="round" />
                            </svg>
                            <span className="db-match-pct">{profile.fit}%</span>
                          </div>
                          <div className="db-match-info">
                            <span className="db-match-title">{profile.title}</span>
                            <span className="db-match-meta">{profile.salary} · {profile.growth} growth</span>
                          </div>
                          {pipeline.state.match.selectedFocus === career.title ? (
                            <span className="db-match-check">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </span>
                          ) : (
                            <span className="db-match-goal">My goal</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : discoverDone ? (
              <div className="db-step-pending-body">
                <div className="db-step-pending-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <p className="db-step-pending-text">Swipe through career profiles, save favourites, and pick your focus.</p>
              </div>
            ) : null}
          </div>
        </section>

        {/* ── ACHIEVE ── */}
        <section ref={achieveCardRef} className={`db-col-card ${!matchDone ? 'db-col-card-locked' : ''} ${matchDone && !achieveDone ? 'db-col-card-clickable' : ''} ${achieveDone && pathway ? 'db-col-card-expandable' : ''}`} onClick={achieveDone && pathway ? () => openExpanded('achieve', achieveCardRef) : matchDone && !achieveDone ? handleAchieve : undefined}>
          {!matchDone && (
            <div className="db-col-lock-overlay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Select a career focus to unlock</span>
            </div>
          )}
          <div className="db-col-header">
            <span className="db-col-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            </span>
            <h2 className="db-col-title">ACHIEVE</h2>
            <p className="db-col-desc">{achieveDone && selectedFocus ? `Path to ${selectedFocus}` : 'Your personalized career roadmap'}</p>
            {achieveDone && pathway && (
              <button className="db-col-expand-arrow" onClick={(e) => { e.stopPropagation(); openExpanded('achieve', achieveCardRef) }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            )}
          </div>
          <div className="db-col-body">
            {achieveDone && pathway ? (
              /* ── Preview: tabs + truncated content + View Details ── */
              <div className="db-inline-achieve">
                <div className="db-inline-achieve-tabs">
                  {tabOrder.map(tab => (
                    <button
                      key={tab.key}
                      className={`db-inline-achieve-tab ${activeAchieveTab === tab.key ? 'db-inline-achieve-tab--active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setAchieveTab(tab.key) }}
                    >
                      <span className="db-iat-icon">{tab.icon}</span>
                      <span className="db-iat-label">{tab.label}</span>
                      <span className="db-iat-count">{tab.count}</span>
                    </button>
                  ))}
                </div>

                <div className="db-inline-achieve-preview">
                  {activeAchieveTab === 'education' && (
                    <>
                      {userType === 'highschool' && pathway.hsSubjects.slice(0, 3).map(sub => (
                        <div key={sub.subject} className={`db-achieve-subject ${sub.met ? 'db-achieve-subject--met' : 'db-achieve-subject--gap'}`}>
                          <span className="db-achieve-subject-status">
                            {sub.met ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                            )}
                          </span>
                          <span className="db-achieve-subject-name">{sub.subject}</span>
                          <span className="db-achieve-subject-grade">{sub.grade}</span>
                        </div>
                      ))}
                      {userType === 'university' && pathway.uniCourses && pathway.uniCourses.slice(0, 3).map(c => (
                        <div key={c.course} className={`db-achieve-subject ${c.status === 'completed' ? 'db-achieve-subject--met' : c.status === 'in-progress' ? 'db-achieve-subject--progress' : 'db-achieve-subject--gap'}`}>
                          <span className="db-achieve-subject-status">
                            {c.status === 'completed' ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : c.status === 'in-progress' ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                            )}
                          </span>
                          <span className="db-achieve-subject-name">{c.course}</span>
                          <span className="db-achieve-subject-grade">{c.note}</span>
                        </div>
                      ))}
                      {pathway.universityPrograms.slice(0, 2).map(prog => (
                        <div key={prog.name} className="db-achieve-program">
                          <div className="db-achieve-program-match">{prog.match}%</div>
                          <div className="db-achieve-program-info">
                            <span className="db-achieve-program-name">{prog.name}</span>
                            <span className="db-achieve-program-uni">{prog.university}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {activeAchieveTab === 'mentor' && mentors.slice(0, 2).map(mentor => (
                    <div key={mentor.name} className="db-achieve-mentor-card">
                      <div className="db-achieve-mentor-avatar">{mentor.avatar}</div>
                      <div className="db-achieve-mentor-info">
                        <span className="db-achieve-mentor-name">{mentor.name}</span>
                        <span className="db-achieve-mentor-role">{mentor.role}</span>
                        <span className="db-achieve-mentor-company">{mentor.company}</span>
                      </div>
                    </div>
                  ))}
                  {activeAchieveTab === 'jobs' && jobs.slice(0, 2).map(job => (
                    <div key={job.title} className="db-achieve-job-card">
                      <div className="db-achieve-job-top">
                        <span className="db-achieve-job-title">{job.title}</span>
                        <span className={`db-achieve-job-type db-achieve-job-type--${job.type.toLowerCase().replace(/[- ]/g, '')}`}>{job.type}</span>
                      </div>
                      <span className="db-achieve-job-company">{job.company}</span>
                      <span className="db-achieve-job-salary">{job.salary}</span>
                    </div>
                  ))}
                </div>

              </div>
            ) : matchDone ? (
              <div className="db-step-pending-body">
                <div className="db-step-pending-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </div>
                <p className="db-step-pending-text">Education plan, mentor match, and job opportunities tailored to your goal.</p>
                <span className="db-step-click-hint">Click to start your plan</span>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      {/* Reset */}
      {pipeline.mounted && pipeline.state.userType && (
        <div style={{ textAlign: 'center', padding: '12px' }}>
          <button className="db-reset-btn" onClick={pipeline.resetPipeline}>Reset Demo</button>
        </div>
      )}
    </>
  )
}
