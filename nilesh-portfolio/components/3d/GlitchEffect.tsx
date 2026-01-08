"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface GlitchEffectProps {
  position?: [number, number, number]
  icon: string
}

export default function GlitchEffect({ position = [0, 0, 0], icon }: GlitchEffectProps) {
  const meshRef = useRef<THREE.Group>(null)
  const glitchRef1 = useRef<THREE.Mesh>(null)
  const glitchRef2 = useRef<THREE.Mesh>(null)
  const glitchRef3 = useRef<THREE.Mesh>(null)

  // Icon colors and symbols
  const iconConfig: Record<string, { color: string, symbol: string, glowColor: string }> = {
    github: { color: "#24292e", symbol: "●", glowColor: "#ffffff" },
    postman: { color: "#ff6c37", symbol: "◆", glowColor: "#ff6c37" },
    vscode: { color: "#007acc", symbol: "■", glowColor: "#007acc" }
  }

  const config = iconConfig[icon] || { color: "#06b6d4", symbol: "□", glowColor: "#06b6d4" }

  useFrame((state) => {
    if (meshRef.current) {
      // Random glitch position and rotation
      if (Math.random() > 0.96) {
        meshRef.current.position.x = position[0] + (Math.random() - 0.5) * 0.15
        meshRef.current.position.y = position[1] + (Math.random() - 0.5) * 0.15
        meshRef.current.rotation.z = (Math.random() - 0.5) * 0.2
      }
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    
    // Glitch overlays
    if (glitchRef1.current) {
      glitchRef1.current.visible = Math.random() > 0.92
      if (glitchRef1.current.visible) {
        glitchRef1.current.position.x = (Math.random() - 0.5) * 0.05
      }
    }
    if (glitchRef2.current) {
      glitchRef2.current.visible = Math.random() > 0.94
      if (glitchRef2.current.visible) {
        glitchRef2.current.position.y = (Math.random() - 0.5) * 0.05
      }
    }
    if (glitchRef3.current) {
      glitchRef3.current.visible = Math.random() > 0.93
      glitchRef3.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Main icon representation with enhanced detail */}
      <group ref={meshRef}>
        {/* Base icon */}
        <mesh>
          <boxGeometry args={[0.4, 0.4, 0.08]} />
          <meshStandardMaterial
            color={config.color}
            emissive={config.glowColor}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Icon symbol */}
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.2}
          color={config.glowColor}
          anchorX="center"
          anchorY="middle"
          font=""
        >
          {config.symbol}
        </Text>
        
        {/* Glow effect */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[0.45, 0.45, 0.02]} />
          <meshStandardMaterial
            color={config.glowColor}
            transparent
            opacity={0.3}
            emissive={config.glowColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Multiple glitch overlays for screen glitch effect */}
      <mesh ref={glitchRef1} position={[0.08, 0.08, 0.09]}>
        <boxGeometry args={[0.35, 0.1, 0.01]} />
        <meshStandardMaterial
          color="#ff00ff"
          transparent
          opacity={0.6}
          emissive="#ff00ff"
          emissiveIntensity={1.5}
        />
      </mesh>
      
      <mesh ref={glitchRef2} position={[-0.08, -0.08, 0.09]}>
        <boxGeometry args={[0.1, 0.35, 0.01]} />
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          emissive="#00ffff"
          emissiveIntensity={1.5}
        />
      </mesh>
      
      <mesh ref={glitchRef3} position={[0, 0, 0.1]}>
        <boxGeometry args={[0.42, 0.42, 0.01]} />
        <meshStandardMaterial
          color="#ffff00"
          transparent
          opacity={0.4}
          emissive="#ffff00"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Orbiting particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 0.3,
            Math.sin((i * Math.PI * 2) / 6) * 0.3,
            0
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={config.glowColor}
            emissive={config.glowColor}
            emissiveIntensity={1}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}



