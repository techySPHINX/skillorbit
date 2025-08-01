import { Server as SocketIOServer } from 'socket.io'
import { swapSocketHandler } from './swapSocket'
import { notificationSocketHandler } from './notificationSocket'
import { adminSocketHandler } from './adminSocket'
import { socketAuth } from '../middlewares/socketAuth'

export const setupSocketIO = (io: SocketIOServer) => {
  io.use(socketAuth); // Apply authentication middleware

  io.on('connection', socket => {
    console.log(`User ${ (socket as any).user.username } connected with ID: ${socket.id}`);

    // Join a personal room for notifications
    socket.join((socket as any).user._id.toString());

    swapSocketHandler(io, socket);
    notificationSocketHandler(io, socket);
    adminSocketHandler(io, socket);

    socket.on('disconnect', () => {
      console.log(`User ${ (socket as any).user.username } disconnected from ID: ${socket.id}`);
    });
  });
}
