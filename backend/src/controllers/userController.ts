import { Request, Response, NextFunction } from 'express'
import { findUserById, updateUser } from '../services/userService'
import { pick } from '../utils/helpers'

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const requesterId = (req.user as any)?._id
    const isOwner =
      requesterId && requesterId.toString() === (user as { _id: string })._id.toString()

    if (user.isPrivate && !isOwner) {
      return res.status(403).json({ message: 'This profile is private' })
    }

    res.json({ user })
  } catch (err) {
    next(err)
  }
}

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user as { _id: string }
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const allowedFields = [
      'username',
      'profilePhoto',
      'location',
      'availability',
      'skillsOffered',
      'skillsWanted',
      'isPrivate',
    ]
    const updateData = pick(req.body, allowedFields)

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' })
    }

    const user = await updateUser(currentUser._id, updateData)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user })
  } catch (err) {
    next(err)
  }
}
