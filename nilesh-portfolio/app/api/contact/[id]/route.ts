import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { ContactMessage } from "@/lib/models/contact"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { read } = body

    const result = await db.collection<ContactMessage>("contacts").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: { read },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Message updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDatabase()
    
    if (!db) {
      return NextResponse.json({ error: "MongoDB is not configured" }, { status: 503 })
    }

    const result = await db.collection<ContactMessage>("contacts").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
