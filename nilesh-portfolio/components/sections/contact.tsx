"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import resumeData from "@/src/content/resume.json"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { personal } = resumeData
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send message. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Contact form error:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const details = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: "Location", value: personal.location, href: undefined },
  ]

  return (
    <section id="contact" className="relative px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading number="05" title="Get In Touch" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="max-w-md font-serif text-2xl leading-snug sm:text-3xl">
              Let&apos;s work together.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              I&apos;m currently looking for new opportunities and my inbox is always open. Whether you have a
              question or just want to say hi, I&apos;ll try my best to get back to you.
            </p>

            <div className="mt-8 border-t border-border">
              {details.map((detail) => {
                const Icon = detail.icon
                const content = (
                  <>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {detail.label}
                      </div>
                      <div className="mt-0.5 text-sm text-foreground">{detail.value}</div>
                    </div>
                  </>
                )

                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex items-center gap-3 border-b border-border py-4 transition-colors hover:text-highlight"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={detail.label} className="flex items-center gap-3 border-b border-border py-4">
                    {content}
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-cyber w-full rounded-lg text-sm"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-cyber w-full rounded-lg text-sm"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="input-cyber w-full resize-none rounded-lg text-sm"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] text-background transition-colors hover:bg-foreground/85 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
