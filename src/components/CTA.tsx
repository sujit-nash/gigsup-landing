export default function CTA() {
  return (
    <section className="cta-section">
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="container">
        <h2 className="sr">Ready to discover your <span style={{ background: 'linear-gradient(135deg,var(--green),var(--green-light))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>career advantage?</span></h2>
        <p className="sr">No signup required to start exploring careers that actually fit who you are.</p>
        <div className="sr">
          <a href="/quick-start" className="btn-primary">Start for Free <span className="arr">→</span></a>
        </div>
      </div>
    </section>
  )
}
