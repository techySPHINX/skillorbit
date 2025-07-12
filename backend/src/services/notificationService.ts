import Notification, { INotification } from '../models/Notification'
import { logger } from '../config/logger'

export const createNotification = async (
  notificationData: Partial<INotification>
): Promise<INotification> => {
  try {
    const { user, message } = notificationData
    if (!user || !message) {
      throw new Error('User and message are required for notification.')
    }

    const notification = new Notification({
      user,
      message,
      type: notificationData.type || 'general',
      isRead: notificationData.isRead || false,
    })

    const savedNotification = await notification.save()
    logger.info(`Notification created for user ${user}`)
    return savedNotification
  } catch (error) {
    logger.error('Error creating notification:', error)
    throw new Error('Failed to create notification.')
  }
}

export const getNotificationsByUser = async (
  userId: string
): Promise<INotification[]> => {
  try {
    if (!userId) {
      throw new Error('User ID is required.')
    }

    return await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting notifications by user:', error)
    throw new Error('Failed to get notifications.')
  }
}

export const markNotificationRead = async (
  notificationId: string
): Promise<INotification | null> => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required.')
    }

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    ).lean()

    if (!updated) {
      throw new Error('Notification not found.')
    }

    logger.info(`Notification ${notificationId} marked as read`)
    return updated
  } catch (error) {
    logger.error('Error marking notification as read:', error)
    throw new Error('Failed to mark notification as read.')
  }
}
