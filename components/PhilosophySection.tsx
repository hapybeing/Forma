'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTE = `We believe the distance between a good idea and a great experience is made entirely of decisions. Every pixel either earns its place or it doesn't. We are unreasonably particular about which.`

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])

  useLayoutEffect(() => {
    const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[]

    const tween = gsap.fromTo(
      words,
      { opacity: 0.1, color: 'var(--muted)' },
      {
        opacity: 1,
        color: 'var(--off-white)',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      }
    )

    return () => {
      tween.kill()
    }
  }, [])

  const words = QUOTE.split(' ')

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 10vw',
        background: 'var(--void)',
      }}
    >
      <p
        className="text-label"
        style={{ color: 'var(--muted)', marginBottom: 60, alignSelf: 'flex-start' }}
      >
        Philosophy
      </p>

      <p
        className="text-h1 font-display"
        style={{
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        {words.map((word, i) => (
          <span key={i} style={{ display: 'inline' }}>
            <span
              ref={(el) => { wordsRef.current[i] = el }}
              style={{ opacity: 0.1, color: 'var(--muted)', display: 'inline' }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}
