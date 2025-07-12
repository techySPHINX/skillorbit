import { Request, Response, NextFunction } from 'express'
import {
  getNotificationsByUser,
  markNotificationRead,
} from '../services/notificationService'

export const listNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as { _id: string }
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const notifications = await getNotificationsByUser(currentUser._id)
    res.json({ notifications })
  } catch (err) {
    next(err)
  }
}

export const readNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Notification ID is required' })
    }

    const notification = await markNotificationRead(id)
    res.json({ notification })
  } catch (err) {
    next(err)
  }
}
