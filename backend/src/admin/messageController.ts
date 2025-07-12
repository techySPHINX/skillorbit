import { Request, Response, NextFunction } from 'express'
import { sendEmail } from '../services/emailService'
import Notification from '../models/Notification'
import { logger } from '../config/logger'
import { uploadImageBuffer } from '../services/mediaService'

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

    let assetUrl: string | undefined
    let assetPublicId: string | undefined

    if (req.file) {
      const { url, public_id } = await uploadImageBuffer(
        req.file.buffer,
        'admin_assets'
      )
      assetUrl = url
      assetPublicId = public_id
    }

    await sendEmail(to, subject, message)

    await Notification.create({
      user: to,
      type: 'admin-message',
      message: `${subject}: ${message}`,
      assetUrl,
      assetPublicId,
    })

    logger.info(
      `Platform message sent to ${to} with subject: ${subject}${assetUrl ? ` (asset: ${assetUrl})` : ''}`
    )

    res.json({ message: 'Platform message sent successfully.', assetUrl })
  } catch (err) {
    logger.error('Error sending platform message:', err)
    next(err)
  }
}
