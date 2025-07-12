import { Server, Socket } from 'socket.io'
import { Swap } from '../models'

export const swapSocketHandler = (io: Server, socket: Socket) => {
  socket.on('joinSwap', (swapId: string) => {
    socket.join(`swap:${swapId}`)
  })

  socket.on('swapMessage', async ({ swapId, senderId, content }) => {
    await Swap.findByIdAndUpdate(swapId, {
      $push: { messages: { sender: senderId, content, timestamp: new Date() } },
    })
    io.to(`swap:${swapId}`).emit('swapMessage', {
      swapId,
      senderId,
      content,
      timestamp: new Date(),
    })
  })
}
