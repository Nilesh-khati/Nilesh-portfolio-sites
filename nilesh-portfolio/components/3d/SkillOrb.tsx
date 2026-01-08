"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"
import { MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface SkillOrbProps {
  position?: [number, number, number]
  color?: string
  speed?: number
  size?: number
}

export default function SkillOrb({ 
  position = [0, 0, 0], 
  color = "#06b6d4", 
  speed = 1,
  size = 0.5
}: SkillOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1.2} floatIntensity={2} position={position}>
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          speed={2 * speed}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[size * 1.2, 32, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  )
}




