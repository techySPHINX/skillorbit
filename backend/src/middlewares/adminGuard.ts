import { Request, Response, NextFunction } from 'express'

export const adminGuard = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Admin access only' })
  }
  next()
}
