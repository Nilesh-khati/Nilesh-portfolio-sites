"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

export default function About() {
  const { summary, personal } = resumeData

  const highlights = [
    {
      title: "Frontend Development",
      description: "Crafting pixel-perfect interfaces with React, Tailwind CSS, and modern design principles",
    },
    {
      title: "Backend Architecture",
      description: "Building scalable APIs and server-side solutions with Node.js, Express, and MongoDB",
    },
    {
      title: "Database Design",
      description: "Designing efficient database schemas and optimizing queries for performance",
    },
    {
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and user experience",
    },
    {
      title: "Problem Solving",
      description: "Analyzing complex problems and delivering innovative solutions",
    },
    {
      title: "Full Stack Expertise",
      description: "End-to-end development from concept to deployment",
    },
  ]

  return (
    <section id="about" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading number="01" title="About" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed">
            {summary}
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            I specialize in building exceptional digital experiences with a focus on accessibility, performance, and
            user experience. My expertise spans the full stack, from crafting pixel-perfect interfaces to architecting
            robust backend systems.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white px-6 py-6"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Education</div>
            <div className="mt-2 font-serif text-2xl leading-tight">Master of Computer Applications</div>
            <div className="mt-1 text-sm text-foreground">Sage University</div>
            <div className="mt-1 text-xs text-muted-foreground">Indore, India · 2023 – 2025</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white px-6 py-6"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Location</div>
            <div className="mt-2 font-serif text-2xl leading-tight">{personal.location}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              Available for remote work and collaborations worldwide
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Core expertise</h3>
          <div className="mt-6 border-t border-border">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-border py-5 sm:grid-cols-[auto_18rem_1fr] sm:gap-8"
              >
                <span className="text-[11px] tabular-nums text-highlight">{`0${index + 1}`}</span>
                <h4 className="font-serif text-xl leading-snug transition-colors group-hover:text-foreground/70 sm:text-2xl">
                  {highlight.title}
                </h4>
                <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
