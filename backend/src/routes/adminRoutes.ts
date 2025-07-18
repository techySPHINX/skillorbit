import { Router } from 'express'
import {
  listUsers,
  banUser,
  unbanUser,
  analyticsReport,
  sendPlatformMessage,
  viewAdminLogs,
} from '../controllers/adminController'
import { authenticate } from '../middlewares/auth'
import { adminGuard } from '../middlewares/adminGuard'
import { validateBody } from '../middlewares/validation'
import { apiLimiter } from '../middlewares/rateLimiter'
import Joi from 'joi'

const router = Router()

const messageSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().trim().min(1).required(),
  message: Joi.string().trim().min(1).required(),
})

/**
 * Admin routes: secured, rate-limited, and production-ready
 */

// Apply authentication, admin guard, and centralized rate limiter to all admin routes
router.use(authenticate, adminGuard, apiLimiter)

/**
 * @route GET /admin/users
 * @desc List all users
 */
router.get('/users', listUsers)

/**
 * @route PUT /admin/users/:id/ban
 * @desc Ban a user by ID
 */
router.put('/users/:id/ban', banUser)

/**
 * @route PUT /admin/users/:id/unban
 * @desc Unban a user by ID
 */
router.put('/users/:id/unban', unbanUser)

/**
 * @route GET /admin/analytics
 * @desc Get analytics report summary
 */
router.get('/analytics', analyticsReport)

/**
 * @route POST /admin/message
 * @desc Send platform-wide message
 */
router.post('/message', validateBody(messageSchema), sendPlatformMessage)

/**
 * @route GET /admin/logs
 * @desc View admin logs
 */
router.get('/logs', viewAdminLogs)

export default router
