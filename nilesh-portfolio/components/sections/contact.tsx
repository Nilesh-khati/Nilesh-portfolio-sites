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

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="cyber-grid opacity-20" />
      
      <SectionHeading number="05" title="Get In Touch" />

      <div className="grid md:grid-cols-2 gap-12 relative z-10 mt-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="card-cyber p-6 rounded-lg">
            <h3 className="text-2xl font-bold font-['Orbitron'] text-cyan-400 mb-4 uppercase tracking-wider">
              Let's work together
            </h3>
            <p className="text-gray-300 leading-relaxed font-['Rajdhani'] text-lg">
              I'm currently looking for new opportunities and my inbox is always open. Whether you have a question or
              just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, text: personal.email, href: `mailto:${personal.email}`, color: "cyan" },
              { icon: Phone, text: personal.phone, href: `tel:${personal.phone}`, color: "purple" },
              { icon: MapPin, text: personal.location, href: "#", color: "pink" },
            ].map((contact, index) => {
              const Icon = contact.icon
              const colorMap: Record<string, { border: string, text: string, bg: string }> = {
                cyan: { border: 'rgba(6, 182, 212, 0.3)', text: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
                purple: { border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
                pink: { border: 'rgba(236, 72, 153, 0.3)', text: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
              }
              const colors = colorMap[contact.color] || colorMap.cyan
              
              return (
                <motion.a
                  key={contact.text}
                  href={contact.href}
                  className="flex items-center gap-3 p-4 rounded-lg card-cyber group transition-all"
                  style={{ borderColor: colors.border }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.border.replace('0.3', '1')
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <div 
                    className="p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: colors.bg }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.bg.replace('0.1', '0.2')
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.bg
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: colors.text }} />
                  </div>
                  <span className="text-gray-300 group-hover:text-cyan-400 transition-colors font-['Rajdhani']">
                    {contact.text}
                  </span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="card-cyber p-6 rounded-lg space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold font-['Orbitron'] text-cyan-400 mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-cyber w-full rounded-lg font-['Rajdhani']"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold font-['Orbitron'] text-cyan-400 mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-cyber w-full rounded-lg font-['Rajdhani']"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold font-['Orbitron'] text-cyan-400 mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="input-cyber w-full rounded-lg resize-none font-['Rajdhani']"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full font-['Orbitron'] uppercase tracking-wider flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
