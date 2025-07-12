import { Request, Response, NextFunction } from 'express'
import Filter from 'bad-words'

const filter = new (Filter as any)()

export const checkProfanity =
  (field: string) => (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field]
    if (typeof value === 'string' && filter.isProfane(value)) {
      return res.status(400).json({ message: `Profanity detected in ${field}` })
    }
    next()
  }
