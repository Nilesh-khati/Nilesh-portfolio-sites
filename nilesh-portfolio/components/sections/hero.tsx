"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowRight } from "lucide-react";
import resumeData from "@/src/content/resume.json";
import FloatingTechLogos from "@/components/FloatingTechLogos";

export default function Hero() {
  const { personal } = resumeData;
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cyberpunk Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#1a1a2e] to-[#0f0f1e]">
        {/* Cyberpunk Grid */}
        <div className="cyber-grid opacity-30" />

        {/* Floating Tech Logos */}
        <FloatingTechLogos />

        {/* Animated God Rays */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-96 h-[200%] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent blur-3xl"
          animate={{
            rotate: [12, 15, 12],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-96 h-[200%] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent blur-3xl"
          animate={{
            rotate: [-12, -15, -12],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Greeting with glitch effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <p className="text-cyan-400 font-bold font-['Orbitron'] text-sm sm:text-base uppercase tracking-wider">
              <span className="inline-block">Hi, my name is</span>
              <motion.span
                className="absolute left-0 text-purple-400 opacity-0"
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
                Hi, my name is
              </motion.span>
            </p>
          </motion.div>

          {/* Name with gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Orbitron'] gradient-cyber uppercase tracking-tight leading-tight"
          >
            {personal.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block ${i < personal.name.split(" ").length - 1 ? "mr-2 sm:mr-3 lg:mr-4" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Orbitron'] text-purple-400 uppercase tracking-wider"
          >
            {personal.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-['Rajdhani']"
          >
            {personal.tagline}
          </motion.p>

          {/* Education & Location Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              className="card-cyber px-4 py-2 rounded-lg border border-cyan-400/30"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(6, 182, 212, 0.6)",
              }}
            >
              <div className="text-cyan-400 font-bold font-['Orbitron'] text-xs sm:text-sm uppercase tracking-wider">
                MCA - Sage University
              </div>
            </motion.div>
            <motion.div
              className="card-cyber px-4 py-2 rounded-lg border border-purple-400/30"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(139, 92, 246, 0.6)",
              }}
            >
              <div className="text-purple-400 font-bold font-['Orbitron'] text-xs sm:text-sm uppercase tracking-wider">
                {personal.location}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md"
          >
            <motion.a
              href={`mailto:${personal.email}`}
              className="card-cyber p-3 rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Mail className="w-4 h-4 text-cyan-400 mb-1" />
              <div className="text-xs text-gray-400 font-['Orbitron'] uppercase mb-1">
                Email
              </div>
              <div className="text-sm text-gray-300 font-['Rajdhani'] group-hover:text-cyan-400 transition-colors truncate">
                {personal.email}
              </div>
            </motion.a>
            <motion.a
              href={`tel:${personal.phone}`}
              className="card-cyber p-3 rounded-lg border border-purple-400/20 hover:border-purple-400/50 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Phone className="w-4 h-4 text-purple-400 mb-1" />
              <div className="text-xs text-gray-400 font-['Orbitron'] uppercase mb-1">
                Phone
              </div>
              <div className="text-sm text-gray-300 font-['Rajdhani'] group-hover:text-purple-400 transition-colors">
                {personal.phone}
              </div>
            </motion.a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#contact"
              className="btn-neon font-['Orbitron'] uppercase tracking-wider flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Github, href: personal.github, color: "cyan" },
                { icon: Linkedin, href: personal.linkedin, color: "purple" },
                { icon: Mail, href: `mailto:${personal.email}`, color: "pink" },
              ].map((social, index) => {
                const Icon = social.icon;
                const colorMap: Record<string, string> = {
                  cyan: "rgba(6, 182, 212, 0.3)",
                  purple: "rgba(139, 92, 246, 0.3)",
                  pink: "rgba(236, 72, 153, 0.3)",
                };
                return (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="p-3 rounded-lg glass border transition-all"
                    style={{ borderColor: colorMap[social.color] }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      borderColor: colorMap[social.color].replace("0.3", "1"),
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className={`w-5 h-5 text-${social.color}-400`} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
