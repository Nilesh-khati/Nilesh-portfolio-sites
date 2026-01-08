"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Stars, Environment } from "@react-three/drei"
import type * as THREE from "three"
import DeveloperAvatar from "./DeveloperAvatar"
import HolographicCard from "./HolographicCard"
import CodeMatrix from "./CodeMatrix"
import MongoDBOrb from "./MongoDBOrb"
import GlitchEffect from "./GlitchEffect"

const projects = [
  { title: "ModelSuite.ai Video Editor", position: [-4, 2, -3] as [number, number, number], color: "#8b5cf6" },
  { title: "Bulk Invite System Dashboard", position: [4, 2, -3] as [number, number, number], color: "#06b6d4" },
  { title: "Course Builder Sections CRUD", position: [-4, -1, -3] as [number, number, number], color: "#ec4899" },
  { title: "E-commerce MERN App with Razorpay", position: [4, -1, -3] as [number, number, number], color: "#10b981" },
]

export default function CyberpunkScene() {
  const sceneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={sceneRef}>
      {/* Dark space background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={2.5}
        color="#06b6d4"
        castShadow
      />
      <pointLight position={[0, 3, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[-5, 2, 3]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[5, 2, 3]} intensity={1.5} color="#ec4899" />
      
      {/* Volumetric god rays */}
      <mesh position={[0, 4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[3, 8, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.12}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
          side={2}
        />
      </mesh>

      {/* Central Developer Avatar */}
      <DeveloperAvatar position={[0, -1, 0]} />

      {/* Floating Holographic Project Cards */}
      {projects.map((project, index) => (
        <HolographicCard
          key={index}
          position={project.position}
          title={project.title}
          color={project.color}
        />
      ))}

      {/* Code Matrices */}
      <CodeMatrix position={[-8, 0, -5]} color="#06b6d4" />
      <CodeMatrix position={[8, 0, -5]} color="#8b5cf6" />

      {/* MongoDB Orbs */}
      <MongoDBOrb position={[-6, 3, -4]} size={0.6} />
      <MongoDBOrb position={[6, 3, -4]} size={0.6} />
      <MongoDBOrb position={[0, -3, -4]} size={0.5} />

      {/* Glitch Effects */}
      <GlitchEffect position={[-7, 4, -2]} icon="github" />
      <GlitchEffect position={[7, 4, -2]} icon="postman" />
      <GlitchEffect position={[0, 4, -2]} icon="vscode" />

      {/* Fog */}
      <fog attach="fog" args={["#000011", 10, 30]} />
      
      {/* Lens flare */}
      <mesh position={[0, 6, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <Environment preset="night" />
    </group>
  )
}
