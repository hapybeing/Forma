'use client'

export default function StatsSection() {
  const stats = [
    { value: '42', label: 'Projects launched globally' },
    { value: '18', label: 'Industries transformed' },
    { value: '96%', label: 'Client partnership retention' },
  ]

  return (
    <section style={{ padding: '120px 48px', background: 'var(--card-bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="grid md:grid-cols-3 gap-12">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display" style={{ fontSize: 'clamp(64px, 10vw, 140px)', lineHeight: 0.9, color: 'var(--lime)' }}>{s.value}</p>
            <p className="text-label" style={{ color: 'var(--muted)', marginTop: 14 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
