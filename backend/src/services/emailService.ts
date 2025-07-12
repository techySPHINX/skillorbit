import nodemailer from 'nodemailer'
import { logger } from '../config/logger'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    logger.error('Email transporter verification failed:', error)
  } else {
    logger.info('Email transporter is configured and ready.')
  }
})

/**
 * Sends an email using configured transporter.
 * @param to Recipient email address
 * @param subject Email subject
 * @param html HTML body content
 * @param text Optional plain text fallback
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> => {
  try {
    if (!to || !subject || !html) {
      throw new Error(
        'Missing required email fields: to, subject, and html content.'
      )
    }

    const from = process.env.EMAIL_FROM
    if (!from) {
      throw new Error('EMAIL_FROM is not configured in environment.')
    }

    const mailOptions = {
      from: `"Skill Barter" <${from}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ''), 
    }

    await transporter.sendMail(mailOptions)
    logger.info(`Email sent to ${to} with subject: "${subject}"`)
  } catch (error) {
    logger.error(`Failed to send email to ${to}:`, error)
    throw new Error('Email sending failed.')
  }
}
