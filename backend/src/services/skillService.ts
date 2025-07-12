import { FilterQuery } from 'mongoose'
import Skill, { ISkill } from '../models/Skill'
import { logger } from '../config/logger'

export const createSkill = async (
  skillData: Partial<ISkill>
): Promise<ISkill> => {
  try {
    const { name, createdBy } = skillData

    if (!name || !createdBy) {
      throw new Error('Skill name and createdBy are required.')
    }

    const existingSkill = await Skill.findOne({ name }).lean()
    if (existingSkill) {
      throw new Error('Skill with this name already exists.')
    }

    const skill = new Skill(skillData)
    const savedSkill = await skill.save()
    logger.info(`Skill created: ${name} by user ${createdBy}`)
    return savedSkill
  } catch (error) {
    logger.error('Error creating skill:', error)
    throw new Error('Failed to create skill.')
  }
}

export const getSkills = async (
  filter: FilterQuery<ISkill> = {}
): Promise<ISkill[]> => {
  try {
    return await Skill.find(filter)
      .populate('createdBy', 'username')
      .lean()
      .exec()
  } catch (error) {
    logger.error('Error getting skills:', error)
    throw new Error('Failed to get skills.')
  }
}

export const deleteSkill = async (skillId: string): Promise<ISkill | null> => {
  try {
    if (!skillId) {
      throw new Error('Skill ID is required.')
    }

    const deleted = await Skill.findByIdAndDelete(skillId).lean().exec()
    if (!deleted) {
      throw new Error('Skill not found.')
    }

    logger.info(`Skill deleted: ${skillId}`)
    return deleted
  } catch (error) {
    logger.error('Error deleting skill:', error)
    throw new Error('Failed to delete skill.')
  }
}

export const findSkillByName = async (name: string): Promise<ISkill | null> => {
  try {
    if (!name) {
      throw new Error('Skill name is required.')
    }

    return await Skill.findOne({ name }).lean().exec()
  } catch (error) {
    logger.error('Error finding skill by name:', error)
    throw new Error('Failed to find skill by name.')
  }
}
