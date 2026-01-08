"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface CodeBlockProps {
  position?: [number, number, number]
  color?: string
  speed?: number
}

export default function CodeBlock({ position = [0, 0, 0], color = "#06b6d4", speed = 1 }: CodeBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3 * speed) * 0.2
    }
  })

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={1.5} position={position}>
      <group ref={meshRef}>
        {/* Main code block */}
        <mesh>
          <boxGeometry args={[1, 0.8, 0.3]} />
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Code lines */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[-0.3, 0.2 - i * 0.15, 0.16]}>
            <boxGeometry args={[0.5, 0.05, 0.01]} />
            <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={0.5} />
          </mesh>
        ))}
        {/* Glow effect */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[1.1, 0.9, 0.1]} />
          <meshStandardMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}




