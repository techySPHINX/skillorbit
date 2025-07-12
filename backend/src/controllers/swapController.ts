import { Request, Response, NextFunction } from 'express'
import {
  createSwap,
  getSwapsByUser,
  updateSwapStatus,
  addSwapMessage,
  addSwapFeedback,
} from '../services/swapService'

export const requestSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { responder, skillOffered, skillWanted } = req.body
    if (!responder || !skillOffered || !skillWanted) {
      return res.status(400).json({
        message: 'responder, skillOffered, and skillWanted are required',
      })
    }

    const swap = await createSwap({
      ...req.body,
      requester: currentUser._id,
    })

    res.status(201).json({ swap })
  } catch (err) {
    next(err)
  }
}

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
