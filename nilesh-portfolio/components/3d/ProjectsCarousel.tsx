"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import type * as THREE from "three"
import ProjectCard3D from "./ProjectCard3D"
import IndoreSkyline from "./IndoreSkyline"

const projects = [
  {
    title: "ModelSuite.ai",
    subtitle: "Video Editor",
    description: "Timeline thumbnails advanced editing",
    color: "#8b5cf6",
    codePreview: [
      "const VideoEditor = () => {",
      "  return <Timeline />",
      "  <Thumbnails />"
    ],
    position: [-6, 0, 0] as [number, number, number],
    rotation: 0
  },
  {
    title: "Bulk Invite",
    subtitle: "Dashboard System",
    description: "Invite management send resend",
    color: "#06b6d4",
    codePreview: [
      "async function bulkInvite() {",
      "  await sendInvites(data)",
      "  return success"
    ],
    position: [-2, 0, 0] as [number, number, number],
    rotation: 0.5
  },
  {
    title: "Course Builder",
    subtitle: "Sections Lessons CRUD",
    description: "Course sections lessons management",
    color: "#ec4899",
    codePreview: [
      "const CourseBuilder = () => {",
      "  <Sections />",
      "  <Lessons />"
    ],
    position: [2, 0, 0] as [number, number, number],
    rotation: 1
  },
  {
    title: "E-commerce",
    subtitle: "MERN Razorpay",
    description: "Payment gateway integration",
    color: "#10b981",
    codePreview: [
      "const Payment = () => {",
      "  Razorpay.init()",
      "  processPayment()"
    ],
    position: [6, 0, 0] as [number, number, number],
    rotation: 1.5
  },
]

export default function ProjectsCarousel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Slow auto-rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
    }
  })

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      {/* Space background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

      {/* Ambient and rim lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, 10, -10]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, -10, 5]} intensity={1.5} color="#ec4899" />
      
      {/* Rim lighting */}
      <spotLight
        position={[0, 5, 10]}
        angle={0.4}
        penumbra={1}
        intensity={3}
        color="#06b6d4"
        castShadow
      />
      <spotLight
        position={[-10, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#8b5cf6"
      />
      <spotLight
        position={[10, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ec4899"
      />

      {/* Indore skyline silhouette */}
      <IndoreSkyline />

      {/* Projects carousel */}
      <group ref={groupRef}>
        {projects.map((project, index) => (
          <ProjectCard3D
            key={index}
            position={project.position}
            title={project.title}
            description={project.description}
            color={project.color}
            codePreview={project.codePreview}
            rotation={project.rotation}
          />
        ))}
      </group>

      {/* Fog for depth */}
      <fog attach="fog" args={["#000011", 8, 25]} />
    </>
  )
}

