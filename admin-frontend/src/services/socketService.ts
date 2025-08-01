
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  public connect = (token: string) => {
    if (this.socket && this.socket.connected) {
      return; // Already connected
    }

    this.socket = io('http://localhost:5000', { // Adjust to your backend URL
      auth: {
        token: token,
      },
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Admin Socket connected', this.socket?.id);
      // Emit an event to join the admin room
      this.socket?.emit('joinAdmin');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Admin Socket disconnected', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Admin Socket connection error', error.message);
    });
  };

  public disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
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

  public emit = (event: string, data: any) => {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn('Admin Socket not connected, cannot emit event:', event);
    }
  };
}

export const adminSocketService = new SocketService();
