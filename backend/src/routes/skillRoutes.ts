import { Router } from 'express'
import {
  addSkill,
  listSkills,
  removeSkill,
} from '../controllers/skillController'
import { authenticate, requireRole } from '../middlewares/auth'
import { checkProfanity } from '../middlewares/profanityCheck'
import { validateBody } from '../middlewares/validation'
import { apiLimiter } from '../middlewares/rateLimiter'
import { upload } from '../middlewares/upload'
import Joi from 'joi'

const router = Router()

const skillSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  category: Joi.string().max(64),
  description: Joi.string().max(256),
})

/**
 * Skill routes: protected by centralized rate limiter, validation, and file upload support
 */

// Apply the rate limiter to all skill routes for abuse protection
router.use(apiLimiter)

/**
 * @route GET /skills
 * @desc Get all skills
 * @access Public
 */
router.get('/', listSkills)

/**
 * @route POST /skills
 * @desc Add a new skill (with optional image upload)
 * @access Authenticated users
 */
router.post(
  '/',
  authenticate,
  upload.single('image'), // Support image upload
  checkProfanity('name'),
  validateBody(skillSchema),
  addSkill
)

/**
 * @route DELETE /skills/:id
 * @desc Delete a skill by ID
 * @access Admin only
 */
router.delete('/:id', authenticate, requireRole('admin'), removeSkill)

export default router
