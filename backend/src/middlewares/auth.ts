import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../config/jwt'
import { User } from '../models'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' })
  }
  const token = authHeader.split(' ')[1]
  const payload = verifyJwt(token)
  if (!payload)
    return res.status(401).json({ message: 'Invalid or expired token' })

  try {
    const user = await User.findById(payload.id).populate('badges');
    if (!user || user.isBanned)
      return res.status(403).json({ message: 'User not allowed' })
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

export const requireRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles.includes(role)) {
      return res
        .status(403)
        .json({ message: 'Forbidden: insufficient privileges' })
    }
    next()
  }
