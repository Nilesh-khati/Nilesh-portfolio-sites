"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface AchievementBadgeProps {
  position: [number, number, number]
  label: string
  color: string
}

export default function AchievementBadge({ position, label, color }: AchievementBadgeProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.3
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <group ref={groupRef}>
        {/* Badge base */}
        <mesh>
          <boxGeometry args={[2, 0.8, 0.1]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Neon border */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.1, 0.9, 0.02]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
          />
        </mesh>

        {/* Label text */}
        <Text
          position={[0, 0, 0.07]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {label}
        </Text>

        {/* Glow effect */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.2, 1, 0.05]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.2}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}




