"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call - replace with actual password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast.success("Password reset instructions sent!")
    } catch (error) {
      console.error("[v0] Password reset error:", error)
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-highlight/[0.04]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-lg p-8 shadow-xl">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-full bg-highlight/10 mb-4">
                  <Mail className="w-8 h-8 text-highlight" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email address and we'll send you instructions to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg glass border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-foreground hover:bg-foreground/85 disabled:bg-foreground/40 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-sm text-highlight hover:text-highlight transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex p-3 rounded-full bg-green-400/10 mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
              <p className="text-muted-foreground text-sm mb-6">
                We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="text-muted-foreground text-xs mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-sm text-highlight hover:text-highlight transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
