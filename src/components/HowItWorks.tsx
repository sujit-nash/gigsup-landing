export default function HowItWorks() {
  return (
    <section className="how-section" id="howItWorks">
      <div className="container">
        <div className="section-eyebrow sr">How It Works</div>
        <h2 className="section-heading sr">Three steps to <span className="muted">career clarity</span></h2>

        <div className="how-grid">
          <div className="how-card sr" style={{ transitionDelay: '0s' }}>
            <div className="how-number">
              <span className="icon">🔍</span> 01
            </div>
            <h3>Discover</h3>
            <p className="how-highlight">Understand who you are</p>
            <p>Upload your transcript, resume, or LinkedIn profile — or complete our VISI assessment. We analyze your skills, interests, personality &amp; values to build your unique profile.</p>
            <div className="how-arrow">→</div>
          </div>
          <div className="how-card sr" style={{ transitionDelay: '0.12s' }}>
            <div className="how-number">
              <span className="icon">🎯</span> 02
            </div>
            <h3>Find</h3>
            <p className="how-highlight">Find &amp; Explore careers that fit you</p>
            <p>Get matched with careers based on your unique profile. See skills required, supply &amp; demand by region, compensation, education &amp; growth paths.</p>
            <div className="how-arrow">→</div>
          </div>
          <div className="how-card sr" style={{ transitionDelay: '0.24s' }}>
            <div className="how-number">
              <span className="icon">⚡</span> 03
            </div>
            <h3>Achieve</h3>
            <p className="how-highlight">Close the gap &amp; get your career advantage</p>
            <p>See your custom education plan to close all your skill gaps, match to a mentor, and receive curated job postings.</p>
          </div>
        </div>

        <div className="how-tagline sr">
          <span className="accent">Human First.</span> <span className="green-accent">Powered by Real Data.</span>
        </div>
      </div>
    </section>
  )
}
