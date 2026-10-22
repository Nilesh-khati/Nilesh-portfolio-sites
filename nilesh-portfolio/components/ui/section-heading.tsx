"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  number: string
  title: string
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-10 sm:mb-14"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <span className="text-[11px] uppercase tracking-[0.3em] text-highlight">{number}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95]">{title}</h2>
    </motion.div>
  )
}
