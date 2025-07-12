import express, { Application, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import winston from 'winston' 

dotenv.config()

const app: Application = express()

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
})

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests, please try again later.',
})
app.use(limiter)

const mongoURI = process.env.MONGO_URI as string
mongoose
  .connect(mongoURI)
  .then(() => {
    logger.info('MongoDB connected')
  })
  .catch(err => {
    logger.error('MongoDB connection error:', err)
    process.exit(1)
  })

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() })
})

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('SkillOrbit API is running!')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack || err.message)
  res.status(500).json({ message: 'Internal Server Error' })
})

const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'https://your-frontend-domain.com',
    ],
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  logger.info(`WebSocket client connected: ${socket.id}`)
  socket.on('disconnect', () => {
    logger.info(`WebSocket client disconnected: ${socket.id}`)
  })
})

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
