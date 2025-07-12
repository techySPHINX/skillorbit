import { Server, Socket } from 'socket.io'

export const notificationSocketHandler = (io: Server, socket: Socket) => {
  socket.on('joinNotifications', (userId: string) => {
    socket.join(`user:${userId}`)
  })

  socket.on('sendNotification', ({ userId, notification }) => {
    io.to(`user:${userId}`).emit('notification', notification)
  })
}
