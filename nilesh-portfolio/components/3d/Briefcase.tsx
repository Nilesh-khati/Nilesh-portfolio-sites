"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface BriefcaseProps {
  position?: [number, number, number]
  color?: string
  speed?: number
}

export default function Briefcase({ position = [0, 0, 0], color = "#06b6d4", speed = 1 }: BriefcaseProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2 * speed) * 0.1
    }
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={1.2} position={position}>
      <group ref={groupRef}>
        {/* Main briefcase body */}
        <mesh>
          <boxGeometry args={[1.2, 0.8, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Lock */}
        <mesh position={[0, 0, 0.21]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        {/* Latches */}
        {[-0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.21]}>
            <boxGeometry args={[0.15, 0.1, 0.03]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        {/* Glow effect */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[1.3, 0.9, 0.1]} />
          <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}




