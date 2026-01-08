import { MongoClient, type Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/"
const dbName = process.env.DB_NAME || "portfolio"

// MongoDB connection options
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client: MongoClient | undefined
let clientPromise: Promise<MongoClient> | undefined

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Initialize MongoDB connection
if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the client across module reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
      console.log(`[MongoDB] Connecting to: ${uri.replace(/\/\/.*@/, "//***@")}`)
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, create a new client for each request
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

export async function getDatabase(): Promise<Db | null> {
  if (!clientPromise) {
    console.warn("[MongoDB] URI not configured. Using default: mongodb://localhost:27017/")
    // Try to connect with default URI
    try {
      const defaultClient = new MongoClient("mongodb://localhost:27017/", options)
      await defaultClient.connect()
      console.log("[MongoDB] Connected to default localhost instance")
      return defaultClient.db(dbName)
    } catch (error) {
      console.error("[MongoDB] Connection error:", error)
      console.warn("[MongoDB] Database operations will be skipped.")
      return null
    }
  }
  try {
    const client = await clientPromise
    const db = client.db(dbName)
    // Test connection
    await db.admin().ping()
    return db
  } catch (error) {
    console.error("[MongoDB] Connection error:", error)
    console.error("[MongoDB] Make sure MongoDB is running on:", uri)
    return null
  }
}

export default clientPromise
