'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const TEXT = 'DIGITAL EXPERIENCES · MOTION DESIGN · 3D IMMERSIVE · BRAND STRATEGY · CREATIVE DIRECTION · '

export default function Marquee() {
  const track1 = useRef<HTMLDivElement>(null)
  const track2 = useRef<HTMLDivElement>(null)
  const tween1 = useRef<gsap.core.Tween | null>(null)
  const tween2 = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    tween1.current = gsap.to(track1.current, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
    tween2.current = gsap.to(track2.current, {
      xPercent: 50,
      duration: 38,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const slow  = () => { tween1.current?.timeScale(0.3); tween2.current?.timeScale(0.3) }
  const reset = () => { tween1.current?.timeScale(1);   tween2.current?.timeScale(1) }

  const repeated = TEXT.repeat(6)

  return (
    <div
      onMouseEnter={slow}
      onMouseLeave={reset}
      style={{
        overflow: 'hidden',
        background: 'var(--card-bg)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        ref={track1}
        className="font-display"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: 'var(--muted)',
          width: 'max-content',
        }}
      >
        {repeated}
      </div>
      <div
        ref={track2}
        className="font-display"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.14em',
          color: 'rgba(107,107,122,0.35)',
          width: 'max-content',
          transform: 'translateX(-50%)',
        }}
      >
        {repeated}
      </div>
    </div>
  )
}
