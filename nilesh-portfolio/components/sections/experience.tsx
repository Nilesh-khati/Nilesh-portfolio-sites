"use client"

import { motion } from "framer-motion"
import { ExternalLink, MapPin } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

export default function Experience() {
  const { experience } = resumeData

  return (
    <section id="experience" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading number="02" title="Experience" />

        <div className="border-t border-border">
          {experience.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="grid grid-cols-1 gap-4 border-b border-border py-8 sm:grid-cols-[11rem_1fr] sm:gap-10 sm:py-10"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:pt-2">
                <div className="text-foreground">{exp.period}</div>
                <div className="mt-1">{exp.duration}</div>
              </div>

              <div>
                <h3 className="font-serif text-2xl leading-snug sm:text-3xl">{exp.title}</h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border-b border-border pb-0.5 text-foreground transition-colors hover:border-foreground"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-foreground">{exp.company}</span>
                  )}
                  {exp.location && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                {exp.responsibilities && (
                  <details className="group mt-5">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground">
                      <span className="transition-transform group-open:rotate-90">›</span>
                      What I did
                    </summary>
                    <ul className="mt-4 space-y-2 border-l border-border pl-4">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
