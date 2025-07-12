import { Router } from 'express'
import {
  addSkill,
  listSkills,
  removeSkill,
} from '../controllers/skillController'
import { authenticate, requireRole } from '../middlewares/auth'
import { checkProfanity } from '../middlewares/profanityCheck'
import { validateBody } from '../middlewares/validation'
import Joi from 'joi'

const router = Router()

const skillSchema = Joi.object({
  name: Joi.string().min(2).max(64).required(),
  category: Joi.string().max(64),
  description: Joi.string().max(256),
})

router.get('/', listSkills)
router.post(
  '/',
  authenticate,
  checkProfanity('name'),
  validateBody(skillSchema),
  addSkill
)
router.delete('/:id', authenticate, requireRole('admin'), removeSkill)

export default router
