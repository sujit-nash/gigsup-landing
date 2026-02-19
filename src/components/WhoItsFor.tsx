export default function WhoItsFor() {
  return (
    <section className="who-section" id="whoItsFor">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <div className="section-eyebrow sr">Who It&apos;s For</div>
          <h2 className="section-heading sr">Built for every stage of <span style={{ color: '#000000' }}>your journey</span></h2>
        </div>

        <div className="who-grid">
          <div className="who-card sr" style={{ transitionDelay: '0s' }}>
            <div className="who-icon">🎓</div>
            <h3>High School</h3>
            <p className="who-tagline">Explore what&apos;s possible</p>
            <p>Discover careers through your transcript and interests. Get guidance on what subjects, extracurriculars, and schools will get you where you want to go.</p>
            <ul className="who-features">
              <li>Journaling + Transcript analysis</li>
              <li>School requirements + admissions plan</li>
              <li>Career exploration</li>
            </ul>
            <a href="/quick-start" className="who-cta">Find your path →</a>
          </div>
          <div className="who-card sr" style={{ transitionDelay: '0.12s' }}>
            <div className="who-icon">📖</div>
            <h3>University</h3>
            <p className="who-tagline">Land your first role</p>
            <p>See what careers your degree unlocks. Match with real job postings, identify skill gaps, and connect with mentors who&apos;ve been there.</p>
            <ul className="who-features">
              <li>Resume &amp; transcript analysis</li>
              <li>Job matching based on degree</li>
              <li>Skill gap closing</li>
              <li>Mentor connections</li>
            </ul>
            <a href="/quick-start" className="who-cta">Find your 1st job →</a>
          </div>
          <div className="who-card sr" style={{ transitionDelay: '0.24s' }}>
            <div className="who-icon">💼</div>
            <h3>Mid-Career</h3>
            <p className="who-tagline">Own your next chapter</p>
            <p>Whether you&apos;re pivoting or advancing, track your growth, tell your story powerfully, and discover opportunities that match where you want to go.</p>
            <ul className="who-features">
              <li>LinkedIn + resume analysis + Journaling analysis</li>
              <li>Story building</li>
              <li>Track career projects</li>
              <li>Education to build skill</li>
            </ul>
            <a href="/quick-start" className="who-cta">Level up →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
