import { Request, Response, NextFunction } from 'express'
import {
  createSkill,
  getSkills,
  deleteSkill,
  findSkillById,
} from '../services/skillService'
import { uploadImageBuffer, deleteImage } from '../services/mediaService'
import { containsProfanity } from '../services/profanityService'
import mongoose from 'mongoose'

export const addSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, category, description } = req.body

    if (
      containsProfanity(name) ||
      (description && containsProfanity(description))
    ) {
      return res
        .status(400)
        .json({ message: 'Profanity detected in skill fields' })
    }

    let image: string | undefined
    let imagePublicId: string | undefined

    if (req.file) {
      const { url, public_id } = await uploadImageBuffer(
        req.file.buffer,
        'skills'
      )
      image = url
      imagePublicId = public_id
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found.' })
    }

    const skill = await createSkill({
      name,
      category,
      description,
      createdBy: new mongoose.Types.ObjectId(String(req.user._id)),
      image,
      imagePublicId,
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

    const skill = await findSkillById(id)
    if (skill && skill.imagePublicId) {
      await deleteImage(skill.imagePublicId)
    }

    await deleteSkill(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
