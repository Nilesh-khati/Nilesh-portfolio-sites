"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function IndoreSkyline() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Slow parallax movement
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    }
  })

  // Create Indore skyline silhouette
  const buildings = [
    // Left side buildings
    { x: -8, height: 2, width: 1.5 },
    { x: -6, height: 3, width: 1.2 },
    { x: -4, height: 2.5, width: 1.3 },
    { x: -2, height: 4, width: 1.4 },
    // Center (Rajwada Palace silhouette)
    { x: 0, height: 3.5, width: 2 },
    // Right side buildings
    { x: 2, height: 3, width: 1.3 },
    { x: 4, height: 2.8, width: 1.2 },
    { x: 6, height: 3.5, width: 1.4 },
    { x: 8, height: 2.5, width: 1.3 },
  ]

  return (
    <group ref={groupRef} position={[0, -4, -10]}>
      {buildings.map((building, i) => (
        <mesh key={i} position={[building.x, building.height / 2, 0]}>
          <boxGeometry args={[building.width, building.height, 0.1]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.3}
            roughness={0.7}
            emissive="#06b6d4"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      
      {/* Ground line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[20, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}




