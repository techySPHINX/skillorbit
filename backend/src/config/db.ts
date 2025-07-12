import mongoose from 'mongoose'
import { logger } from './logger'

const mongoURI = process.env.MONGO_URI

if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in environment variables.')
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI)
    logger.info('MongoDB connected')
  } catch (error) {
    logger.error('MongoDB connection error:', error)
    process.exit(1)
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected')
  })

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected')
  })
}
