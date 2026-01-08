"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface ProjectCardProps {
  position?: [number, number, number]
  color?: string
  hovered?: boolean
  onHover?: (hovered: boolean) => void
}

export default function ProjectCard({ 
  position = [0, 0, 0], 
  color = "#06b6d4",
  hovered = false,
  onHover
}: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      if (isHovered || hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1
      } else {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      }
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={position}>
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
        {/* Card base */}
        <mesh>
          <boxGeometry args={[2, 1.5, 0.2]} />
          <meshStandardMaterial 
            color={isHovered || hovered ? color : "#1e293b"} 
            metalness={0.8} 
            roughness={0.2}
            emissive={isHovered || hovered ? color : "#000000"}
            emissiveIntensity={isHovered || hovered ? 0.3 : 0}
          />
        </mesh>
        {/* Screen/content area */}
        <mesh position={[0, 0.2, 0.11]}>
          <boxGeometry args={[1.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Content lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={i} position={[-0.7, 0.2 - i * 0.2, 0.14]}>
            <boxGeometry args={[1.2, 0.08, 0.01]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        ))}
        {/* Title indicator */}
        <mesh position={[0, -0.5, 0.11]}>
          <boxGeometry args={[0.8, 0.1, 0.01]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
        {/* Glow effect */}
        {(isHovered || hovered) && (
          <mesh position={[0, 0, 0.15]}>
            <boxGeometry args={[2.2, 1.7, 0.1]} />
            <meshStandardMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} />
          </mesh>
        )}
      </group>
    </Float>
  )
}

