"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import type * as THREE from "three"

interface ScrollParticleTrailProps {
  color?: string
}

export default function ScrollParticleTrail({ color = "#06b6d4" }: ScrollParticleTrailProps) {
  const particlesRef = useRef<THREE.Points>(null)
  const scroll = useScroll()
  const particleCount = 100

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current && scroll) {
      // Follow scroll position
      const scrollY = scroll.offset * 20 - 10
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        // Update Y position based on scroll
        const baseY = (i / particleCount) * 20 - 10
        positions[i * 3 + 1] = baseY + scrollY + Math.sin(state.clock.elapsedTime + i) * 0.5
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      
      // Rotate particles
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.8}
      />
    </points>
  )
}




