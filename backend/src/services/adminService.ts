import User from '../models/User'
import AdminLog from '../models/AdminLog'
import { logger } from '../config/logger'

export const getUsers = async (
  filter: Record<string, any> = {},
  options: Record<string, any> = {}
): Promise<any[]> => {
  try {
    return await User.find(filter, null, options).lean().exec()
  } catch (error) {
    logger.error('Error getting users:', error)
    throw error
  }
}

export const banUserById = async (
  userId: string,
  adminId: string
): Promise<void> => {
  try {
    if (!userId || !adminId) {
      throw new Error('User ID and admin ID are required to ban user.')
    }

    await User.findByIdAndUpdate(userId, { isBanned: true })

    await AdminLog.create({
      action: 'ban_user',
      performedBy: adminId,
      targetUser: userId,
      details: 'User banned by admin',
    })

    logger.info(`User ${userId} banned by admin ${adminId}`)
  } catch (error) {
    logger.error('Error banning user:', error)
    throw error
  }
}

export const unbanUserById = async (
  userId: string,
  adminId: string
): Promise<void> => {
  try {
    if (!userId || !adminId) {
      throw new Error('User ID and admin ID are required to unban user.')
    }

    await User.findByIdAndUpdate(userId, { isBanned: false })

    await AdminLog.create({
      action: 'unban_user',
      performedBy: adminId,
      targetUser: userId,
      details: 'User unbanned by admin',
    })

    logger.info(`User ${userId} unbanned by admin ${adminId}`)
  } catch (error) {
    logger.error('Error unbanning user:', error)
    throw error
  }
}

export const getAdminLogs = async (
  filter: Record<string, any> = {}
): Promise<any[]> => {
  try {
    return await AdminLog.find(filter)
      .populate('performedBy targetUser', 'username')
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting admin logs:', error)
    throw error
  }
}
