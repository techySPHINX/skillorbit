import { Server, Socket } from 'socket.io'

export const adminSocketHandler = (io: Server, socket: Socket) => {
  socket.on('joinAdmin', () => {
    socket.join('admins')
  })

  socket.on('adminAlert', (alert: string) => {
    io.to('admins').emit('adminAlert', alert)
  })
}
