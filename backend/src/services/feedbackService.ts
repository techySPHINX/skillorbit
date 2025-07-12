import Feedback, { IFeedback } from '../models/Feedback'
import { logger } from '../config/logger'

export const createFeedback = async (
  feedbackData: Partial<IFeedback>
): Promise<IFeedback> => {
  try {
    const { fromUser, toUser, comment, rating } = feedbackData

    if (!fromUser || !toUser || !comment || !rating) {
      throw new Error(
        'fromUser, toUser, comment, and rating are required for feedback.'
      )
    }

    const feedback = new Feedback({
      fromUser,
      toUser,
      comment,
      rating,
    })

    const savedFeedback = await feedback.save()
    logger.info(`Feedback created from ${fromUser} to ${toUser}`)
    return savedFeedback
  } catch (error) {
    logger.error('Error creating feedback:', error)
    throw new Error('Failed to create feedback.')
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
    throw new Error('Failed to get feedback for user.')
  }
}
