"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface CodeMatrixProps {
  position?: [number, number, number]
  color?: string
}

export default function CodeMatrix({ position = [0, 0, 0], color = "#06b6d4" }: CodeMatrixProps) {
  const groupRef = useRef<THREE.Group>(null)
  const count = 200

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20
      positions[i + 1] = (Math.random() - 0.5) * 20
      positions[i + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </points>
    </group>
  )
}




