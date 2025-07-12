import { Router } from 'express'
import { register, login, me } from '../controllers/authController'
import { authenticate } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'
import { apiLimiter } from '../middlewares/rateLimiter'
import Joi from 'joi'

const router = Router()

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

/**
 * Auth routes: protected by centralized rate limiter and validation
 */

// Apply the rate limiter to all auth routes for security (brute-force protection)
router.use(apiLimiter)

/**
 * @route POST /auth/register
 * @desc Register a new user
 */
router.post('/register', validateBody(registerSchema), register)

/**
 * @route POST /auth/login
 * @desc User login
 */
router.post('/login', validateBody(loginSchema), login)

/**
 * @route GET /auth/me
 * @desc Get current authenticated user profile
 */
router.get('/me', authenticate, me)

export default router
