import User, { IUser } from '../models/User'
import bcrypt from 'bcryptjs'
import { logger } from '../config/logger'

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required.')
    }

    const existingUser = await User.findOne({ email }).lean()
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      email,
      passwordHash,
      roles: ['user'], 
    })

    const savedUser = await user.save()
    logger.info(`User created: ${savedUser.email}`)
    return savedUser
  } catch (error) {
    logger.error('Error creating user:', error)
    throw new Error('Failed to create user.')
  }
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    if (!email) {
      throw new Error('Email is required.')
    }
    return await User.findOne({ email })
  } catch (error) {
    logger.error('Error finding user by email:', error)
    throw new Error('Failed to find user by email.')
  }
}

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findById(id)
  } catch (error) {
    logger.error('Error finding user by ID:', error)
    throw new Error('Failed to find user by ID.')
  }
}

export const updateUser = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('No update data provided.')
    }

    return await User.findByIdAndUpdate(id, updateData, { new: true })
  } catch (error) {
    logger.error('Error updating user:', error)
    throw new Error('Failed to update user.')
  }
}

export const banUser = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findByIdAndUpdate(id, { isBanned: true }, { new: true })
  } catch (error) {
    logger.error('Error banning user:', error)
    throw new Error('Failed to ban user.')
  }
}


export const unbanUser = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findByIdAndUpdate(id, { isBanned: false }, { new: true })
  } catch (error) {
    logger.error('Error unbanning user:', error)
    throw new Error('Failed to unban user.')
  }
}
