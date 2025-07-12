import { Request, Response, NextFunction } from 'express'
import { sendEmail } from '../services/emailService'
import Notification from '../models/Notification'
import { logger } from '../config/logger'

export const sendPlatformMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { to, subject, message } = req.body

    if (!to || !subject || !message) {
      return res
        .status(400)
        .json({ message: 'To, subject, and message fields are required.' })
    }

    await sendEmail(to, subject, message)

    await Notification.create({
      user: to,
      type: 'admin-message',
      message: `${subject}: ${message}`,
    })

    logger.info(`Platform message sent to ${to} with subject: ${subject}`)

    res.json({ message: 'Platform message sent successfully.' })
  } catch (err) {
    logger.error('Error sending platform message:', err)
    next(err)
  }
}
