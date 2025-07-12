import User from '../models/User'
import Swap from '../models/Swap'
import Skill from '../models/Skill'
import { logger } from '../config/logger'

export const getUserCount = async (): Promise<number> => {
  try {
    const count = await User.countDocuments()
    logger.info(`Total users: ${count}`)
    return count
  } catch (error) {
    logger.error('Error getting user count:', error)
    throw new Error('Failed to get user count.')
  }
}

export const getSwapStats = async (): Promise<{
  total: number
  completed: number
}> => {
  try {
    const [total, completed] = await Promise.all([
      Swap.countDocuments(),
      Swap.countDocuments({ status: 'completed' }),
    ])

    logger.info(`Swap stats fetched: total=${total}, completed=${completed}`)
    return { total, completed }
  } catch (error) {
    logger.error('Error getting swap stats:', error)
    throw new Error('Failed to get swap statistics.')
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

    logger.info(`Fetched top ${limit} popular skills.`)
    return popularSkills
  } catch (error) {
    logger.error('Error getting popular skills:', error)
    throw new Error('Failed to get popular skills.')
  }
}
