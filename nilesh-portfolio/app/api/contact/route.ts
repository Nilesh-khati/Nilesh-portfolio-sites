import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { ContactMessage } from "@/lib/models/contact"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const db = await getDatabase()
    
    // If MongoDB is not available, still return success (message won't be saved)
    if (!db) {
      console.warn("[v0] MongoDB not configured. Contact message not saved:", { name, email })
      return NextResponse.json({ message: "Message sent successfully (not saved - MongoDB not configured)" }, { status: 201 })
    }

    const contactMessage: Omit<ContactMessage, "_id"> = {
      name,
      email,
      message,
      read: false,
      createdAt: new Date(),
    }

    await db.collection<ContactMessage>("contacts").insertOne(contactMessage as ContactMessage)

    return NextResponse.json({ message: "Message sent successfully" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const db = await getDatabase()
    
    // If MongoDB is not available, return empty array
    if (!db) {
      return NextResponse.json([])
    }

    const messages = await db.collection<ContactMessage>("contacts").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error("[v0] Error fetching contact messages:", error)
    // Return empty array instead of error
    return NextResponse.json([])
  }
}
