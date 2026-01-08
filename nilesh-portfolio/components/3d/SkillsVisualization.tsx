"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import SkillNode from "./SkillNode"
import EnergyFlow from "./EnergyFlow"
import type * as THREE from "three"

const skills = [
  { label: "React.js", position: [-3, 2, 0] as [number, number, number], color: "#61dafb" },
  { label: "Node.js", position: [0, 3, 0] as [number, number, number], color: "#339933" },
  { label: "Express.js", position: [3, 2, 0] as [number, number, number], color: "#000000" },
  { label: "MongoDB", position: [0, 0, 0] as [number, number, number], color: "#47a248" },
  { label: "Tailwind CSS", position: [-3, -2, 0] as [number, number, number], color: "#06b6d4" },
  { label: "Redux", position: [3, -2, 0] as [number, number, number], color: "#764abc" },
  { label: "JWT", position: [-1.5, -1, -2] as [number, number, number], color: "#d63aff" },
  { label: "Cloudinary", position: [1.5, -1, -2] as [number, number, number], color: "#3448c5" },
]

const connections = [
  { from: 0, to: 1, label: "React→Node" }, // React.js → Node.js
  { from: 1, to: 3, label: "Node→MongoDB" }, // Node.js → MongoDB
  { from: 1, to: 2, label: "Node→Express" }, // Node.js → Express.js
  { from: 0, to: 4, label: "React→Tailwind" }, // React.js → Tailwind CSS
  { from: 0, to: 5, label: "React→Redux" }, // React.js → Redux
  { from: 1, to: 6, label: "Node→JWT" }, // Node.js → JWT
  { from: 1, to: 7, label: "Node→Cloudinary" }, // Node.js → Cloudinary
  { from: 3, to: 0, label: "MongoDB→Video Editor" }, // MongoDB → React (Video Editor)
]

function SkillsScene() {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  useFrame((state) => {
    if (groupRef.current && scroll) {
      // Scroll-triggered rotation
      const rotationY = scroll.offset * Math.PI * 2
      groupRef.current.rotation.y = rotationY
    }
  })

  return (
    <group ref={groupRef}>
      {/* Skill Nodes */}
      {skills.map((skill, index) => (
        <SkillNode
          key={index}
          position={skill.position}
          label={skill.label}
          color={skill.color}
          size={0.6}
          connected={connections.some(c => c.from === index || c.to === index)}
        />
      ))}

      {/* Energy Flows */}
      {connections.map((connection, index) => (
        <EnergyFlow
          key={index}
          start={skills[connection.from].position}
          end={skills[connection.to].position}
          color={skills[connection.from].color}
          speed={1 + index * 0.1}
        />
      ))}
    </group>
  )
}

function CameraController() {
  const { camera } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    // Camera flythrough based on scroll
    if (camera && scroll) {
      const cameraDistance = 8 + scroll.offset * 4
      const cameraAngle = scroll.offset * Math.PI * 2
      camera.position.x = Math.sin(cameraAngle) * cameraDistance
      camera.position.z = Math.cos(cameraAngle) * cameraDistance
      camera.position.y = 2 + scroll.offset * 2
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

export default function SkillsVisualization() {
  return (
    <>
      <CameraController />

      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[-10, 10, -10]} intensity={1.5} color="#8b5cf6" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
      />

      <SkillsScene />

      {/* Fog for depth */}
      <fog attach="fog" args={["#000011", 5, 20]} />
    </>
  )
}

