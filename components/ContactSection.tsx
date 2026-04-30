'use client'

import { useCursorStore } from '@/lib/store'

export default function ContactSection() {
  const { setHovering } = useCursorStore()

  return (
    <section id="contact" style={{ minHeight: '90vh', padding: '120px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--void)' }}>
      <div>
        <p className="text-label" style={{ color: 'var(--muted)', marginBottom: 40 }}>Contact</p>
        <h2 className="text-h1 font-display" style={{ maxWidth: 1100 }}>Let’s give shape to the next thing no one can ignore.</h2>
      </div>
      <a
        href="mailto:hello@forma.studio"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 14, color: 'var(--lime)', textDecoration: 'none', fontSize: 'clamp(26px, 4vw, 56px)', fontFamily: 'var(--font-syne), sans-serif' }}
      >
        hello@forma.studio <span>↗</span>
      </a>
    </section>
  )
}
