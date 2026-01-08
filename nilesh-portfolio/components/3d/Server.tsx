"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface ServerProps {
  position?: [number, number, number]
  color?: string
  speed?: number
}

export default function Server({ position = [0, 0, 0], color = "#3b82f6", speed = 1 }: ServerProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.2
    }
  })

  return (
    <Float speed={1.2 * speed} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <group ref={groupRef}>
        {/* Server rack */}
        <mesh>
          <boxGeometry args={[1.2, 1.5, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Server units */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, 0.5 - i * 0.35, 0.21]}>
            <boxGeometry args={[1, 0.25, 0.05]} />
            <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Status LEDs */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[-0.5, 0.5 - i * 0.35, 0.23]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
          </mesh>
        ))}
        {/* Glow effect */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[1.3, 1.6, 0.1]} />
          <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}




