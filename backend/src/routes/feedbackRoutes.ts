import { Router } from 'express'
import {
  leaveFeedback,
  getUserFeedback,
} from '../controllers/feedbackController'
import { authenticate } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'
import { apiLimiter } from '../middlewares/rateLimiter'
import Joi from 'joi'

const router = Router()

const feedbackSchema = Joi.object({
  swap: Joi.string().required(),
  toUser: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().max(500),
})

/**
 * Feedback routes: protected by centralized rate limiter and validation
 */

// Apply the rate limiter to all feedback routes for abuse protection
router.use(apiLimiter)

/**
 * @route POST /feedback
 * @desc Leave feedback for a user
 * @access Authenticated users
 */
router.post('/', authenticate, validateBody(feedbackSchema), leaveFeedback)

/**
 * @route GET /feedback/user/:userId
 * @desc Get all feedback for a specific user
 * @access Authenticated users
 */
router.get('/user/:userId', authenticate, getUserFeedback)

export default router
