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

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> => {
  try {
    if (!to || !subject || !html) {
      throw new Error(
        'To, subject, and html content are required to send email.'
      )
    }

    await transporter.sendMail({
      from: `"Skill Barter" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      text, 
    })

    logger.info(`Email sent to ${to} with subject: ${subject}`)
  } catch (error) {
    logger.error(`Failed to send email to ${to}:`, error)
    throw error
  }
}
