"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

export default function Projects() {
  const [apiProjects, setApiProjects] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setApiProjects(Array.isArray(data) ? data : []))
      .catch(() => setApiProjects([]))
  }, [])

  const allProjects = [...resumeData.projects, ...apiProjects]
  const featuredProjects = allProjects.filter((p: any) => p.featured)
  const otherProjects = allProjects.filter((p: any) => !p.featured)

  return (
    <section id="projects" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading number="04" title="Projects" />

        <div className="space-y-16 sm:space-y-24">
          {featuredProjects.map((project: any, index: number) => (
            <motion.article
              key={project.id || project._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="grid grid-cols-1 gap-6 border-t border-border pt-8 sm:pt-10 md:grid-cols-2 md:gap-12"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-secondary">
                <Image
                  src={project.image || "/placeholder.svg?height=400&width=600"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-[10px] uppercase tracking-[0.28em] text-highlight">Featured project</div>
                <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{project.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.longDescription || project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60"
                    >
                      Live site
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-border pb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                    >
                      Source
                      <Github className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-20">
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">More work</h3>
            <div className="mt-6 border-t border-border">
              {otherProjects.map((project: any, index: number) => (
                <motion.div
                  key={project.id || project._id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group grid grid-cols-1 gap-3 border-b border-border py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-10"
                >
                  <div>
                    <h4 className="font-serif text-xl leading-snug sm:text-2xl">{project.title}</h4>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies?.map((tech: string) => (
                        <span key={tech} className="text-[11px] tracking-wide text-muted-foreground">
                          {tech}
                          <span className="ml-2 text-border">/</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Live site"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Source code"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
