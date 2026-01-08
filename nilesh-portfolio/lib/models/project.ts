import type { ObjectId } from "mongodb"

export interface Project {
  _id?: ObjectId
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image?: string
  github?: string
  demo?: string
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateProjectInput {
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image?: string
  github?: string
  demo?: string
  featured?: boolean
  order?: number
}
