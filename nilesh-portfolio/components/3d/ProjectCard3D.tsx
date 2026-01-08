"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface ProjectCard3DProps {
  position: [number, number, number]
  title: string
  description: string
  color: string
  codePreview?: string[]
  rotation?: number
}

export default function ProjectCard3D({
  position,
  title,
  description,
  color,
  codePreview = [],
  rotation = 0
}: ProjectCard3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [targetRotation, setTargetRotation] = useState(0)

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation to target
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.1
      
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + rotation) * 0.2
    }
    
    if (cardRef.current && hovered) {
      // Hover rotation
      cardRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1
      cardRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group
        ref={groupRef}
        onPointerEnter={() => {
          setHovered(true)
          setTargetRotation(Math.PI * 0.5)
        }}
        onPointerLeave={() => {
          setHovered(false)
          setTargetRotation(0)
        }}
      >
        {/* Main metallic card */}
        <mesh ref={cardRef}>
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.95}
            roughness={0.1}
            envMapIntensity={1}
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>

        {/* Metallic border */}
        <mesh position={[0, 0, 0.11]}>
          <boxGeometry args={[3.1, 2.1, 0.05]} />
          <meshStandardMaterial
            color={color}
            metalness={1}
            roughness={0.05}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Card content area */}
        <mesh position={[0, 0.3, 0.11]}>
          <boxGeometry args={[2.8, 1.2, 0.01]} />
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Title */}
        <Text
          position={[0, 0.8, 0.12]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          font=""
        >
          {title}
        </Text>

        {/* Description lines */}
        {description.split(' ').slice(0, 4).map((word, i) => (
          <mesh key={i} position={[-1.2, 0.2 - i * 0.15, 0.12]}>
            <boxGeometry args={[2.2, 0.06, 0.01]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}

        {/* Holographic code preview on hover */}
        {hovered && codePreview.length > 0 && (
          <group position={[0, -0.5, 0.15]}>
            {codePreview.slice(0, 3).map((line, i) => (
              <mesh key={i} position={[-1.2, -i * 0.12, 0]}>
                <boxGeometry args={[2.4, 0.08, 0.01]} />
                <meshStandardMaterial
                  color="#00ff88"
                  transparent
                  opacity={0.7}
                  emissive="#00ff88"
                  emissiveIntensity={0.8}
                />
              </mesh>
            ))}
            {/* Code preview glow */}
            <mesh position={[0, -0.12, 0.02]}>
              <boxGeometry args={[2.6, 0.4, 0.02]} />
              <meshStandardMaterial
                color="#00ff88"
                transparent
                opacity={0.2}
                emissive="#00ff88"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        )}

        {/* Rim lighting effect */}
        {hovered && (
          <>
            {/* Top rim */}
            <mesh position={[0, 1.05, 0.11]}>
              <boxGeometry args={[3.2, 0.05, 0.02]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
              />
            </mesh>
            {/* Bottom rim */}
            <mesh position={[0, -1.05, 0.11]}>
              <boxGeometry args={[3.2, 0.05, 0.02]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
              />
            </mesh>
            {/* Left rim */}
            <mesh position={[-1.55, 0, 0.11]}>
              <boxGeometry args={[0.05, 2.2, 0.02]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
              />
            </mesh>
            {/* Right rim */}
            <mesh position={[1.55, 0, 0.11]}>
              <boxGeometry args={[0.05, 2.2, 0.02]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.5}
              />
            </mesh>
          </>
        )}

        {/* Outer glow */}
        {hovered && (
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[3.3, 2.3, 0.1]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.2}
              emissive={color}
              emissiveIntensity={0.4}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}




