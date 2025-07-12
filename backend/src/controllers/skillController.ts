import { Request, Response, NextFunction } from 'express'
import { createSkill, getSkills, deleteSkill } from '../services/skillService'
import { containsProfanity } from '../services/profanityService'
import mongoose from 'mongoose'

export const addSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, description } = req.body

    if (!name || !category) {
      return res
        .status(400)
        .json({ message: 'Skill name and category are required.' })
    }

    if (
      containsProfanity(name) ||
      (description && containsProfanity(description))
    ) {
      return res
        .status(400)
        .json({ message: 'Profanity detected in skill fields.' })
    }

    const currentUser = req.user as any
    if (!currentUser || !currentUser._id) {
      return res.status(401).json({ message: 'Unauthorized: user not found' })
    }

    const skill = await createSkill({
      name,
      category,
      description,
      createdBy: new mongoose.Types.ObjectId(currentUser._id),
    })

    res.status(201).json({ skill })
  } catch (err) {
    next(err)
  }
}

export const listSkills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skills = await getSkills(req.query)
    res.json({ skills })
  } catch (err) {
    next(err)
  }
}

export const removeSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Skill ID is required.' })
    }

    await deleteSkill(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
