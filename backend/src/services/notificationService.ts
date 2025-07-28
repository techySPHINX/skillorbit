import Notification, { INotification } from '../models/Notification'
import { findUserById } from './userService'
import { logger } from '../config/logger'
import admin from 'firebase-admin'

const serviceAccount = require('../../firebase-service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

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

    // Send push notification
    await sendPushNotification(user.toString(), message)

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

export const sendPushNotification = async (userId: string, message: string) => {
  try {
    const user = await findUserById(userId)
    if (!user || !user.fcmTokens || user.fcmTokens.length === 0) {
      logger.info(`User ${userId} has no FCM tokens, skipping push notification.`)
      return
    }

    const payload = {
      notification: {
        title: 'New Notification',
        body: message,
      },
    }

    const response = await admin.messaging().sendToDevice(user.fcmTokens, payload)
    logger.info(`Push notification sent to user ${userId}`)

    // Clean up invalid tokens
    const tokensToRemove: string[] = []
    response.results.forEach((result, index) => {
      const error = result.error
      if (error) {
        logger.error(
          `Failed to send notification to token ${user.fcmTokens[index]}`,
          error
        )
        if (
          error.code === 'messaging/invalid-registration-token' ||
          error.code === 'messaging/registration-token-not-registered'
        ) {
          tokensToRemove.push(user.fcmTokens[index])
        }
      }
    })

    if (tokensToRemove.length > 0) {
      user.fcmTokens = user.fcmTokens.filter(
        (token) => !tokensToRemove.includes(token)
      )
      await user.save()
      logger.info(`Removed ${tokensToRemove.length} invalid FCM tokens.`)
    }
  } catch (error) {
    logger.error(`Error sending push notification to user ${userId}:`, error)
  }
}
