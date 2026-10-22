"use client"

import { useRouter } from "next/navigation"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"
import { clearAuth } from "@/lib/auth"

export default function AdminNav() {
  const router = useRouter()

  const handleLogout = () => {
    clearAuth()
    router.push("/")
  }

  return (
    <nav className="glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-highlight transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
