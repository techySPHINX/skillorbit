import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import skillRoutes from './skillRoutes'
import swapRoutes from './swapRoutes'
import feedbackRoutes from './feedbackRoutes'
import adminRoutes from './adminRoutes'
import notificationRoutes from './notificationRoutes'
import gamificationRoutes from './gamificationRoutes'
import { apiLimiter } from '../middlewares/rateLimiter'

const router = Router()

/**
 * Apply centralized rate limiting to all API routes for security and abuse prevention.
 * This ensures consistent protection across all major resource endpoints.
 */
router.use(apiLimiter)

/**
 * @route /auth
 * @desc Authentication routes
 */
router.use('/auth', authRoutes)

/**
 * @route /users
 * @desc User profile routes
 */
router.use('/users', userRoutes)

/**
 * @route /skills
 * @desc Skill management routes
 */
router.use('/skills', skillRoutes)

/**
 * @route /swaps
 * @desc Skill swap routes
 */
router.use('/swaps', swapRoutes)

/**
 * @route /feedback
 * @desc Feedback routes
 */
router.use('/feedback', feedbackRoutes)

/**
 * @route /admin
 * @desc Admin management routes
 */
router.use('/admin', adminRoutes)

/**
 * @route /notifications
 * @desc User notification routes
 */
router.use('/notifications', notificationRoutes)

/**
 * @route /gamification
 * @desc Gamification routes
 */
router.use('/gamification', gamificationRoutes)

export default router
