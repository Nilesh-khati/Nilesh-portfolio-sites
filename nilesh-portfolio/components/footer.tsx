"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import resumeData from "@/src/content/resume.json"

export default function Footer() {
  const { personal } = resumeData
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cyan-400/30 py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a14]">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      {/* Neon glow at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright with cyberpunk styling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <p className="text-gray-400 text-sm font-['Rajdhani']">
              © {currentYear} <span className="text-cyan-400 font-bold font-['Orbitron']">{personal.name}</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 font-['Rajdhani']">
              Built with <span className="text-purple-400">Next.js</span> & <span className="text-pink-400">React Three Fiber</span>
            </p>
          </motion.div>

          {/* Social Links with neon effects */}
          <div className="flex gap-4">
            {[
              { icon: Github, href: personal.github, color: "cyan", label: "GitHub" },
              { icon: Linkedin, href: personal.linkedin, color: "purple", label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, color: "pink", label: "Email" },
            ].map((social, index) => {
              const colorMap: Record<string, { border: string, text: string, bg: string }> = {
                cyan: { border: 'rgba(6, 182, 212, 0.3)', text: '#06b6d4', bg: 'rgba(6, 182, 212, 0.2)' },
                purple: { border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.2)' },
                pink: { border: 'rgba(236, 72, 153, 0.3)', text: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)' },
              }
              const colors = colorMap[social.color] || colorMap.cyan
              
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="relative p-3 rounded-lg glass transition-all group"
                  style={{ borderColor: colors.border }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.border.replace('0.3', '1')
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 transition-colors" style={{ color: colors.text }} />
                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity"
                    style={{ backgroundColor: colors.bg }}
                  />
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Bottom line with animated dots */}
        <motion.div
          className="mt-8 pt-6 border-t border-cyan-400/20 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </footer>
  )
}
