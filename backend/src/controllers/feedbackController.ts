import { Request, Response, NextFunction } from 'express'
import { createFeedback, getFeedbackForUser } from '../services/feedbackService'

export const leaveFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as any
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }

    const { toUser, comment, rating } = req.body
    if (!toUser || !comment || !rating) {
      return res.status(400).json({
        message: 'toUser, comment, and rating are required fields',
      })
    }

    const feedback = await createFeedback({
      fromUser: currentUser._id,
      toUser,
      comment,
      rating,
    })

    res.status(201).json({ feedback })
  } catch (err) {
    next(err)
  }
}

export const getUserFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' })
    }

    const feedbacks = await getFeedbackForUser(userId)
    res.json({ feedbacks })
  } catch (err) {
    next(err)
  }
}
