import Swap, { ISwap } from '../models/Swap'
import { logger } from '../config/logger'
import { emitSwapUpdate, emitNewMessage } from '../sockets/socketEmitter'
import { addPoints } from './gamificationService'

export const createSwap = async (swapData: Partial<ISwap>): Promise<ISwap> => {
  try {
    const { requester, responder, skillOffered, skillWanted } = swapData

    if (!requester || !responder || !skillOffered || !skillWanted) {
      throw new Error(
        'Required fields missing: requester, responder, skillOffered, skillWanted.'
      )
    }

    const swap = new Swap(swapData)
    const savedSwap = await swap.save()
    logger.info(`Swap created between ${requester} and ${responder}`)

    // Emit swap update to both requester and responder
    emitSwapUpdate(requester.toString(), savedSwap);
    emitSwapUpdate(responder.toString(), savedSwap);

    return savedSwap
  } catch (error) {
    logger.error('Error creating swap:', error)
    throw new Error('Failed to create swap.')
  }
}

export const getSwapsByUser = async (
  userId: string,
  status?: string
): Promise<ISwap[]> => {
  try {
    if (!userId) {
      throw new Error('User ID is required.')
    }

    const filter: any = {
      $or: [{ requester: userId }, { responder: userId }],
    }
    if (status) filter.status = status

    return await Swap.find(filter)
      .populate('requester responder skillOffered skillWanted feedback')
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting swaps by user:', error)
    throw new Error('Failed to get swaps for user.')
  }
}

export const updateSwapStatus = async (
  swapId: string,
  status: ISwap['status']
): Promise<ISwap | null> => {
  try {
    if (!swapId) {
      throw new Error('Swap ID is required.')
    }
    if (!status) {
      throw new Error('Status is required.')
    }

    const updated = await Swap.findByIdAndUpdate(
      swapId,
      { status },
      { new: true }
    ).lean()
    if (!updated) {
      throw new Error('Swap not found.')
    }

    logger.info(`Swap ${swapId} status updated to ${status}`)

    // Emit swap update to both requester and responder
    emitSwapUpdate(updated.requester.toString(), updated);
    emitSwapUpdate(updated.responder.toString(), updated);

    // Award points if swap is completed
    if (status === 'completed') {
      await addPoints(updated.requester.toString(), 'SWAP_COMPLETED');
      await addPoints(updated.responder.toString(), 'SWAP_COMPLETED');
    }

    return updated
  } catch (error) {
    logger.error('Error updating swap status:', error)
    throw new Error('Failed to update swap status.')
  }
}

export const addSwapMessage = async (
  swapId: string,
  senderId: string,
  content: string
): Promise<ISwap | null> => {
  try {
    if (!swapId || !senderId || !content) {
      throw new Error('Swap ID, sender ID, and content are required.')
    }

    const updated = await Swap.findByIdAndUpdate(
      swapId,
      {
        $push: {
          messages: {
            sender: senderId,
            content,
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    ).lean()

    if (!updated) {
      throw new Error('Swap not found.')
    }

    logger.info(`Message added to swap ${swapId} by ${senderId}`)

    // Emit new message to both requester and responder
    const latestMessage = updated.messages[updated.messages.length - 1];
    emitNewMessage(updated.requester.toString(), latestMessage);
    emitNewMessage(updated.responder.toString(), latestMessage);

    return updated
  } catch (error) {
    logger.error('Error adding swap message:', error)
    throw new Error('Failed to add message to swap.')
  }
}

export const addSwapFeedback = async (
  swapId: string,
  feedbackId: string
): Promise<ISwap | null> => {
  try {
    if (!swapId || !feedbackId) {
      throw new Error('Swap ID and feedback ID are required.')
    }

    const updated = await Swap.findByIdAndUpdate(
      swapId,
      { feedback: feedbackId },
      { new: true }
    ).lean()

    if (!updated) {
      throw new Error('Swap not found.')
    }

    logger.info(`Feedback ${feedbackId} added to swap ${swapId}`)
    return updated
  } catch (error) {
    logger.error('Error adding swap feedback:', error)
    throw new Error('Failed to add feedback to swap.')
  }
}
