'use client'

import { useEffect } from 'react'

export default function Pricing() {
  useEffect(() => {
    const toggleMonthly = document.getElementById('toggleMonthly')
    const toggleAnnual = document.getElementById('toggleAnnual')
    const amounts = document.querySelectorAll('.pricing-price .amount[data-monthly]')
    const billingCycles = document.querySelectorAll('.billing-cycle')

    function setPricing(annual: boolean) {
      if (toggleMonthly) toggleMonthly.classList.toggle('active', !annual)
      if (toggleAnnual) toggleAnnual.classList.toggle('active', annual)
      amounts.forEach(el => {
        const htmlEl = el as HTMLElement
        const val = annual ? htmlEl.dataset.annual : htmlEl.dataset.monthly
        el.textContent = '$' + val
      })
      billingCycles.forEach(el => { el.textContent = annual ? 'annually' : 'monthly' })
    }

    toggleMonthly?.addEventListener('click', () => setPricing(false))
    toggleAnnual?.addEventListener('click', () => setPricing(true))
  }, [])

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-eyebrow sr">Pricing</div>
        <h2 className="section-heading sr">Choose your <span className="muted">career plan</span></h2>
        <p className="pricing-sub sr">Start free. Upgrade when you&apos;re ready to go deeper.</p>

        <div className="pricing-toggle sr">
          <div className="toggle-wrap">
            <button className="toggle-btn active" id="toggleMonthly">Monthly</button>
            <button className="toggle-btn" id="toggleAnnual">Annual <span className="toggle-save">Save 20%</span></button>
          </div>
        </div>

        <div className="pricing-grid">
          {/* The Seed */}
          <div className="pricing-card sr" style={{ transitionDelay: '0s' }}>
            <div className="pricing-name">The Seed</div>
            <div className="pricing-goal">Goal: See where you might fit</div>
            <div className="pricing-price">
              <span className="amount">$0</span>
              <span className="period">/ forever</span>
            </div>
            <div className="pricing-note">No credit card required</div>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Core strengths snapshot</li>
              <li><span className="check">✓</span> Top 5 career matches</li>
              <li><span className="check">✓</span> Community profile &amp; interaction</li>
              <li><span className="check">✓</span> Limited mentor visibility</li>
              <li><span className="check">✓</span> Limited education visibility</li>
              <li><span className="check">✓</span> Full job search</li>
              <li><span className="check">✓</span> Full career profile search</li>
            </ul>
            <a href="/quick-start" className="pricing-btn outline">Get Started Free</a>
          </div>

          {/* The Squeeze */}
          <div className="pricing-card featured sr" style={{ transitionDelay: '0.12s' }}>
            <div className="pricing-name">The Squeeze</div>
            <div className="pricing-goal">Goal: Turn insight into direction</div>
            <div className="pricing-price">
              <span className="amount" data-monthly="5" data-annual="4">$5</span>
              <span className="period" data-monthly="/month" data-annual="/month">/month</span>
            </div>
            <div className="pricing-note">Free for 30 days, then billed <span className="billing-cycle">monthly</span></div>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Everything in The Seed</li>
              <li><span className="check">✓</span> Full strengths profile</li>
              <li><span className="check">✓</span> Full VISI assessment access</li>
              <li><span className="check">✓</span> All career matches</li>
              <li><span className="check">✓</span> Full education pathways / post-secondary plan</li>
              <li><span className="check">✓</span> Full mentor matching</li>
              <li><span className="check">✓</span> Full personalized job matching</li>
            </ul>
            <a href="/subscribe?plan=explore" className="pricing-btn primary">Get The Squeeze</a>
          </div>

          {/* The Juice */}
          <div className="pricing-card sr" style={{ transitionDelay: '0.24s' }}>
            <div className="pricing-name">The Juice</div>
            <div className="pricing-goal">Goal: Execute with advantage</div>
            <div className="pricing-price">
              <span className="amount" data-monthly="10" data-annual="8">$10</span>
              <span className="period" data-monthly="/month" data-annual="/month">/month</span>
            </div>
            <div className="pricing-note">Billed <span className="billing-cycle">monthly</span></div>
            <ul className="pricing-features">
              <li><span className="check">✓</span> Everything in The Squeeze</li>
              <li><span className="check">✓</span> Storytelling / profile optimization</li>
              <li><span className="check">✓</span> Skill gap matching</li>
              <li><span className="check">✓</span> Resume enhancement</li>
              <li><span className="check">✓</span> Interview prep AI coach</li>
              <li><span className="check">✓</span> Targeted opportunity alerts</li>
            </ul>
            <a href="/subscribe?plan=decide" className="pricing-btn outline">Get The Juice</a>
          </div>
        </div>
      </div>
    </section>
  )
}
