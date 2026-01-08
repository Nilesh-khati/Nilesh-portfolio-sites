"use client"

import { motion } from "framer-motion"
import { Code, Database, Wrench, Layers, Sparkles } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: resumeData.skills.frontend,
    color: "cyan",
  },
  {
    title: "Backend",
    icon: Layers,
    skills: resumeData.skills.backend,
    color: "purple",
  },
  {
    title: "Databases",
    icon: Database,
    skills: resumeData.skills.databases,
    color: "pink",
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: resumeData.skills.tools,
    color: "green",
  },
  ...(resumeData.skills.other && resumeData.skills.other.length > 0 ? [{
    title: "Other",
    icon: Sparkles,
    skills: resumeData.skills.other,
    color: "blue",
  }] : []),
]

export default function Skills() {
  const { certificates, education } = resumeData

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      <SectionHeading number="03" title="Skills & Expertise" />

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 relative z-10">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          const getColorClass = (color: string, type: 'border' | 'text' | 'bg') => {
            const colors: Record<string, Record<string, string>> = {
              cyan: { border: 'border-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-400' },
              purple: { border: 'border-purple-400', text: 'text-purple-400', bg: 'bg-purple-400' },
              pink: { border: 'border-pink-400', text: 'text-pink-400', bg: 'bg-pink-400' },
              green: { border: 'border-green-400', text: 'text-green-400', bg: 'bg-green-400' },
              blue: { border: 'border-blue-400', text: 'text-blue-400', bg: 'bg-blue-400' },
            }
            return colors[color]?.[type] || colors.cyan[type]
          }

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="card-cyber p-6 rounded-lg relative group"
            >
              {/* Corner brackets */}
              <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${getColorClass(category.color, 'border')} opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${getColorClass(category.color, 'border')} opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              {/* Icon */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className={`p-3 rounded-lg border ${getColorClass(category.color, 'border')}/30`}
                  style={{
                    background: `linear-gradient(to bottom right, ${category.color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' : category.color === 'purple' ? 'rgba(139, 92, 246, 0.2)' : category.color === 'pink' ? 'rgba(236, 72, 153, 0.2)' : category.color === 'green' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}, ${category.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : category.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' : category.color === 'pink' ? 'rgba(236, 72, 153, 0.1)' : category.color === 'green' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)'})`
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`w-6 h-6 ${getColorClass(category.color, 'text')}`} />
                </motion.div>
                <h3 className={`text-xl font-bold font-['Orbitron'] ${getColorClass(category.color, 'text')}`}>
                  {category.title}
                </h3>
              </div>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15 + skillIndex * 0.05,
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -3,
                    }}
                    className={`px-3 py-1.5 text-sm font-['Rajdhani'] ${getColorClass(category.color, 'text')} rounded-full border ${getColorClass(category.color, 'border')}/30`}
                    style={{
                      background: `linear-gradient(to right, ${category.color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : category.color === 'purple' ? 'rgba(139, 92, 246, 0.1)' : category.color === 'pink' ? 'rgba(236, 72, 153, 0.1)' : category.color === 'green' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, ${category.color === 'cyan' ? 'rgba(6, 182, 212, 0.05)' : category.color === 'purple' ? 'rgba(139, 92, 246, 0.05)' : category.color === 'pink' ? 'rgba(236, 72, 153, 0.05)' : category.color === 'green' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(59, 130, 246, 0.05)'})`
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold font-['Orbitron'] text-cyan-400 mb-6 uppercase tracking-wider">
          Certifications
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-cyber p-6 rounded-lg"
            >
              <h4 className="text-lg font-bold font-['Orbitron'] text-purple-400 mb-2">{cert.name}</h4>
              <p className="text-cyan-400 text-sm mb-3 font-['Rajdhani']">{cert.issuer}</p>
              <p className="text-gray-300 text-sm leading-relaxed font-['Rajdhani']">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold font-['Orbitron'] text-cyan-400 mb-6 uppercase tracking-wider">
          Education
        </h3>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03, x: 10 }}
              className="card-cyber p-6 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-lg font-bold font-['Orbitron'] text-cyan-400">{edu.degree}</h4>
                  <p className="text-purple-400 font-['Rajdhani']">{edu.institution}</p>
                </div>
                <div className="text-sm text-gray-400 font-['Rajdhani'] sm:text-right">
                  <div>{edu.period}</div>
                  <div className="text-pink-400">{edu.status}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-['Rajdhani']">{edu.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
