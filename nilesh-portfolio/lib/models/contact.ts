import type { ObjectId } from "mongodb"

export interface ContactMessage {
  _id?: ObjectId
  name: string
  email: string
  message: string
  read: boolean
  createdAt: Date
}

export interface CreateContactInput {
  name: string
  email: string
  message: string
}
