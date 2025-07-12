import User from '../models/User'
import Swap from '../models/Swap'
import Skill from '../models/Skill'
import { logger } from '../config/logger'

export const getUserCount = async (): Promise<number> => {
  try {
    return await User.countDocuments()
  } catch (error) {
    logger.error('Error getting user count:', error)
    throw error
  }
}

export const getSwapStats = async (): Promise<{
  total: number
  completed: number
}> => {
  try {
    const totalPromise = Swap.countDocuments()
    const completedPromise = Swap.countDocuments({ status: 'completed' })

    const [total, completed] = await Promise.all([
      totalPromise,
      completedPromise,
    ])

    return { total, completed }
  } catch (error) {
    logger.error('Error getting swap stats:', error)
    throw error
  }
}

export const getPopularSkills = async (
  limit = 10
): Promise<{ name: string; count: number }[]> => {
  try {
    const popularSkills = await Skill.aggregate([
      { $group: { _id: '$name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      { $project: { _id: 0, name: '$_id', count: 1 } },
    ])

    return popularSkills
  } catch (error) {
    logger.error('Error getting popular skills:', error)
    throw error
  }
}
