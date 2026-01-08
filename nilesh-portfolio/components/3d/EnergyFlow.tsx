"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface EnergyFlowProps {
  start: [number, number, number]
  end: [number, number, number]
  color: string
  speed?: number
}

export default function EnergyFlow({ start, end, color, speed = 1 }: EnergyFlowProps) {
  const lineRef = useRef<THREE.Line>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create curve path
  const curve = useMemo(() => {
    const midX = (start[0] + end[0]) / 2
    const midY = (start[1] + end[1]) / 2 + 1
    const midZ = (start[2] + end[2]) / 2
    
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(midX, midY, midZ),
      new THREE.Vector3(...end)
    )
  }, [start, end])

  // Generate points along curve
  const points = useMemo(() => {
    return curve.getPoints(50)
  }, [curve])

  // Generate particles
  const particleCount = 30
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const point = curve.getPoint(t)
      positions[i * 3] = point.x
      positions[i * 3 + 1] = point.y
      positions[i * 3 + 2] = point.z
    }
    return positions
  }, [curve])

  useFrame((state) => {
    if (lineRef.current) {
      // Animate line opacity
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = Math.sin(state.clock.elapsedTime * 2 * speed) * 0.3 + 0.7
    }
    
    if (particlesRef.current) {
      // Animate particles along curve
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime * speed
      
      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount) + (time % 1)) % 1
        const point = curve.getPoint(t)
        positions[i * 3] = point.x
        positions[i * 3 + 1] = point.y
        positions[i * 3 + 2] = point.z
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Energy line */}
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
          opacity={0.6}
          linewidth={2}
        />
      </line>

      {/* Flowing particles */}
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
          size={0.15}
          color={color}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={1}
        />
      </points>
    </group>
  )
}

