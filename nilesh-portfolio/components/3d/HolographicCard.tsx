"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface HolographicCardProps {
  position?: [number, number, number]
  title: string
  color?: string
  hovered?: boolean
  onHover?: (hovered: boolean) => void
}

export default function HolographicCard({ 
  position = [0, 0, 0], 
  title,
  color = "#8b5cf6",
  hovered = false,
  onHover
}: HolographicCardProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      if (isHovered || hovered) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
      }
    }
    if (particlesRef.current && (isHovered || hovered)) {
      particlesRef.current.rotation.y += 0.02
    }
  })

  // Generate particles for burst effect
  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 1.5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    positions[i] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i + 2] = radius * Math.cos(phi)
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.2} position={position}>
      <group
        ref={meshRef}
        onPointerEnter={() => {
          setIsHovered(true)
          onHover?.(true)
        }}
        onPointerLeave={() => {
          setIsHovered(false)
          onHover?.(false)
        }}
      >
        {/* Main card */}
        <mesh>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial 
            color={isHovered || hovered ? color : "#1a1a2e"} 
            metalness={0.9} 
            roughness={0.1}
            emissive={isHovered || hovered ? color : "#000000"}
            emissiveIntensity={isHovered || hovered ? 0.6 : 0}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Neon edges */}
        {[
          [-1.25, 0, 0.06], [1.25, 0, 0.06], // Top and bottom
          [0, 0.75, 0.06], [0, -0.75, 0.06], // Left and right
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={i < 2 ? [2.5, 0.05, 0.02] : [0.05, 1.5, 0.02]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color}
              emissiveIntensity={1}
            />
          </mesh>
        ))}

        {/* Content area */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.3, 1.3, 0.01]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Title text using Text component for better readability */}
        <Text
          position={[0, 0.2, 0.07]}
          fontSize={0.15}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
          textAlign="center"
          font=""
        >
          {title}
        </Text>
        
        {/* Title accent lines */}
        <mesh position={[-0.9, 0.3, 0.07]}>
          <boxGeometry args={[0.3, 0.05, 0.01]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.9, 0.3, 0.07]}>
          <boxGeometry args={[0.3, 0.05, 0.01]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Particle burst on hover */}
        {(isHovered || hovered) && (
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particleCount}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.05}
              color={color}
              transparent
              opacity={0.8}
              emissive={color}
              emissiveIntensity={1}
            />
          </points>
        )}

        {/* Glow effect */}
        {(isHovered || hovered) && (
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[2.7, 1.7, 0.1]} />
            <meshStandardMaterial 
              color={color} 
              transparent 
              opacity={0.3} 
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}



