export default function JoinNetwork() {
  return (
    <section className="network-join-section">
      <div className="container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 className="section-heading sr">Join Network for Students</h2>
        <p className="network-sub sr">We built Canada&apos;s student network ecosystem. Gigsup connects you to mentors, schools &amp; employers within a growing career network. All aligned to your strengths &amp; next move.</p>
        <div className="join-images sr" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '48px' }}>
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop" alt="Students at graduation" loading="lazy" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/3' }} />
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop" alt="Students studying together" loading="lazy" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/3' }} />
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" alt="Students in classroom" loading="lazy" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '4/3' }} />
        </div>
      </div>
    </section>
  )
}
