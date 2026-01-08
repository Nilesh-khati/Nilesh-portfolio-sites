import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Project } from "@/lib/models/project"

export async function GET() {
  try {
    const db = await getDatabase()
    
    // If MongoDB is not available, return empty array
    if (!db) {
      return NextResponse.json([])
    }

    const projects = await db.collection<Project>("projects").find({}).sort({ order: 1, createdAt: -1 }).toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("[v0] Error fetching projects:", error)
    // Return empty array instead of error so the app can still work
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDatabase()
    
    // If MongoDB is not available, return error
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { title, description, longDescription, technologies, image, github, demo, featured, order } = body

    if (!title || !description || !technologies) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const project: Omit<Project, "_id"> = {
      id: `project-${Date.now()}`,
      title,
      description,
      longDescription,
      technologies,
      image,
      github,
      demo,
      featured: featured || false,
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Project>("projects").insertOne(project as Project)

    return NextResponse.json({ ...project, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
