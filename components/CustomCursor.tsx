'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useCursorStore } from '@/lib/store'
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const { isHovering } = useCursorStore()
  useEffect(() => {
    const handleMove = (e: MouseEvent) => { const { clientX: x, clientY: y } = e; gsap.set(dotRef.current, { x, y }); gsap.to(ringRef.current, { x, y, duration: 0.5, ease: 'power3.out' }) }
    window.addEventListener('mousemove', handleMove); return () => window.removeEventListener('mousemove', handleMove)
  }, [])
  useEffect(() => { gsap.to(ringRef.current, { scale: isHovering ? 2.2 : 1, opacity: isHovering ? 0.6 : 1, duration: 0.35, ease: 'power2.out' }); gsap.to(dotRef.current, { scale: isHovering ? 0.3 : 1, duration: 0.2, ease: 'power2.out' }) }, [isHovering])
  return <><div ref={dotRef} style={{position:'fixed',top:0,left:0,width:6,height:6,borderRadius:'50%',background:'var(--lime)',transform:'translate(-50%, -50%)',pointerEvents:'none',zIndex:99999,mixBlendMode:'difference'}}/><div ref={ringRef} style={{position:'fixed',top:0,left:0,width:32,height:32,borderRadius:'50%',border:'1px solid var(--lime)',transform:'translate(-50%, -50%)',pointerEvents:'none',zIndex:99998,mixBlendMode:'difference'}}/></>
}
