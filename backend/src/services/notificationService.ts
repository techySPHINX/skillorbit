import Notification, { INotification } from '../models/Notification'

export const createNotification = async (
  notificationData: Partial<INotification>
): Promise<INotification> => {
  try {
    if (!notificationData.user || !notificationData.message) {
      throw new Error('User and message are required for notification.')
    }

    const notification = new Notification(notificationData)
    return await notification.save()
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
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
    console.error('Error getting notifications by user:', error)
    throw error
  }
}

export const markNotificationRead = async (
  notificationId: string
): Promise<INotification | null> => {
  try {
    if (!notificationId) {
      throw new Error('Notification ID is required.')
    }

    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    )
      .lean()
      .exec()
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}
