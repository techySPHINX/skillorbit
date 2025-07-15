import { Request, Response, NextFunction } from 'express'
import { createUser, findUserByEmail } from '../services/userService'
import { signJwt } from '../config/jwt'
import bcrypt from 'bcryptjs'

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existing = await findUserByEmail(email)
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const user = await createUser(username, email, password)
    res.status(201).json({
      message: 'Registration successful',
      user: { id: user._id, username: user.username, email: user.email },
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'User is banned' })
    }

    const token = signJwt({ id: user._id, roles: user.roles })
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, roles: user.roles },
    })
  } catch (err) {
    next(err)
  }
}

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user })
}
