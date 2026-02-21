import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('MONGODB_URI not set - running without database')
    return
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || undefined,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('Failed to connect to MongoDB, continuing without database:', err.message)
    // Don't throw error - allow app to continue without DB
  }
}

