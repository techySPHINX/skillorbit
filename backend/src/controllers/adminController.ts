import { Request, Response, NextFunction } from 'express'
import {
  getUsers,
  banUserById,
  unbanUserById,
  getAdminLogs,
} from '../services/adminService'
import {
  getUserCount,
  getSwapStats,
  getPopularSkills,
} from '../services/analyticsService'
import { sendEmail } from '../services/emailService'
import { runAnalyticsJob } from '../jobs/analyticsJob'

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers(req.query)
    res.json({ users })
  } catch (err) {
    next(err)
  }
}

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || typeof currentUser._id !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' })
    }

    await banUserById(req.params.id, currentUser._id)
    res.json({ message: 'User banned' })
  } catch (err) {
    next(err)
  }
}

export const unbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || typeof currentUser._id !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' })
    }

    await unbanUserById(req.params.id, currentUser._id)
    res.json({ message: 'User unbanned' })
  } catch (err) {
    next(err)
  }
}

export const analyticsReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCount = await getUserCount()
    const swapStats = await getSwapStats()
    const popularSkills = await getPopularSkills()

    // Example: optionally run analytics job here if required
    // await runAnalyticsJob()

    res.json({ userCount, swapStats, popularSkills })
  } catch (err) {
    next(err)
  }
}

export const sendPlatformMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { to, subject, message } = req.body
    if (!to || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    await sendEmail(to, subject, message)
    res.json({ message: 'Platform message sent' })
  } catch (err) {
    next(err)
  }
}

export const viewAdminLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' })
    }

    const logs = await getAdminLogs()
    res.json({ logs })
  } catch (err) {
    next(err)
  }
}
