"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface SkillNodeProps {
  position: [number, number, number]
  label: string
  color: string
  size?: number
  connected?: boolean
}

export default function SkillNode({ 
  position, 
  label, 
  color, 
  size = 0.8,
  connected = false
}: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.setScalar(pulse)
      
      // Rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <group
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Main node sphere */}
        <mesh>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.6}
          />
        </mesh>

        {/* Outer glow rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, i * Math.PI / 3, 0]}>
            <torusGeometry args={[size * 1.2, 0.02, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 1.2 : 0.8}
            />
          </mesh>
        ))}

        {/* Pulsing outer glow */}
        <mesh>
          <sphereGeometry args={[size * 1.5, 32, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={hovered ? 0.3 : 0.15}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Label text */}
        <Text
          position={[0, -size * 1.8, 0]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {label}
        </Text>

        {/* Connection indicator */}
        {connected && (
          <mesh position={[0, size * 1.2, 0]}>
            <coneGeometry args={[0.1, 0.3, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

