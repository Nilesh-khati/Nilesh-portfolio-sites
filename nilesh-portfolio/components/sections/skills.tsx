"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"

const skillCategories = [
  { title: "Frontend", skills: resumeData.skills.frontend },
  { title: "Backend", skills: resumeData.skills.backend },
  { title: "Databases", skills: resumeData.skills.databases },
  { title: "Tools & Platforms", skills: resumeData.skills.tools },
  ...(resumeData.skills.other && resumeData.skills.other.length > 0
    ? [{ title: "Other", skills: resumeData.skills.other }]
    : []),
]

export default function Skills() {
  const { certificates, education } = resumeData

  return (
    <section id="skills" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading number="03" title="Skills & Expertise" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="rounded-lg border border-border bg-white px-6 py-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-xl">{category.title}</h3>
                <span className="text-[11px] tabular-nums text-highlight">{`0${index + 1}`}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Certifications</h3>
            <div className="mt-6 border-t border-border">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="border-b border-border py-5"
                >
                  <h4 className="font-serif text-lg leading-snug">{cert.name}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-highlight">
                    {cert.issuer}
                    {cert.location ? ` · ${cert.location}` : ""}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Education</h3>
            <div className="mt-6 border-t border-border">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="border-b border-border py-5"
                >
                  <h4 className="font-serif text-lg leading-snug">{edu.degree}</h4>
                  <p className="mt-1 text-sm text-foreground">{edu.institution}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {edu.location}
                    {edu.period ? ` · ${edu.period}` : ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
