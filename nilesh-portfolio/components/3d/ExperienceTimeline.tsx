"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import type * as THREE from "three"
import TimelineNode from "./TimelineNode"
import NeonLine from "./NeonLine"
import AchievementBadge from "./AchievementBadge"
import ScrollParticleTrail from "./ScrollParticleTrail"
import BackgroundEmblems from "./BackgroundEmblems"

const experiences = [
  {
    date: "08/2025 - 10/2025",
    title: "Full Stack Developer Intern",
    company: "ModelSuite.ai",
    position: [0, 3, 0] as [number, number, number],
    color: "#8b5cf6"
  },
  {
    date: "07/2024 - 12/2024",
    title: "MERN Stack Intern",
    company: "Flameloop",
    position: [0, 0, 0] as [number, number, number],
    color: "#06b6d4"
  },
]

const achievements = [
  { label: "Advanced Video Editor", position: [-2.5, 2, 1] as [number, number, number], color: "#8b5cf6" },
  { label: "Invite Management System", position: [2.5, 2, 1] as [number, number, number], color: "#06b6d4" },
  { label: "Magic Link Auth", position: [0, 1, 1] as [number, number, number], color: "#ec4899" },
]

function TimelineScene() {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()

  useFrame((state) => {
    if (groupRef.current && scroll) {
      // Scroll-based vertical movement
      const scrollY = scroll.offset * 6 - 3
      groupRef.current.position.y = scrollY
    }
  })

  return (
    <group ref={groupRef}>
      {/* Timeline Nodes */}
      {experiences.map((exp, index) => (
        <TimelineNode
          key={index}
          position={exp.position}
          date={exp.date}
          title={exp.title}
          company={exp.company}
          color={exp.color}
          size={0.7}
        />
      ))}

      {/* Neon Connection Lines */}
      {experiences.length > 1 && (
        <NeonLine
          start={experiences[0].position}
          end={experiences[1].position}
          color={experiences[0].color}
          animated={true}
        />
      )}

      {/* Achievement Badges */}
      {achievements.map((achievement, index) => (
        <AchievementBadge
          key={index}
          position={achievement.position}
          label={achievement.label}
          color={achievement.color}
        />
      ))}

      {/* Scroll Particle Trail */}
      <ScrollParticleTrail color="#06b6d4" />

      {/* Background Emblems */}
      <BackgroundEmblems />
    </group>
  )
}

export default function ExperienceTimeline() {
  const { camera } = useThree()
  const scroll = useScroll()

  useFrame(() => {
    // Camera follows scroll
    if (camera && scroll) {
      const scrollY = scroll.offset * 4 - 2
      camera.position.y = scrollY
      camera.lookAt(0, scrollY, 0)
    }
  })

  return (
    <>

      {/* Subsurface scattering lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#06b6d4" />
      <pointLight position={[-5, 5, -5]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, -5, 5]} intensity={1.5} color="#ec4899" />
      
      {/* Rim lighting for subsurface scattering */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={1}
        intensity={3}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[10, 0, 0]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#06b6d4"
      />
      <spotLight
        position={[-10, 0, 0]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#8b5cf6"
      />

      <TimelineScene />

      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a1a", 5, 20]} />
    </>
  )
}

