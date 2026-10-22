"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import resumeData from "@/src/content/resume.json"

export default function Footer() {
  const { personal } = resumeData
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-serif text-2xl tracking-tight">
            Nilesh<span className="text-highlight">.</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            © {currentYear} {personal.name} · Built with Next.js &amp; MongoDB
          </p>
        </div>

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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
