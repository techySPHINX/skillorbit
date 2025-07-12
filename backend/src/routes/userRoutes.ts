import { Router } from 'express'
import { upload } from '../middlewares/upload'
import {
  getProfile,
  updateProfile,
  updateProfilePhoto,
} from '../controllers/userController'
import { authenticate } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'
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

export default router
