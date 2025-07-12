import Feedback, { IFeedback } from '../models/Feedback'
import { logger } from '../config/logger'

export const createFeedback = async (
  feedbackData: Partial<IFeedback>
): Promise<IFeedback> => {
  try {
    if (
      !feedbackData.fromUser ||
      !feedbackData.toUser ||
      !feedbackData.comment ||
      !feedbackData.rating
    ) {
      throw new Error(
        'fromUser, toUser, comment, and rating are required for feedback.'
      )
    }

    const feedback = new Feedback(feedbackData)
    return await feedback.save()
  } catch (error) {
    logger.error('Error creating feedback:', error)
    throw error
  }
}

export const getFeedbackForUser = async (
  userId: string
): Promise<IFeedback[]> => {
  try {
    if (!userId) {
      throw new Error('User ID is required.')
    }

    return await Feedback.find({ toUser: userId })
      .populate('fromUser', 'username')
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting feedback for user:', error)
    throw error
  }
}
