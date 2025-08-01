
import { Server as SocketIOServer } from 'socket.io';
import { Notification } from '../models/Notification';
import { Swap } from '../models/Swap';

let io: SocketIOServer;

export const setSocketIOInstance = (ioInstance: SocketIOServer) => {
  io = ioInstance;
};

export const emitNotification = (userId: string, notification: Notification) => {
  if (io) {
    io.to(userId).emit('newNotification', notification);
  } else {
    console.warn('Socket.IO instance not set, cannot emit notification.');
  }
};

export const emitSwapUpdate = (userId: string, swap: Swap) => {
  if (io) {
    io.to(userId).emit('swapUpdate', swap);
  } else {
    console.warn('Socket.IO instance not set, cannot emit swap update.');
  }
};

export const emitNewMessage = (userId: string, message: any) => {
  if (io) {
    io.to(userId).emit('newMessage', message);
  } else {
    console.warn('Socket.IO instance not set, cannot emit new message.');
  }
};

export const emitAdminEvent = (event: string, data: any) => {
  if (io) {
    io.to('admins').emit(event, data); // Assuming admins join a room named 'admins'
  } else {
    console.warn('Socket.IO instance not set, cannot emit admin event.');
  }
};

export const emitToAllConnected = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  } else {
    console.warn('Socket.IO instance not set, cannot emit to all connected.');
  }
};
