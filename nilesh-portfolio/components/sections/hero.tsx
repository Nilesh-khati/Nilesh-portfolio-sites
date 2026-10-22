"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, ArrowRight } from "lucide-react"
import resumeData from "@/src/content/resume.json"

export default function Hero() {
  const { personal } = resumeData
  const words = personal.name.split(" ")

  return (
    <section id="hero" className="relative flex min-h-screen items-center px-5 pt-28 pb-16 sm:px-8 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-highlight" />
          Available for new opportunities
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-10 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Hi, my name is
        </motion.p>

        <h1 className="mt-4 font-serif text-[64px] leading-[0.88] tracking-[-0.03em] sm:text-[104px] lg:text-[132px]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {i === words.length - 1 ? <span className="text-highlight">.</span> : null}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 flex flex-col gap-5 sm:mt-10"
        >
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-foreground sm:text-base">
            {personal.title}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {personal.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
        >
          <div className="bg-white px-5 py-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Education</div>
            <div className="mt-1.5 font-serif text-lg leading-snug">MCA — Sage University</div>
          </div>
          <div className="bg-white px-5 py-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Based in</div>
            <div className="mt-1.5 font-serif text-lg leading-snug">{personal.location}</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-3 rounded-lg border border-border bg-white px-5 py-4 transition-colors hover:border-foreground/30"
          >
            <Mail className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</div>
              <div className="truncate text-sm text-foreground">{personal.email}</div>
            </div>
          </a>
          <a
            href={`tel:${personal.phone}`}
            className="group flex items-center gap-3 rounded-lg border border-border bg-white px-5 py-4 transition-colors hover:border-foreground/30"
          >
            <Phone className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Phone</div>
              <div className="truncate text-sm text-foreground">{personal.phone}</div>
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/85"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </a>
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: personal.github, label: "GitHub" },
              { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
