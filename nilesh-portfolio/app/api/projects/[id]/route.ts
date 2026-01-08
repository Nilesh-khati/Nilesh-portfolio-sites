import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Project } from "@/lib/models/project"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const project = await db.collection<Project>("projects").findOne({ _id: new ObjectId(params.id) })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("[v0] Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { title, description, longDescription, technologies, image, github, demo, featured, order } = body

    const result = await db.collection<Project>("projects").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          description,
          longDescription,
          technologies,
          image,
          github,
          demo,
          featured,
          order,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const result = await db.collection<Project>("projects").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Project deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
