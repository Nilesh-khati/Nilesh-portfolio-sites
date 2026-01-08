"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  number: string
  title: string
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      className="relative mb-12"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Section number with neon effect */}
      <div className="flex items-center gap-4 mb-4">
        <motion.span
          className="text-6xl font-bold font-['Orbitron'] text-cyan-400/20"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {number}
        </motion.span>
        <motion.div
          className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </div>
      
      {/* Title with gradient */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold font-['Orbitron'] gradient-cyber uppercase tracking-wider"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>
      
      {/* Underline with glow */}
      <motion.div
        className="h-1 w-24 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mt-2"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
        }}
      />
    </motion.div>
  )
}
