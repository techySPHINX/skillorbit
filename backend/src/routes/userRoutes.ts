import { Router } from 'express'
import { upload } from '../middlewares/upload'
import {
  getProfile,
  updateProfile,
  updateProfilePhoto,
  registerFCMToken,
} from '../controllers/userController'
import { authenticate } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'
import { apiLimiter } from '../middlewares/rateLimiter'
import Joi from 'joi'

const router = Router()

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(32),
  profilePhoto: Joi.string().uri(),
  location: Joi.string(),
  availability: Joi.string(),
  skillsOffered: Joi.array().items(Joi.string()),
  skillsWanted: Joi.array().items(Joi.string()),
  isPrivate: Joi.boolean(),
})

const fcmTokenSchema = Joi.object({
  fcmToken: Joi.string().required(),
})

/**
 * User routes: protected by centralized rate limiter, validation, and authentication
 */

// Apply the rate limiter to all user routes for abuse protection
router.use(apiLimiter)

/**
 * @route   GET /users/:id
 * @desc    Get user profile by ID
 * @access  Private (Authenticated users)
 */
router.get('/:id', authenticate, getProfile)

/**
 * @route   PUT /users
 * @desc    Update authenticated user's profile
 * @access  Private (Authenticated users)
 */
router.put('/', authenticate, validateBody(updateProfileSchema), updateProfile)

/**
 * @route   PUT /users/profile/photo
 * @desc    Update authenticated user's profile photo
 * @access  Private (Authenticated users)
 */
router.put(
  '/profile/photo',
  authenticate,
  upload.single('photo'),
  updateProfilePhoto
)

/**
 * @route   POST /users/fcm-token
 * @desc    Register FCM token for push notifications
 * @access  Private (Authenticated users)
 */
router.post(
  '/fcm-token',
  authenticate,
  validateBody(fcmTokenSchema),
  registerFCMToken
)

export default router
