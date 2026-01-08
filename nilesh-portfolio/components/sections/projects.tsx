"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, FolderGit2 } from "lucide-react"
import Image from "next/image"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

export default function Projects() {
  const [apiProjects, setApiProjects] = useState([])

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setApiProjects(data))
      .catch(() => setApiProjects([]))
  }, [])

  const allProjects = [...resumeData.projects, ...apiProjects]
  const featuredProjects = allProjects.filter((p) => p.featured)
  const otherProjects = allProjects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      <SectionHeading number="04" title="Projects" />

      <div className="space-y-16 mb-16 relative z-10 mt-12">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.9, 
              delay: index * 0.2,
            }}
            whileHover={{ y: -10 }}
            className="card-cyber rounded-xl overflow-hidden group relative"
          >
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity z-10" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity z-10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-pink-400 opacity-50 group-hover:opacity-100 transition-opacity z-10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity z-10" />

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <motion.div
                className="relative h-64 md:h-full bg-secondary overflow-hidden rounded-lg neon-border"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/80 to-transparent" />
                {/* Scanline overlay */}
                <div className="absolute inset-0 scanline opacity-20" />
              </motion.div>

              {/* Project Info */}
              <div className="flex flex-col justify-center">
                <motion.div
                  className="text-cyan-400 text-sm font-bold font-['Orbitron'] mb-2 uppercase tracking-wider"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Featured Project
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold font-['Orbitron'] text-cyan-400 mb-3 uppercase tracking-wider"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-300 mb-4 leading-relaxed font-['Rajdhani']"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {project.longDescription || project.description}
                </motion.p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + techIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.15, 
                        y: -3,
                      }}
                      className="px-3 py-1 text-xs font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400/10 to-purple-400/10 text-cyan-400 rounded-full border border-cyan-400/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass border border-cyan-400/30 hover:border-cyan-400 text-cyan-400 transition-all"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="View source code"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass border border-purple-400/30 hover:border-purple-400 text-purple-400 transition-all"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <>
          <h3 className="text-2xl font-bold font-['Orbitron'] text-purple-400 mb-6 uppercase tracking-wider">
            Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="card-cyber p-6 rounded-lg relative group"
              >
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="p-3 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-400/30"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FolderGit2 className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors"
                        whileHover={{ scale: 1.3, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <h4 className="text-lg font-bold font-['Orbitron'] text-cyan-400 mb-2 uppercase tracking-wider">
                  {project.title}
                </h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed font-['Rajdhani'] line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gradient-to-r from-cyan-400/10 to-purple-400/10 text-cyan-400 px-2 py-1 rounded-md border border-cyan-400/30 font-['Rajdhani']"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Section Divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
