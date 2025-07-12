import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'

import { connectDB } from './config/db'
import { logger } from './config/logger'
import { errorHandler } from './middlewares/errorHandler'
import { apiLimiter } from './middlewares/rateLimiter'

import routes from './routes'
import { setupSocketIO } from './sockets'

dotenv.config()

const app: Application = express()

app.use(express.json())
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'https://your-frontend-domain.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(helmet())
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
)
app.use(apiLimiter)

connectDB()

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() })
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('SkillOrbit API is running!')
})

app.use('/api', routes)

app.use(errorHandler)

const server = http.createServer(app)
import { Server as SocketIOServer } from 'socket.io'
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'https://your-frontend-domain.com',
    ],
    methods: ['GET', 'POST'],
  },
})

setupSocketIO(io)

process.on('SIGINT', async () => {
  logger.info(
    'SIGINT signal received: closing HTTP server and MongoDB connection.'
  )
  await mongoose.disconnect()
  server.close(() => {
    logger.info('Server closed gracefully.')
    process.exit(0)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
