"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function BackgroundEmblems() {
  const sageRef = useRef<THREE.Group>(null)
  const flagRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (sageRef.current) {
      sageRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
    if (flagRef.current) {
      flagRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <group>
      {/* Sage University Emblem (simplified) */}
      <group ref={sageRef} position={[-4, 3, -8]}>
        {/* Circular emblem base */}
        <mesh>
          <ringGeometry args={[1, 1.2, 32]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.5}
            roughness={0.3}
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Center symbol */}
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.1]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.4}
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Text ring */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.1, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* India Flag Elements (simplified tricolor) */}
      <group ref={flagRef} position={[4, 3, -8]}>
        {/* Saffron stripe */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.05]} />
          <meshStandardMaterial
            color="#ff9933"
            emissive="#ff9933"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* White stripe */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.1}
            transparent
            opacity={0.2}
          />
        </mesh>
        {/* Green stripe */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[1.5, 0.3, 0.05]} />
          <meshStandardMaterial
            color="#138808"
            emissive="#138808"
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Ashoka Chakra (simplified circle) */}
        <mesh position={[0, 0, 0.06]}>
          <ringGeometry args={[0.15, 0.2, 24]} />
          <meshStandardMaterial
            color="#000080"
            emissive="#000080"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  )
}




