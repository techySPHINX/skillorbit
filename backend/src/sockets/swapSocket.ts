// src/sockets/swapSocket.ts

import { Server, Socket } from 'socket.io'
import { Swap } from '../models'

export const swapSocketHandler = (io: Server, socket: Socket) => {
  // Join swap room
  socket.on('joinSwap', (swapId: string) => {
    socket.join(`swap:${swapId}`)
  })

  // Handle swap messaging
  socket.on('swapMessage', async ({ swapId, senderId, content }) => {
    // Save message to DB
    await Swap.findByIdAndUpdate(swapId, {
      $push: { messages: { sender: senderId, content, timestamp: new Date() } },
    })
    // Emit message to room
    io.to(`swap:${swapId}`).emit('swapMessage', {
      swapId,
      senderId,
      content,
      timestamp: new Date(),
    })
  })
}
