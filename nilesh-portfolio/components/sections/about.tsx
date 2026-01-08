"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"
import { Code, Database, Server, Zap, Target, Rocket } from "lucide-react"

export default function About() {
  const { summary, personal } = resumeData

  const highlights = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Crafting pixel-perfect interfaces with React, Tailwind CSS, and modern design principles",
      color: "cyan"
    },
    {
      icon: Server,
      title: "Backend Architecture",
      description: "Building scalable APIs and server-side solutions with Node.js, Express, and MongoDB",
      color: "purple"
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Designing efficient database schemas and optimizing queries for performance",
      color: "pink"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and user experience",
      color: "green"
    },
    {
      icon: Target,
      title: "Problem Solving",
      description: "Analyzing complex problems and delivering innovative solutions",
      color: "blue"
    },
    {
      icon: Rocket,
      title: "Full Stack Expertise",
      description: "End-to-end development from concept to deployment",
      color: "yellow"
    },
  ]

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      {/* Neon Glow Effects */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <SectionHeading number="01" title="About Me" />

      <div className="relative z-10 mt-12 space-y-12">
        {/* Main Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-cyber p-8 rounded-lg"
        >
          <p className="text-gray-300 leading-relaxed text-lg font-['Rajdhani'] mb-4">
            {summary}
          </p>
          <p className="text-gray-300 leading-relaxed text-lg font-['Rajdhani']">
            I specialize in building exceptional digital experiences with a focus on accessibility, performance, and
            user experience. My expertise spans the full stack, from crafting pixel-perfect interfaces to architecting
            robust backend systems.
          </p>
        </motion.div>

        {/* Education & Location Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card-cyber p-6 rounded-lg border border-cyan-400/30"
          >
            <div className="text-cyan-400 font-bold font-['Orbitron'] text-sm uppercase tracking-wider mb-2">
              Education
            </div>
            <div className="text-2xl font-bold font-['Orbitron'] text-cyan-400 mb-2">
              Master of Computer Applications
            </div>
            <div className="text-purple-400 font-['Rajdhani'] mb-1">Sage University</div>
            <div className="text-gray-400 text-sm font-['Rajdhani']">Indore, India • 2023 - 2025</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="card-cyber p-6 rounded-lg border border-purple-400/30"
          >
            <div className="text-purple-400 font-bold font-['Orbitron'] text-sm uppercase tracking-wider mb-2">
              Location
            </div>
            <div className="text-2xl font-bold font-['Orbitron'] text-purple-400 mb-2">
              {personal.location}
            </div>
            <div className="text-gray-400 text-sm font-['Rajdhani']">
              Available for remote work and collaborations worldwide
            </div>
          </motion.div>
        </div>

        {/* Expertise Highlights */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold font-['Orbitron'] text-cyan-400 mb-8 uppercase tracking-wider"
          >
            Core Expertise
          </motion.h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              const colorMap: Record<string, { border: string, text: string, bg: string }> = {
                cyan: { border: 'rgba(6, 182, 212, 0.3)', text: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
                purple: { border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
                pink: { border: 'rgba(236, 72, 153, 0.3)', text: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
                green: { border: 'rgba(16, 185, 129, 0.3)', text: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
                blue: { border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
                yellow: { border: 'rgba(234, 179, 8, 0.3)', text: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
              }
              const colors = colorMap[highlight.color] || colorMap.cyan

              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card-cyber p-6 rounded-lg relative group"
                  style={{ borderColor: colors.border }}
                >
                  {/* Corner brackets */}
                  <div 
                    className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: colors.text }}
                  />
                  <div 
                    className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ borderColor: colors.text }}
                  />
                  
                  <div 
                    className="p-4 rounded-lg mb-4 inline-block"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.text }} />
                  </div>
                  
                  <h4 
                    className="text-lg font-bold font-['Orbitron'] mb-2"
                    style={{ color: colors.text }}
                  >
                    {highlight.title}
                  </h4>
                  
                  <p className="text-gray-300 text-sm leading-relaxed font-['Rajdhani']">
                    {highlight.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Projects", value: "10+", color: "cyan" },
            { label: "Experience", value: "2+", color: "purple" },
            { label: "Technologies", value: "15+", color: "pink" },
            { label: "Certifications", value: "3", color: "green" },
          ].map((stat, index) => {
            const colorMap: Record<string, string> = {
              cyan: '#06b6d4',
              purple: '#8b5cf6',
              pink: '#ec4899',
              green: '#10b981',
            }
            return (
              <motion.div
                key={stat.label}
                className="card-cyber p-6 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                style={{ borderColor: `${colorMap[stat.color]}40` }}
              >
                <div 
                  className="text-4xl font-bold font-['Orbitron'] mb-2"
                  style={{ color: colorMap[stat.color] }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-['Orbitron']">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
