'use client'

import { useState, useEffect } from 'react'
import { usePipelineState } from '@/lib/pipeline-state'
import { careerPathways, mockMentors, mockJobs, defaultJobs } from '@/lib/mock-data'
import StepLock from '@/components/StepLock'

type TabKey = 'education' | 'mentor' | 'jobs'

export default function AchievePage() {
  const pipeline = usePipelineState()
  const userType = pipeline.state.userType || 'highschool'
  const selectedCareer = pipeline.state.match.selectedFocus || ''
  const pathway = careerPathways[selectedCareer]
  const mentors = mockMentors[selectedCareer] || mockMentors['UX Designer'] || []
  const jobs = (mockJobs[selectedCareer] || defaultJobs)[userType] || defaultJobs[userType]

  // Tab order based on user type
  const tabOrder: { key: TabKey; label: string; desc: string }[] = userType === 'professional'
    ? [
        { key: 'jobs', label: 'Job Matches', desc: 'Active postings aligned to your goal' },
        { key: 'education', label: 'Education Plan', desc: 'Certifications & upskilling' },
        { key: 'mentor', label: 'Mentor Match', desc: 'Industry mentors in your field' },
      ]
    : [
        { key: 'education', label: 'Education Plan', desc: userType === 'highschool' ? 'Subjects, grades & programs you need' : 'Courses, GPA & grad school requirements' },
        { key: 'mentor', label: 'Mentor Match', desc: 'Connect with professionals in your field' },
        { key: 'jobs', label: userType === 'highschool' ? 'Job Exposure' : 'Internships', desc: userType === 'highschool' ? 'Relevant part-time & volunteer roles' : 'Co-ops & research positions' },
      ]

  const [activeTab, setActiveTab] = useState<TabKey>(tabOrder[0].key)

  useEffect(() => {
    if (pipeline.isAchieveUnlocked && !pipeline.state.achieve.started) {
      pipeline.markAchieveStarted()
    }
  }, [pipeline])

  return (
    <StepLock isUnlocked={pipeline.isAchieveUnlocked} stepName="Achieve" prerequisite="Match (select a career focus)">
      <div className="db-achieve">
        <div className="db-achieve-header">
          <h2 className="db-discover-heading">
            Your path to becoming a <span className="db-accent">{selectedCareer}</span>
          </h2>
          <p className="db-discover-sub">
            {userType === 'highschool' && 'Here\'s everything you need from high school through to your first role.'}
            {userType === 'university' && 'Here\'s your roadmap from where you are now to your career goal.'}
            {userType === 'professional' && 'Here\'s your plan to transition into your target career.'}
          </p>
          {pathway && (
            <div className="db-achieve-timeline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Estimated timeline: ~{pathway.timelineYears} years
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="db-achieve-tabs">
          {tabOrder.map((tab, i) => (
            <button
              key={tab.key}
              className={`db-achieve-tab ${activeTab === tab.key ? 'db-achieve-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="db-achieve-tab-num">{i + 1}</span>
              <div className="db-achieve-tab-text">
                <span className="db-achieve-tab-label">{tab.label}</span>
                <span className="db-achieve-tab-desc">{tab.desc}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="db-achieve-content">
          {activeTab === 'education' && pathway && (
            <div className="db-achieve-education">
              {/* Required Subjects (HS view) */}
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

              {/* University Courses & Gaps */}
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

              {/* University Programs */}
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

              {/* Alternate Pathways */}
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

              {/* Certifications */}
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

              {/* Line of Sight */}
              <div className="db-achieve-block db-achieve-block--highlight">
                <h3 className="db-achieve-block-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  First Job After Graduation
                </h3>
                <p className="db-achieve-first-job">{pathway.firstJobOutOfSchool}</p>
              </div>
            </div>
          )}

          {activeTab === 'mentor' && (
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

          {activeTab === 'jobs' && (
            <div className="db-achieve-jobs">
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

              {/* Key Skills */}
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
    </StepLock>
  )
}
