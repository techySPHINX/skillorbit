import { FilterQuery } from 'mongoose'
import Skill, { ISkill } from '../models/Skill'

export const createSkill = async (
  skillData: Partial<ISkill>
): Promise<ISkill> => {
  try {
    if (!skillData.name || !skillData.createdBy) {
      throw new Error('Skill name and createdBy are required.')
    }

    const existingSkill = await Skill.findOne({ name: skillData.name }).lean()
    if (existingSkill) {
      throw new Error('Skill with this name already exists.')
    }

    const skill = new Skill(skillData)
    return await skill.save()
  } catch (error) {
    console.error('Error creating skill:', error)
    throw error
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
    console.error('Error getting skills:', error)
    throw error
  }
}

export const deleteSkill = async (skillId: string): Promise<ISkill | null> => {
  try {
    if (!skillId) {
      throw new Error('Skill ID is required.')
    }

    return await Skill.findByIdAndDelete(skillId).lean().exec()
  } catch (error) {
    console.error('Error deleting skill:', error)
    throw error
  }
}

export const findSkillByName = async (name: string): Promise<ISkill | null> => {
  try {
    if (!name) {
      throw new Error('Skill name is required.')
    }

    return await Skill.findOne({ name }).lean().exec()
  } catch (error) {
    console.error('Error finding skill by name:', error)
    throw error
  }
}
