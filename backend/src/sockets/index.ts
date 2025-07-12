import { Server as SocketIOServer } from 'socket.io'
import { swapSocketHandler } from './swapSocket'
import { notificationSocketHandler } from './notificationSocket'
import { adminSocketHandler } from './adminSocket'

export const setupSocketIO = (io: SocketIOServer) => {
  io.on('connection', socket => {
    swapSocketHandler(io, socket)
    notificationSocketHandler(io, socket)
    adminSocketHandler(io, socket)
  })
}
