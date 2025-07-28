// src/services/socketService.ts

import io, { Socket } from 'socket.io-client';
import { API_BASE_URL } from '../config/api';
import { getToken } from './authService';
import { store } from '../redux/store';
import { addNotification } from '../redux/notificationSlice'; // Assuming a notification slice

class SocketService {
  private socket: Socket | null = null;

  public connect = async () => {
    const token = await getToken();
    if (!token) {
      console.warn('No token found, cannot connect to socket.');
      return;
    }

    this.socket = io(API_BASE_URL, {
      auth: {
        token: token,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Socket connected', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error', error.message);
    });

    // Global listeners for common events
    this.socket.on('newNotification', (notification) => {
      console.log('New notification received:', notification);
      store.dispatch(addNotification(notification));
    });

    this.socket.on('swapUpdate', (swap) => {
      console.log('Swap update received:', swap);
      // TODO: Dispatch to a swap slice or update UI directly
    });

    this.socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      // TODO: Dispatch to a message slice or update UI directly
    });
  };

  public disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  };

  public emit = (event: string, data: any) => {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit event:', event);
    }
  };

  public on = (event: string, callback: (...args: any[]) => void) => {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  };

  public off = (event: string, callback?: (...args: any[]) => void) => {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  };
}

export const socketService = new SocketService();
