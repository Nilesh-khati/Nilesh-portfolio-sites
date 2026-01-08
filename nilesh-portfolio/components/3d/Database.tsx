"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface DatabaseProps {
  position?: [number, number, number]
  color?: string
  speed?: number
}

export default function Database({ position = [0, 0, 0], color = "#14b8a6", speed = 1 }: DatabaseProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.8} floatIntensity={1.2} position={position}>
      <group ref={groupRef}>
        {/* Cylinder base */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Middle section */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Top section */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.2, 32]} />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Data rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[0, -0.15 + i * 0.3, 0]}>
            <torusGeometry args={[0.65, 0.02, 16, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
          </mesh>
        ))}
        {/* Glow */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.5, 32]} />
          <meshStandardMaterial color={color} transparent opacity={0.1} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  )
}




