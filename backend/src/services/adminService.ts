import User from '../models/User'
import AdminLog from '../models/AdminLog'
import { logger } from '../config/logger'
import { emitAdminEvent } from '../sockets/socketEmitter'

export const getUsers = async (
  filter: Record<string, unknown> = {},
  options: Record<string, unknown> = {}
): Promise<unknown[]> => {
  try {
    const allowedFilters = ['role', 'isBanned', 'username', 'email']
    const sanitizedFilter: Record<string, unknown> = {}
    for (const key of allowedFilters) {
      if (filter[key] !== undefined) {
        sanitizedFilter[key] = filter[key]
      }
    }

    return await User.find(sanitizedFilter, null, options).populate('badges').lean().exec()
  } catch (error) {
    logger.error('Error getting users:', error)
    throw new Error('Failed to get users.')
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

    const adminLog = await AdminLog.create({
      action: 'ban_user',
      performedBy: adminId,
      targetUser: userId,
      details: 'User banned by admin',
    })

    logger.info(`User ${userId} banned by admin ${adminId}`)
    emitAdminEvent('adminLog', adminLog); // Emit admin log event
  } catch (error) {
    logger.error('Error banning user:', error)
    throw new Error('Failed to ban user.')
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

    const adminLog = await AdminLog.create({
      action: 'unban_user',
      performedBy: adminId,
      targetUser: userId,
      details: 'User unbanned by admin',
    })

    logger.info(`User ${userId} unbanned by admin ${adminId}`)
    emitAdminEvent('adminLog', adminLog); // Emit admin log event
  } catch (error) {
    logger.error('Error unbanning user:', error)
    throw new Error('Failed to unban user.')
  }
}

export const getAdminLogs = async (
  filter: Record<string, unknown> = {}
): Promise<unknown[]> => {
  try {
    return await AdminLog.find(filter)
      .populate('performedBy targetUser', 'username email')
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting admin logs:', error)
    throw new Error('Failed to get admin logs.')
  }
}
