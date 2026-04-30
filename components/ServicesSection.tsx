'use client'

import { useCursorStore } from '@/lib/store'

const services = [
  { num: '01', title: 'Brand Identity',      desc: 'Visual systems that think.',        accent: '#2A1E0A' },
  { num: '02', title: 'Digital Experiences', desc: 'Interfaces that feel alive.',        accent: '#0A1A2A' },
  { num: '03', title: '3D & Immersive',      desc: 'Reality is a design constraint.',   accent: '#1A0A2A' },
  { num: '04', title: 'Motion Design',       desc: 'Time is the hidden dimension.',     accent: '#0A2A1A' },
  { num: '05', title: 'Creative Direction',  desc: 'The decisions behind decisions.',   accent: '#2A0A0A' },
]

export default function ServicesSection() {
  const { setHovering } = useCursorStore()

  return (
    <section id="services" style={{ padding: '120px 48px', background: 'var(--void)' }}>
      <p className="text-label" style={{ color: 'var(--muted)', marginBottom: 64 }}>
        Services
      </p>

      {services.map((s) => (
        <div
          key={s.num}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 24px',
            borderBottom: '1px solid var(--border)',
            background: 'transparent',
            transition: 'background 0.4s ease',
            cursor: 'none',
            borderRadius: 2,
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseOver={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = s.accent
            const title = el.querySelector('.svc-title') as HTMLElement | null
            const arrow = el.querySelector('.svc-arrow') as HTMLElement | null
            if (title) title.style.color = 'var(--lime)'
            if (arrow) { arrow.style.transform = 'translateX(8px)'; arrow.style.color = 'var(--lime)' }
          }}
          onMouseOut={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            const title = el.querySelector('.svc-title') as HTMLElement | null
            const arrow = el.querySelector('.svc-arrow') as HTMLElement | null
            if (title) title.style.color = 'var(--off-white)'
            if (arrow) { arrow.style.transform = 'translateX(0px)'; arrow.style.color = 'var(--muted)' }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <span className="text-label" style={{ color: 'var(--muted)', width: 28 }}>{s.num}</span>
            <h3 className="svc-title font-display" style={{ fontSize: 'clamp(28px, 4vw, 56px)', color: 'var(--off-white)', transition: 'color 0.35s ease' }}>{s.title}</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>{s.desc}</p>
            <span className="svc-arrow" style={{ color: 'var(--muted)', fontSize: 22, transition: 'all 0.35s ease' }}>→</span>
          </div>
        </div>
      ))}
    </section>
  )
}
