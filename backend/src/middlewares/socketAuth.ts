
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
}

export const socketAuth = async (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error: Token not provided.'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new Error('Authentication error: User not found.'));
    }

    (socket as any).user = user; // Attach user to socket object
    next();
  } catch (error: any) {
    return next(new Error(`Authentication error: ${error.message}`));
  }
};
