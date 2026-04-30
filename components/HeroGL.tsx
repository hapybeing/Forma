'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { heroParticleVert, heroParticleFrag } from '@/lib/shaders'

export default function HeroGL() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, ref.current.clientWidth / ref.current.clientHeight, 0.1, 100)
    camera.position.z = 7
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    ref.current.appendChild(renderer.domElement)
    const count = 2500
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const randomness = new Float32Array(count * 3)
    for (let i=0;i<count;i++) { positions[i*3]=(Math.random()-0.5)*10; positions[i*3+1]=(Math.random()-0.5)*6; positions[i*3+2]=(Math.random()-0.5)*6; sizes[i]=Math.random()*0.8+0.4; randomness.set([Math.random(),Math.random(),Math.random()],i*3)}
    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes,1))
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness,3))
    const material = new THREE.ShaderMaterial({ vertexShader: heroParticleVert, fragmentShader: heroParticleFrag, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) }, uPixelRatio: { value: Math.min(window.devicePixelRatio,2) }}})
    const points = new THREE.Points(geometry, material); scene.add(points)
    const onMove=(e:MouseEvent)=>{const x=(e.clientX/window.innerWidth)*2-1;const y=-(e.clientY/window.innerHeight)*2+1; material.uniforms.uMouse.value.set(x,y)}
    window.addEventListener('mousemove',onMove)
    const clock = new THREE.Clock(); let raf=0
    const animate=()=>{material.uniforms.uTime.value=clock.getElapsedTime(); renderer.render(scene,camera); raf=requestAnimationFrame(animate)}; animate()
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('mousemove',onMove);renderer.dispose();geometry.dispose();material.dispose();ref.current?.removeChild(renderer.domElement)}
  }, [])
  return <div ref={ref} className="absolute inset-0 z-0" />
}
