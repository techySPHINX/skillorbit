// src/controllers/swapController.ts

import { Request, Response, NextFunction } from 'express'
import {
  createSwap,
  getSwapsByUser,
  updateSwapStatus,
  addSwapMessage,
  addSwapFeedback,
} from '../services/swapService'
import { uploadImageBuffer } from '../services/mediaService'

/**
 * Create a new swap request.
 * - Handles optional image upload via Cloudinary.
 * - Requires authentication.
 */
export const requestSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let imageUrl: string | undefined
    let imagePublicId: string | undefined

    if (req.file) {
      const { url, public_id } = await uploadImageBuffer(
        req.file.buffer,
        'swaps'
      )
      imageUrl = url
      imagePublicId = public_id
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const swap = await createSwap({
      ...req.body,
      requester: req.user._id,
      image: imageUrl,
      imagePublicId,
    })

    res.status(201).json({ swap })
  } catch (err) {
    next(err)
  }
}

/**
 * List swaps for the authenticated user, optionally filtered by status.
 */
export const listSwaps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const status: string | undefined =
      typeof req.query.status === 'string' ? req.query.status : undefined

    const swaps = await getSwapsByUser(currentUser._id, status)
    res.json({ swaps })
  } catch (err) {
    next(err)
  }
}

/**
 * Change the status of a swap (accept, reject, complete).
 */
export const changeSwapStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!id || !status) {
      return res
        .status(400)
        .json({ message: 'Swap ID and status are required' })
    }

    const swap = await updateSwapStatus(id, status)
    res.json({ swap })
  } catch (err) {
    next(err)
  }
}

/**
 * Send a message in the context of a swap (real-time chat).
 */
export const sendSwapMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { id } = req.params
    const { content } = req.body

    if (!content) {
      return res.status(400).json({ message: 'Message content is required' })
    }

    const swap = await addSwapMessage(id, currentUser._id, content)
    res.json({ swap })
  } catch (err) {
    next(err)
  }
}

/**
 * Attach feedback to a completed swap.
 */
export const addFeedbackToSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const { feedbackId } = req.body

    if (!feedbackId) {
      return res.status(400).json({ message: 'Feedback ID is required' })
    }

    const swap = await addSwapFeedback(id, feedbackId)
    res.json({ swap })
  } catch (err) {
    next(err)
  }
}
