import { Request, Response, NextFunction } from 'express'
import { banUserById, unbanUserById, getUsers } from '../services/adminService'
import { deleteSkill } from '../services/skillService'
import { logger } from '../config/logger'

export const banUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || typeof (req.user as any)._id !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: User not found.' })
    }

    const adminId = (req.user as any)._id as string
    const userId = req.params.id

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' })
    }

    await banUserById(userId, adminId)

    logger.info(`User ${userId} banned by admin ${adminId}.`)

    res.json({ message: 'User banned successfully.' })
  } catch (err) {
    logger.error('Error banning user:', err)
    next(err)
  }
}

export const unbanUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || typeof (req.user as any)._id !== 'string') {
      return res.status(401).json({ message: 'Unauthorized: User not found.' })
    }

    const adminId = (req.user as any)._id as string
    const userId = req.params.id

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' })
    }

    await unbanUserById(userId, adminId)

    logger.info(`User ${userId} unbanned by admin ${adminId}.`)

    res.json({ message: 'User unbanned successfully.' })
  } catch (err) {
    logger.error('Error unbanning user:', err)
    next(err)
  }
}

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers(req.query)

    logger.info(`Fetched ${users.length} users with filter:`, req.query)

    res.json({ users })
  } catch (err) {
    logger.error('Error listing users:', err)
    next(err)
  }
}

export const removeSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skillId = req.params.skillId

    if (!skillId) {
      return res.status(400).json({ message: 'Skill ID is required.' })
    }

    await deleteSkill(skillId)

    logger.info(`Skill ${skillId} deleted by admin.`)

    res.status(204).send()
  } catch (err) {
    logger.error('Error deleting skill:', err)
    next(err)
  }
}
