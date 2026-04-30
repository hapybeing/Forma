'use client'

import { useLayoutEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursorStore } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

const WorkCardGL = dynamic(() => import('./WorkCardGL'), { ssr: false })

const works = [
  { title: 'Volta Energy',      category: 'Brand Identity · Digital', year: '2024', color: '#1A2A1A' },
  { title: 'Obsidian Finance',  category: '3D Experience · Motion',   year: '2024', color: '#1A1A2A' },
  { title: 'Nōma Collective',  category: 'E-Commerce · Brand',        year: '2023', color: '#2A1A1A' },
  { title: 'Parallax Journal',  category: 'Editorial · Web',          year: '2025', color: '#1A2A24' },
]

export default function WorkSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { setHovering } = useCursorStore()

  useLayoutEffect(() => {
    const cards   = containerRef.current
    const section = sectionRef.current
    if (!cards || !section) return

    const totalScroll = cards.scrollWidth - window.innerWidth

    const tween = gsap.to(cards, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{ paddingTop: 120, background: 'var(--void)' }}
    >
      <div style={{ padding: '0 48px 48px' }}>
        <p className="text-label" style={{ color: 'var(--muted)' }}>
          Selected Work — 2023–2025
        </p>
      </div>

      <div style={{ overflow: 'hidden', height: '100vh', display: 'flex', alignItems: 'center' }}>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            gap: 24,
            paddingLeft: 48,
            paddingRight: 48,
            width: 'max-content',
            alignItems: 'center',
          }}
        >
          {works.map((work, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{
                width: 'clamp(320px, 38vw, 600px)',
                height: '70vh',
                background: 'var(--card-bg)',
                borderRadius: 4,
                border: '1px solid var(--border)',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease',
                cursor: 'none',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--lime)'
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              }}
            >
              <div style={{ flex: '0 0 65%', position: 'relative' }}>
                <WorkCardGL color={work.color} />
              </div>

              <div style={{
                flex: '0 0 35%',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border)',
              }}>
                <div>
                  <p className="text-label" style={{ color: 'var(--muted)', marginBottom: 10 }}>
                    {work.category}
                  </p>
                  <h3 className="font-display" style={{
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    fontWeight: 700,
                    color: 'var(--off-white)',
                    letterSpacing: '-0.01em',
                  }}>
                    {work.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-label" style={{ color: 'var(--muted)' }}>{work.year}</span>
                  <span style={{ color: 'var(--lime)', fontSize: 18 }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
