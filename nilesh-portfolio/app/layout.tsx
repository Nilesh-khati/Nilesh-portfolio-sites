import type React from "react"
import type { Metadata } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers"

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
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
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
