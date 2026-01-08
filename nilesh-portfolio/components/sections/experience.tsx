"use client"

import { motion } from "framer-motion"
import { Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

export default function Experience() {
  const { experience } = resumeData

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      <SectionHeading number="02" title="Experience" />

      <div className="space-y-8 relative z-10 mt-12">
        {/* Cyberpunk Timeline */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 opacity-30" />
        
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
            }}
            className="relative"
          >
            {/* Timeline Node */}
            <div className={`absolute ${index % 2 === 0 ? 'left-8 md:left-1/2' : 'left-8 md:left-1/2'} -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#0a0a14] z-10 pulse-neon`} />
            
            <div className={`ml-16 md:ml-0 md:${index % 2 === 0 ? 'mr-[52%]' : 'ml-[52%]'}`}>
              <motion.div
                className="card-cyber p-6 rounded-lg relative group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <motion.div 
                        className="p-3 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-cyan-400/30"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Briefcase className="w-5 h-5 text-cyan-400" />
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-xl font-bold font-['Orbitron'] text-cyan-400 mb-1"
                          whileHover={{ x: 5 }}
                        >
                          {exp.title}
                        </motion.h3>
                        {exp.companyUrl ? (
                          <motion.a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1 group font-['Rajdhani']"
                            whileHover={{ scale: 1.05, x: 3 }}
                          >
                            {exp.company}
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        ) : (
                          <div className="text-purple-400 font-['Rajdhani']">{exp.company}</div>
                        )}
                        {exp.location && (
                          <div className="flex items-center gap-1 text-sm text-gray-400 mt-1 font-['Rajdhani']">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-gray-400 font-['Rajdhani']"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div>{exp.duration}</div>
                        <div className="text-cyan-400">{exp.period}</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed font-['Rajdhani']">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  {exp.responsibilities && (
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-2 text-gray-400 text-sm font-['Rajdhani']"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.05 }}
                          whileHover={{ x: 5, color: "#06b6d4" }}
                        >
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={tech} 
                        className="px-3 py-1 text-xs font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400/10 to-purple-400/10 text-cyan-400 rounded-full border border-cyan-400/30"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.2 + techIndex * 0.05,
                        }}
                        whileHover={{ 
                          scale: 1.15, 
                          y: -3,
                          boxShadow: "0 0 10px rgba(6, 182, 212, 0.5)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Divider */}
      <div className="section-divider mt-20" />
    </section>
  )
}
