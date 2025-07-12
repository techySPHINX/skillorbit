import { Router } from 'express'
import {
  requestSwap,
  listSwaps,
  changeSwapStatus,
  sendSwapMessage,
  addFeedbackToSwap,
} from '../controllers/swapController'
import { authenticate } from '../middlewares/auth'
import { validateBody } from '../middlewares/validation'
import Joi from 'joi'

const router = Router()

const swapSchema = Joi.object({
  responder: Joi.string().required(),
  skillOffered: Joi.string().required(),
  skillWanted: Joi.string().required(),
  scheduledTime: Joi.date(),
})

const statusSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'accepted', 'rejected', 'completed')
    .required(),
})

const messageSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
})

const feedbackSchema = Joi.object({
  feedbackId: Joi.string().required(),
})

/**
 * @route POST /swaps
 * @desc Create a new swap request
 * @access Authenticated users
 */
router.post('/', authenticate, validateBody(swapSchema), requestSwap)

/**
 * @route GET /swaps
 * @desc List all swaps for authenticated user
 * @access Authenticated users
 */
router.get('/', authenticate, listSwaps)

/**
 * @route PUT /swaps/:id/status
 * @desc Change the status of a swap
 * @access Authenticated users
 */
router.put(
  '/:id/status',
  authenticate,
  validateBody(statusSchema),
  changeSwapStatus
)

/**
 * @route POST /swaps/:id/message
 * @desc Send a message in swap chat
 * @access Authenticated users
 */
router.post(
  '/:id/message',
  authenticate,
  validateBody(messageSchema),
  sendSwapMessage
)

/**
 * @route POST /swaps/:id/feedback
 * @desc Add feedback to a swap
 * @access Authenticated users
 */
router.post(
  '/:id/feedback',
  authenticate,
  validateBody(feedbackSchema),
  addFeedbackToSwap
)

export default router
