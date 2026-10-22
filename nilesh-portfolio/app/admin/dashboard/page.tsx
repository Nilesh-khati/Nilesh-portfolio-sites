"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FolderGit2, Mail, Loader2 } from "lucide-react"
import ProjectsManager from "@/components/admin/projects-manager"
import MessagesManager from "@/components/admin/messages-manager"
import AdminNav from "@/components/admin/admin-nav"
import { isAuthenticated } from "@/lib/auth"

type Tab = "projects" | "messages"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("projects")
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    unreadMessages: 0,
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([fetch("/api/projects"), fetch("/api/contact")])

        const projects = await projectsRes.json()
        const messages = await messagesRes.json()

        setStats({
          totalProjects: projects.length,
          unreadMessages: messages.filter((m: { read: boolean }) => !m.read).length,
        })
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
      }
    }

    if (!isLoading && isAuthenticated()) {
      fetchStats()
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-highlight" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-highlight/10">
                <FolderGit2 className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Total Projects</h3>
            </div>
            <p className="text-3xl font-bold text-highlight">{stats.totalProjects}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-highlight/10">
                <Mail className="w-6 h-6 text-highlight" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Unread Messages</h3>
            </div>
            <p className="text-3xl font-bold text-highlight">{stats.unreadMessages}</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === "projects" ? "text-highlight" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Projects
            {activeTab === "projects" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-highlight" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 font-medium transition-colors relative ${
              activeTab === "messages" ? "text-highlight" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Messages
            {stats.unreadMessages > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-highlight text-white rounded-full">
                {stats.unreadMessages}
              </span>
            )}
            {activeTab === "messages" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-highlight" />
            )}
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "projects" ? <ProjectsManager /> : <MessagesManager />}
        </motion.div>
      </div>
    </div>
  )
}
