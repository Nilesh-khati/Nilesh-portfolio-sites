"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import type * as THREE from "three"

export default function Background3D() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 15
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 10

        return (
          <Float
            key={i}
            speed={1 + Math.random()}
            rotationIntensity={0.5}
            floatIntensity={1}
            position={[x, y, z]}
          >
            <mesh>
              {i % 3 === 0 ? (
                <octahedronGeometry args={[0.3]} />
              ) : i % 3 === 1 ? (
                <tetrahedronGeometry args={[0.3]} />
              ) : (
                <boxGeometry args={[0.3, 0.3, 0.3]} />
              )}
              <meshStandardMaterial
                color="#06b6d4"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.4}
                emissive="#06b6d4"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}




