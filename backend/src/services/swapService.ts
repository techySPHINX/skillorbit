import Swap, { ISwap } from '../models/Swap'

export const createSwap = async (swapData: Partial<ISwap>): Promise<ISwap> => {
  try {
    if (
      !swapData.requester ||
      !swapData.responder ||
      !swapData.skillOffered ||
      !swapData.skillWanted
    ) {
      throw new Error(
        'Required fields missing: requester, responder, skillOffered, skillWanted.'
      )
    }

    const swap = new Swap(swapData)
    return await swap.save()
  } catch (error) {
    console.error('Error creating swap:', error)
    throw error
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
    console.error('Error getting swaps by user:', error)
    throw error
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

    return await Swap.findByIdAndUpdate(swapId, { status }, { new: true })
      .lean()
      .exec()
  } catch (error) {
    console.error('Error updating swap status:', error)
    throw error
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

    return await Swap.findByIdAndUpdate(
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
    )
      .lean()
      .exec()
  } catch (error) {
    console.error('Error adding swap message:', error)
    throw error
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

    return await Swap.findByIdAndUpdate(
      swapId,
      { feedback: feedbackId },
      { new: true }
    )
      .lean()
      .exec()
  } catch (error) {
    console.error('Error adding swap feedback:', error)
    throw error
  }
}
