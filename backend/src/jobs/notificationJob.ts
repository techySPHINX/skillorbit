import { logger } from '../config/logger'
import { Notification, User } from '../models'

/**
 * Sends scheduled notifications to users (e.g., reminders, weekly digests).
 * Integrate with email/SMS services as needed.
 */
export const runNotificationJob = async () => {
  try {
    const users = await User.find({ isBanned: false })
    for (const user of users) {
      await Notification.create({
        user: user._id,
        type: 'reminder',
        message: 'Check out new skills and swap opportunities this week!',
      })
    }
    logger.info('Notification job completed')
  } catch (err) {
    logger.error('Notification job failed', err)
  }
}
