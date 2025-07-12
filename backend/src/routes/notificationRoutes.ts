import { Router } from 'express'
import {
  listNotifications,
  readNotification,
} from '../controllers/notificationController'
import { authenticate } from '../middlewares/auth'
import { apiLimiter } from '../middlewares/rateLimiter'

const router = Router()

/**
 * Notification routes: protected by centralized rate limiter and authentication
 */

// Apply the rate limiter to all notification routes for abuse protection
router.use(apiLimiter)

/**
 * @route GET /notifications
 * @desc Get all notifications for the authenticated user
 * @access Authenticated users
 */
router.get('/', authenticate, listNotifications)

/**
 * @route PUT /notifications/:id/read
 * @desc Mark a notification as read
 * @access Authenticated users
 */
router.put('/:id/read', authenticate, readNotification)

export default router
