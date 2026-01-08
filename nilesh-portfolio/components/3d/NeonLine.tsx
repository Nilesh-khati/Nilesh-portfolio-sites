"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface NeonLineProps {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  animated?: boolean
}

export default function NeonLine({ start, end, color, animated = true }: NeonLineProps) {
  const lineRef = useRef<THREE.Line>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create straight line path
  const points = useMemo(() => {
    return [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ]
  }, [start, end])

  // Generate particles along line
  const particleCount = 20
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = i / (particleCount - 1)
      positions[i * 3] = start[0] + (end[0] - start[0]) * t
      positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t
      positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
    }
    return positions
  }, [start, end])

  useFrame((state) => {
    if (animated && lineRef.current) {
      // Animate line opacity
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7
    }
    
    if (animated && particlesRef.current) {
      // Animate particles along line
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount) + (time * 0.5 % 1)) % 1
        positions[i * 3] = start[0] + (end[0] - start[0]) * t
        positions[i * 3 + 1] = start[1] + (end[1] - start[1]) * t
        positions[i * 3 + 2] = start[2] + (end[2] - start[2]) * t
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Neon line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.8}
          linewidth={3}
        />
      </line>

      {/* Glowing particles */}
      {animated && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color={color}
            transparent
            opacity={0.9}
            emissive={color}
            emissiveIntensity={1}
          />
        </points>
      )}
    </group>
  )
}

