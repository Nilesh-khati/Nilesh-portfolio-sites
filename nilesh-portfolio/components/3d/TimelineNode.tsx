"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface TimelineNodeProps {
  position: [number, number, number]
  date: string
  title: string
  company: string
  color: string
  size?: number
}

export default function TimelineNode({
  position,
  date,
  title,
  company,
  color,
  size = 0.6
}: TimelineNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      meshRef.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      // Glow pulse
      const glowPulse = Math.sin(state.clock.elapsedTime * 3) * 0.2 + 0.8
      glowRef.current.material.opacity = glowPulse * 0.3
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group>
        {/* Main node sphere with subsurface scattering effect */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.4}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Inner glow for subsurface scattering */}
        <mesh>
          <sphereGeometry args={[size * 0.7, 32, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.5}
            emissive={color}
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Outer glow rings */}
        {Array.from({ length: 2 }).map((_, i) => (
          <mesh key={i} rotation={[Math.PI / 2, i * Math.PI / 2, 0]}>
            <torusGeometry args={[size * 1.3, 0.02, 16, 32]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}

        {/* Pulsing outer glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.8, 32, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.2}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Date label */}
        <Text
          position={[size * 2.5, 0, 0]}
          fontSize={0.2}
          color={color}
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {date}
        </Text>

        {/* Title */}
        <Text
          position={[0, -size * 2.2, 0]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {title}
        </Text>

        {/* Company */}
        <Text
          position={[0, -size * 2.8, 0]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {company}
        </Text>
      </group>
    </Float>
  )
}




