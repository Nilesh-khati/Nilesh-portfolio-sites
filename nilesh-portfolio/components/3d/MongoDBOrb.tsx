"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"
import type * as THREE from "three"

interface MongoDBOrbProps {
  position?: [number, number, number]
  size?: number
}

export default function MongoDBOrb({ position = [0, 0, 0], size = 0.8 }: MongoDBOrbProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1} position={position}>
      <group ref={groupRef}>
        {/* Main orb */}
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color="#47a248"
            metalness={0.9}
            roughness={0.1}
            emissive="#47a248"
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Inner rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, i * Math.PI / 3, 0]}>
            <torusGeometry args={[size * 0.8, 0.02, 16, 32]} />
            <meshStandardMaterial
              color="#47a248"
              emissive="#47a248"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Outer glow */}
        <Sphere args={[size * 1.2, 32, 32]}>
          <meshStandardMaterial
            color="#47a248"
            transparent
            opacity={0.2}
            emissive="#47a248"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </group>
    </Float>
  )
}




