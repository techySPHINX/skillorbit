import User, { IUser } from '../models/User'
import bcrypt from 'bcryptjs'

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    if (!userData.email || !userData.passwordHash) {
      throw new Error('Email and password are required.')
    }

    const existingUser = await User.findOne({ email: userData.email }).lean()
    if (existingUser) {
      throw new Error('User with this email already exists.')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(userData.passwordHash, saltRounds)

    const user = new User({
      ...userData,
      passwordHash,
    })

    return await user.save()
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    if (!email) {
      throw new Error('Email is required.')
    }
    return await User.findOne({ email }).lean()
  } catch (error) {
    console.error('Error finding user by email:', error)
    throw error
  }
}

export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findById(id).lean()
  } catch (error) {
    console.error('Error finding user by ID:', error)
    throw error
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

    return await User.findByIdAndUpdate(id, updateData, { new: true }).lean()
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const banUser = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findByIdAndUpdate(
      id,
      { isBanned: true },
      { new: true }
    ).lean()
  } catch (error) {
    console.error('Error banning user:', error)
    throw error
  }
}

export const unbanUser = async (id: string): Promise<IUser | null> => {
  try {
    if (!id) {
      throw new Error('User ID is required.')
    }
    return await User.findByIdAndUpdate(
      id,
      { isBanned: false },
      { new: true }
    ).lean()
  } catch (error) {
    console.error('Error unbanning user:', error)
    throw error
  }
}
