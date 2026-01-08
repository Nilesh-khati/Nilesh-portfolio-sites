"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, ExternalLink, Github, Loader2 } from "lucide-react"
import type { Project } from "@/lib/models/project"
import { useToast } from "@/hooks/use-toast"

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("[v0] Error fetching projects:", error)
      setProjects([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Project deleted successfully",
        })
        fetchProjects()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Error deleting project:", error)
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project._id?.toString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-lg p-6 hover:border-cyan-400/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
              {project.featured && (
                <span className="px-2 py-1 text-xs bg-cyan-400/10 text-cyan-400 rounded">Featured</span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProject(project)
                    setIsModalOpen(true)
                  }}
                  className="p-2 text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project._id?.toString() || "")}
                  className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No projects yet. Add your first project to get started!</p>
        </div>
      )}
    </div>
  )
}
