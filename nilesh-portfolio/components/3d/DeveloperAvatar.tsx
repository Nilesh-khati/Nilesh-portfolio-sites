"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Text } from "@react-three/drei"
import type * as THREE from "three"

interface DeveloperAvatarProps {
  position?: [number, number, number]
}

export default function DeveloperAvatar({ position = [0, 0, 0] }: DeveloperAvatarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const typingHandRef = useRef<THREE.Group>(null)
  const [isTyping, setIsTyping] = useState(true)

  // Transition from typing to standing after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }

    // Typing animation
    if (typingHandRef.current && isTyping) {
      typingHandRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 5) * 0.1
    }

    // Smooth arm transitions
    if (leftArmRef.current) {
      const targetZ = isTyping ? -0.3 : 0
      const currentZ = leftArmRef.current.rotation.z
      leftArmRef.current.rotation.z = currentZ + (targetZ - currentZ) * 0.1
    }

    if (rightArmRef.current) {
      const targetZ = isTyping ? 0.3 : 0
      const currentZ = rightArmRef.current.rotation.z
      rightArmRef.current.rotation.z = currentZ + (targetZ - currentZ) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
      <group ref={groupRef}>
        {/* Body/Torso */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#06b6d4"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Hoodie */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[0.65, 0.4, 0.45]} />
          <meshStandardMaterial 
            color="#0f172a" 
            metalness={0.5} 
            roughness={0.4}
          />
        </mesh>

        {/* React Logo on Hoodie (Left) */}
        <mesh position={[-0.2, 0.7, 0.21]}>
          <boxGeometry args={[0.14, 0.1, 0.01]} />
          <meshStandardMaterial 
            color="#61dafb" 
            emissive="#61dafb"
            emissiveIntensity={0.9}
          />
        </mesh>
        <Text
          position={[-0.2, 0.65, 0.22]}
          fontSize={0.03}
          color="#61dafb"
          anchorX="center"
          anchorY="middle"
          font=""
        >
          ⚛
        </Text>

        {/* Node.js Logo on Hoodie (Center) */}
        <mesh position={[0, 0.7, 0.21]}>
          <boxGeometry args={[0.14, 0.1, 0.01]} />
          <meshStandardMaterial 
            color="#339933" 
            emissive="#339933"
            emissiveIntensity={0.9}
          />
        </mesh>
        <Text
          position={[0, 0.65, 0.22]}
          fontSize={0.03}
          color="#339933"
          anchorX="center"
          anchorY="middle"
          font=""
        >
          N
        </Text>

        {/* MongoDB Logo on Hoodie (Right) */}
        <mesh position={[0.2, 0.7, 0.21]}>
          <boxGeometry args={[0.14, 0.1, 0.01]} />
          <meshStandardMaterial 
            color="#47a248" 
            emissive="#47a248"
            emissiveIntensity={0.9}
          />
        </mesh>
        <Text
          position={[0.2, 0.65, 0.22]}
          fontSize={0.03}
          color="#47a248"
          anchorX="center"
          anchorY="middle"
          font=""
        >
          M
        </Text>

        {/* Head - Young Indian male with medium skin tone, sharp features */}
        <mesh position={[0, 1.4, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial 
            color="#c9a876" 
            metalness={0.3} 
            roughness={0.7}
          />
        </mesh>

        {/* Sharp facial features - cheekbones */}
        <mesh position={[-0.12, 1.35, 0.2]}>
          <boxGeometry args={[0.05, 0.08, 0.01]} />
          <meshStandardMaterial 
            color="#b8966a" 
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0.12, 1.35, 0.2]}>
          <boxGeometry args={[0.05, 0.08, 0.01]} />
          <meshStandardMaterial 
            color="#b8966a" 
            roughness={0.8}
          />
        </mesh>

        {/* Short black hair */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[0.32, 0.12, 0.32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        {/* Hair front */}
        <mesh position={[0, 1.52, 0.15]}>
          <boxGeometry args={[0.28, 0.08, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>

        {/* Arms - Left */}
        <group ref={leftArmRef} position={[-0.4, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </group>

        {/* Arms - Right (Typing/Standing) */}
        <group ref={rightArmRef} position={[0.4, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          {/* Hand - typing or confident */}
          <group ref={typingHandRef}>
            <mesh position={isTyping ? [0, -0.35, 0.1] : [0, -0.3, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.05]} />
              <meshStandardMaterial 
                color={isTyping ? "#06b6d4" : "#1a1a2e"} 
                emissive={isTyping ? "#06b6d4" : "#000000"}
                emissiveIntensity={isTyping ? 0.5 : 0}
              />
            </mesh>
            {!isTyping && (
              <mesh position={[0, -0.3, 0.05]}>
                <boxGeometry args={[0.12, 0.12, 0.02]} />
                <meshStandardMaterial 
                  color="#06b6d4" 
                  emissive="#06b6d4"
                  emissiveIntensity={0.3}
                />
              </mesh>
            )}
          </group>
        </group>

        {/* Legs */}
        <mesh position={[-0.15, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        <mesh position={[0.15, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Enhanced glow effect */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 1.8, 0.6]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.15} 
            emissive="#06b6d4"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

