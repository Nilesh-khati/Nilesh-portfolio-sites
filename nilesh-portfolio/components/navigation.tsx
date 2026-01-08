"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", href: "#hero", neon: "cyan" },
  { name: "ABOUT", href: "#about", neon: "purple" },
  { name: "EXPERIENCE", href: "#experience", neon: "pink" },
  { name: "SKILLS", href: "#skills", neon: "cyan" },
  { name: "PROJECTS", href: "#projects", neon: "purple" },
  { name: "CONTACT", href: "#contact", neon: "pink" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section
      const sections = navItems.map(item => item.href.substring(1))
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || "")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getNeonColor = (neon: string) => {
    switch (neon) {
      case "cyan": return "text-cyan-400"
      case "purple": return "text-purple-400"
      case "pink": return "text-pink-400"
      default: return "text-cyan-400"
    }
  }

  const getNeonGlow = (neon: string) => {
    switch (neon) {
      case "cyan": return "shadow-[0_0_10px_rgba(6,182,212,0.5)]"
      case "purple": return "shadow-[0_0_10px_rgba(139,92,246,0.5)]"
      case "pink": return "shadow-[0_0_10px_rgba(236,72,153,0.5)]"
      default: return "shadow-[0_0_10px_rgba(6,182,212,0.5)]"
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong border-b border-cyan-400/30" : "bg-transparent"
        }`}
    >
      {/* Scanline effect */}
      <div className="scanline absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 gap-8">
          {/* Logo with glitch effect */}
          <motion.a
            href="#hero"
            className="text-2xl font-bold font-['Orbitron'] gradient-cyber relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">NK</span>
            <motion.span
              className="absolute inset-0 text-cyan-400 opacity-0"
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, -2, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              NK
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-bold font-['Orbitron'] uppercase tracking-wider transition-all ${isActive
                    ? `${getNeonColor(item.neon)} ${getNeonGlow(item.neon)}`
                    : "text-gray-400 hover:text-cyan-400"
                    }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      layoutId="activeSection"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 ${getNeonColor(item.neon)} opacity-0 blur-sm`}
                    whileHover={{ opacity: 0.3 }}
                  />
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute right-4 p-2 rounded-lg glass border border-cyan-400/30 hover:border-cyan-400 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong border-t border-cyan-400/30"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-bold font-['Orbitron'] uppercase tracking-wider rounded-lg border border-cyan-400/20 hover:border-cyan-400 hover:${getNeonColor(item.neon)} transition-all ${getNeonGlow(item.neon)}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
