'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { workCardVert, workCardFrag } from '@/lib/shaders'

export default function WorkCardGL({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth  || 400
    const H = canvas.clientHeight || 300

    const offscreen = document.createElement('canvas')
    offscreen.width  = 512
    offscreen.height = 512
    const ctx = offscreen.getContext('2d')!
    const grad = ctx.createLinearGradient(0, 0, 512, 512)
    grad.addColorStop(0, color)
    grad.addColorStop(1, '#050509')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    const texture = new THREE.CanvasTexture(offscreen)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)

    const scene  = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    const geometry = new THREE.PlaneGeometry(2, 2)
    const hoverState = { value: 0 }
    const material = new THREE.ShaderMaterial({
      vertexShader: workCardVert,
      fragmentShader: workCardFrag,
      uniforms: {
        uTexture: { value: texture },
        uMouse:   { value: new THREE.Vector2(0.5, 0.5) },
        uHover:   { value: 0 },
        uTime:    { value: 0 },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const handleMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      material.uniforms.uMouse.value.set(
        (e.clientX - r.left)  / r.width,
        1 - (e.clientY - r.top) / r.height,
      )
    }
    const handleEnter = () => {
      gsap.to(hoverState, {
        value: 1, duration: 0.6, ease: 'power2.out',
        onUpdate: () => { material.uniforms.uHover.value = hoverState.value },
      })
    }
    const handleLeave = () => {
      gsap.to(hoverState, {
        value: 0, duration: 0.8, ease: 'power2.out',
        onUpdate: () => { material.uniforms.uHover.value = hoverState.value },
      })
    }

    canvas.addEventListener('mousemove',  handleMove)
    canvas.addEventListener('mouseenter', handleEnter)
    canvas.addEventListener('mouseleave', handleLeave)

    let animId: number
    const clock = new THREE.Clock()
    const tick = () => {
      animId = requestAnimationFrame(tick)
      material.uniforms.uTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove',  handleMove)
      canvas.removeEventListener('mouseenter', handleEnter)
      canvas.removeEventListener('mouseleave', handleLeave)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
