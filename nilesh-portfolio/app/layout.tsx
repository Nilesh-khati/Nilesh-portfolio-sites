import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Rajdhani } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Nilesh Khati - Full Stack Developer",
  description:
    "Innovative MERN stack developer specializing in modern web applications. Portfolio showcasing projects in React, Node.js, MongoDB, and Express.",
  keywords: ["Nilesh Khati", "Full Stack Developer", "MERN Stack", "React", "Node.js", "Web Developer", "Portfolio"],
  authors: [{ name: "Nilesh Khati" }],
  openGraph: {
    title: "Nilesh Khati - Full Stack Developer",
    description: "Innovative MERN stack developer specializing in modern web applications.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} antialiased`} suppressHydrationWarning>
      <body className="font-['Rajdhani']">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
